import Vue from 'vue'
import Router from 'vue-router'
// import Checking from '../views/Checking.vue'

// 主页
const HomeGuide = () => import('../components/HomeGuide/HomeGuide.vue');
//历史版本
const HistoryVersion = () => import('../components/HomeGuide/HistoryVersion.vue');
/* ===========================考勤页面(所有版本) start========================================= */
const CheckingV1 = () => import('../views/Checking/Checking-v20181201.vue'); // (第1.0版)
// const CheckingV1 = () => import('../views/Checking.vue');
const CheckingV2 = () => import('../views/Checking2.vue');
const CheckingV3 = () => import('../views/CheckingSelectSubCompany.vue');
const CheckingV4 = () => import('../views/Checking/Checking-v20190211.vue'); // 最新版本
const CheckingV5 = () => import('../views/Checking/Checking-v20190213.vue'); // 当前正在开发版本
/* ===========================考勤页面 end========================================= */

// 6S管理
const Manage6S = () => import('../views/Manage6S.vue');
// 车辆管理页面（所有版本）
const CarsV10 = () => import('../views/Cars/Cars-v1-0117.vue');//南口车辆(第1.0版)
const CarsV20 = () => import('../views/Cars/Cars-v2-0211.vue');//南口车辆(第2.0版)
const CarsV21 = () => import('../views/Cars/Cars-v2-0131.vue');///南口车辆(第2.1版)
const CarshlgV21 = () => import('../views/Cars/Cars-v2-0214-hlg.vue');//回龙观车辆(第2.1版)
const CarsHLGV30 = () => import('../views/Cars/Cars-v3-0215.vue');//回龙观车辆(第3.0版)
const CarsHLGV31 = () => import('../views/Cars/Cars-v3-0218.vue');//回龙观车辆(第3.1版)

// 设备监控
const Monitor = () => import('../views/Monitor.vue');
// 电流
const CameraMonitoring = () => import('../views/CameraMonitoring.vue');

const ControlLog = () => import('../views/ControlLog.vue');
//设备安全在线
const DeviceSafeOnline = () => import('../views/DeviceSafeOnline.vue');
//视觉设备安全在线
const equipmentSafety = () => import('../views/equipmentSafety.vue');




// import Checking from '../views/CheckingSelectSubCompany.vue'
// import Manage6S from '../views/Manage6S.vue'
// import Cars from '../views/Cars.vue'
// import Monitor from '../views/Monitor.vue'

// import HomeGuide from '../components/HomeGuide/HomeGuide.vue'

// import Device from '../views/Device.vue'
// import CameraMonitoring from '../views/CameraMonitoring.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'HomeGuide',
    },
    {
      path: '/CheckingV1',
      name: 'checkingv1',
      component: CheckingV1
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
    /* {
      path: '/device',
      name: 'device',
      component: Device
    } */
  ]
})
