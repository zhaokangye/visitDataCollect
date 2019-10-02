const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg:"",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    roles: '',
  },

  domestic_btn:function(e){
    var app = getApp();
    app.globalData.isAbroad = 0;
    wx.navigateTo({
      url: '../question/question',
    })
  },

  overseas_btn:function(e){
    var app = getApp();
    app.globalData.isAbroad = 1;
    wx.navigateTo({
      url: '../question/question',
    })
  },

  chart_btn: function (e) {
    wx.navigateTo({
      url: '../chart/chart',
    })
  },

  aministrater_btn: function (e) {
    wx.navigateTo({
      url: '../aministrater/aministrater',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('page onLoad')
    if (app.globalData.userInfo&&app.globalData.roles) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        roles: app.globalData.roles,
      })
      console.log(this.data.userInfo)
    } else if (this.data.canIUse) {
      console.log('callback')
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        console.log('userinforeadyCallback',res.userInfo)
      }
      app.rolesReadyCallback = res => {
        this.setData({
          roles: res.data.roles,
        })
        console.log('rolecallback', res.data.roles)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            roles: app.globalData.roles,
          })
        }
      })
      console.log('canIUse', this.data.canIUse)
    }
    
  },

  getUserInfo: function (e) {
    console.log(e)
    var that = this
    // console.log('canIUse', this.data.canIUse)
    var nickname = e.detail.userInfo.nickName;
    app.wxLogin(nickname).then(res => {
      // 设置页面的头像以及名字
      app.globalData.roles = wx.getStorageSync('roles')
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        roles: app.globalData.roles,
      })
    });
    
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