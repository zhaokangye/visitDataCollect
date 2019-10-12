package com.kang.visit.core.util;

import com.kang.visit.core.error.BusinessException;
import com.kang.visit.core.error.EmBusinessError;

import java.util.*;

public class CommonTools {

    public static Set<String> parseFromRoles(String str){
        if(str.isEmpty()){
            return null;
        }
        Set<String> roles=new HashSet<>(Arrays.asList(str.split(",")));
        return roles;
    }

    /*
    *   解析dictValues,格式为code:name,code:name,...
    */
    public static List<Map<String,Object>> dictParser(String dictValues){
        dictValues=dictValues.replace("，",",");
        dictValues=dictValues.replace("：",":");
        List<String> usedCode=new ArrayList<>();
        List<Map<String,Object>> dictMap=new ArrayList<>();
        String[] values=dictValues.split(",");
        for(String value:values){
            String[] forMap=value.split(":");
            if (forMap.length!=2){
                throw new BusinessException(EmBusinessError.UNKNOW_ERROR);
            }
            Map<String,Object> map=new HashMap<>();
            // 待处理全角空格
            map.put("code",forMap[0].trim());
            map.put("dictName",forMap[1].trim());
            if(!usedCode.contains(forMap[0])){
                dictMap.add(map);
                usedCode.add(forMap[0]);
                continue;
            }
            throw new BusinessException(EmBusinessError.DICT_REPEAT);
        }
        return dictMap;
    }

    public static void main(String[] args) {

    }
}
