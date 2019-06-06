<template>
	       <div class="chartsBox">
				<div class="list">
					<div class="item">
						<div class="title_article">
							设备总数
						</div>
						<div class="charts equipmentCount">
							<div class="center_box">
								<p class="num" v-html="chartData.totalCount"></p>
								<p class="message">单位：台</p>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="title_article">
							在线数
						</div>
						<div class="charts onlineCount">
						  <div class="center_box">
								<p class="num" v-html="chartData.onLineCount"></p>
								<p class="message">单位：台</p>
							</div>	
						</div>
					</div>
					<div class="item">
						<div class="title_article">
							在线率
						</div>
						<div class="charts onlineLv" id="onlineLvClock">

						</div>
					</div>
					<div class="item">
						<div class="title_article">
							离线数
						</div>
						<div class="charts outlineCount">
							<div class="center_box">
								<p class="num" v-html="chartData.outLineCount"></p>
								<p class="message">单位：台</p>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="title_article">
							离线率
						</div>
						<div class="charts outlineLv" id="outlineLvClock">
						</div>
					</div>
					<div class="item">
						<div class="title_article">
							在线时长
						</div>
						<div class="charts onlineTime">
							<div class="center_box">
								<p class="num" v-html="onLineTotalHour"></p>
								<p class="message">单位：h</p>
							</div>	
						</div>
					</div>
					<div class="item">
						<div class="title_article">
							有效率
						</div>
						<div class="charts youxiaoLv" id="youXiaoClock">
						</div>
					</div>
				</div>
			  </div>
</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import http from '../../api/http'
	import {
		basicstaticInfo,
	} from '../../api'
	export default {
		name: 'equipmentsafety',
		data() {
			return {
				currentTime: '',
				index: 0,
				onLineTotalHour: '', //在线时长
				boardList: [], //看板数组
				chartData: {}, //上部echarts,
				companyCode: '0402', //工作中心编码
				companyName: '', //工作中心名
				onLineXdata: [],
				onLineYdata: [],
				onLineDayXdata: [],
				onLineDayYdata: [],
				onLineDayLvdata: [],
				clockaColor: ['#2EC13C', '#36EDFF'],
				clockbColor: ['#FE7600', '#FFC54C'],
				clockcColor: ['#0089FF', '#0089FF']
			};
		},
		mounted() {
			this.getEchartsList();	
			window.addEventListener('resize', this.handleResize);
		},
		created(){
			
		},
		methods: {
			handleResize() {
				
			},
			/*在线统计表*/
			async getEchartsList() {
				const res = await basicstaticInfo();
				if (res && res.data.ret == 200) {
					this.chartData = res.data.data;
					this.onLineTotalHour = res.data.data.onLineTotalHour.toFixed(2);
					const onLineRate = this.chartData.onLineRate.substr(0, this.chartData.onLineRate.length - 1); //在线率
					const outLineRate = this.chartData.outLineRate.substr(0, this.chartData.outLineRate.length - 1); //离线率
					const onLineHourRate = this.chartData.onLineHourRate.substr(0, this.chartData.onLineHourRate.length - 1); //离线率
					this.renderClock(document.getElementById('onlineLvClock'), onLineRate, this.clockaColor, '在线率');
					this.renderClock(document.getElementById('outlineLvClock'), outLineRate, this.clockbColor, '离线率');
					this.renderClock(document.getElementById('youXiaoClock'), onLineHourRate, this.clockcColor, '有效率');
				}
			},
		
			renderClock(dom, data, color, message) { //表盘echarts
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
						name: message,
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
										color: color[0]
									}, {
										offset: 1,
										color: color[1]
									}], false)]
								]
								// color: [[1,'#ff820d']]
							},
							length: 6
						},
						splitLine: { // 网格线
							show: true,
							lineStyle: {
							  color: ['#2c4264'],
							  width: 1,
							  type: 'dotted'
							}
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
							value: data,
							name: ''
						}]
					}]
				};

				if (option && typeof option === 'object') {
					myChart.setOption(option, true);
				}
			},

		},
	}
</script>

<style lang="scss" scoped>	
			.chartsBox {
				width: 100%;
				height: 3.20rem;
				background: rgba(39, 69, 111, 0.3);
				border: 1px solid rgba(255, 255, 255, 0.1); 
				margin-bottom: 0.15rem;
				display: flex;
				flex-direction: column;
				padding: 10px 20px 15px 20px;

				/*圆环echarts开始*/
				.list {
					flex: 1;
					display: flex;
					flex-direction: row;

					.item {
						flex: 1;
						margin-right: 20px;
						padding: 10px;
						//padding: 20px 25px 25px 25px;
						background: rgba(39, 69, 111, 0.3);
						/* border: 1px solid rgba(255, 255, 255, 0.1); */

						.title_article {
							color: #D1D6D9;
							font-size: 0.25rem;
							text-align: center;
							margin-bottom: 10px;
						}

						.charts {
							width: 90%;
							margin: 0 auto;
							height: calc(100% - 50px);
							position:relative;
                           .center_box{
								position:absolute;
								left:50%;
								top:50%;
								transform: translate(-50% , -50%);
							}
							p {
								text-align: center;
							}

							.num {
								/* height: 0.85rem; */
								/* padding-top: 0.50rem; */
								color: #01C9FC;
								font-weight: bold;
								font-size: 0.30rem;
							}

							.message {
								color: #009EC6;
								font-size: 0.14rem;
							}
						}

						.equipmentCount.charts {
							background: url(../../assets/images/shebeizongshu.png) no-repeat;
							background-size: 100% 100%;
						}

						.onlineCount.charts {
							background: url(../../assets/images/zaixianshu.png) no-repeat;
							background-size: 100% 100%;
						}

						.onlineLv.charts {
							background: url(../../assets/images/zaixianlv.png) no-repeat;
							background-size: 100% 100%;
						}

						.outlineCount.charts {
							background: url(../../assets/images/lixianshu.png) no-repeat;
							background-size: 100% 100%;
						}

						.outlineLv.charts {
							background: url(../../assets/images/lixianlv.png) no-repeat;
							background-size: 100% 100%;
						}

						.onlineTime.charts {
							background: url(../../assets/images/zaixianshic.png) no-repeat;
							background-size: 100% 100%;
						}

						.youxiaoLv.charts {
							background: url(../../assets/images/youxiaolv.png) no-repeat;
							background-size: 100% 100%;
						}

					}

					.item:last-child {
						margin-right: 0px;
					}
				}

				/*圆环echarts结束*/
			}

			
</style>
