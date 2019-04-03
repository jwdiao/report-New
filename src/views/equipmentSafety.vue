<template>
	<el-container>
		<el-header>
			<!--标头-->
			<div class="vision_title">
				<!-- <span @click="enterIndexPage">北京三一视觉考勤</span> -->
				<span>视觉设备安全在线统计</span>
			</div>
			<!--右上角时间-->
			<em class="time" v-text="currentTime"></em>
			<div class="control">
				<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
			</div>
		</el-header>
		<el-main style="overflow: hidden;">
			<!--上部的仪表盘开始-->
			<div class="chartsBox">
				<div class="title">
					在线统计表
				</div>
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
			<!--上部的仪表盘结束-->
			<div class="bottom_message">
				<div class="item">
					<div class="top">
						<div class="title">
							在线统计(%)
						</div>
						<div id="onlineCount"></div>
					</div>
					<div class="bottom">
						<div class="title">
							在线率日统计<span style="color:#23C6EF;">({{companyName}})</span>
						</div>
						<div id="onlineLv"></div>
					</div>
				</div>
				<div class="item">
					<div class="title">
						设备在线看板
					</div>
					<el-scrollbar class="message">
						<div class="lookBox">
							<div :class="{lookBox_item:true,active:index===key}" @click="companyClick(key)" v-for=" (item , key) in boardList" :key="key">
								<div class="lookBox_top" v-html="item.companyName">
									桩机
								</div>
								<div class="lookBox_bottom">
									<div class="lookBox_bottom_message">
										<span class="left">总数</span>
										<span class="right" v-html="item.totalCount"></span>
									</div>
									<div class="lookBox_bottom_message">
										<span class="left">在线数</span>
										<span class="right" v-html="item.onLineConut"></span>
									</div>
									<div class="lookBox_bottom_message">
										<span class="left">在线率</span>
										<span class="right" v-html="item.onLineRate"></span>
									</div>
									<div class="lookBox_bottom_message">
										<span class="left">离线数</span>
										<span class="right" v-html="item.outLineCount"></span>
									</div>
									<div class="lookBox_bottom_message">
										<span class="left">离线率</span>
										<span class="right" v-html="item.outLineRate"></span>
									</div>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import http from '../api/http'
	import {
		basicstaticInfo,
		onlineboard,
		onlineRateEchart
	} from '../api'
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
			this.currentTime = this.getCurrentDateTime();
			setInterval(() => {
				this.currentTime = this.getCurrentDateTime();
			}, 1000);
			setInterval(() => {
				this.getEchartsList();
				this.getOnlineboard();
				this.getOnlineRateEchart();
			},60000)
			this.getEchartsList();
			this.getOnlineboard();
			this.getOnlineRateEchart();
			window.addEventListener('resize', this.handleResize);
			/* this.renderEchartsOnlineCount(); */
			//this.renderEchartsOnlineLv();
		},
		methods: {
			handleResize() {
				/* echarts.init(document.getElementById('onlineCount')).resize();
				echarts.init(document.getElementById('onlineLv')).resize();
				echarts.init(document.getElementById('onlineLvClock')).resize();
				echarts.init(document.getElementById('outlineLvClock')).resize();
				echarts.init(document.getElementById('youXiaoClock')).resize(); */
			},
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
			enterIndexPage(path) {
				this.$router.replace(path);
			},
			companyClick(index) {
				this.index = index;
				this.companyName = this.boardList[index].companyName;
				this.companyCode = this.boardList[index].companyCode;
				this.getOnlineRateEchart();
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
			/*看板信息*/
			async getOnlineboard() {
				const res = await onlineboard();
				if (res && res.data.ret == 200) {
					console.log('看板信息：',res.data.data)
					this.boardList = res.data.data
					this.companyName = res.data.data[0].companyName
					this.onLineXdata = res.data.data.map((item) => {
						if (item.companyName.length > 4) {
							return item.companyName.substr(0, 4)
						} else {
							return item.companyName
						}

					}).reverse();
					this.onLineYdata = res.data.data.map((item) => {
						if (item.onLineRate.length > 6) {
							return 100
						} else {
							return Number(item.onLineRate.substr(0, item.onLineRate.length - 1)).toFixed(0)
						}

					}).reverse();
					this.renderEchartsOnlineCount(echarts.init(document.getElementById('onlineCount')), this.onLineXdata, this.onLineYdata)
				}
			},
			async getOnlineRateEchart() {
				const res = await onlineRateEchart(this.companyCode);
				console.log(res.data.data)
				if (res && res.data.ret == 200) {
					this.onLineDayXdata = res.data.data.xAxis;
					this.onLineDayYdata = res.data.data.onLineCountArr;
					this.onLineDayLvdata = res.data.data.onLineRateArr;
					/* console.log(this.onLineDayXdata);
					console.log(this.onLineDayYdata);
					console.log(this.onLineDayLvdata); */
					this.renderEchartsOnlineLv(echarts.init(document.getElementById('onlineLv')), this.onLineDayXdata, this.onLineDayYdata,
						this.onLineDayLvdata)
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

			renderEchartsOnlineCount(myChart, xData, YData) { //在线统计echarts
				var option = {
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '0%',
						top: '15%',
						containLabel: true
					},
					/* dataZoom:{//使echarts可以横向滚动
						show:true,
						realtime:true,
						y:36,
						height:20,
						start:20,
						end:80
					}, */
					xAxis: [{
						type: 'category',
						data: xData,
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
							rotate: 40
						},

					}],
					yAxis: [{
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
							formatter: '{value}%',
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
						},

					}],
					series: [{
						name: '在线率',
						type: 'bar',
						barWidth: '60%', // 控制柱子的宽度
						data: YData,
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[{
											offset: 0,
											color: '#2cd3ec'
										},
										{
											offset: 0.5,
											color: '#31aee9'
										},
										{
											offset: 1,
											color: '#387de6'
										}
									]
								),
								label: {
									show: true,
									position: 'top',
									formatter: '{c}',
									color: 'yellow' //这是关键，在需要的地方加上就行了
								},
								barBorderRadius: 5
							},

						},
						barGap: '20%' // 控制柱子的间隔
					}]
				};
				myChart.setOption(option)
			},
			renderEchartsOnlineLv(myChart, xData, YData, YlvData) { //在线率日统计
	
				const option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '0%',
						top: '15%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: xData,
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
							rotate: 40
						},
						
					}],
					yAxis: [{
							type: 'value',
							max:Math.max.apply(null,YData)+parseInt(Math.max.apply(null,YData)/20),
							//max:Math.max.apply(null,YData),
							//interval: 50,
							axisLine: { // 控制y轴线的样式
								lineStyle: {
									type: 'solid',
									color: '#55aefb',
									width: '1'
								}
							},
							axisLabel: {
								formatter: '{value}',
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
							},
						},
						{
							type: 'value',
							name: '在线率',
							show:false,
							min: 0,
							max: 100,
							interval: 5,
							axisLabel: {
								formatter: '{value}'
							},
							splitLine: { // 网格线
								show: false,
								lineStyle: {
									color: ['rgba(132,144,165,.5)'],
									width: 1,
									type: 'dotted'
								}
							},
						},

					],
					series: [{
							name: '在线数',
							type: 'bar',
							data: YData,
							itemStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(
										0, 0, 0, 1,
										[{
												offset: 0,
												color: '#2cd3ec'
											},
											{
												offset: 0.5,
												color: '#31aee9'
											},
											{
												offset: 1,
												color: '#387de6'
											}
										]
									),
									label: {
										show: false,
										position: 'top',
										formatter: '{c}',
										color: 'yellow' //这是关键，在需要的地方加上就行了
									},
									barBorderRadius: 5
								},

							}
						},
						{
							name: '在线率',
							type: 'line',
							yAxisIndex: 1,
							data: YlvData,
							itemStyle:{
								normal:{
									color:'yellow'
								}
							},
							symbol:'none',
							smooth:true
						}
					]
				};
				myChart.setOption(option);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.el-container {
		background: url(../assets/images/body_bg.png) no-repeat;
		background-size: 100% 100%;
		height: 100%;
		font-size: 12px;

		/*头部开始*/
		.el-header {
			color: #333;
			text-align: center;
			height: 1.10rem !important;
			background: url(../assets/images/body_title.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 0.20rem;
			position: relative;

			.vision_title {
				font-size: 0.44rem;
				color: #fff;
				font-weight: bold;
				height: 100%;

				span {
					margin-left: 0.15rem;
				}
			}

			.time {
				width: 2.40rem;
				font-size: 0.32rem;
				right: 44px;
				color: #ababab;
				position: absolute;
				top: 0.70rem;
				z-index: 10;
				text-align: left;
				font-family: fontnameUnidreamLED !important;
			}

			.control {
				width: 5.00rem;
				font-size: 0.32rem;
				left: 0.44rem;
				color: #ababab;
				position: absolute;
				top: 0.70rem;
				height: 0.40rem;

				div {
					float: left;
					font-size: 0.25rem;
					font-weight: bold;
					cursor: pointer;
					color: white;
				}

				.button {
					width: 90px;
					height: 40px;
					background: url(../assets/images/index_back.png) no-repeat;
				}
			}
		}

		/*头部结束*/
		.el-main {
			height: calc(100% - 110px);

			.title {
				color: #fff;
				font-size: 0.20rem;
				font-weight: bold;
				padding-left: 0.20rem;
				position: relative;
				margin-bottom: 0.08rem;
			}

			.title:before {
				display: block;
				content: '';
				position: absolute;
				width: 12px;
				height: 12px;
				border-radius: 12px;
				background: #31E6FF;
				left: 0px;
				top: 50%;
				margin-top: -5px;
			}

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
						padding: 20px 25px 25px 25px;
						background: rgba(39, 69, 111, 0.3);
						/* border: 1px solid rgba(255, 255, 255, 0.1); */

						.title_article {
							color: #D1D6D9;
							font-size: 0.25rem;
							text-align: center;
							margin-bottom: 10px;
						}

						.charts {
							width: 80%;
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
							background: url(../assets/images/shebeizongshu.png) no-repeat;
							background-size: 100% 100%;
						}

						.onlineCount.charts {
							background: url(../assets/images/zaixianshu.png) no-repeat;
							background-size: 100% 100%;
						}

						.onlineLv.charts {
							background: url(../assets/images/zaixianlv.png) no-repeat;
							background-size: 100% 100%;
						}

						.outlineCount.charts {
							background: url(../assets/images/lixianshu.png) no-repeat;
							background-size: 100% 100%;
						}

						.outlineLv.charts {
							background: url(../assets/images/lixianlv.png) no-repeat;
							background-size: 100% 100%;
						}

						.onlineTime.charts {
							background: url(../assets/images/zaixianshic.png) no-repeat;
							background-size: 100% 100%;
						}

						.youxiaoLv.charts {
							background: url(../assets/images/youxiaolv.png) no-repeat;
							background-size: 100% 100%;
						}

					}

					.item:last-child {
						margin-right: 0px;
					}
				}

				/*圆环echarts结束*/
			}

			/*底部两个echarts和设备在线看板开始*/
			.bottom_message {
				height: calc(100% - 3.15rem);
				display: flex;
				flex-direction: row;

				#onlineLv {
					height: calc(100% - 0.34rem);
				}

				#onlineCount {
					height: calc(100% - 0.34rem);
				}

				.item:nth-of-type(1) {
					flex: 1;
					margin-right: 15px;
					display: flex;
					flex-direction: column;

					.top,
					.bottom {
						flex: 1;
						background: rgba(39, 69, 111, 0.3);
						border: 1px solid rgba(255, 255, 255, 0.1);
						padding: 10px 20px 15px 20px;

					}

					.top {
						margin-bottom: 15px;
					}
				}

				.item:nth-of-type(2) {
					background: rgba(39, 69, 111, 0.3);
					border: 1px solid rgba(255, 255, 255, 0.1);
					width: 10.86rem;
					padding: 10px 20px 15px 20px;

					.message {
						width: 100%;
						height: calc(100% - 44px);
						margin-top: 5px;
						padding-bottom: 15px;
						margin-top: 15px;
						overflow: hidden;

						/deep/ .el-scrollbar__wrap {
							overflow-x: hidden;
						}

						.lookBox {
							width: 100%;
							display: flex;
							flex-direction: row;
							flex-wrap: wrap;

							.lookBox_item {
								width: 200px;
								height: 250px;
								margin-right: 8px;
								margin-bottom: 15px;
								cursor: pointer;

								.lookBox_top {
									text-align: center;
									width: 200px;
									height: 50px;
									background: #2B4B86;
									color: #52E4FD;
									font-size: 0.20rem;
									line-height: 50px;
									position: relative;
									padding: 0px 4px;
									white-space: nowrap;
									text-overflow: ellipsis;
									overflow: hidden;
								}

								/* .lookBox_top:after {
									content: '';
									display: block;
									position: absolute;
									top: 0;
									right: 0;
									width: 0;
									height: 0;
									border-top: 25px solid #11223D;
									border-left: 26px solid transparent;
								} */
								/*设备在线看板开始*/
								.lookBox_bottom {
									background: rgba(27, 50, 91, 0.6);
									width: 200px;
									height: 200px;
									padding: 20px 15px;

									/*看板开始*/
									.lookBox_bottom_message {
										height: 32px;

										span {
											display: inline-block;
											vertical-align: top;
										}

										.left {
											margin-right: 20px;
											color: #fff;
											font-size: 0.16rem;
											text-align: right;
											width: 60px;
											line-height: 25px;
										}

										.right {
											text-align: left;
											color: #00CAFA;
											font-weight: 400;
											font-size: 0.22rem;
										}
									}

									/*看板结束*/
								}

								/*设备在线看板结束*/
							}

							.lookBox_item.active {
								border: 2px solid #4B88DE;
								box-sizing: initial;

								.lookBox_top {
									background: #3D73D3;
								}

								.lookBox_bottom {
									background: #284F92;
								}
							}
						}
					}
				}
			}

			/*底部两个echarts和设备在线看板结束*/
		}
	}
</style>
