// pages/dataChoose/dataChoose.js
var pages = getCurrentPages();
var prepages = pages[pages.length - 2];
var time = [
  { 'id': 0, 'time': '2019-9-26 12:36:14'},
  { 'id': 1, 'time': '2019-9-26 12:36:15'},
  { 'id': 2, 'time': '2019-9-26 12:36:20' },
  { 'id': 3, 'time': '2019-9-26 12:36:30' },
];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_begin: "",
    date_last: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date_begin: options.date_begin,
      date_last: options.date_last,
    })
  },

  /* 日期与请求数据封装 */
  collectData: function (date_begin, date_last) {
    return {
      startDate: date_begin,
      endDate: date_last,
    }
  },

  /** 请求图的数据  **/
  /* 参数：日期前半段, 日期后半段, 请求的图表 */
  requestGetData: function (data) {
    // console.log(typeof date_begin, typeof date_last);
    return new Promise(function (resolve, reject) {
      var source
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT',
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

          resolve(res.data.data)
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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