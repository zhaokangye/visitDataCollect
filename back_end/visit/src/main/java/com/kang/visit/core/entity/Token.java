package com.kang.visit.core.entity;

/**
 * Created by EalenXie on 2018/11/26 18:49.
 * DTO 返回值token对象
 */
public class Token {

    private String token;
    private int userId;

    public Token(String token) {
        this.token = token;
    }

    public Token(String token,int userId) {
        this.token = token;
        this.userId=userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
