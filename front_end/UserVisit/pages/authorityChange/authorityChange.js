// pages/authorityChange/authorityChange.js
var pages = getCurrentPages();
var prepage = pages[pages.length - 2];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    record: "",
    // record:{
    //   id: 0,
    //   nickname: 'MANA',
    //   authrity1: 'admin',
    //   authrity2: 'reception',
    // },
    // checkboxItems: [
    //   { authority: 'admin', value: '0', checked: true },
    //   { authority: 'reception', value: '1', checked: true }
    // ],
    checkboxItems: "",

    saveRecord: {},
    saveRecordUrl: '/manager/grantRoles',

    // 记录上一个页面的页数
    page: 0

    // 用户列表 导航到需要修改的字段
  },

  /**
   * 权限转换格式
   */
  // 用户列表
  getAuthority: function (record) {
    var roles;
    if(record.roles==null){
      roles = "";
    }
    else{
      roles = record.roles.split(",");
    }
    console.log('roles', roles)
    var checkBoxItems = [
      { authority: 'admin', value: '0', checked: false },
      { authority: 'reception', value: '1', checked: false },
    ];
    var rolesIndex = 0;
    for (var x in checkBoxItems){
      if(roles[rolesIndex]==checkBoxItems[x].authority){
        checkBoxItems[x].checked = true;
        rolesIndex+=1
      }
    }

    return checkBoxItems;
  },

  /**
   * 复选列表项点击事件
   */
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
    console.log(this.data.checkboxItems);
  },

  /**
   * 提交按钮
   */
  showTopTips: function () {
    var dialogContent, url;
    var that = this;
    this.collectData();
    new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + that.data.saveRecordUrl,
        data: {
          userRoles: JSON.stringify(that.data.saveRecord)
        },
        method: 'POST',
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        success: function (res) {
          console.log('success')
          dialogContent = '提交成功';
          url = 1;
          resolve(res)
        },
        fail: function (res) {
          console.log('connect fail');
          console.log(res);
          // dialogContent = "请勿重复提交";
          dialogContent = '网络波动，请重试'
          url = 0;
          reject(res)
        },
      })
    }).then(res => {
      // 弹出消息框
      console.log(dialogContent);
      that.openConfirm(dialogContent, url);
    })
    
    
  },

  /**
   * 对话框
   */
  openConfirm: function (dialogContent, url) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: dialogContent,
      confirmText: "确定",
      showCancel: false,
      success: function (res) {
        console.log(res);
        if (res.confirm && url == 1) {
          console.log('用户点击确定')
          wx.navigateBack({
            delta: url,
          })
        }
        else {
          console.log('用户点击确定，但不跳转')
        }
      }
    });
  },

  /**
   * 收集页面中的数据，以待提交
   */
  collectData: function () {
    var that = this
    var roles = '', checkbox = this.data.checkboxItems;
    console.log('checkbox', checkbox)
    for(var x in checkbox){
      if (checkbox[x].checked == true&&roles==''){
        roles = checkbox[x].authority;
        console.log(roles)
      }
      else if(checkbox[x].checked == true&&roles!=''){
        roles = roles + ',' + checkbox[x].authority
        console.log(roles)
      }
    }

    that.setData({
      // 用户列表
      saveRecord: {
        userId: that.data.record.userId,
        // nickName: that.data.nickname,
        roles: roles,
      }
    })
    console.log('saveRecord', that.data.saveRecord)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      record: JSON.parse(options.data),
    })
    console.log('record', typeof this.data.record, this.data.record);
    this.setData({
      checkboxItems: this.getAuthority(this.data.record)
    })
  },
})