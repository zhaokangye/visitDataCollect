package com.kang.visit.core.entity;

import java.util.Set;

/**
 * Created by EalenXie on 2018/11/26 18:49.
 * DTO 返回值token对象
 */
public class Token {

    private String token;

    private Set<String> roles;

    public Token(String token) {
        this.token = token;
    }

    public Token(String token,Set<String> roles) {
        this.token = token;
        this.roles=roles;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
