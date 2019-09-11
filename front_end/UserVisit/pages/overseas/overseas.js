// pages/overseas/overseas.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: ["请选择性别", "男", "女"],
    genderIndex: 0,

    qt: ["请选择问题类别", "忘记密码", "账号被盗", "账号被封", "微信支付", "微信公众号", "小程序", "QQ", "游戏", "权力机关调证", "其他"],
    qtIndex: 0,

    vl: ["请选择来访位置", "TIT", "南通", "媒体港"],
    vlIndex: 0,

    isv: ["请选择是或否", "是", "否"],
    isvIndex: 0,

    date: "2016-09-01",

    nationality: "",
    accompany_number: 0,
    permanent_residence:"",

    isEmpty: false,
  },

  bindGenderChange: function(e) {
    console.log('picker gender 发生选择改变，携带值为', e.detail.value);

    this.setData({
      genderIndex: e.detail.value
    })
  },

  bindNaChange: function (e) {
    console.log('输入内容', e.detail.value);
    this.setData({
      nationality: e.detail.value
    })
  },

  bindAnChange: function (e) {
    console.log('输入内容', e.detail.value);
    this.setData({
      accompany_number: e.detail.value
    })
  },

  bindPrChange: function (e) {
    console.log('输入内容', e.detail.value);
    this.setData({
      permanent_residence: e.detail.value
    })
  },

  bindQtChange: function(e) {
    console.log('picker qt 发生选择改变，携带值为', e.detail.value);

    this.setData({
      qtIndex: e.detail.value
    })
  },

  bindVlChange: function(e) {
    console.log('picker vl 发生选择改变，携带值为', e.detail.value);

    this.setData({
      vlIndex: e.detail.value
    })
  },

  bindIsvChange: function(e) {
    console.log('picker isv 发生选择改变，携带值为', e.detail.value);

    this.setData({
      isvIndex: e.detail.value
    })
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  showTopTips: function() {
    var nationality = this.data.nationality;
    var an = this.data.accompany_number;
    var pr = this.data.permanent_residence;
    var that = this;

    if (an > 0 && pr != "" && nationality != "") {
      // this.setData({
      //   nationality: "",
      //   qtIndex: 0,
      //   vlIndex: 0,
      //   isvIndex: 0,
      //   genderIndex: 0,
      //   accompany_number: 0,
      //   permanent_residence: "",
      // }),
      wx.navigateTo({
        url: '../finish/finish',
      })
    } else {
      this.setData({
          isEmpty: true,
        }),
        setTimeout(function() {
          that.setData({
            isEmpty: false
          });
        }, 3000);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})