package com.kang.visit.core.util.constants;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Constants {
    /**
     * session中存放用户信息的key值
     */
    public static final String SESSION_USER_INFO = "userInfo";
    public static final String SESSION_USER_PERMISSION = "userPermission";

    public final static Map QUESTION_TABLE_FIELDS = new HashMap();
    static {
        QUESTION_TABLE_FIELDS.put("visitLocation", "来访位置");
        QUESTION_TABLE_FIELDS.put("questionType", "问题类型");
        QUESTION_TABLE_FIELDS.put("isSpecialVisit", "是否特殊申诉");
        QUESTION_TABLE_FIELDS.put("visitType", null);
        QUESTION_TABLE_FIELDS.put("isAbroad", null);
        QUESTION_TABLE_FIELDS.put("accompanyNumber", null);
        QUESTION_TABLE_FIELDS.put("solution", "解决方式");
    }
}
