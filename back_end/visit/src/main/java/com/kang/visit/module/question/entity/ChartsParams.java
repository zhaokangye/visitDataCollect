package com.kang.visit.module.question.entity;

import java.sql.Date;

public class ChartsParams {

    private String field;

    private String dictType;

    private Date startDate;

    private Date endDate;

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getDictType() {
        return dictType;
    }

    public void setDictType(String dictType) {
        this.dictType = dictType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
