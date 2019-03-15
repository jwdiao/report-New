<template>
  <div class="energyDevice">
    <!-- 头部 start -->
    <div class="energyDevice_top">
      <div class="back" @click="$router.push('/CheckingV7')"></div>
      <div class="title"><span @click="showSelectDialog"  v-text="titleText"></span></div>
      <em class="time" v-text="currentTime"></em>
    </div>
    <!-- 头部 end -->
    <!-- 头部下拉 start -->
    <div class="energyDevice_selectDialog" v-show="selectDialogShow">
      <ul>
        <li>
          <p class="title">事业部</p>
          <div class="common_select">
            <el-select
            v-model="careerValue"
            @change="careerChange"
            placeholder="请选择"
            >
              <el-option
                v-for="item in careerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <p class="title">子公司</p>
          <div class="common_select">
            <el-select
            v-model="companyValue"
            placeholder="请选择"
            >
              <el-option
                v-for="item in companyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <span class="btn confirm" @click="handleConfirm">确定</span>
          <span class="btn cancel" @click="handleCancel">取消</span>
        </li>
      </ul>
    </div>
    <!-- 头部下拉 end -->
    <!-- main start -->
    <div class="energyDevice_main">
      <div class="energyDevice_left" id="energyDeviceLeft">
        <div class="energyDevice_leftHead">
          <div class="centername" @click="isClosedCenternameDialog=false">
            <span class="circle">•</span>
            <span class="text">{{centerName?centerName:'北京桩机'}}</span>
            <!-- <img src="../../assets/images/icon-triangle.png" /> -->
            <div class="triangle_border-right">
              <span></span>
            </div>
          </div>
          <ul class="btnBox">
            <li><img src="../../assets/images/icon_camera-green.png" />有监控</li>
            <li><img src="../../assets/images/icon_camera-gray.png" />无监控</li>
          </ul>
        </div>
        <div class="energyDevice_leftCon">
          <table>
            <thead>
            <tr>
              <th class="nums">序号</th>
              <th class="">设备名称</th>
              <th class="camera">摄像头</th>
              <th class="status">工作状态</th>
            </tr>
            </thead>
          </table>
          <div style="width:100%;height:670px;" id="energyDeviceTable">
          <el-scrollbar style="height:100%;width:100%;">
          <table style="width:100%;100%;" v-if="deviceList.length>0">           
            <tbody>
              <!-- class="selectedTr" -->
              <tr
                v-for="(item) in deviceList"
                :key="item.num"
                :class="{selectedTr:currentDeviceObj.num==item.num}"
                @click="handleSeletedCurrentDevice(item)">
                <td class="nums">{{item.num}}</td>
                <td>{{item.deviceName}}</td>
                <td class="camera">
                  <!-- 1：停机； 2：工作；4：待机；5：离线 -->
                  <img v-show="item.isFlag==1" src="../../assets/images/icon_camera-green.png" />
                  <img v-show="item.isFlag!=1"  src="../../assets/images/icon_camera-gray.png" />
                </td>
                <td class="status">
                  <span v-show="item.deviceStatus==1" style="color:#fe5985">停机</span>
                  <span v-show="item.deviceStatus==2" style="color:#42cb84">工作</span>
                  <span v-show="item.deviceStatus==4" style="color:#ffd641">待机</span>
                  <span v-show="item.deviceStatus==5||item.deviceStatus==0" style="color:#999999">离线</span>
                </td>
              </tr>
            </tbody>
          </table>
          </el-scrollbar>
          </div>
        </div>
        <!-- :page-sizes="[30, 40, 50]" sizes, -->
        <div class="common_paginaton energyDevice_leftFooter" v-if="deviceList.length>0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
             :pager-count="5" :page-size="pagination.pageSize" layout="total, prev, pager, next" :total="pagination.total">
          </el-pagination>
        </div>
      </div>
      <div class="energyDevice_con">
        <div :class="{energyDevice_conTop:true,isAllScreen:allScreen}">
          <div class="energyDevice_cameraTitle">
            <span v-show="currentDeviceObj.deviceName">
              设备名称：{{currentDeviceObj.deviceName}}
              &nbsp;/&nbsp;
              摄像头名称：{{currentDeviceObj.cameraName}}
            </span>
            <el-button type="primary" size="mini" style="float:right;" @click="allScreenLook">{{screenMessage}}</el-button>
          </div>
          <div class="energyDevice_cameraBox">
            <object classid="clsid:461284E8-135D-44B3-BD59-549150A773EC"
								id="spv" width="100%" height="100%"> </object>
          </div>
        </div>
        <!-- @mouseover="isFocusPaigong = true" @mouseout="isFocusPaigong = false"-->
        <div class="energyDevice_conBottom">
          <div class="energyDevice_paigong"
              >
            <p class="title"><span class="circle">•</span>派工信息</p>
            <div class="content"
              style="text-align: center;padding-top: 70px;font-size: 14px;"
              v-if="currentDeviceObj.paigongList&&currentDeviceObj.paigongList.length<=0">暂无派工</div>
            <div class="content" v-else>
              <div class="energyDevice_paigong_thead">
                <span>姓名</span>
                <span>工作时长</span>
              </div>
              <div class="energyDevice_paigong_tbody">
                 <el-scrollbar style="height:100%;width:100%;">
                  <div
                      class="energyDevice_paigong_td"
                      v-for="(item, index) in currentDeviceObj.paigongList"
                      @mouseover="handleCurrentPaigongInfo(item)"
                      @mouseout="isFocusPaigong=false"
                      :class="{selectedTr:(isFocusPaigong&&currentPersonWorkInfo.workNo==item.workNo)||isFocusPaigongPopup&&currentPersonWorkInfo.workNo==item.workNo}"
                      :key="index"
                    >
                      <div class="energyDevice_paigong_tdCon">
                        <span>{{item.workName}}</span>
                        <span>{{item.workHour}}</span>
                      </div>
                  </div>              
                </el-scrollbar>
                <div class="tipComponentWrapper"
                    @mouseover="isFocusPaigongPopup=true"
                    @mouseout="isFocusPaigongPopup=false"
                    v-show="isFocusPaigong || isFocusPaigongPopup"
                >
                  <div class="tipComponent"
                  >
                      <div class="rectangle">
                        <el-scrollbar style="height:100%;width:100%;">
                          <ul>
                            <li v-for="(item,index) in currentPersonWorkInfo.workPlanList" :key="index">
                              <div class="item">
                                <label>开始时间</label><span>{{item.startworktime}}</span>
                              </div>
                              <div class="item">
                                <label>结束时间</label><span>{{item.endworktime}}</span>
                              </div>
                              <div class="item">
                                <label>时长</label><span>{{item.workHour}}</span>
                              </div>
                            </li>
                          </ul>
                        </el-scrollbar>
                      </div>
                      <div class="triangle">
                          <div class="triangle_inner"></div>
                      </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="energyDevice_workStatus">
            <p class="title"><span class="circle">•</span>设备工作状态信息</p>
            <div class="content">
              <ul>
                <li>
                  <label class="text">开机小时数</label>
                  <span class="nums">{{singleDeviceInfoObj.bootHours?singleDeviceInfoObj.bootHours:0}}h</span>
                </li>
                <li>
                  <label class="text">作业小时数</label>
                  <span class="nums">{{singleDeviceInfoObj.workHours?singleDeviceInfoObj.workHours:0}}h</span>
                </li>
                <li>
                  <label class="text">开机率</label>
                  <span class="nums">{{Math.round(singleDeviceInfoObj.bootRate*100)/100}}%</span>
                </li>
                <li>
                  <label class="text">作业率</label>
                  <span class="nums">{{Math.round(singleDeviceInfoObj.workRate*100)/100}}%</span>
                </li>
                <li>
                  <label class="text">总耗电量</label>
                  <span class="nums">{{singleDeviceInfoObj.totalConsumPower?singleDeviceInfoObj.totalConsumPower:0}}度</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="energyDevice_dianLiu">
            <div class="top">
              <div class="title">
                <span class="circle">•</span>
                <span class="text">设备实时电流图</span>
              </div>
              <div class="dianbiao">
                <el-select
                  class="common_select"
                  v-model="dianbiaoValue"
                  placeholder="请选择"
                  @change="dianbiaoChange"
                  size="mini">
                  <el-option
                    v-for="item in dianbiaoOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <ul class="dianliuTab">
                <li
                v-for="(item) in tabDian"
                :key="item.id"
                :class="{spantab:true,current:activespan==item.id}"
                @click="spantab(item.id)">{{item.message}}</li>
              </ul>
            </div>
            <div class="bottom">
              <div id="elecbox" style="width:100%;height:100%;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="energyDevice_right">
        <div class="item" style="height:260px;">
          <p class="title"><span class="circle">•</span>{{centerName?centerName:'北京桩机'}}</p>
          <div class="content">
            <!-- <el-scrollbar style="height:100%;"> -->
            <ul>
                <li>
                  <label class="text">开机小时数</label>
                  <span class="nums">{{deviceInfoCenterNameObj.bootHours?deviceInfoCenterNameObj.bootHours:0}}h</span>
                </li>
                <li>
                  <label class="text">作业小时数</label>
                  <span class="nums">{{deviceInfoCenterNameObj.workHours?deviceInfoCenterNameObj.workHours:0}}h</span>
                </li>
                <li>
                  <label class="text">开机率</label>
                  <span class="nums" v-show="deviceInfoCenterNameObj.bootRate">{{Math.round(deviceInfoCenterNameObj.bootRate*100)/100}}%</span>
                  <span class="nums" v-show="!deviceInfoCenterNameObj.bootRate"></span>
                </li>
                <li>
                  <label class="text">作业率</label>
                  <span class="nums" v-show="deviceInfoCenterNameObj.workRate">{{Math.round(deviceInfoCenterNameObj.workRate*100)/100}}%</span>
                  <span class="nums" v-show="!deviceInfoCenterNameObj.workRate"></span>
                </li>
                <li>
                  <label class="text">总耗电量</label>
                  <span class="nums">{{deviceInfoCenterNameObj.totalConsumPower?deviceInfoCenterNameObj.totalConsumPower:''}}度</span>
                </li>
              </ul>
            <!-- </el-scrollbar> -->
          </div>
        </div>
        <div class="item item-check" style="">
          <p class="title"><span class="circle">•</span>人员考勤看板</p>
          <div class="content">
            <el-scrollbar style="height:100%;">
            <ul>
              <li>
                <label class="text">派工人数(白)</label>
                <span class="nums" v-show="dayOrNightStatus==='白班'" v-text="baseInfoObj.planNum"></span>
                <span class="nums" v-show="dayOrNightStatus==='夜班'" v-text="baseInfoObj.dayPlanTotalNum"></span>
              </li>
              <li>
                <label class="text">派工人数(夜)</label>
                <span class="nums" v-show="dayOrNightStatus==='白班'" v-text="baseInfoObj.nightPlanTotalNum"></span>
                <span class="nums" v-show="dayOrNightStatus==='夜班'" v-text="baseInfoObj.planNum"></span>
              </li>
              <li>
                <label class="text">考勤人数</label>
                <span class="nums">{{baseInfoObj.userRecordNum?baseInfoObj.userRecordNum:0}}</span>
              </li>
              <li>
                <label class="text">考勤时间</label>
                <span class="nums" v-show="baseInfoObj.recordTime">{{Math.round(baseInfoObj.recordTime*10)/10}}h</span>
                <span class="nums" v-show="!baseInfoObj.recordTime">0h</span>
              </li>             
              <li>
                <label class="text">有效在岗人数</label>
                <span class="nums">{{baseInfoObj.validNum?baseInfoObj.validNum:0}}</span>
              </li>
              <li>
                <label class="text">有效在岗时间</label>
                <span class="nums" v-show="baseInfoObj.onWorkTime">{{Math.round(baseInfoObj.onWorkTime*10)/10}}h</span>
                <span class="nums" v-show="!baseInfoObj.onWorkTime">0h</span>
              </li>
            </ul>
            </el-scrollbar>
          </div>
        </div>
        <div class="item" style="height:300px;">
          <p class="title"><span class="circle">•</span>人员雷达图</p>
          <div class="content">
            <!--雷达图开始-->
            <div class="checking_item-wrapper radarChartBox" :id="`radarChartPerson`" style="height:100%;width:100%;">
            </div>
            <!--雷达图结束-->
          </div>
        </div>
      </div>
    </div>
    <!-- main end -->
    <!-- 加工中心弹窗 -->
    <!-- :class="{off:isClosedCenternameDialog}" -->
    <div class="home_container" :class="{off:isClosedCenternameDialog}">
      <header class="home_container_title" @click="getCenterInfo('')">
        北京桩机
      </header>
      <img class="close" src="../../assets/images/close.png" @click="isClosedCenternameDialog=true" />
      <ul class="home_container_list">
        <li v-for="(centerItem,index) in allCenterList" :key="index" :ref="index" @click="getCenterInfo(centerItem)">{{centerItem}}</li>
      </ul>
    </div>
    <!-- 加工中心弹窗end -->

  </div>
</template>

<script>
import moment from 'moment'
import echarts from 'echarts'
import http from '../../api/http'
import {InitSpvx, SetLocalParam, SetToolBar, playVideoByOcx, getPreviewParamByUuid} from '../../assets/js/ocx2.js'
import {
  getDeviceByCenter,
  getWorkPlanByDeviceCode,
  getSingleDeviceInfo,
  getNewCurrentInfo, //电流
  getNewCurrentsInfo2, // 电流
  getRecordRadarChartByCenter
} from '../../api'
import {
  getAttendanceData,
  getCenternameList
} from '../../api/checkingApi'

export default {
  name: 'EnergyDeviceInfo',
  components: {
  },
  data () {
    return {
      screenMessage: '点击查看全屏',
      allScreen:false,//是否全屏显示开关
      currentTime: '', // 系统当前时间
      selectDialogShow: false, // 是否显示顶部事业部子公司弹窗
      careerValue: '', // 点击标题下拉事业部选中值
      careerOptions: [ // 事业部下拉option
        {label:'三一重机事业部',value:'zhongji'},
        {label:'泵送事业部',value:'bengsong'}   
      ],
      companyValue: '', // 子公司选中值
      companyOptions: [], // 子公司option
      titleText: '北京三一桩机三现数据中心',

      centerName: '钻具工作中心', // 加工中心
      currentCenterName: '', // 截取后的加工中心名字
      isClosedCenternameDialog: true, // 加工中心弹窗是否关闭
      allCenterList: [], // 加工中心数组
      dayOrNightStatus: '', // 白班或者夜班
      deviceInfoCenterNameObj: {
        bootHours:0,
        workHours:0,
        bootRate:0,
        workRate:0,
        totalConsumPower: 0
      }, // 右侧当前工作中心的所有设备信息
      baseInfoObj: {}, // 右侧考勤基本信息
      checkRadarList:[], // 右侧考勤雷达图数据
      deviceList: [], // 左侧表格列表
      pagination: { // 左侧表格分页
        currentPage: 1,
        pageSize: 25,
        total: 0
      },
      currentDeviceObj: {}, // 当前选中的设备
      singleDeviceInfoObj: {
        bootHours:0,
        workHours:0,
        bootRate:0,
        workRate:0,
        totalConsumPower: 0
      }, // 单个设备的信息
      
      
      // 电流
      tabDian: [{
        id: 'la',
        message: 'la'
      }, {
        id: 'lb',
        message: 'lb'
      }, {
        id: 'lc',
        message: 'lc'
      }],
      activespan: 'la', // 电流tab默认选中
      dianliuId: '', // 电流id
      myChartDidanliu: '',
      dianliuData: [], // 电流数据
      dianbiaoOptions: [], // 电表下拉
      dianbiaoValue: '', // 电表选中值
      allEchartsArr: [],
      isShowPaigongPopup: false, //是否显示派工弹窗 ===中间底部
      isFocusPaigong: false,
      isFocusPaigongPopup: false,
      currentPersonWorkInfo: {} // 当前人的派工数据
    }
  },
  mounted () {
    // 顶部日期时间
    this.currentTime = this.getCurrentDateTime() // 显示顶部时间
    this.timerId = setInterval(() => {
      this.currentTime = this.getCurrentDateTime() // 显示顶部时间
      this.getDayOrNightTextFun() // 显示顶部显示白夜班
    }, 1000)

    // this.$store.commit('changeSubcompanyMut',this.centerName)


    // 解决刷新页面加工中心保存不住的问题
    this.centerName = this.$route.params.centerName
    if(this.$route.params.centerName){
      localStorage.setItem('deviceCenterName',this.$route.params.centerName)
    }
    
    if (!this.$route.params.centerName){
    this.centerName = localStorage.getItem('deviceCenterName')
    }

    // 电流
    this.myChartDidanliu = echarts.init(document.getElementById("elecbox"))
    this.allEchartsArr.push(this.myChartDidanliu)

    // 获取初始数据
    this.getCenterNameData()
    this.getAllRequest()
    this.setTableContainerHeight();

    // oct start
    var ocxObj = document.getElementById('spv'), initRet = InitSpvx(ocxObj);
    if (initRet === 0) {
      // 设置OCX本地参数
      var localParamRet = SetLocalParam(ocxObj);
      if (localParamRet === 0) {
        // 设置工具栏
        // setTimeout(function() {
        //   SetToolBar(ocxObj);
        // }, 500);        
      }
    }
    // ocx end=====


    // document.documentElement.addEventListener('resize',this.handleResize)
    const that = this;
    window.onresize = function(){
      that.setTableContainerHeight()
    }
  },
  methods: {
    handleCurrentPaigongInfo(data) {
      this.currentPersonWorkInfo = data
      this.isFocusPaigong = true
    },
/*     handleCurrentPaigongInfoMouseout() {
        this.isFocusPaigong = false
        this.currentPersonWorkInfo = {}
    }, */
    allScreenLook(){//全屏按钮点击事件函数
      this.allScreen=!this.allScreen;
      this.screenMessage = this.screenMessage=="点击查看全屏"?"还原":"点击查看全屏";
    },
    // 设置左侧表格高度
    setTableContainerHeight () {
      var leftBox = document.getElementById('energyDeviceLeft')
      var tableBox = document.getElementById('energyDeviceTable');
      var contentHeight = leftBox.clientHeight-32-43-47-40-10
      tableBox.style.height=contentHeight+'px'
    },
    // 点击标题回到首页
    enterIndexPage (path) {
      this.$router.replace(path)
    },
    // 时间格式化
    getCurrentDateTime () {
      return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    /**
     * 方法名：getDayOrNightTextFun
     * 描述：判断是白班还是夜班
     */
    getDayOrNightTextFun () {
      var timeY = this.currentTime.substring(11, 13)
      if (timeY >= 8 && timeY < 20) {
        this.dayOrNightStatus = '白班'
      } else {
        this.dayOrNightStatus = '夜班'
      }
    },

    // 顶部选择事业部弹窗显示
    showSelectDialog () {
      // this.selectDialogShow = true
    },
    careerChange (val) {
      // console.log(`选择的事业部是：${val}`)
      this.companyOptions = []
      this.companyValue = ''
      if (val === 'bengsong') {
        this.companyOptions = [
          {label:'长沙泵送',value:'长沙泵送'},
          {label:'邵阳湖汽',value:'邵阳湖汽'},
        ]
      } else if (val === 'zhongji') {
        this.companyOptions = [{label:'北京桩机',value:'北京桩机'},]
      }
    },
    handleConfirm () {
      // console.log('选择的子公司是：',this.companyValue)
      if (!this.careerValue) {
        this.$message({
          type: 'warning',
          message: '请选择事业部!',
          customClass: 'messageInfo'
        });
        return;
      }
      if (this.companyValue === '') {
        this.$message({
          type: 'warning',
          message: '请选择子公司!'
        });
        return;
      }

      if (this.companyValue === '长沙泵送'){
        axios.defaults.baseURL = 'http://10.0.91.50:8083'
      } else if (this.companyValue === '邵阳湖汽'){
        axios.defaults.baseURL = 'http://10.13.136.22:8083'    
      } else if (this.companyValue === '北京桩机') {
        axios.defaults.baseURL = 'http://10.19.7.69:8083'
      }

      clearInterval(this.refreshDataId)
      this.selectDialogShow = false // 关闭弹窗
      this.titleText = `${this.companyValue}三现数据中心` // 顶部显示的文字

      this.$store.commit('changeSubcompanyMut',this.companyValue) // 选中的子公司


    },
    // 关闭顶部选择事业部弹窗
    handleCancel () {
      this.selectDialogShow = false
    },
    // 右侧==获取所有的加工中心
    async getCenterNameData () {
      const res = await getCenternameList()
      if (res && res.data && res.data.ret === '200') {
        const {centernameList, ret} = res.data
        this.allCenterList = centernameList.map((ele) => {
          return ele.threeleveldep
        })
      }
    },
    // 获取所有的请求
    getAllRequest () {
      // 获取右侧当前工作中心的设备信息
      this.getDeviceInfoCenterName()
      // 获取右侧雷达图
      this.getRecordRadarChartByCenterFun()
      // 获取右侧
      this.getAttendanceDataFun()

      // 左侧表格数据
      this.getDataList()
    },
    getCenterInfo (item) {
      // 调用发请求
      this.isClosedCenternameDialog = true
      this.centerName = item
      this.pagination.currentPage = 1
      this.getAllRequest()     
    },
    // 右侧所有设备信息
    async getDeviceInfoCenterName () {
      const res = await getSingleDeviceInfo('all',this.centerName)
      // console.log('获取的所有设备的工作状态：',res)
      if(res&&res.status===200&&res.data.ret==='200'){
        if (res.data.data && res.data.data!==null){
          this.deviceInfoCenterNameObj = res.data.data
        }
      }
    },
    // 右侧获取考勤信息
    async getAttendanceDataFun () {
      const res = await getAttendanceData(this.centerName)
      // console.log('获取的考勤数据是：', res)
      if (res && res.status === 200 && res.data && res.data.ret === '200' && res.data.titledata) {
        this.baseInfoObj = res.data.titledata
      } else {
        this.baseInfoObj = {
          lateNum: 0, // 迟到
          outNum: 0, // 早退
          absentNum: 0, // 旷工
          abnormalNum: 0, // 未派工
          totalNum: 0, // 计件总人数
          planNum: 0,
          nightPlanTotalNum: 0,
          dayPlanTotalNum: 0,
          userRecordNum: 0, // 考勤人数
          recordTime: 0, // 考勤时间
          onWorkTime: 0, // 有效在岗时间
          workPlanRate: 0,
          recordRate: 0,
          onWorkRate: 0,
          validRate: 0
        }
      }
    },
    // 右侧获取雷达图
    async getRecordRadarChartByCenterFun () {
      const res = await getRecordRadarChartByCenter(this.centerName)
      // console.log('获取的雷达图数据是：', res)
      if (res && res.status===200 && res.data.ret==200 && res.data.data){
        // let arrys =  []
        // arrys.push(res.data.data)radarChartPerson
        this.getRecordRadarChart2(res.data.data)
      }
    },
    // 雷达图组织数据
    getRecordRadarChart2(dataObj){
      // var inDicatorArr = 
      let yichangNum = parseFloat(dataObj.lateNum)+parseFloat(dataObj.absentNum)+parseFloat(dataObj.outNum)+parseFloat(dataObj.abnormalNum)
      let zhengchangNum = parseFloat(dataObj.totalNum)-parseFloat(dataObj.lateNum)-parseFloat(dataObj.absentNum)-parseFloat(dataObj.outNum)-parseFloat(dataObj.abnormalNum)
      let yichangLv = ((zhengchangNum/parseFloat(dataObj.totalNum))*100).toFixed(2) // 异常率
      let paigongLv = dataObj.workPlanRate<=100?dataObj.workPlanRate:100 // 派工率
      let shanggangLv = dataObj.validRate<=100?dataObj.validRate:100 // 上岗率
      let zaigangLv = dataObj.onWorkRate<=100?dataObj.onWorkRate:100 // 在岗率
      let chuqinLv = dataObj.recordRate<=100?dataObj.recordRate:100 // 出勤率
      let totalLv = parseFloat(yichangLv) + parseFloat(paigongLv) + parseFloat(shanggangLv) + parseFloat(zaigangLv) + parseFloat(chuqinLv)
      var dataList = [paigongLv, yichangLv, shanggangLv, dataObj.onWorkRate, chuqinLv]
      // dataList.push([paigongLv, yichangLv, shanggangLv, dataObj.onWorkRate, chuqinLv]);
      let minValue = Math.min.apply(Math,[paigongLv, yichangLv, shanggangLv, zaigangLv, chuqinLv])
      if(minValue>50){
        minValue=50
      }
      var indicatorList = []
      indicatorList.push([{
        name: '派工(' + dataObj.planNum + '人)',
        max: 100,
				min: minValue
      }, {
        name: "异常\n(" + yichangNum + "人)",
        max: 100,
				min: minValue
      }, {
        name: '上岗\n(' + dataObj.validNum + '人)',
        max: 100,
				min: minValue
      }, {
        name: '在岗\n(' + dataObj.onWorkTime + 'h)',
        max: 100,
				min: minValue
      }, {
        name: '出勤\n(' + dataObj.userRecordNum + '人)',
        max: 100,
				min: minValue
      }]);
      // setTimeout(() => {
        this.rederEchartsRadar(document.getElementById("radarChartPerson"),
        indicatorList[0], dataList, dataObj.centerName)
      // })
    },
    // 雷达图渲染
    rederEchartsRadar(dom, inDicatorArr, zhengzhibiaoArr, centerName) {
      var myChart = echarts.init(dom);
      var option = null;
      option = {
        tooltip: {
          position: ['10%','20%'],
          formatter: function(params,ticket,callback){
            // console.log('params:',params)
            var objhtml = params.data.name+'<br />';
            var lvArr = params.data.value;
            // console.log('lvArr:',lvArr)
            for(var i=0;i<lvArr.length;i++){
              if(i===0){
                let str = '派工率：' + lvArr[i]+'%<br />';
                objhtml+=str
              }else if (i===1) {
                let str = '正常率：' + lvArr[i]+'%<br />';
                objhtml+=str
              }else if (i===2) {
                let str = '上岗率：' + lvArr[i]+'%<br />';
                objhtml+=str
              }else if(i===3){
                let str = '在岗率：' + lvArr[i]+'%<br />';
                objhtml+=str
              }else if(i===4){
                let str = '出勤率：' + lvArr[i]+'%'
                objhtml+=str
              }
              
            }
            return objhtml;
          }
        },
        radar: [{
          indicator: inDicatorArr,
          center: ['48%', '52%'],
          radius: 60,
          // startAngle: 90,
          splitNumber: 3,
          shape: 'circle',
          // nameGap: 8,
          name: {
            formatter: '{value}',
            textStyle: {
              // width:100,
              color: '#fff'//外部文字的颜色
            }
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(31, 65, 111, 0.5)',
                'rgba(31, 65, 111, 0.6)', 'rgba(31, 65, 111, 0.7)',
                'rgba(31, 65, 111, 0.8)', 'rgba(31, 65, 111, 0.8)'
              ],
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(31, 166, 213, 0.5)'//半径的颜色
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(32, 186, 233, 1)'//每一圈圆环的颜色
            }
          }
        }, ],
        series: [{
            name: '雷达图',
            type: 'radar',
            symbol: 'none',
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 4
                }
              }
            },
            lineStyle:{
              color:'rgba(182,198,39,0.8)'
            },
            data: [{
              value:zhengzhibiaoArr,
              name: centerName,
              areaStyle: {
                normal: {
                  // color: 'rgba(83, 227, 253, 0.5)'//遮罩层颜色
                  color: 'rgba(83, 227, 253, 0)'//遮罩层颜色
                }
              }
            }]
          }
        ]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    },
    // 左侧表格数据
    async getDataList () {
      const res = await getDeviceByCenter({
        centerName: this.centerName,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      })
      // console.log('table res:', res)
      if (res && res.status ===200 && res.data.ret === '200'){
        this.deviceList = res.data.deviceList
        this.deviceList.forEach((ele,index)=>{
					ele.num = (this.pagination.currentPage-1)*this.pagination.pageSize+index+1;
				})
        this.pagination.total = res.data.total
      }
      // 默认选中第一条
      if(this.deviceList.length>0){
        this.handleSeletedCurrentDevice(this.deviceList[0])
      }
    },
    // 分页
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getDataList()
    },
    // 分页
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getDataList()
    },
        /**
     * @since 播放视频
     * @param textInfo
     *            表头显示内容
     * @param camerauuid
     *            摄像头uuid
     * @returns
     */
    playVideo(camerauuid, companyCode, ocxId) {
      if (camerauuid) {
        // debugger;
        var	viewPath = getPreviewParamByUuid(camerauuid, 0, false, companyCode);
        // OCX播放
        if (viewPath) {
          var ocxObj = document.getElementById(ocxId);
          var playRet = playVideoByOcx(ocxObj, viewPath);
          if (playRet === 0) {
          }
        }
        /* var ocxObj = document.getElementById(ocxId);
        getPreviewParam('', 0, 0 , camerauuid, false, companyCode,ocxObj); */
      }
    },
    // 点击表格一条
    async handleSeletedCurrentDevice (item) {
      // console.log('选中的数据：',item) //cameraUuid==null item.deviceCode
      // const getWorkPlanByDeviceCodeData = await getWorkPlanByDeviceCode('D2018092505248')
      const getWorkPlanByDeviceCodeData = await getWorkPlanByDeviceCode(item.deviceCode)
      // debugger
      this.currentDeviceObj = item;
      if (getWorkPlanByDeviceCodeData && getWorkPlanByDeviceCodeData.data && getWorkPlanByDeviceCodeData.data.data) {
        this.currentDeviceObj.paigongList = getWorkPlanByDeviceCodeData.data.data
      } else {
        this.currentDeviceObj.paigongList = []
      }
      
      
      /* this.currentDeviceObj.paigongList = [
        {
          id: '123',
          name: workName,
          allWorkTime: '2h',
          workObj: [
            {
              startWorkTime: '2019.03.01  08:20',
              endWorkTime: '2019.03.02  08:20',
              workTime: '1h',
            },
            {
              startWorkTime: '2019.03.03  08:20',
              endWorkTime: '2019.03.04  08:20',
              workTime: '2h',
            },
            {
              startWorkTime: '2019.03.05  08:20',
              endWorkTime: '2019.03.06  08:20',
              workTime: '3h',
            }
          ]
        },
        {
          id: '456',
          name: '张三2',
          allWorkTime: '4h',
          workObj: [
            {
              startWorkTime: '2019.03.07  08:20',
              endWorkTime: '2019.03.07  08:20',
              workTime: '4h',
            },
            {
              startWorkTime: '2019.03.08  08:20',
              endWorkTime: '2019.03.08  08:20',
              workTime: '5h',
            },
            {
              startWorkTime: '2019.03.09  08:20',
              endWorkTime: '2019.03.09  08:20',
              workTime: '6h',
            }
          ]
        },
        {
          id: '789',
          name: '张三3',
          allWorkTime: '6h',
          workObj: [
            {
              startWorkTime: '2019.03.10  08:20',
              endWorkTime: '2019.03.11  08:20',
              workTime: '7h',
            },
            {
              startWorkTime: '2019.03.12  08:20',
              endWorkTime: '2019.03.13  08:20',
              workTime: '8h',
            },
            {
              startWorkTime: '2019.03.14  08:20',
              endWorkTime: '2019.03.15  08:20',
              workTime: '9h',
            }
          ]
        }
      ] */
      // 获取单个设备工作状态
      this.getSingleDeviceInfoData(item.deviceCode)

      // 获取ocx视频
      this.playVideo(item.cameraUuid, item.sxCompanyCode, 'spv');

      // 获取电表下拉项目数据
      this.dianbiaoOptions= []
      item.machineList.forEach(ele => {
        let labelStr = ele.deviceNo
        if (labelStr=="null" || !labelStr) {
          labelStr = ele.deviceName
        } else {
          labelStr = ele.deviceNo +'/' + ele.deviceName
        }
        const obj = {
          label: labelStr,
          value: ele.deviceUuid
        }
        this.dianbiaoOptions.push(obj)
      })
      this.dianbiaoValue = this.dianbiaoOptions[0].value
      // 获取电流
      clearInterval(this.dianliuId)
      this.dianliuData = []
      this.activespan = 'la'
      // setTimeout(()=>{
      this.renderDianliu(this.dianbiaoValue)
      // },1000)
      // this.renderDianliu('2M1X61HIHLC1')

      
    },
    async getSingleDeviceInfoData(deviceCode) {
      const res = await getSingleDeviceInfo(deviceCode)
      // console.log('获取的单个设备的工作状态：',res)
      if(res&&res.status===200&&res.data.ret==='200'){
        if (res.data.data && res.data.data!==null){
          this.singleDeviceInfoObj = res.data.data
        }
      }
    },
    dianbiaoChange (val) {
      clearInterval(this.dianliuId)
      this.dianliuData = []
      this.dianbiaoValue = val;
      this.renderDianliu(this.dianbiaoValue)
    },
    // 点击切换电流
    spantab(id) {
      this.activespan = id;
      clearInterval(this.dianliuId)
      this.dianliuData = []
      this.renderDianliu(this.dianbiaoValue)
    },
    numPad(number, length) {
      return (''+number).padStart(length, 0)
    },
    getFormatTimeString(now) {
      var str1 = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
      var str2 = [this.numPad(now.getHours(), 2), this.numPad(now.getMinutes(), 2), this.numPad(now.getSeconds(), 2)].join(':')
      return str1 + " " + str2;
    },
    // 2分钟获取电流
    async getDianliuTowMinuteData (id, currentDian) {
      const res = await getNewCurrentsInfo2(id)
      // console.log('获取的2分钟的电流数据：', result)
      if (res && res.data && res.data.code === 200) {
        const result = res.data
        let listArr = result.data
        for(var i=0;i<listArr.length;i++) {
          var obj = {}
          var newTime = new Date(listArr[i].timeStr)
          var time2 = this.getFormatTimeString(newTime)
          var yValue = ''
          if (currentDian == 'lb') {
            yValue = listArr[i].lb
          } else if (currentDian == 'lc') {
            yValue = listArr[i].lc
          } else {
            yValue = listArr[i].ia
          }
          if (yValue === null) {
            yValue = 0
          }
          obj.name = time2
          obj.value = [time2, yValue]
          this.dianliuData.push(obj)
        }
        // console.log('dianliuData:', this.dianliuData)
        this.dianliuId = setInterval(() => {          
          if (this.dianliuData.length > 120) {
            this.dianliuData.shift();
          }
          this.getDianliuDataOneSecond(id, this.activespan);
        }, 1000);
        // [
        //   { name: '2016/2/18 03:00:00', value: [ '2016/2/18 03:00:00', 363 ] },
        //   { name: '2016/2/18 03:00:00', value: [ '2016/2/18 04:00:00', 384 ] },
        //   { name: '2016/2/18 03:00:00', value: [ '2016/2/18 05:00:00', 371 ] },
        // ]
        // console.log("电流数组长度是：",this.dianliuData.length)
      }
    },
    // 1秒钟获取电流
    async getDianliuDataOneSecond (id, currentDian) {
      const res = await getNewCurrentInfo(id)
      if (res && res.data && res.data.code === 200 && res.data.data) {
        const result = res.data
        // console.log('获取的1s的电流数据：', result)
        let currentObj = result.data
        var obj = {}
        var newTime = new Date(currentObj.timeStr)
        var time2 = this.getFormatTimeString(newTime)
        var yValue = ''
        if (currentDian == 'lb') {
          yValue = currentObj.lb
        } else if (currentDian == 'lc') {
          yValue = currentObj.lc
        } else {
          yValue = currentObj.ia
        }
        if (yValue === null || yValue==0.0) {
          yValue = 0
        }
        obj.name = time2
        obj.value = [time2, yValue]
        let len = this.dianliuData.length;

        // 为了去除数组中重复数据中
        if (len === 0) {
          this.dianliuData.push(obj)
        }
        if (len>0 && this.dianliuData[len-1].name && this.dianliuData[len-1].name !== obj.name){
          this.dianliuData.push(obj)
        }
        // console.log('dianliuData:', this.dianliuData)
        // this.dianliuData.push(obj)
        this.myChartDidanliu.setOption({
          series: [{
            data: this.dianliuData
          }]
        });
      }
    },
    // 渲染电流
    async renderDianliu(deviceUuid) {

      var option = {
        title: {
          text: '动态数据 + 时间坐标轴',
          show: false
        },
        legend: {
          show: false,
          top: 0,
          right: 10,
          textStyle: {
            color: '#D3DAE2'
          }
        },

        grid: {
          top: 20,
          bottom: 20,
          left: 40,
          right: 40,
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            console.log('yyyy:',params)
            params = params[0];
            var date = new Date(params.name);
            return this.getFormatTimeString(date)+' '+params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          axisLine: {  // 控制x轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#293e60',
              width: '1'
            }
          },
          axisPointer: {
            type: 'shadow'
          },
          axisTick: { // 控制x轴坐标刻度不显示
            show: false
          },
          axisLabel : {
            textStyle: {
              color: '#2DD7EC'
            },
            // showMaxLabel: true, //是否显示最大 tick 的 label
            showMinLabel: true,
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value} ',
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: { //网格线
            show: true,
            lineStyle: {
              color: ['#293e60'],
              width: 1,
              type: 'dotted'
            }
            
          },
          axisLine: {  // 控制y轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#293e60',
              width: '1' }
          },
          axisTick: {
            show: false
          },
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
						animationDuration: 800,
          lineStyle: {
            color: '#ffd641'
          },
          data: [],
          // data: [
          //   { value: [ '2016/2/18 03:00:00', 363 ] },
          //   { value: [ '2016/2/18 04:00:00', 384 ] },
          //   { value: [ '2016/2/18 05:00:00', 371 ] },
          // ]
        }]
      };
      this.myChartDidanliu.setOption(option, true);


      // 刚开始获取最新的2分钟之内的数据
      this.getDianliuTowMinuteData(deviceUuid, this.activespan);



      // 定时器间隔1s请求1次
      /* setInterval(() => {
        if (this.dianliuData.length >= 120) {
          this.dianliuData.shift();
        }      
        this.getDianliuDataOneSecond(deviceUuid, this.activespan);
      }, 1000); */
    },
    // 浏览器窗口改变
    handleResize () {
      // debugger;
      this.setTableContainerHeight()
    },
    
  },
  destroyed () {
    clearInterval(this.timerId)
    clearInterval(this.dianliuId)
    // clearInterval(this.refreshDataId)
  }
}
</script>
<style lang="scss" scoped>
.energyDevice{
  height:100%;
  background-image: url(../../assets/images/body_bg.png);
  background-size: 100% 100%;
  color: rgb(255, 255, 255);
  background-repeat: no-repeat;overflow: hidden;
  font-size: 12px;
  &_top{
    color: #333;
    text-align: center;
    height: 110px !important;
    background: url(../../assets/images/body_title.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 20px;
    position: relative;overflow: hidden;
    .title {
      font-size: 0.44rem;
      color: #fff;
      font-weight: bold;
      height: 100%;
      width: 60%;
      margin: 0 auto;
      span {
        line-height:90px !important;cursor: pointer;
      }
    }
    .time{
      width: 250px;
      font-size: 0.32rem;
      right: 44px;
      color: #ababab;
      position: absolute;
      top: 70px;
      z-index: 10;
      text-align: left;
      font-family: fontnameUnidreamLED !important;
    }
    .back{
      width: 90px;
      height: 40px;
      background: url(../../assets/images/index_back.png) no-repeat;
      cursor: pointer;float: left;margin-top:45px;margin-left:15px;
    }
  }
  &_main{
    height: calc(100% - 110px - 25px);
    margin:10px 15px 15px 15px;
    display: flex;
    // border-top:1px solid red;
    /deep/ .el-scrollbar__wrap{overflow-x: hidden}
  }
  &_left{
    width: 420px;height:100%;
    border:1px solid #ff0;
    background-color: rgba(39, 69, 111, 0.3);
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    &Head{
      overflow: hidden;
      .centername{
        display: flex;align-items:center;float: left;cursor: pointer;
        .circle{font-size: 32px; color: rgb(2, 201, 252);}
        .text{
          font-size: 20px;
          color: #fff;
          margin-left: 5px;
          margin-right: 5px;
          max-width: 120px;
          height: 26px;
          overflow: hidden;
          display: block;
        }
      }
      .btnBox{
        float: right;margin-left:20px;
        height:30px;line-height:30px;margin-top:6px;
        background-color: rgba(42, 75, 133, 0.3);padding-left:15px;
        li{display: flex;align-items:center;float: left;padding-right:15px;}
        img{
          margin-right:10px;width: 20px;
        }
      }
    }
    &Con{
      margin-top:10px;
      table{
        width: 100%;font-size:16px;
        th,td{
          text-align: center;padding:0 1%;
        }
        .nums{
          width:40px;
        }
        .name{width:200px;}
        .camera{width:80px;}
        .status{width:90px;}
        thead{
          height:40px;line-height: 40px;font-size: 16px;
        }
        tbody{
          color:#51ddff;
          tr{
            height: 30px;
            line-height: 30px;
            background: rgba(56, 142, 237, 0.2);
            cursor: pointer;
          }
          tr:hover{
            background:#255895
          }
          tr.selectedTr{
            background:#255895
          }
          td{
            color: #80dcf5;                
            border-bottom: 2px solid #11213c;
            margin-bottom:2px;
          }

        }
      }
    }
    &Footer{
      margin-top:10px;
      height:32px;
    }
  }
  &_con{
    flex: 1;
    // margin:0 15px;
    padding-left: 15px;
    padding-right: 15px;
    float: left;
    height: 100%;
    // display: flex;
    // flex-direction: column;
    &Top{
      background-color: rgba(39, 69, 111, 0.3);
      padding: 15px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      // flex:1;
      height: calc(100% - 295px);
      .energyDevice_cameraTitle{
        font-size: 16px;overflow: hidden;
      }
      .energyDevice_cameraBox{
        // background:red;
        margin-top:15px;
        height: calc(100% - 55px);
      }
      &.isAllScreen{
				position:fixed;
				top:0;
				bottom:0;
				left:0;
				right:0;
        z-index: 99;
        height:100%;
				//padding: 20px;
				background: rgba(8, 33, 60, 0.9);
        .energyDevice_cameraBox{
          // height: 1000px
          height: calc(100% - 58px);
        }
			}
    }
    &Bottom{
      height:280px;margin-top:15px;overflow: hidden;
      position: relative;
      .energyDevice_paigong{
        height:100%;width: 260px;float: left;
        background-color: rgba(39, 69, 111, 0.3);
        padding: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        .title{
          height: 50px;line-height: 50px;padding:0 15px;
          font-size: 22px;color:#fff;
          background: rgba(58, 96, 133, 0.9);
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;display:flex;align-item:center;
          // font-weight:bold;
          .circle{
            margin-right: 5px; font-size: 32px; color: rgb(2, 201, 252);
          }
        }
        .content{
          background-color: rgba(42, 75, 133, 0.3);
          padding:15px;height: calc(100% - 50px);
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        &_thead{
          color:#fff;font-size:18px;
          span{
            width:50%;display: inline-block;text-align: center;
          }
        }
        
        &_tbody{
          height:150px;padding-top: 10px;
          .tipComponentWrapper{
              position: absolute;
              left: 260px;
              top: 0;
              width: 285px;
              height: 300px;
          }
          .tipComponent{
            left: 275px;
            top: 0;
            width: 270px;
            height: 300px;
            margin-left: 15px;
          }
          
          .rectangle{
              width: 100%;
              height: 280px;
              border: 1px solid rgba(77, 186, 242, 0.5);
              background: rgba(22, 47, 87, 0.9);
              font-size: 16px;
              li{
                border-top:1px solid #2d4471;
                padding:15px;
                .item{
                  margin-bottom:15px;
                  label{
                    width:65px;text-align: right;display: inline-block;
                  }
                  span{
                    width:auto;margin-left:10px;color:#53e3fd
                  }
                }
              }
          }
          .triangle{
              margin: 0px;
              border-width: 10px;
              border-style: solid;
              // border-color: black red blue yellow;
              border-color: transparent rgba(77, 186, 242, 1) transparent transparent;
              // border-color: black transparent transparent;
              padding: 0px; 
              width: 0px;
              height: 0px;
              left: -5px;
              top: 40%;
              position: absolute;
          }
          .triangle_inner{
              margin: 0px;
              border-width: 10px;
              border-style: solid;
              // border-color: red transparent transparent;
              border-color: transparent rgba(22, 47, 87, 1) transparent transparent;
              padding: 0px; 
              width: 0px;
              height: 0px;
              left: -9px;
              top:-10px;
              position: absolute;
          }
        }
        &_td{
         padding:4px 0;
          &Con{
            span{
              width:50%;display: inline-block;text-align: center;
              color:#51ddff;font-size:16px;
            }
          }
          .energyDevice_paigong_td--hover{
            display: block;
          }
          &:hover .energyDevice_paigong_td--hover{
            display: block;
          }
        }
      }
      .selectedTr{background:#255895}
      .energyDevice_workStatus{
        height:100%;width: 270px;float: left;margin-left:15px;
        background-color: rgba(39, 69, 111, 0.3);
        padding: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        .title{
          height: 50px;line-height: 50px;padding:0 15px;
          font-size: 22px;color:#fff;
          background: rgba(58, 96, 133, 0.9);
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;display:flex;align-item:center;
          // font-weight:bold;
          .circle{
            margin-right: 5px; font-size: 32px; color: rgb(2, 201, 252);
          }
        }
        .content{
          background-color: rgba(42, 75, 133, 0.3);
          padding:15px;height: calc(100% - 50px);
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          li{ margin-bottom: 5px; }
          .text{ font-size: 18px; color:#fff; float: left;text-align: right;width: 90px;}
          .nums{ font-size: 22px; color: #02c9fc;margin-left:8px;}
        }
      }
      .energyDevice_dianLiu{
        height:100%;margin-left:560px;
        background-color: rgba(39, 69, 111, 0.3);
        padding: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        .top{
          overflow: hidden;
          .title{
            display: flex;align-items:center;float: left;
            .circle{font-size: 32px; color: rgb(2, 201, 252);}
            .text{font-size: 20px;color:#fff;margin-left:5px;margin-right:5px;}
          }
          .dianbiao{
            float: left;
            padding-top:7px;margin-left:30px;
          }
          .dianliuTab{
            float: left;padding-top: 10px;margin-left:30px;
          }
          .spantab {
            width: 35px;
            border-radius: 3px;
            background: #333C4D;
            text-align: center;
            margin-right: 5px;
            float: left;cursor: pointer;
            padding:2px 10px;
          }

          .spantab.current {
            background: #26D9F9;
          }
        }
        .bottom{
          width: 100%;height: calc(100% - 42px);
        }
      }
    }
  }
  &_right{
    width: 290px;height:100%;
    // border:1px solid #ff0;
    display: flex;
    flex-direction: column;
    .item{
      
      background-color: rgba(39, 69, 111, 0.3);
      padding: 15px;
      // border: 1px solid rgba(255, 255, 255, 0.1);
      .title{
        height: 50px;line-height: 50px;padding:0 15px;
        font-size: 22px;color:#fff;
        background: rgba(58, 96, 133, 0.9);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;display:flex;align-item:center;
        // font-weight:bold;
        .circle{
          margin-right: 5px; font-size: 32px; color: rgb(2, 201, 252);
        }
      }
      .content{
        background-color: rgba(42, 75, 133, 0.3);
        padding:20px 15px;
        height: calc(100% - 50px);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        li{ margin-bottom: 2%; }
        .text{ /* font-size: 16px; */ color:#fff; float: left;text-align: right;width: 110px;font-size:0.18rem;}
        .nums{ /* font-size: 20px;  */color: #02c9fc;margin-left:15px;font-size: 0.2rem;}
      }
    }
    .item-check{
      // margin-top:15px;margin-bottom:15px;
      height: calc(100% - 260px - 300px);
      li{margin-bottom:4%;}
      /* /deep/ .el-scrollbar__view{
        height:100%;
        display: flex;
        align-items: center;
      } */
    }
  }

  &_selectDialog{
    background-color: rgba(9, 20, 40, 0.8);border:1px solid #6bb9d5;
    position:fixed;top:105px;z-index:999;left:50%;transform: translateX(-50%);
    padding:28px 60px 48px;
    width:420px;margin:0 auto;font-size:12px;
    .title{font-size:20px;color:#fff;margin-top:20px;}
    .common_select{margin-top:10px;}
    .el-select{
      width:100%;
    }
    /deep/ .el-input__inner {
        height: 38px !important;
        line-height: 38px !important;
    }
    .btn{
      height:40px;line-height:40px;display: inline-block;font-size:20px;
      text-align: center;border-radius: 4px;margin-top:30px;width:48%;
    }
    .confirm{
      background-color: #0088ff;color:#fff;cursor: pointer;
    }
    .cancel{
      margin-left:4%;
      background-color: #b3b3bd;color:#0c1932;cursor: pointer;
    }
  }

  // 加工中心弹窗
  .home_container{
    width: 420px;
    background-color: #0e2154;
    opacity: 0.9;
    position: absolute;
    top: 180px;
    bottom: 30px;
    left: 15px;
    z-index: 100;
    text-align: center;
    &.off{
      display: none;
      transition: 1s;
    }
    &_title{
      color: yellow;
      font-size: 24px;
      margin-top: 60px;
      cursor: pointer;
    }
    .close{
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 30px;
      color: #1578CF;
      &:hover{
        cursor: pointer;
      }
    }
    &_list{
      width: 80%;
      margin: 0 auto;
      &>li{
        background:rgba(12,51,103,0.1);
        height: 40px;line-height: 40px;border: 1px solid rgba(0,136,255,0.6);
        margin-top: 20px;
        color: #50b4ff;font-size:16px;
        border-radius: 5px;
        &:hover{
          background:rgba(08,72,158,1);
          cursor: pointer;
          color:#fff
        }
      }
    }
  }

  // 右三角
  .triangle_border-right{
    margin-left:10px;
  }
  .triangle_border-right span{
    display: block;
    width: 0;
    height: 0;
    border-width: 8px 0 8px 8px;
    border-style: solid;
    border-color: transparent transparent transparent #51ddff;
  }
}

</style>
