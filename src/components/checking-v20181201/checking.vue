<template>
	<div style="height:100%">
    <div class="checking-text" style="height:33%">
      <p class="home_title">人员考勤信息</p>
      <div class="checktest-wrap">
        <div class="total-pro">
          <img src="../../assets/history/images/B.png" alt="">
          <div>
            <p>{{info.totalNum}}</p>
            <span>计件总人数</span>
          </div>
        </div>
        <div class="single-pro">
          <ul class="top">
            <li>
              <p v-text="info.userRecordNum"></p>
              <span>考勤人数(人)</span>
            </li>
            <li>
              <p v-text="Math.round(info.recordTime*100)/100"></p>
              <span>考勤时间</span>
            </li>
            <li>
              <div  id="shangganglv" class="lv"></div>
              <span>考勤率</span>
            </li>

            <li>
              <p v-text="info.planNum"></p>
              <span>计划考勤人数(人)</span>
            </li>
            <li>
              <div  id="kaoqinlv" class="lv"></div>
              <span>计划考勤率(%)</span>
            </li>
          </ul>
          <ul class="bottom"> 
            <li>
              <p v-text="Math.round(info.onWorkTime*100)/100"></p>
              <span>有效在岗时间(h)</span>
            </li>
            <li>
              <p v-text="info.onWorkNum"></p>
              <span>在岗人数(人)</span>
            </li>
            <li>
              <div  id="zaiganglv" class="lv"></div>
              <span>在岗率(%)</span>
            </li>
            <li>
              <p v-text="info.validNum"></p>
              <span>有效在岗人数(人)</span>
            </li>
            <li>
              <div  id="jihuakaoqinlv" class="lv"></div>
              <span>有效上岗率(%)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="checking-list" style="height:65%">
      <p class="home_title">人员考勤列表</p>
      <div class="checklist-wrap">
        <!--search-->
          <div class="checking-search">
            <input class="searchname" type="text" placeholder="姓名" ref="workname" @keyup="keyupevent">
            <input class="searchtext" type="text" placeholder="工号" ref="worknum" @keyup="keyupevent">
            <div class="gosearch" @click="searchProInfo">搜索</div>
            <div class="clear" @click="clearProInfo">清空</div>
            <div class="kaoqin" @click="checking">考勤</div>
          </div>
        <!--Echarts-->
        <div id="checkingv20181201-echarts-time" class="echarts-time" :class="{off:cameramap}"></div>
        <!--平面图-->
        <div class="echarts-time cameramap" :class="{off:!cameramap}">
          <img src="../../assets/history/images/zhuangji-map.png" style="width:100%;margin:auto;" />
          <ul class="camera-list" ref="camerawrap">
            <li v-show="cameraArr.indexOf('办公楼北侧门_人脸1')+1" class="camera camera1">
            </li>
            <li v-show="cameraArr.indexOf('办公楼北侧门_人脸2')+1" class="camera camera2">
            </li>
            <li v-show="cameraArr.indexOf('办公楼北大门_人脸1')+1"  class="camera camera3">
            </li>
            <li v-show="cameraArr.indexOf('办公楼北大门_人脸2')+1"  class="camera camera4">
            </li>
            <li v-show="cameraArr.indexOf('机加区西侧入口_人脸2')+1"  class="camera camera5">
            </li>
            <li v-show="cameraArr.indexOf('机加区西侧入口_人脸1')+1"  class="camera camera6">
            </li>
            <li v-show="cameraArr.indexOf('A2门_人脸1')+1"  class="camera camera7">
            </li>
            <li v-show="cameraArr.indexOf('A2门_人脸2')+1"  class="camera camera8">
            </li>
            <li v-show="cameraArr.indexOf('机加区东侧入口_人脸2')+1"  class="camera camera9">
            </li>
            <li v-show="cameraArr.indexOf('机加区东侧入口_人脸1')+1"  class="camera camera10">
            </li>
            <li v-show="cameraArr.indexOf('D4门_人脸1')+1"  class="camera camera11">
            </li>
            <li v-show="cameraArr.indexOf('D4门_人脸2')+1"  class="camera camera12">
            </li>
            <!--个人信息-->
            <div :class="{off:isShow}" class="scrollProInfoItem">
              <div>
                <div v-for="(proItem,index) in personInfoArr" :key="index" :class="`personInfo${index}`">
                  <div class="num">{{personInfoArr.length - index}}</div>
                  <img :src="proItem.snappicurl" alt="" >
                  <div class="information">
                    <div class="infoName">姓名: <span>{{proItem.workname}}</span></div>
                    <div class="infoNum">工号: <span>{{proItem.workno}}</span></div>
                    <div class="infoDepartment">部门: <span>{{proItem.department}}</span></div>
                    <div class="infoName">时间: <span>{{proItem.pushtime.substr(11,8)}}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <!--列表显示-->
        </div>
      </div>
    </div>
	</div>
</template>

<script>
 	var echarts = require('echarts');
  import BScroll from 'better-scroll';
  import $https from '../../api/http'
	export default {
   name: 'checking20181201',
	 data () {
     return{
       cameraArr:[],  //存放摄像头名称的数组
       personInfoArr:[],//存放同一个工人的个人信息
       cameramap:false,  //false是曲线图   true是摄像头平面图
       isShow:false,//显示个人信息框
       inputFun:'',
       recordList:[],   //后台返回的数据类型
      //  info: {},
       arr:[
         {name:'在岗人数',icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAcCAIAAABQ7lBqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABN0lEQVR42u3YPUvDQBzH8b4HAwp2sIggOlR8AFNJYnx5vZTSKEivOFSrS+lQEDLUwWYzDTS0Je1QF8G8Dg9+zb/g46JovYPPlhu+w3G5+2e0pCwsPTugJaVX6NMna+aeyrD86EJ2yEkuqMNGtwnb3i3kW3ewe30Pei0Awx2AzUZCZhGLS98pLV6ZnsHqiJO1Xh2oeMtrQ77VgYOGD0fVEIxKH07YRFDFEhbvX3WhwAMwTiOwi2NBFctcrNdCmBezWFDFMhcXeAhUbLHYUsWyF6enW/rPs9hYUMUyF+vVBzDdCI6diaCKZS4+5D0w3QH89dPtHxV//Tz+tZvQ7C1N+3j2llbFP1+cjlGKoCXsjQ9nLu8spgnL9ByywwuSCy9h3b+BTa8NO80O7DV8oH1sVyIwnVhYvOIXO0QEvs58x+cAAAAASUVORK5CYII='},
         {name:'上岗率',icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAMAAACDi47UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzc3M0EwNkZGNDZCMTFFOEE4MENDQzE4QTFFMTYzM0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzc3M0EwNzBGNDZCMTFFOEE4MENDQzE4QTFFMTYzM0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NzczQTA2REY0NkIxMUU4QTgwQ0NDMThBMUUxNjMzRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NzczQTA2RUY0NkIxMUU4QTgwQ0NDMThBMUUxNjMzRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnqnvUsAAAAGUExURQ3M6v///4xgKIUAAAACdFJOU/8A5bcwSgAAABZJREFUeNpiYMQCGIgXpAWgzEkAAQYAMgoAedKY9esAAAAASUVORK5CYII=\n'},     //图例的样式设置
         ],
       annularChart1:"",
       annularChart2:"",
       annularChart3:"",
       annularChart4:"",
       annularChartDataOne:{},  //有效上岗率
       annularChartDataTwo:{},   //考勤率
       annularChartDataThree:{},  //计划考勤率
       annularChartDataour:{},    //在岗率
       hourEcharts:"",    //1小时考勤
       hourEchartsData:{},
       hourEchartsDataArr:[], //between x轴
       hourEchartsDataSGArr:[], //between 在岗人数
       hourEchartsDataLVArr:[], //between 在岗率
      //  hourEchartsDataArr: [],
       leftInterval: '',
       leftMax: ''
     }
   },
   props: ['info','hourEchartsDataBetween'],
   watch: {
      info () {
        // 如果有基本信息，渲染中间顶部的4个echarts图
       if (this.info) {
        //  this.renderEchartsCircle()
        this.renderDom()
       }
      },
      hourEchartsDataBetween () {
        if (this.hourEchartsDataBetween) {
         /* 1小时考勤 */
          this.hourEchartsData =  {
            // secData:['1分钟','2分钟','3分钟','4分钟','5分钟','6分钟','7分钟','8分钟','9分钟','10分钟','11分钟','12分钟','13分钟','14分钟','15分钟','16分钟','17分钟','18分钟','19分钟','20分钟','21分钟','22分钟','23分钟','24分钟','25分钟','26分钟','27分钟','28分钟','29分钟','30分钟','31分钟','32分钟','33分钟','34分钟','35分钟','36分钟','37分钟','38分钟','39分钟','40分钟','41分钟','42分钟','43分钟','44分钟','45分钟','46分钟','47分钟','48分钟','49分钟','50分钟','51分钟','52分钟','53分钟','54分钟','55分钟','56分钟','57分钟','58分钟','59分钟','60分钟'],
            secData: this.hourEchartsDataBetween.xAxis, // X轴
            numData: this.hourEchartsDataBetween.dateStr, // 在岗人数
            lvData: this.hourEchartsDataBetween.dateStrval,// 在岗率
            max: this.hourEchartsDataBetween.max,
            interval: this.hourEchartsDataBetween.interval
          };
          var hourEcharts = echarts.init(document.getElementById('checkingv20181201-echarts-time'))
          this.renderEchartsHour(hourEcharts, this.hourEchartsData)
        }
      }
    },
	 components: {
	 },
	 computed: {
	 },
   created () {

   },
	 mounted() {
    //  debugger;
          // this.getBaseDataInfo();
    //  this.getHourEchartsDataInfo();
     /* setInterval(() =>{
         this.getBaseDataInfo();
      },10000)
     setInterval(() =>{
        this.getHourEchartsDataInfo();
     },30000) */
   },
   methods: {
    getBaseDataInfo () {
      this.http.post('/sanyAttendanceData/getAttendanceData', {
        centername: ''
      })
      .then((response) => {
        debugger;
        var res = response.data
        if (res.ret == 200) {
          this.info = res.titledata
          this.renderDom()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getHourEchartsDataInfo () {
      this.http.post('/sanyAttendanceData/getWorkIngEchartsData', {
        centername: ''
      })
        .then((response) => {
          var res = response.data
          if (res.ret == 200) {
            // console.log("between:",res)
            this.hourEchartsDataArr = res.xAxis //between X轴
            this.hourEchartsDataSGArr = res.dateStr //between 在岗人数
            this.hourEchartsDataLVArr = res.dateStrval //between 在岗率
            this.leftMax = res.max
            this.leftInterval = res.interval
            this.renderDom()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
     //以图搜人
    getCameraProInfo (workname,workno) {
      // console.log(workname,workno)
       this.$https.post('/sanyUserPushRecord/searchUserRecordHis', {
         workname:workname,
         workno:workno
       })
         .then((response) => {
           var res = response.data
           if (res.ret == 200) {
             this.recordList = res.userHistoryList
             // console.log( this.recordList)
             this.cameraArr = []
             this.personInfoArr = []
             this.cameramap = true
             this.isShow = false
             const {recordList} = this
             for (let i = 0; i < recordList.length; i++) {
               var cameraName = recordList[i].snapshotplace
               var workers = recordList[i].workname
               var workergh = recordList[i].workno
               if(workname === workers || workname === workergh) {
                 this.personInfoArr.push(recordList[i])
                 if(this.cameraArr.indexOf(cameraName) === -1){
                   this.cameraArr.push(cameraName)
                 }
               }
             }
             const {personInfoArr} = this
             $('.camera').empty()
             for (var i = 0; i < personInfoArr.length; i++) {
               var personInfoItemName = personInfoArr[i].snapshotplace
               var redPoint = document.createElement('div')
               redPoint.setAttribute('class',`person person${i+1}`)
               redPoint.append(personInfoArr.length-i)
               if(personInfoItemName === '办公楼北侧门_人脸1'){
                 $('.camera1').append(redPoint)
               }else if(personInfoItemName === '机加区东侧入口_人脸2'){
                 $('.camera9').append(redPoint)
               }else if(personInfoItemName === '机加区东侧入口_人脸1'){
                 $('.camera10').append(redPoint)
               }else if(personInfoItemName === '办公楼北侧门_人脸2'){
                 $('.camera2').append(redPoint)
               }else if(personInfoItemName === '办公楼北大门_人脸1'){
                 $('.camera3').append(redPoint)
               }else if(personInfoItemName === '办公楼北侧门_人脸2'){
                 $('.camera4').append(redPoint)
               }else if(personInfoItemName === '机加区西侧入口_人脸2'){
                 $('.camera5').append(redPoint)
               }else if(personInfoItemName === '机加区西侧入口_人脸1'){
                 $('.camera6').append(redPoint)
               }else if(personInfoItemName === 'A2门_人脸1'){
                 $('.camera7').append(redPoint)
               }else if(personInfoItemName === 'A2门_人脸2'){
                 $('.camera8').append(redPoint)
               }else if(personInfoItemName === 'D4门_人脸1'){
                 $('.camera11').append(redPoint)
               }else if(personInfoItemName === 'D4门_人脸2'){
                 $('.camera12').append(redPoint)
               }
               $('.person').css({
                 'width':'15px',
                 'height':'15px',
                 'backgroundColor':'#ff0000',
                 'position': 'absolute',
                 'border': '1px solid #6894BA',
                 'borderRadius':'10px',
                 'display': 'inline-block',
                 'textAlign': 'center',
                 'fontSize': '10px'
               })
               $(`.person${i+1}`).css({
                 'top':((i+1)%2===0)?40+'px':10+'px',
                 'left':((i+1)%2===0)?((i+1)/2*15)+'px':(8*(i+1))+'px'
               })
             }
             new BScroll('.scrollProInfoItem',function () {
               scrollY = true
             })
           }
         })
         .catch(function (error) {
           console.log(error);
         });
     },
    renderDom () {
      /*四个效率图*/
      this.annularChart1 = echarts.init(document.getElementById('shangganglv'));
      this.annularChart2 = echarts.init(document.getElementById('kaoqinlv'));
      this.annularChart3 = echarts.init(document.getElementById('jihuakaoqinlv'));
      this.annularChart4 = echarts.init(document.getElementById('zaiganglv'));
      this.annularChartDataOne = {e:this.info.recordRate}   //考勤上岗率
      this.annularChartDataTwo = {e:this.info.workPlanRate}    //计划考勤率
      this.annularChartDataThree = {e:this.info.validRate}   //有效考勤率
      this.annularChartDataour = {e:this.info.onWorkRate}     //在岗率
      this.renderEcharts(this.annularChart1,this.annularChartDataOne)
      this.renderEcharts(this.annularChart2,this.annularChartDataTwo)
      this.renderEcharts(this.annularChart3,this.annularChartDataThree)
      this.renderEcharts(this.annularChart4,this.annularChartDataour)
      /*1小时考勤*/
      this.hourEcharts = echarts.init(document.getElementById('checkingv20181201-echarts-time'));
      this.hourEchartsData =  {
        // secData:['1分钟','2分钟','3分钟','4分钟','5分钟','6分钟','7分钟','8分钟','9分钟','10分钟','11分钟','12分钟','13分钟','14分钟','15分钟','16分钟','17分钟','18分钟','19分钟','20分钟','21分钟','22分钟','23分钟','24分钟','25分钟','26分钟','27分钟','28分钟','29分钟','30分钟','31分钟','32分钟','33分钟','34分钟','35分钟','36分钟','37分钟','38分钟','39分钟','40分钟','41分钟','42分钟','43分钟','44分钟','45分钟','46分钟','47分钟','48分钟','49分钟','50分钟','51分钟','52分钟','53分钟','54分钟','55分钟','56分钟','57分钟','58分钟','59分钟','60分钟'],
        secData:this.hourEchartsDataArr, //X轴
        numData:this.hourEchartsDataSGArr, //在岗人数
        lvData:this.hourEchartsDataLVArr,//在岗率
        max: this.leftMax,
        interval: this.leftInterval
      };
      this.renderEchartsHour(this.hourEcharts,this.hourEchartsData)
    },
	   //四个考勤率
    renderEcharts(myChart,data){
      var option = {
        title: {
          show: true,
          text: data.e,
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: '22',
            color: '#0182F2',
            fontWeight: 'normal'
          }
        },

        color: ["rgba(51,86,173,0.3)"],
        legend: {
          orient: 'vertical',
          x: 'left',
          show: true
        },
        series:
          {
            name: '',
            type: 'pie',
            radius: ['80%', '100%'],
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            hoverAnimation: false,
            itemStyle:{
              barBorderRadius:'50%'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data.e,

                itemStyle: {

                  color: {
                    type: 'linear',
                    colorStops: [
                      {
                        offset: 0.2, color: '#0AA3E6' // 0% 处的颜色
                      },
                      {
                        offset: 1, color: '#9D22E6' // 100% 处的颜色
                      }],
                    globalCoord: true // 缺省为 false
                  }
                }
              },
              {value: 100 - data.e}
            ]
          }

      };
      myChart.setOption(option, true);
    },
    //1小时考勤统计
    renderEchartsHour(myChartH,data){
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data:this.arr,
          show:true,
          x:680,    //图例水平位置
          itemWidth:20,  //设置图例的宽高
          itemHeight:10,
          textStyle: {
            fontWeight: "normal",              //标题颜色
            color: "#fff"
          }
        },
         grid:{    //调整坐标轴
           x:30,
           y:30,
           x2:52,
           y2:20
         },
         dataZoom:[{
          show:false,
           start:0,
           end:120,
           zoomLock:true,   //禁止鼠标缩放
         },
           {
             type:'inside',
             start:0,
             end:60,
             zoomLock:true,
           }],
        xAxis: [
          {
            type: 'category',
            data: data.secData,
            axisLine: {  // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#56AFFB',
                width:'1' }
            },
            axisPointer: {
              type: 'shadow'
            },
            axisLabel : {
              formatter: '{value}',
              textStyle: {
                color: '#2DD7EC'
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            // min: 0,
            max: data.max,
            interval: data.interval,
            axisLine: {  // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#23BBEC',
                width:'1' }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#3AD6E1'
              }
            },
            splitLine: { //网格线
              show: false,
              lineStyle:{
                color: ['#2DD7EC'],
                width: 1,    //
                type: 'dotted'
              }
            }
          },
          {
            type: 'value',
            name: '',
            min: 0,
            max: 100,
            interval: 20,
            smooth:true,
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#3AD6E1'
              }
            },
            axisLine: {  // 控制y轴线%的样式
              lineStyle: {
                type: 'solid',
                color: '#23BBEC',
                width:'1' }
            },
            splitLine: {
              show: false,
              lineStyle:{
                color: ['#23BBEC'],
                width: 1,
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name:'在岗人数',
            type:'bar',
            data:data.numData,
            itemStyle: {
              normal: {
                barBorderRadius:[0, 0, 20, 20],   //柱状图加圆角
                barBorderRadius: 20,  //圆柱体效果边界圆角
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#13F192'},
                    {offset: 1, color: '#478FEC'}
                  ]
                )
              }
            },

            barWidth: 6, // 控制柱子的宽度
            barGap:'50%' // 控制柱子的间隔
          },
          {
            name:'上岗率',
            type:'line',
            yAxisIndex: 1,
            symbol: "none",
            smooth:true,
            data:data.lvData,
            itemStyle: {
              normal: {
                lineStyle:{
                  width:5      //曲线粗细样式
                },
                color: 'rgba(13,204,233, 1)'//颜色以及透明度，注意如果要修改透明度，一定要配置在itemStyle里面，直接写在外面不起作用。
              }
            }
          }
        ]
      };
        myChartH.setOption(option, true);
    },
    //搜索
    searchProInfo(){
      const workerName = this.$refs.workname.value
      const workerNumber = this.$refs.worknum.value
      this.getCameraProInfo(workerName,workerNumber)
    },
     //清空
    clearProInfo(){
      this.$refs.workname.value = ""
      this.$refs.worknum.value = ""
      this.cameraArr =[]
      this.isShow = true
      this.personInfoArr = []
      $('.camera').empty()
    },
     //考勤
    checking(){
      this.cameramap = false
    },
    //camera个数 添加类
    // setClass(index){
    //   let obj = {camera:true}
    //   obj[`camera${index+1}`] = true
    //   return obj
    // },
    //摄像头内的人数 类
    // setlocation(index){
    //   let obj = {}
    //   obj[`person${index+1}`] = true
    //   return obj
    // },
    //摄像头的样式
    setStyle(index){
      let obj ={}
      obj['top'] = ((index+1)%2===0)?40+'px':10+'px'
      obj['left'] = ((index+1)%2===0)?((index+1)/2*20)+'px':(10*(index+1))+'px'
      return obj
    },
     keyupevent(){
       const workerName = this.$refs.workname.value
       const workerNumber = this.$refs.worknum.value
       // console.log(workerName)
       if(workerName === '' && workerNumber === ''){
         this.cameraArr =[]
         this.isShow = true
         this.personInfoArr = []
        /* this.arrOne=[];this.arrTwo=[]; this.arrThree=[]; this.arrFour=[]; this.arrFive=[]; this.arrSix=[];
         this.arrSev=[]; this.arrEig=[]; this.arrNig=[]; this.arrTen=[]; this.arrEle=[]; this.arrTew=[];*/
       }
     }
  }
 }
</script>

<style lang="scss" scoped>
  // @import '~@/assets/css/home';
  .checking-text{
    .checktest-wrap{
      .single-pro{
        &>ul>li:nth-child(1){
          background: url("../../assets/history/images/C1.png") no-repeat;
          background-size: cover;
        }
        &>ul>li:nth-child(2){
          background: url("../../assets/history/images/C2.png") no-repeat;
          background-size: cover;
        }
        &>ul>li:nth-child(4){
          background: url("../../assets/history/images/C3.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
  .checking-list{
    .checklist-wrap{
      &>.cameramap{
        background:url("../../assets/history/images/zhuangji-map.png") no-repeat;
        background-color:rgba(3,11,29,0.7);
        background-size: 95% 100%;
        background-position-x: 18px;
        margin-bottom: 30px;
      }
    }
  }
</style>
