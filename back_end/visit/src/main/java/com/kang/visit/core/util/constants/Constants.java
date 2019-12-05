package com.kang.visit.core.util.constants;

import java.util.HashMap;
import java.util.Map;

public class Constants {
    /**
     * session中存放用户信息的key值
     */
    public static final String SESSION_USER_INFO = "userInfo";
    public static final String SESSION_USER_PERMISSION = "userPermission";

    public final static Map QUESTION_TABLE_FIELDS = new HashMap();
    static {
        QUESTION_TABLE_FIELDS.put("visitLocation", "visitLocation");
        QUESTION_TABLE_FIELDS.put("questionType", "questionType");
        QUESTION_TABLE_FIELDS.put("isSpecialVisit", "isSpecialVisit");
        QUESTION_TABLE_FIELDS.put("visitType", "visitType");
        QUESTION_TABLE_FIELDS.put("isAbroad","isAbroad");
        QUESTION_TABLE_FIELDS.put("accompanyNumber", null);
        QUESTION_TABLE_FIELDS.put("solution", "solution");
        QUESTION_TABLE_FIELDS.put("questionnairesNumber",null);
    }

    //表字段
    public static final String WXACCOUNT_TABLE_ID="userId";

    //角色名
    public static final String ADMIN="admin";
    public static final String RECEPTION="reception";
}
