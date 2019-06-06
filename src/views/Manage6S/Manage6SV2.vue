<template>
	<div class="manage6s">
		<!-- 头部 start -->
		<div class="manage6s_top">
			<div class="manage6s_imgText">
				北京桩机三现数据中心
			</div>
			<!--右上角时间-->
			<em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
		</div>
		<!-- 头部 end -->

		<!-- main start -->
		<div class="manage6s_main">
			<div class="manage6s_main_left">
				<div class="top">
					<div class="title">
						<span class="circle">●</span>&nbsp;
						<span class="message">6s统计</span>
						<span style="width:173px;display:inline-block"></span>
						<span class="count">总数</span>&nbsp;&nbsp;
						<span class="number">{{leftTopData.alleventnum}}</span>
					</div>
					<div class="pieBox">
						<div class="left">
							<div class="item">
								<div>安全帽</div>
								<div>{{leftTopData.aqmnum}}</div>
							</div>
							<div class="item">
								<div>人员怠工</div>
								<div>{{leftTopData.hxqyjcnum}}</div>
							</div>
							<div class="item">
								<div>物料乱放</div>
								<div>{{leftTopData.wllfnum}}</div>
							</div>
							<div class="item">
								<div>地面清洁</div>
								<div>{{leftTopData.wlqznum}}</div>
							</div>
						</div>
						<div class="right">
							<div class='right_message'>报警率</div>
							<div id='chartPie'>
								
							</div>
						</div>
					</div>
				</div>
				<div class="bottom">
					<div class='echartbarBox'>
						<div class="title">
							<span class="circle">●</span>&nbsp;
							<span class="message">6s事件日统计</span>
						</div>
						<div class="day" id="manage6s-day-echarts"></div>
					</div>
					<div class='echartbarBox'>
						<div class="title">
							<span class="circle">●</span>&nbsp;
							<span class="message">6s事件月统计</span>
						</div>
						<div class="month" id="manage6s-mouth-echarts"></div>
					</div>
					<div class='echartbarBox'>
						<div class="title">
							<span class="circle">●</span>&nbsp;
							<span class="message">6s事件年统计</span>
						</div>
						<div class="year" id="manage6s-year-echarts"></div>
					</div>
				</div>
			</div>
			<div class="manage6s_main_right">
				   <div class="title" style="margin-bottom:20px;">
					<span class="circle">●</span>&nbsp;
					<span class="message">实时事件抓拍</span>
				   </div>
				   <div class="pictureBox">
					   <div class="item">
						   <div class='topInput' @click="anqminputClick">
							   <span class='topSpan'>安全帽</span>
							   <span class='colorYellow'>{{anqmtitleList.num}}</span>
							   <span class='colorYellow'>{{anqmtitleList.eventname}}</span>
							   <span class='colorYellow'>{{anqmtitleList.souevents}}</span>
							   <span class='colorYellow'>{{anqmtitleList.eventstarttimestr}}</span>
							   <span class='colorYellow'>{{anqmtitleList.username==undefined?'':anqmtitleList.username+'/'+anqmtitleList.workno==undefined?'':anqmtitleList.workno}}</span>
							   <span class='colorYellow'>{{anqmtitleList.department}}</span>
							   <span class="sanjiaoSpanBottom" v-show="!anqmShow"></span>
							   <span class="sanjiaoSpanTop" v-show="anqmShow"></span>
						   </div>
						   <div class="picture">
							   <template>
								  <el-carousel :interval="10000" arrow="always" @change="aqmChange" ref="anqmcarousel">
									<el-carousel-item v-for="(item , index) in anqmList" :key="item.id">
									  <h3 > <img :src="item.eventsnapimg" alt="" style="width:100%;height:100%;"></h3>
									</el-carousel-item>
								  </el-carousel>
								</template>
						   </div>
						   <div class="tableBox" style="width:100%;" v-show="anqmShow">
							   <div class="title"  style="background: rgba(42, 75, 133, 1)">
							   	<span class="num">序号</span>
							   	<span class="eventName">事件名称</span>
							   	<span class="captureAddr">抓拍地点</span>
							   	<span class="captureTime">抓拍时间</span>
							   	<span class="username">姓名/工号</span>
							   	<span class="centername">部门</span>
							   </div>
							   <div v-show="warnShow" class="warnshow">该事件暂无数据</div>
							   <el-scrollbar class="manage6s_capture-con"  ref="myScrollbar">
							   	<div class="title_message" v-for="(item, index) in anqmList"
							   	 :key="item.id" @click="addanqm(index)">
							   		<span class="num" v-text="item.num"></span>
							   		<span class="eventName" v-text="item.eventname"></span>
							   		<span class="captureAddr" v-text="item.souevents"></span>
							   		<span class="captureTime" v-text="item.eventstarttimestr"></span>
							   		<span class="username">{{item.username}}{{item.username?'/':''}}{{item.workno}}</span>
							   		<span class="centername">{{item.department}}</span>
							   	</div>
							   </el-scrollbar>
						   </div>
					   </div>
					   <div class="item">
                           <div class='topInput' @click="rydginputClick">
							   <span class='topSpan'>人员怠工</span>
							   <span class='colorYellow'>{{rydgtitleList.num}}</span>
							   <span class='colorYellow'>{{rydgtitleList.eventname}}</span>
							   <span class='colorYellow'>{{rydgtitleList.souevents}}</span>
							   <span class='colorYellow'>{{rydgtitleList.eventstarttimestr}}</span>
							   <span class="sanjiaoSpanBottom" v-show="!rydgShow"></span>
							   <span class="sanjiaoSpanTop" v-show="rydgShow"></span>
						   </div>
						   <div class="picture">
							   <template>
								  <el-carousel :interval="10000" arrow="always" @change="rydgChange" ref="rydgcarousel">
									<el-carousel-item v-for="(item , index) in rydgList" :key="item.id">
									  <h3 > <img :src="item.eventsnapimg" alt="" style="width:100%;height:100%;"></h3>
									</el-carousel-item>
								  </el-carousel>
								</template>
						   </div>
							  <div class="tableBox" style="width:100%;" v-show="rydgShow">
							   <div class="title"  style="background: rgba(42, 75, 133, 1)">
								<span class="num">序号</span>
								<span class="eventName">事件名称</span>
								<span class="captureAddr">抓拍地点</span>
								<span class="captureTime">抓拍时间</span>
								<span class="username">姓名/工号</span>
								<span class="centername">部门</span>
							   </div>
							   <div v-show="warnShow" class="warnshow">该事件暂无数据</div>
							   <el-scrollbar class="manage6s_capture-con"  ref="myScrollbar">
								<div :class="{title_message:true,title_active:index==rydgactiveIndex}" v-for="(item, index) in rydgList"
								 :key="item.id" @click="addrydg(index)">
									<span class="num" v-text="item.num"></span>
									<span class="eventName" v-text="item.eventname"></span>
									<span class="captureAddr" v-text="item.souevents"></span>
									<span class="captureTime" v-text="item.eventstarttimestr"></span>
									<span class="username">{{item.username}}{{item.username?'/':''}}{{item.workno}}</span>
									<span class="centername">{{item.department}}</span>
								</div>
							   </el-scrollbar>
							  </div>
					   </div>
					   <div class="item">
                          <div class='topInput' @click="wplfinputClick">
							   <span class='topSpan'>物品乱放</span>
							   <span class='colorYellow'>{{wplftitleList.num}}</span>
							   <span class='colorYellow'>{{wplftitleList.eventname}}</span>
							   <span class='colorYellow'>{{wplftitleList.souevents}}</span>
							   <span class='colorYellow'>{{wplftitleList.eventstarttimestr}}</span>
							   <span class="sanjiaoSpanBottom" v-show="!wplfShow"></span>
							   <span class="sanjiaoSpanTop" v-show="wplfShow"></span>
						   </div>
						   <div class="picture">
							   <template>
								  <el-carousel :interval="10000" arrow="always" @change="wplfChange" ref="wplfcarousel">
									<el-carousel-item v-for="(item , index) in wplfList" :key="item.id">
									  <h3 > <img :src="item.eventsnapimg" alt="" style="width:100%;height:100%;"></h3>
									</el-carousel-item>
								  </el-carousel>
								</template>
						   </div>
						  <div class="tableBox" style="width:100%;" v-show="wplfShow">
						   <div class="title"  style="background: rgba(42, 75, 133, 1)">
								<span class="num">序号</span>
								<span class="eventName">事件名称</span>
								<span class="captureAddr">抓拍地点</span>
								<span class="captureTime">抓拍时间</span>
								<span class="username">姓名/工号</span>
								<span class="centername">部门</span>
						   </div>
						   <div v-show="warnShow" class="warnshow">该事件暂无数据</div>
						   <el-scrollbar class="manage6s_capture-con"  ref="myScrollbar">
								<div :class="{title_message:true,title_active:index==wplfactiveIndex}" v-for="(item, index) in wplfList"
								 :key="item.id" @click="addwplf(index)">
									<span class="num" v-text="item.num"></span>
									<span class="eventName" v-text="item.eventname"></span>
									<span class="captureAddr" v-text="item.souevents"></span>
									<span class="captureTime" v-text="item.eventstarttimestr"></span>
									<span class="username">{{item.username}}{{item.username?'/':''}}{{item.workno}}</span>
									<span class="centername">{{item.department}}</span>
								</div>
						   </el-scrollbar>
						  </div>
					   </div>
					   <div class="item">
                           <div class='topInput' @click="dmqjinputClick">
							   <span class='topSpan'>地面清洁</span>
							   <span class='colorYellow'>{{dmqjtitleList.num}}</span>
							   <span class='colorYellow'>{{dmqjtitleList.eventname}}</span>
							   <span class='colorYellow'>{{dmqjtitleList.souevents}}</span>
							   <span class='colorYellow'>{{dmqjtitleList.eventstarttimestr}}</span>
							   <span class="sanjiaoSpanBottom" v-show="!dmqjShow"></span>
							   <span class="sanjiaoSpanTop" v-show="dmqjShow"></span>
						   </div>
						   <div class="picture">
							   <template>
								  <el-carousel :interval="10000" arrow="always" @change="dmqjChange" ref="dmqjcarousel">
									<el-carousel-item v-for="(item , index) in dmqjList" :key="item.id">
									  <h3 > <img :src="item.eventsnapimg" alt="" style="width:100%;height:100%;"></h3>
									</el-carousel-item>
								  </el-carousel>
								</template>
						   </div>
                           <div class="tableBox" style="width:100%;" v-show="dmqjShow">
						   <div class="title"  style="background: rgba(42, 75, 133, 1)">
								<span class="num">序号</span>
								<span class="eventName">事件名称</span>
								<span class="captureAddr">抓拍地点</span>
								<span class="captureTime">抓拍时间</span>
								<span class="username">姓名/工号</span>
								<span class="centername">部门</span>
						   </div>
						   <div v-show="warnShow" class="warnshow">该事件暂无数据</div>
						   <el-scrollbar class="manage6s_capture-con"  ref="myScrollbar">
								<div :class="{title_message:true,title_active:index==dmqjactiveIndex}" v-for="(item, index) in dmqjList"
								 :key="item.id" @click="adddmqj(index)">
									<span class="num" v-text="item.num"></span>
									<span class="eventName" v-text="item.eventname"></span>
									<span class="captureAddr" v-text="item.souevents"></span>
									<span class="captureTime" v-text="item.eventstarttimestr"></span>
									<span class="username">{{item.username}}{{item.username?'/':''}}{{item.workno}}</span>
									<span class="centername">{{item.department}}</span>
								</div>
						   </el-scrollbar>
						  </div>													  
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
	import http from '../../api/http'
	import {
		getEventInforList,
		getEventInforStatis,
		getEventInforStatisday,
		getSelectList1,
	} from '../../api'
	// 顶部环形图
	export default {
		name: 'Manage6S_v2',
		data(){
			return {
				refreshDataId: '',
				refreshDataId2: '',
				refreshDataId3:'',
				currentTime: '', // 系统当前时间
				message:'aa',
				monthEchartsRight: [], //接收echarts初始化之后的返回对象,
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
				leftTopData:{},
				anqmList:[],
				anqmtitleList:{},
				rydgList:[],
				rydgtitleList:{},
				wplfList:[],
				wplftitleList:{},
				dmqjList:[],
				dmqjtitleList:{},
				warnShow:false,
				value:'noHelmet',
				anqmactiveIndex:0,
				rydgactiveIndex:0,
				wplfactiveIndex:0,
				dmqjactiveIndex:0,
				anqmShow:false,
				rydgShow:false,
				wplfShow:false,
				dmqjShow:false,
				
			}
		},
		mounted(){
		    this.currentTime = this.getCurrentDateTime();
			this.refreshDataId = setInterval(() => {
				this.currentTime = this.getCurrentDateTime();
			}, 1000);
			this.refreshDataId2 = setInterval(() => {
				this.getDayRightData();
				this.getDayMonthYearRightData('MON');
				this.getDayMonthYearRightData('YEAR');
			}, 30000);
			this.refreshDataId3 = setInterval(()=>{
				this.getEventInforListHttp();
				this.getSelectList('cvNoHelmet',1,10);
				this.getSelectList('人员怠工',1,10);
				this.getSelectList('物料乱放',1,10);
				this.getSelectList('地面清洁',1,10);
			},10000*10+2000)
			//window.location.reload();
			this.getEventInforListHttp();
			this.getSelectList('cvNoHelmet',1,10);
			this.getSelectList('人员怠工',1,10);
			this.getSelectList('物料乱放',1,10);
			this.getSelectList('地面清洁',1,10);
			this.getDayRightData();
			this.getDayMonthYearRightData('MON');
			this.getDayMonthYearRightData('YEAR');
			this.renderClock(document.getElementById('chartPie'),{name:'报警率',value:30})
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
			/*安全帽轮播图改变图片事件*/
			aqmChange(index){
				this.anqmtitleList = this.anqmList[index]
				this.anqmactiveIndex = index
			},
			rydgChange(index){
				this.rydgtitleList = this.rydgList[index]
				this.rydgactiveIndex = index
			},
			wplfChange(index){
				this.wplftitleList = this.wplfList[index]
				this.wplfactiveIndex = index
			},
			dmqjChange(index){
				this.dmqjtitleList = this.dmqjList[index]
				this.dmqjactiveIndex = index
			},
			/*安全帽上部点击事件*/
			anqminputClick(){
				this.anqmShow = true;
			},
			/*人员怠工上部点击事件*/
			rydginputClick(){
				this.rydgShow=true;
			},
			/*物品乱放上部点击事件*/
			wplfinputClick(){
				this.wplfShow=true;
			},
			dmqjinputClick(){
				this.dmqjShow=true;
			},
			/*每一行表格的点击事件*/
			addanqm(index){
			  this.anqmactiveIndex = index;
			  this.$refs.anqmcarousel.setActiveItem(index);
			  this.anqmtitleList = this.anqmList[index];
			  this.aqmChange(index);
			  this.anqmShow = false;
			},
			addrydg(index){
              this.rydgactiveIndex = index;		
			  this.$refs.rydgcarousel.setActiveItem(index);
			  this.rydgtitleList = this.rydgList[index];
			  this.rydgChange(index);
			  this.rydgShow=false;
			},
			addwplf(index){
			  this.wplfactiveIndex = index;
			  this.$refs.wplfcarousel.setActiveItem(index);
			  this.wplftitleList = this.wplfList[index];
			  this.wplfChange(index);
			  this.wplfShow=false;
			},
			adddmqj(index){
			  this.dmqjactiveIndex = index;	
			  this.$refs.dmqjcarousel.setActiveItem(index);
			  this.dmqjtitleList = this.dmqjList[index];
			  this.dmqjChange(index);
			  this.dmqjShow=false;
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
			  处理四种事件返回函数
			*/
			returnList(arrayName,res){
				if (res.data && res.data.ret == 200) {
					var listArr = res.data.getAbsentList;
					arrayName.splice(0, arrayName.length); //每次添加字典时先清空字典
					if (listArr.length > 0) {
						for (var i = 0; i < listArr.length; i++) {
							var currentItemObj = {
								num:i+1,
								id: listArr[i].id + Math.random(),
								eventname: listArr[i].eventtype == "noHelmet" ? "安全帽" :listArr[i].eventtype =="cvNoHelmet"?"视觉安全帽": listArr[i].eventtype, //事件名称
								souevents: listArr[i].souevents?listArr[i].souevents:listArr[i].eventname, // 抓拍地点
								eventstarttimestr: listArr[i].eventstarttime.slice(11), //抓拍时间
								eventsnapimg: listArr[i].eventimgurl,
								username: listArr[i].username,
								workno: listArr[i].workno,
								department: listArr[i].department,
							}
							arrayName.push(currentItemObj);
						}
						if(arrayName == this.anqmList){
							this.anqmtitleList = arrayName[0];
							console.log(this.anqmtitleList);
						}
						if(arrayName == this.rydgList){
							this.rydgtitleList = arrayName[0];
							console.log('人员怠工',this.rydgtitleList);
						}
						if(arrayName == this.wplfList){
							this.wplftitleList = arrayName[0];
							console.log('物品乱放',this.wplftitleList);
						}
						if(arrayName == this.dmqjList){
							this.dmqjtitleList = arrayName[0];
							console.log('地面清洁',this.dmqjtitleList);
						}
					} else {
						return false;
					}
				}
			},
			/*
			  左上部分的接口
			*/
			async getEventInforListHttp(){
				const res = await getEventInforList();
				console.log(res.data);
				if(res&&res.data.ret == 200){
					  this.leftTopData = res.data;
				}
				console.log(this.leftTopData);
			},
			/*
			  表格右侧图片接口
			  noHelmet
			*/
			async getSelectList(eventtype, page, pagesize) {
				var res = await getSelectList1(eventtype, page, pagesize);
				if(eventtype=='cvNoHelmet'){
					this.returnList(this.anqmList,res);
				}
				if(eventtype=='人员怠工'){
					console.log('人员怠工')
				    this.returnList(this.rydgList,res);
				}
				if(eventtype=='物料乱放'){
					this.returnList(this.wplfList,res);
				}
				if(eventtype=='地面清洁'){
					this.returnList(this.dmqjList,res);
				}
				
			},
			/* async getClockEcharts(){
				this.
			} */
			async getDayRightData() {
				const res = await getEventInforStatisday('DAY');
				if (res.data && res.data.ret == 200) {
					this.dayEchartsDataRight.datadaystr = res.data.datadaystr; // x轴
					this.dayEchartsDataRight.suml = res.data.suml; //总数
					this.dayEchartsDataRight.sumTrueMax = Math.max.apply(null, res.data.suml); //真数据最大值
					var dayEchartsRight = echarts.init(document.getElementById("manage6s-day-echarts"));
					this.monthEchartsRight.push(dayEchartsRight);
					this.renderEcharts(dayEchartsRight, this.dayEchartsDataRight);
				}
			},
			// 右侧人员考勤日/月/年统计
			async getDayMonthYearRightData(querySign) {
				const res = await getEventInforStatis(querySign);
				if (res.data && res.data.ret == 200) {
					if (querySign === 'MON') {
						this.monthEchartsDataRight.datadaystr = res.data.datadaystr; // x轴
						this.monthEchartsDataRight.suml = res.data.suml; //总数
						this.monthEchartsDataRight.sumTrueMax = Math.max.apply(null, res.data.suml);
						var monthEchartsRight = echarts.init(document.getElementById("manage6s-mouth-echarts"));
						this.monthEchartsRight.push(monthEchartsRight);
						this.renderEcharts(monthEchartsRight, this.monthEchartsDataRight);
					}
					if (querySign === 'YEAR') {
						this.yearEchartsDataRight.datadaystr = res.data.datadaystr; // x轴
						this.yearEchartsDataRight.suml = res.data.suml; //总数
						this.yearEchartsDataRight.sumTrueMax = Math.max.apply(null, res.data.suml);
						var yearEchartsRight = echarts.init(document.getElementById("manage6s-year-echarts"));
						this.monthEchartsRight.push(yearEchartsRight);
						this.renderEcharts(yearEchartsRight, this.yearEchartsDataRight);
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
						bottom: 20,
						top: 10,
						left:50
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
							}
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
						barWidth: 8, // 控制柱子的宽度
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
			clearInterval(this.refreshDataId)
			clearInterval(this.refreshDataId2)
			clearInterval(this.refreshDataId3)
		},
		
	}
</script>
<style lang="scss" scoped>
	.manage6s {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-image: url(../../assets/images/body_bg.png);
		background-size: 100% 100%;
		color: rgb(255, 255, 255);
		background-repeat: no-repeat;
		overflow: hidden;

		.manage6s_imgText {
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
			background: url(../../assets/images/index_back.png) no-repeat;
			position: fixed;
			top: 60px;
			left: 15px;
			cursor: pointer;
		}

		.title {
			margin: 0px auto;
		}


		&_top {
			text-align: center;
			height: 125px;
			padding-top: 20px;
			box-sizing: border-box;
			background-image: url(../../assets/images/body_title.png);
			background-size: 100% 90%;
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
				top: 60px;
				right: 70px;
				z-index: 10;
				font-family: fontnameUnidreamLED;
			}
		}
        /*內容整體開始*/
		&_main {
			height: calc(100% - 125px);
			padding: 20px;
            display:flex;
			.manage6s_main_left{
				width:420px;
				margin-right:20px;
				display: flex;
				flex-direction: column;
				.top , .bottom{
					background: rgba(39, 69, 111, 0.3);
					border: 1px solid rgba(255, 255, 255, 0.1);
				}
				.top{
					height:250px;
					margin-bottom:20px;
				    padding:12px;
					.pieBox{
						width:100%;
						height:calc(100% - 36px);
						background:rgba(42, 75, 133, 0.3);
						padding: 20px;
						display: flex;
						.left{
							width:180px;
							display:flex;
							flex-wrap: wrap;
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
							.item:nth-of-type(2) , .item:nth-of-type(4){
								padding-left:10px;
							}
						}
						.right{
							height:100%;
							flex:1;
							padding:0px 10px 10px 20px;
							.right_message{
								font-size:18px;
								text-align: center;
							}
							#chartPie{
								width:80%;
								margin:0 auto;
								height:calc(100% - 35px);
								margin-top:10px;
								background-image: url(../../assets/images/index_clock-blue.png);
								background-size: 100% 100%;
							}
						}
					}
				}
				.bottom{
					flex:1;
					display: flex;
					flex-direction: column;
					.echartbarBox{
						flex:1;
						padding: 15px;
						.day,.month,.year{
							height:calc(100% - 30px);
						}
					}
				}
			}
			.manage6s_main_right{
				flex:1;
				background: rgba(39, 69, 111, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
				padding: 15px;
				.pictureBox{
					height:calc(100% - 50px);
					width:100%;
					display: flex;
					flex-wrap: wrap;
					.item{
						//flex:1;
						width:50%;
						height:50%;
						position:relative;
						.title {
							color: white;
							height: 30px;
							font-size: 16px;
						
							span {
								// display: inline-block;
								// width: 24%;
								height: 30px;
								/* padding-left: 30px; */
								box-sizing: border-box;
								line-height: 30px;
							}
						}
						/*表格*/
						.tableBox{
							position:absolute;
							top:40px;
							height:100%;
							z-index:10000;
							
							.title,
							.manage6s_capture-con {
								span {
									display: inline-block;
									
								}
							    
								.num {
									width: 15%;
									text-align: center
								}
							
								.eventName {
									width: 30%;
								}
							
								.captureAddr {
									width: 35%;
								}
							
								.captureTime {
									width: 20%;
								}
							
								.username {
									display: none
								}
							
								.centername {
									display: none
								}
							}
							
							.title-aqm,
							.manage6s_capture-conAQM {
								.num {
									width: 10% !important;
									text-align: center;
									
								}
							
								.eventName {
									width: 14% !important;
								}
							
								.captureAddr {
									width: 21% !important;
								}
							
								.captureTime {
									width: 15% !important;
								}
							
								.username {
									width: 20% !important;
									display: inline-block
								}
							
								.centername {
									width: 20% !important;
									display: inline-block
								}
							}
							
							.manage6s_capture-conAQM .title_message span {
								font-size: 14px !important;
							}
							/*滚动条组件这里必须给高度*/
							.el-scrollbar {
								height: calc(100% - 110px);
								font-size: 0;
							
								/deep/ .el-scrollbar__wrap {
									overflow-x: hidden
								}
							
								/deep/ .el-scrollbar__bar.is-horizontal {
									display: none
								}
							
								.title_message:hover {
									background: rgba(40, 97, 164, 1);
									color: yellow;
								}
							
								.title_message {
									height: 32px;
									background: rgba(25, 53, 92, 1);
									border-top: 0.5px solid rgba(0, 0, 0, .3);
									color: #31a0ff;
									span {
										height: 32px;
										box-sizing: border-box;
										line-height: 32px;
										overflow: hidden;
										white-space: nowrap;
										text-overflow: ellipsis;
										cursor: pointer;
										font-size: 17px;
									}
								}
							
								.title_message.title_active {
									background: rgba(40, 97, 164, 1);
									color: yellow;
								}
							
							}
						}
						.warnshow {
							font-size: 0.16rem;
							text-align: center;
							color: gray;
							height: 100px;
							line-height: 100px;
						}
						.topInput{
							height:30px;
							border:1px solid rgba(100, 154, 250, 0.6);
							border-radius: 5px;
							padding:5px 10px;
							background:rgba(42, 75, 133, 0.3);
							display:flex;
							align-items: center;
							.colorYellow{
								color:yellow;
								padding: 0px 15px;
								
							}
							.sanjiaoSpanBottom{
								width:0px;
								height:0px;
								border-left:8px solid transparent;
								border-right:8px solid transparent;
								border-top:10px solid rgba(94,156,255,.9);
								position:absolute;
								right:30px;
							}
						    .sanjiaoSpanTop{
								width:0px;
								height:0px;
								border-left:8px solid transparent;
								border-right:8px solid transparent;
								border-bottom:10px solid rgba(94,156,255,.9);
								position:absolute;
								right:30px;
							} 
							.topSpan{
								font-size:16px;
							}
						}
						.picture{
							height:calc(100% - 30px);
							padding: 10px 0px;
							/deep/ .el-carousel{
								height:100%;
							}
							/deep/ .el-carousel__container{
								height:100%;
							}
							/deep/ .el-carousel__button{
								width:20px;
							}
						}
					}
					.item:nth-of-type(1) , .item:nth-of-type(3){
						padding-right:8px;
					}
					.item:nth-of-type(2) , .item:nth-of-type(4){
						padding-left:8px;
					}
				}
			}
		}
		/*内容整体结束*/
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
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
   }
  
   .el-carousel__item:nth-child(2n) {
       background-color: #99a9bf;
   }
  
   .el-carousel__item:nth-child(2n+1) {
       background-color: #d3dce6;
   }
</style>

