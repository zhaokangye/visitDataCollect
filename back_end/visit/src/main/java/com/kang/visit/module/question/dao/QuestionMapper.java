package com.kang.visit.module.question.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;
import com.kang.visit.module.question.entity.ChartsParams;
import com.kang.visit.module.question.entity.Question;
import com.kang.visit.module.question.entity.QuestionParams;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface QuestionMapper extends BaseMapper<Question> {

    List<Map<String,Object>> countGroupByField(ChartsParams params);

    List<Question> selectQuestionList(Pagination page, QuestionParams params);

}
