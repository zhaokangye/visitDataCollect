App({

  globalData: {
    systemInfo: {},
    isAbroad: 0,
    date_index: 0,
    userInfo: null,
    roles: "",
  },

  onLaunch: function () {
    console.log("app onLaunch")
    var that = this;
    // 获取手机的机型等信息
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = {
          windowWidth: res.windowWidth,
          windowHeigth: res.windowHeight
        };
        console.log('getsysteminfor', res)
      },
    });
    that.setUserType();
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
                  that.globalData.roles = wx.getStorageSync('roles')
                  if (that.rolesReadyCallback){
                    that.rolesReadyCallback(res)
                  }
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
   * 若已授权，则得到用户信息和用户角色
   */
  // judge==true则可以继续登录并且得到相应数据
  setUserType: function () {
    var that = this;
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
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              // 登录 得到登录的code
              var nickname = res.userInfo.nickName;
              that.wxLogin(nickname).then(res => {
                //读取本地缓存
                console.log("用户id为" + wx.getStorageSync('userid'))
                console.log("session_key为" + wx.getStorageSync('session_key'))
                console.log('roles:' + wx.getStorageSync('roles'))
                that.globalData.roles = wx.getStorageSync('roles')
              });
            }
          })
        }
      }
    })
  },

  /**
   * 得到该用户的角色
   */
  getRoles: function (nickName, code) {
    return wx.getStorageSync('roles')
  }
})