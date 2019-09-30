// pages/dataChoose/dataChoose.js
var pages = getCurrentPages();
var prepages = pages[pages.length - 2];
var time = [
  { 'id': 0, 'question': "忘记密码", 'time': '2019-09-26 12:36:14'},
  { 'id': 2, 'question': "忘记密码", 'time': '2019-09-26 12:36:20' },
  { 'id': 1, 'question': "忘记密码", 'time': '2019-09-26 12:36:15'},
  { 'id': 3, 'question': "忘记密码", 'time': '2019-09-26 12:36:30' },
  { 'id': 4, 'question': "忘记密码", 'time': '2019-09-26 12:36:31' },
];
var extra = [
  { 'id': 5, 'question': "忘记密码", 'time': '2019-09-26 12:36:40' },
  { 'id': 6, 'question': "忘记密码", 'time': '2019-09-26 12:36:50' },
  { 'id': 7, 'question': "忘记密码", 'time': '2019-09-26 12:37:30' },
  { 'id': 8, 'question': "忘记密码", 'time': '2019-09-26 12:37:50' },
  { 'id': 9, 'question': "忘记密码", 'time': '2019-09-26 12:38:30' },
];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_begin: "",
    date_last: "",

    questionTime: "",
    showedType: "问题类型",
    showedName: "",
    number: "1",

    list: '',

    requestErrorDialog: "网络请求失败，点击返回上一页",

    requestLoading: false,
    requestLoadingComplete: false,

    page: 1,
    size: 10,

    index: 0,

    // 记录请求url
    recordUrl: '/question/questionList',

    // qt: ["忘记密码", "账号被盗", "账号被封", "微信支付", "微信公众号", "小程序","QQ","游戏","权力机关调证","其他"],
    qt: '',
    qtType: '问题类型',
    qtField: 'questionType',
    qtIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date_begin: options.date_begin,
      date_last: options.date_last,
    })
    this.requestGetData(this.collectData(this.data.date_begin, this.data.date_last, this.data.page, this.data.size)).then(res => {
      if(res.status=='fail'||res.status==404){
        this.openConfirm(this.data.requestErrorDialog);
      }
      else{
        this.setData({
          list: res.data.records,
        });
      }
      this.setData({
        page: this.data.page + 1,
      })
      console.log('curpage', this.data.page)
    });
    this.qtGetNC();
    // this.setData({
    //   list: this.bubbleSort(this.data.list),
    //   // page: this.data.page + 1,
    // });
  },

  /**
   * 根据时间排序
   * */
  bubbleSort: function (list) {
    for(var i = 0;i < list.length - 1;i++){
      for(var j = 0;j < list.length - 1 - i;j++){
        if(this.legalDate(list[j+1].time, list[j].time)){
          var tmp = list[j+1];
          list[j+1] = list[j];
          list[j] = tmp;
        }
      }
    }
    return list;
  },

  /**
   * 获取问题类型的字典
   */
  qtGetNC: function () {
    var that = this
    that.getOption(that.data.qtType).then(res => {
      that.setData({
        qt: res,
      })
    })
  },

  /**
   *  点击修改
   */
  modification: function (e) {
    console.log(e);
    var that = this;
    wx.navigateTo({
      url: '../dataChange/dataChange?data=' + JSON.stringify(that.data.list[e.currentTarget.id]),
      success: function(res) {
        console.log(typeof that.data.list[e.currentTarget.id],that.data.list[e.currentTarget.id]);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 对话框
   */
  openConfirm: function (dialogContent) {
    wx.showModal({
      title: '提示',
      content: dialogContent,
      confirmText: "确定",
      showCancel: false,
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定');
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    });
  },

  /**
   * 判断日期段是否合法  精确到秒 
   */
  legalDate: function (date_begin, date_last) {
    var start_date = new Date(date_begin); 
    var end_date = new Date(date_last); 

    start_date = Date.parse(start_date)/1000;
    end_date = Date.parse(end_date) / 1000;

    var diff = end_date - start_date;

    console.log('diff', diff);
    if (diff >= 0) {
      return true;
    }
    else {
      return false;
    }
  },

  /**
   * 点击了记录后收集数据发送到修改页面
   */
  recordData: function (list) {
    for(var x in list){
      if(id==list[x].id){
        console.log('list', list[x])
        return list[x];
      }
    }
  },

  /**
   * 日期与请求数据封装
   */
  collectData: function (date_begin, date_last, page, size) {
    return {
      pn: page,
      size: size,
      startDate: date_begin,
      endDate: date_last,
    }
  },

  /**
   * 请求图的数据
  */
  /* 参数：日期前半段, 日期后半段, 请求的图表 */
  requestGetData: function (data) {
    // console.log(typeof date_begin, typeof date_last);
    var that = this;
    return new Promise(function (resolve, reject) {
      var source
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + that.data.recordUrl,
        // url: '',
        data: {
          params: JSON.stringify(data)
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',

        success: function (res) {
          console.log("success")
          console.log(res.data)
          resolve(res.data)
        },
        fail: function (res) {
          console.log(res)
          console.log('fail')
          reject(source)
        },
        complete: function (res) {
          if (res.data.status == 'fail') {
            console.log(res.data.data.errMsg)
          }
          console.log("complete")
        },
      })
    })
    // return source
  },

  /**
   * 得到问题的选项
   */
  getOption: function (type) {
    return new Promise(function (resolve, reject) {
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

  /**
   * 下拉框刷新
   */
  onReachBottom: function () {
    console.log('上拉触底');
    // 请求数据
    if (!this.data.requestLoading && !this.data.requestLoadingComplete) {
      // 加载中图标
      this.setData({
        requestLoading: true,
      });
      this.requestGetData(this.collectData(this.data.date_begin, this.data.date_last, this.data.page, this.data.size)).then(res => {
        if (res.data.records == '') {
          this.setData({
            requestLoadingComplete: true,
          });
        }
        else {
          var getlist = this.data.list;
          for (var x in res.data.records) {
            getlist[(this.data.page - 1) * this.data.size + parseInt(x)] = res.data.records[x];
            console.log(getlist);
          }
          this.setData({
            list: getlist,
          });
          console.log('getlist', getlist);
        }
        this.setData({
          page: this.data.page + 1,
          requestLoading: false,
        })
        console.log('curpage', this.data.page)
        
      });
    }
    

    // if(!this.data.requestLoading&&!this.data.requestLoadingComplete){
    //   // 加载中图表
    //   this.setData({
    //     requestLoading: true,
    //   });
    //   var getlist = this.data.list;
    //   for (var x in extra) {
    //     console.log(typeof x, typeof this.data.page)
    //     getlist[this.data.page * 5 + parseInt(x)] = extra[x];
    //     console.log('getlist', getlist);
    //   }
    //   this.setData({
    //     list: getlist,
    //     requestLoading: false,
    //     requestLoadingComplete: true,
    //   });
    // }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})