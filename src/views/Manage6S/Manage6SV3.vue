<template>
	<div class="manage6s">
		<!-- 头部 start -->
		<div class="manage6s_top">
			<div class="manage6s_imgText">
				<span>
					北京桩机三现数据中心
				</span>
			</div>
			<!--右上角时间-->
			<em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
		</div>
		<!-- 头部 end -->

		<!-- main start -->
		<div class="manage6s_main">
			<div class="top_box">
				<div class="left_count_box">
				  <div class="top" style="height:100%;">
					<div class="title">
						<span class="circle">●</span>&nbsp;
						<span class="message">6s统计</span>
						<span style="width:250px;display:inline-block"></span>
						<span class="count">总数</span>&nbsp;&nbsp;
						<span class="number">{{leftTopData.alleventnum}}</span>
					</div>
					<div class="pieBox">
						<div class="left">
							<div class="anqm_box">
								<div class="item">
									<div>安全帽</div>
									<div>{{leftTopData.aqmnum}}</div>
								</div>
								<div class="item">
									<div>物料乱放</div>
									<div>{{leftTopData.wllfnum}}</div>
								</div>
							</div>
							<div class="rydg_box">
								<div class="item">
									<div>人员怠工</div>
									<div>{{leftTopData.hxqyjcnum}}</div>
								</div>

								<div class="item">
									<div>地面清洁</div>
									<div>{{leftTopData.wlqznum}}</div>
								</div>
							</div>

						</div>
						<div class="right">
							<div class='right_message'>报警率</div>
							<div id='chartPie'>

							</div>
						</div>
					</div>
				</div>
				</div>
				<div class="right_echarts_box">
					<div class="title">
						<span class="circle">●</span>&nbsp;
						<span class="message">子公司统计</span>
					</div>
					<div class="day" id="manage6s-day-echarts"></div>
				</div>
			</div>
			<div class="bottom_box">
				<div class="bottom_box_top" title="点击放大">
					<div class="bottom_box_top_img" v-for="(item , index) in getAbsentListTop" :key="item.id" @click="hanleClick(item,index)">
						<img :src="item.eventimgurl" alt="" style="width:100%;height:98%;">
						<div class="bottom_log"><span>{{item.eventtype=='cvNoHelmet'?'安全帽事件':item.eventtype}}</span></div>
					</div>
				</div>
				<div class="bottom_box_bottom" >
					<div class="bottom_box_bottom_img" v-for="(item , index) in getAbsentListBottom" :key="item.id" @click="hanleClick(item,index)">
						<img :src="item.eventimgurl" alt="" style="width:100%;height:98%;">
						<div class="bottom_log"><span>{{item.eventtype=='cvNoHelmet'?'安全帽事件':item.eventtype}}</span></div>
					</div>
				</div>
			</div>
		</div>
		<!-- main end -->
        <div class="dialog" v-show='dialogBoxShow' title='点击还原' @click='dialogClick'>
			<img :src="dialogSrc" alt="" style="width:100%;height:100%;">
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import http from '../../api/http'
	import {
		getEventInforList,
		getEventInforStatisday,
		getSelectList1,
		getEventInforcompany
	} from '../../api'
	// 顶部环形图
	export default {
		name: 'Manage6SV3',
		data(){
			return {
				refreshDataId: '',
				refreshDataId2: '',
				dialogSrc:'',
				dialogBoxShow:false,
				currentTime: '', // 系统当前时间
				message:'aa',
				monthEchartsRight: [], //接收echarts初始化之后的返回对象,
				dayEchartsDataRight: { //日统计
					datadaystr: [], // X轴数据
					suml: [], // 事件总数
					sumTrueMax: '', //真数据最大值
					lenName: '6s事件日统计'
				}, // 右侧日echarts图
				leftTopData:{},
				getAbsentListTop:[],
				getAbsentListBottom:[],
			}
		},
		mounted(){
		    this.currentTime = this.getCurrentDateTime();
			this.refreshDataId = setInterval(() => {
				this.currentTime = this.getCurrentDateTime();
			}, 1000);
			this.refreshDataId2 = setInterval(() => {

				this.getSelectListHttp('', 1, 8);
				this.getEventInforcompany();
				this.getEventInforListHttp();
			}, 30000);
			this.getEventInforListHttp();

			this.getSelectListHttp('', 1, 8);
			this.getEventInforcompany();
			this.renderClock(document.getElementById('chartPie'),{name:'报警率',value:30});
			window.addEventListener('resize', this.handleResize); //给window对象绑定resize事件
		},
		methods:{
			enterIndexPage(path) {
				// 路径从state中获取
				// window.location.href = `${this.$store.state.baseUrl}/sanyShebei` //测试
				this.$router.replace(path);
			},
			// 时间格式化
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
			handleResize() {
				//给每一个echarts添加resize事件
				this.monthEchartsRight.forEach((ele, index) => {
					ele.resize();
				})
			},
			hanleClick(item,index){
				this.dialogSrc = item.eventimgurl
				this.dialogBoxShow = true;
				console.log('aa')
				console.log('item:',item);
				console.log('index:',index);
			},
			dialogClick(){
			    this.dialogSrc = ''
				this.dialogBoxShow = false;
			},
			async getSelectListHttp(eventtype, page, pagesize) {
				var res = await getSelectList1(eventtype, page, pagesize);
				this.getAbsentListTop = res.data.getAbsentList.slice(0,4);
				this.getAbsentListBottom = res.data.getAbsentList.slice(4,8);
				console.log('cc',res.data.getAbsentList)
				console.log('aa',this.getAbsentListTop);
				console.log('bb',this.getAbsentListBottom);
			},
			/*仪表图*/
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
										color: '#076AC5'
									}, {
										offset: 1,
										color: '#0A9CC1'
									}], false)]
								]
								// color: [[1,'#ff820d']]
							},
							length: 6
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
					myChart.setOption(option, true);
				}
			},

			/*
			  左上部分的接口
			*/
			async getEventInforListHttp(){
				const res = await getEventInforList();
				if(res&&res.data.ret == 200){
					  this.leftTopData = res.data;
				}
			},

			async getEventInforcompany(){
				const res = await getEventInforcompany();
				if (res.data && res.data.ret == 200) {
					this.dayEchartsDataRight.datadaystr = res.data.xAxis; // x轴
					console.log(this.dayEchartsDataRight.datadaystr);
					this.dayEchartsDataRight.suml = res.data[111]; //总数
					this.dayEchartsDataRight.sumTrueMax = Math.max.apply(null, res.data[111]); //真数据最大值
					var dayEchartsRight = echarts.init(document.getElementById("manage6s-day-echarts"));
					this.monthEchartsRight.push(dayEchartsRight);
					this.renderEcharts(dayEchartsRight, this.dayEchartsDataRight);
				}
			},
			renderEcharts(myChart, data) {
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						},
						/* formatter:'{a0}' */
						formatter: `{b0}<br/>
						<span style="display:inline-block;width:10px;height:10px;border-radius:5px;background:rgba(1, 187, 255, 1);">
						</span>&nbsp;{a0} : {c0}`
					},
					grid: {
						bottom: 50,
						top: 10,
						left:50,
						right:10
					},
					legend: {
						data: [{
								name: '6s事件统计走势',
								icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAMAAACDi47UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjQ3NjZBN0JGNDY5MTFFOEJCNjM4QzFDNjc4NzQyM0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjQ3NjZBN0NGNDY5MTFFOEJCNjM4QzFDNjc4NzQyM0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNDc2NkE3OUY0NjkxMUU4QkI2MzhDMUM2Nzg3NDIzRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNDc2NkE3QUY0NjkxMUU4QkI2MzhDMUM2Nzg3NDIzRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po8SnNMAAAA/UExURf/LF//NF//eHP/KFv/SGf/OGP/aG//UGf/WGv/jHv/rIP/IFv/QGP/YGv/lHv/pH//cHP/nH//hHf/tIP///9HlZOcAAAAVdFJOU///////////////////////////ACvZfeoAAAAqSURBVHjaYhDBAhiIFxTm4hfk4xRiEmDj5WBn4WFlZGDmplSQMicBBBgAF/kMWUwXodQAAAAASUVORK5CYII='
							},
							data.lenName
						],
						show: false,
						itemWidth: 20, //设置图例的宽高
						itemHeight: 10,
						textStyle: {
							fontWeight: "normal", //标题颜色
							color: "#fff"
						},
						top: 10,
						bottom: 0
					},
					xAxis: [{
						type: 'category',
						data: data.datadaystr, // x轴数据

						axisLine: { // 控制x轴线的样式
							lineStyle: {
								type: 'solid',
								color: '#2c4264',
								width: '1'
							}
						},
						axisLabel: {
							// formatter: '{value}',
							textStyle: {
								//color: '#2fdaeb',
								color: '#2fdaeb'
							},
							interval: 0,
							rotate: 40
						},
						axisPointer: {
							type: 'shadow'
						},
						axisTick: { // 控制x轴坐标刻度不显示
							show: false
						},

					}],
					yAxis: [{
							type: 'value',
							name: '',
							//max: data.sumTrueMax + parseInt(data.sumTrueMax / 3),
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
						},

					],
					series: [{
						name: data.lenName,
						type: 'bar',
						//radius: '10%',
						data: data.suml,
						itemStyle: {
							normal: {
								//barBorderRadius: [4, 4, 4, 4],
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[{
											offset: 0,
											color: '#2cd3ec'
										},
										{
											offset: 0.5,
											color: '#32a6e9'
										},
										{
											offset: 1,
											color: '#387de6'
										}
									])
							}
						},
						barWidth: 18, // 控制柱子的宽度
						barGap: '50%', // 控制柱子的间隔
					}]
				};
				myChart.setOption(option, true);
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.handleResize)
		},
		destroyed() {
			clearInterval(this.refreshDataId);
			clearInterval(this.refreshDataId2);
		},

	}
</script>
<style lang="scss" scoped>
	.manage6s {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-image: url(../../assets/images/common/BG.png);
		background-size: 100% 100%;
		color: rgb(255, 255, 255);
		background-repeat: no-repeat;
		overflow: hidden;

		.manage6s_imgText {
			font-size: 0.30rem;
			color: #fff;
			font-weight: bold;
			text-align: center;
			display:flex;
			justify-content: center;
			align-items: center;
			height:46px;
		}

		.time {
			width: 270px;
			text-align: left;
		}

		.button {
			width: 90px;
			height: 40px;
			background: url(../../assets/images/index_back.png) no-repeat;
			position: fixed;
			top: 25px;
			left: 15px;
			cursor: pointer;
		}

		.title {
			margin: 0px auto 5px;
		}


		&_top {
			text-align: center;
			height: 60px;
			//padding-top: 20px;
			box-sizing: border-box;
			background-image: url(../../assets/images/common/BT.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			padding-bottom: 20px;

			&_imgText {
				display: inline-block;
				cursor: pointer;
			}

			img {
				display: inline-block;
				vertical-align: middle;
				width: 50px;
			}

			.title {
				font-size: 30px;
				color: #0ccfeb;
				display: inline-block;
				vertical-align: middle;
				font-size: 44px;
				color: #fff;
				cursor: pointer;
				font-weight: bold;
			}

			.time {
				font-size: 35px;
				color: #ababab;
				display: inline-block;
				vertical-align: middle;
				position: fixed;
				top: 25px;
				right: 70px;
				z-index: 10;
				font-family: fontnameUnidreamLED;
			}
		}
        /*內容整體開始*/
		.manage6s_main {
			height: calc(100% - 60px);
			padding: 20px;
            /* display:flex;
			flex-direction:column; */
			.top_box{
                height:240px;
				display:flex;
				//margin-bottom:20px;
				margin-bottom:10px;
				.left_count_box{
					width:475px;
					background: rgba(39, 69, 111, 0.3);
					border: 1px solid rgba(255, 255, 255, 0.1);
					padding:15px;
					margin-right:15px;
					.top{
						.pieBox{
							width:100%;
							height:calc(100% - 36px);
							background:rgba(42, 75, 133, 0.3);
							padding: 31px 40px 15px 40px;
							display: flex;
							.left{
								//width:180px;
								flex:2;
								display:flex;
								flex-wrap: wrap;
								.anqm_box{
									flex:1;
								}
								.rydg_box{
									flex:1;
								}
								.item{
								   width:90px;
								   height:74px;
								   div:nth-of-type(1){
									   font-size:18px;
								   }
								   div:nth-of-type(2){
									   color:#0ccfeb;
									   font-size:25px;
								   }
								}
								.item:nth-of-type(3) , .item:nth-of-type(4){
									padding-top:10px;
								}

							}
							.right{

								flex:1;
								//padding:0px 10px 10px 20px;
								.right_message{
									font-size:18px;
									text-align: center;
								}
								#chartPie{
									width:85%;
									margin:0 auto;
									height:calc(100% - 20px);
									margin-top:10px;
								    background-image: url(../../assets/images/index_clock-blue.png);
									background-size: 100% 100%;
								}
							}
						}
					}
				}
				.right_echarts_box{
					flex:1;
					background: rgba(39, 69, 111, 0.3);
					border: 1px solid rgba(255, 255, 255, 0.1);
					padding: 15px;
					.day{
						height:calc(100% - 35px);
					}
				}
			}
			.bottom_box{
				//flex:1;
				background: rgba(39, 69, 111, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 10px 15px;
				//265
				height:calc(100% - 240px);
				/* display:flex;
				flex-direction: column; */
				.bottom_log{
					position:absolute;
					bottom:0px;
					width:100%;
					height:30px;
					background:rgba(0,0,0,.3);
					line-height:30px;
					color:#00C9FF;
					font-size:15px;
					font-weight: bold;
					padding-left: 20px;
				}
				.bottom_box_top{
					//flex:1;
					height:calc(50% - 10px);
					margin-bottom:10px;
					display:flex;
					cursor:pointer;
					.bottom_box_top_img{
						border: 1px solid rgba(255, 255, 255, 0.1);
						position:relative;
						flex:1;
						height:100%;
					}
					.bottom_box_top_img:nth-of-type(2){
						margin:0px 10px;
					}
					.bottom_box_top_img:nth-of-type(3){
						margin-right:10px;
					}
				}
				.bottom_box_bottom{
					//flex:1;
					height:calc(50% - 5px);
					display:flex;
					cursor:pointer;
					.bottom_box_bottom_img{
						border: 1px solid rgba(255, 255, 255, 0.1);
						position:relative;
						flex:1;

					}
					.bottom_box_bottom_img:nth-of-type(2){
						margin:0px 10px;
					}
					.bottom_box_bottom_img:nth-of-type(3){
						margin-right:10px;
					}
				}
			}
		}
		/*内容整体结束*/
	}
    .dialog{
		position: fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background:rgba(0,0,0,.6);
		cursor:pointer;
		//padding:20px;
	}
	.title{

		.circle{
			color:#31E6FF;
			font-size:23px;
		}
		.message{
			font-size:22px;
			font-width:bold;
		}
		.count{
			font-size:20px;
			font-style:italic;
		}
		.number{
			font-size:27px;
			color:#31E6FF;
			vertical-align: sub;
		}
	}
</style>


