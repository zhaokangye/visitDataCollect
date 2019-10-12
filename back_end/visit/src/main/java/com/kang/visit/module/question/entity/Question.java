package com.kang.visit.module.question.entity;


import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableLogic;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;


@TableName("question")
public class Question {

    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    private Integer userId;
    private String age;
    private String gender;
    private String isAbroad;
    private String nationality;
    private Integer accompanyNumber;
    private String permanentResidence;
    private String questionType;
    private String visitLocation;
    private String isSpecialVisit;
    private String visitType;
    private String solution;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date visitDate;
    @TableLogic
    private String stsCd;
    private String createBy;
    private Date createTime;
    private Integer updateBy;
    private Date updateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getIsAbroad() {
        return isAbroad;
    }

    public void setIsAbroad(String isAbroad) {
        this.isAbroad = isAbroad;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public Integer getAccompanyNumber() {
        return accompanyNumber;
    }

    public void setAccompanyNumber(Integer accompanyNumber) {
        this.accompanyNumber = accompanyNumber;
    }

    public String getPermanentResidence() {
        return permanentResidence;
    }

    public void setPermanentResidence(String permanentResidence) {
        this.permanentResidence = permanentResidence;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getVisitLocation() {
        return visitLocation;
    }

    public void setVisitLocation(String visitLocation) {
        this.visitLocation = visitLocation;
    }

    public String getIsSpecialVisit() {
        return isSpecialVisit;
    }

    public void setIsSpecialVisit(String isSpecialVisit) {
        this.isSpecialVisit = isSpecialVisit;
    }

    public String getVisitType() {
        return visitType;
    }

    public void setVisitType(String visitType) {
        this.visitType = visitType;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public Date getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(Date visitDate) {
        this.visitDate = visitDate;
    }

    public String getStsCd() {
        return stsCd;
    }

    public void setStsCd(String stsCd) {
        this.stsCd = stsCd;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(Integer updateBy) {
        this.updateBy = updateBy;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

}
