
var pages = getCurrentPages();
var curPage = pages[pages.length - 1]
var prePage = pages[pages.length - 2];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list: ['字典增加'],

    requestErrorDialog: "网络请求失败，点击返回上一页",

    requestLoading: false,
    requestLoadingComplete: false,

    curTargetId: 0,

    index: 0,

    // 记录请求url
    // 父字典名字
    dictTypeList: ['字典增加'],
    dictTypeUrl: '/dict/displayAllDict',

    

    dictName: '',
    code: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数-监听页面显示
   */
  onShow: function (options) {
    var that = this;
    // this.showRecords(this.data.curpage).then(res => {
    //   var list = res;
    //   that.setData({
    //     list: list,
    //   })
    //   console.log(that.data.list);
    //   this.pageLocation(this.data.curTargetId)
    //   console.log('curTargetId', that.data.curTargetId)
    // })
    this.requestGetDict().then(res => {
      var dictTypeList = res.data
      console.log('requestFinish', res)

      for (var x in dictTypeList) {
        var list = 'dictTypeList[' + [parseInt(x) + 1] + ']';
        that.setData({
          [list]: dictTypeList[x],
        })
      }
      console.log(that.data.dictTypeList);
      that.pageLocation(that.data.curTargetId);
    })
  },

  /**
   * 页面定位
   * 当前定位是静态定位，若排版需要变化，则这里也需要变化
   * 日期的高度为144px，每一个记录的高度为94px
   */
  pageLocation: function (curTargetId) {
    var location;
    if (curTargetId < 0) {
      location = 0;
    }
    else {
      location = curTargetId * 104 + 112
    }
    wx.pageScrollTo({
      // selector: '#' + curTargetId,
      scrollTop: location,
      duration: 0,
    })
  },

  /**
   *  点击修改
   */
  modification: function (e) {
    console.log(e);
    var that = this;
    wx.navigateTo({
      url: '../optionChange/optionChange?dictType=' + that.data.dictTypeList[e.currentTarget.id],
      success: function (res) {
        console.log(typeof that.data.dictTypeList[e.currentTarget.id], that.data.dictTypeList[e.currentTarget.id]);
        that.setData({
          curTargetId: e.currentTarget.id,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
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
   * 请求父字典名字
  */
  requestGetDict: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      var source
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + that.data.dictTypeUrl,
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',

        success: function (res) {
          if (res.statusCode == 200) {
            console.log('requestGetDict', res)
            resolve(res.data)
          }
          else {
            var dialog = res.data.data.errMsg
            that.openConfirm(dialog)
          }
        },
        fail: function (res) {
          var dialog = res.data.data.errMsg
          console.log('requestGetDict', res)
          that.openConfirm(dialog)
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
    // return source
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})