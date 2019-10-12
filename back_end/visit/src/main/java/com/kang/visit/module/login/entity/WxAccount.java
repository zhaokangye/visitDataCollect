package com.kang.visit.module.login.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * Created by EalenXie on 2018/11/26 10:26.
 * 实体 属性描述 这里只是简单示例，你可以自定义相关用户信息
 */

@TableName("wxAccount")
public class WxAccount {

    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    private String wxOpenid;
    private String sessionKey;
    private String nickName;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getWxOpenid() {
        return wxOpenid;
    }

    public void setWxOpenid(String wxOpenid) {
        this.wxOpenid = wxOpenid;
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Date getLastTime() {
        return lastTime;
    }

    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }
}
