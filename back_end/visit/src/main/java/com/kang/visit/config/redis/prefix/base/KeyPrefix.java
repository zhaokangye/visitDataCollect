package com.kang.visit.config.redis.prefix.base;

public interface KeyPrefix {

    public int expireSeconds();

    public String getPrefix();

}

