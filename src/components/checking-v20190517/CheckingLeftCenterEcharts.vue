<template>
  <div class="leftCenterEcharts">
    <ul class="statusListBottom">
      <li>
        <p class="statusNum">派工率</p>
          <div class="open lv echartsImg" id="jhkqlv"></div>
      </li>
      <li>
        <p class="statusNum">出勤率</p>
        <div class="lv echartsImg start" id="kaoqinlv"></div>
      </li>
      <li>
        <p class="statusNum">在岗率</p>
        <div class="lv echartsImg problem" id="zaiganglv"></div>
      </li>
      <li>
        <p class="statusNum">有效上岗率</p>
        <div class="lv echartsImg totalE" id="yxsglv"></div>
      </li>
      <li>
        <p class="statusNum">总工时</p>
        <div class="echartsImg runHourNum">
          <div>
            <p class="numPoint" v-show="info&&info.recordTime" style="letter-spacing:-1px;">{{Math.round(info.recordTime*100)/100}}</p>
            <p class="numPoint" v-show="!info || !info.recordTime">0</p>
            <em>单位:h</em>
          </div>
        </div>
      </li>

      <!--<li>
        <p class="statusNum">有效在岗时间</p>
        <div class="echartsImg runLV" id="runLV">
          <div>
            <p class="numPoint" v-show="info&&info.onWorkTime" style="letter-spacing:-1px;">{{Math.round(info.onWorkTime*100)/100}}</p>
            <p class="numPoint" v-show="!info || !info.onWorkTime">0</p>
            <em>单位:h</em>
          </div>
        </div>
      </li>-->

    </ul>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "CheckingCenterEcharts",
    props:['info'],
    watch:{
      info(){
        if (this.info) {
          this.renderEchartsCircle()
        }
      }
    },
    methods:{
      /* 四个考勤率 */
      renderClock(dom, data) {
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
          series: [{
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
                color: [
                  [1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: data.color.startColor
                  }, {
                    offset: 1,
                    color: data.color.endColor
                  }], false)]
                ]
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
            detail: {
              formatter: '{value}%',
              color: '#fff',
              offsetCenter: [0, '70%'],
              fontSize: 20
            },
            data: [{
              value: data.value,
              name: ''
            }]
          }]
        }
        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
        }
      },
      /* 四个考勤率 */
      renderEchartsCircle() {
        // 计划考勤率 jhkqlv
        var jhkqlvEcharts = document.getElementById('jhkqlv')
        this.workPlanRateObj = {
          name: '派工率',
          // color: '#0097ff',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          // value: this.info.workPlanRate
          value: this.info.newWorkPlanRate // 最新的
        }
        this.renderClock(jhkqlvEcharts, this.workPlanRateObj)

        // 考勤率
        var kaoqinlvEcharts = document.getElementById('kaoqinlv')
        this.recordRateObj = {
          name: '出勤率',
          // color: '#ff8f19',
          color: {

            startColor: '#2FC343',
            endColor: '#36EBF5'
          },
          value: this.info.recordRate
        }
        this.renderClock(kaoqinlvEcharts, this.recordRateObj)

        // 在岗率 zaiganglv
        var zaiganglvEcharts = document.getElementById('zaiganglv')
        this.workPlanRateObj = {
          name: '在岗率',
          // color: '#0097ff',
          color: {
            startColor: '#ff7905',
            endColor: '#ffbf46'
          },
          // value: this.info.onWorkRate
          value: parseFloat(this.info.onWorkRate) > 100 ? '100' : this.info.onWorkRate
        }
        this.renderClock(zaiganglvEcharts, this.workPlanRateObj)

        // 有效上岗率 yxsglv
        var yxsglvEcharts = document.getElementById('yxsglv')
        this.validRateObj = {
          name: '有效上岗率',
          // color: '#ff8f19',
          color: {
            startColor: '#0090ff',
            endColor: '#00e2ff'
          },
          value: this.info.validRate
        }
        this.renderClock(yxsglvEcharts, this.validRateObj)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .leftCenterEcharts{
    height: 170px;
    display: flex;flex-direction: column;
    .statusListBottom{
      display: flex;
      li{
        flex: 1;text-align: center;margin-right: 0.1rem;
        padding: 0.1rem;
        background: rgba(42,75,133,0.3);
        .statusNum{
          font-size: 0.24rem;color:#d5d5d5;
        }
        .echartsImg{
          /*width: 178px;*/
          height: 110px;
          margin: 0.1rem;
          display: flex;justify-content: center;align-items: center;
          div{
            width: 1.61rem!important;
            /*height: 1.1rem !important;*/
            margin-top: 10%;
            color: #02c9fc;
            .numPoint{
              color: #02c9fc;font-size: 0.24rem;
            }

          }
        }
        .open{
          background: url("../../assets/images/youxiaolv.png") no-repeat center;
          background-size: 55% 100%;
        }
        .runHourNum{
          background: url("../../assets/images/zaixianshu.png") no-repeat center;
          background-size: 55% 100%;
        }
        .start{
          background: url("../../assets/images/index_clock-green.png") no-repeat center;
          background-size: 55% 100%;
        }
        .runLV{
          background: url("../../assets/images/lixianshu.png") no-repeat center;
          background-size: 55% 100%;
        }
        .problem{
          background: url("../../assets/images/lixianlv.png") no-repeat center;
          background-size: 55% 100%;
        }
        .totalE{
          background: url("../../assets/images/youxiaolv.png") no-repeat center;
          background-size: 55% 100%;
        }
      }
      li:nth-last-child(1){
        margin-right: 0;
      }
    }
  }
</style>
