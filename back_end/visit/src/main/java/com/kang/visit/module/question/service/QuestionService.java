package com.kang.visit.module.question.service;

import com.kang.visit.module.question.dao.QuestionMapper;
import com.kang.visit.module.question.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuestionService {

    @Autowired
    private QuestionMapper questionMapper;

    public Question createVisit(Question question){
        this.questionMapper.insert(question);
        return question;
    }

    public List<Map<String,Object>> visitCount(){
        return this.questionMapper.visitCount();
    }

    public List<Map<String,Object>> isMutilVist(){
        Map<String,Object> info=this.questionMapper.isMutilVist();
        Integer firstVisit=(Integer) info.get("firstVisit");
        Integer mutilVisit=(Integer)info.get("mutilVisit");
        Map<String,Object> firstVistMap=new HashMap<>(2);
        Map<String,Object> mutilVistMap=new HashMap<>(2);
        firstVistMap.put("name","首次");
        firstVistMap.put("value",firstVisit);
        mutilVistMap.put("name","二次");
        mutilVistMap.put("value",mutilVisit);
        List<Map<String,Object>> list=new ArrayList<>();
        list.add(firstVistMap);
        list.add(mutilVistMap);
        return list;
    }

    public List<Map<String,Object>> isAbroadCount(){
        return this.questionMapper.isAbroadCount();
    }

    public List<Map<String,Object>> visitLocationCount(){
        return this.questionMapper.visitLocationCount();
    }

    public List<Map<String,Object>> questionTypeCount(){
        return this.questionMapper.questionTypeCount();
    }

    public List<Map<String,Object>> isSpecialVisitCount(){
        return this.questionMapper.isSpecialVisitCount();
    }

    public Map<String,Object> totalAccompanyNumber(){
        return this.questionMapper.totalAccompanyNumber();
    }
}
