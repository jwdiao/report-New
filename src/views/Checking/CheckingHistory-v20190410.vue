<template>
  <div class="index">
    <!-- 头部 start -->
    <div class="index_top">
      <div class="title"><span  @click="showSelectDialog">{{titleText}}三现数据中心</span></div>
      <div class="leftInfo">
        <div class="back" @click="enterIndexPage('/CheckingHistoryData20190410')"><img src="../../assets/images/index_back.png"></div>
        <div class="historyTime">
          <el-date-picker
            v-model="historyDateValue"
            type="date"
            value-format="yyyy-MM-dd"
            @change="handleHistoryTimeFun"
            :picker-options="pickerOptionsEnd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <ul class="dayNightBox">
          <li :class="{'selected':selectedDayOrNight==='DAY'}" @click="handleSelectedDayOrNight('DAY')">
            <img v-show="selectedDayOrNight==='DAY'" src="../../assets/images/checking_sun-yellow.png" />
            <img v-show="selectedDayOrNight==='NIGHT'" src="../../assets/images/checking_sun-grey.png" />
            <span>白班</span>
          </li>
          <li :class="{'selected':selectedDayOrNight==='NIGHT'}" @click="handleSelectedDayOrNight('NIGHT')">
            <img v-show="selectedDayOrNight==='NIGHT'" src="../../assets/images/checking_moon-yellow.png" />
            <img v-show="selectedDayOrNight==='DAY'" src="../../assets/images/checking_moon-grey.png" />
            <span>夜班</span>
          </li>
        </ul>
        <div class="historyBtn" @click="enterChecking">返回实时</div>
      </div>
      <!-- <em class="time" v-text="currentTime"></em> -->
    </div>
    <!-- 头部 end -->
    <!-- 头部下拉 start -->
    <div class="index_selectDialog" v-show="selectDialogShow">
      <ul>
        <li>
          <p class="title">事业部</p>
          <div class="common_select">
            <el-select v-model="careerValue" @change="careerChange" placeholder="请选择">
              <el-option v-for="item in careerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <p class="title">子公司</p>
          <div class="common_select">
            <el-select v-model="companyValue" placeholder="请选择">
              <el-option v-for="item in companyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <span class="btn confirm" @click="handleConfirm">确定</span>
          <span class="btn cancel" @click="handleCancel">取消</span>
        </li>
      </ul>
    </div>
    <!-- 头部下拉 end -->
    <!-- main start -->
    <div class="index_main">
      <div class="index_left">
        <AbnormalStatistics :info="baseInfo" :monthData="monthDataLeft" :yearData="yearDataLeft" />
      </div>
      <div class="index_con">
        <!-- <Checking :info="baseInfo" :isDayOrNigint="dayOrNightStatus" :kaoqinList="kaoqinList" :kaoqinListSubCenter="kaoqinListSubCenter" /> -->
        <Checking :info="baseInfo" :isDayOrNight="selectedDayOrNight" :kaoqinList="kaoqinList" :kaoqinListSubCenter="kaoqinListSubCenter" />
      </div>
      <div class="index_right">
        <attendance
        v-show="this.$store.state.selectedTabCheckingBetween!='energy'"
        :dayInfo="dayEchartsDataRight" :monthInfo="monthEchartsDataRight" :yearInfo="yearEchartsDataRight" />
        <!-- <EnergyStatistics
        v-if="this.$store.state.selectedTabCheckingBetween=='energy'"
        :dayInfo="dayEchartsDataRight" :monthInfo="monthEchartsDataRight" :yearInfo="yearEchartsDataRight" /> -->
      </div>
    </div>
    <!-- main end -->
    <!-- 加工中心 start -->
    <MachingCenter :allCenterList="allCenterList" @selectName="selectedCenterName" />
    <!-- 加工中心 end -->

  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
/* import AbnormalStatistics from '@/components/checking-v20190221/AbnormalStatisticsHistory'
import Attendance from '@/components/checking-v20190221/AttendanceHistory'
import EnergyStatistics from '@/components/checking-v20190221/EnergyStatisticsHistory'
import Checking from '@/components/checking-v20190221/CheckingHistory'
import MachingCenter from '@/components/checking-v20190221/MachingCenterHistory' */

import http from '../../api/http'
import AbnormalStatistics from '@/components/checking-v20190227/AbnormalStatisticsHistory'
import Attendance from '@/components/checking-v20190227/AttendanceHistory'
import EnergyStatistics from '@/components/checking-v20190227/EnergyStatisticsHistory'
import Checking from '@/components/checking-v20190410/CheckingHistory20190410'
import MachingCenter from '@/components/checking-v20190410/MachingCenterHistory'

import {
  getAttendanceData,
  getWorkEchartsOfHistoryDay,
  getWorkEchartsOfMonth,
} from '../../api/checkingHistoryApi'
import {
  getCenternameList,
  getAbnormaDataObj,
  getAbsentList1,getAbsentList0417,
  getLateList,getLateList0417,
  getChangeWorkList,getChangeWorkList0417,
  getOutList,
  getLateEchartsOfYear, // 左侧异常年
  queryYear, // 右侧年
} from '../../api/checkingApi'
export default {
  name: 'CheckingHistory-v20190221',
  components: {
    AbnormalStatistics,
    Attendance,
    Checking,
    MachingCenter
  },
  data () {
    return {
      pickerOptionsEnd: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 1000*60*60*24 /*|| time.getTime() < new Date(this.valueDateStart).getTime()*/
        }
      },
      currentTime: '', // 系统当前时间
      allCenterList: [], // 所有加工中心列表
      dayOrNightStatus: '', // 白班或夜班
      baseInfo: { // 基本信息
        lateNum: 0, // 迟到
        outNum: 0, // 离岗
        absentNum: 0, // 旷工（未到）
        abnormalNum: 0, // 未派工
        workType:1,//20190410获取白班与夜班传入的字段
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
      careerValue: '', // 点击标题下拉事业部选中值
      careerOptions: [ // 事业部下拉option
        {label:'重机事业部',value:'zhongji'},
        {label:'泵送事业部',value:'bengsong'},
        {label:'重能事业部',value:'zhongneng'},
        {label:'重起事业部',value:'zhongqi'},
        {label:'重卡事业部',value:'zhongka'},
        {label:'港机事业部',value:'gangji'},
        {label:'筑工事业部',value:'zhugong'},
      ],
      companyValue: '', // 子公司选中值
      companyOptions: [], // 子公司option
      titleText: '北京桩机',
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
      historyDateValue: '', // 历史时间顶部
      selectedDayOrNight: 'DAY' // 默认选中白天
    }
  },
  created () {
    this.getHistoryDate()
    this.titleText = localStorage.getItem('companyNameCheckingSelectedSubcompany')
  },
  mounted () {
    // const ipAddrReq = localStorage.getItem('ipAddrCheckingSelectedSubcompany')
    axios.defaults.baseURL = localStorage.getItem('ipAddrCheckingSelectedSubcompany')


    // 顶部日期时间
    this.currentTime = this.getCurrentDateTime() // 显示顶部时间
    this.getDayOrNightTextFun() // 显示顶部显示白夜班
    this.timerId = setInterval(() => {
      this.currentTime = this.getCurrentDateTime() // 显示顶部时间
      this.getDayOrNightTextFun() // 显示顶部显示白夜班
    }, 1000)

    // 顶部设置默认日期为昨天
    if (!this.historyDateValue) { // 日期为空取昨天
      let val = moment(new Date()).format('YYYY-MM-DD')
      let newDateA = new Date(val)
      let DateNext1 = newDateA.setDate(newDateA.getDate()-1)
      let DateObj = new Date(DateNext1)
      this.historyDateValue = moment(DateObj).format('YYYY-MM-DD')
    }

    this.$store.commit('changeCenterNameMut','')

    const companyName = localStorage.getItem('companyNameCheckingSelectedSubcompany')
    this.$store.commit('changeSubcompanyMut',companyName)

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
  },
  methods: {
    // 点击标题回到首页
    enterIndexPage (path) {
      this.$router.replace(path)
    },
    //获取日期
    getHistoryDate(){
      this.historyDateValue = this.$route.params.dateData
      this.$store.commit('changeCheckingHistoryQueryDateMut', this.historyDateValue)
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
    getYMDHMS (val) {
      if (!val) { // 日期为空取昨天
        val = moment(new Date()).format('YYYY-MM-DD')
        let newDateA = new Date(val)
        let DateNext1 = newDateA.setDate(newDateA.getDate()-1)
        let DateObj = new Date(DateNext1)
        val = moment(DateObj).format('YYYY-MM-DD')
      }
      if (this.selectedDayOrNight === 'DAY') { // 白班
        return val + ' 18:59:59'
      } else if (this.selectedDayOrNight === 'NIGHT') { // 夜班
        let newDateB = new Date(val)
        let DateNext2 = newDateB.setDate(newDateB.getDate() + 1)
        let DateObj2 = new Date(DateNext2)
        val = moment(DateObj2).format('YYYY-MM-DD') + ' 07:59:59'
        return val
      }
    },
    // 基本信息顶部
    async getBaseInfoData () {
      // const res = await getAttendanceData(centername)
      const ymdhms = this.getYMDHMS(this.historyDateValue)
      const res = await getAttendanceData(this.$store.state.centername,ymdhms,this.selectedDayOrNight)
      /*const res = await http.post('http://10.19.7.70:8089/sanyAttendanceData/getAttendanceData/history', { centerName: this.$store.state.centername,
        queryDay: ymdhms,
        queryFlag: this.selectedDayOrNight })*/
      if (res.data && res.data.ret === '200' && res.data.data) {
        this.baseInfo = res.data.data
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
      const res = await getWorkEchartsOfHistoryDay(this.$store.state.centername,this.historyDateValue,this.selectedDayOrNight)
      // debugger;
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
    // 右侧==人员考勤月统计
    async getMonthRightData () {
      // const res = await getWorkEchartsOfMonth(centername)
      const res = await getWorkEchartsOfMonth(this.$store.state.centername,this.historyDateValue)
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
          const ymdhms = this.getYMDHMS(this.$store.state.checkingHistoryQueryDate)
          this.$store.dispatch('getRadarChartsAction',{
            end: this.$store.state.allCenterList.length,
            queryDay: ymdhms
          });
        }
      }
    },
    // 中间==人员考勤列表==加工中心为总桩机时显示各个加工中心的数据
    async getAbnormaData () {
      const ymdhms = this.getYMDHMS(this.$store.state.checkingHistoryQueryDate)
      const res = await getAbnormaDataObj(this.$store.state.allCenterList.length, ymdhms)
      // console.log('获取人员在岗列表：', res)
      if (res && res.data) {
        const {ret, data} = res.data
        if (res && ret === '200') {
          this.kaoqinList.lateList = data.lateList // 迟到
          this.kaoqinList.leaveList = data.leaveList //离岗
          this.kaoqinList.absentList = data.absentList //未到
          this.kaoqinList.abnormalList = data.abnormalList //未派工
        }
      }
    },
    // 中间==人员考勤列表==加工中心为子工作中心时（旷工、迟到、离岗、未派工）列表
    async getAbsentLateLeaveChangeworkList () {
      let selectedDayOrNightText = ''
      if (this.selectedDayOrNight=='DAY'){
        selectedDayOrNightText = '白班'
        this.workType = 1
      } else if(this.selectedDayOrNight=='NIGHT'){
        selectedDayOrNightText = '夜班'
        this.workType = 2
      }
      let centerNameFromCentername = this.$store.state.centername
      // let currentTimeDate = this.currentTime.substring(0,10)
      // let queryDay = this.$store.state.checkingHistoryQueryDate
      let actualQueryDay = this.$store.state.checkingHistoryQueryDate
      if (!actualQueryDay) { // 日期为空取昨天
        actualQueryDay = moment(new Date()).format('YYYY-MM-DD')
        let newDateA = new Date(actualQueryDay)
        let DateNext1 = newDateA.setDate(newDateA.getDate()-1)
        let DateObj = new Date(DateNext1)
        actualQueryDay = moment(DateObj).format('YYYY-MM-DD')
      }
      let currentTimeDate = this.$store.state.checkingHistoryQueryDate?this.$store.state.checkingHistoryQueryDate:actualQueryDay
      let ligangDate = this.getYMDHMS(this.$store.state.checkingHistoryQueryDate)

      // 获取旷工
      // const resAbsentList = await http.post('http://10.19.7.70:8089/userRecordException/list',{workType: this.workType, queryDate: this.historyDateValue,recordStatus:3,workName:'',workNo:'',centerName:centerNameFromCentername,page:1,pageSize:1000})
      const resAbsentList = await getAbsentList0417(this.workType,this.historyDateValue,3,'','', centerNameFromCentername, 1, 1000)
      if (resAbsentList && resAbsentList.data.ret === '200') {
        // console.log('获取的旷工数据:', res)
        this.kaoqinListSubCenter.absentData = {
          absentList: resAbsentList.data.data.list,
          pagination: {
            total: resAbsentList.data.data.totalCount
          }
        }
      }

      // 获取迟到
      // const resLateList = await http.post('http://10.19.7.70:8089/userRecordException/list',{workType: this.workType, queryDate: this.historyDateValue,recordStatus:1,workName:'',workNo:'',centerName:centerNameFromCentername,page:1,pageSize:1000})
      const resLateList = await getLateList0417(this.workType,this.historyDateValue,1,'','', centerNameFromCentername, 1, 1000)
      if (resLateList && resLateList.data.ret === '200') {
        // console.log('获取的迟到数据:', resLateList) // workno
        this.kaoqinListSubCenter.lateData = {
          lateList: resLateList.data.data.list,
          pagination: {
            total: resLateList.data.data.totalCount
          }
        }
      }
      // 获取未派工
      // const resChangeWorkList = await http.post('http://10.19.7.70:8089/userRecordException/list',{workType: this.workType, queryDate: this.historyDateValue,recordStatus:2,workName:'',workNo:'',centerName:centerNameFromCentername,page:1,pageSize:1000})
      const resChangeWorkList = await getChangeWorkList0417(this.workType,this.historyDateValue,2,'','', centerNameFromCentername, 1, 1000)
      if (resChangeWorkList && resChangeWorkList.data.ret === '200') {
        // console.log('获取的未派工即调班数据:', resChangeWorkList) // workno
        this.kaoqinListSubCenter.abnormalData = {
          abnormalList: resChangeWorkList.data.data.list,
          pagination: {
            total: resChangeWorkList.data.data.totalCount
          }
        }
      }

      // 获取离岗

      const resOutList = await getOutList(
        {
          centerName: centerNameFromCentername,
          queryDay: ligangDate,
          page: 1,
          pagesize: 1000
        }
      )
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
            pageSize: 10
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
    careerChange (val) {
      // console.log(`选择的事业部是：${val}`)
      this.companyOptions = []
      this.companyValue = ''
      if (val === 'bengsong') {
        this.companyOptions = [
          {label:'长沙泵送',value:'长沙泵送',},
          {label:'邵阳湖汽',value:'邵阳湖汽'},
          {label:'娄底中源',value:'娄底中源'},
          {label:'娄底中兴',value:'娄底中兴'},
          {label:'益阳中阳',value:'益阳中阳'}
        ]
      } else if (val === 'zhongji') {
        this.companyOptions = [
          {label:'北京桩机',value:'北京桩机'},
          {label:'常熟索特',value:'常熟索特'},
          // {label:'临港中挖',value:'临港中挖'},
          {label:'昆山重机',value:'昆山重机'},
        ]
      } else if (val === 'zhongneng') {
        this.companyOptions = [
          {label:'三一重能',value:'三一重能'},
          {label:'三一叶片',value:'三一叶片'}
        ]
      } else if (val === 'zhongqi') {
        this.companyOptions = [
          {label:'宁乡起重机',value:'宁乡起重机'},
          {label:'湖州装备',value:'湖州装备'}
        ]
      } else if (val === 'zhongka') {
        this.companyOptions = [
          {label:'三一重卡',value:'三一重卡'}
        ]
      } else if (val === 'gangji') {
        this.companyOptions = [
          {label:'长沙港机',value:'长沙港机'},
          {label:'珠海港机',value:'珠海港机'}
        ]
      }else if (val === 'zhugong') {
        this.companyOptions = [
          {label:'快而居',value:'快而居'},
        ]
      }
    },
    handleConfirm () {
      // console.log('选择的子公司是：',this.companyValue)
      if (!this.careerValue) {
        this.$message({
          type: 'warning',
          message: '请选择事业部!',
          customClass: 'messageInfo'
        });
        return;
      }
      if (this.companyValue === '') {
        this.$message({
          type: 'warning',
          message: '请选择子公司!'
        });
        return;
      }

      let BaseUrlReq = ''
      let code = ''
      if (this.companyValue === '长沙泵送'){
        BaseUrlReq = 'http://10.0.91.50:8083'
        code = '0201'
      } else if (this.companyValue === '邵阳湖汽'){
        BaseUrlReq = 'http://10.13.136.22:8083'
        code = '0206'
      } else if (this.companyValue === '娄底中源'){
        BaseUrlReq = 'http://10.14.0.17:8083'
        code = '0202'
      } else if (this.companyValue === '北京桩机') {
        BaseUrlReq = 'http://10.19.7.69:8083'
        code = '0303'
      } else if (this.companyValue === '常熟索特') {
        BaseUrlReq = 'http://10.15.150.21:8083'
        code = '0306'
      } else if (this.companyValue === '三一重能') {
        BaseUrlReq = 'http://10.19.7.70:8083'
        code = '0701'
      } else if (this.companyValue === '宁乡起重机') {
        BaseUrlReq = 'http://10.16.1.65:8083'
        code = '0502'
      }else if (this.companyValue === '湖州装备') {
        BaseUrlReq = 'http://10.29.77.240:8083'
        // code = '0502'
      } else if (this.companyValue === '三一重卡') {
        BaseUrlReq = 'http://10.192.29.12:8083'
        code = '0101'
      } else if (this.companyValue === '娄底中兴') {
        BaseUrlReq = 'http://10.193.88.6:8083'
        code = '0303'
      } else if (this.companyValue === '三一叶片') {
        BaseUrlReq = 'http://10.19.220.179:8083'
      } else if (this.companyValue === '益阳中阳') {
        BaseUrlReq = 'http://10.22.33.100:8083'
      } else if (this.companyValue === '长沙港机') {
        BaseUrlReq = 'http://10.1.91.1:8083'
      } else if (this.companyValue === '临港中挖') {
        BaseUrlReq = 'http://10.11.16.187:8083'
      } else if (this.companyValue === '昆山重机') {
        BaseUrlReq = 'http://10.11.16.187:8083'
      } else if (this.companyValue === '珠海港机') {
        BaseUrlReq = 'http://10.193.4.244:8083'
      }else if (this.companyValue === '快而居') {
        BaseUrlReq = 'http://10.192.20.245:8083'
      }
      axios.defaults.baseURL = BaseUrlReq
      localStorage.setItem('ipAddrCheckingSelectedSubcompany',BaseUrlReq)
      localStorage.setItem('companyNameCheckingSelectedSubcompany',this.companyValue)

      this.titleText = `${this.companyValue}` // 顶部显示的文字

      clearInterval(this.refreshDataId)
      this.selectDialogShow = false // 关闭弹窗

      this.$store.commit('changeCenterNameMut','') // 重置加工中心为全部
      this.$store.commit('changeSubcompanyMut',this.companyValue) // 选中的子公司
      this.$store.commit('changeSelectTabCheckingBetweenMut','kaoqin') // 中间选中的tab设置为考勤列表

      this.getBaseInfoData() // 基本数据
      this.getYearLeftData()
      this.getDayRightData()
      this.getMonthRightData()
      this.getYearRightData()
      this.getCenterNameData() // 加工中心数组
    },
    // 关闭顶部选择事业部弹窗
    handleCancel () {
      this.selectDialogShow = false
    },
    // 回到实时页面
    enterChecking () {
      // this.$router.push('/Checking')
      this.$router.replace('/CheckingV71')
    },
    handleHistoryTimeFun (val) {
      // console.log('hhhhhhhh:', val)
      this.$store.commit('changeCheckingHistoryQueryDateMut', val)

      // 左侧异常年
      this.getYearLeftData()

      // 右侧日/月/年统计/左侧异常月(数据在右侧月统计里面)
      this.getDayRightData()
      this.getMonthRightData()
      this.getYearRightData()

      // 基本信息
      this.getBaseInfoData()
      if (this.$store.state.centername==='') { // 总加工中心
        // 雷达图
        const ymdhms = this.getYMDHMS(this.$store.state.checkingHistoryQueryDate)
        this.$store.dispatch('getRadarChartsAction',{
          end: this.$store.state.allCenterList.length,
          queryDay: ymdhms
        });
        // 人员考勤列表
        this.getAbnormaData()
      } else {  // 子加工中心
        this.getAbsentLateLeaveChangeworkList()
      }
    },
    handleSelectedDayOrNight (val) {
      if (val === 'DAY') { // 白班
        this.selectedDayOrNight = 'DAY'
      } else if (val === 'NIGHT') { // 夜班
        this.selectedDayOrNight = 'NIGHT'
      }
      this.$store.commit('changeCheckingHistoryQueryFlagMut', this.selectedDayOrNight)

      // 右侧日统计(右侧月统计和年统计、左侧月统计和年统计不变)
      this.getDayRightData()
      // 基本信息
      this.getBaseInfoData()

      if (this.$store.state.centername==='') { // 总加工中心
        // 雷达图
        const ymdhms = this.getYMDHMS(this.$store.state.checkingHistoryQueryDate)
        this.$store.dispatch('getRadarChartsAction',{
          end: this.$store.state.allCenterList.length,
          queryDay: ymdhms
        });
        // 人员考勤列表
        this.getAbnormaData()
      } else { // 子加工中心
        this.getAbsentLateLeaveChangeworkList()
      }
    },
  },
  destroyed () {
    // clearInterval(this.timerId)
  }
}
</script>
<style lang="scss" scoped>
.index{
  height:100%;
  background-image: url(../../assets/images/index_bg.png);
  background-size: 100% 100%;
  color: rgb(255, 255, 255);
  background-repeat: no-repeat;overflow: hidden;
  &_top{
    position: fixed;top:0;left:15px;right:15px;box-sizing: border-box;
    height: 106px;line-height:106px;text-align: center;
    .title{
      font-size: 0.44rem;
      color:#fff;font-weight:bold;
      span{cursor: pointer;}
    }
    .time{
      width:250px;
      font-size: 0.32rem;right:2.2rem;
      color:#ababab;position: fixed;top:28px;z-index: 10;text-align: left;
      font-family: fontnameUnidreamLED !important;
    }
    /* .dayOrnight{
      float: left;display: inline-block;vertical-align: middle;
      img{vertical-align: middle;width: 86px;}
      span{
        font-size:34px;color:#ababab;
        vertical-align: middle;margin-left:-10px;
      }
    } */
    .leftInfo{
      position: absolute;top: 61px;left:0;font-size:0;line-height:0;
      .back {
        cursor: pointer;display: inline-block;vertical-align: middle;
        img{vertical-align: middle;}
      }
      .historyTime {
        display: inline-block;vertical-align: middle;margin-left:10px;height:38px;line-height: 38px;
        /deep/ .el-date-editor.el-input{
          width:150px;
        }
        /deep/ .el-input__inner{
          background-color: rgba(44, 149, 240, 0.1);
          border: 1px solid #285e8c;
          height: 38px !important;
          line-height: 38px !important;
        }
      }
      .dayNightBox {
        display: inline-block;vertical-align: middle;box-sizing: border-box;margin-left:10px;
        font-size: 14px;overflow: hidden;height:40px;line-height: 38px;border: 1px solid #285e8c;border-radius: 3px;
        li{
          float: left;padding:0 10px;cursor: pointer;
          img{vertical-align: middle;margin-right:5px;}
          &.selected{
            background:linear-gradient(#176275,#06437d);
          }
        }
      }
      .historyBtn{
        display: inline-block;vertical-align: middle;margin-left:10px;
        font-size:16px;width:110px;height:38px;line-height: 38px;
        margin-left:10px;cursor: pointer;
        background:linear-gradient(#176275,#06437d);border-radius: 3px;
      }
    }
  }
  &_main{
    position: fixed;top:120px;left:15px;right:15px;bottom:15px;
    // border-top:1px solid red;
  }
  &_left{
    width: 24%;float: left;height:100%;
    // border:1px solid #ff0;
  }
  &_con{
    width: 51%;
    padding-left: 15px;
    padding-right: 15px;
    float: left;
    height: 100%;
    // border:1px solid #ff0;
  }
  &_right{
    width: 25%;float: left;height:100%;
    // border:1px solid #ff0;
  }

  &_selectDialog{
    background-color: rgba(9, 20, 40, 0.8);border:1px solid #6bb9d5;
    position:fixed;top:105px;z-index:999;left:50%;transform: translateX(-50%);
    padding:28px 60px 48px;
    width:420px;margin:0 auto;font-size:12px;
    .title{font-size:20px;color:#fff;margin-top:20px;}
    .common_select{margin-top:10px;}
    .el-select{
      width:100%;
    }
    /deep/ .el-input__inner {
        height: 38px !important;
        line-height: 38px !important;
    }
    .btn{
      height:40px;line-height:40px;display: inline-block;font-size:20px;
      text-align: center;border-radius: 4px;margin-top:30px;width:48%;
    }
    .confirm{
      background-color: #0088ff;color:#fff;cursor: pointer;
    }
    .cancel{
      margin-left:4%;
      background-color: #b3b3bd;color:#0c1932;cursor: pointer;
    }
  }

}

// .el-message{font-size:12px !important;}
// .messageInfo{font-size:24px !important;}

</style>
