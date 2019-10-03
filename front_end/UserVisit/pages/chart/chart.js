// pages/bar/bar.js
import * as echarts from '../../ec-canvas/echarts';
var util = require("../../utils/util.js");
const app = getApp();
var pages = getCurrentPages();

var question_word = '/question/countGroupByField';

var piechart;

var bar1chart;
var bar2chart;
var bar3chart;

var bar_queschart;

var piesolutionchart;

Page({
  // function
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
    this.setData({
      date_begin: "",
      date_last: "",
      // allAccompanyNumber: requestGetData(date_begin, date_last, question_word+aan_word)[0].value,
    });
    var data = this.collectData(this.data.accompanyNumberField, this.data.date_begin, this.data.date_last);
    // this.requestGetData(data, question_word).then(res => {
    //   console.log(res);
    //   if(res.status!="fail"){
    //     this.setData({
    //       allAccompanyNumber: res.data[0].value
    //     })
    //   }
    //   else{
    //     this.setData({
    //       allAccompanyNumber: 0
    //     })
    //   }
    // });
    
  },

  /**
   * 生命周期函数-数据准备完成
   */
  onReady: function (options) {
    this.refleshChart();
  },

  /** 更新日期后立刻更新数据 **/
  /* 前半段 */
  bindDate_BeginChange: function (e) {
    console.log('begin', this.legalDate(e.detail.value, this.data.date_last))
    console.log('begin', e.detail.value, this.data.date_last)
    this.setData({
      date_begin: e.detail.value
    })
    if (this.legalDate(this.data.date_begin, this.data.date_last)==true){
      this.refleshChart();
    }
    else{
      this.openConfirm(this.data.illegalDateDialog);
    }
  },
  /* 后半段 */
  bindDate_LastChange: function (e) {
    console.log('last', this.legalDate(this.data.date_begin, e.detail.value))
    console.log('last', this.data.date_begin, e.detail.value)
    this.setData({
      date_last: e.detail.value
    })
    if (this.legalDate(this.data.date_begin, this.data.date_last)==true) {
      this.refleshChart();
    }
    else{
      this.openConfirm(this.data.illegalDateDialog);
    }
    
  },

  // 对话框
  openConfirm: function (dialogContent) {
    wx.showModal({
      title: '错误提示',
      content: dialogContent,
      confirmText: "确定",
      showCancel: false,
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },

  /** data段 **/
  data: {
    illegalDateDialog: '日期段不正确，则图表不更新，请修改',

    allAccompanyNumber: "",
    accompanyNumberType: '来访人数',
    accompanyNumberField: 'accompanyNumber',

    // vl:["TIT","南通","媒体港"],
    vlType: '来访位置',
    vlField: 'visitLocation',

    // 国内外
    isAbroad: [{dictName: '国内'}, {dictName: '外籍'}],
    isAbroadType: '国内外',
    isAbroadField: 'isAbroad',

    vt: [{dictName: "首次"}, {dictName: "二次"}],
    vtType: '来访类型',
    vtField: 'visitType',

    isv: [{dictName: "正常"}, {dictName: "异常"}],
    isvType: '是否特殊申诉',
    isvField: 'isSpecialVisit',

    // qt: ["忘记密码", "账号被盗", "账号被封", "微信支付", "微信公众号", "小程序","QQ","游戏","权力机关调证","其他"],
    qtType: '问题类型',
    qtField: 'questionType',

    // solution: ["指引登记", "指引深圳", "现场解决"],
    solutionType: '解决方式',
    solutionField: 'solution',

    date_begin: "",
    date_last: "",
    date_index: 0,
    collectdate: "",
    // 来访位置
    ecpie: {

    },
    // 国内外
    ecbar1: {
      
    },
    // 首次二次来访
    ecbar2: {
      
    },
    // 是否特殊上访
    ecbar3: {
      
    },
    // 问题分类
    ecbar4: {
      
    },
    // 解决方式
    ecpie_solution: {

    },
  },

 

  
  /** 饼图 **/
  /* 初始化 */
  pieOnInit (e) {
    return this.initPieChart(e.detail.canvas, e.detail.width, e.detail.height)
  },
  initPieChart: function (canvas, width, height) {
    piechart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    var data = this.collectData(this.data.vlField, this.data.date_begin, this.data.date_last);
    // var data = [{ "name": "TIT", "value": 6 }, { "name": "南通", "value": 0 }, { "name": "媒体港", "value": 4 }]
    // this.requestGetData(data, question_word).then(res => {
    //   // this.getOption(this.data.vlType).then(e => {
    //   //   console.log('piechart data', res, e)
    //   //   var restmp = this.checkEnoughOption(res, e);
    //   //   canvas.setChart(piechart);
    //   //   piechart.setOption(this.getPieOption(restmp));
    //   //   console.log('piechart already', restmp)
    //   //   return piechart;
    //   // })
    //   piechart.setOption(this.getPieOption(res.data));
    //   console.log('piechart already', res)
    // });
    canvas.setChart(piechart);
    console.log('piechart init');
    return piechart;
  },

  /* 动态更改参数 */
  setPieOption: function (chart, source) {
    // chart.clear();
    chart.setOption(this.getPieOption(source));
  },

  /* 设置样式 */
  getPieOption: function (source) {
    var name = []
    var value = []
    // 赋值进name
    for (var x in source) {
      name[x] = source[x].name
      value[x] = source[x].value
    }
    return {
      backgroundColor: "#EDEDED",
      color: ["#66CD00", "#4169E1", "#666666", "#91F2DE"],
      legend: {
        formatter: (params) => {
          for (var x in name) {
            if (params == name[x]) {
              return params + ' ' + value[x]
            }
          }
        },
        orient: 'vertical',
        top: 10,
        left: 10,
        data: name,
      },
      tooltip: {
        position: ['50%', '40%']
      },
      series: [{
        label: {
          normal: {
            position: 'inside',
            formatter: '{d}%',
            align: 'center',
            textStyle: {
              color: '#000000'
            },
          }
        },
        labelLine: {
          normal: {
            smooth: 0.2,
            length: 10,
            length2: 20
          },
        },
        type: 'pie',
        center: ['65%', '45%'],
        radius: [0, '70%'],
        data: source,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        }
      }]
    }
  },

  /** 柱状图 **/
  /* 初始化 */
  bar1OnInit (e) {
    return this.initBar1Chart(e.detail.canvas, e.detail.width, e.detail.height)
  },
  bar2OnInit (e) {
    return this.initBar2Chart(e.detail.canvas, e.detail.width, e.detail.height)
  },
  bar3OnInit (e) {
    return this.initBar3Chart(e.detail.canvas, e.detail.width, e.detail.height)
  },
  initBar1Chart: function (canvas, width, height) {
    bar1chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    // var pages = getCurrentPages()
    var data = this.collectData(this.data.isAbroadField, this.data.date_begin, this.data.date_last);
    // this.requestGetData(data, question_word).then(res => {
    //   console.log('bar1chart data',res, this.data.isAbroad);
    //   // var restmp = res
    //   bar1chart.setOption(this.getBarOption(res.data));
    //   console.log('bar1chart already', res)
    // });
    canvas.setChart(bar1chart);
    console.log('bar1chart init');
    return bar1chart;
    // setTimeout(function(){}, 2000);
  },
  initBar2Chart: function (canvas, width, height) {
    bar2chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    // var pages = getCurrentPages()
    var data = this.collectData(this.data.vtField, this.data.date_begin, this.data.date_last);
    // this.requestGetData(data, question_word).then(res => {
    //   // this.getOption(this.data.vtType).then(e => {
    //   //   console.log('bar2chart data', res, e);
    //   //   var restmp = this.checkEnoughOption(res, e);
    //   //   canvas.setChart(bar2chart);
    //   //   bar2chart.setOption(this.getBarOption(restmp));
    //   //   console.log('bar2chart already', restmp)
    //   //   return bar2chart;
    //   // });
    //   console.log('bar2chart data', res, this.data.vt);
    //   bar2chart.setOption(this.getBarOption(res.data));
    //   console.log('bar2chart already', res)
    // });
    
    canvas.setChart(bar2chart);
    console.log('bar2chart init');
    return bar2chart;
    // setTimeout(function(){}, 2000);
  },
  initBar3Chart: function (canvas, width, height) {
    bar3chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    // var pages = getCurrentPages()
    var data = this.collectData(this.data.isvField, this.data.date_begin, this.data.date_last);
    // this.requestGetData(data, question_word).then(res => {
    //   // this.getOption(this.data.isvType).then(e => {
    //   //   console.log('bar3chart data', res, e);
    //   //   var restmp = this.checkEnoughOption(res, e);
    //   //   canvas.setChart(bar3chart);
    //   //   bar3chart.setOption(this.getBarOption(restmp));
    //   //   console.log('bar3chart already', restmp)
    //   //   return bar3chart;
    //   // });
    //   console.log('bar3chart data', res, this.data.isv);
      
    //   bar3chart.setOption(this.getBarOption(res.data));
    //   console.log('bar3chart already', res)
    // });
    canvas.setChart(bar3chart);
    
    return bar3chart;
    // setTimeout(function(){}, 2000);
  },

  /* 动态更改参数 */
  setBarOption: function (chart, source) {
    // chart.clear();
    chart.setOption(this.getBarOption(source))
  },

  /* 设置样式 */
  getBarOption: function (source) {
    var sum = [source[0].value + source[1].value]
    return {
      backgroundColor: "#EDEDED",
      color: ["#66CD00", "#666666"],
      grid: {
        top: 60,
        left: 70,
        right: 70,
        containLabel: false
      },
      tooltip: {
        position: ['40%', '30%'],
        formatter: '{a} {c}'
      },
      xAxis: {
        show: false,
        type: 'value',
        max: sum,
      },
      yAxis: {
        type: 'category',
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [
        {
          // name: source[0].name,
          name: source[0].name,
          type: 'bar',
          barWidth: 30,
          stack: 'count',
          label: {
            normal: {
              show: true,
              position: 'insideLeft',
              fontSize: 14,
              offset: [-70, 0],
              color: '#333',
              formatter: '{a}\n({c})',
            }
          },
          data: [source[0].value]
        },
        {
          name: source[1].name,
          type: 'bar',
          barWidth: 30,
          stack: 'count',
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              fontSize: 14,
              offset: [70, 0],
              color: '#333',
              formatter: '{a}\n({c})',
            }
          },
          data: [source[1].value],
        }
      ]
    };
  },

  /** 柱状图2 **/
  /* 初始化 */
  bar_quesOnInit (e) {
    return this.initBar_QuesChart(e.detail.canvas, e.detail.width, e.detail.height)
  },
  initBar_QuesChart: function (canvas, width, height) {
    bar_queschart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    // source
    // var pages = getCurrentPages()
    var data = this.collectData(this.data.qtField, this.data.date_begin, this.data.date_last);
    // this.requestGetData(data, question_word).then(res => {
    //   // this.getOption(this.data.qtType).then(e => {
    //   //   var restmp = this.checkEnoughOption(res, e);
    //   //   canvas.setChart(bar_queschart);
    //   //   bar_queschart.setOption(this.getBar_QuesOption(restmp));
    //   //   console.log('bar_queschart already', restmp)
    //   //   return bar_queschart;
    //   // });
    //   bar_queschart.setOption(this.getBar_QuesOption(res.data));
    //   console.log('bar_queschart already', res)
    // });
    canvas.setChart(bar_queschart);
    console.log('bar_queschart init');
    return bar_queschart;
  },

  /* 动态更改参数 */
  setBar_QuesOption: function (chart, source) {
    // chart.clear();
    chart.setOption(this.getBar_QuesOption(source));
  },

  /* 设置样式 */
  getBar_QuesOption: function (source) {
    // name data
    var name = []
    var data = []

    for (var x in source) {
      name[x] = source[x].name
      data[x] = source[x].value
    }
    return {
      backgroundColor: "#EDEDED",
      grid: {
        top: 20,
        button: 20,
        // containLabel: true
      },
      color: ["#666666"],
      tooltip: {},
      xAxis: {
        type: 'category',
        data: name,
        axisTick:{
          alignWithLabel:true
        },
        axisLabel:{
          interval:0,
          rotate: -45,
          fontSize:12.5,
        },
      },
      yAxis: {
        type: 'value',

      },
      series: [
        {
          type: 'bar',
          data: data,
          label: {
            normal: {
              show: true,
              formatter: params => {
                return params.data[params.dataIndex + 1]
              },
            }
          }
        },
      ]
    };
  },

  /*** 解决方式饼图 */
  /* 初始化 */
  pieSolutionOnInit(e) {
    return this.initPieSolutionChart(e.detail.canvas, e.detail.width, e.detail.height)
  },
  initPieSolutionChart: function (canvas, width, height) {
    piesolutionchart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    var data = this.collectData(this.data.solutionField, this.data.date_begin, this.data.date_last);
    // this.requestGetData(data, question_word).then(res => {
    //   // this.getOption(this.data.solutionType).then(e => {
    //   //   console.log('piesolutionchart data', res, e)
    //   //   var restmp = this.checkEnoughOption(res, e);
    //   //   canvas.setChart(piesolutionchart);
    //   //   piesolutionchart.setOption(this.getPieOption(restmp));
    //   //   console.log('piechart already', restmp)
    //   //   return piesolutionchart;
    //   // })
    //   piesolutionchart.setOption(this.getPieOption(res.data));
    //   console.log('piechart already', res)
    // });
    canvas.setChart(piesolutionchart);
    console.log('piesolutionchart init');
    return piesolutionchart;
  },

  /* 动态更改参数 */
  setPieOption: function (chart, source) {
    // chart.clear();
    chart.setOption(this.getPieOption(source));
  },

  /** 请求图的数据  **/
  /* 参数：日期前半段, 日期后半段, 请求的图表 */
  requestGetData: function (data, request_chart) {
    // console.log(typeof date_begin, typeof date_last);
    return new Promise(function (resolve, reject) {
      var source
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + request_chart,
        // url: '',
        data:{
          params: JSON.stringify(data)
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',

        success: function (res) {
          // console.log("success")
          console.log('得到图的数据', res.data)
          resolve(res.data)
        },
        fail: function (res) {
          console.log(res)
          console.log('fail')
          reject(source)
        },
        complete: function (res) {
          if (res.data.status == 'fail') {
            console.log(data.dictType, res.data.data.errMsg)
          }
          console.log("complete")
        },
      })
    })
    // return source
  },

   /* 日期与请求数据封装 */
  collectData: function (fieldGet, date_begin, date_last) {
      // console.log('collectData', fieldGet, date_begin, date_last);
      var util = require("../../utils/util.js");
      var startDate, endDate;
      if(date_begin==""||date_last==""){
        startDate = date_begin
        endDate = date_last
      }
      else {
        startDate = util.formatRealTime(new Date(date_begin + ' 00:00:00'))
        endDate = util.formatRealTime(new Date(date_last + ' 23:59:59'))
      }
      console.log('collectData', fieldGet, startDate, endDate);
      console.log('date', date_begin, date_last)
      return {
        field: fieldGet,
        startDate: startDate, 
        endDate: endDate,
      }
   },

  /* 判断日期段是否合法 */
  legalDate: function (date_begin, date_last) {
    var start_date = new Date(date_begin.replace(/-/g, "/"));
    var end_date = new Date(date_last.replace(/-/g, "/"));
    var diff = end_date.getTime() - start_date.getTime();

    console.log('diff',diff);
    if(diff>=0){
      return true;
    }
    else{
      return false;
    }
  },

   /** 日期变更，刷新图表 **/
   refleshChart: function () {
     var data
     //accompanyNumber
     data = this.collectData(this.data.accompanyNumberField, this.data.date_begin, this.data.date_last);
     this.requestGetData(data, question_word).then(res => {
       if(res.status!='success'){
         var dialog = res.data.errMsg;
         this.openConfirm(dialog);
         this.setData({
           allAccompanyNumber: 0,
         })
       }
       else{
         this.setData({
           allAccompanyNumber: res.data[0].value
         })
       }
     });

    //  piechart
    // visitLocation
     data = this.collectData(this.data.vlField, this.data.date_begin, this.data.date_last);
     this.requestGetData(data, question_word).then(res => {
      //  this.getOption(this.data.vlType).then(e => {
        //  var restmp = this.checkEnoughOption(res, e);
        //  console.log(restmp);
        //  this.setPieOption(piechart, restmp)
      //  })
       this.setPieOption(piechart, res.data)
     });

     // barchart
     data = this.collectData(this.data.isAbroadField, this.data.date_begin, this.data.date_last);
     this.requestGetData(data, question_word).then(res => {
      //  var restmp = this.checkEnoughOption(res, this.data.isAbroad);
      //  console.log(restmp);
      //  this.setBarOption(bar1chart, restmp)
       this.setBarOption(bar1chart, res.data)
     });
     data = this.collectData(this.data.vtField, this.data.date_begin, this.data.date_last);
     this.requestGetData(data, question_word).then(res => {
      //  var restmp = this.checkEnoughOption(res, this.data.vt);
      //  console.log(restmp);
      //  this.setBarOption(bar2chart, restmp)
       this.setBarOption(bar2chart, res.data)
     });
     data = this.collectData(this.data.isvField, this.data.date_begin, this.data.date_last);
     this.requestGetData(data, question_word).then(res => {
      //  var restmp = this.checkEnoughOption(res, this.data.isv);
      //  console.log(restmp);
      //  this.setBarOption(bar3chart, restmp)
       this.setBarOption(bar3chart, res.data)
     });

     //bar_queschart
     data = this.collectData(this.data.qtField, this.data.date_begin, this.data.date_last);
     this.requestGetData(data, question_word).then(res => {
      //  this.getOption(this.data.qtType).then(e => {
      //    var restmp = this.checkEnoughOption(res, e);
      //    console.log(restmp);
      //    this.setBar_QuesOption(bar_queschart, restmp)
      //  })
       this.setBar_QuesOption(bar_queschart, res.data)
     });

    //  piesolutionchart
     data = this.collectData(this.data.solutionField, this.data.date_begin, this.data.date_last);
     this.requestGetData(data, question_word).then(res => {
      //  this.getOption(this.data.solutionType).then(e => {
      //    var restmp = this.checkEnoughOption(res, e);
      //    console.log(restmp);
      //    this.setPieOption(piesolutionchart, restmp)
      //  })
       this.setPieOption(piesolutionchart, res.data)
     });
   },

  /** 验证得到的选项是否足够齐全 **/
  checkEnoughOption: function (source, name) {
    var forReturn = [];
    // var i = name.length
    if(source.status!='fail'){
      for (var x in name) {
        var y = 0;
        for (y; y < source.data.length; y++) {
          if (name[x].dictName == source.data[y].name) {
            forReturn[x] = {
              'name': name[x].dictName,
              'value': source.data[y].value,
            };
            break;
          }
        }
        if (y >= source.data.length) {
          forReturn[x] = {
            'name': name[x].dictName,
            'value': 0,
          };
        }
        console.log(name[x].dictName, forReturn);
        console.log();
      }
    }
    else{
      for(var x in name){
        forReturn[x] = {
          'name': name[x].dictName,
          'value': 0,
        }
      }
    }
    
    console.log("");
    return forReturn;
  },

  /**得到选项 */
  getOption: function (type) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT/dict/getDictList',
        // url: '',
        data: {
          // dictType: JSON.stringify(type)
          dictType: type ,
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',

        success: function (res) {
          console.log('得到' + type + '字典', res)
          resolve(res.data.data)
        },
        fail: function (res) {
          console.log(res)
          console.log('fail')
          reject(res)
        },
        complete: function (res) {
          console.log("complete")
        },
      })
    })
  },
})
