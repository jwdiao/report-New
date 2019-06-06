import {byDayMonthAndYearEnergy, getRecordRadarChart} from "../api/checkingApi";
import http from "../api/http";
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
    // 能源指标列表
    async getEnergyListDataAction({commit}, param) {
      const res = await http.post('/energy/getEnergy', param)
      commit(GETENERGY_LISTDATAMUT, res)

    },
    // 能源日统计
    async getEnergyDayDataAction({commit}, param) {
      const res = await byDayMonthAndYearEnergy(param)
      commit(GETENERGY_DAYDATAMUT, res)
    },
    // 能源月统计
    async getEnergyMonthDataAction({commit}, param) {
      const res = await byDayMonthAndYearEnergy(param)
      commit(GETENERGY_MONTHDATAMUT, res)
    },
    // 能源年统计
    async getEnergyYearDataAction({commit}, param) {
      const res = await byDayMonthAndYearEnergy(param)
      commit(GETENERGY_YEARDATAMUT, res)
    },
    // 雷达图数据（考勤页面和考勤历史页面都用）
    /* async getRadarChartsAction({commit}, end){
      const res = await getRecordRadarChart(end)
      commit('getRadarChartsMut', res)
    }, */
    async getRadarChartsAction({commit}, params){
      let res = ''
      if (params.queryDay){
        res = await getRecordRadarChart(params.end, params.queryDay)
      } else {
        res = await getRecordRadarChart(params.end)
      }
      commit(GET_RADARCHARTSMUT, res)
    },
    /**========================考勤页面checking end==========================**/
    getTitleName({commit},titleObj){
      commit(CHANGE_TITLENAME,titleObj)
    }
}
