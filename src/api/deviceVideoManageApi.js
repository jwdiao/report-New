import http from './http'



const BASE_URL = 'http://10.19.8.22:9099' // 线上地址
// const BASE_URL = 'http://10.88.195.81:9099' // 于群
// BASE_URL = 'http://10.88.195.89:9099' // 高杰
// BASE_URL = 'http://10.88.190.36:9099' // 薄志成

//***======================================================Overview.vue页面 start====================================================================== */
// OverView页面所有接口（除了设备列表外）
// 请求类型   01：代表上端主信息  02：代表按工艺类型查询  04：代表按工作中心查询  10：代表日统计  11：代表按月统计 12 ：代表 按年统计
export const reqCountDeviceMain = (companyCode, orgCode, requestType, currentDateStr) => http.post(BASE_URL+'/machineConnection/countDeviceMain',{
  companyCode: companyCode,
  orgCode: orgCode,
  requestType: requestType,
  date: currentDateStr
})
export const reqDeviceMain = (queryType) => http.post('/videoDataHour/getEcharts',{
	queryType
})
// 设备列表接口
export const reqSelectMachineByMachineStatus = (machineStatus, pageNum, pageSize, companyCode, date) =>http.post(BASE_URL+'/machineConnection/selectMachineByMachineStatus',{
  pageNum: pageNum,
  pageSize: pageSize,
  query: {
    machineStatus: machineStatus,
    companyCode: companyCode,
    date: date
  }
})
//***======================================================Overview.vue页面 end====================================================================== */



//***======================================================DeviceHome.vue页面 start====================================================================== */
//（作业、待机、故障、关机）列表接口
// 工艺类型 firstGroupCode
export const reqGetMachineInterConnectionSta = (params) => http.post(BASE_URL+'/machineConnection/getMachineInterConnectionSta',{
  companyCode: params.companyCode, // 子公司code
  requestType: params.requestType, // 01 工艺，02 加工中心
  firstGroupCode: params.firstGroupCode, // 值
  date: params.date
})

// 加工中心 workCenterCode
export const reqGetMachineInterConnectionStaCenter = (params) => http.post(BASE_URL+'/machineConnection/getMachineInterConnectionSta',{
  companyCode: params.companyCode,
  requestType: params.requestType, // 01 工艺，02 加工中心
  workCenterCode: params.workCenterCode, // 值
  date: params.date
})

//***======================================================DeviceHome.vue页面 start====================================================================== */



//***======================================================DeviceConnect.vue页面 start====================================================================== */
// export const machineConnectioninfo = (params) => post(BASE_URL+'/machineConnection/findMachineConnectioninfo',params)
export const machineConnectioninfo = (params) => http.post(BASE_URL+'/machineConnection/findMachineConnectioninfo',{
  onemachineNo: params.onemachineNo, // 设备id
  date: params.date // 日期
})

//0424设备互联详情页面--右上部分列表所有
export const reqDeviceRightList = (deviceID) => http.post(BASE_URL+'/jiChuangDataController/getNewDataToPage',{deviceID})
//0424设备互联详情页面--右上部分列表--进给率单位
export const reqJGLDanwei = (no) => http.post(BASE_URL+'/machineConnection/getMachineInfoByNo',{no})



//2019.04.29 设备互联左上部分--
export const reqDeviceAll = () => http.post(BASE_URL+'/machineConnection/countDeviceMain', {companyCode:'',orgCode:'0301',requestType:'01'})

export const getVideoServe = (query) => http.post('http://10.88.190.36:8083/camera/getVideoSurveilInitStatic',query)

// 1s 右下角
export const reqSelectByDeviceIDSs = (deviceID) => http.post(BASE_URL+'/machineConnection/selectByDeviceIDSs',{ machineNo: deviceID })
// 2 minutes 右下角
export const reqSelectByDeviceID = (deviceID) => http.post(BASE_URL+'/machineConnection/selectByDeviceID', { machineNo: deviceID })
//***======================================================DeviceConnect.vue页面 start====================================================================== */
//查询摄像头 
export const searchCameraList = (secondGroupCode,orgCode,companyCode,factoryCode,firstGroupCode,cameraName,searchNme,startIndex,pageSize) =>http.post('/camera/searchCameraList', {secondGroupCode,orgCode,companyCode,factoryCode,firstGroupCode,cameraName,searchNme,startIndex,pageSize})
