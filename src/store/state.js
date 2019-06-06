

export default {
    baseUrl: 'http://10.19.7.69:8083', //测试环境----首页路径========后面没用将去掉(现在区域视频管理用了)
    /**========================考勤页面checking start==========================**/
    centername: '', // 当前选中的加工中心
    allCenterList: [], // 加工中心列表
    selectedSubcompany: '', // 选中的子公司
    selectedSubcompanyTime: '北京总部', // 选中的子公司（计时）
    selectedTabCheckingBetween: 'kaoqin', // 考勤页面选中的tab项
    checkRadarList:[],//考勤雷达图
		isMachineShow:true,
		machineSecondShow:false,
		departmentShow:true,
		departmentSecondShow:false,
		centerDialogShow:false,
		jgldShow:false,
		gyData:null,
    tableHeight:350,
    energyListData: {
      list: [],
      totalCount: 0,
      page: 1
    }, // 能源指标列表
    energyDayEchartsData: {
      xAxis: [], // x轴
      bootRate: [], // 开机率
      workRate: [], // 作业率
      totalConsumPower: [] // 能耗

    }, // 能源本日数据
    energyMonthEchartsData: {
      xAxis: [], // x轴
      bootRate: [], // 开机率
      workRate: [], // 作业率
      totalConsumPower: [] // 能耗
    }, // 能源本月数据
    energyYearEchartsData: {
      xAxis: [], // x轴
      bootRate: [], // 开机率
      workRate: [], // 作业率
      totalConsumPower: [] // 能耗
    }, // 能源本年数据
    /**========================考勤页面checking end==========================**/
    /**========================考勤页面checkingHistory start==========================**/
    checkingHistoryQueryDate: '', // 顶部查询日期
    checkingHistoryQueryFlag: 'DAY', // 顶部白夜班标识
    /**========================考勤页面checkingHistory end==========================**/
    //20190513设备监控管理中心
    sbhlOverViewSelectedCompany:'', // overview页面选中的子公司
    //点击工艺类型内部内容
    titleObj:{},
}
