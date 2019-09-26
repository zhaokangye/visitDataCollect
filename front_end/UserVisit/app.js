App({

  globalData: {
    systemInfo: {},
    isAbroad: 0,
    date_index: 0
  },

  onLaunch: function () {
    console.log("onLaunch")
    this.wxLogin().then(res => {
      //读取本地缓存
      console.log("用户id为"+wx.getStorageSync('userid'))
      console.log("session_key为"+wx.getStorageSync('session_key'))
    });
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = {
          windowWidth: res.windowWidth,
          windowHeigth: res.windowHeight
        };
      },
    });
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
              // url: 'http://localhost:8090/login/wxlogin',
              url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT/login',
              data: {
                code: res.code
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  //存入本地缓存
                  wx.setStorageSync('token', res.data.token)
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