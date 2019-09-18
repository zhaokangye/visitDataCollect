package com.kang.visit.module.Question.controller;

import com.kang.visit.core.controller.BaseController;
import com.kang.visit.module.Question.entity.Question;
import com.kang.visit.core.response.CommonReturnType;
import com.alibaba.fastjson.JSONObject;
import com.kang.visit.module.Question.service.QuestionService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/question")
public class QuestionController extends BaseController {

    @Autowired
    private QuestionService questionService;

    @RequestMapping("/saveQuestion")
    @ResponseBody
    public CommonReturnType saveQuestion(@RequestParam String question){
        Question questionEntity= JSONObject.parseObject(question,Question.class);
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
