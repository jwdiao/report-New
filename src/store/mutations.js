import Vue from 'vue'
import {
  GET_RADARCHARTSMUT,
  GETENERGY_DAYDATAMUT,
  GETENERGY_LISTDATAMUT,
  GETENERGY_MONTHDATAMUT,
  GETENERGY_YEARDATAMUT,
  CHANGE_TITLENAME
} from './mutation-types'
export default {
    /**========================考勤页面checking start==========================**/
    // 改变加工中心
    changeCenterNameMut (state, val){
      state.centername = val
    },
    // 改变加工中心列表
    changeAllCenterListMut (state, val){
      state.allCenterList = val
    },
    // 改变子公司
    changeSubcompanyMut (state, val){
      state.selectedSubcompany = val
    },
    // 改变子公司（计时）
    changeSubcompanyMutTime (state, val){
      state.selectedSubcompanyTime = val
    },
    // 改变选中的tab
    changeSelectTabCheckingBetweenMut (state, val){
      state.selectedTabCheckingBetween = val
    },
    // 能源指标列表
    [GETENERGY_LISTDATAMUT] (state,res) {
      if (res && res.status === 200) {
        if (res.data && res.data.ret === "200") {
          state.energyListData.list = res.data.data.list
          if (res.data.data.totalCount) {
            state.energyListData.totalCount = res.data.data.totalCount
          }
          if (res.data.data.page) {
            state.energyListData.page = res.data.data.page
          }
        }
      }

    },
    // 能源日统计
    [GETENERGY_DAYDATAMUT] (state,res) {
      // debugger;
      if (res && res.status === 200) {
        if (res.data && res.data.ret === "200") {
          state.energyDayEchartsData = res.data.data
        } else {
          // 没有获取到数据
          state.energyDayEchartsData = {
            "totalConsumPower": [],
            "xAxis": [],
            "workRate": [],
            "bootRate": []
          }
        }
      }
    },
    // 能源月统计
    [GETENERGY_MONTHDATAMUT] (state,res) {
      if (res && res.status === 200) {
        if (res.data && res.data.ret === "200") {
          state.energyMonthEchartsData = res.data.data
        } else {
          // 没有获取到数据
          state.energyMonthEchartsData = {
            "totalConsumPower": [],
            "xAxis": [],
            "workRate": [],
            "bootRate": []
          }
        }
      }
    },
    // 能源年统计
    [GETENERGY_YEARDATAMUT] (state,res) {
      if (res && res.status === 200) {
        if (res.data && res.data.ret === "200") {
          state.energyYearEchartsData = res.data.data
          console.log('state year:', state.energyYearEchartsData)
        } else {
          // 没有获取到数据
          state.energyYearEchartsData = {
            "totalConsumPower": [],
            "xAxis": [],
            "workRate": [],
            "bootRate": [],
          }
        }
      }
    },
    // 考勤列表雷达图
    [GET_RADARCHARTSMUT](state,res){
      if (res && res.status === 200) {
        if (res.data && res.data.ret === "200") {
          state.checkRadarList = res.data.data
        }
      }
    },
    // 改变考勤历史页面查询日期
    changeCheckingHistoryQueryDateMut (state, val){
      state.checkingHistoryQueryDate = val
    },
    // 改变考勤历史页面白夜班标识
    changeCheckingHistoryQueryFlagMut (state, val){
      state.checkingHistoryQueryFlag = val
    },
    /**========================考勤页面checking end==========================**/
    // 改变加工中心设备监控中心====20190513
    changeOverViewSelectedCompanyMut (state, val){
      state.sbhlOverViewSelectedCompany = val
    },
    //改变工艺类型20190513
    [CHANGE_TITLENAME](state,val){
      state.titleObj = val
    }
}
