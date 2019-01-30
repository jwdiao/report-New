import Vue from 'vue'
import Router from 'vue-router'
// import Checking from '../views/Checking.vue'

// 主页
const HomeGuide = () => import('../components/HomeGuide/HomeGuide.vue');
// 考勤页面
const Checking = () => import('../views/CheckingSelectSubCompany.vue');
// 6S管理
const Manage6S = () => import('../views/Manage6S.vue');
// 车辆
const Cars = () => import('../views/Cars.vue');
// 设备监控
const Monitor = () => import('../views/Monitor.vue');
// 电流
const CameraMonitoring = () => import('../views/CameraMonitoring.vue');

const ControlLog = () => import('../views/ControlLog.vue');
//设备安全在线
const DeviceSafeOnline = () => import('../views/DeviceSafeOnline.vue');



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
      path: '/Checking',
      name: 'checking',
      component: Checking
    },
    {
      path: '/Manage6S',
      name: 'manage6S',
      component: Manage6S
    },
    {
      path: '/Cars',
      name: 'cars',
      component: Cars
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
    /* {
      path: '/device',
      name: 'device',
      component: Device
    } */
  ]
})
