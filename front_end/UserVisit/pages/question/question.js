// pages/domestic/domestic.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // age: ["20以下", "21-30", "31-40","41-50","51-60","60以上"],
    age: '',
    ageType: '年龄段', 
    ageField: 'age',
    ageIndex: 0,

    // qt: ["忘记密码", "账号被盗", "账号被封", "微信支付", "微信公众号", "小程序","QQ","游戏","权力机关调证","其他"],
    qt: '',
    qtType: '问题类型',
    qtField: 'questionType',
    qtIndex: 0,

    // vl:["TIT","南通","媒体港"],
    vl: '',
    vlType: '来访位置',
    vlField: 'visitLocation',
    vlIndex: 0,

    // isv: ["正常", "异常"],
    isv: '',
    isvType: '是否特殊申诉',
    isvField: 'isSpecialVisit',
    isvIndex: 0,

    // gender: ["男","女"],
    gender: '',
    genderType: '性别',
    genderField: 'gender',
    genderIndex: 0,

    // vt: ["首次", "二次"],
    vt: '',
    vtType: '来访类型',
    vtField: 'visitType',
    vtIndex: 0,

    // solution: ["指引登记", "指引深圳", "现场解决"],
    solution: '',
    solutionType: '解决方式',
    solutionField: 'soulution',
    solutionIndex: 0,

    accompany_number: 0,
    permanent_residence: "",
    nationality: "",

    isEmpty: false,
    isAbroad: 1,

    date: "",
    localdate: "",

    question:{},
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

  bindVtChange: function (e) {
    console.log('picker vt 发生选择改变，携带值为', e.detail.value);
    this.setData({
      vtIndex: e.detail.value
    })
  },

  bindSolutionChange: function (e) {
    this.setData({
      solutionIndex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  showTopTips: function () {
    var dialogContent, url;
    var that = this;
    this.collectData();
    // 判断空
    if(this.data.question.nationality == ""){
      console.log("nationality null");
      dialogContent = "国籍不能为空";
      url = 0;
    }
    else if(this.data.question.accompanyNumber == ""){
      console.log("accompanyNumber null");
      dialogContent = "来访人数不能为空";
      url = 0;
    }
    else if(this.data.question.permanentResidence == ""){
      console.log("permanentResidence null");
      dialogContent = "常住地不能为空";
      url = 0;
    }
    else{
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT/question/saveQuestion',
        data: {
          question: JSON.stringify(this.data.question)
        },
        method: 'POST',
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        success: function (res) {
          console.log('success')
          
        },
        fail: function (res) {
          console.log('connect fail');
          console.log(res);
          // dialogContent = "请勿重复提交";
          
        },
      })
      dialogContent = '提交成功';
      url = 1;
    }
    // 弹出消息框
    console.log(dialogContent);
    that.openConfirm(dialogContent, url);
  },

  helloTest:function(){
    console.log('hello world')
  },
  // 对话框
  openConfirm: function (dialogContent, url) {
    wx.showModal({
      title: '提示',
      content: dialogContent,
      confirmText: "确定",
      showCancel: false,
      success: function (res) {
        console.log(res);
        if (res.confirm&&url==1) {
          console.log('用户点击确定')
          wx.navigateBack({
            delta: url,
          })
        }
        else {
          console.log('用户点击确定，但不跳转')
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
      localdate: DATE,
    });
    this.ageGetNC();
    this.genderGetNC();
    this.isvGetNC();
    this.vtGetNC();
    this.qtGetNC();
    this.vlGetNC();
    this.solutionGetNC();
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
   * getNameCode/得到字典中的dictName和code 
   */
  ageGetNC: function() {
    var that = this
    that.getOption(that.data.ageType).then(res => {
      that.setData({
        age: res,
      })
    })
  },
  genderGetNC: function () {
    var that = this
    that.getOption(that.data.genderType).then(res => {
      that.setData({
        gender: res,
      })
    })
  },
  isvGetNC: function () {
    var that = this
    that.getOption(that.data.isvType).then(res => {
      that.setData({
        isv: res,
      })
    })
  },
  vtGetNC: function () {
    var that = this
    that.getOption(that.data.vtType).then(res => {
      that.setData({
        vt: res,
      })
    })
  },
  qtGetNC: function () {
    var that = this
    that.getOption(that.data.qtType).then(res => {
      that.setData({
        qt: res,
      })
    })
  },
  vlGetNC: function () {
    var that = this
    that.getOption(that.data.vlType).then(res => {
      that.setData({
        vl: res,
      })
    })
  },
  solutionGetNC: function () {
    var that = this
    that.getOption(that.data.solutionType).then(res => {
      that.setData({
        solution: res,
      })
    })
  },
  getOption: function (type) {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT/dict/getDictList',
          // url: '',
          data: {
            // dictType: JSON.stringify(type)
            dictType: type,
          },
          header: {
            "Content-type": "application/x-www-form-urlencoded",
            "Authorization": wx.getStorageSync('token'),
          },
          method: 'POST',

          success: function (res) {
            console.log(res)
            console.log("success")
            resolve(res.data.data)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
            reject(res)
          },
          complete: function (res) {
            console.log("complete")
          },
      })
    })
  },

  collectData:function(){
    var an = this.data.accompany_number;
    var pr = this.data.permanent_residence;

    // 判断国内用户或外籍用户
    var agelast;
    var nationnalitylast;
    if (this.data.isAbroad == 0) {
      agelast = this.data.age[this.data.ageIndex].code;
      nationnalitylast = "null";
    }
    else if (this.data.isAbroad == 1) {
      agelast = "null";
      nationnalitylast = this.data.nationality;
    }

    // 获取日期与具体时间
    var visitDate;
    if(this.data.date==this.data.localdate){
      // visitDate = this.data.date + ' ' + util.formatTime(new Date());
      visitDate = util.formatRealTime(new Date(this.data.date + ' ' + util.formatTime(new Date())))
      // var hour = visitDate.substring(11,13);
      // hour = parseInt(hour) + 8;

    }
    else{
      // visitDate = this.data.date + ' ' + '00:00:00';
      visitDate = util.formatRealTime(new Date(this.data.date + ' ' + '00:00:00'))
    }
    console.log(visitDate);

    var that=this
    that.setData({
      question:{
        // userId: wx.getStorageSync("userid"),
        age: agelast,
        gender: this.data.gender[this.data.genderIndex].code,
        isAbroad:this.data.isAbroad,
        nationality: nationnalitylast,
        accompanyNumber: an,
        permanentResidence: pr,
        questionType: this.data.qt[this.data.qtIndex].code,
        visitLocation: this.data.vl[this.data.vlIndex].code,
        // isSpecialVisit: this.data.isv[this.data.isvIndex],
        // visitType: this.data.vt[this.data.vtIndex],
        isSpecialVisit: this.data.isv[this.data.isvIndex].code,
        visitType: this.data.vt[this.data.vtIndex].code,
        solution: this.data.solution[this.data.solutionIndex].code,
        visitDate: visitDate,
      }
    })
    console.log(that.data.question)
  }

})