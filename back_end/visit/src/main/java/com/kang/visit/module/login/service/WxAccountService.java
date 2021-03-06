package com.kang.visit.module.login.service;

import com.alibaba.fastjson.JSONObject;
import com.kang.visit.config.jwt.JwtConfig;
import com.kang.visit.core.entity.Token;
import com.kang.visit.core.util.CommonTools;
import com.kang.visit.core.util.constants.Constants;
import com.kang.visit.module.login.dao.WxAccountRepository;
import com.kang.visit.module.login.entity.Code2SessionResponse;
import com.kang.visit.module.login.entity.WxAccount;
import com.kang.visit.module.manager.dao.ManagerMapper;
import com.kang.visit.module.manager.entity.Role;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.Date;

@Service
public class WxAccountService {

    @Resource
    private RestTemplate restTemplate;

    @Value("${appid}")
    private String appid;

    @Value("${appsecret}")
    private String appsecret;

    @Resource
    private WxAccountRepository wxAccountRepository;

    @Resource
    private JwtConfig jwtConfig;

    @Autowired
    private ManagerMapper managerMapper;

    /**
     * 微信的 code2session 接口 获取微信用户信息
     * 官方说明 : https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/code2Session.html
     */
    private String code2Session(String jsCode) {
        String url="https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+appsecret+"&js_code="+jsCode+"&grant_type=authorization_code";
        return restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<String>(new HttpHeaders()), String.class).getBody();
    }


    /**
     * 微信小程序用户登陆，完整流程可参考下面官方地址，本例中是按此流程开发
     * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
     *
     * @param code 小程序端 调用 wx.login 获取到的code,用于调用 微信code2session接口
     * @return 返回后端 自定义登陆态 token  基于JWT实现
     */
    public Token wxUserLogin(String code,String nickName) {
        //1 . code2session返回JSON数据
        String resultJson = code2Session(code);
        //2 . 解析数据
        Code2SessionResponse response = JSONObject.parseObject(resultJson, Code2SessionResponse.class);
        if (!response.getErrcode().equals("0")) {
            throw new AuthenticationException("code2session失败 : " + response.getErrmsg());
        }else {
            //3 . 先从本地数据库中查找用户是否存在
            WxAccount wxAccount = wxAccountRepository.findByWxOpenid(response.getOpenid());
            if (wxAccount == null) {
                // 不存在就新建用户
                wxAccount = new WxAccount();
                wxAccount.setWxOpenid(response.getOpenid());
                wxAccount.setSessionKey(response.getSession_key());
                wxAccount.setLastTime(new Date());
                wxAccount.setNickName(nickName);
                wxAccountRepository.insert(wxAccount);
                // 默认赋予接待员权限
                Role role=new Role();
                role.setUserId(wxAccount.getId());
//                role.setRoles(Constants.ADMIN+","+Constants.RECEPTION);
                managerMapper.insert(role);
            }else {
                //4 . 更新sessionKey和 登陆时间
                wxAccount.setSessionKey(response.getSession_key());
                wxAccount.setLastTime(new Date());
                wxAccount.setNickName(nickName);
                wxAccountRepository.updateById(wxAccount);
            }
            //5 . JWT 返回自定义登陆态 Token
            String token = jwtConfig.createTokenByWxAccount(wxAccount);
            return new Token(token, CommonTools.parseFromRoles(wxAccountRepository.getRoleByOpenId(wxAccount.getWxOpenid())));
        }
    }
}
