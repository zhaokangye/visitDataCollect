package com.kang.visit.config.redis.prefix;

import com.kang.visit.config.redis.prefix.base.BasePrefix;
import com.kang.visit.module.dict.entity.DictEntity;

public class DictPrefix extends BasePrefix {

    public DictPrefix(String prefix) {
        super(prefix);
    }

    public DictPrefix(int expireSeconds, String prefix) {
        super(expireSeconds, prefix);
    }

    public DictPrefix attachPrefix(DictEntity dict,String field){
        StringBuilder prefix=new StringBuilder();
        prefix.append("dict:");
        prefix.append("id:");
        prefix.append(dict.getId());
        prefix.append(":");
        prefix.append(field);
        prefix.append(":");
        return null;
    }
}
