package com.kang.visit.module.login.controller;

import com.kang.visit.module.login.service.WxAccountService;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by EalenXie on 2018/11/26 10:44.
 * 小程序后台 某 API
 */
@RestController
@RequestMapping("/")
public class WxAppletController {

    @Resource
    private WxAccountService wxAccountService;

    /**
     * 微信小程序端用户登陆api
     * 返回给小程序端 自定义登陆态 token
     */
    @RequestMapping("/login")
    public ResponseEntity wxAppletLoginApi(@RequestParam String code,@RequestParam(required = false) String nickName) {
        if (code.isEmpty()) {
            Map<String, String> result = new HashMap<>();
            result.put("msg", "缺少参数或参数不合法");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(wxAccountService.wxUserLogin(code,nickName), HttpStatus.OK);
        }
    }

}
