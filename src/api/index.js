import http from './http'


/*cars页面*/
//请求车辆页面列表信息接口
export const reqUserInfo = (startDate,endDate,cCode,carType,carBelong,isOutStatus,page,pageSize) => http.post('/carPlater/getSanyCarDataList',{'startdate':startDate,'enddate':endDate,'ccode': cCode, 'cartype': carType,'carbelong':carBelong, 'isoutstatus': isOutStatus,'page':page,'pagesize':pageSize})
//请求车辆数据接口
export const reqCarData = () => http.get('/carPlater/getCarData')
//请求年月日echarts数据
export const reqRightForm = (DateType) => http.post('/carPlater/getSanyCarDataStatic', {querySign: DateType})
//视觉设备安全统计
export const reqDeviceSafeEcharts = () => http.post('/videoApplication/getVideoOnLineStatic')
//视觉设备安全列表
export const reqDeviceSafeList = (page,pageSize,companyName,cameraName,onLineStatus) => http.post('/videoApplication/getVideoOnLineList',{'pageNo':page,'pageSize':pageSize,'companyName':companyName,'cameraName':cameraName,'onLineStatus':onLineStatus})
//车辆中间echarts
export const reqCarEchartsList = () => http.get('/carPlater/getTodaySanyCarData')
//车辆左侧
export const reqCarAllInfo = (carBelong,carType,page,pageSize) => http.post('/carPlater/getStrandedCarData',{'carbelong':carBelong,'cartype': carType,'page':page,'pagesize':pageSize})

//监控设备查询摄像头列表(Monitor.vue)
export const searchCameraList = (secondGroupCode,orgCode,companyCode,factoryCode,firstGroupCode,cameraName,searchNme,startIndex,pageSize) =>http.post('/camera/searchCameraList', {secondGroupCode,orgCode,companyCode,factoryCode,firstGroupCode,cameraName,searchNme,startIndex,pageSize})
//下拉列表数据(Monitor.vue)
export const getOption = (url,num) => http.get(url+num)
//6s管理6s统计接口(Manage6S.vue)
export const getEventInforList = () => http.get('/sanySanyEventInfor/getEventInforList')
//6s管理getEventInforStatis(勤日/月/年统计)接口(Manage6S.vue)
export const getEventInforStatis = (querySign) => http.post('/sanySanyEventInfor/getEventInforStatis',{querySign})
//6s管理getEventInforStatisday日统计接口(Manage6S.vue)
export const getEventInforStatisday = (querySign) => http.post('/sanySanyEventInfor/getEventInforStatisday',{querySign})
//6s管理getSelectList1实时事件抓拍列表(Manage6S.vue)
export const getSelectList1 = (eventtype,page,pagesize) => http.post('/sanySanyEventInfor/getSelectList1',{eventtype,page,pagesize})
//数据安全管理设备信息列表接口(ControlLog.vue)http://10.19.8.22:8083
export const getSanyCameraSysLogStaticList = (query) => http.post('/sanyCameraSysLog/getSanyCameraSysLogList',{
	state:query.state,pageNo:query.pageNo,pageSize:query.pageSize,masterTypeCode:query.masterTypeCode,
	startTime:query.startTime,endTime:query.endTime,loginIp:query.loginIp,content:query.content
})
//数据安全管理设备三个echats接口(ControlLog.vue)
export const getSanyCameraSysLogStaticCharts = (state) => http.post('/sanyCameraSysLog/getSanyCameraSysLogStatic',{state})
//视觉设备安全在线统计 在线统计表接口(equipmentSafety.vue)
export const basicstaticInfo = () => http.post('/videoApplication/basicstaticinfo')
//视觉设备安全在线统计 设备在线看板接口(equipmentSafety.vue)
export const onlineboard = () => http.post('videoApplication/onlineboard')
//视觉设备安全在线统计 在线率日统计(equipmentSafety.vue)
export const onlineRateEchart = (companyCode) => http.post('videoApplication/onlineRateEchart',{companyCode})
//export const getSanyCameraSysLogStaticCharts = (state) => http.post('http://10.19.8.22:8083/sanyCameraSysLog/getSanyCameraSysLogStatic',{state})



//回龙观车辆--	中间今日进出 车辆内、外部，货、轿车数量及百分比统计接口
export const reqHLGCarsData = () =>http.get('http://10.19.8.22:8100/threerelism/sanyBussCar/getTodaySanyBussCarData')
//回龙观车辆--	右侧按照日月年统计内外部数量接口
export const reqRightEchartsData = (DateType) =>http.post('http://10.19.8.22:8100/threerelism/sanyBussCar/getSanyCarDataStatic',DateType)
//回龙观车辆--	左侧接口
export const reqLeftCarsData = (carBelong,carType,page,pageSize) =>http.post('http://10.19.8.22:8100/threerelism/sanyBussCar/getStrandedCarData',{carBelong,carType,page,pageSize})
//回龙观车辆v3.0--	中间-center 接口
export const reqCenterThreeTimesCarsData = () =>http.get('http://10.19.8.22:8100/threerelism/sanyBussCar/getExceptionCarData')
//回龙观车辆v3.0--	左侧--下面echarts 接口
export const reqThreeTimesEchartsData = () =>http.get('http://10.19.8.22:8100/threerelism/sanyBussCar/getExceptionCarOfmonth')
//回龙观车辆v3.0--	中间--下面echarts 接口
export const reqAllSearchData = (date,carNumber,carBelong,carType,isLeave,searchType,page,pageSize) =>http.post('http://10.19.8.22:8100/threerelism/sanyBussCar/getListBySearch',{'date':date,'carNumber':carNumber,'carBelong':carBelong,'carType':carType,'isLeave':isLeave,'searchType':searchType,'page':page,'pageSize':pageSize})
//南口车辆v3.0--	中间--上面6个数据  接口
export const reqCenterTopSixData = () =>http.get('/carPlater/getExceptionCarData')
//南口车辆v3.0--	左侧下面十天内echarts--  接口
export const reqLetBottomTenDayEchartsData = () =>http.get('/carPlater/getExceptionCarOfmonth')
//南口车辆v3.0--	中间下面综合查询--  接口
export const reqCenterBottomAllSearchData = (date,ccode,carbelong,cartype,isoutstatus,searchType,page,pagesize) =>http.post('/carPlater/getSanyCarDataListOfNew',{date,ccode,carbelong,cartype,isoutstatus,searchType,page,pagesize})


// 设备页面(EnergyDevive)-----设备表格数据
export const getDeviceByCenter = (params) => http.post('/deviceSgCamera/getDeviceByCenter',{
	centerName: params.centerName,
	page: params.page,
	pageSize: params.pageSize
})
// 设备页面(EnergyDevive)-----单个设备工作状态信息接口
export const getSingleDeviceInfo = (deviceCode,centerName) => centerName?http.post('/energy/getSingleDeviceInfo',{centerName:centerName,deviceCode:deviceCode}):http.post('/energy/getSingleDeviceInfo',{deviceCode:deviceCode})
// 派工信息接口
export const getWorkPlanByDeviceCode = (deviceCode) => http.post('/sanyMachine/getWorkPlanByDeviceCode',{deviceCode:deviceCode})


// 电流
export const getNewCurrentInfo = (id) => http.post('http://10.19.8.22:8100/interin/current/getNewCurrent',{deviceUuid: id})
export const getNewCurrentsInfo2 = (id) => http.post('http://10.19.8.22:8100/interin/current/getNewCurrents',{deviceUuid: id});
// 雷达图
export const getRecordRadarChartByCenter = (centerName) => http.post('/sanyAttendanceData/getRecordRadarChartByCenter',{centerName: centerName});

//回龙观车辆历史车辆统计--	--  接口
export const reqHistoryCarsInformationData = (startDate,endDate) =>http.post('http://10.19.8.22:8100/threerelism/sanyBussCar/getHistoryCarData',{startDate,endDate})
//南口车辆历史车辆统计--	--  接口
export const reqHistoryCarsInformationNKData = (startDate,endDate) =>http.post('/carPlater/getHistoryCarData',{startDate,endDate})
//三一桩机三现历史数据--	--  接口
export const reqnSanyHistoryData = (centerName,startTime,endTime) =>http.post('/sanyAttendanceNewData/list',{centerName,startTime,endTime})


export const machineConnectioninfo = (params) => http.post('http://10.19.8.22:9099/machineConnection/findMachineConnectioninfo',params)
//0424设备互联首页--接口
export const reqDeviceInfomation = () => http.get('http://10.19.8.22:9099/machineConnection/getMachineInterConnectionSta')
//0424设备互联详情页面--右上部分列表所有
export const reqDeviceRightList = (deviceID) => http.post('http://10.19.8.22:9099/jiChuangDataController/getNewDataToPage',{deviceID})
//0424设备互联详情页面--右上部分列表--进给率单位
export const reqJGLDanwei = (no) => http.post('http://10.19.8.22:9099/machineConnection/getMachineInfoByNo',{no})
