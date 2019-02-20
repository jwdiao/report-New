<template>
	<el-container>
		<!--头部开始-->
		<el-header>
			<!--标头-->
			<div class="vision_title">
				<!-- <span @click="enterIndexPage">北京三一视觉考勤</span> -->
				<span>三现数据安全管理</span>
			</div>
			<!--右上角时间-->
			<em class="time" v-text="currentTime"></em>
			<div class="control">
				<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
				<div :class="{control_log:true,active:index==1}" @click="logClick">控制日志</div>
				<div :class="{control_log:true,active:index==2}" @click="configClick">配置日志</div>
			</div>
		</el-header>
		<!--头部结束-->
		<el-main style="overflow: hidden;">
			<!--左侧echarts开始-->
			<div class="left">
				<div class="item">
					<p class="item_home_title">操作类型统计</p>
					<div class="chartBox" id="top"></div>
				</div>
				<div class="item">
					<p class="item_home_title">IP登录统计</p>
					<div class="chartBox" id="middle"></div>
				</div>
				<div class="item">
					<p class="item_home_title">用户名登录统计</p>
					<div class="chartBox" id="bottom"></div>
				</div>
			</div>
			<!--左侧echarts结束-->
			<div class="right">
				<!--查询条件开始-->
				<div class="search">
					<label class="module" style="width: 10%;">
						<input type="text" class="search-num" placeholder="用户名" clearable v-model="userName">
					</label>
					<label class="module" style="width: 10%;">
						<input type="text" class="search-num" placeholder="IP" clearable v-model="loginIp">
					</label>
					<label class="module" style="width: 10%;">
						<input type="text" class="search-num" placeholder="日志详情" clearable v-model="content">
					</label>
					<el-select class="module" style="width: 10%;" v-model="typeMessageValue" @change="typeMessageFn" placeholder="查询类型" v-show="selectShow">
						<el-option v-for="item in typeMessage" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="module" style="width: 10%;" v-model="typeMessageValue" @change="typeMessageFn" placeholder="查询类型" disabled v-show="!selectShow">
						<el-option v-for="item in typeMessage" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<label class="module" style="width: 16%;">
						<el-date-picker type="datetime" placeholder="开始时间"
						v-model="startTime"
						style="width: 100%;"
						:clearable = "false"
						:picker-options="pickerOptionsStart"></el-date-picker>
					 <i v-show="isRm1" data-index="1" @click="clearVal"></i>
					</label>
					<label class="module" style="width: 16%;">
						<el-date-picker type="datetime" placeholder="结束时间"
						v-model="endTime"
						style="width: 100%;"
						:clearable = "false"
						:picker-options="pickerOptionsEnd"></el-date-picker>
						 <i v-show="isRm2" data-index="2" @click="clearVal"></i>
					</label>
					<button class="search-btn" @click="gerTableList">搜索</button>
					<button class="search-btn" @click="clearTableList">清空</button>
				</div>
				<!--查询条件结束-->
				<!--表格开始-->
				<div class="title"><span>序号</span><span>用户名</span><span>子系统</span><span>操作类型</span><span>IP</span><span>日期</span><span>日志详情</span></div>
				<div class="index_left_bottom_main">
					<el-scrollbar class="message" style="overflow-x: hidden;">
						<div class="title_message" v-for="(item,index) in tableList" :key="index">
							<span style="color:#fff03e;">{{(index+1)+(currentPage-1)*pageSize}}</span>
							<span>{{item.user_name}}</span>
							<span>{{item.sub_systemname}}</span>
							<span class="typeCar" :data-car-type="item.plateTypeName">{{item.type_name}}</span>
							<span>{{item.login_ip}}</span>
							<span>{{item.log_time}}</span>
							<span :title="item.log_content">{{item.log_content}}</span>
						</div>
					</el-scrollbar>
				</div>
				<!--表格结束-->
				<!--分页开始-->
				<template>
					<div class="block" style="text-align: center;position:absolute;bottom:5px;left:23%;" v-show="pageShow">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
						 :page-sizes="[20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableListTotal">
						</el-pagination>
					</div>
				</template>
        <!--分页结束-->
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import http from '../api/http'
	import {getSanyCameraSysLogStaticList,getSanyCameraSysLogStaticCharts} from '../api'
	export default {
		name: 'controllog',
		data() {
			return {
				currentTime: '',//当前时间
				index: 1,//1：控制日志 2：配置日志默认为控制日志
				currentPage: 1,//当前页
				pageSize: 20,//一页多少条
				tableListTotal: 100,//总条数
				value: '',
				typeMessageValue: '2', //查询类型选择器
				userName: '', //用户名
				loginIp: '', //ip
				content: '', //日志详情,
				startTime: '', //开始时间
				endTime: '', //结束时间
				selectShow: true,
				pageShow:false,
				isRm1:true,
				isRm2:true,
				echartsList: [], //echarts对象数组
				topEchartsList: [],//操作类型统计饼图关联数据
				middleEchartsList: [],//IP登录统计关联数据
				bottomEchartsList: [],//用户名登录统计关联数据
				pickerOptionsStart: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				pickerOptionsEnd:{
					disabledDate(time){
						return time.getTime() < new Date(this.valueStart).getTime() - 3600*1000*24 || time.getTime() > Date.now();
					}
				},
				/* selectHide:falue, */
				typeMessage: [{
					value: '2',
					label: '网页'
				}, {
					value: '3',
					label: '客户端'
				}],
				tableList: []
			};
		},
		mounted() {
			this.currentTime = this.getCurrentDateTime();
			setInterval(() => {
				this.currentTime = this.getCurrentDateTime();
			}, 1000);
				this.getSanyCameraSysLogList();
				this.getSanyCameraSysLogStatic();
			setInterval(() => {
				/* this.currentPage = 1; */
				this.getSanyCameraSysLogList();
				this.getSanyCameraSysLogStatic();
			}, 10000);
			window.addEventListener('resize', this.handleResize); //给window对象绑定resize事件

		},
		methods: {
			handleResize() {
				//给每一个echarts添加resize事件
				this.echartsList.forEach((ele, index) => {
					ele.resize();
				})
			},
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
			getRightTime(time){
				return moment(time).format('YYYY-MM-DD HH:mm:ss');
			},
			clearVal(){
				event.target.getAttribute('data-index')==1?this.startTime = "":this.endTime = ""
			},
			/*右侧表格数据交互函数
			    参数	必选	类型	说明
         state	ture	String	1：控制日志   2：配置日志
         pageNo	ture	int
         pageSize	ture	int
         masterTypeCode	ture	String	查询类型下拉框数据  网页(value:2) 客户端(value:3) 只在控制日志界面上可选  配置日志界面锁死
         startTime	false	String	开始时间String类型(2018-09-22 22:22:22)
         endTime	false	String	结束时间String类型(2018-09-22 22:22:22)
         userName	false	String	登陆名
         loginIp	false	String	IP
         content	false	String	日志详情

			*/
			async getSanyCameraSysLogList() {
				const logQuery = {
					state: this.index.toString(),
					pageNo: this.currentPage,
					pageSize: this.pageSize,
					masterTypeCode: this.typeMessageValue,
					startTime: this.startTime!=''?this.getRightTime(new Date(this.startTime)):'',
					endTime: this.endTime!=''?this.getRightTime(new Date(this.endTime)):'',
					userName: this.userName,
					loginIp: this.loginIp,
					content: this.content
				}
				const res = await getSanyCameraSysLogStaticList(logQuery)
				if (res && res.data.ret == 200) {
					res.data.data.length>0?this.pageShow = true :this.pageShow = false
					this.tableList = res.data.data
					this.tableListTotal = res.data.total
				}

			},
			 /*
			  左侧echarts数据交互函数
				参数	必选	类型	说明
        state	ture	String	1：控制日志   2：配置日志
			 */
			async getSanyCameraSysLogStatic() {
				const res = await getSanyCameraSysLogStaticCharts(this.index)
				if (res && res.data.ret == 200) {
					this.topEchartsList = [];
					this.middleEchartsList = [];
					this.bottomEchartsList = [];
					res.data.typeval.forEach((ele, index) => {
						this.topEchartsList.push({
							value: ele
						})
					})
					res.data.typename.forEach((ele, index) => {
						this.topEchartsList[index].name = ele
					})
					res.data.ipval.forEach((ele, index) => {
						this.middleEchartsList.push({
							value: ele
						})
					})
					res.data.ipname.forEach((ele, index) => {
						this.middleEchartsList[index].name = ele
					})
					res.data.userval.forEach((ele, index) => {
						this.bottomEchartsList.push({
							value: ele
						})
					})
					res.data.username.forEach((ele, index) => {
						this.bottomEchartsList[index].name = ele
					})
					this.renderChart('top', this.topEchartsList);
					this.renderChartPie('middle', this.middleEchartsList, 'ip登录');
					this.renderChartPie('bottom', this.bottomEchartsList, '用户名登录');
				}
			},
			renderChart(id, data) {
				var myChart = echarts.init(document.getElementById(id));
				this.echartsList.push(echarts.init(document.getElementById(id)));
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					calculable: true,
					series: [{
						name: '操作类型',
						type: 'pie',
						radius: ['50%', '70%'],
						itemStyle: {
							normal: {
								label: {
									show: true
								},
								labelLine: {
									show: true
								}
							},
							emphasis: {
								label: {
									show: true,
									position: 'center',
									textStyle: {
										fontSize: '12',
										fontWeight: 'bold'
									}
								}
							}
						},
						data: data
					}]
				};
				myChart.setOption(option);
			},
			renderChartPie(id, data, name,legendName) {
				var myChart = echarts.init(document.getElementById(id));
				this.echartsList.push(echarts.init(document.getElementById(id)))
				// 指定图表的配置项和数据
				var option = {
					/* title: {
						text: '某站点用户访问来源',
						subtext: '纯属虚构',
						x: 'center'
					}, */
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},

					series: [{
						name: name,
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: data,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				myChart.setOption(option);
			},
			logClick() {
				this.index = 1;
				this.selectShow = true;
				this.currentPage = 1;
				this.getSanyCameraSysLogStatic();
				this.getSanyCameraSysLogList();
			},
			configClick() {
				this.index = 2;
				this.selectShow = false;
				this.currentPage = 1;
				this.getSanyCameraSysLogStatic();
				this.getSanyCameraSysLogList();
			},
			enterIndexPage(path) {
        this.$router.replace(path)
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.currentPage = 1;
				this.getSanyCameraSysLogList()
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.getSanyCameraSysLogList()
			},
			typeMessageFn() { //查询类型change事件
        this.getSanyCameraSysLogList()
			},
			gerTableList() { //查询按钮事件
				this.currentPage = 1;
				this.getSanyCameraSysLogList()
			},
			clearTableList() { //清除按钮点击事件
				this.typeMessageValue = 2;
				this.userName = '';
				this.loginIp = '';
				this.content = '' ;
				this.startTime = '';
				this.endTime = '';
				this.currentPage = 1;
        this.getSanyCameraSysLogList();
			}
		}
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
			height: 110px !important;
			background: url(../assets/images/body_title.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 20px;
			position: relative;
			.vision_title {
				font-size: 0.44rem;
				color: #fff;
				font-weight: bold;
				height: 100%;
				span {
					margin-left: 15px;
				}
			}
			.time {
				width: 240px;
				font-size: 0.32rem;
				right: 44px;
				color: #ababab;
				position: absolute;
				top: 70px;
				z-index: 10;
				text-align: left;
				font-family: fontnameUnidreamLED !important;
			}
			.control {
				width: 500px;
				font-size: 0.32rem;
				left: 44px;
				color: #ababab;
				position: absolute;
				top: 70px;
				height: 40px;
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
				.control_log {
					width: 200px;
					height: 40px;
					color: #0188FE;
				}
				.control_log.active {
					background: url(../assets/images/tab.png) no-repeat;
					color: #FFFFFF;
				}
			}
		}
    /*头部结束*/

		/*中间部分开始*/
		.el-main {
			height: calc(100% - 110px);
    /*左侧echarts图表开始*/
			.left {
				width: 460px;
				float: left;
				height: 100%;
				display: flex;
				flex-direction: column;

				.item {
					flex: 1;
          background: rgba(39, 69, 111, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
					padding: 10px;
					.item_home_title {
						padding-left: 24px;
						font-weight: bold;
						font-size: 20px;
						color: white;
						background: url(../assets/images/index_title-blue.png) 0% 50% no-repeat;
					}
					.chartBox {
						height: calc(100% - 29px);
						width: 100%;
					}
				}
				.item:nth-of-type(2){
					margin:10px 0px;

				}
			}
    /*左侧echarts图表结束*/
		/*右侧表格开始*/
			.right {
				width: calc(100% - 485px);
				float: left;
				background: rgba(39, 69, 111, 0.3);
				border: 1px solid rgba(255, 255, 255, 0.1);
				margin-left: 20px;
				padding: 30px 20px;
				height: 100%;
				position:relative;
				.search {
					width: 100%;
					overflow: hidden;
					.module {
						width: 12%;
						height: 100%;
						margin-left: 20px;
						position: relative;
						display: inline-block;
						input {
							width: 100%;
							height: 30px;
							font-size: 12px;
							color: #fff;
							line-height: 30px;
							text-indent: 1em;
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
							right: 7px;
							background: url("../assets/images/rmReach.png") no-repeat center;
							background-size: 60% auto;
							cursor: pointer;
						}
					}
					.is-out {
						font-size: 13px;
						font-weight: 400;
						line-height: 32px;
						position: relative;
						select {
							width: 100%;
							height: 29px;
							border-radius: 3px;
							font-size: 12px;
							option:last-child {
								border-bottom-right-radius: 3px;
								border-bottom-left-radius: 3px;
							}
						}
					}
					.search-btn {
						width: 70px;
						height: 30px;
						line-height: 22px;
						background: linear-gradient(to top, #4CDDED, #0088FE);
						font-size: 12.5px;
						color: #fff;
						text-align: center;
						border-radius: 3px;
						border: 1px solid #2d6fbf;
						margin-left: 20px;
						cursor: pointer;
					}
				}
				.title {
					width: 100%;
					color: white;
					height: 22px;
					margin-top: 15px;
					padding: 0 3%;
					span {
						display: inline-block;
						width: 14.2%;
						height: 22px;
						box-sizing: border-box;
						line-height: 22px;
						font-size: 16px;
						text-align: center;
					}
					span:nth-child(1) {
						width: 4%;
					}
					span:nth-child(2) {
						width: 8%;
					}
					span:nth-child(5),
					span:nth-child(6) {
						width: 18%;
					}
					span:nth-child(7) {
						width: 23%;
					}
					span:nth-child(3) {
						width: 14%;
					}
				}
				.index_left_bottom_main {
					//height: calc(90% - 50px);
					height: calc(90%);
					overflow: hidden;
					.message {
						width: 100%;
						height: 100%;
						margin-top: 5px;
						padding-bottom: 15px;
						overflow: hidden;
						/deep/ .el-scrollbar__wrap {
							overflow-x: hidden;
						}
						.title_message {
							width: 100%;
							height: 30px;
							line-height: 30px;
							margin-bottom: 2px;
							padding: 0 3%;
							overflow: hidden;
							color: #80dcf5;
							background: rgba(56, 142, 237, 0.2);
							span {
								display: inline-block;
								width: 14%;
								height: auto;
								font-size: 14px;
								box-sizing: border-box;
								line-height: 25px;
								text-align: center;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
							span:nth-child(1) {
								width: 4%;
							}
							span:nth-child(2) {
								width: 8%;
							}
							span:nth-child(5),
							span:nth-child(6) {
								width: 18%;
							}
							span:nth-child(7) {
								width: 23%;
							}
							span:nth-child(3) {
								width: 14%;
							}
						}
						.title_message:hover {
							background: rgba(56, 142, 237, 0.6);
						}
					}
				}
				/deep/ span.el-pagination__total {
					color: #2b82d3;
				}
				/deep/ input.el-input__inner {
					background-color: rgba(44, 149, 240, 0.1);
					border: 1px solid #285e8c;
					color: #2f96ef;
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
				/deep/ .el-pagination .btn-next,
				.el-pagination .btn-prev {
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
				/deep/ .el-date-editor {
					width: 176px;
				}
				/deep/ .el-picker-panel {
					background: rgb(19, 44, 83) !important;
				}
				/deep/.el-range-editor {
					background-color: #285e8c !important;
				}
			}
			/*右侧表格结束*/
		}
		/*中间部分结束*/
	}
</style>
