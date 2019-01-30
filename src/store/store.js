import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/http'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://10.19.7.69:8083', //测试环境----首页路径========后面没用将去掉
    /**========================考勤页面checking start==========================**/
    centername: '', // 当前选中的加工中心
    allCenterList: [], // 加工中心列表
    selectedSubcompany: '', // 选中的子公司
    energyListData: {
      list: [],
      totalCount: 0,
      page: 1
    }, // 能源指标列表
    energyDayEchartsData: {}, // 能源本日数据
    energyMonthEchartsData: {}, // 能源本月数据
    energyYearEchartsData: {}, // 能源本年数据
    /**========================考勤页面checking end==========================**/

  },
  mutations: {
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
    // 能源指标列表
    getEnergyListDataMut (state,res) {
      if (res && res.status === 200) {
        if (res.data && res.data.ret === "200") {
          state.energyListData.list = res.data.data.list
          if (res.data.data.totalCount) {
            
            state.energyListData.totalCount = res.data.data.totalCount
          }
          if (res.data.data.page) {
            state.energyListData.page = res.data.data.page
          }
          console.log('state:', state.energyListData)
        }
      }
      
    },
    // 能源日统计
    getEnergyDayDataMut (state,res) {
      state.energyDayEchartsData = res
    },
    // 能源月统计
    getEnergyMonthDataMut (state,res) {
      state.energyMonthEchartsData = res
    },
    // 能源年统计
    getEnergyYearDataMut (state,res) {
      state.energyYearEchartsData = res
    },
    /**========================考勤页面checking end==========================**/
  },
  actions: {
    /**========================考勤页面checking start==========================**/
    // 能源指标列表
    async getEnergyListDataAction({commit}, param) {
      const res = await http.post('/energy/getEnergy', param)
      commit('getEnergyListDataMut', res)
      
    },
    // 能源日统计
    async getEnergyDayDataAction({commit}) {
      const res = await http.post('/sanyAttendanceData/getAttendanceData', { centername: '' })
      commit('getEnergyDayDataMut', res)
    },
    // 能源月统计
    async getEnergyMonthDataAction({commit}) {
      const res = await http.post('/sanyAttendanceData/getAttendanceData', { centername: '' })
      commit('getEnergyMonthDataMut', res)
    },
    // 能源年统计
    async getEnergyYearDataAction({commit}) {
      const res = await http.post('/sanyAttendanceData/getAttendanceData', { centername: '' })
      commit('getEnergyYearDataMut', res)
    }
    /**========================考勤页面checking end==========================**/
  }
})
