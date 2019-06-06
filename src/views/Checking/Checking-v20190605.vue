<template>
  <div class="index">
    <!-- 头部 start -->
    <div class="index_top">
      <div class="title"><span @click="showSelectDialog">{{this.$store.state.selectedSubcompany}}考勤数据</span></div>
      <!-- <div class="title"><span @click="showSelectDialog">{{`${this.companyValue}三现数据中心`}}</span></div> -->

      <div class="leftInfo">
        <!-- <div class="back" @click="window.history.go(1)"><img src="../../assets/images/index_back.png"></div> -->
        <div class="back" @click="$router.back()"><img src="../../assets/images/index_back.png"></div>
        <!-- <div class="back" @click="enterIndexPage('/CheckingJt')"><img src="../../assets/images/index_back.png"></div> -->
        <div class="dayOrnight">
          <img v-show="dayOrNightStatus ==='白班'" src="../../assets/images/index_sun.png" />
          <img v-show="dayOrNightStatus ==='夜班'" src="../../assets/images/index_moon.png" />
          <span v-text="dayOrNightStatus">白班</span>
        </div>
        <div class="historyBtn" @click="enterCheckHistory">历史记录</div>
      </div>
      <em class="time" v-text="currentTime"></em>
    </div>
    <!-- 头部下拉 start -->
    <HeaderToSelected :selectDialogShow="selectDialogShow" @selectDialogShowName="selectDialogFunction"/>
    <!-- main start -->
    <div class="index_main">
      <!--20190517样式-->
      <div class="index_left">
        <!--左上-->
        <CheckingLeftTopNum :info="baseInfo" :isDayOrNigint="dayOrNightStatus"/>
        <!--左中-->
        <CheckingLeftCenterEcharts :info="baseInfo" />
        <!--左下-->
        <div class="leftBottomList">
          <Checking :info="baseInfo" :isDayOrNigint="dayOrNightStatus" :kaoqinList="kaoqinList" :kaoqinListSubCenter="kaoqinListSubCenter"/>
        </div>
      </div>
      <div class="index_right">
        <attendance
        v-if="this.$store.state.selectedTabCheckingBetween!='energy'"
        :dayInfo="dayEchartsDataRight" :monthInfo="monthEchartsDataRight" :yearInfo="yearEchartsDataRight" :yearData="yearDataLeft" />
        <EnergyStatistics
        v-if="this.$store.state.selectedTabCheckingBetween=='energy'" />
      </div>


    </div>
    <!-- 加工中心 start -->
    <MachingCenter :allCenterList="allCenterList" @selectName="selectedCenterName" />

  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import http from '../../api/http'
import Attendance from '@/components/checking-v20190605/Attendance'    // 日月年echarts
import EnergyStatistics from '@/components/checking-v20190605/EnergyStatistics'  // 能源指标列表echarts
import Checking from '@/components/checking-v20190605/Checking20190605.vue'
import MachingCenter from '@/components/checking-v20190605/MachingCenter'
import HeaderToSelected from '@/components/checking-v20190605/HeaderToSelected'    //头部下拉选项
import CheckingLeftTopNum from '../../components/checking-v20190605/CheckingLeftTopNum' //20190517 左上考勤人数
import CheckingLeftCenterEcharts from '../../components/checking-v20190605/CheckingLeftCenterEcharts' //20190517左中考勤echarts图表

import {
  getAttendanceData,
  getLateEchartsOfYear,
  getWorkEchartsOfDay,
  getWorkEchartsOfMonth,
  queryYear,
  getCenternameList,
  getAbnormaDataObj,
  getAbsentList1,getAbsentList0417,
  getLateList,getLateList0417,
  getChangeWorkList,getChangeWorkList0417,
  getOutList
} from '../../api/checkingApi'
export default {
  name: 'Checking-v20190221',
  components: {
    Attendance,
    EnergyStatistics,
    Checking,
    MachingCenter,
    HeaderToSelected,
    CheckingLeftTopNum,
    CheckingLeftCenterEcharts
  },
  data () {
    return {
      timerId: '', // 系统时间定时器
      refreshDataId: '', // 页面数据10秒定时器
      currentTime: '', // 系统当前时间
      allCenterList: [], // 所有加工中心列表
      dayOrNightStatus: '', // 白班或夜班
      baseInfo: { // 基本信息
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
        validRate: 0 ,// 有效上岗率
        workType:1,//20190410新增加接口需要传递白夜班
      },
      monthDataLeft: {}, // 左侧异常月数据
      yearDataLeft: {}, // 左侧异常年数据
      dayEchartsDataRight: { // 右侧日echarts图
        totalNum: 0
      },
      monthEchartsDataRight: { // 右侧月echarts图
        totalNum: 0
      },
      yearEchartsDataRight: { // 右侧年echarts图
        totalNum: 0
      },
      selectDialogShow: false, // 是否显示顶部事业部子公司弹窗
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
      refreshDataId2: null
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

    this.$store.commit('changeCenterNameMut','') // 加工中心为''

    let subompanyName = localStorage.getItem('companyNameCheckingSelectedSubcompany')
    axios.defaults.baseURL = localStorage.getItem('ipAddrCheckingSelectedSubcompany')
    // if(subompanyName){
    //   subompanyName = localStorage.setItem('companyNameCheckingSelectedSubcompany')
    // }
    this.$store.commit('changeSubcompanyMut',subompanyName)

    this.$store.commit('changeSelectTabCheckingBetweenMut','kaoqin') // 中间选中的tab设置为考勤列表

    // 基本信息顶部
    this.getBaseInfoData()

    // 左侧异常年
    this.getYearLeftData()

    // 右侧日/月/年统计/左侧异常月(数据在右侧月统计里面)
    this.getDayRightData()
    this.getMonthRightData()
    this.getYearRightData()

    // 获取所有加工中心数据
    this.getCenterNameData()

    // 定时器刷新
    this.refreshDataId = setInterval(() => {
      this.getBaseInfoData()
      this.getYearLeftData()
      this.getDayRightData()
      this.getMonthRightData()
      this.getYearRightData()
      this.$store.dispatch('getRadarChartsAction',{
       end: this.$store.state.allCenterList.length
      });
    }, 10000)
    this.refreshDataId2 = setInterval(() => {
				window.location.reload();
		},1000*3600)
  },
  computed: {
    currentTab (){
      return this.$store.state.selectedTabCheckingBetween
    }
  },
  watch: {
    // 解决点击能源进入更多页面然后回退时右侧没有内容bug
    currentTab(val){
      if (val!=='energy'){
        this.getDayRightData()
        this.getMonthRightData()
        this.getYearRightData()
      }
    }
  },
  methods: {
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
    // 基本信息顶部
    async getBaseInfoData () {
      // const res = await getAttendanceData(this.$store.state.centername)
      // const res = await http.post('http://10.88.195.89:8083/sanyAttendanceData/getAttendanceData', { centername: this.$store.state.centername })
      const res = await getAttendanceData(this.$store.state.centername)
      // const res = await http.post('http://10.19.7.70:8089/sanyAttendanceData/getAttendanceData', { centername: this.$store.state.centername })
      if (res.data && res.data.ret === '200' && res.data.titledata) {
        this.baseInfo = res.data.titledata
      } else {
        this.baseInfo = {
          lateNum: 0, // 迟到
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
          validRate: 0
        }
      }
    },
    // 左侧==异常年
    async getYearLeftData () {
      const res = await getLateEchartsOfYear(this.$store.state.centername)
      if (res.data && res.data.ret === '200') {
        this.yearDataLeft = res.data
      }
    },
    // 右侧==人员考勤日统计
    async getDayRightData () {
      const res = await getWorkEchartsOfDay(this.$store.state.centername)
      if (res && res.data && res.data.ret === '200') {
        this.dayEchartsDataRight = res.data
        if (this.baseInfo && this.baseInfo.totalNum) {
        this.dayEchartsDataRight.totalNum = this.baseInfo.totalNum
        }
      } else {
        this.dayEchartsDataRight.practical = [null,null,null,null,null,null,null,null,null,null,null,null]
        this.dayEchartsDataRight.practicalVal = [null,null,null,null,null,null,null,null,null,null,null,null]
	      this.dayEchartsDataRight.missRecordNum=[null,null,null,null,null,null,null,null,null,null,null,null]
		    this.dayEchartsDataRight.missRecordVal=[null,null,null,null,null,null,null,null,null,null,null,null]
        this.dayEchartsDataRight.ret = 200
        this.dayEchartsDataRight.xAxis = [null,null,null,null,null,null,null,null,null,null,null,null]
      }
    },
    // 右侧==人员考勤月统计 和 左侧人员考勤异常月统计
    async getMonthRightData () {
      const res = await getWorkEchartsOfMonth(this.$store.state.centername)
      if (res.data && res.data.ret === '200') {
        this.monthEchartsDataRight = res.data
        if (this.baseInfo && this.baseInfo.totalNum) {
        this.monthEchartsDataRight.totalNum = this.baseInfo.totalNum
        }
        // 左侧人员考勤异常月统计
        this.monthDataLeft = res.data
      }
    },
    // 右侧==人员考勤年统计
    async getYearRightData () {
      const res = await queryYear(this.$store.state.centername)
      if (res.data && res.data.ret === '200') {
        this.yearEchartsDataRight = res.data.data
        if (this.baseInfo && this.baseInfo.totalNum) {
        this.monthEchartsDataRight.totalNum = this.baseInfo.totalNum
        }
      }
    },
    // 右侧==获取所有的加工中心
    async getCenterNameData () {
      const res = await getCenternameList()
      if (res && res.data && res.data.ret === '200') {
        const {centernameList, ret} = res.data
        this.allCenterList = centernameList.map((ele) => {
          return ele.threeleveldep
        })
        this.$store.commit('changeAllCenterListMut', this.allCenterList)
        // 获取人员考勤列表
        this.getAbnormaData()
        if (this.$store.state.selectedTabCheckingBetween==='leida') {
          // this.$store.commit('changeSelectTabCheckingBetweenMut','kaoqin')
          // 雷达图
          this.$store.dispatch('getRadarChartsAction',{
            end: this.$store.state.allCenterList.length,
          });
        }
      }
    },
    // 中间==人员考勤列表==加工中心为总桩机时显示各个加工中心的数据
    async getAbnormaData () {
      const res = await getAbnormaDataObj(this.$store.state.allCenterList.length)
      // console.log('获取人员在岗列表：', res)
      if (res && res.data) {
        const {ret, data} = res.data
        if (res && ret === '200') {
          this.kaoqinList.lateList = data.lateList // 迟到
          this.kaoqinList.leaveList = data.leaveList //早退
          this.kaoqinList.absentList = data.absentList //旷工
          this.kaoqinList.abnormalList = data.abnormalList //未派工
        }
      }
    },
    // 中间==人员考勤列表==加工中心为子工作中心时（旷工、迟到、离岗、未派工）列表
    async getAbsentLateLeaveChangeworkList () {
      let centerNameFromCentername = this.$store.state.centername
      let currentTimeDate = this.currentTime.substring(0,10)
      if(this.dayOrNightStatus === '夜班'){
        this.workType = 2
      }else if(this.dayOrNightStatus === '白班'){
        this.workType = 1
      }
      console.log('this.dayOrNightStatus:',this.dayOrNightStatus)
      // 获取旷工
      // const resultAbsent = await http.post('http://10.88.195.89:8083/userRecordException/list',{workType: this.workType, queryDate: currentTimeDate,recordStatus:3,workName:'',workNo:'',centerName:centerNameFromCentername,page:1,pageSize:1000})
      const resultAbsent = await getAbsentList0417(this.workType,currentTimeDate,3,'','',centerNameFromCentername,1,1000)
      if (resultAbsent && resultAbsent.data.ret === '200') {
        // console.log('获取的旷工数据:', res)
        this.kaoqinListSubCenter.absentData = {
          absentList: resultAbsent.data.data.list,
          pagination: {
            total: resultAbsent.data.data.totalCount
          }
        }
      }
      // 获取迟到
      // const resultDispatchList = await http.post('http://10.88.195.89:8083/userRecordException/list',{workType: this.workType, queryDate: currentTimeDate,recordStatus:1,workName:'',workNo:'',centerName:centerNameFromCentername,page:1,pageSize:1000})
      const resultDispatchList = await getLateList0417(this.workType,currentTimeDate, 1, '','',centerNameFromCentername,1, 1000)
      if (resultDispatchList && resultDispatchList.data.ret === '200') {
        // console.log('获取的迟到数据:', resLateList) // workno
        this.kaoqinListSubCenter.lateData = {
          lateList: resultDispatchList.data.data.list,
          pagination: {
            total: resultDispatchList.data.data.totalCount
          }
        }
      }
      // 获取未派工
      // const resultShiftList = await http.post('http://10.88.195.89:8083/userRecordException/list',{workType: this.workType, queryDate: currentTimeDate,recordStatus:2,workName:'',workNo:'',centerName:centerNameFromCentername,page:1,pageSize:1000})
      const resultShiftList = await getChangeWorkList0417(this.workType,currentTimeDate, 2,'','',centerNameFromCentername, 1, 1000)
      if (resultShiftList && resultShiftList.data.ret === '200') {
        // console.log('获取的未派工即调班数据:', resChangeWorkList) // workno
        this.kaoqinListSubCenter.abnormalData = {
          abnormalList: resultShiftList.data.data.list,
          pagination: {
            total: resultShiftList.data.data.totalCount
          }
        }
      }
      // 获取离岗
      const resOutList = await getOutList({
          centerName: centerNameFromCentername,
          page: 1,
          pagesize: 1000
      })
      if (resOutList && resOutList.data.ret === '200') {
        // console.log('获取的离岗数据:', resOutList) // workno
        this.kaoqinListSubCenter.leaveData = {
          leaveList: resOutList.data.data.list,
          pagination: {
            total: resOutList.data.data.totalCount
          }
        }
      }


    },
    // 点击加工中心重新请求数据
    selectedCenterName (centername) {
      this.$store.commit('changeCenterNameMut',centername) // 改变加工中心
      // 重新加载数据
      this.getBaseInfoData()
      this.getYearLeftData()
      this.getDayRightData()
      this.getMonthRightData()
      this.getYearRightData()

      // 切换人员考勤列表
      if (this.$store.state.selectedTabCheckingBetween=='kaoqin' && this.$store.state.centername!=='') { // 子加工中心
        // 获取(旷工/迟到/离岗/未派工)数据
        this.getAbsentLateLeaveChangeworkList()
      } else if(this.$store.state.selectedTabCheckingBetween=='kaoqin' && this.$store.state.centername==='') { // 全部
        this.getAbnormaData()
      }

      // 切换雷达图的数据
      if (this.$store.state.selectedTabCheckingBetween=='leida' && this.$store.state.centername!==''){
        this.$store.commit('changeSelectTabCheckingBetweenMut','kaoqin') // 中间选中的tab设置为考勤列表
      }

      // 切换能源指标的数据
      if (this.$store.state.selectedTabCheckingBetween=='energy') {
        // 请求能源指标列表数据
        if (this.$store.state.centername === '') { // 如果是全部
          this.$store.dispatch('getEnergyListDataAction',{
            centerName: this.$store.state.centername,
            pageSize: this.$store.state.allCenterList.length
          })
        } else {
          this.$store.dispatch('getEnergyListDataAction',{
            centerName: this.$store.state.centername,
            page: 1,
            pageSize: 15
          })
        }
        // 请求能源指标echarts图数据
        this.$store.dispatch('getEnergyDayDataAction', {
          centerName: this.$store.state.centername,
          queryFlag: 'day'
        })
        this.$store.dispatch('getEnergyMonthDataAction', {
          centerName: this.$store.state.centername,
          queryFlag: 'month'
        })
        this.$store.dispatch('getEnergyYearDataAction', {
          centerName: this.$store.state.centername,
          queryFlag: 'year'
        })
      }
    },
    // 顶部选择事业部弹窗显示
    showSelectDialog () {
      this.selectDialogShow = true
    },
    // 回到历史页面
    enterCheckHistory () {
      this.$router.replace('/CheckingHistoryData20190605')
    },
    //20190514分离headerToSelected
    selectDialogFunction(val){
      this.selectDialogShow = val.flag
      if(val.loadingData){
        this.getBaseInfoData() // 基本数据
        this.getYearLeftData()
        this.getDayRightData()
        this.getMonthRightData()
        this.getYearRightData()
        this.getCenterNameData() // 加工中心数组
      }
    },
  },
  destroyed () {
    clearInterval(this.timerId)
    clearInterval(this.refreshDataId)
    clearInterval(this.refreshDataId2)
  }
}
</script>
<style lang="scss" scoped>
.index{
  height:100%;
  background-image: url(../../assets/images/index_bg0522.png);
  background-size: 100% 100%;
  color: rgb(255, 255, 255);
  background-repeat: no-repeat;overflow: hidden;
  &_top{
    position: fixed;top:0;left:15px;right:15px;box-sizing: border-box;
    height: 80px;line-height:85px;text-align: center;
    .title {
      font-size: 0.32rem;
      color:#fff;font-weight:bold;
      span{cursor: pointer; margin-top: -20px;display: inherit;}
    }
    .time{
      width:250px;
      font-size: 0.32rem;right:2.2rem;
      color:#ababab;position: fixed;top:0px;z-index: 10;text-align: left;
      font-family: fontnameUnidreamLED !important;
    }
    .back{
      // position: absolute;top:15px;left:0;
      cursor: pointer;float: left;display: inline-block;vertical-align: middle;
      img{vertical-align: middle;}
    }
    .isClicked{opacity: .2;border:2px solid red;}
    .dayOrnight{
      // position: absolute;top:15px;left:80px;
      float: left;display: inline-block;vertical-align: middle;
      img{vertical-align: middle;width: 70px;}
      span{
        font-size:28px;color:#ababab;
        vertical-align: middle;margin-left:-10px;
      }
    }
    .historyBtn{
      float: left;font-size:16px;width:100px;height:36px;line-height: 36px;
      margin-top: 27px;margin-left:10px;cursor: pointer;
      background:linear-gradient(#176275,#06437d);border-radius: 3px;
    }
    .leftInfo{
      position: absolute;top:0px;left:0;overflow: hidden;
    }
  }
  &_main{
    position: fixed;top:73px;left:15px;right:15px;bottom:15px;
  }
  &_left{
    width: 73.5%;float: left;height:100%;
    padding: 15px;
    background-color: rgba(39,69,111,0.3);border:1px solid rgba(255,255,255,0.1);
    margin-right: 15px;
    .leftBottomList{
      height: calc(100% - 310px);
    }
  }

  &_right{
    width: 25%;float: left;height:100%;
  }
}
</style>
