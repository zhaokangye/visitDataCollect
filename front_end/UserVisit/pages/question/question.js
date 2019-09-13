// pages/domestic/domestic.js
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: ["20以下", "21-30", "31-40","41-50","51-60","60以上"],
    ageIndex: 0,

    qt: ["忘记密码", "账号被盗", "账号被封", "微信支付", "微信公众号", "小程序","QQ","游戏","权力机关调证","其他"],
    qtIndex: 0,

    vl:["TIT","南通","媒体港"],
    vlIndex: 0,

    isv: ["是", "否"],
    isvIndex: 0,

    gender: ["男","女"],
    genderIndex: 0,

    accompany_number: 0,
    permanent_residence: "",
    nationality: "",

    isEmpty: false,
    isAbroad: 1,

    date: "2016-09-01",
  },

  bindAgeChange: function (e) {
    console.log('picker age 发生选择改变，携带值为', e.detail.value);
    
    this.setData({
      ageIndex: e.detail.value
    })
  },

  bindGenderChange: function (e) {
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

  bindAnChange:function(e){
    console.log('输入内容',e.detail.value);
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

  bindQtChange: function (e) {
    console.log('picker qt 发生选择改变，携带值为', e.detail.value);

    this.setData({
      qtIndex: e.detail.value
    })
  },

  bindVlChange: function (e) {
    console.log('picker vl 发生选择改变，携带值为', e.detail.value);

    this.setData({
      vlIndex: e.detail.value
    })
  },

  bindIsvChange: function (e) {
    console.log('picker isv 发生选择改变，携带值为', e.detail.value);

    this.setData({
      isvIndex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  showTopTips: function () {
    var an = this.data.accompany_number;
    var pr = this.data.permanent_residence;
    var that = this;

    // 判断国内用户或外籍用户
    var agelast;
    var nationnalitylast;
    if(isAbroad==0){
      agelast = this.data.age[ageIndex];
      nationnalitylast = "";
    }
    else if(isAbroad==1){
      agelast = "";
      nationnalitylast = this.data.nationality;
    }
    
    if(an > 0 && pr != ""){
      // this.setData({
      //   ageIndex: 0,
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
      // url请求
      wx.request({
        url: '',
        data: {
          sum: [{
            userid:"",
            age: agelast,
            gender: this.data.gender[this.data.genderIndex],
            nationality: nationnalitylast,
            accompany_number: an,
            permanent_residence: pr,
            quest_type: this.data.qt[this.data.qtIndex],
            visit_location: this.data.vl[this.data.vlIndex],
            is_special_visit: this.data.isv[this.data.isvIndex],
            date: this.data.date,
          }]
        },
        method: 'POST',
        header: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log('success')
        },
        fail: function (res) {
          console.log('fail')
        },
      })
    }else{
      this.setData({
        isEmpty: true,
      }),
      setTimeout(function () {
        that.setData({
          isEmpty: false
        });
      }, 3000);
    }
    console.log('accompany_number',an);
    console.log('permanent_residence',pr);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var app = getApp();
    this.setData({
      isAbroad: app.globalData.isAbroad
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})