
<template>
  <div class="sbhl">
    <!-- 头部 start -->
    <div class="sbhl_top">
      <div class="sbhl_imgText" @click="showCompanyDialog = true">
        {{this.companyName}}监控设备管理
      </div>
      <!--右上角时间-->
      <em class="time" v-text="currentTime"></em>
       <div class="button" @click="enterIndexPage('/HomeGuideJK')"></div>
    </div>
   
    <!-- 头部 end -->

    <!-- main start -->
    <div class="sbhl_main">
      <div class="sbhl_left">
        <div class="sbhl_left_top">
         
          <div class="statusList">
            <EquipmentSafety />
            
          </div>
        </div>
        <div class="sbhl_left_bottom">
          <OverViewList />
        </div>
      </div>
      <div class="sbhl_right">
        <div class="attendance">
          <div class="attendance-item">
            <div class="home_title "> <div class="pointCircle"></div><em class="dmy">&nbsp;本日</em></div>
            <div class="day" id="sbhl-day-echarts"></div>
          </div>
          <div class="attendance-item">
            <div class="home_title "><div class="pointCircle"></div><em class="dmy">&nbsp;本月</em></div>
            <div class="month" id="sbhl-mouth-echarts"></div>
          </div>
          <div class="attendance-item">
            <div class="home_title "><div class="pointCircle"></div><em class="dmy">&nbsp;本年</em></div>
            <div class="year" id="sbhl-year-echarts"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- main end -->

  </div>
</template>

<script>
  import echarts from 'echarts'
  import moment from 'moment'
  import OverViewList from './OverViewList.vue'
  import CompanyDialog from './components/CompanyDialog.vue'
  import EquipmentSafety from './EquipmentSafety.vue'
  import http from '../../api/http'
  import {reqDeviceMain} from '../../api/deviceVideoManageApi'
  import { clearInterval, setInterval } from 'timers';
  export default {
    name: 'OverView',
    data() {
      return {
        companyCode: '0301', // 选中的公司code
        companyName: '北京桩机', // 选中的公司name
        showCompanyDialog: false, // 是否显示顶部选择子公司
        orgCode:'',   //选中的组织代码
        refreshDataIdTime: '', // 时间刷新
        refreshDataIdAll: '', // 数据刷新
        currentTime: '', // 系统当前时间
        CarsVThreeAllEchartsArr:[],
        screenHeight:window.innerHeight,//屏幕的高
        deviceData:{},//左上部分数据
        //右下侧echarts图
        chartsBData: { // 月

        },
        chartsCData: { //年

        },
        chartsAData: { //年

        },
      }
    },
    watch: {
      // 子公司改变重新加载数据
      companyCodeStr(val) {
        if(!val) return;
        this.companyCode = JSON.parse(val).value
        this.companyName = JSON.parse(val).label
        //10：代表日统计
        this.getDeviceAllData('10')
        //11：代表按月统计
        this.getDeviceAllData('11')
        //12 ：代表 按年统计
        this.getDeviceAllData('12')
      }
    },
    created() {},
    computed: {
      companyCodeStr() {
        return this.$store.state.sbhlOverViewSelectedCompany;
      }
    },
    components: {
      OverViewList,
      CompanyDialog,
	  EquipmentSafety
    },
    mounted() {
      // 顶部日期时间
      this.currentTime = this.getCurrentDateTime();
      this.refreshDataIdTime = setInterval(() => {
        this.currentTime = this.getCurrentDateTime()
      },1000)
     
      //10：代表日统计
      this.getDeviceAllData('day')
      //11：代表按月统计
      this.getDeviceAllData('month')
      //12 ：代表 按年统计
      this.getDeviceAllData('year')
      // 右侧====echarts图
      this.sbhlDayEcharts = echarts.init(document.getElementById('sbhl-day-echarts'));
      this.CarsVThreeAllEchartsArr.push(this.sbhlDayEcharts)
      this.sbhlMonthEcharts = echarts.init(document.getElementById('sbhl-mouth-echarts'));
      this.CarsVThreeAllEchartsArr.push(this.sbhlMonthEcharts)
      this.sbhlYearEcharts = echarts.init(document.getElementById('sbhl-year-echarts'));
      this.CarsVThreeAllEchartsArr.push(this.sbhlYearEcharts)
      //给window对象绑定resize事件
      window.addEventListener('resize', this.handleResize);
    },
    methods: {
      //左上部分--右侧本日本月本年后台请求数据

      async getDeviceAllData(queryType){
        switch (queryType){
          case 'day' : //右侧本日
            const res10 = await reqDeviceMain(queryType)
			console.log(res10.data.xAxis)
            if(res10&&res10.data.ret==200){
              const myThisDay = echarts.init(document.getElementById('sbhl-day-echarts'));
              this.chartsCData.xData = res10.data.xAxis; // X轴
              this.chartsCData.startUpRateArr = res10.data.onlineNumArr; // 在线数
              this.chartsCData.runRateArr = res10.data.onlineRateArr; // 在线率
              this.renderEchartsC(myThisDay, this.chartsCData)
            }
            break;
          case 'month' : //右侧本月
            const res11 = await reqDeviceMain(queryType)
            if(res11&&res11.data.ret==200){
              const myThisMonth = echarts.init(document.getElementById('sbhl-mouth-echarts'));
              this.chartsBData.xData = res11.data.xAxis; // X轴
              this.chartsBData.startUpRateArr = res11.data.onlineNumArr; // 在线数
              this.chartsBData.runRateArr = res11.data.onlineRateArr; // 在线率
              this.renderEchartsC(myThisMonth, this.chartsBData)
            }
            break;
          case 'year' : //右侧本年
            const res12 = await reqDeviceMain(queryType)
            if(res12&&res12.data.ret==200){
              const myThisYear = echarts.init(document.getElementById('sbhl-year-echarts'));
              this.chartsAData.xData = res12.data.xAxis; // X轴
              this.chartsAData.startUpRateArr = res12.data.onlineNumArr; // 在线数
              this.chartsAData.runRateArr = res12.data.onlineRateArr; // 在线率
              this.renderEchartsC(myThisYear, this.chartsAData)
            }
            break;
        }
      },
     
      //renderEchartsA(myChart, data){},
      //renderEchartsB(myChart, data){},
      renderEchartsC(myChart, data){  //本日
        var option = {
          legend: {
            data: ['在线数', '在线率(%)'],  //晚6点
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
          grid: { top: '25%', left: '10%', right: '10%', bottom: '20%'},
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
              //min: 0,
              //max:100,
              // max: data.maxY,
              // interval: data.intervalY,
              name: '在线数',
              nameTextStyle: {
                color: '#fff',
                padding:[0,0,0,-30]
              },
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
            },
			{
			  type: 'value',
			  min: 0,
			  max:100,
			  // max: data.maxY,
			  // interval: data.intervalY,
			  name: '在线率(%)',
			  nameTextStyle: {
			    color: '#fff',
			    padding:[0,0,0,-30]
			  },
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
			},
            
          ],
          series: [
            {
              name: '在线数',
              type: 'bar',
              data: data.startUpRateArr,
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
              barWidth: 6,  // 控制柱子的宽度
              barGap: '10%' // 控制柱子的间隔
            },
            {
              name: '在线率(%)',
              type: 'bar',
              data: data.runRateArr,
			  yAxisIndex:1,
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
              barWidth: 6,  // 控制柱子的宽度
              barGap: '10%' // 控制柱子的间隔
            },
          ]
        }
        myChart.setOption(option)
      },
      
      /*跳转路径函数*/
      enterIndexPage(path) {
        // 路径从state中获取
        this.$router.replace(path);
      },
      // 时间格式化
      getCurrentDateTime() {
        return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      },
      //根据窗口变化echarts变化（中间背景图，右侧3 个echarts图）
      handleResize() {
        this.CarsVThreeAllEchartsArr.forEach((ele, index) => {
          ele.resize()
        })
        this.screenHeight = window.innerHeight
        // console.log('获取runHourNum高度:',this.$refs.runHourNum.offsetHeight)
        /*if(this.screenHeight>1000){
          //设置高度
          this.$refs.openID.style.backgroundSize = '83% 100%'
          this.$refs.runHourNum.style.backgroundSize = '83% 100%'
          this.$refs.startID.style.backgroundSize = '83% 100%'
          this.$refs.runLV.style.backgroundSize = '83% 100%'
          this.$refs.problem.style.backgroundSize = '83% 100%'
          this.$refs.totalE.style.backgroundSize = '83% 100%'
        }else{
          this.$refs.openID.style.backgroundSize = '65% 100%'
          this.$refs.runHourNum.style.backgroundSize = '65% 100%'
          this.$refs.startID.style.backgroundSize = '65% 100%'
          this.$refs.runLV.style.backgroundSize = '65% 100%'
          this.$refs.problem.style.backgroundSize = '65% 100%'
          this.$refs.totalE.style.backgroundSize = '65% 100%'
        }*/
      },
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    destroyed () {
      clearInterval(this.refreshDataIdTime);
      clearInterval(this.refreshDataIdAll);
    }

  }
</script>
<style lang="scss" scoped>
  .sbhl {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-image: url(../../assets/images/index_bg.png) ;
    background-size: cover;
    color: rgb(255, 255, 255);
    background-repeat: no-repeat;
    overflow: hidden;

    .sbhl_imgText {
      font-size: 0.44rem;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }
    .time {
      width: 270px;
      text-align: left;
    }
    .button {
      width: 90px;
      height: 40px;
      background: url(./images/common_back.png) no-repeat;
      position: fixed;
      top: 60px;
      left: 15px;
      cursor: pointer;
    }
    .title {
      margin: 0px auto;
    }
    .sbhl_top {
      text-align: center;
      height: 125px;
      padding-top: 20px;
      box-sizing: border-box;
      background-size: 100% 90%;
      background-repeat: no-repeat;
      padding-bottom: 20px;
      .sbhl_imgText {
        display: inline-block;
        cursor: pointer;
      }

      .time {
        font-size: 35px;
        color: #ababab;
        display: inline-block;
        vertical-align: middle;
        position: fixed;
        top: 60px;
        right: 70px;
        z-index: 10;
        font-family: fontnameUnidreamLED;
      }
    }
    .sbhl_main {
      height: calc(100% - 125px);
      .sbhl_left_top {
				
      }
    }
    /*左侧*/
    .sbhl_left {
      width: 73%;
      float: left;
      height: calc(100% - 20px);
      margin-right: 20px;
      box-sizing: border-box;
      display: flex;flex-direction: column;
      background: rgba(39, 69, 111, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 20px;
      margin-bottom: 20px;
      margin-left: 20px;
      /*左侧上部*/
      &_top {
        /*flex:2;*/
        width: 100%;
        height: 220px;
        /*border: 1px solid rgba(255, 255, 255, 0.1);*/
        .sbhltitle{
          color: #30adff;font-size: 0.18rem;
          margin-top: -10px;
        }
        .statusList{
          /*height: calc(100% - 0.35rem);*/
          height: 220px;
          display: flex;flex-direction: column;
          .statusListTop{
            flex: 1;display: flex;align-items: center;
            background: url("./images/title-bg.png") no-repeat;
            background-size: 100% 100%;
            margin-bottom:10px;
            li{
              flex: 1;text-align: center;
              .statusTitle{
                font-size: 0.18rem;color:#d5d5d5;
                margin-top: 5px;
              }
              .statusDiv{
                margin-bottom: 5px;
              }
              .statusCount{
                font-size: 0.32rem;color:#30adff;vertical-align: bottom;
              }
              .statusDanw{
                font-size: 0.19rem;color: #30adff;vertical-align: bottom;
              }
            }
          }
          .statusListBottom{
            display: flex;flex: 1.8;
            /*height: 190px;*/
            li{
              flex: 1;text-align: center;margin-right: 0.1rem;
              padding: 0.1rem;
              background: rgba(42,75,133,0.3);
              .statusNum{
                font-size: 0.24rem;color:#d5d5d5;
              }
              .echartsImg{
                /* width: 90%;
                 height: calc(100% - 0.38rem);*/
                width: 178px;
                height: 110px;
                margin: 0.1rem;
                display: flex;justify-content: center;align-items: center;
                div{
                  margin-top: 10%;
                  color: #02c9fc;
                  .numPoint{
                    color: #02c9fc;font-size: 0.24rem;
                  }
                }
              }
              .open{
                background: url("./images/blueC.png") no-repeat center;
                background-size: 65% 100%;
              }
              .runHourNum{
                background: url("./images/greenC.png") no-repeat center;
                background-size: 65% 100%;
              }
              .start{
                background: url("./images/yellowPie.png") no-repeat center;
                background-size: 65% 100%;
              }
              .runLV{
                background: url("./images/blueEcharts.png") no-repeat center;
                background-size: 65% 100%;
              }
              .problem{
                background: url("./images/peoblemLv.png") no-repeat center;
                background-size: 65% 100%;
              }
              .totalE{
                background: url("./images/blueC.png") no-repeat center;
                background-size: 65% 100%;
              }
            }
            li:nth-last-child(1){
              margin-right: 0;
            }
          }
        }
      }

      &_echarts {
        width: 100%;
        height: calc(100% - 24px);
      }

      /*页面左侧下部*/
      &_bottom {
        /*flex: 3;*/
        height: calc(100% - 190px);
        /*background: rgba(39, 69, 111, 0.3);*/
        // border: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;overflow:hidden;
      }
    }

    /*右侧部分开始*/
    &_right {
      width: 24%;
      float: left;
      height: 100%;
      padding: 0px 0px 20px 0px;
      .attendance {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(39, 69, 111, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 20px;
        &-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          .home_title{
            .pointCircle{
              display: inline-block;
              width: 10px;border-radius: 10px;
              height: 10px;line-height: 10px;
              background-color:#02c9fc;
            }
            .dmy{
              font-size: 0.22rem;
              color: #ffffff;
            }
          }

          .day,
          .month,
          .year {
            width: 100%;
            flex: 1
          }
        }

        &-item:nth-of-type(2) {
          margin: 20px 0px;
        }
      }
    }

    /*右侧三个eharts结束*/

  }


</style>
