package com.kang.visit.core.error;

public enum EmBusinessError implements CommonError {
    PARAMETER_VALIDATION_ERROR(10001,"参数不合法"),
    UNKNOW_ERROR(10002,"未知错误"),
    NOT_EXIST(10003,"不存在"),
    NOT_AUTHORIZE(10004,"无权限"),

    ALREADY_REGISTERD(20001,"该用户名已注册"),
    WROING_PASSWORD(20003,"密码不正确"),
    NOT_LOGIN(20004,"未登录"),

    ;

    private int errCode;
    private String errMsg;

    private EmBusinessError(int errCode,String errMsg){
        this.errCode=errCode;
        this.errMsg=errMsg;
    }

    @Override
    public int getErrCode() {
        return this.errCode;
    }

    @Override
    public String getErrMsg() {
        return this.errMsg;
    }

    @Override
    public CommonError setErrMsg(String errMsg) {
        this.errMsg=errMsg;
        return this;
    }
}
