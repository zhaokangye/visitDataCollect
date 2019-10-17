// pages/dataChoose/dataChoose.js
var pages = getCurrentPages();
var prepages = pages[pages.length - 2];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_begin: "",
    date_last: "",
    date_beginForShow: "",
    date_lastForShow: '',

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
    curpage: 1,
    // 页面定位
    curTargetId: 0,

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
    var begin = this.data.date_begin;
    var last = this.data.date_last;
    console.log('begin', typeof begin);
    console.log('last', typeof last);
    // 设置日期
    this.setData({
      date_beginForShow: begin.substring(0, 10),
      date_lastForShow: last.substring(0, 10),
    }) 
    // this.setData({
    //   list: this.bubbleSort(this.data.list),
    //   // page: this.data.page + 1,
    // });
  },

  /**
   * 生命周期函数-监听页面显示
   */
  onShow: function (options) {
    var that = this;
    this.setData({
      page: 1,
      curpage: this.data.curTargetId/this.data.size + 1,
    })
    console.log('curTargetId', this.data.curTargetId)
    this.showRecords(this.data.curpage).then(res => {
      var list = res;
      that.setData({
        list: list,
      })
      console.log(that.data.list);
      this.pageLocation(this.data.curTargetId)
      console.log('curTargetId', that.data.curTargetId)
    })
    this.qtGetNC();
  },

  /**
   * 页面定位
   * 当前定位是静态定位，若排版需要变化，则这里也需要变化
   * 日期的高度为112px，每一个记录的高度为94px
   */
  pageLocation: function (curTargetId) {
    var location;
    if(curTargetId<0){
      location = 0;
    }
    else {
      location = curTargetId * 94 + 112
    }
    wx.pageScrollTo({
      // selector: '#' + curTargetId,
      scrollTop: location,
      duration: 0,
    })
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
        that.setData({
          curTargetId: e.currentTarget.id
        })
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
          if (res.statusCode == 200 && res.data.status == 'success') {
            console.log(res.data)
            resolve(res.data)
          }
          else {
            var dialog = res.data.data.errMsg;
            that.openConfirm(dialog);
          }
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
          if (res.statusCode == 200 && res.data.status == 'success') {
            console.log(res)
            console.log("success")
            resolve(res.data.data)
          }
          else {
            var dialog = res.data.data.errMsg;
            that.openConfirm(dialog)
          }
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
          this.setData({
            page: this.data.page + 1,
            curpage: this.data.curpage + 1,
          })
        }
        this.setData({
          requestLoading: false,
        })
        console.log('curpage', this.data.page)
        
      });
    }
    
  },

  /**
   * 根据当前页面显示所有记录
   * 输入：需要加载的页面
   * 输出：需要加载页面的全记录
   */
  showRecords: function (curpage) {
    var that = this;
    return new Promise((resolve, reject) => {
      var mergedAjax = Promise.resolve();
      var list = [];

      for (var i = 1;i<=curpage;i++) {

        mergedAjax = mergedAjax.then(() => {

          return that.requestGetData(that.collectData(that.data.date_begin, that.data.date_last, that.data.page, that.data.size)).then(res => {
            if (res.status == 'fail' || res.status == 404) {
              this.openConfirm(that.data.requestErrorDialog);
            }
            else {
              var getlist = list;
              for (var x in res.data.records) {
                getlist[(that.data.page - 1) * that.data.size + parseInt(x)] = res.data.records[x];
                console.log(getlist);
              }
              list = getlist;
              console.log('getlist', getlist);
              that.setData({
                page: that.data.page + 1,
              })
            }
            console.log('curpage', that.data.page)

          });

        })
        // console.log(typeof mergedAjax, mergedAjax)
      }
      console.log(typeof mergedAjax, mergedAjax)
      mergedAjax.then(() => {
        resolve(list);
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})