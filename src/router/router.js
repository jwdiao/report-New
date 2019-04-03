import Vue from 'vue'
import Router from 'vue-router'

// 主页
const HomeGuide = () => import('../components/HomeGuide/HomeGuide.vue');
//历史版本
const HistoryVersion = () => import('../components/HomeGuide/HistoryVersion.vue');
/* ===========================考勤页面(所有版本) start========================================= */
// 不用了的（后期要删除）
// const EnergyDeviceInfo = () => import('../views/EnergyDevice/index-v20190226.vue'); // 能源设备信息index-v20190311.vue


const CheckingV2 = () => import('../views/Checking2.vue');
const CheckingV3 = () => import('../views/CheckingSelectSubCompany.vue');
const CheckingV4 = () => import('../views/Checking/Checking-v20190211.vue'); // 20190211版本
const CheckingV5 = () => import('../views/Checking/Checking-v20190213.vue'); // 20190213版本
const CheckingV6 = () => import('../views/Checking/Checking-v20190221.vue'); // 20190221版本
const CheckingV7 = () => import('../views/Checking/Checking-v20190227.vue'); // 最新版本CheckingHistoryData

// 考勤历史列表数据页面
const CheckingHistoryData = () => import('../views/Checking/CheckingHistoryData.vue'); // 考勤历史列表数据页面（点击首页历史记录按钮进入该页面）
// 考勤历史数据界面
const CheckingHistory = () => import('../views/Checking/CheckingHistory-v20190221.vue'); // 考勤历史数据界面（从考勤历史列表界面点击时间）


// 能源设备信息
const EnergyDeviceInfo = () => import('../views/EnergyDevice/index-v20190311.vue'); // 能源设备信息（从首页能源指标列表点击进去该页面）

// 回龙观园区考勤（这个没有挂到链接上，领导专用）
const CheckingV7hlg = () => import('../views/Checking/CheckingHLG-v20190307.vue'); // 回龙观园区考勤

// 全集团考勤
const CheckingJt = () => import('../views/Checking/CheckingJt.vue'); // 全集团考勤数据页面===========正在开发中
const CheckingJtSubcompany = () => import('../views/Checking/CheckingJtSubcompany.vue'); // 全集团考勤数据页面(给子公司用的没有返回按钮)===========正在开发中

/* ===========================考勤页面 end========================================= */

// 6S管理
const Manage6S = () => import('../views/Manage6S.vue');
// 车辆管理页面（所有版本）
const CarsV10 = () => import('../views/Cars/Cars-v1-0117.vue');//南口车辆(第1.0版)
const CarsV20 = () => import('../views/Cars/Cars-v2-0211.vue');//南口车辆(第2.0版)
const CarsV21 = () => import('../views/Cars/Cars-v2-0131.vue');///南口车辆(第2.1版)
const CarsNKV31 = () => import('../views/Cars/Cars-v3-0221-nk.vue');///南口车辆(第3.1版)
const CarshlgV21 = () => import('../views/Cars/Cars-v2-0214-hlg.vue');//回龙观车辆(第2.1版)
const CarsHLGV30 = () => import('../views/Cars/Cars-v3-0215.vue');//回龙观车辆(第3.0版)
const CarsHLGV31 = () => import('../views/Cars/Cars-v3-0218-hlg.vue');//回龙观车辆(第3.1版)

const CarsHistoryInfor = () => import('../views/CarsHistoryInformation/CarsHistoryInfor-hlg.vue') //车辆历史统计
const CarsHistoryInforNK = () => import('../views/CarsHistoryInformation/CarsHistoryInfor-nk.vue') //车辆历史统计

// 设备监控
const Monitor = () => import('../views/Monitor.vue');
// 电流
const CameraMonitoring = () => import('../views/CameraMonitoring.vue');

const ControlLog = () => import('../views/ControlLog.vue');
//设备安全在线
const DeviceSafeOnline = () => import('../views/DeviceSafeOnline.vue');
//视觉设备安全在线
const equipmentSafety = () => import('../views/equipmentSafety.vue');


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'HomeGuide',
    },
    {
      path: '/Checking',
      name: 'checkingLatest',
      component: CheckingV7
    },
    {
      path: '/CheckingV2',
      name: 'checkingv2',
      component: CheckingV2
    },
    {
      path: '/CheckingV3',
      name: 'checkingv3',
      component: CheckingV3
    },
    {
      path: '/CheckingV4',
      name: 'checkingv4',
      component: CheckingV4
    },
    {
      path: '/CheckingV5',
      name: 'checkingv5',
      component: CheckingV5
    },
    {
      path: '/CheckingV6',
      name: 'checkingv6',
      component: CheckingV6
    },
    {
      path: '/CheckingV7',
      name: 'checkingv7',
      component: CheckingV7
    },
    {
      path: '/CheckingHistory',
      name: 'CheckingHistory',
      component: CheckingHistory
    },
    {
      path: '/CheckingHistoryData',
      name: 'checkingHistoryData',
      component: CheckingHistoryData
    },
    
    {
      path: '/EnergyDeviceInfo',
      name: 'energyDeviceInfo',
      component: EnergyDeviceInfo
    },
    {
      path: '/CheckingV7hlg',
      name: 'CheckingV7hlg',
      component: CheckingV7hlg
    },
    {
      path: '/Manage6S',
      name: 'manage6S',
      component: Manage6S
    },
    {
      path: '/CarsV21',
      name: 'cars',
      component: CarsV21
    },
    {
      path: '/CarsV20',
      name: 'cars',
      component: CarsV20
    },
    {
      path: '/CarsV10',
      name: 'cars',
      component: CarsV10
    },
    {
      path: '/CarshlgV21',
      name: 'carshlg',
      component: CarshlgV21
    },
    {
      path: '/CarsHLGV30',
      name: 'carshlgv30',
      component: CarsHLGV30
    },
    {
      path: '/CarsHLGV31',
      name: 'carshlgv31',
      component: CarsHLGV31
    },
    {
      path: '/CarsNKV31',
      name: 'carsnkv31',
      component: CarsNKV31
    },
    {
      path: '/CarsHistoryInfor',
      name: 'carshistoryinfor',
      component: CarsHistoryInfor
    },
    {
      path: '/CarsHistoryInforNK',
      name: 'carshistoryinfornk',
      component: CarsHistoryInforNK
    },
		 {
		 	path: '/Monitor',
		 	name: 'montior',
		 	component: Monitor
		 },
     {
      path: '/HomeGuide',
      name: 'homeguide',
      component: HomeGuide
    },
    {
      path: '/CameraMonitoring',
      name: 'cameramonitoring',
      component: CameraMonitoring
    },
		{
			path: '/ControlLog',
			name: 'controllog',
			component: ControlLog
		},
    {
      path: '/DeviceSafeOnline',
      name: 'devicesafeonline',
      component: DeviceSafeOnline
    },
		{
			path: '/equipmentSafety',
			name: 'equipmentsafety',
			component: equipmentSafety
		},
		{
			path: '/HVList',
			name: 'HistoryVersion',
			component: HistoryVersion
    },
    {
			path: '/CheckingJt',
			name: 'CheckingJt',
			component: CheckingJt
    },
    {
      path: '/CheckingJtSubcompany',
			name: 'CheckingJtSubcompany',
			component: CheckingJtSubcompany
    }
  ]
})
