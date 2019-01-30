<template>
	<div class="manage6s">
		<!-- 头部 start -->
		<div class="manage6s_top">
			<div class="manage6s_imgText">
				北京三一桩机三现数据中心
			</div>
			<!--右上角时间-->
			<em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
		</div>
		<!-- 头部 end -->

		<!-- main start -->
		<div class="manage6s_main">
			<div class="manage6s_left">
				<div class="manage6s_left_top">
					<p class="home_title home_title-blue">6S统计</p>
					<div  class="count">
						<span >总数</span>
						<span >{{alleventnum}}</span>
					</div>
					<div class="manage6s_left_echarts">
						<!--四个echarts指针开始-->
						<div class="item" v-for="(item, index) in chartArr" :key="item.id">
							<div class="top">
								<div>{{item.title}}</div>
								<div>{{item.message}}</div>
							</div>
							<div class="bottom">
								<div class="echarts" :id="item.id"></div>
							</div>
						</div>
						<!--四个echarts指针结束-->
					</div>
				</div>
				<div class="manage6s_left_bottom">
					<p class="home_title home_title-zhuapai">实时事件抓拍</p>
					<div class="manage6s_capture">
						<div :class="{image:true}" @click="bigImg" title="点击放大">
							<img :src="eventsnapimg" alt="">
						</div>
					  <div class="imageBig" title="点击还原" v-show="bigImgShow" @click="bigImgHide">
							  <img :src="eventsnapimgBig" alt="">
						</div>
						<div class="message">
							<!--事件选择下拉框开始-->
							<div class="common_select">
								  <el-select v-model="value" placeholder="请选择" @change="change()">
								  		<el-option
								  		v-for="item in options"
								  		:key="item.value"
								  		:label="item.label"
								  		:value="item.value"
								  		>
								  		</el-option>
								  </el-select>
							</div>
							  
							<!--事件选择下拉框结束-->
							
						<!--实时事件抓拍表格开始-->
							<div class="title">
								<span style="width:15%;text-align:center;">序号</span>
								<span style="width:30%;">事件名称</span>
								<span style="width:35%;">抓拍地点</span>
								<span style="width:20%;">抓拍时间</span>
							</div>
							<div v-show="warnShow" class="warnshow" >该事件暂无数据</div>

							<el-scrollbar class="manage6s_capture-con">
								 
									<div :class="{title_message:true,title_active:index==activeIndex}" v-for="(item, index) in snapEventListArr" :key="item.id" @click="addImg(index)">
										<span v-text="item.num" style="width:15%;text-align:center;"></span>
										<span v-text="item.eventname" style="width:30%;"></span>
										<span v-text="item.souevents" style="width:35%;"></span>
										<span v-text="item.eventstarttimestr" style="width:20%;"></span>
									</div>
							</el-scrollbar>
						<!--实时事件抓拍表格结束-->
						<div class="common_paginaton" v-show="pageShow" style="margin-top:10px;">
							<template>
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
									:page-sizes="[10,18, 30, 40, 50]" :page-size="pageSize" 
									layout="total, sizes, prev, pager, next" 
									:total="tableTotal"
									style="height:100%;">
									</el-pagination>
							</template>
						</div>
						</div>

					</div>
				</div>
			</div>
			<div class="manage6s_right">
				<div class="attendance">
					<div class="attendance-item">
						<p class="home_title home_title-date">6S事件日统计</p>
						<div class="day" id="manage6s-day-echarts"></div>
					</div>
					<div class="attendance-item">
						<p class="home_title home_title-mouth">6S事件月统计</p>
						<div class="month" id="manage6s-mouth-echarts"></div>
					</div>
					<div class="attendance-item">
						<p class="home_title home_title-year">6S事件年统计</p>
						<div class="year" id="manage6s-year-echarts"></div>
					</div>
				</div>
				<!-- <Dianliu></Dianliu> -->
				<!-- <Paigong/> -->
			</div>
		</div>
		<!-- main end -->

	</div>
</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import http from '../api/http'
	// 顶部环形图
	export default {
		name: 'manage6S',
		data() {
			return {
				currentTime: '', // 系统当前时间
				snapEventListArr: [], // 实时事件抓拍
				eventsnapimg: '', //实时事件抓拍第一张图片
				dayEchartsDataRight: { //日统计
					datadaystr: [], // X轴数据
					suml: [], // 事件总数
					sumTrueMax: '', //真数据最大值
					lenName: '6s事件日统计'
				}, // 右侧日echarts图
				monthEchartsDataRight: {
					datadaystr: [], // X轴数据
					suml: [], // 事件总数
					sumTrueMax: '',
					lenName: '6s事件月统计'
				}, // 右侧月echarts图
				yearEchartsDataRight: {
					datadaystr: [], // X轴数据
					suml: [], // 事件总数
					sumTrueMax: '',
					lenName: '6s事件年统计'
				}, // 右侧年echarts图
				hxqyjcnum: '', //核心区域进出
				hxqyjcnuml: '', //核心区域进出百分比
				wptqnum: '', //物品偷走
				wptqnuml: '', //物品偷走百分比
				ryjjnum: '', //人员聚集
				ryjjnuml: '', //人员聚集百分比
				wlqznum: '', //物料取走
				wlqznuml: '', //物料取走百分比
				wllfuml: '', //物料乱放百分比
				wllfnum: '', //物料乱放
				alleventnum: '', //事件总数
				imageBig: false, //控制图片是否放大类名
				monthEchartsRight: [], //接收echarts初始化之后的返回对象,
				titleMessage: '点击放大',
				myChartData: [], //盛放四个仪表百分比
				pageSize:10,//每页显示多少条
				currentPage:1,//当前第几页
				tableTotal:0,//总条数
				pageShow:false,//控制分页是否显示
				warnShow:false,//控制空表格警告信息
				activeIndex:0,//表格索引
				bigImgShow:false,//大图片是否显示
				eventsnapimgBig:'',//大图片SRC
				options:[{value:'',label:'全部'},{value:'核心区域进出',label:'核心区域进出'},{value:"物料取走",label:'物料取走'},{value:"物料乱放",label:'物料乱放'},{value:"noHelmet",label:'安全帽'}],
				chartArr:[{title:'物料乱放',id:'chart1',message:'0'},{title:'安全帽',id:'chart2',message:'0'},{title:'核心区域进出',id:'chart3',message:'0'},{title:'物料取走',id:'chart4',message:'0'}],
				value:''
			}
		},
		watch: {

		},
		created() {},
		computed: {

		},
		mounted() {
			// 顶部日期时间
			this.currentTime = this.getCurrentDateTime();
			setInterval(() => {
				this.currentTime = this.getCurrentDateTime();
			}, 1000)
			//左上6s统计数据
			this.getEventCount();
			// 左下6s管理表格数据
		/* 	this.getEventInfoList()	 */
			 this.getSelectList(this.value,this.currentPage,this.pageSize);
			// 右侧====
		/* 	this.getDayMonthYearRightData('DAY') */
			this.getDayRightData();
			this.getDayMonthYearRightData('MON');
			this.getDayMonthYearRightData('YEAR');
			
		  setInterval(()=>{
				this.getEventCount();			
				this.getDayRightData();
				this.getDayMonthYearRightData('MON');
				this.getDayMonthYearRightData('YEAR');
				this.getSelectList(this.value,this.currentPage,this.pageSize);
			},30000)	
			window.addEventListener('resize', this.handleResize); //给window对象绑定resize事件
		},
		methods: {
			handleResize() {
				//给每一个echarts添加resize事件
				this.monthEchartsRight.forEach((ele, index) => {
					ele.resize();
				})
			},
			change(){
				/* alert(this.value) */
				 this.currentPage = 1;
				 this.getSelectList(this.value,this.currentPage.toString(),this.pageSize.toString());
			},
			bigImg() {
				this.eventsnapimgBig = this.eventsnapimg;
				this.bigImgShow = true;
			},
			bigImgHide(){
				this.bigImgShow = false;
			},
			addImg(i) {//每一行的点击事件
			  this.activeIndex = i;
				this.eventsnapimg = this.snapEventListArr[i].eventsnapimg;
			},
      handleSizeChange(val){//改变pagesize函数
			  this.activeIndex = 0;
				this.currentPage = 1;
				this.pageSize = val;
				this.getSelectList(this.value,this.currentPage,val);
			},
      handleCurrentChange(val){//改变当前页函数
			  this.activeIndex = 0;
				this.getSelectList(this.value,val,this.pageSize);
			},
			/* 四个事件 */
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
			enterIndexPage(path) {
				// 路径从state中获取
				// window.location.href = `${this.$store.state.baseUrl}/sanyShebei` //测试
        this.$router.replace(path);
			},
			// 时间格式化
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
			async getDayRightData(){
				const res = await http.post('/sanySanyEventInfor/getEventInforStatisday', {
					querySign: "DAY"
				})
				if (res.data && res.data.ret == 200){				 
					 	this.dayEchartsDataRight.datadaystr = res.data.datadaystr ;// x轴
					 	this.dayEchartsDataRight.suml = res.data.suml; //总数
					 	this.dayEchartsDataRight.sumTrueMax = Math.max.apply(null, res.data.suml) ;//真数据最大值
					 	var dayEchartsRight = echarts.init(document.getElementById("manage6s-day-echarts"));
					 	this.monthEchartsRight.push(dayEchartsRight);
					 	this.renderEcharts(dayEchartsRight, this.dayEchartsDataRight);
					 }
			}
			,
			// 右侧人员考勤日/月/年统计
			async getDayMonthYearRightData(querySign) {
				const res = await http.post('/sanySanyEventInfor/getEventInforStatis', {
					querySign: querySign
				})
				if (res.data && res.data.ret == 200) {
					if (querySign === 'MON') {
						this.monthEchartsDataRight.datadaystr = res.data.datadaystr ;// x轴
						this.monthEchartsDataRight.suml = res.data.suml; //总数
						this.monthEchartsDataRight.sumTrueMax = Math.max.apply(null, res.data.suml);
						var monthEchartsRight = echarts.init(document.getElementById("manage6s-mouth-echarts"));
						this.monthEchartsRight.push(monthEchartsRight);
						this.renderEcharts(monthEchartsRight, this.monthEchartsDataRight);
					}
					if (querySign === 'YEAR') {
						this.yearEchartsDataRight.datadaystr = res.data.datadaystr; // x轴
						this.yearEchartsDataRight.suml = res.data.suml ;//总数
						this.yearEchartsDataRight.sumTrueMax = Math.max.apply(null, res.data.suml);
						var yearEchartsRight = echarts.init(document.getElementById("manage6s-year-echarts"));
						this.monthEchartsRight.push(yearEchartsRight);
						this.renderEcharts(yearEchartsRight, this.yearEchartsDataRight);
					}
				}
			},
			//统计数据
			async getEventCount() {
				const res = await http.get('/sanySanyEventInfor/getEventInforList');
				if (res.data && res.data.ret == 200) {
					this.hxqyjcnum = res.data.hxqyjcnum ;//核心区域进出
					this.wptqnum = res.data.wptqnum ;//物品偷走
					this.wptqnuml = res.data.wptqnuml; //物品偷走百分比
					this.ryjjnum = res.data.ryjjnum;//人员聚集
					this.ryjjnuml = res.data.ryjjnuml; //人员聚集百分比
					this.wlqznum = res.data.wlqznum; //物料取走

					this.wlqznuml = Number(((res.data.wlqznum / res.data.alleventnum)) * 100).toFixed(2) ;//物料取走百分比
					this.wllfuml = Number((res.data.wllfnum / res.data.alleventnum) * 100).toFixed(2) ;//物料乱放百分比
					this.hxqyjcnuml = Number((res.data.hxqyjcnum / res.data.alleventnum) * 100).toFixed(2); //核心区域进出百分比
					this.aqmnuml = Number((res.data.aqmnum / res.data.alleventnum) * 100).toFixed(2);//安全帽百分比
					this.wllfnum = res.data.wllfnum ;//物料乱放
					this.alleventnum = res.data.alleventnum; //事件总数
					this.renderClock(document.getElementById('chart1'), {name:'物料乱放',value:this.wllfuml});//物料乱放echarts函数调用
					this.renderClock(document.getElementById('chart2'), {name:'安全帽',value:this.aqmnuml});//安全帽函数调用
					this.renderClock(document.getElementById('chart3'), {name:'核心区域进出',value:this.hxqyjcnuml});//核心区域进出函数调用
					this.renderClock(document.getElementById('chart4'), {name:'物料取走',value:this.wlqznuml});//物料取走函数调用
					this.chartArr[0].message=res.data.wllfnum;
					this.chartArr[1].message=res.data.aqmnum;
					this.chartArr[2].message=res.data.hxqyjcnum;
					this.chartArr[3].message=res.data.wlqznum;
				}
			},
			 /*
				函数名:getSelectList
				参数：query:事件名称 page:当前页 pagesize:一页显示多少条
				描述：当前选择器的值为空时将它所联动的下级选择器的值初始化
			 */
			async getSelectList(query,page,pagesize) {
				this.activeIndex = 0;
				const res = await http.post('/sanySanyEventInfor/getSelectList1',{eventtype:query,page:page,pagesize:pagesize});
				if (res.data && res.data.ret == 200) {
					    this.tableTotal=res.data.total;
					    var listArr = res.data.getAbsentList;
					    this.snapEventListArr.splice(0, this.snapEventListArr.length); //每次添加字典时先清空字典
							if(listArr.length>0){
								for (var i = 0; i < listArr.length; i++) {
									var currentItemObj = {
										id: listArr[i].id + Math.random(),
										eventname: listArr[i].eventtype=="noHelmet"?"安全帽":listArr[i].eventtype ,//事件名称
										souevents: listArr[i].souevents, // 抓拍地点
										eventstarttimestr: listArr[i].createtime.slice(11), //抓拍时间
										eventsnapimg: listArr[i].eventimgurl,
										num:((page-1)*pagesize)+(i+1)
									}
									this.snapEventListArr.push(currentItemObj);
								}
								this.eventsnapimg = listArr[0].eventimgurl;
								this.pageShow = true;
								this.warnShow = false;
							}else{
								this.eventsnapimg='';
								this.pageShow = false;
								this.warnShow = true;
							}	    
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
						bottom: 20
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
								color: '#56affb',
								width: '1'
							}
						},
						axisPointer: {
							type: 'shadow'
						},
						axisTick: { // 控制x轴坐标刻度不显示
							show: false
						},
						axisLabel: {
							// formatter: '{value}',
							textStyle: {
								color: '#2DD7EC'
							}
						},
					}],
					yAxis: [{
							type: 'value',
							name: '',
							max: data.sumTrueMax + parseInt(data.sumTrueMax / 3),
							axisLine: { // 控制y轴线的样式
								lineStyle: {
									type: 'solid',
									color: '#56AFFB',
									width: '1'
								}
							},
							axisLabel: {
								formatter: '{value} ',
								textStyle: {
									color: '#556BA2'
								}
							},
							splitLine: { //网格线
								show: false,
								lineStyle: {
									color: ['#56AFFB'],
									width: 1,
									type: 'dotted'
								}
							}
						},
						{
							type: 'value',
							name: '',
							max: data.sumTrueMax,
							show: false, //是否显示y轴
							smooth: true,
							nameGap: 40,
							axisLabel: {
								formatter: '{value}',
								textStyle: {
									color: '#556BA2'
								}
							},
							axisLine: { // 控制y轴线%的样式
								lineStyle: {
									type: 'solid',
									color: '#23BBEC',
									width: '1'
								}
							},
							splitLine: {
								show: false,
								lineStyle: {
									color: ['#56AFFB'],
									width: 1,
									type: 'dotted'
								}
							}
						},
					],
					series: [
						{
							name: data.lenName,
							type: 'bar',
							radius: '10%',
							data: data.suml,
							itemStyle: {
								normal: {
									barBorderRadius: [4, 4, 4, 4],
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
							barWidth: 8, // 控制柱子的宽度
							barGap: '50%', // 控制柱子的间隔
						}
					]
				};
				myChart.setOption(option, true);
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.handleResize)
		},
		destroyed() {},

	}
</script>
<style lang="scss" scoped>
	.manage6s {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-image: url(../assets/images/index_bg.png);
		background-size: 100% 100%;
		color: rgb(255, 255, 255);
		background-repeat: no-repeat;
		overflow: hidden;
		.manage6s_imgText{
			font-size: 0.44rem;
      color: #fff;
      font-weight: bold;
			text-align:center;
		}
		.time{
			width:260px;
			text-align: left;
		}
		.button {
			width: 90px;
			height: 40px;
			background: url(../assets/images/index_back.png) no-repeat;
			position:fixed;
			top:60px;
			left:15px;
			cursor:pointer;
		}
		.title{
			margin:0px auto;
		}
		.home_title{
			background: url(../assets/images/icon.png) 0px 0px no-repeat;
		}
		.home_title-blue{
		   background-position-y: 7px;
		}
		.home_title-zhuapai{
			background-position-y: -23px;
		}
		.home_title-date{
			background-position-y: -54px;
		}
		.home_title-mouth{
			background-position-y: -84px;
		}
		.home_title-year{
			background-position-y: -114px;
		}
		&_top {
			text-align: center;
			height: 125px;
			padding-top: 20px;
			box-sizing: border-box;
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
				top: 60px;
				right: 70px;
				z-index: 10;
				font-family: fontnameUnidreamLED;
			}
		}
		&_main {
			height: calc(100% - 125px);
      .manage6s_left_top{
				position:relative;
				/*总数*/
				.count{
					position:absolute;right:55px;top:9px;font-size:0;
					span:nth-of-type(1){
						color:#fff;font-size:25px;vertical-align: text-bottom;margin-right:10px;
					}
					span:nth-of-type(2){
						color:#01bbff;font-size:40px;
					}
				}
			}
		}

		/*6s统计开始*/
		&_left {
			width: 67.2%;
			float: left;
			height: 100%;
			padding-right: 40px;

			/*6s页面左侧上部*/
			&_top {
				width: 100%;
				height: 380px;
				background: rgba(39, 69, 111, 0.3);
				border: 1px solid rgba(255, 255, 255, 0.1);
				padding: 20px;
				margin-bottom: 20px;
				margin-left: 20px;
				.manage6s_left_echarts {
					display: flex;
					flex-direction: row;
					margin-top: 5px;
					padding-bottom: 15px;
					.item {
						flex: 1;
						padding: 30px 10px;
						margin-right: 10px;
						background-color: rgba(42, 75, 133, 0.3);
						.top {
							div {
								text-align: center;
							}
							div:nth-of-type(1) {
								// font-size: 0.75rem;
								font-size: 0.28rem;
								color: #fff;
							}
							div:nth-of-type(2) {
								// font-size: 1rem;
								font-size: 0.4rem;
								color: #01bbff;
							}
						}
						.bottom {
							position: relative;
							background-image: url(../assets/images/index_clock-blue.png);
							background-size: cover;
							height: 160px;
							width: 160px;
							margin: 10px auto 0px;
							.echarts{
								width:160px;height:160px;
							}
						}
					}
				}
			}
			&_echarts {
				width: 100%;
				height: calc(100% - 24px);
			}
			/*6s页面左侧下部*/
			&_bottom {
				background: rgba(39, 69, 111, 0.3);
				border: 1px solid rgba(255, 255, 255, 0.1);
				width: 100%;
				height: calc(100% - 421px);
				margin-left: 20px;
				padding: 20px;
			}
		}
		/*6s统计结束*/

		/*6s事件右侧部分开始*/
		&_right {
			width: 31.9%;
			float: left;
			height: 100%;
			padding: 0px 0px 20px 0px;
			.attendance {
				height: 100%;
				display: flex;
				flex-direction: column;
				&-item {
					flex: 1;
					display: flex;
					flex-direction: column;
					background: rgba(39, 69, 111, 0.3);
					border: 1px solid rgba(255, 255, 255, 0.1);
					padding: 20px;
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
		/*6s事件右侧三个eharts结束*/

		/*实时事件抓拍开始 */
		&_capture {
			width: 100%;
			height: calc(100% - 30px);
			overflow: hidden;
      display: flex;
			flex-direction: row;
			/*左侧表格信息*/
			.message {
				/* float: left; */
			  /* width: 42%; */
			  flex:1; 
				margin-top: 10px;
				padding-right: 20px;
				height: calc(100% - 18px);
				margin-left:15px;

				/*表格表头*/
				.title {
					color: white;
					height: 30px;
					font-size:16px;
					span {
						display: inline-block;
						width: 24%;
						height: 30px;
						/* padding-left: 30px; */
						box-sizing: border-box;
						line-height: 30px;
					}
				}
				.warnshow{
					font-size:0.16rem;text-align: center;color:gray;height:100px;line-height: 100px;
				}
				/*下拉列表组件*/
				.el-select{
					width:100%;margin-bottom:10px; display: block;
				}
				/*滚动条组件这里必须给高度*/
        .el-scrollbar{
					 height:calc(100% - 110px);
					 font-size: 0;
					/deep/ .el-scrollbar__wrap{overflow-x: hidden}
					/deep/ .el-scrollbar__bar.is-horizontal{display: none}
					.title_message:hover{
						background:rgba(42, 75, 133, 0.3);
						color:yellow;
					}
					.title_message {
					  height: 32px;
						background: rgba(42, 75, 133, 0.1);
						border-top:0.5px solid rgba(0,0,0,.3);
						color: #31a0ff;
						span {
							display: inline-block;
							width: 24%;
							height: 32px;
							/* padding-left: 30px; */
							box-sizing: border-box;
							line-height: 32px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							cursor: pointer;
							font-size:17px;
						}

					}
					.title_message.title_active{
						background:rgba(42, 75, 133, 0.3);
						color:yellow;
					}

				}

			}
			.image {
				flex:1;
				background: rgba(56, 142, 237, 0.4);
				border: 1px solid rgba(49, 160, 255, 0.6);
				height: 350px;
				margin-top: 10px;
				height: 96%;
				cursor: pointer;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.imageBig {
				position: fixed;
				top: 0px;
				left: 0px;
				bottom: 0px;
				right: 0px;
				margin: auto;
				width: auto;
				height: 100%;
				z-index: 1000;
				background: rgba(0, 0, 0, 1);
				border:none;
				text-align: center;
				img {
					width: auto;
					height: 100%;
					cursor: pointer;
				}
			}
		}
		/*实时事件抓拍结束*/
	}
</style>
