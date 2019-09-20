package com.kang.visit.module.login.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.kang.visit.module.login.entity.WxAccount;
import org.apache.ibatis.annotations.Mapper;

import java.util.Set;

@Mapper
public interface WxAccountRepository extends BaseMapper<WxAccount> {
    /**
     * 根据OpenId查询用户信息
     */
    WxAccount findByWxOpenid(String wxOpenId);

    Set<String> getRoleByOpenId(String wxOpenid);
}
