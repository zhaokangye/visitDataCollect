package com.kang.visit.config.shiro;

import com.kang.visit.config.jwt.JwtConfig;
import com.kang.visit.core.entity.JwtToken;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class ShiroKit {

    @Resource
    private JwtConfig jwtConfig;

    public Integer getId(){
        JwtToken token=(JwtToken) SecurityUtils.getSubject().getPrincipal();
        return Integer.valueOf(jwtConfig.getIdByToken(token.getToken()));
    }

    public String getWxOpenId(){
        JwtToken token=(JwtToken) SecurityUtils.getSubject().getPrincipal();
        return jwtConfig.getWxOpenIdByToken(token.getToken());
    }

}
