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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        roles: app.globalData.roles,
      })
      console.log(this.data.userInfo)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          roles: app.globalData.roles,
        })
        console.log(res.userInfo)
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
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    var that = this
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('getSetting', res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('getuserinfo', res)
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
              // 登录 得到登录的code
              var nickname = res.userInfo.nickName;
              that.wxLogin(nickname).then(res => {
                //读取本地缓存
                console.log("用户id为" + wx.getStorageSync('userid'))
                console.log("session_key为" + wx.getStorageSync('session_key'))
                console.log('roles:' + wx.getStorageSync('roles'))
                app.globalData.roles = wx.getStorageSync('roles')

                // 设置页面的头像以及名字
                app.globalData.userInfo = e.detail.userInfo
                that.setData({
                  userInfo: e.detail.userInfo,
                  hasUserInfo: true,
                  roles: app.globalData.roles,
                })
              });
            }
          })
        }
      }
    })
  },

  /**
  * 登录
  */
  wxLogin: function (nickName) {
    var that = this
    return new Promise((resolve, reject) => {
      // 登录
      wx.login({
        success: res => {
          console.log(res);
          if (res.code) {
            var code = res.code;
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              // url: 'http://localhost:8080/login',
              url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT/login',
              data: {
                nickName: nickName,
                code: code,
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  //存入本地缓存
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('roles', res.data.roles)
                } else {
                  console.log(res.errMsg)
                }
                console.log('wx.login.request', res)
                resolve(res);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
            reject('error');
          }
        }
      })
    })
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