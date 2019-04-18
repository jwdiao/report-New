<template>
  <div class="checkingJt">
    <!-- 头部 start -->
    <div class="checkingJt_top">
      

      <div class="leftBox">
        <div class="leftBoxInner">
          <div class="back" @click="enterIndexPage('/HomeGuide')"><img src="../../assets/images/index_back.png"></div>
          <div class="dayOrnight">
            <img v-show="dayOrNightStatus ==='白班'" src="../../assets/images/index_sun.png" />
            <img v-show="dayOrNightStatus ==='夜班'" src="../../assets/images/index_moon.png" />
            <span v-text="dayOrNightStatus">白班</span>
          </div>
        </div>
      </div>
      <div class="title"><span>三一集团三现数据中心</span></div>
      <div class="rightBox">
        <div class="rightBoxInner">
          <em class="time" v-text="currentTime"></em>
        </div>
      </div>
    </div>
    <!-- 头部 end -->
    <!-- main start -->
    <div class="checkingJt_main">
      <div class="checkingJt_left">
        <div class="common-item abnormalStatistics-day">
          <p class="home_title">
            人员考勤异常情况<em style="margin-left:4px;">(集团)</em>
          </p>
          <ul class="day">
            <li>
              <span>迟到</span>
              <em class="chidao" v-if="info && info.lateNum" v-text="info.lateNum"></em>
              <em v-else>0</em>
            </li>
            <li>
              <span>离岗</span>
              <em class="zaotui" v-if="info && info.outNum" v-text="info.outNum"></em>
              <em v-else>0</em>
            </li>
            <li>
              <span>未到</span>
              <em class="kuanggong" v-if="info && info.absentNum" v-text="info.absentNum"></em>
              <em v-else>0</em>
            </li>

            <li>
              <span>未派工</span>
              <em class="tiaoban" v-if="info && info.abnormalNum" v-text="info.abnormalNum"></em>
              <em v-else>0</em>
            </li>
          </ul>
        </div>
        <div class="abnormalStatistics-monthBox">
          <p class="home_title">人员考勤异常月统计<em style="margin-left:4px;">(集团)</em></p>
          <div class="abnormalStatistics-month" id="checkingJt-abnormalStatistics-month">

          </div>
        </div>
        <div class="statistics-monthBox">
          <p class="home_title">人员考勤月统计<em style="margin-left:4px;">(集团)</em></p>
          <div class="statistics-month" id="checkingJt-statistics-month">

          </div>
        </div>
      </div>
      <div class="checkingJt_con">
        <div class="checkingJt_con-top">
          <div class="dashbordBox">
            <p class="home_title">
              人员考勤看板<em style="margin-left:4px;">(集团)</em>
              <span class="checking_total">计件总人数<em >{{info.totalNum}}</em></span>
            </p>
            <div class="dashbord">
              <ul>
                <li>
                  <div class="top">
                    <div class="item item-row1">
                      <span class="text">派工人数</span>
                      <em class="num" v-show="info&&info.planTotalNum" v-text="info.planTotalNum">0</em>
                      <em class="num" v-show="!info || !info.planTotalNum">0</em>
                      <div class="dayNightNumBox">
                        <div class="line"></div>
                        <div class="con">									
                            <p>
                              白
                              <span v-text="info.dayPlanTotalNum">0</span>
                            </p>
                            <p>
                              夜
                              <span v-text="info.nightPlanTotalNum">0</span>
                            </p>
                        </div>
                      </div>
                    </div>
                    <div class="item item-row2">
                      <span class="text">实时派工</span>
                      <em class="num" style="letter-spacing:-1px;">{{info.planNum}}</em>
                      <em style="display: inline-block;vertical-align: middle;font-size: 0.2rem;color: #02c9fc;margin-left: 8px;">
                        ({{dayOrNightStatus.substring(0,1)}})
                      </em>								
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="lv lvBlue" id="jhkqlv"></div>
                    <p class="lvText">派工率</p>
                  </div>
                </li>
                <li>
                  <div class="top">
                    <div class="item item-row1">
                      <span class="text">考勤人数</span>
                      <em class="num" v-show="info&&info.userRecordNum" v-text="info.userRecordNum"></em>
                      <em class="num" v-show="!info || !info.userRecordNum">0</em>
                    </div>
                    <div class="item item-row2">
                      <span class="text">考勤时间</span>
                      <em class="num" v-show="info&&info.recordTime" style="letter-spacing:-1px;">{{Math.round(info.recordTime*100)/100}}h</em>
                      <em class="num" v-show="!info || !info.recordTime">0</em>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="lv lvYellow" id="kaoqinlv"></div>
                    <p class="lvText">出勤率</p>
                  </div>
                </li>
                <li>
                  <div class="top" style="text-align:center;">
                    <div class="item item-row1">
                      <span class="text">有效在岗时间</span>
                    </div>
                    <div class="item item-row2">
                      <!-- 等后台改了之间放开注释用注释，不用下面的两条判断 -->
                      <!-- <p class="num" v-show="info&&info.onWorkTime" style="letter-spacing:-1px;">{{Math.round(info.onWorkTime*100)/100}}h</p> -->
                      <p class="num" v-show="info&&info.onWorkTime&&(info.onWorkTime<=info.recordTime)" style="letter-spacing:-1px;">{{Math.round(info.onWorkTime*100)/100}}h</p>
                      <p class="num" v-show="info&&info.onWorkTime&&(info.onWorkTime>info.recordTime)" style="letter-spacing:-1px;">{{Math.round(info.recordTime*100)/100}}h</p>
                      <p class="num" v-show="!info || !info.onWorkTime">0</p>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="lv lvBlue" id="zaiganglv"></div>
                    <p class="lvText">在岗率</p>
                  </div>
                </li>
                <li>
                  <div class="top" style="text-align:center;">
                    <div class="item item-row1">
                      <span class="text">有效在岗人数</span>
                    </div>
                    <div class="item item-row2">
                      <p class="num" v-show="info&&info.validNum" v-text="info.validNum"></p>
                      <p class="num" v-show="!info || !info.validNum">0</p>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="lv lvYellow" id="yxsglv"></div>
                    <p class="lvText">有效上岗率</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="common-item statistics-dayBox">
            <p class="home_title ">人员考勤日统计<em style="margin-left:4px;">(集团)</em></p>
            <div class="statistics-day" id="checkingJt-statistics-day">

            </div>
          </div>
        </div>
        <div :class="{'checkingJt_con-bottom': true,'is-fullscreen':allScreen}">
        <!-- <div class="checkingJt_con-bottom"> -->
          <div @click="allScreenLook" style="position:absolute;top:10px;right:20px;cursor: pointer;z-index: 20;">
            <el-button type="primary" size="mini">{{screenMessage}}</el-button>
          </div>
          <el-tabs class="checking_tabs" v-model="currentTab" @tab-click="handleCheckingTab">
            <el-tab-pane label="人员雷达图" name="leida">
              <el-scrollbar class="checking_job-allCenter" style="height:100%;" >
                
                <div class="checking_item" v-for="(item, index) in redarList" :key="index">
                  <p class="checking_item-title" @click="handleEnterCompanyPage(item.companyCode)">
                    <!-- <div class="arrow-right"></div> -->
                    <span class="title" v-html="item.companyName"></span>
                    <span class="totalNum"><span class="text">计件总人数</span> <em>{{item.totalnum}}</em></span>
                  </p>
                  <div class="radarChartBox">
                    <div class="checking_item-wrapper radarChart" :id="`radarChart${index}`">

                    </div>
                    <div class="leidaTextBox">
                      <ul class="leidaText">
                        <li><span>派工人数</span><em>{{item.totalplannum}}</em></li>
                        <li><span>派工人数(白)</span><em>{{item.dayplantotalnum}}</em></li>
                        <li><span>派工人数(夜)</span><em>{{item.nightplantotalnum}}</em></li>
                        <li><span>实时派工</span><em>{{item.plannum}}</em></li>
                        <li><span>考勤人数</span><em>{{item.userrecordnum}}</em></li>
                        <li><span>考勤时间</span><em>{{Math.round(item.recordtime*100)/100}}h</em></li>
                        <li><span>有效在岗时间</span><em>{{Math.round(item.onworktime*100)/100}}h</em></li>
                        <li><span>有效在岗人数</span><em>{{item.validnum}}</em></li>
                      </ul>
                    </div>
                  </div>
                  
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="人员考勤" name="kaoqin">
              <div class="checking_job">
                <div class="checking_item">
                  <p class="checking_item-title">迟到</p>
                  <ul class="checking_item-wrapper">
                    <el-scrollbar style="height:100%;">
                      <li v-for="item in kaoqinList.lateList" :key="item.id">
                        <span v-text="item.companyName"></span>
                        <em v-text="item.latenum"></em>
                      </li>
                    </el-scrollbar>
                  </ul>
                </div>
                <div class="checking_item">
                  <p class="checking_item-title">离岗</p>
                  <ul class="checking_item-wrapper">
                    <el-scrollbar style="height:100%;">
                      <li v-for="item in kaoqinList.leaveList" :key="item.id">
                        <span v-text="item.companyName"></span>
                        <em v-text="item.outnum"></em>
                      </li>
                    </el-scrollbar>
                  </ul>
                </div>
                <div class="checking_item">
                  <p class="checking_item-title">未到</p>
                  <ul class="checking_item-wrapper">
                    <el-scrollbar style="height:100%;">
                      <li v-for="item in kaoqinList.absentList" :key="item.id">
                        <span v-text="item.companyName"></span>
                        <em v-text="item.absentnum"></em>
                      </li>
                    </el-scrollbar>
                  </ul>
                </div>
                <div class="checking_item">
                  <p class="checking_item-title">未派工</p>
                  <ul class="checking_item-wrapper">
                    <el-scrollbar style="height:100%;">
                      <li v-for="item in kaoqinList.abnormalList" :key="item.id">
                        <span v-text="item.companyName"></span>
                        <em v-text="item.abnormalnum"></em>
                      </li>
                    </el-scrollbar>
                  </ul>
                </div>
              </div>
            </el-tab-pane>       
        </el-tabs>
        </div>
      </div>
    </div>
    <!-- main end -->

  </div>
</template>

<script>
import moment from 'moment'
import echarts from 'echarts'

import {
  getTotalRecordData,
  getRecordDataOfDay,
  getRecordDataOfMonth,
  getAbnormaData,
  getRecordRadarChartData,
  getOrgIPAddressData,
} from '../../api/checkingJtApi'
export default {
  name: 'Checking-v20190221',
  data () {
    return {
      timerId: '', // 系统时间定时器
      refreshDataId: '', // 页面数据10秒定时器
      currentTime: '', // 系统当前时间
      dayOrNightStatus: '', // 白班或夜班

      centerName: '全部',
      info: { // 考勤基本信息
        lateNum: 0, // 迟到
        outNum: 0, // 离岗
        absentNum: 0, // 旷工（未到）
        abnormalNum: 0, // 未派工
        totalNum: 0, // 计件总人数
        planNum: 0, // 派工人数
        nightPlanTotalNum: 0, // 夜班派工总数
        dayPlanTotalNum: 0, // 白天派工总数
        userRecordNum: 0, // 考勤人数
        recordTime: 0, // 考勤时间
        onWorkTime: 0, // 有效在岗时间
        workPlanRate: 0, // 派工率
        recordRate: 0, // 考勤率
        onWorkRate: 0, // 在岗率
        validRate: 0 // 有效上岗率
      },

      EchartsArr: [], // 所有echarts数组，为了自适应用的
      abnormalMonthEchartsDom: '', // 左侧异常月dom
      abnormalMonthData: {}, // 左侧异常月数据 和 月数据 一个接口
      monthEchartsDom: '', // 左侧月统计
      dayEchartsData: {},// 右侧日echarts图,

      currentTab: 'leida', // 中间底部选中的tab项
      leidaData: [],
      redarList: [],
      kaoqinList: { // 中间==人员考勤列表==全部工作中心时
        lateList: [], // 迟到
        leaveList: [], // 早退
        absentList: [], // 旷工（未到）
        abnormalList: [] // 未派工
      },
      kaoqinListSubCenter: { // 中间==人员考勤列表==子工作中心时
        leaveData: { // 离岗
          leaveList: [],
          pagination: {}
        },
        lateData: { // 迟到
          lateList: [],
          pagination: {}
        },
        absentData: { // 旷工（未到）
          absentList: [],
          pagination: {}
        },
        abnormalData: { // 未派工
          abnormalList: [],
          pagination: {}
        }
      },
      checkRadarList:[], // 考勤雷达图数据
      allScreen: false,
      screenMessage:'点击查看全屏',	//全屏按钮文字
    }
  },
  mounted () {
    



    //=======================================================================================
    // 顶部日期时间
    this.currentTime = this.getCurrentDateTime() // 显示顶部时间
    this.getDayOrNightTextFun() // 显示顶部显示白夜班
    this.timerId = setInterval(() => {
      this.currentTime = this.getCurrentDateTime() // 显示顶部时间
      this.getDayOrNightTextFun() // 显示顶部显示白夜班
    }, 1000)

    // 顶部 === 考勤基本数据
    this.getTotalRecordDataFun()

    // 左侧 === 人员考勤异常月统计
    this.getRecordDataOfMonthFun()
    this.abnormalMonthEchartsDom = echarts.init(document.getElementById('checkingJt-abnormalStatistics-month')) //月echarts dom
    this.EchartsArr.push(this.abnormalMonthEchartsDom) // 放入echarts数组，resize时有用
    // 左侧 === 人员考勤月统计
    this.monthEchartsDom = echarts.init(document.getElementById('checkingJt-statistics-month')) //月echarts dom
    this.EchartsArr.push(this.monthEchartsDom) // 放入echarts数组，resize时有用


    // 右侧 === 人员考勤日统计
    this.dayEchartsDom = echarts.init(document.getElementById("checkingJt-statistics-day"))
    this.EchartsArr.push(this.dayEchartsDom) // 放入echarts数组
    this.getRecordDataOfDayFun()


    // 底部tab 只有点击的时候才请求
    // this.getAbnormaData()
    
    //leida
    this.getRecordRadarChartDataFun()
    // this.getLeidaData()



    


    // 定时器刷新
    this.refreshDataId = setInterval(() => {
      this.getTotalRecordDataFun()
      this.getRecordDataOfMonthFun()
      this.getRecordDataOfDayFun()
      this.getRecordRadarChartDataFun()
    }, 10000)

  },
  computed: {

  },
  watch: {
    info(val) {
      // 如果有基本信息，渲染中间顶部的4个echarts图
      if (val) {
        this.renderEchartsCircle()
      }
    },
    

    // 人员考勤异常月统计 和 人员考勤月统计 ======左侧
    abnormalMonthData (val) {
      if (val) {
        this.renderEchartsAbnormalMonth(this.abnormalMonthEchartsDom, val) // 人员考勤异常月统计echarts图
        this.renderEchartsMonth(this.monthEchartsDom, val) // 渲染echarts图
      }
    }, 

    // 人员考勤日统计数据 ======右侧
    dayEchartsData (val) {
      if (val) {
        this.renderDayEcharts(this.dayEchartsDom, val) // 渲染echarts图
      }
    },
    // 雷达图数据
    leidaData(val) {
      if (val.length) {
        this.getRecordRadarChartFun(this.leidaData)
      }
    },
  },
  methods: {
    allScreenLook(){//全屏按钮点击事件函数
			this.allScreen=!this.allScreen;
			this.screenMessage = this.screenMessage=="点击查看全屏"?"还原":"点击查看全屏";
		},
    // 点击标题回到首页
    enterIndexPage (path) {
      this.$router.replace(path)
    },
    // 时间格式化
    getCurrentDateTime () {
      return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    /**
     * 方法名：getDayOrNightTextFun
     * 描述：判断是白班还是夜班
     */
    getDayOrNightTextFun () {
      var timeY = this.currentTime.substring(11, 13)
      if (timeY >= 8 && timeY < 20) {
        this.dayOrNightStatus = '白班'
      } else {
        this.dayOrNightStatus = '夜班'
      }
    },


    // 获取考勤基本数据
    async getTotalRecordDataFun () {
      const res = await getTotalRecordData()
      if (res.data && res.data.code === 200 && res.data.data) {
        this.info = res.data.data
      } else {
        this.info = {
          /* lateNum: 0, // 迟到
          outNum: 0, // 早退
          absentNum: 0, // 旷工
          abnormalNum: 0, // 未派工
          totalNum: 0, // 计件总人数
          planNum: 0,
          nightPlanTotalNum: 0,
          dayPlanTotalNum: 0,
          userRecordNum: 0, // 考勤人数
          recordTime: 0, // 考勤时间
          onWorkTime: 0, // 有效在岗时间
          workPlanRate: 0,
          recordRate: 0,
          onWorkRate: 0,
          validRate: 0 */
          abnormalNum: 0, //未派工人数
          absentNum: 0, // 未到人数
          dayPlanTotalNum: 0, // 白班派工人数
          lateNum: 0, // 迟到人数
          nightPlanTotalNum: 0, // 夜班派工人数
          onWorkTime: 0, // 有效在岗时间
          onworkRate: 0, // 在岗率
          outNum: 0, // 离岗人数
          planNum: 0, // 实时派工人数
          planTotalNum: 0, // 总派工人数
          recordRate: 0, // 出勤率
          recordTime: 0, // 考勤时间
          totalNum: 0, // 计件总人数
          userRecordNum: 0, // 考勤人数
          validNum: 0, // 有效在岗人数
          validRate: 0, // 有效上岗率
          workPlanRate: 0 // 派工率
        }
      }
    },

    // 获取右侧日统计图数据
    async getRecordDataOfDayFun () {
      const res = await getRecordDataOfDay()
      if (res && res.data && res.data.code === 200) {
        this.dayEchartsData = res.data.data
        // if (this.info && this.info.totalNum) {
        // this.dayEchartsData.totalNum = this.info.totalNum
        // }
      }
      /*  else {
        this.dayEchartsData.practical = [null,null,null,null,null,null,null,null,null,null,null,null]
        this.dayEchartsData.practicalVal = [null,null,null,null,null,null,null,null,null,null,null,null]
	      this.dayEchartsData.missRecordNum=[null,null,null,null,null,null,null,null,null,null,null,null]
		    this.dayEchartsData.missRecordVal=[null,null,null,null,null,null,null,null,null,null,null,null]
        this.dayEchartsData.ret = 200
        this.dayEchartsData.xAxis = [null,null,null,null,null,null,null,null,null,null,null,null]
      } */
    },

    /* 四个考勤率 */
    renderClock(dom, data) {
      var myChart = echarts.init(dom)
      var option = null
      option = {
        tooltip: {
          formatter: '{a} {b} : {c}%',
          confine: true // 是否将tooltip框限制在图表的区域内
        },
        toolbox: {
          show: true
        },
        series: [{
          name: data.name,
          type: 'gauge',
          radius: '100%',
          rich: {
            color: '#fff'
          },
          axisLabel: {
            show: false
          },
          itemStyle: {
            // color: data.color, //指针颜色
            length: 5
          },
          axisTick: {
            show: false
          },
          emphasis: {
            itemStyle: {
              color: '#fff'
            }
          },
          axisLine: { // 仪表盘轴线相关配置。
            show: false,
            lineStyle: {
              width: 0,
              // 0% 处的颜色
              color: [
                [1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: data.color.startColor
                }, {
                  offset: 1,
                  color: data.color.endColor
                }], false)]
              ]
              // color: [[1,'#ff820d']]
            },
            length: 5
          },
          splitLine: {
            show: false
          },
          pointer: {
            width: 4
          },
          detail: {
            formatter: '{value}%',
            color: '#fff',
            offsetCenter: [0, '70%'],
            fontSize: 20
          },
          data: [{
            value: data.value,
            name: ''
          }]
        }]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    },
    /* 四个考勤率 */
    renderEchartsCircle() {
      // 计划考勤率 jhkqlv
      var jhkqlvEcharts = document.getElementById('jhkqlv')
      this.workPlanRateObj = {
        name: '计划考勤率',
        // color: '#0097ff',
        color: {
          startColor: '#0090ff',
          endColor: '#00e2ff'
        },
        value: this.info.workPlanRate
      }
      this.renderClock(jhkqlvEcharts, this.workPlanRateObj)

      // 考勤率
      var kaoqinlvEcharts = document.getElementById('kaoqinlv')
      this.recordRateObj = {
        name: '考勤率',
        // color: '#ff8f19',
        color: {
          startColor: '#ff7905',
          endColor: '#ffbf46'
        },
        value: this.info.recordRate
      }
      this.renderClock(kaoqinlvEcharts, this.recordRateObj)

      // 在岗率 zaiganglv
      var zaiganglvEcharts = document.getElementById('zaiganglv')
      this.workPlanRateObj = {
        name: '上岗率',
        // color: '#0097ff',
        color: {
          startColor: '#0090ff',
          endColor: '#00e2ff'
        },
        // value: this.info.onWorkRate
        value: parseFloat(this.info.onworkRate) > 100 ? '100' : this.info.onworkRate
      }
      this.renderClock(zaiganglvEcharts, this.workPlanRateObj)

      // 有效上岗率 yxsglv
      var yxsglvEcharts = document.getElementById('yxsglv')
      this.validRateObj = {
        name: '有效上岗率',
        // color: '#ff8f19',
        color: {
          startColor: '#ff7905',
          endColor: '#ffbf46'
        },
        value: this.info.validRate
      }
      this.renderClock(yxsglvEcharts, this.validRateObj)
    },

    /**
     * 方法名：renderEcharts日
     * 参数：(myChart, data) 参数一：echarts的dom，参数二：数据
     * 描述：人员考勤日/月/年统计echart图表渲染
     */
    renderDayEcharts(myChart, data){
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          // data: this.arr,
          show: true,
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 8,
          textStyle: {
            fontWeight: "normal", // 标题颜色
            color: "#fff"
          },
          top: 10,
          bottom: 0
        },
        grid: {
          bottom: 30
        },
        xAxis: [
          {
            type: 'category',
            data: data.xAxis,
            // data:this.dayXTime,
            axisLine: {  // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1'
              }
            },
            axisPointer: {
              type: 'shadow'
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            },
            axisLabel : {
              textStyle: {
                color: '#2DD7EC'
              },
              interval: 0,
              rotate: 45
              // interval: data.xAxisLabelInterval,
              // showMaxLabel: true, //是否显示最大 tick 的 label
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '考勤人数',
            nameTextStyle: {
              color: '#fff',
              align: 'left',
              padding:[0,20,0,0]
            },
            axisLine: {  // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1' }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: { //网格线
              show: true,
              lineStyle: {
                color: ['#293e60'],
                width: 1,
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            name: '出勤率',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,35]
            },
            min: 0,
            // smooth: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {  // 控制y轴线%的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '0' }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#56AFFB'],
                width: 1,
                type: 'dotted'
              }
            }
          },
        ],
        series: [

          {
            name: '考勤人数',
            type: 'bar',
						stack:'人数',
            radius: '10%',
            // data: data.practical,
            data: data.userRecordNumArr,
            itemStyle: {
              normal: {
                // barBorderRadius: [4, 4, 4, 4],
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2cd3ec'},
                    {offset: 0.5, color: '#32a6e9'},
                    {offset: 1, color: '#387de6'}
                  ])
              }
            },
            barWidth: 4,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          },
					{
						name: '缺勤人数',
						type: 'bar',
						stack:'人数',
						radius: '10%',
						data: data.missRecordNumArr,
						itemStyle: {
							normal: {
								color:'#FF5B86'
							}
						},
						barWidth: 4,  // 控制柱子的宽度
						barGap: '50%'  // 控制柱子的间隔
					},
          {
            name: '出勤率',
            type: 'bar',
            radius: '10%',
            yAxisIndex: 1,
            data: data.recordRateArr,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#e8e31a' },
                    { offset: 0.5, color: '#fbbd07' },
                    { offset: 1, color: '#f8920e' }
                  ]
                )
              }
            },
            barWidth: 4,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          }
        ]
      }
      myChart.setOption(option, true)
    },

    // 获取左侧 异常月和 月 统计数据
    async getRecordDataOfMonthFun () {
      const res = await getRecordDataOfMonth('','')
      if (res.data && res.data.code === 200) {
        this.abnormalMonthData = res.data.data
      }
    },

    // 左侧人员考勤异常月统计
    /**
     * 参数：(myChart, data) 参数一：echarts的dom，参数二：数据
     * 描述：人员考勤异常月统计echart图标渲染
     */
    renderEchartsAbnormalMonth (myChart, data) {
      var option = {
        legend: {
          data: ['迟到', '离岗', '未到'],
          show: true,
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 8,
          textStyle: { // 标题颜色
            color: '#fff'
          },
          top: 10,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          bottom: 40,
          right: 10
        },
        xAxis: [
          {
            type: 'category',
            data: data.xAxis,
            // 控制x轴线的样式
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1'
              }
            },
            axisLabel : {
              // formatter: '{value}',
              textStyle: {
                color: '#2fdaeb'
              },
              interval: 0,
              rotate: 75
              // showMaxLabel: true, //是否显示最大 tick 的 label
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: data.maxY,
            // interval: data.intervalY,
            // 控制y轴线的样式
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1'
              }
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'
              },
              showMinLabel: true, // 是否显示最小 tick 的 label
              showMaxLabel: true, // 是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            // 网格线
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#293e60'],
                width: 1,
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '迟到',
            type: 'bar',
            data: data.lateArr,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#fd87a7' },
                    {offset: 0.5, color: '#e45a88' },
                    {offset: 1, color: '#c82867' }
                  ]
                ),
                // barBorderRadius: 2
              }
            },
            barWidth: 2, // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          },
          {
            name: '离岗',
            type: 'bar',
            data: data.leaveNumArr,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#e8e31a' },
                    { offset: 0.5, color: '#fbbd07' },
                    { offset: 1, color: '#f8920e' }
                  ]
                ),
                // barBorderRadius: 2
              }
            },
            barWidth: 2,  // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          },
          {
            name: '未到',
            type: 'bar',
            data: data.absenNumArr,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2cd3ec' },
                    { offset: 0.5, color: '#31aee9' },
                    { offset: 1, color: '#387de6' }
                  ]
                ),
                // barBorderRadius: 2
              }
            },
            barWidth: 2,  // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          }
        ]
      }
      myChart.setOption(option)
    },


    /**
     * 方法名：renderEcharts月
     * 参数：(myChart, data) 参数一：echarts的dom，参数二：数据
     * 描述：人员考勤日/月/年统计echart图表渲染
     */
    renderEchartsMonth(myChart, data){
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          show: true,
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 8,
          textStyle: {
            fontWeight: "normal", // 标题颜色
            color: "#fff"
          },
          top: 10,
          bottom: 0
        },
        grid: {
          bottom: 40
        },
        xAxis: [
          {
            type: 'category',
            data: data.xAxis,
            axisLine: {  // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1'
              }
            },
            axisPointer: {
              type: 'shadow'
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            },
            axisLabel : {
              textStyle: {
                color: '#2DD7EC'
              },
              rotate: 75,
              interval: 0
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '考勤人数',
            nameTextStyle: {
              color: '#fff',
              align: 'left',
              padding:[0,20,0,0]
            },
            // max: data.max,
            axisLine: {  // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '1' }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: { //网格线
              show: true,
              lineStyle: {
                color: ['#293e60'],
                width: 1,
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            name: '出勤率',
            nameTextStyle: {
              color: '#fff',
              padding:[0,0,0,35]
            },
            min: 0,
            // smooth: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {  // 控制y轴线%的样式
              lineStyle: {
                type: 'solid',
                color: '#293e60',
                width: '0' }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#56AFFB'],
                width: 1,
                type: 'dotted'
              }
            }
          },
        ],
        series: [
          {
            name: '考勤人数',
						stack:'人数',
            type: 'bar',
            radius: '10%',
            data: data.userRecordNumArr,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2cd3ec'},
                    {offset: 0.5, color: '#32a6e9'},
                    {offset: 1, color: '#387de6'}
                  ])
              }
            },
            barWidth: 2,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          },
					{
						name: '缺勤人数',
						stack:'人数',
						type: 'bar',
						radius: '10%',
						data: data.missRecordNumArr,
						itemStyle: {
							normal: {
								color:'#FF5B86'
							}
						},
						barWidth: 2,  // 控制柱子的宽度
						barGap: '50%'  // 控制柱子的间隔
					},
          {
            name: '出勤率',
            type: 'bar',
            radius: '10%',
            yAxisIndex: 1,
            data: data.recordRateArr,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#e8e31a' },
                    { offset: 0.5, color: '#fbbd07' },
                    { offset: 1, color: '#f8920e' }
                  ]
                )
              }
            },
            barWidth: 2,  // 控制柱子的宽度
            barGap: '50%'  // 控制柱子的间隔
          }
        ]
      }
      myChart.setOption(option, true)
    },

    // 底部tab == 公司人员考勤
    async getAbnormaDataFun () {
      const res = await getAbnormaData(this.centerName)
      if (res && res.data) {
        if (res && res.data.code === 200) {
          const {data} = res.data
          this.kaoqinList.lateList = data.lateList // 迟到
          this.kaoqinList.leaveList = data.leaveList //早退
          this.kaoqinList.absentList = data.absentList //旷工
          this.kaoqinList.abnormalList = data.abnormalList //未派工
        }
      }
    },
    // 底部tab == 公司人员雷达图
    async getRecordRadarChartDataFun () {
      const res = await getRecordRadarChartData(this.centerName)
      if (res && res.data && res.data.code === 200) {
         this.leidaData = res.data.data.list
      }
    },

    // 雷达图渲染
    rederEchartsRadar(dom, inDicatorArr, zhengzhibiaoArr, companyName) {
      var myChart = echarts.init(dom);
      var option = null;
      option = {
        tooltip: {
          position: ['10%','20%'],
          // confine: true,
          formatter: function(params,ticket,callback){
            console.log('params:',params)
            var objhtml = params.data.name+'<br />';
            var lvArr = params.data.value;
            // console.log('lvArr:',lvArr)
            objhtml+='派工率：' + lvArr[0]+'%<br />'
            objhtml+='上岗率：' + lvArr[2]+'%<br />'
            objhtml+='在岗率：' + lvArr[3]+'%<br />'
            objhtml+='出勤率：' + lvArr[4]+'%<br />'
            objhtml+='正常率：' + lvArr[1]+'%'
            /* for(var i=0;i<lvArr.length;i++){
              if(i===0){
                let str = '派工率：' + lvArr[i]+'%<br />';
                objhtml+=str
              }else if (i===1) {
                let str = '正常率：' + lvArr[i]+'%<br />';
                objhtml+=str
              }else if (i===2) {
                let str = '上岗率：' + lvArr[i]+'%<br />';
                objhtml+=str
              }else if(i===3){
                let str = '在岗率：' + lvArr[i]+'%<br />';
                objhtml+=str
              }else if(i===4){
                let str = '出勤率：' + lvArr[i]+'%'
                objhtml+=str
              }            
            } */
            return objhtml;
          }
        },
        radar: [{
          indicator: inDicatorArr,
          center: ['50%', '52%'],
          radius: 60,
          // startAngle: 90,
          splitNumber: 3,
          shape: 'circle',
          // nameGap: 8,
          name: {
            formatter: '{value}',
            textStyle: {
              // width:100,
              color: '#fff'//外部文字的颜色
            }
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(31, 65, 111, 0.5)',
                'rgba(31, 65, 111, 0.6)', 'rgba(31, 65, 111, 0.7)',
                'rgba(31, 65, 111, 0.8)', 'rgba(31, 65, 111, 0.8)'
              ],
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(31, 166, 213, 0.5)'//半径的颜色
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(32, 186, 233, 1)'//每一圈圆环的颜色
            }
          }
        }, ],
        series: [{
            name: '雷达图',
            type: 'radar',
            symbol: 'none',
            itemStyle: {
              emphasis: {
                // color: 'blue',
                lineStyle: {
                  width: 4
                }
              }
            },
            lineStyle:{
              color:'rgba(182,198,39,0.8)'
            },
            data: [{
              value:zhengzhibiaoArr ,
              name: companyName,
              areaStyle: {
                normal: {
                  // color: 'rgba(83, 227, 253, 0.5)'//遮罩层颜色
                  color: 'rgba(83, 227, 253, 0)'//遮罩层颜色
                }
              }
            }]
          }
        ]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    },
    // 雷达图组织数据
    getRecordRadarChartFun(myArr){
      
      if(myArr instanceof Array){
        let newMyArr = []
        myArr.forEach((ele, index) => {
          // debugger;
            // this.fuZhiBiaoList.push([ele.lateNum, ele.outNum, ele.absentNum, ele.abnormalNum]);
            let yichangNum = parseFloat(ele.latenum)+parseFloat(ele.absentnum)+parseFloat(ele.outnum)+parseFloat(ele.abnormalnum)
            let zhengchangNum = parseFloat(ele.totalnum)-parseFloat(ele.latenum)-parseFloat(ele.absentnum)-parseFloat(ele.outnum)-parseFloat(ele.abnormalnum)
            let yichangLv = ((zhengchangNum/parseFloat(ele.totalnum))*100).toFixed(2) // 异常率
            let paigongLv = ele.newworkplanrate<=100?ele.newworkplanrate:100 // 派工率
            let shanggangLv = ele.validrate<=100?ele.validrate:100 // 上岗率
            let zaigangLv = ele.onworkrate<=100?ele.onworkrate:100 // 在岗率
            let chuqinLv = ele.recordrate<=100?ele.recordrate:100 // 出勤率
            let totalLv = parseFloat(yichangLv) + parseFloat(paigongLv) + parseFloat(shanggangLv) + parseFloat(zaigangLv) + parseFloat(chuqinLv)
            ele.totalLv = totalLv
            newMyArr.push(ele)
            // console.log('centername:',ele.centerName)
            // console.log('yichangNum:',yichangNum)
        })
        
        let sortNewArr = newMyArr.sort(function(a, b){
          return b.totalLv - a.totalLv
        })
        console.log('sortNewArr:',sortNewArr)
        this.redarList = sortNewArr
        var myRadarCharts = [];
        this.fuZhiBiaoList = [];
        this.indicatorList = [];
        // 派工率-workPlanRate			
        // 异常率=（总数-迟到-旷工(未到)-离岗-调班）/总数 = totalNum-lateNum-absentNum-outNum-abnormalNum
        // 上岗率-validRate
        // 在岗率-onWorkRate
        // 出勤率-recordRate
        sortNewArr.forEach((ele, index) => {
            let yichangNum = parseFloat(ele.latenum)+parseFloat(ele.absentnum)+parseFloat(ele.outnum)+parseFloat(ele.abnormalnum)
            let zhengchangNum = parseFloat(ele.totalnum)-parseFloat(ele.latenum)-parseFloat(ele.absentnum)-parseFloat(ele.outnum)-parseFloat(ele.abnormalnum)
            let yichangLv = ((zhengchangNum/parseFloat(ele.totalnum))*100).toFixed(2) // 异常率
            let paigongLv = ele.newworkplanrate<=100?ele.newworkplanrate:100 // 派工率
            let shanggangLv = ele.validrate<=100?ele.validrate:100 // 上岗率
            let zaigangLv = ele.onworkrate<=100?ele.onworkrate:100 // 在岗率
            let chuqinLv = ele.recordrate<=100?ele.recordrate:100 // 出勤率
            let totalLv = yichangLv + paigongLv + shanggangLv + zaigangLv + chuqinLv
            this.fuZhiBiaoList.push([paigongLv, yichangLv, shanggangLv, ele.onworkrate, chuqinLv]);
            let minValue = Math.min.apply(Math,[paigongLv, yichangLv, shanggangLv, zaigangLv, chuqinLv])
            if(minValue>50){
              minValue=50
            }
            this.indicatorList.push([{
              name: '派工(' + ele.plannum + '人)',
              max: 100,
              min: minValue
            }, {
              name: "异常\n(" + yichangNum + "人)",
              max: 100,
              min: minValue
            }, {
              name: '上岗\n(' + ele.validnum + '人)',
              max: 100,
              min: minValue
            }, {
              name: '在岗\n(' + ele.onworktime + 'h)',
              max: 100,
              min: minValue
            }, {
              name: '出勤\n(' + ele.userrecordnum + '人)',
              max: 100,
              min: minValue
            }]);
        })
        // console.log('fuZhiBiaoList:',this.fuZhiBiaoList)
        // console.log('indicatorList:',this.indicatorList)
        
        var that = this
        setTimeout(function() {
          that.redarList.forEach(function(ele, index) {
            if(document.getElementById("radarChart" + index)){
                that.rederEchartsRadar(document.getElementById("radarChart" + index), that.indicatorList[index], that.fuZhiBiaoList[index], ele.companyName)
            }
          })
          
        })
      }
        
    },
    // 处理点击tab切换
    handleCheckingTab(tab, event) {
      // console.log(tab, event);
      this.currentTab = tab.name;
      if(tab.name === 'kaoqin'){
        this.getAbnormaDataFun()
      } 
    },
    async handleEnterCompanyPage (companyCode) {
      const res = await getOrgIPAddressData(companyCode)
      if(res&& res.data &&res.data.code===200){
        const itemData = res.data.data.ipList[0];
        const ipAddress = itemData.ipAddress
        const port = itemData.port
        const url = 'http://' + ipAddress + ':' + port
        localStorage.setItem('ipAddrCheckingSelectedSubcompany',url)
        localStorage.setItem('companyNameCheckingSelectedSubcompany',itemData.companyName)
        this.$router.push('/Checking')
        // this.$router.go(-1)
        // this.$router.replace('/Checking')
      }
    },


    //===========工具方法
    /**
     * 方法名:max
     * 参数(arr) 数组数据
     * 描述：获取数组中最大值
     */
    max (arr) {
      // debugger;
      var max = Number(arr[0])
      for(var i = 1; i < arr.length; i++) {
        if (Number(arr[i]) > max) {
          max = arr[i]
        }
      }
      return max
    }
  },
  destroyed () {
    clearInterval(this.timerId)
    clearInterval(this.refreshDataId)
  }
}
</script>
<style lang="scss" scoped>

.home_title{
	position:relative;
}
.home_title:after{
	display: block;
	content: '';
	position: absolute;
	width: 12px;
	height: 12px;
	border-radius: 12px;
	background: #31E6FF;
	left: 0px;
	top: 42%;
	margin-top: -5px;
}
.common-item{
  background-color: rgba(39, 69, 111, 0.3);
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.checkingJt{
  font-size: 12px;
  height:100%;
  background-image: url(../../assets/images/index_bg.png);
  background-size: 100% 100%;
  color: rgb(255, 255, 255);
  background-repeat: no-repeat;overflow: hidden;
  &_top{
    position: fixed;top:0;left:15px;right:15px;box-sizing: border-box;
    height: 106px;overflow: hidden;
    .leftBox{
      width: 30%;height:100%;float: left;
      position: relative;
      &Inner{
        position: absolute;left:0;bottom:0;
      }
      .back{
        cursor: pointer;
        display: inline-block;vertical-align: middle;
        img{vertical-align: middle;width: 88px;}
      }
      .dayOrnight{
        display: inline-block;vertical-align: middle;
        img{vertical-align: middle;    width: 65px;}
        span{
          font-size: 36px;
          color: #ababab;
          vertical-align: middle;
          margin-left: -5px;
        }
      }
    }
    .title {
      width: 40%;float: left;
      line-height:106px;
      text-align: center;
      font-size: 42px;
      color:#fff;font-weight:bold;
      span{cursor: default;}
    }
    .rightBox{
      width: 30%;height:100%;
      float: left;
      padding-top: 60px;
      position: relative;
      &Inner{
        position: absolute;right:0;bottom:10px;
      }
      .time{
        width:250px;
        display: inline-block;
        font-size: 30px;
        color:#ababab;
        font-family: fontnameUnidreamLED !important;
      }
    }
  }
  &_main{
    position: fixed;top:120px;left:15px;right:15px;bottom:15px;
  }
  &_left{
    width: 25%;float: left;height:100%;
    // border:1px solid #ff0;
    display: flex;
    flex-direction: column;
    .home_title{
      width:100%;
      img{margin-left: 10px;vertical-align: -2px;width: 12px;}
			
    }
    .abnormalStatistics-day{
      flex: 1;
      // height: 345px;
      margin-bottom: 15px;
      
      .day{
        display:flex;justify-content: center;align-items: center;flex-wrap: wrap;//如果一条轴线排不下，如何换行，wrap换行
        width:100%;height: calc(100% - 36px - 40px);margin: 20px 0;
        li{
          text-align: center;width:50%;font-size:0;
          span{
            // font-size: 25px;
            font-size: 0.25rem;
            display: inline-block;vertical-align: middle;
          }
          em{
            // font-size:42px;width: 100px;
            font-size: 0.42rem;width: 1rem;
            color:#00c7fa;display: inline-block;vertical-align: middle;
            font-weight: bold;margin-left:8px;
            
            text-align: left;
            font-family: fontnameRegular;
          }
        }
      }
    }
    .abnormalStatistics-monthBox{
      flex: 1;
      background-color: rgba(39, 69, 111, 0.3);
      padding: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-bottom:0;
      .abnormalStatistics-month{
        width:100%;height: calc(100% - 36px);
      }
    }
    
    .statistics-monthBox{
      flex: 1;
      background-color: rgba(39, 69, 111, 0.3);
      padding: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-top:0;
      .statistics-month{
        width:100%;height: calc(100% - 36px);
      }
    }
  }
  &_con{
    width: 75%;
    float: left;
    height: 100%;
    padding-left: 15px;
    // border:1px solid #ff0;
    &-top{
      display:flex;

      .dashbordBox {
        flex:2;
        // height:340px;
        background-color: rgba(39, 69, 111, 0.3);
        padding: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);

        .home_title {
          width: 100%;
          position: relative;

          .checking_total {
            font-size: 0.24rem;
            top: -10px;
            color: #fff;
            position: absolute;
            right: 0;
            font-weight: 100;

            em {
              font-size: 0.42rem;
              vertical-align: -4px;
              color: #01cbff;
              display: inline-block;
              margin-left: 12px;
              font-family: fontnameRegular;
            }
          }
        }
        .dashbord {
          width: 100%;
          height: calc(100% - 36px);
          overflow: hidden;

          ul {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            height: 100%;
            padding-top: 10px;

            li {
              background-color: rgba(42, 75, 133, 0.3);
              padding: 0 10px;
              height: 100%;
              flex: 1;
              margin-left: 6px;
              text-align: center;

              &:first-child {
                margin-left: 0;
              }

              .text {
                font-size: 0.18rem;
                font-weight: 100;
              }

              .num {
                font-size: 0.26rem;
                color: #02c9fc;
                font-family: fontnameRegular;
              }

              .lv {
                width: 108px;
                height: 108px;
                margin: 0 auto;
              }

              .lvYellow {
                background: url(../../assets/images/index_clock-yellow.png)
              }

              .lvBlue {
                background: url(../../assets/images/index_clock-blue.png)
              }

              .lvText {
                color: #c4c4c4;
                // font-size:18px;
                font-size: 0.18rem;
                padding-bottom: 10px;
              }

              .top {
                height: 104px;
                overflow: hidden;
                text-align: left;
                line-height:1;
                padding-top:20px;
                .item {
                  height:42px;
                  line-height:42px;
                  font-size:0.24rem;
                  .text {
                    display: inline-block;
                    vertical-align: middle;
                    text-align: left;
                  }

                  .num {
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 5px;
                  }
                }
                .dayNightNumBox{
                  line-height: 20px;
                  font-size: 0.14rem;
                  color: #02c9fc;
                  display: inline-block;
                  vertical-align: middle;
                  padding-left:3px;
                  .line{
                    width:1px;
                    height:34px;
                    background: #02c9fc;
                    vertical-align: middle;
                    display: inline-block;
                  }
                  .con{
                    vertical-align: middle;
                    display: inline-block;
                    padding-left: 4px;
                    span{
                      margin-left: -3px;
                      font-size: 0.16rem;
                      font-family: fontnameRegular;
                    }
                  }
                }
              }

              .bottom {
                margin-top: 15px;
                padding-bottom: 10px;
              }
            }
          }
        }
      }

      .statistics-dayBox{
        margin-left:15px;
        flex: 1;
        .statistics-day{
          width:100%;height: calc(100% - 36px);
        }
      }
    }
    &-bottom{
      background-color: rgba(39, 69, 111, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      height: calc(100% - 360px);
      margin-top: 15px;
      position: relative;
      .checking_tabs {
        height: 100%;

        /deep/ .el-tab-pane {
          height: 100%;
          padding: 15px;
        }

        /deep/ .el-tabs__header {
          margin: 0
        }

        /deep/ .el-tabs__nav-wrap {
          height: 52px;
        }

        /deep/ .el-tabs__item {
          color: #466ec8;
          padding: 0 50px;
          font-weight: 700;
          font-size: 22px;
          height: 52px;
          line-height: 52px;
        }

        /deep/ .el-tabs__nav-wrap::after {
          height: 0;
        }

        /deep/ .el-tabs__item.is-active {
          background: url(../../assets/images/tab-selected.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          color: #fff;
        }

        /deep/ .el-tabs__active-bar {
          height: 0;
        }

        /deep/ .el-tabs__content {
          height: calc(100% - 52px);
          background-color: rgba(39, 69, 111, 0.6);
        }

        /deep/ .el-tabs__nav-wrap {
          margin-bottom: 0
        }
      }

      .checking_job {
        height: 100%;
        display: flex;

        .checking_item {
          flex: 1;
          margin-left: 6px;

          /* &:first-child {
            margin-left: 0;
          } */
        }

        .checking_item-title {
          color: #53e3fd;
          font-size: 22px;
          font-weight: bold;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background: #256398;
          // background: #48759c url(../../assets/images/checking_head-bg.jpg) no-repeat right top;
          text-align: center;
        }
        
        .checking_item-wrapper {
          background-color: rgba(42, 75, 133, 0.3);
          font-size: 16px;
          padding-bottom: 10px;
          height: calc(100% - 50px);

          li {
            padding: 15px 15px 0 30px;

            span {
              width: 190px;
              display: inline-block;
              text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            em {
              color: #02c9fc;
              margin-left: 8px;
            }
          }

          /deep/ .el-scrollbar__wrap {
            overflow-x: hidden
          }
        }

        &-allCenter {
          height: 100%;
          width: 100%;
          overflow: hidden;

          /deep/ .el-scrollbar__wrap {
            overflow-x: hidden
          }



          .checking_item {
            width: 33.33%;
            float: left;
            padding-left: 6px;
            padding-bottom: 10px;
          }
          .arrow-right{
            width: 0;
            height: 0;
            border-top: 50px solid transparent;
            border-bottom: 50px solid transparent;
            border-left: 50px solid green;
            border-right:0px;
            position: absolute;right:0;
          }
          .checking_item-title {
            position: relative;
            color: #53e3fd;
            font-size: 16px;
            font-weight: bold;
            height: 50px;
            line-height: 50px;
            text-align: left;
            padding: 0 5px;
            overflow: hidden;
            // background: url(../../assets/images/checking_head-bg.jpg) no-repeat right top;
            background: #256398;
            // background: #256398 url(../../assets/images/checking_head-bg.jpg) no-repeat right top;
            cursor: pointer;
            .numAndUnit {
              float: right;
            }
            .title{
              width: 230px;display: inline-block;padding: 0 20px 0 20px;
              box-sizing: border-box;
            }
            .totalNum{
              display: inline-block;margin-left: 20px;
              color:#fff;
              .text{
                width: 95px;display: inline-block;vertical-align:middle;text-align: right;
              }
              em{
                color:#02c9fc;margin-left:10px;display: inline-block;vertical-align:middle;font-size: 24px;
                // font-family: fontnameRegular !important;
              }
            }
          }

          .checking_item-wrapper {
            
            font-size: 16px;
            height: calc(100% - 50px);

            li {
              // padding:15px 15px 0;
              padding: 10px 10px 0;

              span {
                width: 90px;
                display: inline-block;
              }

              em {
                color: #02c9fc;
                margin-left: 8px;
              }
            }
          }


          .radarChartBox{
            overflow: hidden;
            background-color: rgba(42, 75, 133, 0.3);
            padding-top:10px;padding-left:10px;
            .radarChart{
              height:194px;width:230px;float:left;
            }
            .leidaTextBox{
              float: left;
              margin-left:10px;
              border-left: 1px solid #1c3356;
              .leidaText{
                li{margin-top:2px;}
                span{color:#fff;font-size: 14px;display: inline-block;width:100px;text-align: right;}
                em{color:#02c9fc;font-size: 16px;margin-left:6px;
                // font-family: fontnameRegular !important;
                }
              }
            }
          }
          


        }
      }
    }
  }

// 全屏样式
  .is-fullscreen{
    position: fixed;top:0;left:0;bottom:0;right:0;z-index:10;height:100%;background: #071226;
    
    .checking_job-allCenter .checking_item{
      width: 25%
    }
  }
}

</style>
