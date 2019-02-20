<template>
  <div class="index">
    <!-- 头部 start -->
    <div class="index_top">
      <div class="index_imgText">
        <span class="title">南口•南大门车辆统计报表</span>
      </div>
      <em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
    </div>
    <div class="index_main">
      <div class="index_left">
        <div class="index_left_top">
          <p class="home_title home_title-T1" style="display: flex;justify-content: space-between">
            <span>超过24小时未离开车辆统计</span>
            <span style="text-align: right;font-size:32px;font-family: fontnameRegular;">{{carAllData.strandedTotalNum}}<span  style="font-size: 18px;font-weight: lighter"> 辆</span> </span>
          </p>
          <div class="index_left_top_main">
           <div>
             <div class="index_left_top_main_Cars">
               <div class="index_left_top_main_Cars_module carsN">
                 <!--<p><img src="../assets/images/E2.png" alt="">内部车辆</p>-->
                 <p>内部轿车 <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedInsideCarNum}}</span></p>

               </div>
             </div>
             <div class="index_left_top_main_Cars ">
               <div class="index_left_top_main_Cars_module carsH">

                 <!--<p><img src="../assets/images/E3.png" alt="">外部车辆</p>-->
                 <p>外部轿车 <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedOutsideCarNum}}</span></p>

               </div>
             </div>
           </div>
            <div>
              <div class="index_left_top_main_Cars ">
                <div class="index_left_top_main_Cars_module carsW">
                  <!--<p><img src="../assets/images/E4.png" alt="">货  车</p>-->
                  <p>内部货车 <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedInsideTruckNum}}</span></p>

                </div>
              </div>
              <div class="index_left_top_main_Cars ">
                <div class="index_left_top_main_Cars_module carsX">
                  <!--<p><img src="../assets/images/E00.png" alt="">小轿车 </p>-->
                  <p> 外部货车 <span class="index_left_top_main_Cars_module_num">{{carAllData.strandedOutsideTruckNum}}</span></p>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="index_left_bottom">
          <div class="home_title home_title-E10">
            <p>超过24小时未离开车辆列表</p>
          </div>
          <div class="search">
            <el-select  class="module" v-model="hceliangguishu" @change="cheliangguishuFn" clearable @clear="clearAll" placeholder="车辆归属">
              <el-option
                v-for="item in innerOrOuterArr1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select  class="module" v-model="cheliangtype" @change="cheliangtypeFn" clearable @clear="clearAll" placeholder="车辆类型">
              <el-option
                v-for="item in innerOrOuterArr2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <button class="search-btn" @click="gerSearchCarData">查找车辆</button>
          </div>
          <div class="title"><span>序</span><span>车牌号</span><span>进入时间</span><span>时长(h)</span></div>
          <div class="index_left_bottom_main">
            <el-scrollbar class="message" style="overflow-x: hidden;">
              <div class="title_message" v-for="(item,index) in carArrNew" :key="index">
                <span style="color:#fff03e;">{{(index+1)+(currentPage-1)*pageSize}}</span>
                <span>{{item.cCode}}</span>
                <span>{{item.inDT}}</span>
                <span>{{item.strandedTime}}</span>
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
      <div class="index_center">
        <div class="checking_dashbordBox">
          <p class="home_title home_title-blue" style="display: flex;justify-content: space-between">
            <span>今日进入总数</span>
            <span style="text-align: right;font-size:32px;font-family: fontnameRegular;">{{carEchartsData.enterTotalNum}} <span  style="font-size: 18px;font-weight: lighter">辆</span></span>
          </p>
          <div class="checking_dashbord">
            <ul>
              <li>
                <div class="top">
                  <div class="item text">内部轿车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.enterInsideCarNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvBlue" id="nbcllv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">内部货车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.enterInsideTruckNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvBlue" id="wbcllv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">外部轿车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.enterOutsideCarNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvYellow" id="hclv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">外部货车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.enterOutsideTruckNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvYellow" id="xjclv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="checking_dashbordBox">
          <p class="home_title home_title-blue" style="display: flex;justify-content: space-between">
            <span>今日离开总数</span>
            <span style="text-align: right;font-size:32px;font-family: fontnameRegular;">{{carEchartsData.leaveTotalNum}} <span  style="font-size: 18px;font-weight: lighter">辆</span></span>
          </p>
          <div class="checking_dashbord">
            <ul>
              <li>
                <div class="top">
                  <div class="item text">内部轿车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.leaveInsideCarNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvBlue" id="lknblv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">内部货车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.leaveInsideTruckNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvBlue" id="lkwblv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">外部轿车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.leaveOutsideCarNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvYellow" id="lkhclv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">外部货车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.leaveOutsideTruckNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvYellow" id="lkxjclv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="checking_dashbordBox">
          <p class="home_title home_title-blue" style="display: flex;justify-content: space-between">
            <span>今日未离开总数</span>
            <span style="text-align: right;font-size:32px;font-family: fontnameRegular;">{{carEchartsData.notLeaveTotalNum}} <span  style="font-size: 18px;font-weight: lighter">辆</span></span>
          </p>
          <div class="checking_dashbord">
            <ul>
              <li>
                <div class="top">
                  <div class="item text">内部轿车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.notLeaveInsideCarNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvBlue" id="wlknblv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">内部货车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.notLeaveInsideTruckNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvBlue" id="wlkwblv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">外部轿车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.notLeaveOutsideCarNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvYellow" id="wlkhclv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
              <li>
                <div class="top">
                  <div class="item text">外部货车<span class="num" style="letter-spacing:-3px; text-align: center">{{carEchartsData.notLeaveOutsideTruckNum}}</span></div>

                </div>
                <div class="bottom">
                  <div class="lv lvYellow" id="wlkxjclv"></div>
                  <!--<p class="lvText">占比率</p>-->
                </div>
              </li>
            </ul>
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
  import CarsManage from '../../components/CarsManage'
  import echarts from 'echarts'
  import moment from 'moment'
  import $ from 'jquery'
  import http from '../../api/http'
  import BScroll from 'better-scroll'
  import {reqUserInfo,reqCarData,reqCarEchartsList,reqCarAllInfo}from'../../api'

  export default {
    name: 'cars',
    components: {
      CarsManage,
    },
    data() {
      return {
        carArr : [],
        carArrNew : [],
        timerId: '',        // 定时器
        timerIdHour: '',    // 中间小时的定时器
        currentTime: '',    // 系统当前时间
        currentDate: '',    // 系统当前日期
        selectCarType:'',   //选择车辆类型
        inputLabel:'',      //input车牌号码
        hceliangguishu:'',//车辆归属
        cheliangtype:'', //车辆类型
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
          enterInsideCarNum:0,
          enterInsideTruckNum:0,
          enterOutsideCarNum:0,
          enterOutsideTruckNum:0,
          leaveInsideCarNum:0,
          leaveInsideTruckNum:0,
          leaveOutsideCarNum:0,
          leaveOutsideTruckNum:0,
          notLeaveInsideCarNum:0,
          notLeaveInsideTruckNum:0,
          notLeaveOutsideCarNum:0,
          notLeaveOutsideTruckNum:0,
          leaveTotalNum:0,
          notLeaveTotalNum:0,
        },//中间列表展示的数据
        carAllData:{
          strandedTotalNum:0,
          strandedInsideCarNum:0,
          strandedOutsideCarNum:0,
          strandedInsideTruckNum:0,
          strandedOutsideTruckNum:0,
        },//左侧展示的数据
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
    },
    methods: {
      //接口--中间
      async getChartsData(){
        const res = await reqCarEchartsList()
        // const res = await http.get('http://10.88.195.89:8083/carPlater/getTodaySanyCarData')
       if(res.data.ret === '200'){
          this.carEchartsData = res.data
         console.log('carEchartsData:',this.carEchartsData)
         this.renderEchartsCircle(this.carEchartsData)
       }
      },
      //接口---左侧
      async getCarAllData(carBelong,carType,page,pageSize){
        const res = await reqCarAllInfo(carBelong,carType,page,pageSize)
        // const res = await http.post('http://10.88.195.89:8083/carPlater/getStrandedCarData',{carbelong:carBelong,cartype:carType,page:page,pagesize:pageSize})
       if(res.data.ret === '200'){
          this.carAllData = res.data
         this.carArrNew = res.data.strandedList
         this.carTotals = res.data.total
       }
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
        // 内部轿车
        var nbcllvEcharts = document.getElementById('nbcllv')
        this.neibuRateObj = {
          name: '内部轿车辆占有率',
          // color: '#0097ff',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value: carEchartsData.enterInsideCarRate,/*this.info.workPlanRate*/
        }
        this.renderClock(nbcllvEcharts, this.neibuRateObj)

        // 内部货车占有率
        var wbcllvEcharts = document.getElementById('wbcllv')
        this.waibuRateObj = {
          name: '内部货车占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value:carEchartsData.enterInsideTruckRate, /*this.info.recordRate*/
        }
        this.renderClock(wbcllvEcharts, this.waibuRateObj)

        // 外部轿车占有率
        var hclvEcharts = document.getElementById('hclv')
        this.huocheRateObj = {
          name: '外部轿车占有率',
          // color: '#0097ff',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          // value: this.info.onWorkRate
          value: carEchartsData.enterOutsideCarRate,/*parseFloat(this.info.onWorkRate) > 100 ? '100' : this.info.onWorkRate*/
        }
        this.renderClock(hclvEcharts, this.huocheRateObj)

        // 外部货车占有率
        var xjclvEcharts = document.getElementById('xjclv')
        this.xiaojiaocheRateObj = {
          name: '外部货车占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          value:Number(carEchartsData.enterOutsideTruckRate),/* this.info.validRate*/
        }
        this.renderClock(xjclvEcharts, this.xiaojiaocheRateObj)
        //======================================
        // 离开内部轿车
        var lknblvEcharts = document.getElementById('lknblv')
        this.neibuRateObj = {
          name: '离开内部轿车占有率',
          // color: '#0097ff',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value: carEchartsData.leaveInsideCarRate,/*this.info.workPlanRate*/
        }
        this.renderClock(lknblvEcharts, this.neibuRateObj)

        // 内部货车占有率
        var lkwblvEcharts = document.getElementById('lkwblv')
        this.waibuRateObj = {
          name: '内部货车占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value:carEchartsData.leaveInsideTruckRate, /*this.info.recordRate*/
        }
        this.renderClock(lkwblvEcharts, this.waibuRateObj)

        // 外部轿车占有率
        var lkhclvEcharts = document.getElementById('lkhclv')
        this.huocheRateObj = {
          name: '外部轿车占有率',
          // color: '#0097ff',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          // value: this.info.onWorkRate
          value: carEchartsData.leaveOutsideCarRate,/*parseFloat(this.info.onWorkRate) > 100 ? '100' : this.info.onWorkRate*/
        }
        this.renderClock(lkhclvEcharts, this.huocheRateObj)

        // 外部货车占有率
        var lkxjclvEcharts = document.getElementById('lkxjclv')
        this.xiaojiaocheRateObj = {
          name: '外部货车占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          value:Number(carEchartsData.leaveOutsideTruckRate),/* this.info.validRate*/
        }
        this.renderClock(lkxjclvEcharts, this.xiaojiaocheRateObj)
        //======================================
        // 未离开内部轿车
        var wlknblvEcharts = document.getElementById('wlknblv')
        this.neibuRateObj = {
          name: '未离开内部轿车占有率',
          // color: '#0097ff',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value: carEchartsData.notLeaveInsideCarRate,/*this.info.workPlanRate*/
        }
        this.renderClock(wlknblvEcharts, this.neibuRateObj)

        // 内部货车占有率
        var wlkwblvEcharts = document.getElementById('wlkwblv')
        this.waibuRateObj = {
          name: '内部货车占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value:carEchartsData.notLeaveInsideTruckRate, /*this.info.recordRate*/
        }
        this.renderClock(wlkwblvEcharts, this.waibuRateObj)

        // 外部轿车占有率
        var wlkhclvEcharts = document.getElementById('wlkhclv')
        this.huocheRateObj = {
          name: '外部轿车占有率',
          // color: '#0097ff',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          // value: this.info.onWorkRate
          value: carEchartsData.notLeaveOutsideCarRate,/*parseFloat(this.info.onWorkRate) > 100 ? '100' : this.info.onWorkRate*/
        }
        this.renderClock(wlkhclvEcharts, this.huocheRateObj)

        // 外部货车占有率
        var wlkxjclvEcharts = document.getElementById('wlkxjclv')
        this.xiaojiaocheRateObj = {
          name: '外部货车占有率',
          // color: '#ff8f19',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          value:Number(carEchartsData.notLeaveOutsideTruckRate),/* this.info.validRate*/
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
      .button2 {
        width: 90px;
        height: 40px;
        line-height: 40px;
        background:#1C3369;
        border-radius: 10px;
        position:fixed;
        top:60px;
        left:240px;
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
      width: 25%;float: left;
      height:100%;
      padding-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      /*6s页面左侧上部*/
      &_top{
        height: 250px;
        width:100%;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        .home_title{
          padding-left: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 36px;
          line-height: 36px;
        }
        &_main{
          height: calc(100% - 47px);
          display: flex;
          margin: 15px auto 0 ;

          &_Cars{
            width: calc((100% - 45px)/0.7 );
            height: 40%;
            /*min-height: 90px;*/
           // background: rgba(39,69,111,0.3);
            margin-right: 100px;
            /*.carsN{
            color: #49E664;
            }
            .carsX{
              color: #02BBFE;
            }
            .carsW{
              color: #FF3566;
            }
            .carsH{
              color: #FBD603;
              margin-right: 0;
            }*/
            &_module {
              width: 100%;
              height: 100%;
              padding: 15px 0;

              /*border: 1px solid #fff;*/
              &_num {
                /*color: #fff;*/
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
                margin-bottom: 5%;
                /*text-align: center;*/
                height: 40px;
                line-height: 30px;
                font-weight: 300;
                font-size: 22px;
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
        /*flex:7;*/
        width:100%;
        overflow:hidden;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        height: calc(100% - 265px);
        /deep/ .el-table_1_column_1{
          color: #fff03e;
        }
        .pagesInfo{
          text-align: center;
        }
        .home_title{
          height: 32px;
          line-height: 32px;
          padding-left: 24px;
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
          margin: 20px 0;
          text-align: right;
          overflow: hidden;
          .module {
            width: 30%;
            height: 100%;
            margin-right: 45px;
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
            /*margin-left: 15px;*/
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
          height: calc(80% - 50px);
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
                width: 24%;
                height: auto;
                font-size: 14px;
                box-sizing:border-box;
                line-height:0px;
                text-align: center;
                user-select: auto;
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
        /deep/ .el-select>.el-input{
          width: 115%;
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
      width: 49%;float: left;height:calc(100% - 15px);padding-right: 15px;margin: 15px 15px 0 0;
      display: flex;flex-direction: column;flex-shrink: 0;background-color: rgba(39, 69, 111, 0.3);padding:15px;
      border:1px solid rgba(255,255,255,0.1);
      .checking_dashbordBox{
        flex:1;
        height: calc(33% - 38px);
        /*background-color: rgba(39, 69, 111, 0.3);padding:15px;*/
        /*border:1px solid rgba(255,255,255,0.1);*/
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
            height:100%;
            flex:1;margin-left:6px;text-align:center;
            &:first-child{margin-left:0;}
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
              margin: 28px 0;
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
