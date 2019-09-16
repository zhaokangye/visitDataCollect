package com.kang.visit.module.Login.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import org.apache.shiro.authc.UsernamePasswordToken;

@TableName("user")
public class User extends UsernamePasswordToken {
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    private String open_id;
    private String session_key;
    private String sts_cd;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOpen_id() {
        return open_id;
    }

    public void setOpen_id(String open_id) {
        this.open_id = open_id;
    }

    public String getSession_key() {
        return session_key;
    }

    public void setSession_key(String session_key) {
        this.session_key = session_key;
    }

    public String getSts_cd() {
        return sts_cd;
    }

    public void setSts_cd(String sts_cd) {
        this.sts_cd = sts_cd;
    }

    @Override
    public Object getPrincipal() {
        return getOpen_id();
    }

    @Override
    public Object getCredentials() {
        return "ok";
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", open_id='" + open_id + '\'' +
                ", session_key='" + session_key + '\'' +
                ", sts_cd='" + sts_cd + '\'' +
                '}';
    }
}
