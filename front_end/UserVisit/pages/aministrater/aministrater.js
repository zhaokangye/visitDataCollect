// pages/aministrater/aministrater.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_begin: "",
    date_last: "",
  },

  bindDate_BeginChange: function (e) {
    this.setData({
      date_begin: e.detail.value
    })
  },
  bindDate_LastChange: function (e) {
    this.setData({
      date_last: e.detail.value
    })
  },

  ageNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&age',
    })
  },
  genderNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&name=gender',
    })
  },
  nationalityNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&name=nationality',
    })
  },
  accompanyNumberNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&name=accompanyNumber',
    })
  },
  permanentResidenceNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&name=permanentResidence',
    })
  },
  questionTypeNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&name=quesitonType',
    })
  },
  visitLocationNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&name=visitLocation',
    })
  },
  isSpecialVisitNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&name=isSpecialVisit',
    })
  },
  visitTypeNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&name=visitType',
    })
  },
  solutionNavigate: function (e) {
    wx.navigateTo({
      url: '../dataChange/dataChange?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last + '&name=solution',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
    this.setData({
      date_begin: DATE,
      date_last: DATE,
    });
  },
})