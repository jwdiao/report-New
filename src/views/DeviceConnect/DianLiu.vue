<template>
  <div style="height:100%;width:100%">
    <div id="elecbox2" style="width:100%;height:100%;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'DianLiu',
  data() {
    return {
      myChartDidanliu: '',
      allEchartsArr: [],
      activespan: 'ia',
      dianliuData: [],
      dianliuId:''
    }
  },
  mounted() {
    // 电流
    this.myChartDidanliu = echarts.init(document.getElementById("elecbox2"));
    this.allEchartsArr.push(this.myChartDidanliu);
    this.renderDianliu('2M1X61HIHLC1');
		window.addEventListener('resize', this.handleResize);
  },
  methods: {
    numPad(number, length) {
      return (''+number).padStart(length, 0)
    },
    getFormatTimeString(now) {
      var str1 = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
      var str2 = [this.numPad(now.getHours(), 2), this.numPad(now.getMinutes(), 2), this.numPad(now.getSeconds(), 2)].join(':')
      return str1 + " " + str2;
    },
    getDianliuDataOneSecond2() {
      const response = {
        // 主轴转速 (RPM)
        mainKey: [
          { value: [ '2016/2/18 03:00:10', 5000 ] },
        ],
        // 主轴负载率 (%)
        mainLv: [
          { value: [ '2016/2/18 03:00:10', 120 ] },
        ],
        // 进给率 (%)
        jinLv: [
          { value: [ '2016/2/18 03:00:10', 10 ] },
        ],
      }
      // debugger
      this.dianliuData.mainKey.push(response.mainKey)
      this.dianliuData.mainLv.push(response.mainLv)
      this.dianliuData.jinLv.push(response.jinLv)
      this.myChartDidanliu.setOption({
        series: [
          {
            data: this.dianliuData.mainKey
          },
          {
            data: this.dianliuData.mainLv
          },
          {
            data: this.dianliuData.jinLv
          }
        ]
      });
    },
    // 2分钟获取电流
    async getDianliuTowMinuteData () {
      // const res = await getNewCurrentsInfo2(id)
      const res1 = {
        "code": 200,
        "data": {
            "deviceResponseDtos": [
                {
                    "actSpin": "0.00",
                    "actFeed": "0.00",
                    "spinLoad": "0.00"
                },
                {
                    "actSpin": "0.00",
                    "actFeed": "0.00",
                    "spinLoad": "0.00"
                }
            ]
        },
        "msg": null
      }
      /* let dataArr = res1.data.deviceResponseDtos
      for(var k=0;k<dataArr.length;k++){
        var obj = {}
        obj.name = time2
        obj.value = [time2, yValue]
        this.dianliuData.push(obj)
      } */
          this.dianliuData = {
            // 主轴转速 (RPM)
            mainKey: [
              { value: [ '2016/2/18 03:00:00', 245 ] },
              { value: [ '2016/2/18 03:00:01', 635 ] },
              { value: [ '2016/2/18 03:00:02', 412 ] },
              { value: [ '2016/2/18 03:00:03', 412 ] },
              { value: [ '2016/2/18 03:00:04', 852 ] },
              { value: [ '2016/2/18 03:00:05', 245 ] },
            ],
            // 主轴负载率 (%)
            mainLv: [
              { value: [ '2016/2/18 03:00:00', 20 ] },
              { value: [ '2016/2/18 03:00:01', 46 ] },
              { value: [ '2016/2/18 03:00:02', 70 ] },
              { value: [ '2016/2/18 03:00:03', 90 ] },
              { value: [ '2016/2/18 03:00:04', 60 ] },
              { value: [ '2016/2/18 03:00:05', 100 ] },
            ],
            // 进给率 (%)
            jinLv: [
              { value: [ '2016/2/18 03:00:00', 80 ] },
              { value: [ '2016/2/18 03:00:01', 55 ] },
              { value: [ '2016/2/18 03:00:02', 20 ] },
              { value: [ '2016/2/18 03:00:03', 80 ] },
              { value: [ '2016/2/18 03:00:04', 20 ] },
              { value: [ '2016/2/18 03:00:05', 70 ] },
            ],
          }
          this.myChartDidanliu.setOption({
            series: [
              {
                data: this.dianliuData.mainKey
              },
              {
                data: this.dianliuData.mainLv
              },
              {
                data: this.dianliuData.jinLv
              }
            ]
          });
          this.dianliuId = setInterval(() => {          
            if (this.dianliuData.mainKey.length > 5) {
              this.dianliuData.mainKey.shift();
              this.dianliuData.mainLv.shift();
              this.dianliuData.jinLv.shift();
            }
            // this.getDianliuDataOneSecond2();
          }, 2000);
          return;
      // [
        //   { name: '2016/2/18 03:00:00', value: [ '2016/2/18 03:00:00', 363 ] },
        //   { name: '2016/2/18 03:00:00', value: [ '2016/2/18 04:00:00', 384 ] },
        //   { name: '2016/2/18 03:00:00', value: [ '2016/2/18 05:00:00', 371 ] },
        // ]

      const res = {
        data: [
          [
              { value: [ '2016/2/18 03:00:00', 245 ] },
              { value: [ '2016/2/18 04:00:00', 635 ] },
              { value: [ '2016/2/18 05:00:00', 412 ] },
          ],
          [
              { value: [ '2016/2/18 03:00:00', 245 ] },
              { value: [ '2016/2/18 04:00:00', 635 ] },
              { value: [ '2016/2/18 05:00:00', 412 ] },
          ],
          [
              { value: [ '2016/2/18 03:00:00', 245 ] },
              { value: [ '2016/2/18 04:00:00', 635 ] },
              { value: [ '2016/2/18 05:00:00', 412 ] },
          ],
        ],
        code: 200
      }
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
        

        grid: {
          top: 50,
          bottom: 20,
          left: 40,
          right: 40,
        },
        tooltip: {
          trigger: 'axis',
          /* formatter: (params) => {
            console.log('yyyy:',params)
            params = params[0];
            var date = new Date(params.name);
            return this.getFormatTimeString(date)+' '+params.value[1];
          }, */
          axisPointer: {
            animation: false
          }
        },
				color:['#fe5985','#51ddff','#ffd641'],
        legend: {
					data:[{name:'主轴转速 (RPM)'},{name:'主轴负载率 (%)'},{name:'进给率 (%)'}],
          icon: 'roundRect',
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 4,
          textStyle: {
            fontWeight: "normal", // 标题颜色
            color: "#fff"
          }, 
          top: 10,
          bottom: 0 
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
        yAxis: [
          {
            type: 'value',
            symbol: 'rect',
            name: '百分比', //主轴转速 (RPM)/主轴负载率 (%)
            nameTextStyle: {
              color: '#fff',
              align: 'left',
              padding:[0,20,0,0]
            },
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
          {
            type: 'value',
            // name: '进给率 (%)',
            name: 'RPM',
            nameTextStyle: {
              color: '#fff',
              align: 'left',
              padding:[0,20,0,0]
            },
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
          }
        ],
        series: [
          {
            name: '主轴转速 (RPM)',
            type: 'line',
						smooth: true,
						showSymbol: false,
            yAxisIndex:1,
            // showSymbol: false,
            hoverAnimation: false,
              animationDuration: 800,
            lineStyle: {
              color: '#fe5985'
            },
            data: [],
            // data: [
            //   { value: [ '2016/2/18 03:00:00', 245 ] },
            //   { value: [ '2016/2/18 04:00:00', 635 ] },
            //   { value: [ '2016/2/18 05:00:00', 412 ] },
            // ]
          },
          {
            name: '主轴负载率 (%)',
            type: 'line',
						smooth: true,
						showSymbol: false,
            // showSymbol: false,
            hoverAnimation: false,
            animationDuration: 800,
            lineStyle: {
              color: '#51ddff'
            },
            data: [],
            // data: [
            //   { value: [ '2016/2/18 03:00:00', 52 ] },
            //   { value: [ '2016/2/18 04:00:00', 46 ] },
            //   { value: [ '2016/2/18 05:00:00', 70 ] },
            // ]
          },
          {
            name: '进给率 (%)',
            type: 'line',
						smooth: true,
						showSymbol: false,
            // showSymbol: false,
            hoverAnimation: false,
              animationDuration: 800,
            lineStyle: {
              color: '#ffd641'
            },
            data: [],
            /* data: [
              { value: [ '2016/2/18 03:00:00', 42 ] },
              { value: [ '2016/2/18 04:00:00', 55 ] },
              { value: [ '2016/2/18 05:00:00', 35 ] },
            ] */
          },
        ]
      };
      this.myChartDidanliu.setOption(option, true);


      // 刚开始获取最新的2分钟之内的数据
      this.getDianliuTowMinuteData();



      // 定时器间隔1s请求1次
      /* setInterval(() => {
        if (this.dianliuData.length >= 120) {
          this.dianliuData.shift();
        }      
        this.getDianliuDataOneSecond(deviceUuid, this.activespan);
      }, 1000); */
    },
		handleResize(){
			echarts.init(document.getElementById('elecbox2')).resize();
		}
  }
}
</script>

