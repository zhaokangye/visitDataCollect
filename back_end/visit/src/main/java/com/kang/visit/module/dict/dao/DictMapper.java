package com.kang.visit.module.dict.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.kang.visit.module.dict.entity.DictEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DictMapper extends BaseMapper<DictEntity> {
}
