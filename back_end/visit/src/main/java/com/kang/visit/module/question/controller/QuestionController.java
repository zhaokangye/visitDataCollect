package com.kang.visit.module.question.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.kang.visit.config.shiro.ShiroKit;
import com.kang.visit.core.controller.BaseController;
import com.kang.visit.core.error.BusinessException;
import com.kang.visit.core.error.EmBusinessError;
import com.kang.visit.module.question.entity.ChartsParams;
import com.kang.visit.module.question.entity.Question;
import com.kang.visit.core.response.CommonReturnType;
import com.alibaba.fastjson.JSONObject;
import com.kang.visit.module.question.entity.QuestionParams;
import com.kang.visit.module.question.entity.QuestionVo;
import com.kang.visit.module.question.service.QuestionService;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/question")
public class QuestionController extends BaseController {

    @Autowired
    private QuestionService questionService;
    @Resource
    private ShiroKit shiroKit;

    @RequiresRoles("reception")
    @RequestMapping("/saveQuestion")
    @ResponseBody
    public CommonReturnType saveQuestion(@RequestParam String question){
        QuestionVo questionVoEntity= JSONObject.parseObject(question,QuestionVo.class);
        Question questionEntity=new Question();
        BeanUtils.copyProperties(questionVoEntity,questionEntity);
        questionEntity.setUserId(shiroKit.getId());
        questionEntity.setCreateTime(new Date());
        questionService.createVisit(questionEntity);
        return CommonReturnType.create(questionEntity.getId());
    }

    @RequiresRoles("reception")
    @RequestMapping("/deleteQuestion")
    @ResponseBody
    public CommonReturnType deleteQuestion(@RequestParam Integer questionId){
        return CommonReturnType.create(questionService.deleteQuestion(questionId));
    }

    @RequiresRoles("reception")
    @RequestMapping("/updateQuestion")
    @ResponseBody
    public CommonReturnType updateQuestion(@RequestParam String question){
        QuestionVo questionVoEntity= JSONObject.parseObject(question,QuestionVo.class);
        Question questionEntity=new Question();
        BeanUtils.copyProperties(questionVoEntity,questionEntity);
        questionEntity.setUpdateBy(shiroKit.getId());
        questionEntity.setUpdateTime(new Date());
        return CommonReturnType.create(questionService.updateQuestion(questionEntity));
    }

    @RequiresRoles("reception")
    @RequestMapping("/questionList")
    @ResponseBody
    public CommonReturnType questionList(@RequestParam String params){
        QuestionParams questionParams = JSONObject.parseObject(params, QuestionParams.class);
        Page<Question> page=new Page<>(questionParams.getPn(),questionParams.getSize());
        return CommonReturnType.create(questionService.selectQuestionList(page,questionParams));
    }

    @RequiresRoles("admin")
    @RequestMapping("/countGroupByField")
    @ResponseBody
    public CommonReturnType countGroupByField(@RequestParam String params){
        ChartsParams chartsParams = JSONObject.parseObject(params, ChartsParams.class);
        List<Map<String,Object>> list=questionService.countGroupByField(chartsParams);
        if(list.size()==0){
            throw new BusinessException(EmBusinessError.DATA_NOT_FOUND);
        }
        return CommonReturnType.create(list);
    }

}
