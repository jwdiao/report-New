<template>
  <div class="index">
    <!-- 头部 start -->
    <div class="index_top">
      <div class="index_imgText">
        <span class="title" style="cursor:pointer;" @click="switchData('/CarsV21')">回龙观园区•车辆统计报表</span><!--南口•南大门-->
      </div>
      <em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
    </div>
    <div class="index_main">
      <div class="index_left">
        <div class="index_left_top">
          <div style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);">
            <p class="home_title" style="background:rgba(58, 96, 133, 0.9);display: flex;justify-content: space-between;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span> 超过24小时未离开总数</span>
              <span style="color:#02c9fc;font-size:32px;font-family: fontnameRegular;">{{carAllData.strandedTotalNum}}</span>
            </p>
            <div class="index_left_top_main">
              <div>
                <div class="index_left_top_main_Cars">
                  <div class="index_left_top_main_Cars_module carsN">
                    <p>内部小车&nbsp;&nbsp;&nbsp;&nbsp; <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedInsideCarNum}}</span></p>

                  </div>
                </div>
                <div class="index_left_top_main_Cars ">
                  <div class="index_left_top_main_Cars_module carsH">
                    <p>外部大货车&nbsp; <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedOutsideTruckNum}}</span></p>

                  </div>
                </div>
              </div>
              <div>
                <div class="index_left_top_main_Cars ">
                  <div class="index_left_top_main_Cars_module carsW">
                    <p>内部大货车&nbsp; <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedInsideTruckNum}}</span></p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="index_left_bottom">
          <div class="abnormal-item">
            <p class="home_title"><span style="font-size: 32px; color: #02c9fc;">•</span> 十天内晚6点进出大货车</p>
            <div class="inOrOut" id="sixTimeTrunk"></div>
          </div>
          <div class="abnormal-item">
            <p class="home_title"><span style="font-size: 32px; color: #02c9fc;">•</span> 十天内晚9点进出小车</p>
            <div class="carType" id="nineTimeCars"></div>
          </div>
          <div class="abnormal-item">
            <p class="home_title"><span style="font-size: 32px; color: #02c9fc;">•</span> 十天内抬杆进出</p>
            <div class="inOrOut" id="dayTimeAuto"></div>
          </div>
        </div>
      </div>
      <div class="index_center">
        <div class="index_center_top">
          <div style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
            <p class="home_title" style="background:rgba(58, 96, 133, 0.9);display: flex;justify-content: space-between;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span> 昨日晚6点进出大货车</span>
            </p>
            <div class="index_center_top_main">
              <div>
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>进入数量&nbsp;&nbsp; <span class="index_left_top_main_Cars_module_num">{{carTimeNumObj.yet6EnterTruckNum}}</span></p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p class="leaveNumP">离开数量&nbsp;&nbsp; <span class="index_center_top_main_Cars_module_num">{{carTimeNumObj.yet6LeaveTruckNum}}</span></p><!--{{carAllData.strandedTruckNum}}-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
            <p class="home_title" style="background:rgba(58, 96, 133, 0.9);display: flex;justify-content: space-between;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span> 昨日晚9点进出小车</span>
            </p>
            <div class="index_center_top_main">
              <div>
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>进入数量&nbsp;&nbsp; <span class="index_left_top_main_Cars_module_num">{{carTimeNumObj.yet9EnterCarNum}}</span></p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>离开数量&nbsp;&nbsp; <span class="index_center_top_main_Cars_module_num">{{carTimeNumObj.todayUpTruckNum}}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);">
            <p class="home_title" style="background:rgba(58, 96, 133, 0.9);display: flex;justify-content: space-between;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span> 今日抬杆进出</span>
            </p>
            <div class="index_center_top_main">
              <div>
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>进入数量&nbsp;&nbsp; <span class="index_left_top_main_Cars_module_num">{{carTimeNumObj.todayUpCarNum}}</span></p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>离开数量&nbsp;&nbsp; <span class="index_center_top_main_Cars_module_num">{{carTimeNumObj.yet9LeaveCarNum}}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="checking_dashbordBox">
          <p class="home_title" style="display: flex;justify-content: space-between;">
            <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span> 今日进入总数</span>
            <span style="color:#02c9fc;font-size:32px;font-family: fontnameRegular;margin-right: 50px">{{carEchartsData.enterTotalNum}} <span  style="font-size: 18px;font-weight: lighter"></span></span>
          </p>
          <div class="checking_dashbord">
            <ul>
              <li>
                <div class="top">
                  <div class="item text">内部小车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.enterInsideCarNum}}</span></div><!--{{carEchartsData.enterInsideCarNum}}-->
                </div>
                <div class="bottom">
                  <div class="lv lvBlue" id="nbcllv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">内部大货车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.enterInsideTruckNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvBlue" id="wbcllv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">外部小车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.enterOutsideCarNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvYellow" id="hclv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">外部大货车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.enterOutsideTruckNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvYellow" id="xjclv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="index_center_bottom">
          <div class="index_center_bottom_titleSitch">
              <p  class="home_title" :class="{isShow}" @click="switchDataNoleaveFun">
                <span>超过24小时未离开</span>
              </p>
              <p class="home_title" :class="{isShow:!isShow}" @click="switchDataFun">
                <span>综合查询</span>
              </p>
            </div>
          <div class="index_center_bottom_searchContent">
            <div :class="{isShowContent}" class="allSearch">
              <div class="search" style="text-align: center;">
                <el-date-picker
                  v-model="valueDateStart"
                  type="date" @change="handleDateStart" value-format="yyyy-MM-dd"
                  :picker-options="pickerOptionsStart"
                  placeholder="选择日期">
                </el-date-picker>
                <label class="module">
                  <input type="text" class="search-num" ref="inputCarNum" @focus="handlefocus" @blur="handleblur" v-model="carNumber" placeholder="请输入车牌号" value="">
                </label>
                <label class="module is-out">
                  <el-select v-model="valueSelectCarTypeAllSearch" @change="carArrTypeFn" clearable @clear="clearCarType" placeholder="车辆类型">
                    <el-option
                      v-for="item in innerOrOuterArr2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </label>
                <el-select  class="module" v-model="inOrOutCars" @change="cheliangguishuFn" clearable @clear="clearInOrOutCar" placeholder="内外车辆">
                  <el-option
                    v-for="item in innerOrOuterArr1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select  class="module" v-model="AllTypeSearch" @change="AllTypeSearchFn" clearable @clear="clearAll" placeholder="全部">
                  <el-option
                    v-for="item in searchTypeArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <label class="module is-out">
                  <template>
                    <el-select @change="isLeaveSearchFn" v-model="valueIsLeave"  clearable @clear="clearIsLeave" placeholder="是否离开"><!--v-model="isLeaveStatus"-->
                      <el-option
                        v-for="item in isLeaveStatusArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </label>
                <button class="search-btn" @click="getSearchCarData">查询</button>
              </div>
              <div class="titleAllsearch"><span>序号</span><span>车牌号</span><span>标识</span><span>车辆类型</span><span>进入时间</span><span>离开时间</span><span>放行方式</span><span>姓名</span></div>
              <div class="index_center_bottom_searchContent_mainAllsearch">
                <el-scrollbar class="message" style="overflow-x: hidden;">
                  <div class="title_message" v-for="(item,index) in allSearchCarListArr" :key="index">
                   <span style="color:#fff03e;">{{(index+1)+(currentPage-1)*pageSize}}</span>
                   <span>{{item.plateNo}}</span>
                   <span>{{item.releaseMode === 1? '内部车辆' : '外部车辆'}}</span>
                   <span>{{item.vehicleType === 2? '大货车' : '小车'}}</span>
                   <span>{{item.crossTime}}</span>
                   <span>{{item.leaveTime == null ? '未离开' : item.leaveTime}}</span>
                    <span>{{item.releaseMode === 1? '自动放行' : '抬杆放行'}}</span>
                   <span>{{item.personName}}</span>
                  </div>
                </el-scrollbar>
              </div>
              <template>
                <div class="block" style="text-align: center;">
                  <el-pagination
                    @size-change="handleSizeChangeAllSearch"
                    @current-change="handleCurrentChangeAllSearch"
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="allSearchTotals">
                  </el-pagination>
                </div>
              </template>
            </div>
            <div :class="{isShowContent:!isShowContent}" class="noLeaveDay">
              <div class="search">
                <label class="module2 is-out">
                  <el-select style="width: 100%;" v-model="selectCarType2" @change="carArrTypeNoLeaveFn" clearable placeholder="选择车辆类型">
                    <el-option
                      v-for="item in CarTypeOutOneDayNoLeaveList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </label>
                <el-select  class="module2" v-model="noLeaveInnerOrOuterCars" @change="inOrOutCarsNoLeaveFn" clearable @clear="clearAll" placeholder="内部外部车辆">
                  <el-option
                    v-for="item in noLeaveInnerOrOuterCarsArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <button class="search-btn" @click="getSearchNoLeaveCarData">查询</button>
              </div>
              <div class="title"><span>序号</span><span>车牌号</span><span>标识</span><span>车辆类型</span><span>进入时间</span><span>滞留时间</span><span>放行方式</span><span>姓名</span></div>
              <div class="index_center_bottom_searchContent_main">
                <el-scrollbar class="message" style="overflow-x: hidden;">
                  <div class="title_message" v-for="(item,index) in noLeaveCarsList" :key="index">
                     <span style="color:#fff03e;">{{(index+1)+(currentPage-1)*pageSize}}</span>
                     <span>{{item.plateNo}}</span>
                     <span>{{item.releaseMode === 1?'内部车辆':'外部车辆'}}</span>
                     <span>{{item.vehicleType === 2?'大货车':'小车'}}</span>
                     <span>{{item.crossTime}}</span>
                     <span>{{item.strandedHour}}</span>
                    <span>{{item.releaseMode === 1?'自动放行':'手动抬杆'}}</span>
                     <span>{{item.personName}}</span>
                  </div>
                </el-scrollbar>
              </div>
              <template>
                <div class="block" style="text-align: center;">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="carTotals">
                  </el-pagination>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="index_right">
        <CarsManage/>
      </div>
    </div>
  </div>
</template>
<script>
  import CarsManage from '../../components/CarsManage-HLG.vue'
  import echarts from 'echarts'
  import moment from 'moment'
  import $ from 'jquery'
  import http from '../../api/http'
  import BScroll from 'better-scroll'
  import {
    reqUserInfo,
    reqCarData,
    reqCarEchartsList,
    reqRightForm,
    reqLeftCarsData,
    reqHLGCarsData,
    reqCenterThreeTimesCarsData,
    reqThreeTimesEchartsData,
    reqAllSearchData
  }from'../../api'

  export default {
    name: 'cars',
    components: {
      CarsManage,
    },
    data() {
      return {
        isShow:false,
        isShowContent:false,
        carTimeNumObj:'',//中间--中间车辆数量
        noLeaveCarsList : [], //超过24小时未离开的车辆
        allSearchCarListArr : [], //综合查询列表
        valueDateStart:'', //////////////
        carNumber:'',//车牌号
        inOrOutCars:'',//内外车辆
        AllTypeSearch:'',//全部--6--9
        isLeaveStatus:'',//是否离开
        allSearchTotals:0,
        timerId: '',        // 定时器
        timerIdHour: '',    // 中间小时的定时器
        currentTime: '',    // 系统当前时间
        currentDate: '',    // 系统当前日期
        selectCarType:'',   //选择车辆类型 --- 综合查询
        selectCarType2:'',   //选择车辆类型---24小时未离开
        noLeaveInnerOrOuterCars:'',   //内外部车辆---24小时未离开
        inputLabel:'',      //input车牌号码
        hceliangguishu:'',//车辆归属
        cheliangtype:'', //车辆类型
        isOutStatus:'',//全部
        CarsVThreeAllEchartsArr:[],//存放所有echarts数组
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        valueStart:'',
        innerOrOuterCars:'',//选择内部或外部车辆
        innerOrOuterArr1:[
          {
            value:'001',
            label:'内部车辆'
          },{
            value:'002',
            label:'外部车辆'
          }
        ],
        CarTypeOutOneDayNoLeaveList:[
          {
            value:'001',
            label:'大货车'
          },{
            value:'002',
            label:'小车'
          }
        ],
        noLeaveInnerOrOuterCarsArr:[
          {
            value:'001',
            label:'内部车辆'
          },{
            value:'002',
            label:'外部车辆'
          }
        ],
        innerOrOuterArr2:[
          {
            value:'001',
            label:'大货车'
          },{
            value:'002',
            label:'小车'
          }
        ],
        valueSelectCarTypeAllSearch:'',
        isLeaveStatusArr:[
          {
            value:'001',
            label:'已离开'
          },{
            value:'002',
            label:'未离开'
          }
        ],
        valueIsLeave:'',
        searchTypeArr:[
          {
            value:'001',
            label:'全部'
          },{
            value:'002',
            label:'晚六点后'
          },{
            value:'003',
            label:'晚九点后'
          },{
            value:'004',
            label:'抬杆放行'
          }
        ],
        //分页
        dataCount: 0,  //初始化信息条数
        pageSize: 10,//每页显示条数
        page:1, //当前页码
        currentPage: 1,
        carTotals: 0,
        carStatistics: {
          carAllNum: 0,
          carInsideNum: 0,
          carExternalNum: 0,
          carLargeNum: 0,
        },
        neibuRateObj: {}, // 内部车辆率 ====
        waibuRateObj: {}, // 外部车辆率 ====
        huocheRateObj: {}, // 货车占有率======
        xiaojiaocheRateObj: {}, // 小轿车占有率====
        carEchartsData:{
          enterTotalNum:0,
          enterInsideNum:0,
          enterOutsideNum:0,
          enterTruckNum:0,
          enterCarNum:0,
          leaveTotalNum:0,
          leaveInsideNum:0,
          leaveOutsideNum:0,
          leaveTruckNum:0,
          leaveCarNum:0,
          notLeaveTotalNum:0,
          notLeaveInsideNum:0,
          notLeaveOutsideNum:0,
          notLeaveTruckNum:0,
          notLeaveCarNum:0,
        },//中间列表展示的数据
        carAllData:{
          strandedTotalNum:0,
          strandedInsideNum:0,
          strandedTruckNum:0,
          strandedCarNum:0,
          strandedOutsideNum:0,
        },//左侧展示的数据
        //左下侧echarts图
        chartsBData: { // 月
          xData: [],
          insideCars: [],
          externalCars: [],
          // bigTruck: []
        },
        chartsCData: { //年
          xData: [],
          insideCars: [],
          externalCars: [],
          // bigTruck: []
        },
        screenHeight:document.body.clientHeight,

      }
    },
    created() {},
    mounted() {
      // 顶部日期时间
      this.currentTime = this.getCurrentDateTime();
      this.currentDate = this.getCurrentDate();
      setInterval(() => {
        this.currentTime = this.getCurrentDateTime();
      }, 1000)

       this.getChartsData()
       this.getThreeTimeCarsData()
      const{currentPage,pageSize} = this
      // this.getAllSearchListData('','','','','','',currentPage,pageSize)
      this.getAllSearchListData()
      this.getCarAllData('','',currentPage,pageSize)

      //左下echarts图
      this.carRightForm('SIXTIMETRUNK');
      this.carRightForm('NINETIMECARS');
      this.carRightForm('DAYTIMEAUTO');
      // 给window对象绑定resize事件
       window.addEventListener('resize',this.handleResize)
       this.screenHeightFn();//初始化根据大小列表变化
      this.mySixTimeTrunk = echarts.init(document.getElementById('sixTimeTrunk'));
      this.CarsVThreeAllEchartsArr.push(this.mySixTimeTrunk)
      this.myNineTimeCars = echarts.init(document.getElementById('nineTimeCars'));
      this.CarsVThreeAllEchartsArr.push(this.myNineTimeCars)
      this.myDayTimeAuto = echarts.init(document.getElementById('dayTimeAuto'));
      this.CarsVThreeAllEchartsArr.push(this.myDayTimeAuto)
    },
    methods: {
      //接口--中间--上部分
      async getChartsData(){
        const res = await reqHLGCarsData()
        // const res = await http.get('http://10.88.195.89:8083/carPlater/getTodaySanyCarData')
       if(res.data.code === 200){
          this.carEchartsData = res.data.data
         // console.log('carEchartsData:',this.carEchartsData)
         this.renderEchartsCircleHLGTree(this.carEchartsData)
       }
      },
      //接口--中间--中间部分
      async getThreeTimeCarsData(){
        const res = await reqCenterThreeTimesCarsData()
        // const res = await http.get('http://10.88.195.89:9010/sanyBussCar/getExceptionCarData')
       if(res.data.code === 200){
          this.carTimeNumObj = res.data.data
       }
      },
      //接口--中间--综合查询列表
      async getAllSearchListData(date,carNumber,carBelong,carType,isLeave,searchType,page,pageSize){
         const res = await reqAllSearchData(date,carNumber,carBelong,carType,isLeave,searchType,page,pageSize)
        // const res = await http.post('http://10.88.195.89:9010/sanyBussCar/getListBySearch',{'date':date,'carNumber':carNumber,'carBelong':carBelong,'carType':carType,'isLeave':isLeave,'searchType':searchType,'page':page,'pageSize':pageSize})
       if(res.data.code === 200){
        this.allSearchCarListArr = res.data.data.searchList
        this.allSearchTotals = res.data.data.total
       }
      },
      //接口---左侧
      async getCarAllData(carbelong,cartype,page,pagesize){
        const res = await reqLeftCarsData(carbelong,cartype,page.toString(),pagesize.toString())
        // const res = await http.post('http://10.88.195.89:8083/carPlater/getStrandedCarData',{carbelong,cartype,page,pagesize})
       if(res.data.code === 200){
          // console.log('左侧：',res.data)
          this.carAllData = res.data.data
         this.noLeaveCarsList = res.data.data.pageStrandedList
         // console.log('noLeaveCarsList:',this.noLeaveCarsList)
         this.carTotals = res.data.data.total
       }
      },
      //左下侧echarts图
      async carRightForm (DateType) {
         // const res = await http.get('http://10.88.195.89:9010/sanyBussCar/getExceptionCarOfmonth');
        const res = await reqThreeTimesEchartsData()
        if (res && res.data.code === 200) {
          switch (DateType){
            case 'SIXTIMETRUNK':  //晚6点
              const mySixTimeTrunk = echarts.init(document.getElementById('sixTimeTrunk'));
              this.chartsCData.xData = res.data.data.xAxis; // X轴
              this.chartsCData.insideCars = res.data.data.every6EnterTruckArr; // 进入
              this.chartsCData.externalCars = res.data.data.every6LeaveTruckArr; // 离开
              this.renderEchartsC(mySixTimeTrunk, this.chartsCData);
              break;
            case 'NINETIMECARS'://晚9点后
              const myNineTimeCars = echarts.init(document.getElementById('nineTimeCars'));
              this.chartsBData.xData = res.data.data.xAxis; // X轴
              this.chartsBData.insideCars = res.data.data.every9EnterCarArr; // 进入
              this.chartsBData.externalCars = res.data.data.every9LeaveCarArr; // 离开
              this.renderEchartsB(myNineTimeCars, this.chartsBData)
              break;
            case 'DAYTIMEAUTO'://自动放行
              const myDayTimeAuto = echarts.init(document.getElementById('dayTimeAuto'));
              this.chartsBData.xData = res.data.data.xAxis; // X轴
              this.chartsBData.insideCars = res.data.data.everyUpCarArr; // 进入
              this.chartsBData.externalCars = res.data.data.everyUpTruckArr; // 离开
              this.renderEchartsA(myDayTimeAuto, this.chartsBData)
              break;
          }
        }
      },
      renderEchartsA(myChart, data){
        var option = {
          legend: {
            data: ['进入车辆', '离开车辆', '百分比'],   //   自动放行
            show: true,
            itemWidth: 20, // 设置图例的宽高
            itemHeight: 10,
            textStyle: { // 标题颜色
              color: '#fff'
            },
            top: 10,
            bottom: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: { top: '25%', left: '10%', right: 0, bottom: '15%'},
          xAxis: [
            {
              type: 'category',
              data: data.xData,
              axisLine: { // 控制x轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#2c4264',
                  width: '1'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#2fdaeb'
                },
                interval: 0,
                // showMaxLabel: true, //是否显示最大 tick 的 label
                // rotate: 75
              },
              axisTick: { // 控制x轴坐标刻度不显示
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: 0,
              // max: data.maxY,
              // interval: data.intervalY,
              axisLine: { // 控制y轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#2c4264',
                  width: '1'
                }
              },
              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  color: '#fff'//2fdaeb
                },
                showMinLabel: true, // 是否显示最小 tick 的 label
                showMaxLabel: true, // 是否显示最大 tick 的 label
                verticalAlign: 'middle'
              },
              splitLine: { // 网格线
                show: true,
                lineStyle: {
                  color: ['#2c4264'],
                  width: 1,
                  type: 'dotted'
                }
              }
            }
          ],
          series: [
            {
              name: '进入车辆',
              type: 'bar',
              data: data.insideCars,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#FCE300'},
                      {offset: 0.5, color: '#F9B009'},
                      {offset: 1, color: '#F88F0F'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 7, // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name: '离开车辆',
              type: 'bar',
              data: data.externalCars,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2cd3ec'},
                      {offset: 0.5, color: '#31aee9'},
                      {offset: 1, color: '#387de6'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 7,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
          ]
        }
        myChart.setOption(option)
      },
      renderEchartsB(myChart, data){
        var option = {
          legend: {
            data: ['进入车辆', '离开车辆'],  //  晚9点
            show: true,
            itemWidth: 20, // 设置图例的宽高
            itemHeight: 10,
            textStyle: { // 标题颜色
              color: '#fff'
            },
            top: 10,
            bottom: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: { top: '25%', left: '10%', right: 0, bottom: '20%'},
          xAxis: [
            {
              type: 'category',
              data: data.xData,
              axisLine: { // 控制x轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#2c4264',
                  width: '1'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#2fdaeb'
                },
                interval: 0,
                // showMaxLabel: true, //是否显示最大 tick 的 label
                // rotate: 75
              },
              axisTick: { // 控制x轴坐标刻度不显示
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: 0,
              // max: data.maxY,
              // interval: data.intervalY,
              axisLine: { // 控制y轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#2c4264',
                  width: '1'
                }
              },
              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  color: '#fff'//#2fdaeb
                },
                showMinLabel: true, // 是否显示最小 tick 的 label
                showMaxLabel: true, // 是否显示最大 tick 的 label
                verticalAlign: 'middle'
              },
              splitLine: { // 网格线
                show: true,
                lineStyle: {
                  color: ['#2c4264'],
                  width: 1,
                  type: 'dotted'
                }
              }
            }
          ],
          series: [
            {
              name: '进入车辆',
              type: 'bar',
              data: data.insideCars,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#FCE300'},
                      {offset: 0.5, color: '#F9B009'},
                      {offset: 1, color: '#F88F0F'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 7,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name: '离开车辆',
              type: 'bar',
              data: data.externalCars,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2cd3ec'},
                      {offset: 0.5, color: '#31aee9'},
                      {offset: 1, color: '#387de6'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 7,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
          ]
        }
        myChart.setOption(option)
      },
      renderEchartsC(myChart, data){
        var option = {
          legend: {
            data: ['进入车辆', '离开车辆'],  //晚6点
            show: true,
            itemWidth: 20, // 设置图例的宽高.
            itemHeight: 10,
            textStyle: { // 标题颜色
              color: '#fff'
            },
            top: 10,
            bottom: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: { top: '25%', left: '10%', right: 0, bottom: '20%'},
          xAxis: [
            {
              type: 'category',
              data: data.xData,
              axisLine: { // 控制x轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#2c4264',
                  width: '1'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#2fdaeb'
                },
                interval: 0,
                // showMaxLabel: true, //是否显示最大 tick 的 label
                // rotate: 75
              },
              axisTick: { // 控制x轴坐标刻度不显示
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: 0,
              // max: data.maxY,
              // interval: data.intervalY,
              axisLine: { // 控制y轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#2c4264',
                  width: '1'
                }
              },
              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  color: '#fff'
                },
                showMinLabel: true, // 是否显示最小 tick 的 label
                showMaxLabel: true, // 是否显示最大 tick 的 label
                verticalAlign: 'middle'
              },
              splitLine: { // 网格线
                show: true,
                lineStyle: {
                  color: ['#2c4264'],
                  width: 1,
                  type: 'dotted'
                }
              }
            }
          ],
          series: [
            {
              name: '进入车辆',
              type: 'bar',
              data: data.insideCars,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#FCE300'},
                      {offset: 0.5, color: '#F9B009'},
                      {offset: 1, color: '#F88F0F'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 7,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name: '离开车辆',
              type: 'bar',
              data: data.externalCars,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2cd3ec'},
                      {offset: 0.5, color: '#31aee9'},
                      {offset: 1, color: '#387de6'}
                    ]
                  ),
                  // barBorderRadius: 10
                }
              },
              barWidth: 7,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
          ]
        }
        myChart.setOption(option)
      },
      // 给window对象绑定resize事件,根据窗口大小适应屏幕
      handleResize(){
        this.CarsVThreeAllEchartsArr.forEach((ele, index) => {
          ele.resize()
        })
        if($(window).height() >= 1000){
          $('.index_center_bottom_searchContent_main').css('height','330px')
          $('.index_center_bottom_searchContent_mainAllsearch').css('height','330px')
        }else{
          $('.index_center_bottom_searchContent_main').css('height','210px')
          $('.index_center_bottom_searchContent_mainAllsearch').css('height','210px')
        }
      },
      screenHeightFn(){
        if(this.screenHeight >= 1000){
          $('.index_center_bottom_searchContent_main').css('height','330px')
          $('.index_center_bottom_searchContent_mainAllsearch').css('height','330px')
        }else{
          $('.index_center_bottom_searchContent_main').css('height','210px')
          $('.index_center_bottom_searchContent_mainAllsearch').css('height','210px')
        }
      },
      //中间下面切换的函数
      switchDataFun(){
        this.isShow = false
        this.isShowContent = false
      },
      switchDataNoleaveFun(){
        this.isShow = true
        this.isShowContent = true
      },
      switchData(path){
        this.$router.replace(path)
      },
      /*函数名：carArrTypeNoLeaveFn
      参数：val:value值
      描述：下拉选项选取对应的车辆类型---24小时
    * */
      carArrTypeNoLeaveFn(val){
        let obj = {};
        obj = this.CarTypeOutOneDayNoLeaveList.find((item)=>{
          return item.value === val;
        });
        if(obj.label === '大货车'){
          this.selectCarType2 = '大型车'
        }else if(obj.label === '小车'){
          this.selectCarType2 = '小型车'
        }
      },
      /*函数名：isLeaveSearchFn
      参数：val:value值
      描述：下拉选项选取对应的是否离开
    * */
      isLeaveSearchFn(val){
        let obj = {};
        obj = this.isLeaveStatusArr.find((item)=>{
          return item.value === val;
        });
        if(obj.label === '已离开'){
          this.isLeaveStatus = 'YES'
        }else if(obj.label === '未离开'){
          this.isLeaveStatus = 'NO'
        }
      },
      /*函数名：inOrOutCarsNoLeaveFn
      参数：val:value值
      描述：下拉选项选取对应的车辆类型---24小时
    * */
      inOrOutCarsNoLeaveFn(val){
        let obj = {};
        obj = this.noLeaveInnerOrOuterCarsArr.find((item)=>{
          return item.value === val;
        });
        this.noLeaveInnerOrOuterCars = obj.label
      },
      /* 四个率 */
      renderClock (dom, data) {
        var myChart = echarts.init(dom)
        var option = null
        option = {
          tooltip: {
            formatter: '{a} {b} : {c}%',
            confine: true // 是否将tooltip框限制在图表的区域内
          },
          toolbox: {
            show: true
          },
          series: [
            {
              name: data.name,
              type: 'gauge',
              radius: '100%',
              rich: {
                color: '#fff'
              },
              axisLabel: {
                show: false
              },
              itemStyle: {
                // color: data.color, //指针颜色
                length: 5
              },
              axisTick: {
                show: false
              },
              emphasis: {
                itemStyle: {
                  color: '#fff'
                }
              },
              axisLine: { // 仪表盘轴线相关配置。
                show: false,
                lineStyle: {
                  width: 0,
                  // 0% 处的颜色
                  color: [[1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: data.color.startColor }, { offset: 1, color: data.color.endColor }], false)]]
                  // color: [[1,'#ff820d']]
                },
                length: 5
              },
              splitLine: {
                show: false
              },
              pointer: {
                width: 4
              },
              detail: { formatter: '{value}%', color: '#fff', offsetCenter: [0, '70%'], fontSize: 20 },
              data: [{ value: data.value, name: '' }]
            }
          ]
        }
        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
        }
      },
      /* 四个率 */
      renderEchartsCircleHLGTree (carEchartsData) {
        // 内部车辆率
        var nbcllvEcharts = document.getElementById('nbcllv')
        this.neibuRateObj = {
          name: '内部车辆占有率',
          // color: '#0097ff',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value: carEchartsData.enterInsideCarRate,/*this.info.workPlanRate*/
        }
        this.renderClock(nbcllvEcharts, this.neibuRateObj)

        // 外部车辆率
        var wbcllvEcharts = document.getElementById('wbcllv')
        this.waibuRateObj = {
          name: '外部车辆占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value:carEchartsData.enterInsideTruckRate, /*this.info.recordRate*/
        }
        this.renderClock(wbcllvEcharts, this.waibuRateObj)

        // 货车率
        var hclvEcharts = document.getElementById('hclv')
        this.huocheRateObj = {
          name: '货车占有率',
          // color: '#0097ff',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          // value: this.info.onWorkRate
          value: carEchartsData.enterOutsideCarRate,/*parseFloat(this.info.onWorkRate) > 100 ? '100' : this.info.onWorkRate*/
        }
        this.renderClock(hclvEcharts, this.huocheRateObj)

        // 小轿车率
        var xjclvEcharts = document.getElementById('xjclv')
        this.xiaojiaocheRateObj = {
          name: '小轿车占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          value:Number(carEchartsData.enterOutsideTruckRate),/* this.info.validRate*/
        }
        this.renderClock(xjclvEcharts, this.xiaojiaocheRateObj)
      },
      /*函数名：cheliangtype
        参数：val
        描述：车辆类型
      * */
      cheliangtypeFn(val){
        let obj = {};
        obj = this.innerOrOuterArr2.find((item)=>{
          return item.value === val;
        });
        this.cheliangtype = obj.label
        console.log('cheliangtype:',this.cheliangtype)
      },
      /*函数名：AllTypeSearchFn
        参数：val
        描述：车辆类型
      * */
      AllTypeSearchFn(val){
        let obj = {};
        obj = this.searchTypeArr.find((item)=>{
          return item.value === val;
        });
        this.AllTypeSearch = obj.label
      },
      /*函数名：cheliangguishuFn
        参数：val
        描述：车辆归属
      * */
      cheliangguishuFn(val){
        let obj = {};
        obj = this.innerOrOuterArr1.find((item)=>{
          return item.value === val;
        });
        this.inOrOutCars = obj.label
      },
      /*函数名：carArrTypeFn
        参数：val
        描述：车辆归属
      * */
      carArrTypeFn(val){
        let obj = {};
        obj = this.innerOrOuterArr2.find((item)=>{
          return item.value === val;
        });
        if(obj.label === '大货车'){
          this.selectCarTypeAllSearch = '大型车'
        }else if(obj.label === '小车'){
          this.selectCarTypeAllSearch = '小型车'
        }
      },
      /*函数名：clearAll,clearIsLeave,clearCarType,clearInOrOutCar
        参数：
        描述：清空全部,清空选择下拉框
      * */
      clearAll(){
        this.currentPage = 1
        this.AllTypeSearch = ''
        const {valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,isLeaveStatus} = this
        this.getAllSearchListData(valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,isLeaveStatus,this.AllTypeSearch,this.currentPage.toString(),this.pageSize.toString())
      },
      clearIsLeave(){
        this.currentPage = 1
        this.isLeaveStatus = ''
        const {valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,AllTypeSearch} = this
        this.getAllSearchListData(valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,this.isLeaveStatus,AllTypeSearch,this.currentPage.toString(),this.pageSize.toString())
      },
      clearCarType(){
        this.currentPage = 1
        this.selectCarTypeAllSearch = ''
        const {valueDateStart,carNumber,inOrOutCars,isLeaveStatus,AllTypeSearch} = this
        this.getAllSearchListData(valueDateStart,carNumber,inOrOutCars,this.selectCarTypeAllSearch,this.isLeaveStatus,AllTypeSearch,this.currentPage.toString(),this.pageSize.toString())
      },
      clearInOrOutCar(){
        this.currentPage = 1
        this.inOrOutCars = ''
        const {valueDateStart,carNumber,selectCarTypeAllSearch,isLeaveStatus,AllTypeSearch} = this
        this.getAllSearchListData(valueDateStart,carNumber,this.inOrOutCars,selectCarTypeAllSearch,isLeaveStatus,AllTypeSearch,this.currentPage.toString(),this.pageSize.toString())
      },

      /*函数名：getSearchNoLeaveCarData
        参数：无
        描述：车辆搜索---24小时
      * */
      getSearchNoLeaveCarData(){
        this.currentPage = 1
        this.getCarAllData(this.noLeaveInnerOrOuterCars,this.selectCarType2,this.currentPage,this.pageSize)
      },
      /*函数名：getSearchCarData
        参数：无
        描述：车辆搜索---综合搜索
      * */
      getSearchCarData(){
        this.currentPage = 1
        const {valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,isLeaveStatus,AllTypeSearch} = this
        this.getAllSearchListData(valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,isLeaveStatus,AllTypeSearch,this.currentPage.toString(),this.pageSize.toString())
      },
      enterIndexPage(path) {
        // 路径从state中获取
        this.$router.replace(path)
      },
      // 时间格式化
      getCurrentDateTime() {
        return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      },
      // 日期格式化
      getCurrentDate() {
        return moment(new Date()).format('YYYY-MM-DD')
      },
      /*函数名：handleSizeChange
       参数：val:value值
       描述：分页-----24小时未离开
       * */
      handleSizeChange(val) {
        this.pageSize = val;
        this.getCarAllData(this.hceliangguishu,this.cheliangtype,this.currentPage,this.pageSize)
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getCarAllData(this.hceliangguishu,this.cheliangtype,val,this.pageSize)
      },
      /*函数名：handleSizeChange
       参数：val:value值
       描述：分页-------综合查询
       * */
      handleSizeChangeAllSearch(val) {
        this.pageSize = val;
        const {valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,isLeaveStatus,AllTypeSearch} = this
        this.getAllSearchListData(valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,isLeaveStatus,AllTypeSearch,this.currentPage.toString(),this.pageSize.toString())

      },
      handleCurrentChangeAllSearch(val) {
        this.currentPage = val;
        const {valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,isLeaveStatus,AllTypeSearch} = this
        this.getAllSearchListData(valueDateStart,carNumber,inOrOutCars,selectCarTypeAllSearch,isLeaveStatus,AllTypeSearch,this.currentPage.toString(),this.pageSize.toString())
      },
      /*函数名：handleDateStart
      参数：val:value值
      描述：从开始日期选项中选择对应的日期
    * */
      handleDateStart(val){
        this.valueDateStart = val
      },
      /*函数名：handlefocus,handleblur
        参数：无
        描述：input输入车牌号聚焦与失焦样式
      * */
      handlefocus(){
        this.$refs.inputCarNum.style.backgroundColor = 'rgba(44, 149, 240, 0.3)'
      },
      handleblur(){
        this.$refs.inputCarNum.style.background = ''
      },
      destroyed() {
        // clearInterval(this.timerId)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .index{
    height:100%;
    background-image: url(../../assets/images/index_bg.png);
    background-size: cover;
    color: rgb(255, 255, 255);
    background-repeat: no-repeat;
    overflow: hidden;
    font-size: 13px;
    &_top{
      text-align: center;
      position: fixed;
      top: 12px;
      left: 2.5%;
      right: 2.5%;
      height: 70px;
      padding-top: 20px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /*background: url(../assets/images/body_title.png) no-repeat center center;*/
      background-size: auto 100%;
      img{display:inline-block;vertical-align: middle;width:50px;}
      .title{font-size: 0.44rem;
        color:#fff;font-weight:bold;}
      .time{
        width: 285px;
        font-size:0.32rem;
        color:#ababab;
        display: inline-block;
        vertical-align: middle;
        position: fixed;
        top:65px;
        right:20px;
        z-index: 10;
        text-align: left;
        font-family: fontnameUnidreamLED;
      }
			.button {
				width: 90px;
				height: 40px;
				background: url(../../assets/images/index_back.png) no-repeat;
				position:fixed;
				top:60px;
				left:40px;
				cursor:pointer;
			}
    }
    &_main{
      position: fixed;
      top:110px;
      left: 2.5%;
      right: 2.5%;
      bottom:15px;
      // border-top:1px solid red;
    }
    /*6s页面左侧盒子*/
    &_left{
      width: 25%;float: left;height:100%;padding-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      /*6s页面左侧上部*/
      &_top{
        width:100%;
        height: 175px;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        .home_title{
          padding-left: 0px;
          padding-right: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 45px;
          line-height: 40px;
        }
        &_main{
          /*height: calc(100% - 47px);*/
          height: 90px;
          display: flex;
          /*margin: 15px auto 0 ;*/
          justify-content: center;
          &_Cars{
            width: calc((100% - 45px)/0.7 );
            height: 40%;
            margin-right: 100px;
            &_module {
              width: 100%;
              height: 100%;
              padding-top: 10px;
              &_num {
                color:#01cbff;
                text-align: center;
                line-height: 40px;
                font-size: 34px;
                font-family: fontnameRegular;
                vertical-align: middle;
                display: inline-block;
                margin-bottom: 3%;
              }
              & > p {
                width: 100%;
                margin-left: 15%;
                margin-bottom: 1%;
                height: 40px;
                line-height: 30px;
                font-weight: 300;
                font-size: 20px;
                overflow: hidden;
                img {
                  vertical-align: middle;
                  width: 25px;
                  height: auto;
                  margin-right: 10px;
                  padding-bottom: 5px;
                }
              }
            }
            &_img {
              width: 100%;
              height: 53%;
              padding: 0;
              margin: 0;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              background: url("../../assets/images/cars_bg.png") no-repeat;
              background-position: center 90%;
              background-size: 90% 40%;
              img{
                width: 65%;
                margin-top: 2%;
              }
            }
          }

        }
        /*background-color: #eee;*/
      }
      /*cars页面左侧下部*/
      &_bottom{
        height: calc(100% - 175px);
        display: flex;flex-direction: column;
        width:100%;
        overflow:hidden;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        .abnormal-item{
          flex: 1;
          .home_title{
            padding-left: 0px;
          }
          .inOrOut{
            width: 100%;
            height: calc(100% - 32px);
          }
          .carType{
            width: 100%;
            height: calc(100% - 32px);
          }
        }
        /deep/ .el-table_1_column_1{
          color: #fff03e;
        }
        .pagesInfo{
          text-align: center;
        }
        .home_title{
          height: 32px;
          line-height: 32px;
          /*padding-left: 24px;*/
          font-weight: bold;
          font-size: 21px;
          p{
            display: inline-block;
            float: left;
          }
        }
      }
    }
    /*6s页面左侧盒子*/
    &_center{
      width: 49%;float: left;height:100%;margin-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      .checking_dashbordBox{
        height: 230px;
        background: rgba(39,69,111,0.4);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        .home_title{
          width:100%;position: relative;
          .checking_total{
            font-size: 0.30rem;// font-size:24px;
            top:-5px;
            color:#fff;position: absolute;left:25px;font-weight:bold;
            em{
              // font-size:42px;vertical-align: -6px;
              font-size: 0.30rem;vertical-align: -4px;
              color:#01cbff;display: inline-block;margin-left:12px;font-family: fontnameRegular;}
          }
        }
      }
      .checking_dashbord{
        width:100%;height: calc(100% - 36px);overflow: hidden;
        ul{
          display: flex;flex-wrap: wrap;align-items: center;
          height:100%;padding: 5px 0;
          li{
            background-color: rgba(42, 75, 133, 0.3);
            padding:0 10px;
            height:95%;
            flex:1;margin-left:10px;text-align:center;
            &:first-child{margin-left:14px;}
            &:last-child{margin-right:14px;}
            .text{
              text-align: center;
              font-size: 0.22rem;
              // font-size:22px;
              font-weight:100;
            }
            .num{
              font-size: 0.35rem;
              // font-size:35px;
              color:#02c9fc;font-family: fontnameRegular;
              display: inline-block;
              margin-bottom: 3%;
            }
            .lv{width:108px;height:108px;margin:0 auto;}
            .lvYellow{
              background:url(../../assets/images/index_clock-yellow.png)
            }
            .lvBlue{
              background:url(../../assets/images/index_clock-blue.png)
            }
            .lvRed{
              background:url(../../assets/images/index_clock-red.png)
            }
            .lvGreen{
              background:url(../../assets/images/index_clock-green.png)
            }
            .lvText{
              color:#c4c4c4;
              // font-size:18px;
              font-size: 0.18rem;
              padding-bottom:10px;
            }
            .top{
              // height:105px;
              overflow: hidden;text-align:left;
              margin: 10px 0;
              .item{
                height:0.38rem;line-height:0.38rem;
                .text{display: inline-block;vertical-align: middle;text-align: left;}
                .num{display: inline-block;vertical-align: middle;margin-left: 5px;}
              }
            }
            .bottom{margin-top:15px;margin-bottom: 15px;}/*padding-bottom:10px;*/
            .single{
              text-align: center;
              .text{padding-top:5px;}
              .num{padding-top:8px;}
            }
          }
        }
      }
      &_top{
        display: flex;
        width:100%;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        &>div{
          flex: 1;
        }
        .home_title{
          padding-left: 0px;
          padding-right: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 45px;
          line-height: 40px;
        }
        &_main{
          /*height: calc(100% - 47px);*/
          height: 90px;
          display: flex;
          /*margin: 15px auto 0 ;*/
          justify-content: center;
          &_Cars{
            width: calc((100% - 45px)/0.7 );
            height: 40%;
            margin-right: 100px;
            &_module {
              width: 100%;
              height: 100%;
              /*padding: 10px 0;*/
              &_num {
                color:#01cbff;
                text-align: center;
                line-height: 40px;
                font-size: 34px;
                font-family: fontnameRegular;
                vertical-align: middle;
                display: inline-block;
                margin-bottom: 3%;
              }
              & > p {
                width: 100%;
                margin-left: 15%;
                margin-bottom: 2%;
                margin-top: 2%;
                height: 40px;
                line-height: 30px;
                font-weight: 300;
                font-size: 20px;
                overflow: hidden;
              }
              .leaveNumP{
                margin-bottom: 2%;
              }
            }
            &_img {
              width: 100%;
              height: 53%;
              padding: 0;
              margin: 0;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              background: url("../../assets/images/cars_bg.png") no-repeat;
              background-position: center 90%;
              background-size: 90% 40%;
              img{
                width: 65%;
                margin-top: 2%;
              }
            }
          }

        }
        /*background-color: #eee;*/
      }
      /*cars页面左侧下部*/
      &_bottom{
        height: calc(100% - 442px);
        display: flex;flex-direction: column;
        width:100%;
        overflow:hidden;
        background: rgba(39,69,111,0.4);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        &_titleSitch{
          display: flex;
          &>p{
            width: 250px; text-align:center;border-radius:10px 10px 0 0;color: #466DC8;
            height: 45px;
            line-height: 45px;
            font-weight: bold;
            font-size: 21px;
            cursor:pointer;margin-left: 5px;
          }
          .isShow{
            /*color: #fff;
            background:rgba(42, 75, 133, 0.3);*/
            background:url(../../assets/images/tab-selected.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color: #fff;
          }
        }
        &_searchContent{
          background:rgba(39,69,111,0.5);
          /*height: 100%;*/
          /*margin-top: 4px;*/
          .isShowContent{
            display: none;
          }
          .search{
            width: 100%;
            /*float: right;*/
            /*margin-top: -5px;*/
            /*text-align: center;*/
            overflow: hidden;
            .module {
              width: 12%;
              height: 100%;
              margin-left: 20px;
              position: relative;
              display: inline-block;
              margin-top: 20px;
              input {
                width: 100%;
                height: 30px;
                font-size: 14px;
                color: #2f96ef;
                line-height: 30px;
                text-indent: 1em;
                outline: #2f96ef;
                font-weight: 400;
                border-radius: 3px;
                border: 1px solid rgba(89, 154, 229, 0.55);
                background-color: rgba(89, 154, 229, 0.1);
              }
              ::-webkit-input-placeholder {
                color: rgba(255, 255, 255, 0.8);
              }
              :-moz-placeholder {
                color: rgba(255, 255, 255, 0.8);
              }
              ::-moz-placeholder {
                color: rgba(255, 255, 255, 0.8);
              }
              :-ms-input-placeholder {
                color: rgba(255, 255, 255, 0.8);
              }
              i {
                width: 20px;
                height: 20px;
                position: absolute;
                bottom: 4px;
                right: 4px;
                background: url("../../assets/images/rmReach.png") no-repeat center;
                background-size: 60% auto;
                cursor: pointer;
              }
            }
            .is-out{
              font-size: 13px;
              font-weight: 400;
              line-height: 32px;
              position: relative;
              select{
                width: 100%;
                height: 29px;
                border-radius: 3px;
                /*border: 1px solid rgba(89, 154, 229, 0.55);
                background-color: rgba(89, 154, 229, 0.1);
                color: #fff;*/
                font-size: 12px;
                option:last-child{
                  border-bottom-right-radius: 3px;
                  border-bottom-left-radius: 3px;
                }
              }
            }
            .search-btn {
              width: 70px;
              height: 30px;
              line-height: 22px;
              background-color: #2a6fbf;
              font-size: 12.5px;
              color: #fff;
              text-align: center;
              border-radius: 3px;
              border: 1px solid #2d6fbf;
              margin-left: 20px;
              cursor: pointer;
              &:hover{
                background-color: rgba(42,111,191,0.8);
              }
              &:active{
                background-color: rgba(42,111,191,0.6);
              }
            }

          }
          .title{
            width: 100%;
            color:white;
            height:22px;
            margin-top: 20px;
            padding: 0 1%;
            span{
              display:inline-block;
              width:13%;
              height:22px;
              box-sizing:border-box;
              line-height:0px;
              font-size: 16px;
              text-align: center;
            }
            span:nth-child(1){
              width:5%;
            }
            /*span:nth-child(2){*/
              /*width:25%;*/
            /*}*/
            /*span:nth-child(3){*/
              /*width:15%;*/
            /*}*/
            /*span:nth-child(4){*/
              /*width:16%;*/
            /*}*/

          }
          &_main{
            height: 200px;
            overflow: hidden;
            .message{
              width:100%;
              height: 100%;
              margin-top: 5px;
              padding-bottom: 15px;
              overflow: hidden;
              /deep/ .el-scrollbar__wrap {
                overflow-x: hidden;
              }
              .title_message{
                width: 100%;
                height: 30px;
                line-height: 30px;
                margin-bottom: 2px;
                padding: 0 3%;
                overflow: hidden;
                color:#80dcf5;    /*#fff03e*/
                background:rgba(56,142,237,0.2);
                span{
                  display:inline-block;
                  width: 13%;
                  height: auto;
                  font-size: 14px;
                  box-sizing:border-box;
                  line-height:0px;
                  text-align: left;
                  user-select: auto;
                }
                span:nth-child(1){
                  width:5%;
                }
                span:nth-child(5){
                  width:18%;
                }
                span:nth-child(6){
                  width:12%;
                }
               /* span:nth-child(2){
                  width:25%;
                }
                span:nth-child(3){
                  width:45%;
                }
                span:nth-child(4){
                  width:16%;
                }*/
              }
              .title_message:hover{
                background:rgba(56,142,237,0.6);
              }
            }
          }
          .noLeaveDay{
            .search{
              .module2{
                width: 40%;
                height: 100%;
                margin-left: 20px;
                position: relative;
                display: inline-block;
                margin-top: 20px;
              }
            }
          }
          .titleAllsearch{
            width: 100%;
            color:white;
            height:22px;
            margin-top: 20px;
            padding: 0 1%;
            span{
              display:inline-block;
              width:12%;
              height:22px;
              box-sizing:border-box;
              line-height:0px;
              font-size: 16px;
              text-align: center;
            }
            span:nth-child(1){
              width:5%;
            }
            span:nth-child(3){
              width:8%;
            }
            span:nth-child(5){
              width:18%;
            }
            span:nth-child(6){
              width:18%;
            }

          }
          &_mainAllsearch{
              height: 200px;
              overflow: hidden;
              .message{
                width:100%;
                height: 100%;
                margin-top: 5px;
                padding-bottom: 15px;
                overflow: hidden;
                /deep/ .el-scrollbar__wrap {
                  overflow-x: hidden;
                }
                .title_message{
                  width: 100%;
                  height: 30px;
                  line-height: 30px;
                  margin-bottom: 2px;
                  padding: 0 1%;
                  overflow: hidden;
                  color:#80dcf5;    /*#fff03e*/
                  background:rgba(56,142,237,0.2);
                  span{
                    display:inline-block;
                    width: 12%;
                    height: auto;
                    font-size: 14px;
                    box-sizing:border-box;
                    line-height:0px;
                    text-align: center;
                    user-select: auto;
                  }
                  span:nth-child(1){
                    width:5%;
                  }
                  span:nth-child(3){
                    width:8%;
                  }
                  span:nth-child(5){
                    width:18%;
                  }
                  span:nth-child(6){
                    width:18%;
                  }


                }
                .title_message:hover{
                  background:rgba(56,142,237,0.6);
                }
              }
            }

        }
        /deep/ .el-table_1_column_1{
          color: #fff03e;
        }
        .pagesInfo{
          text-align: center;
        }

        /deep/ span.el-pagination__total {
          color:#2b82d3;
        }
        /deep/ input.el-input__inner{
          background-color: rgba(44, 149, 240, 0.1);
          border: 1px solid #285e8c;
          color: #2f96ef;
        }
        /deep/ .el-pagination button:disabled {
          color: #1f5bd3;
          background-color: rgba(44, 149, 240, 0.1);
        }
        /deep/ .el-pager li {
          color: #2f96ef;
          background-color: rgba(44, 149, 240, 0.1);
        }
        /deep/ .el-pager li.active {
          color: #fff;
          cursor: default;
        }
        /deep/ .el-select .el-input .el-select__caret {
          //color: #1f5bd3;
        }
        /deep/ .el-pagination .btn-next, .el-pagination .btn-prev {
          color: #1f5bd3;
          background-color: rgba(44, 149, 240, 0.1);
        }
        /deep/ .el-pagination .btn-prev {
          color: #1f5bd3;
          background-color: rgba(44, 149, 240, 0.1);
        }
        /deep/ .el-pagination__jump {
          color: #2b82d3;
        }
        /deep/ .el-date-editor{
          width: 145px;
        }
        /deep/ .el-picker-panel{
          background:rgb(19, 44, 83)!important;
        }
        /deep/.el-range-editor{
          background-color:#285e8c!important;
        }
      }
    }
    /*cars页面右侧盒子*/
    &_right{
      width: 25%;float: left;height:100%;
    }
    /deep/ .el-range-input {
      background-color:rgb(19, 44, 83)!important;
      color: #2F96EF!important;
    }
  }
</style>
