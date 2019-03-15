<template>
  <div class="index">
    <!-- 头部 start -->
    <div class="index_top">
      <div class="index_imgText">
        <span class="title">回龙观园区•车辆统计报表</span><!--南口•南大门-->
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
            <p class="home_title"><span style="font-size: 32px; color: #02c9fc;">•</span> 每日晚6点进出大货车(月)</p>
            <div class="inOrOut" id="inOrOut"></div>
          </div>
          <div class="abnormal-item">
            <p class="home_title"><span style="font-size: 32px; color: #02c9fc;">•</span> 每日晚9点进出小车(月)</p>
            <div class="carType" id="carType"></div>
          </div>
          <div class="abnormal-item">
            <p class="home_title"><span style="font-size: 32px; color: #02c9fc;">•</span> 每日抬杆进出(月)</p>
            <div class="inOrOut" id="inOrOut"></div>
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
                    <p>进入数量&nbsp;&nbsp; <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedInsideNum}}</span></p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>离开数量&nbsp;&nbsp; <span class="index_center_top_main_Cars_module_num">{{carAllData.strandedTruckNum}}</span></p>
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
                    <p>进入数量&nbsp;&nbsp; <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedInsideNum}}</span></p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>离开数量&nbsp;&nbsp; <span class="index_center_top_main_Cars_module_num">{{carAllData.strandedTruckNum}}</span></p>
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
                    <p>进入数量&nbsp;&nbsp; <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedInsideNum}}</span></p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>离开数量&nbsp;&nbsp; <span class="index_center_top_main_Cars_module_num">{{carAllData.strandedTruckNum}}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="index_center_bottom">
          <div class="index_center_bottom_titleSitch">
              <p  class="home_title" :class="{isShow}" @click="switchDataFun">
                <span>超过24小时未离开</span>
              </p>
              <p class="home_title" :class="{isShow:!isShow}" @click="switchDataFun">
                <span>综合查询</span>
              </p>
            </div>
          <div class="index_center_bottom_searchContent">
            <div :class="{isShowContent}">
              <div class="search">
                <el-date-picker
                  v-model="valueStart"
                  type="date" @change="handleDateStart" value-format="yyyy-MM-dd"
                  :picker-options="pickerOptionsStart"
                  placeholder="选择日期">
                </el-date-picker>
                <label class="module">
                  <input type="text" class="search-num" ref="inputCarNum" @focus="handlefocus" @blur="handleblur" v-model="carNumber" placeholder="请输入车牌号" value="">
                </label>
                <label class="module is-out">
                  <el-select v-model="selectCarType" @change="carArrTypeFn" clearable placeholder="选择车辆类型">
                    <el-option
                      v-for="item in innerOrOuterArr2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </label>
                <el-select  class="module" v-model="innerOrOuterCars" @change="cheliangguishuFn" clearable @clear="clearAll" placeholder="内部外部车辆">
                  <el-option
                    v-for="item in innerOrOuterArr1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <!--<el-select  class="module" v-model="innerOrOuterCars" @change="cheliangguishuFn" clearable @clear="clearAll" placeholder="全部">
                  <el-option
                    v-for="item in innerOrOuterArr1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>-->
                <label class="module is-out">
                  <template>
                    <el-select v-model="isOutStatus"  clearable placeholder="是否离开"><!--@change="isOutStatusFn"-->
                      <el-option value="YES" label="YES"></el-option>
                      <el-option value="NO" label="NO"></el-option>
                    </el-select>
                  </template>
                </label>
                <button class="search-btn" @click="gerSearchCarData">查询</button>
              </div>
              <div class="title"><span>序号</span><span>车牌号</span><span>标识</span><span>车辆类型</span><span>进入时间</span><span>离开时间</span><span>放行方式</span><span>姓名</span></div>
              <div class="index_center_bottom_searchContent_main">
                <el-scrollbar class="message" style="overflow-x: hidden;">
                  <div class="title_message" v-for="(item,index) in carArr" :key="index">
                    <!-- <span style="color:#fff03e;">{{(index+1)+(currentPage-1)*pageSize}}</span>
                     <span>{{item.cCode}}</span>
                     <span>{{item.memo}}</span>
                     <span class="typeCar" :data-car-type = "item.plateTypeName">{{item.plateTypeName}}</span>
                     <span>{{item.inDT}}</span>
                     <span>{{item.outDT == null ? '未离开' : item.outDT}}</span>
                     <span>{{item.customerName}}</span>-->
                  </div>
                </el-scrollbar>
              </div>
            </div>
            <div :class="{isShowContent:!isShowContent}" class="noLeaveDay">
              <div class="search">
                <label class="module2 is-out">
                  <el-select style="width: 100%;" v-model="selectCarType" @change="carArrTypeFn" clearable placeholder="选择车辆类型">
                    <el-option
                      v-for="item in innerOrOuterArr2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </label>
                <el-select  class="module2" v-model="innerOrOuterCars" @change="cheliangguishuFn" clearable @clear="clearAll" placeholder="内部外部车辆">
                  <el-option
                    v-for="item in innerOrOuterArr1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <button class="search-btn" @click="gerSearchCarData">查询</button>
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
  import CarsManage from '../../components/CarsManage/CarsManage-HLG.vue'
  import echarts from 'echarts'
  import moment from 'moment'
  import $ from 'jquery'
  import http from '../../api/http'
  import BScroll from 'better-scroll'
  import {reqUserInfo,
    reqCarData,
    reqCarEchartsList,
    reqRightForm,
    reqLeftCarsData
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
        noLeaveCarsList : [], //超过24小时未离开的车辆
        carArr : [], //综合查询列表
        timerId: '',        // 定时器
        timerIdHour: '',    // 中间小时的定时器
        currentTime: '',    // 系统当前时间
        currentDate: '',    // 系统当前日期
        selectCarType:'',   //选择车辆类型
        inputLabel:'',      //input车牌号码
        hceliangguishu:'',//车辆归属
        cheliangtype:'', //车辆类型
        isOutStatus:'',//全部
        carNumber:'',//车牌号
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
        innerOrOuterArr2:[
          {
            value:'001',
            label:'货车'
          },{
            value:'002',
            label:'小轿车'
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
      const{currentPage,pageSize} = this
      this.getCarAllData('','',currentPage,pageSize)

      //左下echarts图
      this.carRightForm('CARTYPE');
      this.carRightForm('INOROUT');
    },
    methods: {
      //接口--中间
      async getChartsData(){
        // const res = await reqCarEchartsList()
        const res = await http.get('http://10.88.195.89:8083/carPlater/getTodaySanyCarData')
       if(res.data.ret === '200'){
          this.carEchartsData = res.data
         console.log('carEchartsData:',this.carEchartsData)
         this.renderEchartsCircle(this.carEchartsData)
       }
      },
      //接口---左侧
      async getCarAllData(carbelong,cartype,page,pagesize){
        const res = await reqLeftCarsData(carbelong,cartype,page.toString(),pagesize.toString())
        // const res = await http.post('http://10.88.195.89:8083/carPlater/getStrandedCarData',{carbelong,cartype,page,pagesize})
       if(res.data.code === 200){
          console.log('左侧：',res.data)
          this.carAllData = res.data.data
         this.noLeaveCarsList = res.data.data.pageStrandedList
         console.log('noLeaveCarsList:',this.noLeaveCarsList)
         this.carTotals = res.data.total
       }
      },
      //左下侧echarts图
      async carRightForm (DateType) {
        // const res = await http.post('/carPlater/getSanyCarDataStatic', {querySign: DateType});
        const res = await reqRightForm(DateType)
        if (res && res.status === 200) {
          switch (DateType){
            case 'CARTYPE':  //年echarts图
              const myEChartsYear = echarts.init(document.getElementById('carType'));
              this.chartsCData.xData = res.data.datadaystr; // X轴
              this.chartsCData.insideCars = res.data.carInsideNumval; // 内部
              this.chartsCData.externalCars = res.data.carTemNumval; // 外部
              // this.chartsCData.bigTruck = res.data.carTruckNumval; //大货车
              this.renderEchartsC(myEChartsYear, this.chartsCData);
              break;
            case 'INOROUT':  // 月echarts图
              const myEChartsMouth = echarts.init(document.getElementById('inOrOut'));
              this.chartsBData.xData = res.data.datadaystr; // X轴
              this.chartsBData.insideCars = res.data.carInsideNumval; // 内部
              this.chartsBData.externalCars = res.data.carTemNumval; // 外部
              // this.chartsBData.bigTruck = res.data.carTruckNumval; //大货车
              this.renderEchartsB(myEChartsMouth, this.chartsBData)
              break;
          }
        }
      },
      renderEchartsA(myChart, data){
        var option = {
          legend: {
            data: ['进入车辆', '离开车辆', '百分比'],   //    , '大货车'
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
          grid: { top: '25%', left: '10%', right: '0', bottom: '15%'},
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
                interval: 2
                // showMaxLabel: true, //是否显示最大 tick 的 label
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
                  barBorderRadius: 10
                }
              },
              barWidth: 4, // 控制柱子的宽度
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
                  barBorderRadius: 10
                }
              },
              barWidth: 4,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
          ]
        }
        myChart.setOption(option)
      },
      renderEchartsB(myChart, data){
        var option = {
          legend: {
            data: ['进入车辆', '离开车辆'],  //  , '大货车'
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
          grid: { top: '25%', left: '10%', right: 0, bottom: '25%'},
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
                rotate: 75
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
                  barBorderRadius: 10
                }
              },
              barWidth: 2, // 控制柱子的宽度
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
                  barBorderRadius: 10
                }
              },
              barWidth: 2,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
          ]
        }
        myChart.setOption(option)
      },
      renderEchartsC(myChart, data){
        var option = {
          legend: {
            data: ['进入车辆', '离开车辆'],  //, '大货车'
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
          grid: { top: '25%', left: '12%', right: 0, bottom: '15%'},
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
                interval: 0
                // showMaxLabel: true, //是否显示最大 tick 的 label
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
                  barBorderRadius: 10
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
                  barBorderRadius: 10
                }
              },
              barWidth: 7,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
          ]
        }
        myChart.setOption(option)
      },

      //中间下面切换的函数
      switchDataFun(){
        this.isShow = !this.isShow
        this.isShowContent = !this.isShowContent
      },


      /*函数名：carArrTypeFn
      参数：val:value值
      描述：下拉选项选取对应的车辆类型
    * */
      carArrTypeFn(val){
        let obj = {};
        obj = this.options.find((item)=>{
          return item.value === val;
        });
        this.selectCarType = obj.label
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
      renderEchartsCircle (carEchartsData) {
        // 内部车辆率
        var nbcllvEcharts = document.getElementById('nbcllv')
        this.neibuRateObj = {
          name: '内部车辆占有率',
          // color: '#0097ff',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value: carEchartsData.enterInsideRate,/*this.info.workPlanRate*/
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
          value:carEchartsData.enterOutsideRate, /*this.info.recordRate*/
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
          value: carEchartsData.enterTruckRate,/*parseFloat(this.info.onWorkRate) > 100 ? '100' : this.info.onWorkRate*/
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
          value:Number(carEchartsData.enterCarRate),/* this.info.validRate*/
        }
        this.renderClock(xjclvEcharts, this.xiaojiaocheRateObj)
        //======================================
        // 内部车辆率
        var lknblvEcharts = document.getElementById('lknblv')
        this.neibuRateObj = {
          name: '内部车辆占有率',
          // color: '#0097ff',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value: carEchartsData.leaveInsideRate,/*this.info.workPlanRate*/
        }
        this.renderClock(lknblvEcharts, this.neibuRateObj)

        // 外部车辆率
        var lkwblvEcharts = document.getElementById('lkwblv')
        this.waibuRateObj = {
          name: '外部车辆占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value:carEchartsData.leaveOutsideRate, /*this.info.recordRate*/
        }
        this.renderClock(lkwblvEcharts, this.waibuRateObj)

        // 货车率
        var lkhclvEcharts = document.getElementById('lkhclv')
        this.huocheRateObj = {
          name: '货车占有率',
          // color: '#0097ff',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          // value: this.info.onWorkRate
          value: carEchartsData.leaveTruckRate,/*parseFloat(this.info.onWorkRate) > 100 ? '100' : this.info.onWorkRate*/
        }
        this.renderClock(lkhclvEcharts, this.huocheRateObj)

        // 小轿车率
        var lkxjclvEcharts = document.getElementById('lkxjclv')
        this.xiaojiaocheRateObj = {
          name: '小轿车占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          value:Number(carEchartsData.leaveCarRate),/* this.info.validRate*/
        }
        this.renderClock(lkxjclvEcharts, this.xiaojiaocheRateObj)
        //======================================
        // 内部车辆率
        var wlknblvEcharts = document.getElementById('wlknblv')
        this.neibuRateObj = {
          name: '内部车辆占有率',
          // color: '#0097ff',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value: carEchartsData.notLeaveInsideRate,/*this.info.workPlanRate*/
        }
        this.renderClock(wlknblvEcharts, this.neibuRateObj)

        // 外部车辆率
        var wlkwblvEcharts = document.getElementById('wlkwblv')
        this.waibuRateObj = {
          name: '外部车辆占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value:carEchartsData.notLeaveOutsideRate, /*this.info.recordRate*/
        }
        this.renderClock(wlkwblvEcharts, this.waibuRateObj)

        // 货车率
        var wlkhclvEcharts = document.getElementById('wlkhclv')
        this.huocheRateObj = {
          name: '货车占有率',
          // color: '#0097ff',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          // value: this.info.onWorkRate
          value: carEchartsData.notLeaveTruckRate,/*parseFloat(this.info.onWorkRate) > 100 ? '100' : this.info.onWorkRate*/
        }
        this.renderClock(wlkhclvEcharts, this.huocheRateObj)

        // 小轿车率
        var wlkxjclvEcharts = document.getElementById('wlkxjclv')
        this.xiaojiaocheRateObj = {
          name: '小轿车占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          value:Number(carEchartsData.notLeaveCarRate),/* this.info.validRate*/
        }
        this.renderClock(wlkxjclvEcharts, this.xiaojiaocheRateObj)




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
      /*函数名：cheliangguishuFn
        参数：val
        描述：车辆归属
      * */
      cheliangguishuFn(val){
        let obj = {};
        obj = this.innerOrOuterArr1.find((item)=>{
          return item.value === val;
        });
        this.hceliangguishu = obj.label
        console.log('hceliangguishu:',this.hceliangguishu)
        // this.innerOrOuterCarsHttp = obj.label.substring(0,2)
      },
      /*函数名：clearAll
        参数：val
        描述：清空选择内部或外部车辆
      * */
      clearAll(){
        this.currentPage = 1
        this.getCarAllData(this.hceliangguishu,this.cheliangtype,this.currentPage,this.pageSize)
      },
      /*函数名：gerSearchCarData
        参数：无
        描述：车辆搜索
      * */
      gerSearchCarData(){
        this.currentPage = 1
        this.getCarAllData(this.hceliangguishu,this.cheliangtype,this.currentPage,this.pageSize)
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
       描述：分页
       * */
      handleSizeChange(val) {
        this.pageSize = val;
        this.getCarAllData(this.hceliangguishu,this.cheliangtype,this.currentPage,this.pageSize)
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getCarAllData(this.hceliangguishu,this.cheliangtype,val,this.pageSize)
      },
      /*函数名：handleDateStart
      参数：val:value值
      描述：从开始日期选项中选择对应的日期
    * */
      handleDateStart(val){
        this.valueStart = val
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
        height: 197px;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        .home_title{
          padding-left: 0px;
          padding-right: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 55px;
          line-height: 45px;
        }
        &_main{
          /*height: calc(100% - 47px);*/
          height: 110px;
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
              padding: 10px 0;
              &_num {
                color:#01cbff;
                text-align: center;
                line-height: 40px;
                font-size: 40px;
                font-family: fontnameRegular;
                vertical-align: middle;
                display: inline-block;
                margin-bottom: 3%;
              }
              & > p {
                width: 100%;
                margin-left: 15%;
                margin-bottom: 6%;
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
        height: calc(100% - 197px);
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
            height: calc(100% - 48px);
          }
          .carType{
            width: 100%;
            height: calc(100% - 48px);
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
        .search{
          width: 100%;
          /*float: right;*/
          margin-top: -5px;
          text-align: right;
          overflow: hidden;
          .module {
            width: 30%;
            height: 100%;
            margin-left: 20px;
            position: relative;
            display: inline-block;
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
          margin-top: 5px;
          padding: 0 3%;
          span{
            display:inline-block;
            width:24%;
            height:22px;
            box-sizing:border-box;
            line-height:0px;
            font-size: 16px;
            text-align: center;
          }
          span:nth-child(1){
            width:8%;
          }
          span:nth-child(2){
            width:25%;
          }
          span:nth-child(3){
            width:45%;
          }
          span:nth-child(4){
            width:16%;
          }

        }
        &_main{
          height: calc(85% - 50px);
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
                text-align: center;
                user-select: auto;
              }
              span:nth-child(1){
                width:5%;
              }
              span:nth-child(5){
                width:20%;
              }
            }
            .title_message:hover{
              background:rgba(56,142,237,0.6);
            }
          }
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
          width: 176px;
        }
        /deep/ .el-picker-panel{
          background:rgb(19, 44, 83)!important;
        }
        /deep/.el-range-editor{
          background-color:#285e8c!important;
        }
      }
    }
    /*6s页面左侧盒子*/
    &_center{
      width: 49%;float: left;height:100%;margin-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
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
          height: 55px;
          line-height: 45px;
        }
        &_main{
          /*height: calc(100% - 47px);*/
          height: 118px;
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
              padding: 10px 0;
              &_num {
                color:#01cbff;
                text-align: center;
                line-height: 40px;
                font-size: 40px;
                font-family: fontnameRegular;
                vertical-align: middle;
                display: inline-block;
                margin-bottom: 3%;
              }
              & > p {
                width: 100%;
                margin-left: 15%;
                margin-bottom: 6%;
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
        height: calc(100% - 197px);
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
            color: #fff;
            background:rgba(42, 75, 133, 0.3);
          }
        }
        &_searchContent{
          background:rgba(39,69,111,0.4);
          height: 100%;
          margin-top: 4px;
          .isShowContent{
            display: none;
          }
          .search{
            width: 100%;
            /*float: right;*/
            margin-top: -5px;
            text-align: center;
            overflow: hidden;
            .module {
              width: 15%;
              height: 100%;
              margin-left: 20px;
              position: relative;
              display: inline-block;
              margin-top: 25px;
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
            height: calc(85% - 50px);
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
                margin-top: 25px;
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
          width: 176px;
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
