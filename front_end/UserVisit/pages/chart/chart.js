// pages/bar/bar.js
import * as echarts from '../../ec-canvas/echarts';
var util = require("../../utils/util.js");
const app = getApp();
var pages = getCurrentPages();

var question_word = '/question';

var aan_word = '/totalAccompanyNumber';

var piechart;
var pc_word = '/visitLocationCount';

var bar1chart;
var bar2chart;
var bar3chart;
var bc1_word = '/isAbroadCount';
var bc2_word = '/visitTypeCount';
var bc3_word = '/isSpecialVisitCount';

var bar_queschart;
var bqc_word = '/questionTypeCount'

// 当前日期
var date_begin;
var date_last;

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
    
    date_begin = DATE;
    date_last = DATE;
    this.setData({
      date_begin: DATE,
      date_last: DATE,
      
      // allAccompanyNumber: requestGetData(date_begin, date_last, question_word+aan_word)[0].value,
    });

  },

  /** 更新日期后立刻更新数据 **/
  /* 前半段 */
  bindDate_BeginChange: function (e) {
    this.setData({
      date_begin: e.detail.value
    })
    date_begin = e.detail.value

    //accompanyNumber
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + aan_word).then(res => {
      this.setData({
        allAccompanyNumber: res[0].value
      })
    });

    // piechart
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + pc_word).then(res => {
      setPieOption(piechart, res)
    });

    // barchart
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bc1_word).then(res => {
      setBarOption(bar1chart, res)
    });
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bc2_word).then(res => {
      setBarOption(bar2chart, res)
    });
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bc3_word).then(res => {
      setBarOption(bar3chart, res)
    });

    //bar_queschart
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bqc_word).then(res => {
      setBar_QuesOption(bar_queschart, res)
    })
  },
  /* 后半段 */
  bindDate_LastChange: function (e) {
    this.setData({
      date_last: e.detail.value
    })
    date_last = e.detail.value

    //accompanyNumber
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + aan_word).then(res => {
      this.setData({
        allAccompanyNumber: res[0].value
      })
    });

    // piechart
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + pc_word).then(res => {
      setPieOption(piechart, res)
    });

    // barchart
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bc1_word).then(res => {
      setBarOption(bar1chart, res)
    });
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bc2_word).then(res => {
      setBarOption(bar2chart, res)
    });
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bc3_word).then(res => {
      setBarOption(bar3chart, res)
    });

    //bar_queschart
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bqc_word).then(res => {
      setBar_QuesOption(bar_queschart, res)
    })
  },

  /** 得到当前日期 **/
  getDate_Begin: function () {
    console.log(this.data.date_begin)
    return this.data.date_begin
  },
  getDate_Last: function () {
    console.log(this.data.date_last)
    return this.data.date_last
  },

  /** data段 **/
  data: {
    allAccompanyNumber: 0,
    date_begin: "",
    date_last: "",
    date_index: 0,
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
      
    }
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
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + pc_word).then(res => {
      canvas.setChart(piechart);
      piechart.setOption(this.getPieOption(res));
      console.log('piechart already', res)
      return piechart;
    });
  },

  /* 动态更改参数 */
  setPieOption: function (chart, source) {
    chart.clear();
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
        radius: [0, '80%'],
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
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bc1_word).then(res => {
      canvas.setChart(bar1chart);
      bar1chart.setOption(this.getBarOption(res));
      console.log('bar1chart already', res)
      return bar1chart;
    });
    // setTimeout(function(){}, 2000);
  },
  initBar2Chart: function (canvas, width, height) {
    bar2chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    // var pages = getCurrentPages()
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bc2_word).then(res => {
      canvas.setChart(bar2chart);
      bar2chart.setOption(this.getBarOption(res));
      console.log('bar2chart already', res)
      return bar2chart;
    });
    // setTimeout(function(){}, 2000);
  },
  initBar3Chart: function (canvas, width, height) {
    bar3chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    // var pages = getCurrentPages()
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bc3_word).then(res => {
      canvas.setChart(bar3chart);
      bar3chart.setOption(this.getBarOption(res));
      console.log('bar3chart already', res)
      return bar3chart;
    });
    // setTimeout(function(){}, 2000);
  },

  /* 动态更改参数 */
  setBarOption: function (chart, source) {
    chart.clear();
    chart.setOption(this.getBarOption(source))
  },

  /* 设置样式 */
  getBarOption: function (source) {
    var sum = [source[0].value + source[1].value]
    return {
      backgroundColor: "#EDEDED",
      color: ['#5095f3', '#000f84'],
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
    this.requestGetData(this.data.date_begin, this.data.date_last, question_word + bqc_word).then(res => {
      canvas.setChart(bar_queschart);
      bar_queschart.setOption(this.getBar_QuesOption(res));
      console.log('bar_queschart already',res)
      return bar_queschart;
    });
  },

  /* 动态更改参数 */
  setBar_QuesOption: function (chart, source) {
    chart.clear();
    chart.setOption(this.getBar_QuesOption(source));
  },

  /* 设置样式 */
  getBar_QuesOption: function (source) {
    // name data
    var name = []
    var data = []
    // var index = 0
    // name[index] = 'name'
    // data[index] = 'data'

    for (var x in source) {
      // index += 1
      // name[index] = source[x].name
      // data[index] = source[x].value
      name[x] = source[x].name
      data[x] = source[x].value
    }
    return {
      backgroundColor: "#EDEDED",
      color: ['#5095f3', '#000f84', '#EE0000', '#C67171', '#DA70D6', '#D02090', '#CDAD00', '#CD8162', '#BF3EFF', '#000000'],
      grid: {
        top: 20,
        right: 90,
        button: 10,
        // containLabel: true
      },
      // dataset: {
      //   source: [
      //     name,
      //     data,
      //   ]
      // },
      legend: {
        top: 20,
        right: 0,
        orient: 'vertical'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: name,
        axisTick:{
          alignWithLabel:true
        }
      },
      yAxis: {
        type: 'value',

      },
      // 问题类别中共有10个选项
      series: [
        // 1
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
        // // 2
        // {
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       formatter: params => {
        //         return params.data[params.dataIndex + 1]
        //       },
        //     }
        //   }
        // },
        // // 3
        // {
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       formatter: params => {
        //         return params.data[params.dataIndex + 1]
        //       },
        //     }
        //   }
        // },
        // // 4
        // {
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       formatter: params => {
        //         return params.data[params.dataIndex + 1]
        //       },
        //     }
        //   }
        // },
        // // 5
        // {
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       formatter: params => {
        //         return params.data[params.dataIndex + 1]
        //       },
        //     }
        //   }
        // },
        // // 6
        // {
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       formatter: params => {
        //         return params.data[params.dataIndex + 1]
        //       },
        //     }
        //   }
        // },
        // // 7
        // {
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       formatter: params => {
        //         return params.data[params.dataIndex + 1]
        //       },
        //     }
        //   }
        // },
        // // 8
        // {
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       formatter: params => {
        //         return params.data[params.dataIndex + 1]
        //       },
        //     }
        //   }
        // },
        // // 9
        // {
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       formatter: params => {
        //         return params.data[params.dataIndex + 1]
        //       },
        //     }
        //   }
        // },
        // // 10
        // {
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       formatter: params => {
        //         return params.data[params.dataIndex + 1]
        //       },
        //     }
        //   }
        // },
      ]
    };
  },

  /** 请求图的数据  **/
  /* 参数：日期前半段, 日期后半段, 请求的图表 */
  requestGetData: function (date_begin, date_last, request_chart) {
    console.log(typeof date_begin, typeof date_last);
    return new Promise(function (resolve, reject) {
      var source
      wx.request({
        url: 'http://47.101.143.247:8080/visit-0.0.1-SNAPSHOT' + request_chart,
        // url: '',
        data: {
          startdate: JSON.stringify(date_begin),
          enddate: JSON.stringify(date_last),
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('token'),
        },
        method: 'POST',

        success: function (res) {
          console.log(date_begin, date_last, request_chart)
          console.log(res)

          // source = res.data.data
          console.log("success")
          resolve(res.data.data)
        },
        fail: function (res) {
          console.log(res)
          console.log(date_begin, date_last, request_chart)
          console.log('fail')
          reject(source)
        },
        complete: function (res) {
          console.log("complete")
        },
      })
    })
    // return source
  },
})
