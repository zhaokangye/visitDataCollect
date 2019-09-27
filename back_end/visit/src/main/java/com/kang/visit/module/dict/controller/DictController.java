package com.kang.visit.module.dict.controller;

import com.kang.visit.core.response.CommonReturnType;
import com.kang.visit.module.dict.service.DictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dict")
public class DictController {

    @Autowired
    private DictService dictService;

    @RequestMapping("/displayAllDict")
    public CommonReturnType displayAllDict(){
        return CommonReturnType.create(dictService.displayAllDict());
    }

    @RequestMapping("/getDictList")
    @ResponseBody
    public CommonReturnType getDictList(@RequestParam String dictType){
        return CommonReturnType.create(dictService.getDictList(dictType));
    }


}
