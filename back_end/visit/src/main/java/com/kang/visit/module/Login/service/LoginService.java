package com.kang.visit.module.Login.service;

import com.kang.visit.module.Login.dao.UserMapper;
import com.kang.visit.module.Login.entity.User;
import com.kang.visit.core.error.BusinessException;
import com.kang.visit.core.error.EmBusinessError;
import com.kang.visit.core.util.ReadUrlUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.sf.json.JSONObject;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LoginService {

    @Autowired
    private UserMapper userMapper;

    private String appid="wx78004d249e908cba";
    private String appsecret="a4e30cf995b0a286f6fce8c023eda83a";

    public JSONObject code2session(String code){
        String url="https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+appsecret+"&js_code="+code+"&grant_type=authorization_code";
        JSONObject json=null;
        try {
            json = ReadUrlUtil.readJsonFromUrl(url);
            System.out.println(json.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return json;
    }

    public User login(String code) throws BusinessException {
        JSONObject json=code2session(code);
        Map<String,Object> params=new HashMap<>();
        params.put("open_id",json.get("openid").toString());
        List<User> users=userMapper.selectByMap(params);
        switch (users.size()){
            case 0:
                User user=new User();
                user.setOpen_id(json.get("openid").toString());
                user.setSession_key(json.get("session_key").toString());
                userMapper.insert(user);
                return user;
            case 1:
                return users.get(0);
            default:
                throw new BusinessException(EmBusinessError.UNKNOW_ERROR.setErrMsg("账户信息异常"));
        }
    }

    public User getUser(String open_id){
        return this.userMapper.getUser(open_id);
    }

}
