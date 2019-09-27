package com.kang.visit.module.dict.service;

import com.kang.visit.module.dict.dao.DictMapper;
import com.kang.visit.module.dict.entity.DictEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DictService {

    @Autowired
    private DictMapper dictMapper;

    public List<DictEntity> displayAllDict(){
        return this.dictMapper.selectByMap(null);
    }

    public List<DictEntity> getDictList(String dictType){
        Map<String,Object> params=new HashMap<>(1);
        params.put("dictType",dictType);
        return this.dictMapper.selectByMap(params);
    }
}
