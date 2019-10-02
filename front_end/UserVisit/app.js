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
  },

  

  /**
   * 得到该用户的角色
   */
  getRoles: function (nickName, code) {
    return wx.getStorageSync('roles')
  }
})