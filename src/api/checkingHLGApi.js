import http from './http'
// axios.defaults.baseURL = 'http://10.19.8.22:8083'
const baseURL = 'http://10.19.8.22:8099'

// 基本信息
export const getAttendanceData = (centername) => http.post(`${baseURL}/sanyAttendanceData/getAttendanceData`, { centername: centername })
// 左侧异常年
export const getLateEchartsOfYear = (centername) => http.post(`${baseURL}/sanyUserPushRecord/getLateEchartsOfYear`, { centername: centername })


// 右侧==人员考勤日统计
export const getWorkEchartsOfDay = (centername) => http.post(`${baseURL}/sanyUserPushRecord/getWorkEchartsOfDay`, { centername: centername })
// 右侧==人员考勤月统计
export const getWorkEchartsOfMonth = (centername) => http.post(`${baseURL}/sanyUserPushRecord/getWorkEchartsOfMonth`, { centername: centername })
// 右侧==人员考勤年统计
export const queryYear = (centername) => http.post(`${baseURL}/sanycountworkplanexecute/queryYear`, { centername: centername })
// 右侧==获取所有的加工中心
export const getCenternameList = () => http.get(`${baseURL}/userMessage/getCenternameList`)
// 右侧==能源日/月/年统计（当点击能源列表的tab时才显示出来）
export const byDayMonthAndYearEnergy = (param) => http.post(`${baseURL}/energy/getEnergy/byDayMonthAndYear`, {
  centerName: param.centerName,
  queryFlag: param.queryFlag // queryFlag固定值：'day'|'month'|'year'
})


// 中间==人员考勤查询==以图搜人
export const searchUserRecordHis = (workname, workno) => http.post(`${baseURL}/sanyUserPushRecord/searchUserRecordHis`,{
  workname: workname,
	workno: workno
})


// 中间==人员考勤列表==加工中心为全部工作中心时显示各个加工中心的数据queryDay(考勤和历史考勤页面公用)
// export const getAbnormaDataObj = (centernameNum) => http.get('/sanyAttendanceData/getAbnormaData'+ '?end='+centernameNum)
export const getAbnormaDataObj = (end, queryDay) => http.get(queryDay ? baseURL+'/sanyAttendanceData/getAbnormaData?end='+end+'&queryDay='+queryDay:baseURL+'/sanyAttendanceData/getAbnormaData?end='+end )
// 中间==人员考勤列表==加工中心为子工作中心时旷工列表(考勤和考勤历史页面公用)
export const getAbsentList1 = (centerName,workType, stopTime, page, pagesize) => http.post(`${baseURL}/sanyUserPushRecord/getAbsentList1`,{
  centername: centerName,workType: workType, stopTime: stopTime, page: page, pagesize: pagesize
})
// 中间==人员考勤列表==加工中心为子工作中心时迟到列表(考勤和考勤历史页面公用)
export const getLateList = (centerName,workType, stopTime, page, pagesize) => http.post(`${baseURL}/sanyUserPushRecord/getLateList`,{
  centerName: centerName,workType: workType, stopTime: stopTime, page: page, pagesize: pagesize
})
// 中间==人员考勤列表==加工中心为子工作中心时未派工列表(考勤和考勤历史页面公用)
export const getChangeWorkList = (centerName,workType, stopTime, page, pagesize) => http.post(`${baseURL}/sanyUserPushRecord/getChangeWorkList`,{
  centerName: centerName,workType: workType, stopTime: stopTime, page: page, pagesize: pagesize
})
// 中间==人员考勤列表==加工中心为子工作中心时离岗列表(考勤和考勤历史页面公用)
export const getOutList = (params) => params.queryDay ? http.post(`${baseURL}/sanyUserPushRecord/getOutList`,{
  centerName: params.centerName,
  queryDay: params.queryDay,
  page: params.page,
  pagesize: params.pagesize
}) : http.post(`${baseURL}/sanyUserPushRecord/getOutList`,{
  centerName: params.centerName,
  page: params.page,
  pagesize: params.pagesize
})

// 中间==人员考勤雷达图==加工中心为全部工作中心时(考勤页面和考勤历史页面都用该接口)
// export const getRecordRadarChart = (end) => http.get('/sanyAttendanceData/getRecordRadarChart?end='+end)
export const getRecordRadarChart = (end, queryDay) => http.get(queryDay ? baseURL+'/sanyAttendanceData/getRecordRadarChart?end='+end+'&queryDay='+queryDay:baseURL+'/sanyAttendanceData/getRecordRadarChart?end='+end )