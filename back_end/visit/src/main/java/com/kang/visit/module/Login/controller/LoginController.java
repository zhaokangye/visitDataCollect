package com.kang.visit.module.Login.controller;

import com.kang.visit.core.controller.BaseController;
import com.kang.visit.core.error.BusinessException;
import com.kang.visit.core.response.CommonReturnType;
import com.kang.visit.module.Login.entity.User;
import com.kang.visit.module.Login.service.LoginService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class LoginController extends BaseController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public CommonReturnType login() throws BusinessException {
        System.out.println("hello");
//        String openid =loginService.code2session(code).get("openid").toString();
//        Subject subject = SecurityUtils.getSubject();
//        //使用自定义realm验证openid是否已绑定用户
//        User token=new User();
//        token.setOpen_id(openid);
//        subject.login(token);
       return CommonReturnType.create("success");
    }

    @RequestMapping("/register")
    public CommonReturnType register(@RequestParam String code) throws BusinessException {
        return CommonReturnType.create(loginService.login(code));
    }
}
