<template>
  <div class="abnormal">
    <div class="abnormal-item">
      <p class="home_title">安防周界日统计</p>
      <div class="day" id="day"></div>
    </div>
    <div class="abnormal-item">
      <p class="home_title ">安防周界月统计</p>
      <div class="month" id="month"></div>
    </div>
    <div class="abnormal-item">
      <p class="home_title ">安防周界年日统计</p>
      <div class="year" id="year"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import http from '../../api/http'
  import {reqRightEchartsData} from '../../api'

  export default {
    name: 'carsManage',
    data() {
      return {
        chartsAData: {  //日
          xData: [],
          insideCars: [],  //处理数量
          externalCars: [], //异常数量
        },
        chartsBData: { // 月
          xData: [],
          insideCars: [],
          externalCars: [],
        },
        chartsCData: { //年
          xData: [],
          insideCars: [],
          externalCars: [],
        },
        rightEchartsAutoArr:[],// 右侧echarts区域根据屏幕自适应
      }
    },
    mounted() {
      this.carRightForm('year');
      this.carRightForm('month');
      this.carRightForm('day');
      setInterval(() =>{
        this.carRightForm('year');
        this.carRightForm('month');
        this.carRightForm('day');
      },300000)

      this.myEChartsYear = echarts.init(document.getElementById('year'));
      this.rightEchartsAutoArr.push(this.myEChartsYear)
      this.myEChartsMouth = echarts.init(document.getElementById('month'));
      this.rightEchartsAutoArr.push(this.myEChartsMouth)
      this.myEChartsDay = echarts.init(document.getElementById('day'));
      this.rightEchartsAutoArr.push(this.myEChartsDay)
      window.addEventListener('resize',this.handleResize)

    },
    methods: {
      //右侧echarts区域根据屏幕自适应
      handleResize(){
        this.rightEchartsAutoArr.forEach((ele, index) => {
          ele.resize()
        })
      },

      async carRightForm (DateType) {
        // const res = await http.post('/carPlater/getSanyCarDataStatic', {querySign: DateType});
        const res = await reqRightEchartsData(DateType)
        if (res && res.data.code === 200) {
          switch (DateType){
            case 'year':  //年echarts图
              const myEChartsYear = echarts.init(document.getElementById('year'));
              this.chartsCData.xData = res.data.data.xAxis; // X轴
              this.chartsCData.insideCars = res.data.data.insideArr; // 内部
              this.chartsCData.externalCars = res.data.data.outsideArr; // 外部
              // this.chartsCData.bigTruck = res.data.carTruckNumval; //大货车
              this.renderEchartsC(myEChartsYear, this.chartsCData);
              break;
            case 'month':  // 月echarts图
              const myEChartsMouth = echarts.init(document.getElementById('month'));
              this.chartsBData.xData = res.data.data.xAxis; // X轴
              this.chartsBData.insideCars = res.data.data.insideArr; // 内部
              this.chartsBData.externalCars = res.data.data.outsideArr; // 外部
              // this.chartsBData.bigTruck = res.data.carTruckNumval; //大货车
              this.renderEchartsB(myEChartsMouth, this.chartsBData)
              break;
            default:  // 日echarts图
              const myEChartsDay = echarts.init(document.getElementById('day'));
              this.chartsAData.xData = res.data.data.xAxis; // X轴
              this.chartsAData.insideCars = res.data.data.insideArr; // 内部
              this.chartsAData.externalCars = res.data.data.outsideArr; // 外部
              // this.chartsAData.bigTruck = res.data.carTruckNumval; //大货车
              // this.chartsAData.percent = ['10', '30', '50', '70', '100', '30', '55', '60', '70', '100', '30']
              this.renderEchartsA(myEChartsDay, this.chartsAData);
              break;
          }
        }
      },
      renderEchartsA(myChart, data){
        var option = {
          legend: {
            data: ['处理数量', '异常数量', '百分比'],   //    , '大货车'
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
            }/*,
            {
              name: '百分比',
              type: 'value',
              nameTextStyle: {
                color: '#2fdaeb',
              },
              min: '0',
              max: '100',
              interval: 20,
              position: 'right',
              // max: data.maxY,
              // interval: data.intervalY,
              axisLine: { // 控制y轴线的样式
                show: true,
                lineStyle: {
                  type: 'solid',
                  width: '1',
                  color: '#2fdaeb'
                }
              },
              axisLabel: {
                formatter: '{value}%',
                textStyle: {
                  color: '#2fdaeb'
                },
                showMinLabel: true, // 是否显示最小 tick 的 label
                showMaxLabel: true, // 是否显示最大 tick 的 label
                verticalAlign: 'right'
              },
              splitLine: { // 网格线
                show: false,
                lineStyle: {
                  color: ['#2DD7EC'],
                  width: 1,
                  type: 'dotted'
                }
              }
            }*/
          ],
          series: [
            {
              name: '处理数量',
              type: 'bar',
              data: data.insideCars,
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
                  // barBorderRadius: 10 //控制圆柱形
                }
              },
              barWidth: 4, // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name: '异常数量',
              type: 'bar',
              data: data.externalCars,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#fd87a7'},
                      {offset: 0.5, color: '#e45a88'},
                      {offset: 1, color: '#c82867'}
                    ]
                  ),
                  // barBorderRadius: 10 //控制圆柱形
                }
              },
              barWidth: 4,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            /*{
              name: '百分比',
              type: 'line',
              yAxisIndex: 1,
              data: data.percent,
              showAllSymbol: true,
              symbol: 'emptyCircle',
              symbolSize: 3,
              smooth: true,
            }*/
          ]
        }
        myChart.setOption(option)
      },
      renderEchartsB(myChart, data){
        var option = {
          legend: {
            data: ['处理数量', '异常数量'],  //  , '大货车'
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
          // grid: { top: '25%', left: '10%', right: 0, bottom: '25%'},
          grid: { top: '25%', left: '10%', right: '0', bottom: '20%'},
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
              name: '处理数量',
              type: 'bar',
              data: data.insideCars,
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
                  // barBorderRadius: 10 //控制圆柱形
                }
              },
              barWidth: 2, // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name: '异常数量',
              type: 'bar',
              data: data.externalCars,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#fd87a7'},
                      {offset: 0.5, color: '#e45a88'},
                      {offset: 1, color: '#c82867'}
                    ]
                  ),
                  // barBorderRadius: 10 //控制圆柱形
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
            data: ['处理数量', '异常数量'],  //, '大货车'
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
              name: '处理数量',
              type: 'bar',
              data: data.insideCars,
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
                  // barBorderRadius: 10   //控制圆柱形
                }
              },
              barWidth: 7, // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
            {
              name: '异常数量',
              type: 'bar',
              data: data.externalCars,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#fd87a7'},
                      {offset: 0.5, color: '#e45a88'},
                      {offset: 1, color: '#c82867'}

                    ]
                  ),
                  // barBorderRadius: 10 //控制圆柱形
                }
              },
              barWidth: 7,  // 控制柱子的宽度
              barGap: '20%' // 控制柱子的间隔
            },
          ]
        }
        myChart.setOption(option)
      },
    }
}
</script>
<style lang="scss" scoped>
  .abnormal {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-item {
      flex: 1;
      overflow: hidden;
      position: relative;
      background: rgba(39,69,111,0.3);
      border: 1px solid rgba(255,255,255,0.1);
      margin-top: 15px;
      padding: 15px;
      .home_title {
          height: 32px;
          line-height: 32px;
          padding-left: 24px;
          font-weight: bold;
          font-size: 21px;
					position: relative;
      }
			.home_title:after{
					display: block;
					content: '';
					position: absolute;
					width: 10px;
					height: 10px;
					border-radius: 12px;
					background: #31E6FF;
					left: 0px;
					top: 42%;
					margin-top: -5px;
			}
      .day {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100% - 24px);
        li {
          flex: 1;
          text-align: center;
        }
      }
      .month {
        width: 100%;
        height: calc(100% - 24px);
      }
      .year {
        width: 100%;
        height: calc(100% - 24px);
      }
    }

  }
</style>
