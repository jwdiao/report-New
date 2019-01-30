<template>
  <div class="index">
    <!-- 头部 start -->
    <div class="index_top">
      <div class="index_imgText">
        <span class="title">视觉设备安全在线统计</span>
      </div>
      <em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
    </div>
    <div class="index_main">
      <div class="index_left">
        <div class="index_left_top">
          <p class="home_title home_title-blue" style="display: flex;justify-content: space-between"><span>总数统计</span></p>
          <div class="index_left_top_main">
            <div class="index_left_top_main_Cars">
              <div class="index_left_top_main_Cars_module">
                <p><img src="../assets/images/E1.png" alt="">设备总数</p>
                <div class="index_left_top_main_Cars_module_num">{{allDeviceNum}}</div>
              </div>
            </div>
            <div class="index_left_top_main_Cars">
              <div class="index_left_top_main_Cars_module">
                <p style="color: #42CB84;"><img src="../assets/images/E2.png" alt="">在线总数</p>
                <div class="index_left_top_main_Cars_module_num">{{onlineNum}}</div>
              </div>
            </div>
            <div class="index_left_top_main_Cars">
              <div class="index_left_top_main_Cars_module">
                <p style="color: #FC2F51"><img src="../assets/images/E3.png" alt="">掉线总数</p>
                <div class="index_left_top_main_Cars_module_num">{{offNum}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="index_left_center">
          <p class="home_title home_title-blue"><span>掉线统计</span></p>
          <div class="index_left_top_main">
           <div id="diaoxianLv" style="width: 100%;height:100%;"></div>
          </div>
        </div>
        <div class="index_left_bottom">
          <p class="home_title home_title-blue" style="display: flex;justify-content: space-between"><span>数量统计</span></p>
          <div id="tongji" style="width: 100%;height:100%;"></div>
        </div>
      </div>
      <div class="index_right rightstyle">
        <div class="search">
          <label class="module">
            <input type="text" class="search-num" ref="inputCarNum" @focus="handlefocus" @blur="handleblur" @input="inputIsVal1" placeholder="名称" v-model="inputLabel">
            <i v-show="isRm1" data-index="1" @click="clearVal"></i>
          </label>
          <label class="module is-out">
            <el-select v-model="selectCompanyName" @change="carArrTypeFn" clearable placeholder="公司">
              <el-option
                v-for="item in companyOptionsArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </label>
          <label class="module is-out">
            <template>
              <el-select v-model="isOutStatus"  clearable placeholder="是否掉线" @change="isOutStatusFn"><!--@change="isOutStatusFn"-->
                <el-option
                  v-for="item in isOutStatusArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </label>
          <button class="search-btn" @click="gerSearchData">搜索</button>
          <button class="search-btn" @click="clearData">清空</button>
        </div>
        <div class="title"><span>序号</span><span>名称</span><span>时间</span><span>事业部</span><span>是否掉线</span></div>
        <div class="index_left_bottom_main">
          <el-scrollbar class="message" style="overflow-x: hidden;">
            <div class="title_message" v-for="(item,index) in deviceCameraListArr" :key="index">
              <span style="color:#fff03e;">{{(index+1)+(currentPage-1)*pageSize}}</span>
              <span>{{item.cameraName}}</span>
              <span>{{item.createtime}}</span>
              <span>{{item.companyName}}</span>
              <span v-show="item.onLineStatus==='1'"  style="color: #42CB84;">在线</span>
              <span v-show="item.onLineStatus==='0'" style="color: #FC2F51;" >掉线</span>
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
              layout="total, sizes, prev, pager, next, jumper"
              :total="ListTotal">
            </el-pagination>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import moment from 'moment'
  import $ from 'jquery'
  import http from '../api/http'
  import BScroll from 'better-scroll'
  import {reqDeviceSafeEcharts,reqDeviceSafeList}from'../api'
  export default {
    name: 'deviceSafeOnline',
    data() {
      return {
        arr:[
          {
            name: '总数',
            icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAZCAIAAAAXAVEQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB60lEQVR42u3XT27aQBQG8JygeN7Y3cbjKLRXCCb8Uc7RJrlIle4aI3XdYkPukKq7Sql6gS4gmOPkG38zU4dVWrGoJaTfAgYYf/DmeYYjZfKXkOMxaJMTByNzTup4AJINyb/qZQNQxtFmBH8+m1rhzZIOjl6YifP2TkakcGE4HZFczkDPfpJ8XUF4Gl1+Ajm9IDdn+iwNgzZZ8y5n2ikWZ9cf7yme16AqJ6428LpcU1JuQd18d/oXwC9ptatsrzI4ZNpzpqb2oeq961vgxSBerEGXj8RMarElDoY3q6tby88clpHrOzPpdKYTK0rPSBe/QBYb0ndrYBSrXIEua89mUss1CRoTzeiXgTZDaN/bDpn2nOl537GhZL6luLJC3/lV5caZLMYIzX+DmJHTRInMmPC405myCUiWkyoeQO5qYslksSXWrlXKJop/6upuJuT2eF+7v9lbDpnyf6CvPlu+s5JqA3pZE5cRBxMfJapqkusCwnHKH5ucjmeS9Fzs9jKm3pspyM03Yrsly0di0HD3ovjDPUVvJ1bYzl335d7wkGm/mV5lVvikm64/Jf2uADX7QfrLCpLigeL3M1D9KbW3FLurNMuofRTucqaeOYNwOOQPvnO62j0x+svsvOqPYu5vGTf18G3xB+R/zPQEPU23iEzdBMUAAAAASUVORK5CYII='
          },
          {
            name: '在线数',
            icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAYCAIAAADcXYK1AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA/0lEQVR42mNI3+Ocvsd1QFDqXjDa4w5BWbtdgUhEyZYhYYtT4lbnAUFJELTFFYIggoKK1qNuItJN0ascI1YPFLIHotDVdhAE4QopOgxKN3kvdPCdbzsgyG+uIwgtsIMg7/n2QCSkYDXqJiLd5DTJ0mmS9YAgh0m2QOQEQw6TrYFIUHFwusmsxdKsxWIAkWkzFJm0ghCofBp1E3Fu0iw1VSs1GRCkUWKMjNRKzIBISMlyULpJIl1XMs1ggJAeEMmk60MQhCukZDPqJiLdJByuxxulMyCIP0ofiAQjdCCILwqEBJWtB6WbmAM12QK0BwSxBqIgdj89IAKVT6NuIspNADmSTmfIvZqAAAAAAElFTkSuQmCC'
          },
          {
            name: '掉线数',
            icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAIAAAA3ajm2AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABO0lEQVR42u3Ov0/CQBTAcZZSDy00Ng3Q4x9QaimWKCZUESr/iT8GcEKdjHFCV3ET44QxEReF/8/XvKY5YxUOTbihyWfpvXe9b2JieOCDchgXDhDXrUgTo4XG+SZ4px5KCJr1Zng+2gAjY5+Fh6ypC7xGhXqAtsAr3UNxFlfWc77py+1+N8y6KHL6v16ydTDMNZCoWU/6Nhjo7kI86FX0qLtgoAXiLK6sO7UG+qs7i6FW0b1WA31tC4madZupgBs1Qi/joMhpuPDTlE/aAeGLcRZX1qXigKuVP1DKc8PXfekSuFYqSNSsbsoC58QGZ8tl1E3ZAA9Z7DRcCD/nsonwzxfERnEWV9YpKYKObIL20hd4yJq6wI1soLa8BjqkhETNOpIsX7I4i2PZZB1K62DGu787SZogiJEsQbM+ATgl7IgWLzNiAAAAAElFTkSuQmCC'
          },
        ],
        companyNameEchartObj:{}, //echarts所包含的列表
        companyNameArr:[], // 事业部名称数组
        ListTotal:0,   //分页总数
        deviceCameraListArr:[],
        selectCompanyName: '',   //选择事业部名称
        inputLabel: '',      //input名称
        companyOptionsArr: [],   //事业部选项数组
        timerId: '',        // 定时器
        currentTime: '',    // 系统当前时间
        allDeviceNum:'', // 设备总数
        onlineNum:'', // 在线总数
        offNum:'', // 掉线总数
        //分页
        dataCount: 0,  //初始化信息条数
        pageSize: 20,//每页显示条数
        currentPage: 1, //当前页码
        isRm1: false,
        isRm2: false,
        isOutStatusArr: [{
          value: '1',
          label: '在线'
        }, {
          value: '0',
          label: '掉线'
        }],
        isOutStatus: '',
      }
    },
    created() {

    },
    mounted() {
      // 顶部日期时间
      this.currentTime = this.getCurrentDateTime();
      setInterval(() => {
        this.currentTime = this.getCurrentDateTime();
      }, 1000)
      this.deviceSafeLeftForm()
      setInterval(() => {
        this.deviceSafeLeftForm()
      }, 30000)
      //初始化显示右侧列表
      this.deviceSafeRightListForm(1,20,'','','')
    },
    methods: {
      /*函数名：deviceSafeRightListForm
       参数：val
       描述：获取右侧列表信息
     * */
      async deviceSafeRightListForm(page,pageSize,companyName,cameraName,onLineStatus) {
        const res = await reqDeviceSafeList(page,pageSize,companyName,cameraName,onLineStatus)
        if (res && res.status == 200 && res.data.ret === "200") {
          console.log('res:', res.data)
          this.ListTotal = res.data.total
          this.deviceCameraListArr = res.data.list
        }
      },

      /*函数名：carArrTypeFn
      参数：val:value值
      描述：下拉选项选取对应的车辆类型
    * */
      carArrTypeFn(val) {
        let obj = {};
        obj = this.companyOptionsArr.find((item) => {
          return item.value === val;
        });
        this.selectCompanyName= obj.label
      },
      /*函数名：isOutStatusFn
      参数：val:value值
      描述：下拉选项选取对应的是否掉线
    * */
      isOutStatusFn(val) {
        let obj = {};
        obj = this.isOutStatusArr.find((item) => {
          return item.value === val;
        });
        this.isOutStatus = obj.value
      },

      /*函数名：gerSearchData
       参数：val
       描述：搜索按钮
     * */
      gerSearchData() {
        let {pageSize,selectCompanyName,isOutStatus,inputLabel} = this
        this.currentPage = 1
        this.deviceSafeRightListForm(this.currentPage,pageSize,selectCompanyName,inputLabel,isOutStatus)
      },
      /*函数名：gerSearchData
      参数：val
      描述：清空按钮
    * */
      clearData() {
        this.inputLabel = ""
        this.currentPage = 1
        this.selectCompanyName = ""
        this.isOutStatus = ""
        const {pageSize} = this
        this.deviceSafeRightListForm(this.currentPage,pageSize,this.selectCompanyName,this.inputLabel,this.isOutStatus)
      },
      /*函数名：deviceSafeLeftForm
       参数：无
       描述：echarts左侧两个图表
     * */
     async deviceSafeLeftForm() {
       this.companyOptionsArr = []
       const res = await reqDeviceSafeEcharts()
         if (res && res.data.ret === '200') {
           this.companyNameEchartObj = res.data
           this.allDeviceNum = res.data.allNum
           this.onlineNum = res.data.onNum
           this.offNum = res.data.offNum
           var unOnineArr = this.companyNameEchartObj.surverOffStr
           var totalOnlineArr = this.companyNameEchartObj.surverAllStr
           var companyNameArrs = this.companyNameEchartObj.companyNameStr
           for (var i = 0; i < companyNameArrs.length; i++) {
             var companyObj = {}
             companyObj.value = companyNameArrs[i]
             companyObj.label = companyNameArrs[i]

             this.companyOptionsArr.push(companyObj)
           }

           /*做下侧数组求得最大值*/
           var maxY = function () {
             var max = totalOnlineArr[0]
             for (var i = 0; i < totalOnlineArr.length; i++) {
               if(totalOnlineArr[i] > max){
                 max = totalOnlineArr[i]
               }
             }
             return max
           }
           /*求掉线率*/
           var OnlineLvArr = []
           for (var i = 0; i < unOnineArr.length; i++) {
                OnlineLvArr[i] = Math.floor((unOnineArr[i]*100/totalOnlineArr[i])*100)/100
             console.log('OnlineLvArr:',OnlineLvArr[i])
           }

           this.companyNameEchartObj.OnlineLvArr = OnlineLvArr
           console.log('companyNameEchartObj:',this.companyNameEchartObj.OnlineLvArr)

           this.companyNameEchartObj.maxY = maxY
           var myChartA = echarts.init(document.getElementById('diaoxianLv'));
           var myChartB = echarts.init(document.getElementById('tongji'));
           this.renderEchartsA(myChartA,this.companyNameEchartObj);
           this.renderEchartsB(myChartB,this.companyNameEchartObj);
         }
      },
      renderEchartsA(myChart,data) {  //renderEchartsA(myChart, data)
      var option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:['掉线率'],
          x:400,
          textStyle: { // 标题颜色
            color: '#fff',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          top:'15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: data.companyNameStr,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: { // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#56aefb',
                width: '1'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#2fdaeb'
              },
              interval: 0,
              rotate:40
            },

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
                color: '#55aefb',
                width: '1'
              }
            },
            axisLabel: {
              formatter: '{value}% ',
              textStyle: {
                color: '#2fdaeb'
              },
              showMinLabel: true, // 是否显示最小 tick 的 label
              showMaxLabel: true, // 是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            splitLine: { // 网格线
              show: false,
              lineStyle: {
                color: ['#2DD7EC'],
                width: 1,
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '掉线率',
            type: 'bar',
            barWidth: '60%',// 控制柱子的宽度
            data: data.OnlineLvArr,
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
                barBorderRadius: 5
              }
            },
            barGap: '20%' // 控制柱子的间隔
          }
        ]
      };
      myChart.setOption(option)
    },
      renderEchartsB(myChart,data) {
        var option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:this.arr,  //[this.arr,'在线数','掉线数']
            x:300,
            textStyle: { // 标题颜色
              color: '#fff'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : data.companyNameStr,
              axisLine: { // 控制x轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#56aefb',
                  width: '1'
                }
              },

              axisLabel: {
                textStyle: {
                  color: '#2fdaeb'
                },
                interval: 0,
                rotate:40
                // showMaxLabel: true, //是否显示最大 tick 的 label
              },
              axisTick: { // 控制x轴坐标刻度不显示
                show: true
              }
            }

          ],
          yAxis : [
            {
              type : 'value',
              min: 0,
              max: data.maxY,
              // interval: data.intervalY,
              axisLine: { // 控制y轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#55aefb',
                  width: '1'
                }
              },
              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  color: '#2fdaeb'
                },
                showMinLabel: true, // 是否显示最小 tick 的 label
                showMaxLabel: true, // 是否显示最大 tick 的 label
                verticalAlign: 'middle'
              },
              splitLine: { // 网格线
                show: false,
                lineStyle: {
                  color: ['#2DD7EC'],
                  width: 1,
                  type: 'dotted'
                }
              }
            }
          ],
          series : [

            {
              name:'掉线数',
              type:'bar',
              stack: '广告',
              data:data.surverOffStr,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#BB253B'},
                      {offset: 0.5, color: '#881036'},
                      {offset: 1, color: '#64062B'}
                    ]
                  ),
                  barBorderRadius: 0
                }
              },
              barWidth: 15, // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name:'在线数',
              type:'bar',
              stack: '广告',
              data:data.surverOnStr,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#67BC45'},
                      {offset: 0.5, color: '#328337'},
                      {offset: 1, color: '#044E29'}
                    ]
                  ),
                  barBorderRadius: 0
                }
              },
              barWidth: 15  ,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },

            {
              name:'总数',
              type:'bar',
              stack: '广告',
              data:data.surverAllStr,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: 'rgba(10,10,10,0.01)'},
                      {offset: 1, color: 'rgba(10,10,10,0.01)'}
                    ]
                  ),
                  label:{
                    show:true,
                    // position:['0%','75%'],
                    position:'insideBottom',
                    textStyle:{
                      color:'#139BD7',
                      fontSize:14
                    }
                  },
                  barBorderRadius: 0
                }
              },
              barWidth: 15  ,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            }
          ]
        };
        myChart.setOption(option)
      },



    /*函数名：inputIsVal1
       参数：无
       描述：动态获取input的值
     * */
    inputIsVal1() {
      event.target.value.length ? this.isRm1 = true : this.isRm1 = false;
      this.inputLabel = event.target.value
    },
    /*函数名：clearVal
       参数：无
       描述：清空车牌号逻辑
     * */
    clearVal() {
      this.inputLabel = ""
      this.currentPage = 1
      const {pageSize} = this
      this.deviceSafeRightListForm(this.currentPage,pageSize,this.selectCompanyName,this.inputLabel,this.isOutStatus)
    },
    enterIndexPage(path) {
      // 路径从state中获取
      this.$router.replace(path)
    },
    /*函数名：handlefocus,handleblur
        参数：无
        描述：input输入车牌号聚焦与失焦样式
      * */
    handlefocus() {
      this.$refs.inputCarNum.style.backgroundColor = 'rgba(44, 149, 240, 0.3)'
    },
    handleblur() {
      this.$refs.inputCarNum.style.background = ''
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
      let {currentPage,selectCompanyName,isOutStatus,inputLabel} = this
      this.deviceSafeRightListForm(currentPage,this.pageSize,selectCompanyName,inputLabel,isOutStatus)
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      const{pageSize,selectCompanyName,isOutStatus,inputLabel} = this
      this.deviceSafeRightListForm(this.currentPage,pageSize,selectCompanyName,inputLabel,isOutStatus)
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
    background-image: url(../assets/images/index_bg.png);
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
				background: url(../assets/images/index_back.png) no-repeat;
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
      width: 32%;float: left;height:100%;padding-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      /*6s页面左侧上部*/
      &_top{
        flex: 1;
        width:100%;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        .home_title{
          padding-left: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 32px;
          line-height: 32px;
        }
        &_main{
          height: calc(100% - 47px);
          display: flex;
          margin: 5px auto 0 ;

          &_Cars{
            width: calc((100% - 45px)/3 );
            height: 100%;
            /*min-height: 90px;*/
            background: rgba(39,69,111,0.3);
            margin-right: 15px;
            &_module {
              width: 100%;
              height: 100%;
              padding: 15px 0;
              color: #fff;
              /*border: 1px solid #fff;*/
              &_num {
                text-align: center;
                line-height: 38px;
                font-size: 38px;
                font-family: fontnameRegular;
              }
              & > p {
                width: 100%;
                text-align: center;
                height: 30px;
                line-height: 30px;
                font-weight: 300;
                font-size: 24px;
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
              background: url("../assets/images/cars_bg.png") no-repeat;
              background-position: center 90%;
              background-size: 90% 40%;
              img{
                width: 65%;
                margin-top: 2%;
              }
            }
          }
          &_Cars:nth-child(1){
            color: #02BBFE;
          }
          &_Cars:nth-child(2){
            color: #49E664;
          }
          &_Cars:nth-child(3){
            color: #FF3566;
          }
          &_Cars:nth-child(4){
            color: #FBD603;
            margin-right: 0;
          }
        }
        /*background-color: #eee;*/
      }
      /*6s页面左侧上部*/
      &_center{
        flex: 2;
        width:100%;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        .home_title{
          padding-left: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 32px;
          line-height: 32px;
        }
        &_main{
          height: calc(100% - 47px);
          display: flex;
          margin: 15px auto 0 ;

          &_Cars{
            width: calc((100% - 45px)/3 );
            height: 100%;
            /*min-height: 90px;*/
            background: rgba(39,69,111,0.3);
            margin-right: 15px;
            &_module {
              width: 100%;
              height: 100%;
              padding: 15px 0;
              color: #fff;
              /*border: 1px solid #fff;*/
              &_num {
                text-align: center;
                line-height: 38px;
                font-size: 38px;
                font-family: fontnameRegular;
              }
              & > p {
                width: 100%;
                text-align: center;
                height: 30px;
                line-height: 30px;
                font-weight: 300;
                font-size: 24px;
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
              background: url("../assets/images/cars_bg.png") no-repeat;
              background-position: center 90%;
              background-size: 90% 40%;
              img{
                width: 65%;
                margin-top: 2%;
              }
            }
          }
          &_Cars:nth-child(1){
            color: #02BBFE;
          }
          &_Cars:nth-child(2){
            color: #49E664;
          }
          &_Cars:nth-child(3){
            color: #FF3566;
          }
          &_Cars:nth-child(4){
            color: #FBD603;
            margin-right: 0;
          }
        }
        /*background-color: #eee;*/
      }
      /*cars页面左侧下部*/
      &_bottom{
        flex: 2;
        width:100%;
        overflow:hidden;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
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

        &_main{
          height: calc(90% - 50px);
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
                width: 14%;
                height: auto;
                font-size: 14px;
                box-sizing:border-box;
                line-height:25px;
                text-align: center;
                user-select: auto;
              }
              span:nth-child(1){
                width:4%;
              }
              span:nth-child(2){
                width:15%;
              }
              span:nth-child(5), span:nth-child(6){
                width:18%;
              }
              /*span:nth-child(2), span:nth-child(3) {
                width:17%;
              }*/
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
          height: 35px!important;
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
      }
    }
    /*cars页面右侧盒子*/
    &_right{
      width: 68%;float: left;height:98%;
      overflow: hidden;
      position: relative;
      background: rgba(39,69,111,0.3);
      border: 1px solid rgba(255,255,255,0.1);
      margin-top: 15px;
      padding: 15px;
      .search{
        width: 100%;
        /*float: right;*/
        margin-top: 15px;
        margin-bottom: 20px;
        text-align: left;
        overflow: hidden;
        .module {
          width: 20%;
          height: 100%;
          margin-left: 20px;
          position: relative;
          display: inline-block;
          input {
            width: 100%;
            height: 35px;
            font-size: 14px;
            color: #2f96ef;
            line-height: 35px;
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
            background: url("../assets/images/rmReach.png") no-repeat center;
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
          width: 80px;
          height: 35px;
          line-height: 22px;
          background: gradient(linear, left top, left bottom, from(#0088FE), to(#4CDDED));
          background: linear-gradient(to top,  #0088FE,#4CDDED);
          background: -ms-linear-gradient(to top,  #0088FE,#4CDDED);
          font-size: 14px;
          color: #fff;
          text-align: center;
          border-radius: 3px;
          border: 1px solid #0088FE;
          margin-left: 40px;
          cursor: pointer;
          &:hover{
            background-color: #4CDDED;
          }
          &:active{
            background-color: #0088FE;
          }
        }

      }
      .title{
        width: 100%;
        color:white;
        height:35px;
        line-height: 35px;
        margin-top: 5px;
        padding: 0 3%;
        background-color:rgba(56, 142, 237, 0.5);
        span{
          display:inline-block;
          width:25%;
          height:25px;
          box-sizing:border-box;
          line-height:25px;
          font-size: 18px;
          color: #80dcf5;
          font-weight: bold;
          text-align: center;
        }
        span:nth-child(1){
          width:4%;
        }
        span:nth-child(5), span:nth-child(6){
          width:18%;
        }
      }
      .index_left_bottom_main{
        height: calc(90% - 50px);
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
              width: 25%;
              height: auto;
              font-size: 14px;
              box-sizing:border-box;
              line-height:25px;
              text-align: center;
              user-select: auto;
            }
            span:nth-child(1){
              width:4%;
            }
            span:nth-child(5), span:nth-child(6){
              width:18%;
            }
          }
          .title_message:hover{
            background:rgba(56,142,237,0.6);
          }
        }
      }
    }
    /deep/ .el-range-input {
      background-color:rgb(19, 44, 83)!important;
      color: #2F96EF!important;
    }
  }
</style>
<style lang="scss">
  .rightstyle{
  input.el-input__inner{
    background-color: rgba(44, 149, 240, 0.1);
    border: 1px solid #285e8c;
    color: #2f96ef;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev {
    color: #1f5bd3;
    background-color: rgba(44, 149, 240, 0.1);
  }
  .el-pager li {
    color: #2f96ef;
    background-color: rgba(44, 149, 240, 0.1);
  }
  .el-pager li.active {
    color: #fff;
    cursor: default;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev {
    color: #1f5bd3;
    background-color: rgba(44, 149, 240, 0.1);
  }
   .module{
     input.el-input__inner{
       background-color: rgba(44, 149, 240, 0.1);
       border: 1px solid #285e8c;
       color: #2f96ef;
       height: 35px!important;
     }
     .el-select{
       width: 100%;
     }
   }
}

</style>
