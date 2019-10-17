// pages/dataChange/dataChange.js
var pages = getCurrentPages();
var prePage = pages[pages.length - 2];
// var info = prePage.data;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getid: "",
    
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

    // isv: [{ 'dictName': "正常" }, { 'dictName': "异常"} ],
    isv: '',
    isvType: '是否特殊申诉',
    isvField: 'isSpecialVisit',
    isvIndex: 0,

    // gender: ["男","女"],
    gender: '',
    genderType: '性别',
    genderField: 'gender',
    genderIndex: 0,

    // vt: [{'dictName': "首次"}, {'dictName': "二次"}],
    vt: '',
    vtType: '来访类型',
    vtField: 'visitType',
    vtIndex: 0,

    // solution: ["指引登记", "指引深圳", "现场解决"],
    solution: '',
    solutionType: '解决方式',
    solutionField: 'solution',
    solutionIndex: 0,

    accompany_number: 0,
    permanent_residence: "",
    nationality: "",

    getDictListUrl: '/dict/getDictListForQuestion',
    deleteQuestionUrl: '/question/deleteQuestion',
    updateQuestionUrl: '/question/updateQuestion',

    isEmpty: false,

    isAbroad: 2,
    isAbroadType: '国内外',
    isAbroadField: 'isAbroad',
    isAbroadContent: '',

    date: "",
    localdate: "",
    curtime: "",

    question: '',
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
    console.log('picker solution 发生选择改变，携带值为', e.detail.value);
    this.setData({
      solutionIndex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker date 发生选择改变，携带值为', e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },

  bindIsAbroadChange: function (e) {
    console.log('picker isAbroad 发生选择改变，携带值为', e.detail.value);
    this.setData({
      isAbroad: e.detail.value
    })
  },
  
  /**
   * 提交按钮
   */
  showTopTips: function () {
    var dialogContent, url;
    var that = this;
    this.collectData();
    // 判断空
    if (this.data.question.nationality == "") {
      console.log("nationality null");
      dialogContent = "国籍不能为空";
      url = 0;
      // 弹出消息框
      console.log(dialogContent);
      that.openConfirm(dialogContent, url);
    }
    else if (this.data.question.accompanyNumber == "") {
      console.log("accompanyNumber null");
      dialogContent = "来访人数不能为空";
      url = 0;
      // 弹出消息框
      console.log(dialogContent);
      that.openConfirm(dialogContent, url);
    }
    else if (this.data.question.permanentResidence == "") {
      console.log("permanentResidence null");
      dialogContent = "常住地不能为空";
      url = 0;
      // 弹出消息框
      console.log(dialogContent);
      that.openConfirm(dialogContent, url);
    }
    else {
      this.summitQuestion(this.data.question, this.data.updateQuestionUrl)
        // dialogContent = '提交成功';
        // url = 1;
        // // 弹出消息框
        // console.log(dialogContent);
        // that.openConfirm(dialogContent, url);
      // })
    }
    
  },

  /**
   * 删除按钮
   */
  bindDeleteQuestion: function () {
    var that = this;
    this.deleteQuestion(that.data.question.id, that.data.deleteQuestionUrl);
  },

  helloTest: function () {
    console.log('hello world')
  },

  /**
   * 对话框
   * url=0 保持在当前页面
   * url=1 返回上一页面
   */
  openConfirm: function (dialogContent, url) {
    var that = this;
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
    this.setData({
      question: JSON.parse(options.data),
    });
    console.log('question', this.data.question);
    // 设置问题中的数据
    this.ageGetNC();
    this.genderGetNC();
    this.qtGetNC();
    this.vlGetNC();
    this.solutionGetNC();
    this.setData({
      isAbroad: this.data.question.isAbroad,
      nationality: this.data.question.nationality,
      accompany_number: this.data.question.accompanyNumber,
      permanent_residence: this.data.question.permanentResidence,
    });
    this.isvGetNC();
    this.vtGetNC();
    this.isAbroadGetNC();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var item = this.data.question.visitDate;
    console.log('item', typeof item);
    // var item = '2018-12-12 19:28:10';
    // 设置日期
    this.setData({
      date: item.substring(0, 10),
      curtime: item.substring(11, 19),
      localdate: item.substring(0, 10),
    }) 
    console.log('curdate', this.data.date, this.data.curtime);
  },

  /**
   * get Name Code/根据字典得到dictName和code
   */
  ageGetNC: function () {
    var that = this;
    that.getOption(that.data.ageField).then(res => {
      that.setData({
        age: res,
        ageType: res[0].dictType,
      })
      console.log('age', res);
      // 设置初始index
      that.setData({
        ageIndex: that.setIndexForPicker(that.data.age, that.data.question.age),
      })
    })
    
  },
  genderGetNC: function () {
    var that = this
    that.getOption(that.data.genderField).then(res => {
      that.setData({
        gender: res,
        genderType: res[0].dictType,
      })
      // 设置初始index
      that.setData({
        genderIndex: that.setIndexForPicker(that.data.gender, that.data.question.gender),
      })
    })
    
  },
  qtGetNC: function () {
    var that = this
    that.getOption(that.data.qtField).then(res => {
      that.setData({
        qt: res,
        qtType: res[0].dictType,
      })
      // 设置初始index
      that.setData({
        qtIndex: that.setIndexForPicker(that.data.qt, that.data.question.questionType),
      })
    })
  },
  vlGetNC: function () {
    var that = this
    that.getOption(that.data.vlField).then(res => {
      that.setData({
        vl: res,
        vlType: res[0].dictType,
      })
      // 设置初始index
      that.setData({
        vlIndex: that.setIndexForPicker(that.data.vl, that.data.question.visitLocation),
      })
    })
  },
  solutionGetNC: function () {
    var that = this
    that.getOption(that.data.solutionField).then(res => {
      that.setData({
        solution: res,
        solutionType: res[0].dictType,
      })
      // 设置初始index
      that.setData({
        solutionIndex: that.setIndexForPicker(that.data.solution, that.data.question.solution),
      })
    })
  },
  isvGetNC: function () {
    var that = this;
    that.getOption(that.data.isvField).then(res => {
      that.setData({
        isv: res,
        isvType: res[0].dictType,
      })
      // 设置初始index
      that.setData({
        isvIndex: that.setIndexForPicker(that.data.isv, that.data.question.isSpecialVisit),
      })
    })
  },
  vtGetNC: function () {
    var that = this;
    that.getOption(that.data.vtField).then(res => {
      that.setData({
        vt: res,
        vtType: res[0].dictType,
      })
      // 设置初始index
      that.setData({
        vtIndex: that.setIndexForPicker(that.data.vt, that.data.question.visitType),
      })
    })
  },
  isAbroadGetNC: function () {
    var that = this
    that.getOption(that.data.isAbroadField).then(res => {
      that.setData({
        isAbroadContent: res,
        isAbroadType: res[0].dictType,
      })
      console.log(that.data.isAbroadType, that.data.isAbroadContent[that.data.isAbroad])
    })
  },

  /**
   * 提交更改
   */
  summitQuestion: function (data, url) {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + url,
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',
        data: {
          question: JSON.stringify(data)
        },
        success: function (res) {
          if (res.statusCode == 200) {
            console.log('summitQuestion', res)
            var dialog = '提交成功';
            var url = 1;
            that.openConfirm(dialog, url);
            resolve(res.data)
          }
          else {
            var dialog = res.data.data.errMsg;
            var url = 0;
            that.openConfirm(dialog, url)
            resolve(res.data)
          }
        },
        fail: function (res) {
          var dialog = res.data.data.errMsg
          console.log('summitQuestion', res)
          var url = 0;
          that.openConfirm(dialog, url)
          reject(res)
        },
        complete: function (res) {
          if (res.data.status == 'fail') {
            console.log(res.data.data.errMsg)
          }
          console.log("complete")
        },
      })
    })
  },

  /**
   * 删除记录
   */
  deleteQuestion: function (questionId, url) {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + url,
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',
        data: {
          questionId: questionId,
        },
        success: function (res) {
          if (res.statusCode == 200) {
            console.log('deleteQuestion', res)
            var dialog = '删除成功';
            var url = 1;
            that.openConfirm(dialog, url);
            resolve(res.data)
          }
          else {
            var dialog = res.data.data.errMsg
            var url = 0;
            that.openConfirm(dialog, url)
            resolve(res.data)
          }
        },
        fail: function (res) {
          var dialog = res.data.data.errMsg
          var url = 0;
          console.log('deleteQuestion', res)
          that.openConfirm(dialog, url)
          reject(res)
        },
        complete: function (res) {
          if (res.data.status == 'fail') {
            console.log(res.data.data.errMsg)
          }
          console.log("complete")
        },
      })
    })
  },

  /**
   * 得到问题的选项
   */
  getOption: function (field) {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + that.data.getDictListUrl,
        // url: '',
        data: {
          // dictType: JSON.stringify(type)
          field: field,
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',

        success: function (res) {
          if (res.statusCode == 200) {
            console.log("getOption", res)
            resolve(res.data.data)
          }
          else {
            var dialog = res.data.data.errMsg
            var url = 0;
            that.openConfirm(dialog)
            resolve(res.data)
          }
          
        },
        fail: function (res) {
          var dialog = res.data.data.errMsg
          var url = 0;
          console.log('getOption', res)
          that.openConfirm(dialog, url)
          reject(res)
        },
        complete: function (res) {
          console.log("complete")
        },
      })
    })
  },

  /**
   * 收集页面中的数据，以待提交
   */
  collectData: function () {
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
    var util = require('../../utils/util.js')
    if (this.data.date == this.data.localdate) {
      // visitDate = this.data.date + ' ' + this.data.curtime;
      visitDate = util.formatRealTime(new Date(this.data.date + ' ' + this.data.curtime))
    }
    else {
      // visitDate = this.data.date + ' ' + '00:00:00';
      visitDate = util.formatRealTime(new Date(this.data.date + ' ' + '00:00:00'))
    }
    console.log(visitDate);

    var that = this
    that.setData({
      question: {
        // userId: wx.getStorageSync("userid"),
        id: this.data.question.id,
        age: agelast,
        gender: this.data.gender[this.data.genderIndex].code,
        isAbroad: this.data.isAbroad,
        nationality: nationnalitylast,
        accompanyNumber: an,
        permanentResidence: pr,
        questionType: this.data.qt[this.data.qtIndex].code,
        visitLocation: this.data.vl[this.data.vlIndex].code,
        // isSpecialVisit: this.data.isv[this.data.isvIndex].dictName,
        // visitType: this.data.vt[this.data.vtIndex].dictName,
        isSpecialVisit: this.data.isv[this.data.isvIndex].code,
        visitType: this.data.vt[this.data.vtIndex].code,
        solution: this.data.solution[this.data.solutionIndex].code,
        visitDate: visitDate,
      }
    })
    console.log(that.data.question)
  },

  /**
   * 设置picker中起始index
   */
  setIndexForPicker: function (resoption, questiondata) {
    for(var x in resoption){
      if(resoption[x].dictName==questiondata||resoption[x].code==questiondata){
        console.log(resoption[x].dictName, resoption[x].code, questiondata);
        return x;
      }
    }
    return -1;
  },
})