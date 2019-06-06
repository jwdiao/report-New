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
      <div class="title"><span>三一集团考勤数据</span></div>
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
        <!--左上-->
        <div class="leftTopPersonNum">
          <div class="leftWarp">
            <p class="titleText1 titleText">计件总人数
              <!--<em class="titleTotalNum" v-show="info && info.totalNum">{{info.totalNum}}<em>人</em></em>-->
              <em class="titleTotalNum">{{userCount}}<em>人</em></em>
            </p>
            <!--<p class="titleText2 titleText1">&nbsp;&nbsp;&nbsp;&nbsp;离岗
              <em class="titleTotalNum zaotui" v-if="info && info.outNum">{{info.outNum}}  <em>人</em></em>
              <em class="titleTotalNum" v-else>0  <em>人</em></em>
            </p>-->
          </div>
          <!--几个人数-->
          <div class="statusList">
            <ul class="statusListTop">
              <li>
                <p class="statusTitle">派工人数</p>
                <div class="statusDiv statusDivFirst">
                  <em class=" statusCount num" v-show="info&&info.planTotalNum" v-text="info.planTotalNum" style="letter-spacing:0px;">0</em>
                  <em class="statusCount num" v-show="!info || !info.planTotalNum" style="letter-spacing:0px;">0</em>
                  <em class="statusDanw">人</em>
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
              </li>
              <li>
                <p class="statusTitle">实时派工</p>
                <div class="statusDiv">
                  <em class="statusCount num" style="letter-spacing:0px;">{{info.planNum}}</em>
                  <em class="statusDanw">人</em>
                  <em style="display: inline-block;vertical-align: middle;font-size: 0.24rem;color: #02c9fc;margin-left: 10px;">
                    ({{dayOrNightStatus.substring(0,1)}})
                  </em>
                </div>
              </li>
              <li>
                <p class="statusTitle">考勤人数</p>
                <div class="statusDiv">
                  <em class="statusCount" v-show="info&&info.userRecordNum" v-text="info.userRecordNum"></em>
                  <em class="statusCount" v-show="!info || !info.userRecordNum">0</em>
                  <em class="statusDanw">人</em>
                </div>
              </li>
              <li>
                <p class="statusTitle">有效在岗人数</p>
                <div class="statusDiv">
                  <em class="statusCount" v-show="info&&info.validNum" v-text="info.validNum"></em>
                  <em class="statusCount" v-show="!info || !info.validNum">0</em>
                  <em class="statusDanw">人</em>
                </div>
              </li>
              <li>
                <p class="statusTitle">迟到</p>
                <div class="statusDiv">
                  <em class="statusCount chidao" v-if="info && info.lateNum" v-text="info.lateNum"></em>
                  <em class="statusCount" v-else>0</em>
                  <em class="statusDanw">人</em>
                </div>
              </li>
              <li>
                <p class="statusTitle">离岗</p>
                <div class="statusDiv">
                  <em class="statusCount chidao" v-if="info && info.outNum" v-text="info.outNum"></em>
                  <em class="statusCount" v-else>0</em>
                  <em class="statusDanw">人</em>
                </div>
              </li>
              <li>
                <p class="statusTitle">未到</p>
                <div class="statusDiv">
                  <em class="statusCount kuanggong" v-if="info && info.absentNum" v-text="info.absentNum"></em>
                  <em class="statusCount" v-else>0</em>
                  <em class="statusDanw">人</em>
                </div>
              </li>
              <li>
                <p class="statusTitle">未派工</p>
                <div class="statusDiv">
                  <em class="statusCount tiaoban" v-if="info && info.abnormalNum" v-text="info.abnormalNum"></em>
                  <em class="statusCount" v-else>0</em>
                  <em class="statusDanw">人</em>
                </div>
              </li>


            </ul>
          </div>
        </div>
        <!--左中-->
        <div class="leftCenterEcharts">
          <ul class="statusListBottom">
            <li>
              <p class="statusNum">派工率</p>
              <div class="open lv echartsImg" id="jhkqlv"></div>
            </li>
            <li>
              <p class="statusNum">出勤率</p>
              <div class="lv echartsImg start" id="kaoqinlv"></div>
            </li>
            <li>
              <p class="statusNum">在岗率</p>
              <div class="lv echartsImg problem" id="zaiganglv"></div>
            </li>
            <li>
              <p class="statusNum">有效上岗率</p>
              <div class="lv echartsImg totalE" id="yxsglv"></div>
            </li>
            <li>
              <p class="statusNum">总工时</p>
              <div class="echartsImg runHourNum">
                <div>
                  <p class="numPoint" v-show="info&&info.recordTime" style="letter-spacing:-1px;">{{Math.round(info.recordTime*100)/100}}</p>
                  <p class="numPoint" v-show="!info || !info.recordTime">0</p>
                  <em>单位:h</em>
                </div>
              </div>
            </li>

          <!--  <li>
              <p class="statusNum">有效在岗时间</p>
              <div class="echartsImg runLV" id="runLV">
                <div>
                  <p class="numPoint" v-show="info&&info.onWorkTime" style="letter-spacing:-1px;">{{Math.round(info.onWorkTime*100)/100}}</p>
                  <p class="numPoint" v-show="!info || !info.onWorkTime">0</p>
                  <em>单位:h</em>
                </div>
              </div>
            </li>-->


          </ul>
        </div>
        <!--左下-->
        <div class="leftBottomList">
          <div :class="{'checkingJt_con-bottom': true,'is-fullscreen':allScreen}">
            <div @click="allScreenLook" style="position:absolute;top:10px;right:20px;cursor: pointer;z-index: 20;">
              <el-button type="primary" size="mini">{{screenMessage}}</el-button>
            </div>
            <el-tabs class="checking_tabs" v-model="currentTab" @tab-click="handleCheckingTab">
              <el-tab-pane label="人员雷达图" name="leida">
                <el-scrollbar class="checking_job-allCenter" style="height:100%;" >

                  <div class="checking_item" :class="{bgGary:item.totalnum===undefined}" v-for="(item, index) in redarList" :key="index"  v-show="item.companyName!=='总部'">
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
                          <li v-show="item.recordtime!==undefined"><span>考勤时间</span><em style="letter-spacing: -1px" v-show="item.recordtime!==undefined">{{Math.round(item.recordtime*100)/100}}h</em></li>
                          <li v-show="item.recordtime ===undefined"><span>考勤时间</span><em style="letter-spacing: -1px" v-show="item.recordtime===undefined"></em></li>
                          <li v-show="item.onworktime!==undefined"><span>有效在岗时间</span><em style="letter-spacing: -1px" v-show="item.onworktime!==undefined">{{Math.round(item.onworktime*100)/100}}h</em></li>
                          <li v-show="item.onworktime===undefined"><span>有效在岗时间</span><em style="letter-spacing: -1px" v-show="item.onworktime===undefined"></em></li>
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
                        <li v-for="item in kaoqinList.lateList" :key="item.id" v-show="item.companyName!=='总部'">
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
                        <li v-for="item in kaoqinList.leaveList" :key="item.id" v-show="item.companyName!=='总部'">
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
                        <li v-for="item in kaoqinList.absentList" :key="item.id" v-show="item.companyName!=='总部'">
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
                        <li v-for="item in kaoqinList.abnormalList" :key="item.id" v-show="item.companyName!=='总部'">
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
      <!--右侧-->
      <div class="checkingJt_right">
        <div class="common-item">
          <p class="home_title">人员考勤日统计<em style="margin-left:4px;">(集团)</em></p>
          <div class="statistics-day" id="checkingJt-statistics-day"></div>
        </div>
          <div class="common-item">
            <p class="home_title">人员考勤月统计<em style="margin-left:4px;">(集团)</em></p>
            <div class="abnormalStatistics-month" id="checkingJt-statistics-month"></div>
          </div>
          <div class="common-item">
            <p class="home_title">人员考勤年统计<em style="margin-left:4px;">(集团)</em></p>
            <div class="statistics-month" id="checkingJt-statistics-year"></div>
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
  getRecordDataOfMonth,getRecordDataOfYear,
  getAbnormaData,
  getRecordRadarChartData,
  getOrgIPAddressData,
  getAllCountData,
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
      userCount:0,//20190528计件总人数
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
      abnormalMonthData: {}, // 左侧月数据
      abnormalYearData: {}, // 左侧年数据
      monthEchartsDom: '', // 左侧月统计
      dayEchartsData: {},// 右侧日echarts图,
      currentTab: 'leida', // 中间底部选中的tab项
      leidaData: [],
      leidaDataNew: [ // 20190524处理数据=固定写23个===================>
        {companyCode: "0304", companyName: "临港中挖"},{companyCode: "0307", companyName: "重机小挖"},
        {companyCode: "0203", companyName: "娄底中兴"},{companyCode: "0305", companyName: "重机大挖"},
        {companyCode: "0205", companyName: "常德路机"},{companyCode: "0502", companyName: "宁乡起重机"},
        {companyCode: "0306", companyName: "常熟索特"},{companyCode: "0201", companyName: "长沙泵送"},
        {companyCode: "0204", companyName: "益阳中阳"},{companyCode: "0308", companyName: "重机华湘"},
        {companyCode: "0401", companyName: "长沙港机"},{companyCode: "0303", companyName: "北京桩机"},
        {companyCode: "0702", companyName: "三一叶片"},{companyCode: "0202", companyName: "娄底中源"},
        {companyCode: "0101", companyName: "三一重卡"},{companyCode: "0801", companyName: "快而居"},
        {companyCode: "0402", companyName: "珠海港机"},{companyCode: "0206", companyName: "邵阳湖汽"},
        {companyCode: "0501", companyName: "湖州装备"},{companyCode: "0703", companyName: "三一电机"},
        {companyCode: "0701", companyName: "三一重能"},{companyCode: "0302", companyName: "杭州力龙"},
        {companyCode: "0601", companyName: "沈阳重装"},{companyCode: "0207", companyName: "三一西北"},  //20190603:三一西北,三一动力
        {companyCode: "0208", companyName: "三一动力"},
      ],
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
    // 顶部日期时间
    this.currentTime = this.getCurrentDateTime() // 显示顶部时间
    this.getDayOrNightTextFun() // 显示顶部显示白夜班
    this.timerId = setInterval(() => {
      this.currentTime = this.getCurrentDateTime() // 显示顶部时间
      this.getDayOrNightTextFun() // 显示顶部显示白夜班
    }, 1000)
    //20190528计件总人数
    this.getAllCountUserFun()
    // 顶部 === 考勤基本数据
    this.getTotalRecordDataFun()
    // 左侧 === 人员考勤月统计
    this.getRecordDataOfMonthFun()
    this.getRecordDataOfYearFun()
    this.abnormalMonthEchartsDom = echarts.init(document.getElementById('checkingJt-statistics-month')) //月echarts dom
    this.EchartsArr.push(this.abnormalMonthEchartsDom) // 放入echarts数组，resize时有用
    // 左侧 === 人员考勤年统计
    this.monthEchartsDom = echarts.init(document.getElementById('checkingJt-statistics-year')) //月echarts dom
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
    // 定时器刷新0425改5分钟刷新一次
    this.refreshDataId = setInterval(() => {
      this.getTotalRecordDataFun()
      this.getRecordDataOfMonthFun()
      this.getRecordDataOfYearFun()
      this.getRecordDataOfDayFun()
      this.getRecordRadarChartDataFun()
    }, 300000)

  },
  computed: {},
  watch: {
    info(val) {
      // 如果有基本信息，渲染中间顶部的4个echarts图
      if (val) {
        this.renderEchartsCircle()
      }
    },
    // 人员考勤月统计 ======右侧
    abnormalMonthData (val) {
      if (val) {
        this.renderEchartsAbnormalMonth(this.abnormalMonthEchartsDom, val) // 人员考勤月统计echarts图
        // this.renderEchartsYear(this.monthEchartsDom, val) // 渲染echarts图
      }
    },
    // 人员考勤年统计 ======右侧
    abnormalYearData (val) {
      if (val) {
        this.renderEchartsYear(this.monthEchartsDom, val) // 渲染echarts图
      }
    },
    // 人员考勤日统计数据 ======右侧
    dayEchartsData (val) {
      console.log('val:',val)
      if (val) {
        this.renderDayEcharts(this.dayEchartsDom, val) // 渲染echarts图
      }
    },
    // 雷达图数据
    leidaData(val) {
      if (val.length) {
        // this.getRecordRadarChartFun(this.leidaData)    //20190524
        this.getRecordRadarChartFun(this.leidaDataNew)
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
        name: '派工率',
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
        name: '出勤率',
        // color: '#ff8f19',
        color: {
          startColor: '#2FC343',
          endColor: '#36ECFA'
        },
        value: this.info.recordRate
      }
      this.renderClock(kaoqinlvEcharts, this.recordRateObj)

      // 在岗率 zaiganglv
      var zaiganglvEcharts = document.getElementById('zaiganglv')
      this.workPlanRateObj = {
        name: '在岗率',
        // color: '#0097ff',
        color: {
          startColor: '#ff7905',
          endColor: '#ffbf46'
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

          startColor: '#0090ff',
          endColor: '#00e2ff'
        },
        value: this.info.validRate
      }
      this.renderClock(yxsglvEcharts, this.validRateObj)
    },

    // 获取右侧日 统计数据
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
            barWidth: 6,  // 控制柱子的宽度
            barGap: '20%'  // 控制柱子的间隔
          },
					{
						name: '迟到',
						type: 'bar',
						stack:'异常人数',
						radius: '10%',
						data: data.lateNumArr,
						itemStyle: {
							normal: {
								color:'#FF5B86'
							}
						},
						barWidth: 6,  // 控制柱子的宽度
						barGap: '20%'  // 控制柱子的间隔
					},
					{
						name: '离岗',
						type: 'bar',
						stack:'异常人数',
						radius: '10%',
						data: data.leaveNumArr,
						itemStyle: {
							normal: {
								color:'#f0f058'
							}
						},
						barWidth: 6,  // 控制柱子的宽度
						barGap: '20%'  // 控制柱子的间隔
					},
					{
						name: '未到',
						type: 'bar',
						stack:'异常人数',
						radius: '10%',
						data: data.absentNumArr,
						itemStyle: {
							normal: {
								color:'#00ff00'
							}
						},
						barWidth: 6,  // 控制柱子的宽度
						barGap: '20%'  // 控制柱子的间隔
					},
					{
						name: '未派工',
						type: 'bar',
						stack:'异常人数',
						radius: '10%',
						data: data.abnormalNumArr,
						itemStyle: {
							normal: {
								color:'#aa11bb'
							}
						},
						barWidth: 6,  // 控制柱子的宽度
						barGap: '20%'  // 控制柱子的间隔
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
            barWidth: 6,  // 控制柱子的宽度
            barGap: '20%'  // 控制柱子的间隔
          }
        ]
      }
      myChart.setOption(option, true)
    },

    // 获取右侧月 统计数据
    async getRecordDataOfMonthFun () {
      const res = await getRecordDataOfMonth('','')
      if (res.data && res.data.code === 200) {
        this.abnormalMonthData = res.data.data
      }
    },
    // 获取右侧年 统计数据20190524
    async getRecordDataOfYearFun () {
      const res = await getRecordDataOfYear('','')
      if (res.data && res.data.code === 200) {
        this.abnormalYearData = res.data.data
      }
    },

    // 右侧人员考勤月统计
    /**
     * 参数：(myChart, data) 参数一：echarts的dom，参数二：数据
     * 描述：人员考勤异常月统计echart图标渲染
     */
    renderEchartsAbnormalMonth (myChart, data) {
      var option = {
        legend: {
          data: ['考勤人数','迟到', '离岗', '未到','未派工','出勤率'],
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
            name:'考勤人数',
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
            data: data.userRecordNumArr,
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
            barWidth: 3, // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          },
          {
            name: '迟到',
            type: 'bar',
            stack:'异常人数',
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
            barWidth: 3, // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          },
          {
            name: '离岗',
            type: 'bar',
            stack:'异常人数',
            data: data.leaveNumArr,
            itemStyle: {
              normal: {
                color:'#f0f058',
                // barBorderRadius: 2
              }
            },
            barWidth: 3,  // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          },
          {
            name: '未到',
            type: 'bar',
            stack:'异常人数',
            data: data.absenNumArr,
            itemStyle: {
              normal: {
                color:'#00ff00',
                // barBorderRadius: 2
              }
            },
            barWidth: 3,  // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          },
          {
            name: '未派工',
            type: 'bar',
            stack:'异常人数',
            data: data.abnormalNumArr,
            itemStyle: {
              normal: {
                color:'#aa11bb',
                // barBorderRadius: 2
              }
            },
            barWidth: 3,  // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          },
          {
            name: '出勤率',
            yAxisIndex: 1,
            type: 'bar',
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
                ),
                // barBorderRadius: 2
              }
            },
            barWidth: 3, // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          },
        ]
      }
      myChart.setOption(option)
    },
    /**
     * 方法名：renderEcharts年
     * 参数：(myChart, data) 参数一：echarts的dom，参数二：数据
     * 描述：人员考勤日/月/年统计echart图表渲染
     */
    renderEchartsYear(myChart, data){
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
            barWidth: 6,  // 控制柱子的宽度
            barGap: '20%'  // 控制柱子的间隔
          },
					{
						name: '迟到',
						stack:'异常人数',
						type: 'bar',
						radius: '10%',
						data: data.lateArr,
						itemStyle: {
							normal: {
								color:'#FF5B86'
							}
						},
						barWidth: 6,  // 控制柱子的宽度
						barGap: '20%'  // 控制柱子的间隔
					},
					{
						name: '离岗',
						stack:'异常人数',
						type: 'bar',
						radius: '10%',
						data: data.leaveNumArr,
						itemStyle: {
							normal: {
								color:'#f0f058'
							}
						},
						barWidth: 6,  // 控制柱子的宽度
						barGap: '20%'  // 控制柱子的间隔
					},
					{
						name: '未到',
						stack:'异常人数',
						type: 'bar',
						radius: '10%',
						data: data.absenNumArr,
						itemStyle: {
							normal: {
								color:'#00ff00'
							}
						},
						barWidth: 6,  // 控制柱子的宽度
						barGap: '20%'  // 控制柱子的间隔
					},
					{
						name: '未派工',
						stack:'异常人数',
						type: 'bar',
						radius: '10%',
						data: data.abnormalNumArr,
						itemStyle: {
							normal: {
								color:'#aa11bb'
							}
						},
						barWidth: 6,  // 控制柱子的宽度
						barGap: '20%'  // 控制柱子的间隔
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
            barWidth: 6,  // 控制柱子的宽度
            barGap: '20%'  // 控制柱子的间隔
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
        // console.log('this.leidaData:',this.leidaData)
        //20190524处理返回数据，若没有值就返回灰色状态
        for (var i = 0; i < this.leidaDataNew.length; i++) {
          for (var j = 0; j <  this.leidaData.length; j++) {
            if(this.leidaDataNew[i].companyCode === this.leidaData[j].companyCode){
              this.leidaDataNew[i] = this.leidaData[j]
            }
          }
        }
      }
      console.log('this.leidaDataNew:',this.leidaDataNew)
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
          if(ele.latenum=== undefined){
            let yichangNum = parseFloat(ele.latenum)+parseFloat(ele.absentnum)+parseFloat(ele.outnum)+parseFloat(ele.abnormalnum)
            let zhengchangNum = parseFloat(ele.totalnum)-parseFloat(ele.latenum)-parseFloat(ele.absentnum)-parseFloat(ele.outnum)-parseFloat(ele.abnormalnum)
            let yichangLv = ((zhengchangNum/parseFloat(ele.totalnum))*100).toFixed(2) // 异常率
            let paigongLv =0
            let shanggangLv = 0
            let zaigangLv = 0
            let chuqinLv = 0
            let totalLv = parseFloat(paigongLv)*0.15 + parseFloat(shanggangLv)*0.25 + parseFloat(zaigangLv)*0.35 + parseFloat(chuqinLv)*0.15 //20190507
            ele.totalLv = totalLv
            newMyArr.push(ele)
          }else{
            let yichangNum = parseFloat(ele.latenum)+parseFloat(ele.absentnum)+parseFloat(ele.outnum)+parseFloat(ele.abnormalnum)
            let zhengchangNum = parseFloat(ele.totalnum)-parseFloat(ele.latenum)-parseFloat(ele.absentnum)-parseFloat(ele.outnum)-parseFloat(ele.abnormalnum)
            let yichangLv = ((zhengchangNum/parseFloat(ele.totalnum))*100).toFixed(2) // 异常率
            let paigongLv = ele.newworkplanrate<=100?ele.newworkplanrate:100 // 派工率
            let shanggangLv = ele.validrate<=100?ele.validrate:100 // 上岗率
            let zaigangLv = ele.onworkrate<=100?ele.onworkrate:100 // 在岗率
            let chuqinLv = ele.recordrate<=100?ele.recordrate:100 // 出勤率
            // let totalLv = parseFloat(yichangLv) + parseFloat(paigongLv) + parseFloat(shanggangLv) + parseFloat(zaigangLv) + parseFloat(chuqinLv)
            //20190507 加权重计算 派工率：0.15  出勤率：0.25  在岗率：0.35   上岗率： 0.25
            let totalLv = parseFloat(paigongLv)*0.15 + parseFloat(shanggangLv)*0.25 + parseFloat(zaigangLv)*0.35 + parseFloat(chuqinLv)*0.15 //20190507
            ele.totalLv = totalLv
            newMyArr.push(ele)
            // console.log('centername:',ele.centerName)
            // console.log('yichangNum:',yichangNum)
          }
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
        this.$router.push('/CheckingV8')
        // this.$router.go(-1)
        // this.$router.replace('/Checking')
      }
    },
    //20190528计件总人数
    async getAllCountUserFun(){
      const res = await getAllCountData()
      if(!res&&!res.data)return
      this.userCount = res.data.data.userCount
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
.checkingJt{
  font-size: 12px;
  height:100%;
  background-image: url(../../assets/images/index_bg0522.png);
  background-size: 100% 100%;
  color: rgb(255, 255, 255);
  background-repeat: no-repeat;overflow: hidden;
  &_top{
    position: fixed;top:0;left:15px;right:15px;box-sizing: border-box;
    height: 80px;  //20190522
    overflow: hidden;
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
          font-size: 28px;
          color: #ababab;
          vertical-align: middle;
          margin-left: -5px;
        }
      }
    }
    .title {
      width: 40%;float: left;
      /*line-height:1.06rem;*///20190522
      text-align: center;
      font-size: 0.32rem;//20190522
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
    position: fixed;top:72px;left:15px;right:15px;bottom:15px;
  }
  &_left{
    width: 73.5%;float: left;height:100%;
    // border:1px solid #ff0;
    padding: 15px;
    background-color: rgba(39,69,111,0.3);border:1px solid rgba(255,255,255,0.1);
    margin-right: 15px;

    .leftTopPersonNum{
      .leftWarp{
        display: flex;
        .titleText1{
          font-size: 0.20rem;
          color: #fff;
          padding-left: 20px;
          .titleTotalNum{
            color: #01cbff;
            font-size: 0.30rem;
            vertical-align: middle;
            em{
              font-size: 0.19rem;
              color: #30adff;
              vertical-align: bottom;
            }
          }
        }
        .titleText2{
          color: #CDCDCD;
          .titleTotalNum{
            color: #CDCDCD;
            em{
              color: #CDCDCD;
            }
          }
        }
      }
      .statusList {
        /*height: calc(100% - 0.35rem);*/
        height: 103px;
        display: flex;
        flex-direction: column;
        .statusListTop {
          flex: 1;
          display: flex;
          align-items: center;
          background: url("../../assets/images/title-bg.png") no-repeat;
          background-size: 100% 100%;
          margin-bottom: 10px;
          padding-left: 20px;
          li {
            flex: 1;
            text-align: center;
            .statusTitle {
              font-size: 0.18rem;
              color: #d5d5d5;
              margin-top: 5px;
            }
            .statusDiv {
              margin-bottom: 5px;
              .dayNightNumBox{
                line-height: 20px;
                font-size: 0.15rem;
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
            .statusCount {
              font-size: 0.32rem;
              color: #30adff;
              vertical-align: bottom;
            }
            .statusDanw {
              font-size: 0.19rem;
              color: #30adff;
              vertical-align: bottom;
            }
          }
          li:first-child{
            flex: 1.5;
          }
          li:nth-child(2){
            flex: 1.2;
          }
        }
      }
    }
    .leftCenterEcharts{
      height: 170px;
      display: flex;flex-direction: column;
      .statusListBottom{
        display: flex;
        li{
          flex: 1;text-align: center;margin-right: 0.1rem;
          padding: 0.1rem;
          background: rgba(42,75,133,0.3);
          .statusNum{
            font-size: 0.24rem;color:#d5d5d5;
          }
          .echartsImg{
            /*width: 178px;*/
            height: 110px;
            margin: 0.1rem;
            display: flex;justify-content: center;align-items: center;
            div{
              width: 1.61rem!important;
              /*height: 1.1rem !important;*/
              margin-top: 10%;
              color: #02c9fc;
              .numPoint{
                color: #02c9fc;font-size: 0.24rem;
              }

            }
          }
          .open{
            background: url("../../assets/images/youxiaolv.png") no-repeat center;
            background-size: 55% 100%;
          }
          .runHourNum{
            background: url("../../assets/images/zaixianshu.png") no-repeat center;
            background-size: 55% 100%;
          }
          .start{
            background: url("../../assets/images/index_clock-green.png") no-repeat center;
            background-size: 55% 100%;
          }
          .runLV{
            background: url("../../assets/images/lixianshu.png") no-repeat center;
            background-size: 55% 100%;
          }
          .problem{
            background: url("../../assets/images/lixianlv.png") no-repeat center;
            background-size: 55% 100%;
          }
          .totalE{
            background: url("../../assets/images/youxiaolv.png") no-repeat center;
            background-size: 55% 100%;
          }
        }
        li:nth-last-child(1){
          margin-right: 0;
        }
      }
    }
    .leftBottomList{
       width: 100%; height: 100%;position: relative;
      .checkingJt_con-bottom{
        background-color: rgba(39, 69, 111, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        height: calc(100% - 315px);
        margin-top: 15px;
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
          .bgGary{
            /*background: gray!important;*/
            .checking_item-title{
              background: gray!important;
              .title{
                color:#fff!important;
              }
            }
            .radarChartBox{
              background:  rgba(128, 128, 133, 0.5);
          }
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
              overflow-x: hidden;
              margin-right: -18px !important;
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
                  width: 82px;display: inline-block;vertical-align:middle;text-align: right;
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
  }
  &_right{
    width: 25%;height:100%;display:flex;flex-direction: column;
    padding: 15px;
    background-color: rgba(39,69,111,0.3);border:1px solid rgba(255,255,255,0.1);
    .common-item{
      flex:1;
      .home_title{width:100%;font-size: 0.22remma}
      .statistics-day{
        width:100%;height: calc(100% - 36px);
      }
      .abnormalStatistics-month{
        width:100%;height: calc(100% - 36px);
      }
      .statistics-month{
        width:100%;height: calc(100% - 36px);
      }
    }
  }

// 全屏样式
  .is-fullscreen{
    position: fixed;top:0;left:0;bottom:0;right:0;z-index:10;
    width: 100%;
    height: 100% !important;background: #071226!important;
margin-top: 0!important;
    .checking_job-allCenter .checking_item{
      width: 25%
    }
  }
}

</style>
