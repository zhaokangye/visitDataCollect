// pages/authorityList/authorityList.js
var pages = getCurrentPages();
var curPage = pages[pages.length - 1]
var prePage = pages[pages.length - 2];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',

    requestErrorDialog: "网络请求失败，点击返回上一页",

    requestLoading: false,
    requestLoadingComplete: false,

    curTargetId: 0,
    curpage: 1,
    page: 1,
    size: 10,

    index: 0,

    // 记录请求url
    // 用户列表
    recordUrl: '/manager/userRolesList',

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
    
    this.setData({
      page: 1,
      curpage: this.data.curTargetId/this.data.size + 1
    })
    this.showRecords(this.data.curpage).then(res => {
      var list = res;
      that.setData({
        list: list,
      })
      console.log(that.data.list);
      this.pageLocation(this.data.curTargetId)
      console.log('curTargetId', that.data.curTargetId)
    })
  },

  /**
   * 页面定位
   * 当前定位是静态定位，若排版需要变化，则这里也需要变化
   * 日期的高度为112px，每一个记录的高度为94px
   */
  pageLocation: function (curTargetId) {
    var location;
    if (curTargetId < 0) {
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
   *  点击修改
   */
  modification: function (e) {
    console.log(e);
    var that = this;
    wx.navigateTo({
      url: '../authorityChange/authorityChange?data=' + JSON.stringify(that.data.list[e.currentTarget.id]),
      success: function (res) {
        console.log(typeof that.data.list[e.currentTarget.id], that.data.list[e.currentTarget.id]);
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
   * 日期与请求数据封装
   */
  collectData: function (page, size) {
    return {
      pn: page,
      size: size,
    }
  },

  /**
   * 请求用户的数据
  */
  /* 参数：页面，元件数 */
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
          if (res.statusCode == 200 && res.data.status == 'success'){
            console.log('requestGetData', res)
            resolve(res.data)
          }
          else {
            var dialog = res.data.data.errMsg
            that.openConfirm(dialog)
          }
        },
        fail: function (res) {
          var dialog = res.data.data.errMsg
          console.log('requestGetData', res)
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
      this.requestGetData(this.collectData(this.data.page, this.data.size)).then(res => {
        console.log('用户列表', res)
        if (res.data == '') {
          this.setData({
            requestLoadingComplete: true,
          });
        }
        else {
          var getlist = this.data.list;
          // 用户列表
          console.log('用户列表', res)
          for (var x in res.data) {
            getlist[(this.data.page - 1) * this.data.size + parseInt(x)] = res.data[x];
            console.log(getlist);
          }
          this.setData({
            list: getlist,
          });
          console.log('getlist', getlist);
          this.setData({
            page: this.data.page + 1,
          })
        }
        this.setData({
          requestLoading: false,
        })
        console.log('curpage', this.data.page)
        console.log('暂无数据', this.data.requestLoading, this.data.requestLoadingComplete)
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

      for (var i = 1; i <= curpage; i++) {

        mergedAjax = mergedAjax.then(() => {

          return that.requestGetData(that.collectData(that.data.page, that.data.size)).then(res => {
            if (res.status == 'fail' || res.status == 404) {
              this.openConfirm(that.data.requestErrorDialog);
            }
            else {
              var getlist = list;
              for (var x in res.data) {
                getlist[(that.data.page - 1) * that.data.size + parseInt(x)] = res.data[x];
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