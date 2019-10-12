package com.kang.visit.module.dict.controller;

import com.kang.visit.core.error.BusinessException;
import com.kang.visit.core.error.EmBusinessError;
import com.kang.visit.core.response.CommonReturnType;
import com.kang.visit.module.dict.entity.DictEntity;
import com.kang.visit.module.dict.service.DictService;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dict")
public class DictController {

    @Autowired
    private DictService dictService;

    @RequiresRoles("admin")
    @RequestMapping("/displayAllDict")
    @ResponseBody
    public CommonReturnType displayAllDict(){
        return CommonReturnType.create(dictService.displayAllDict());
    }

    @RequestMapping("/getDictList")
    @ResponseBody
    public CommonReturnType getDictList(@RequestParam String dictType){
        List<DictEntity> dictEntityList=dictService.getDictList(dictType);
        if(dictEntityList.size()==0){
            throw new BusinessException(EmBusinessError.DATA_NOT_FOUND);
        }
        return CommonReturnType.create(dictEntityList);
    }

    @RequiresRoles("admin")
    @RequestMapping("/addDict")
    @ResponseBody
    public CommonReturnType addDict(@RequestParam String dictType,@RequestParam String dictValues){
        return CommonReturnType.create(dictService.addDict(dictType,dictValues));
    }

    @RequiresRoles("admin")
    @RequestMapping("/updateDict")
    @ResponseBody
    public CommonReturnType updateDict(@RequestParam String prevDictType,@RequestParam String currentDictType,@RequestParam String dictValues){
        return CommonReturnType.create(dictService.updateDict(prevDictType,currentDictType,dictValues));
    }

}
