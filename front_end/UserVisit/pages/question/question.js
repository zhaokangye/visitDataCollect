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

    question:{}
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
    this.collectData();
    // 判断空
    if(this.data.question.nationality == ""){
      console.log("nationality null");
      var dialogContent = '国籍不能为空';
      this.openConfirm(dialogContent);
    }
    else if(this.data.question.accompanyNumber == ""){
      console.log("accompanyNumber null");
      var dialogContent = '同行人数不能为空';
      this.openConfirm(dialogContent);
    }
    else if(this.data.question.permanentResidence == ""){
      console.log("permanentResidence null");
      var dialogContent = '常住地不能为空';
      this.openConfirm(dialogContent);
    }
    else{
      wx.request({
        url: 'http://localhost:8090/question/saveQuestion',
        data: {
          question: JSON.stringify(this.data.question)
        },
        method: 'POST',
        header: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log('success')
          wx.navigateTo({
            url: '../finish/finish',
          })
        },
        fail: function (res) {
          console.log('connect fail')
          var dialogContent = '已提交';
          this.openConfirm(dialogContent);
        },
      })
    }
      // this.setData({
      //   ageIndex: 0,
      //   qtIndex: 0,
      //   vlIndex: 0,
      //   isvIndex: 0,
      //   genderIndex: 0,
      //   accompany_number: 0,
      //   permanent_residence: "",
      // }),
      // url请求
      
    // }else{
    //   this.setData({
    //     isEmpty: true,
    //   }),
    //   setTimeout(function () {
    //     this.setData({
    //       isEmpty: false
    //     });
    //   }, 3000);
    // }
  },
  // 对话框
  openConfirm: function (dialogContent) {
    wx.showModal({
      title: '错误提示',
      content: dialogContent,
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
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

  collectData:function(){
    var an = this.data.accompany_number;
    var pr = this.data.permanent_residence;

    // 判断国内用户或外籍用户
    var agelast;
    var nationnalitylast;
    if (this.data.isAbroad == 0) {
      agelast = this.data.age[this.data.ageIndex];
      nationnalitylast = "null";
    }
    else if (this.data.isAbroad == 1) {
      agelast = "null";
      nationnalitylast = this.data.nationality;
    }

    var that=this
    that.setData({
      question:{
        userId: wx.getStorageSync("userid"),
        age: agelast,
        gender: this.data.gender[this.data.genderIndex],
        isAbroad:this.data.isAbroad,
        nationality: nationnalitylast,
        accompanyNumber: an,
        permanentResidence: pr,
        questionType: this.data.qt[this.data.qtIndex],
        visitLocation: this.data.vl[this.data.vlIndex],
        isSpecialVisit: this.data.isv[this.data.isvIndex],
        visitDate: this.data.date,
      }
    })
    console.log(that.data.question)
  }

})