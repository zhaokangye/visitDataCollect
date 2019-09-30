App({

  globalData: {
    systemInfo: {},
    isAbroad: 0,
    date_index: 0,
    userInfo: null,
    roles: "",
  },

  onLaunch: function () {
    console.log("onLaunch")
    var that = this
    this.wxLogin().then(res => {
      //读取本地缓存
      console.log("用户id为" + wx.getStorageSync('userid'))
      console.log("session_key为" + wx.getStorageSync('session_key'))
      console.log('roles:' + wx.getStorageSync('roles'))
      this.globalData.roles = wx.getStorageSync('roles')
    });
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = {
          windowWidth: res.windowWidth,
          windowHeigth: res.windowHeight
        };
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 获取用户权限
              this.globalData.roles = wx.getStorageSync('roles')
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  wxLogin: function () {
    var that = this
    return new Promise((resolve, reject) => {
      // 登录
      wx.login({
        success: res => {
          if (res.code) {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              // url: 'http://localhost:8080/login',
              url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT/login',
              data: {
                code: res.code
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  //存入本地缓存
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('roles', res.data.roles)
                } else {
                  console.log(res.errMsg)
                }
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


})