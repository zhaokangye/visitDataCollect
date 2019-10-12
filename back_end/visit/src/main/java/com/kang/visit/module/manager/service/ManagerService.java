package com.kang.visit.module.manager.service;

import com.baomidou.mybatisplus.plugins.pagination.Pagination;
import com.kang.visit.core.entity.PageParams;
import com.kang.visit.core.error.BusinessException;
import com.kang.visit.core.error.EmBusinessError;
import com.kang.visit.core.util.constants.Constants;
import com.kang.visit.module.manager.dao.ManagerMapper;
import com.kang.visit.module.manager.entity.Role;
import com.kang.visit.module.manager.entity.UserRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ManagerService {

    @Autowired
    private ManagerMapper managerMapper;

    public List<UserRoles> userRolesList(Pagination page){
       return managerMapper.userRolesList(page);
    }

    public boolean grantRoles(UserRoles userRoles){
        Map<String,Object> params=new HashMap<>(1);
        Integer userId=userRoles.getUserId();
        params.put(Constants.WXACCOUNT_TABLE_ID,userId);
        List<Role> roles=managerMapper.selectByMap(params);
        switch (roles.size()){
            case 0:
                Role role=new Role();
                role.setUserId(userId);
                role.setRoles(userRoles.getRoles());
                managerMapper.insert(role);
                return true;
            case 1:
                Role existRole=roles.get(0);
                existRole.setRoles(userRoles.getRoles());
                managerMapper.updateById(existRole);
                return true;
            default:
                throw new BusinessException(EmBusinessError.ROLES_ERROR);
        }
    }
}
