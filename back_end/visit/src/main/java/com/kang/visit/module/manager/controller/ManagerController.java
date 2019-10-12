package com.kang.visit.module.manager.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.plugins.Page;
import com.kang.visit.core.controller.BaseController;
import com.kang.visit.core.entity.PageParams;
import com.kang.visit.core.response.CommonReturnType;
import com.kang.visit.module.manager.entity.Role;
import com.kang.visit.module.manager.entity.UserRoles;
import com.kang.visit.module.manager.service.ManagerService;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/manager")
public class ManagerController extends BaseController {

    @Autowired
    private ManagerService managerService;

    @RequiresRoles("admin")
    @RequestMapping("/userRolesList")
    @ResponseBody
    public CommonReturnType userRolesList(@RequestParam String params){
        PageParams pageParams = JSONObject.parseObject(params, PageParams.class);
        Page<UserRoles> page=new Page<>(pageParams.getPn(),pageParams.getSize());
        return CommonReturnType.create(managerService.userRolesList(page));
    }

    @RequiresRoles("admin")
    @RequestMapping("/grantRoles")
    @ResponseBody
    public CommonReturnType grantRoles(@RequestParam String userRoles){
        UserRoles userRolesEntity= JSONObject.parseObject(userRoles,UserRoles.class);
        managerService.grantRoles(userRolesEntity);
        return CommonReturnType.create(null);
    }

}
