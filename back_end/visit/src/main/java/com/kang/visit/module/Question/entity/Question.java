package com.kang.visit.module.Question.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

import java.util.Date;


@TableName("question")
public class Question {
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    private Integer userId;
    private String age;
    private String gender;
    private String name;
    private String isAbroad;
    private String nationality;
    private Integer accompanyNumber;
    private String permanentResidence;
    private String questionType;
    private String visitLocation;
    private String isSpecialVisit;
    private Date visitDate;
    private String stsCd;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", userId=" + userId +
                ", age='" + age + '\'' +
                ", gender='" + gender + '\'' +
                ", name='" + name + '\'' +
                ", isAbroad='" + isAbroad + '\'' +
                ", nationality='" + nationality + '\'' +
                ", accompanyNumber='" + accompanyNumber + '\'' +
                ", permanentResidence='" + permanentResidence + '\'' +
                ", questionType='" + questionType + '\'' +
                ", visitLocation='" + visitLocation + '\'' +
                ", isSpecialVisit='" + isSpecialVisit + '\'' +
                ", visitDate=" + visitDate +
                ", stsCd='" + stsCd + '\'' +
                '}';
    }
}
