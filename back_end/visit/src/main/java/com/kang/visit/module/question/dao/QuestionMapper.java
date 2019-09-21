package com.kang.visit.module.question.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.kang.visit.module.question.entity.Question;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface QuestionMapper extends BaseMapper<Question> {
    List<Map<String,Object>> visitCount();

    Map<String,Object> isMutilVist();

    List<Map<String,Object>> isAbroadCount();

    List<Map<String,Object>> visitLocationCount();

    List<Map<String,Object>> questionTypeCount();

    List<Map<String,Object>> isSpecialVisitCount();

    Map<String,Object> totalAccompanyNumber();
}
