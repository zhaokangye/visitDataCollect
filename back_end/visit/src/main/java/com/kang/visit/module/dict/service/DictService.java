package com.kang.visit.module.dict.service;

import com.kang.visit.config.shiro.ShiroKit;
import com.kang.visit.core.error.BusinessException;
import com.kang.visit.core.error.EmBusinessError;
import com.kang.visit.core.util.CommonTools;
import com.kang.visit.module.dict.dao.DictMapper;
import com.kang.visit.module.dict.entity.DictEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class DictService {

    @Autowired
    private DictMapper dictMapper;
    @Resource
    private ShiroKit shiroKit;

    public List<String> displayAllDict(){
        return this.dictMapper.displayAllDict();
    }

    public List<DictEntity> getDictList(String dictType){
        Map<String,Object> params=new HashMap<>(1);
        params.put("dictType",dictType);
        return this.dictMapper.selectByMap(params);
    }

    public boolean addDict(String dictType,String dictValues){
        List<Map<String,Object>> dictMaps= CommonTools.dictParser(dictValues);
        for(Map<String,Object> dictMap:dictMaps){
            DictEntity dictEntity=new DictEntity();
            dictEntity.setDictType(dictType);
            dictEntity.setDictName((String) dictMap.get("dictName"));
            dictEntity.setCode((String)dictMap.get("code"));
            dictEntity.setCreateBy(shiroKit.getId());
            dictMapper.insert(dictEntity);
        }
        return true;
    }

    public boolean updateDict(String prevDictType,String currentDictType,String dictValues){
        List<Map<String,Object>> dictMaps= CommonTools.dictParser(dictValues);
        Map<String,Object> param=new HashMap<>(1);
        param.put("dictType",prevDictType);
        List<DictEntity> dictEntities=dictMapper.selectByMap(param);
        if(dictEntities.size()==0){
            throw new BusinessException(EmBusinessError.DATA_NOT_FOUND);
        }
        // 外遍历dictValues，内遍历已有字典
        Iterator<Map<String,Object>> outsideIterator=dictMaps.iterator();
        while (outsideIterator.hasNext()){
            boolean isHandle=false;
            Map<String,Object> dictMap=outsideIterator.next();
            String code=(String) dictMap.get("code");
            String dictName=(String) dictMap.get("dictName");
            Iterator<DictEntity> insideIterator=dictEntities.iterator();
            while (insideIterator.hasNext()){
                DictEntity dictEntity=insideIterator.next();
                if(code.equals(dictEntity.getCode())){
                    // code与已有字典相同，进行修改
                    dictEntity.setDictType(currentDictType);
                    dictEntity.setDictName(dictName);
                    dictEntity.setUpdateBy(shiroKit.getId());
                    dictMapper.updateById(dictEntity);
                    // 修改成功后删除元素
                    outsideIterator.remove();
                    insideIterator.remove();
                    isHandle=true;
                    break;
                }
            }
            if (!isHandle){
                //新value未被处理，即在已有字典中无法匹配，为新增项
                DictEntity addDictEntity=new DictEntity();
                addDictEntity.setDictType(currentDictType);
                addDictEntity.setDictName(dictName);
                addDictEntity.setCode(code);
                addDictEntity.setCreateBy(shiroKit.getId());
                dictMapper.insert(addDictEntity);
                outsideIterator.remove();
            }
        }
        // 处理无法匹配的已有字典（删除）
        for(DictEntity dictEntity:dictEntities){
            dictMapper.deleteById(dictEntity.getId());
        }
        return true;
    }
}
