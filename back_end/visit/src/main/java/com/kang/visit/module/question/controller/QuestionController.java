package com.kang.visit.module.question.controller;

import com.kang.visit.config.shiro.ShiroKit;
import com.kang.visit.core.controller.BaseController;
import com.kang.visit.module.question.entity.Question;
import com.kang.visit.core.response.CommonReturnType;
import com.alibaba.fastjson.JSONObject;
import com.kang.visit.module.question.service.QuestionService;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/question")
public class QuestionController extends BaseController {

    @Autowired
    private QuestionService questionService;
    @Resource
    private ShiroKit shiroKit;

    @RequestMapping("/saveQuestion")
    @ResponseBody
    public CommonReturnType saveQuestion(@RequestParam String question){
        Question questionEntity= JSONObject.parseObject(question,Question.class);
        questionEntity.setUserId(shiroKit.getId());
        questionService.createVisit(questionEntity);
        return CommonReturnType.create(questionEntity.getId());
    }

    @RequiresRoles("admin")
    @RequestMapping("/visitCount")
    @ResponseBody
    public CommonReturnType visitCount(){
        List<Map<String,Object>> counts=questionService.visitCount();
        return CommonReturnType.create(counts);
    }

    @RequiresRoles("admin")
    @RequestMapping("/isMutilVist")
    @ResponseBody
    public CommonReturnType isMutilVist(){
        List<Map<String,Object>> counts=questionService.isMutilVist();
        return CommonReturnType.create(counts);
    }

    @RequiresRoles("admin")
    @RequestMapping("/isAbroadCount")
    @ResponseBody
    public CommonReturnType isAbroadCount(){
        List<Map<String,Object>> counts=questionService.isAbroadCount();
        return CommonReturnType.create(counts);
    }

    @RequiresRoles("admin")
    @RequestMapping("/visitLocationCount")
    @ResponseBody
    public CommonReturnType visitLocationCount(){
        List<Map<String,Object>> counts=questionService.visitLocationCount();
        return CommonReturnType.create(counts);
    }

    @RequiresRoles("admin")
    @RequestMapping("/questionTypeCount")
    @ResponseBody
    public CommonReturnType questionTypeCount(){
        List<Map<String,Object>> counts=questionService.questionTypeCount();
        return CommonReturnType.create(counts);
    }

    @RequiresRoles("admin")
    @RequestMapping("/isSpecialVisitCount")
    @ResponseBody
    public CommonReturnType isSpecialVisitCount(){
        List<Map<String,Object>> counts=questionService.isSpecialVisitCount();
        return CommonReturnType.create(counts);
    }

    @RequiresRoles("admin")
    @RequestMapping("/totalAccompanyNumber")
    @ResponseBody
    public CommonReturnType totalAccompanyNumber(){
        Map<String,Object> counts=questionService.totalAccompanyNumber();
        return CommonReturnType.create(counts);
    }
}
