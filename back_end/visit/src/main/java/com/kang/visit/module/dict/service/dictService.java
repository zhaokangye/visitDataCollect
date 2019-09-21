package com.kang.visit.module.dict.service;

import com.kang.visit.module.dict.entity.DictEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

@Service
public class dictService {

    boolean addDict(DictEntity dict){

        return true;
    }

}
