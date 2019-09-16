package com.kang.visit.module.Login.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.kang.visit.module.Login.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface UserMapper extends BaseMapper<User> {
    User getUser(@Param("open_id") String open_id);
}
