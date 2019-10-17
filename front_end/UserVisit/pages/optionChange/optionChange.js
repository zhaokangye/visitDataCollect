// pages/optionList/optionChange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 父字典名字
    dictType: '',

    // 子字典信息
    dictList: '',
    dictListforshow: '',
    dictListforshowTmp: '',
    dictListUrl: '/dict/getDictList',

    // 字典提交所需参数
    isCreateDictType: false,
    prevDictType: '',
    currentDictType: '',
    // dictValues: '',
    addDictUrl: '/dict/addDict',
    updateDictUrl: '/dict/updateDict',

    // 识别当前输入的文本框
    curTargetId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dictType: options.dictType
    })
    if (this.data.dictType == '字典增加'){
      this.setData({
        dictType: '',
        isCreateDictType: true,
      })
    }
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
    var that = this;

    if (that.data.dictType != '') {
      // 得到dictList
      this.requestDictList(this.data.dictType).then(res => {
        that.setData({
          dictList: res.data,
          prevDictType: that.data.dictType,
          currentDictType: that.data.dictType,
        })
        that.setData({
          dictListforshow: that.dictListForShow(that.data.dictList),
          dictListforshowTmp: that.dictListForShow(that.data.dictList),
        })
      })
    }
    
  },

  /**
   * 转换dictList的存储格式，方便显示
   */
  dictListForShow: function (list) {
    var dictList = [];
    for (var x in list) {
      dictList[x] = {
        dictName: list[x].dictName,
        code: list[x].code,
        isExist: true,
      }
    }
    return dictList;
  },

  /**
   * 根据父子典名字得到子字典列表
   */
  requestDictList: function (dictType) {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + that.data.dictListUrl,
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',
        data: {
          dictType: dictType
        },
        success: function (res) {
          if (res.statusCode == 200) {
            console.log('requestGetDict', res)
            resolve(res.data)
          }
          else {
            console.log(res)
            var dialog = res.data.data.errMsg
            var url = 1;
            that.openConfirm(dialog, url);
            resolve(res.data)
          }
        },
        fail: function (res) {
          var dialog = res.data.data.errMsg
          console.log('requestGetDict', res)
          var url = 1;
          that.openConfirm(dialog, url);
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
  },

  /**
   * 提交更改
   */
  summitDictList: function (data, url) {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + url,
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',
        data,
        success: function (res) {
          if (res.statusCode == 200) {
            console.log('summitDictList', res)
            var dialog = '提交成功';
            var url = 1;
            that.openConfirm(dialog, url);
            resolve(res.data)
          }
          else {
            console.log('summitDictList', res)
            var dialog = res.data.data.errMsg
            var url = 0;
            that.openConfirm(dialog, url);
            resolve(res.data)
          }
        },
        fail: function (res) {
          console.log('summitDictListFail', res)
          var dialog = res.data.data.errMsg
          var url = 1;
          that.openConfirm(dialog, url);
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
  },

  /**
   * 对话框
   * url=0 保持在当前页面
   * url=1 返回上一页面
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
   * 收集父字典发送的数据/addDict/增加时使用
   */
  addDictCollectData: function () {
    var dictType = this.data.currentDictType;
    var dictValues = this.collectDictValues();

    return {
      dictType: dictDictType,
      dictValues: dictValues,
    }
  },

  /**
   * 收集字典发送的数据/updateDict/修改时使用
   */
  updateDictCollectData: function () {
    var dictValues = '';
    var dictValues = this.collectDictValues();
    
    return {
      prevDictType: this.data.prevDictType,
      currentDictType: this.data.currentDictType,
      dictValues: dictValues,
    }
  },

  collectDictValues: function () {
    var dictValues = '';
    this.setData({
      dictListforshow: this.data.dictListforshowTmp
    });
    var dictListforshow = this.data.dictListforshow;
    for (var x in dictListforshow) {
      if(x == dictListforshow.length - 1){
        if (dictListforshow[x].isExist && dictListforshow[x].dictName != '') {
          dictValues = dictValues + dictListforshow[x].code + ':' + dictListforshow[x].dictName;
        }
      }
      else {
        if (dictListforshow[x].isExist && dictListforshow[x].dictName != '') {
          dictValues = dictValues + dictListforshow[x].code + ':' + dictListforshow[x].dictName + ',';
        }
      }
    }
    console.log('collectDictValues', dictValues);
    return dictValues
  },

  /**
   * 提交
   */
  showTopTips: function (e) {
    var url, data, that = this;
    if (this.codeRepetition() == true) {
      if (that.data.isCreateDictType) {
        url = that.data.addDictUrl;
        data = that.addDictCollectData();
      }
      else {
        url = that.data.updateDictUrl;
        data = that.updateDictCollectData();
      }
      that.summitDictList(data, url).then(res => {
        console.log('提交成功，其内容为', res)
      })
    }
    else {
      var dialog = '编号重复，请重新输入'
      var dialogUrl = 0;
      that.openConfirm(dialog, dialogUrl);
    }
    
  },

  /**
   * 字典变化
   */
  dictTypeChange: function (e) {
    console.log('字典名', e.detail.value)
    this.setData({
      currentDictType: e.detail.value,
    })
  },

  /**
   * 得到当前组件id
   */
  getCurTargetId: function (e) {
    console.log('currentTarget.id', e.currentTarget);
    this.setData({
      curTargetId: e.currentTarget.id,
      dictListforshow: this.data.dictListforshowTmp
    })
  },

  /**
   * 文本变化
   */
  textChange: function (e) {
    console.log('textChange', e)
    var curid = this.data.curTargetId;
    var record = 'dictListforshowTmp[' + curid + '].dictName';
    var dictName = e.detail.value;
    this.setData({
      [record]: dictName,
    })
    console.log(this.data.dictListforshowTmp[curid])
  },

  /**
   * 编号变化
   */
  codeChange: function (e) {
    console.log('codeChange', e)
    var curid = this.data.curTargetId;
    var record = 'dictListforshowTmp[' + curid + '].code';
    var code = e.detail.value;
    if(code<=99&&code>=0){
      this.setData({
        [record]: code,
      })
    }
    console.log(this.data.dictListforshowTmp[curid])
  },

  /**
   * 询问是否执行 对话框
   */
  executeConfirm: function (dialogContent) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '提示',
        content: dialogContent,
        confirmText: "确定",
        // showCancel: false,
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击确定');
            resolve(true);
          }
          else {
            console.log('用户点击取消')
            resolve(false);
          }
        }
      });
    })
    
  },

  /**
   * 删除改字典
   */
  deleteDict: function (e) {
    var that = this;
    console.log('deleteDict', e);
    this.executeConfirm('是否删除该项').then(res => {
      var judge = res;
      if (judge) {
        var curid = that.data.curTargetId;
        var record = 'dictListforshowTmp[' + curid + '].isExist';
        that.setData({
          [record]: false,
        })
      }
      that.setData({
        dictListforshow: that.data.dictListforshowTmp
      });
      console.log(that.data.dictListforshowTmp)
      console.log(that.data.dictListforshow)
    });
  },

  /**
   * 恢复该字典
   */
  restoreDict: function (e) {
    var that = this;
    console.log('restoreDict', e);
    this.executeConfirm('是否恢复该项').then(res => {
      var judge = res;
      if (judge) {
        var curid = that.data.curTargetId;
        var record = 'dictListforshowTmp[' + curid + '].isExist';
        that.setData({
          [record]: true,
        })
      }
      that.setData({
        dictListforshow: that.data.dictListforshowTmp
      });
      console.log(that.data.dictListforshowTmp)
      console.log(that.data.dictListforshow)
    });
  },

  /**
   * 添加更多子字典
   */
  addMore: function (e) {
    var that = this;
    console.log('addMoreDict', e);
    var curid = that.data.dictListforshowTmp.length;
    var dictListforshow = that.data.dictListforshow;
    var record = 'dictListforshowTmp[' + curid + ']';
    var max = 0;

    for (var x in dictListforshow) {
      if (dictListforshow[x].code > max) {
        max = dictListforshow[x].code;
      }
    }

    that.setData({
      [record]: {
        dictName: '',
        code: parseInt(max) + 1,
        isExist: true,
      },
    })

    that.setData({
      dictListforshow: that.data.dictListforshowTmp
    });

    console.log(that.data.dictListforshowTmp)
    console.log(that.data.dictListforshow)
  },

  /**
   * 选项修改使用手册
   */
  userManual: function () {
    wx.navigateTo({
      url: 'userManual',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 验证code是否重复
   */
  codeRepetition: function () {
    var data = this.data.dictListforshow;
    for (var x in data) {
      for (var y in data) {
        if (data[x].isExist && data[x].dictName != '' && data[y].isExist && data[y].dictName != '') {
          if (x != y && data[x].code == data[y].code) {
            return false;
          }
        }
      }
    }
    return true;
  },
})