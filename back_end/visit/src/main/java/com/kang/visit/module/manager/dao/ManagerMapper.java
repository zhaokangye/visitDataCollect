package com.kang.visit.module.manager.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;
import com.kang.visit.core.entity.PageParams;
import com.kang.visit.module.manager.entity.Role;
import com.kang.visit.module.manager.entity.UserRoles;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ManagerMapper extends BaseMapper<Role> {

    List<UserRoles> userRolesList(Pagination page);

}
