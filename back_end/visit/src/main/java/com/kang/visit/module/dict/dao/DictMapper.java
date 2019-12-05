package com.kang.visit.module.dict.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.kang.visit.module.dict.entity.DictEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DictMapper extends BaseMapper<DictEntity> {

    List<String> displayAllDict();

    List<DictEntity> getDictList(@Param("dictType") String dictType);

    List<DictEntity> getDictListForQuestion(@Param("field") String field);

    Integer checkDuplicateDict(@Param("dictType") String dictType,@Param("field") String field);
}
