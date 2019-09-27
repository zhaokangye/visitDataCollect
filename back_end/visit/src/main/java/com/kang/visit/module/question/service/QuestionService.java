package com.kang.visit.module.question.service;

import com.kang.visit.core.error.BusinessException;
import com.kang.visit.core.error.EmBusinessError;
import com.kang.visit.core.util.constants.Constants;
import com.kang.visit.module.question.dao.QuestionMapper;
import com.kang.visit.module.question.entity.ChartsParams;
import com.kang.visit.module.question.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // ${}会带来sql注入的威胁，使用枚举检查参数
    public List<Map<String,Object>> countGroupByField(ChartsParams params)  {
        if(Constants.QUESTION_TABLE_FIELDS.containsKey(params.getField())){
            String dictType=(String)Constants.QUESTION_TABLE_FIELDS.get(params.getField());
            if(dictType==null){
                return this.questionMapper.countGroupByField(params);
            }else {
                params.setDictType(dictType);
                return this.questionMapper.countGroupByField(params);
            }
        }
        throw new BusinessException(EmBusinessError.POSSIBLE_SQL_INJECT);
    }
}
