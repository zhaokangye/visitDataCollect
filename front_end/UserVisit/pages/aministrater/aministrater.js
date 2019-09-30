// pages/aministrater/aministrater.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_begin: "",
    date_last: "",

    illegaldateDialog: '日期段不正确，请修改',
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
  /* 判断日期段是否合法 */
  legalDate: function (date_begin, date_last) {
    var start_date = new Date(date_begin.replace(/-/g, "/"));
    var end_date = new Date(date_last.replace(/-/g, "/"));
    var diff = end_date.getTime() - start_date.getTime();

    console.log('diff', diff);
    if (diff >= 0) {
      return true;
    }
    else {
      return false;
    }
  },
  
  showTopTips: function () {
    if (this.legalDate(this.data.date_begin, this.data.date_last)) {
      wx.navigateTo({
        url: '../dataChoose/dataChoose?date_begin=' + this.data.date_begin + '&date_last=' + this.data.date_last,
      })
    }
    else{
      this.openConfirm(this.data.illegaldateDialog);
    }
    
  },
  // 对话框
  openConfirm: function (dialogContent) {
    wx.showModal({
      title: '提示',
      content: dialogContent,
      confirmText: "确定",
      showCancel: false,
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
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