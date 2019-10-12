package com.kang.visit.config.shiro;


import com.kang.visit.config.jwt.JwtConfig;
import com.kang.visit.core.entity.JwtToken;
import com.kang.visit.core.util.CommonTools;
import com.kang.visit.module.login.dao.WxAccountRepository;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by EalenXie on 2018/11/26 12:12.
 * Realm 的一个配置管理类 allRealm()方法得到所有的realm
 */
@Component
public class ShiroRealmConfig {

    @Resource
    private JwtConfig jwtConfig;
    @Autowired
    private WxAccountRepository wxAccountRepository;

    /**
     * 配置所有自定义的realm,方便起见,应对可能有多个realm的情况
     */
    public List<Realm> allRealm() {
        List<Realm> realmList = new LinkedList<>();
        AuthorizingRealm jwtRealm = jwtRealm();
        realmList.add(jwtRealm);
        return Collections.unmodifiableList(realmList);
    }

    /**
     * 自定义 JWT的 Realm
     * 重写 Realm 的 supports() 方法是通过 JWT 进行登录判断的关键
     */
    private AuthorizingRealm jwtRealm() {
        AuthorizingRealm jwtRealm = new AuthorizingRealm() {
            /**
             * 注意坑点 : 必须重写此方法，不然Shiro会报错
             * 因为创建了 JWTToken 用于替换Shiro原生 token,所以必须在此方法中显式的进行替换，否则在进行判断时会一直失败
             */
            @Override
            public boolean supports(AuthenticationToken token) {
                return token instanceof JwtToken;
            }

            @Override
            protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
                JwtToken token=(JwtToken)SecurityUtils.getSubject().getPrincipal();
                String wxOpenId=jwtConfig.getWxOpenIdByToken(token.getToken());
                SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
                authorizationInfo.setRoles(CommonTools.parseFromRoles(wxAccountRepository.getRoleByOpenId(wxOpenId)));
                return authorizationInfo;
            }

            /**
             * 校验 验证token逻辑
             */
            @Override
            protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) {
                String jwtToken = (String) token.getCredentials();
                String wxOpenId = jwtConfig.getWxOpenIdByToken(jwtToken);
                String sessionKey = jwtConfig.getSessionKeyByToken(jwtToken);
                if (wxOpenId == null || wxOpenId.equals(""))
                    throw new AuthenticationException("user account not exits , please check your token");
                if (sessionKey == null || sessionKey.equals(""))
                    throw new AuthenticationException("sessionKey is invalid , please check your token");
                if (!jwtConfig.verifyToken(jwtToken))
                    throw new AuthenticationException("token is invalid , please check your token");
                return new SimpleAuthenticationInfo(token, token, getName());
            }
        };
        jwtRealm.setCredentialsMatcher(credentialsMatcher());
        return jwtRealm;
    }

    /**
     * 注意坑点 : 密码校验 , 这里因为是JWT形式,就无需密码校验和加密,直接让其返回为true(如果不设置的话,该值默认为false,即始终验证不通过)
     */
    private CredentialsMatcher credentialsMatcher() {
        return (token, info) -> true;
    }
}