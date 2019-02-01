import http from './http'


/*cars页面*/
//请求页面列表信息接口
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

