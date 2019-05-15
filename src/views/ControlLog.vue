<template>
	<el-container>
		<!--头部开始-->
		<el-header>
			<!--标头-->
			<div class="vision_title">
				<!-- <span @click="enterIndexPage">北京三一视觉考勤</span> -->
				<span @click="showSelectDialog">三现数据安全管理
				<span v-show='this.$store.state.selectedSubcompany'>({{this.$store.state.selectedSubcompany}})</span>
				<!--<span v-show='!companyValue'>(北京桩机)</span>-->
				</span>
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
						value-format="yyyy-MM-dd HH:mm:ss"
						:clearable = "false"
						:picker-options="pickerOptionsStart"></el-date-picker>
					 <i v-show="isRm1" data-index="1" @click="clearVal"></i>
					</label>
					<label class="module" style="width: 16%;">
						<el-date-picker type="datetime" placeholder="结束时间"
						v-model="endTime"
						style="width: 100%;"
						:clearable = "false"
						 value-format="yyyy-MM-dd HH:mm:ss"
						:picker-options="pickerOptionsEnd"></el-date-picker>
						 <i v-show="isRm2" data-index="2" @click="clearVal"></i>
					</label>
					<button class="search-btn" @click="getTableList">搜索</button>
					<button class="search-btn" @click="clearTableList">清空</button>
				</div>
				<!--查询条件结束-->
				<!--表格开始-->
				<div class="title"><span>序号</span><span>用户名</span><span>子系统</span><span>操作类型</span><span>IP</span><span>日期</span><span>日志详情</span></div>
				<div class="index_left_bottom_main">
					<div v-show="warnMessage" style="color: #e6e6e6;
                                text-align: center;
                                padding: 20px;">暂无数据</div>
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
		<!--<div class="index_selectDialog" v-show="selectDialogShow">
		  <ul>
		    <li>
		      <p class="title">事业部</p>
		      <div class="common_select">
		        <el-select
		        v-model="careerValue"
		        @change="careerChange"
		        placeholder="请选择"
		        >
		          <el-option
		            v-for="item in careerOptions"
		            :key="item.value"
		            :label="item.label"
		            :value="item.value">
		          </el-option>
		        </el-select>
		      </div>
		    </li>
		    <li>
		      <p class="title">子公司</p>
		      <div class="common_select">
		        <el-select
		        v-model="companyValue"
		        placeholder="请选择"
		        >
		          <el-option
		            v-for="item in companyOptions"
		            :key="item.value"
		            :label="item.label"
		            :value="item.value">
		          </el-option>
		        </el-select>
		      </div>
		    </li>
		    <li>
		      <span class="btn confirm" @click="handleConfirm">确定</span>
		      <span class="btn cancel" @click="handleCancel">取消</span>
		    </li>
		  </ul>
		</div>-->
    <HeaderToSelected :selectDialogShow="selectDialogShow" @selectDialogShowName="selectDialogFunction"/>
	</el-container>
</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import axios from 'axios'
	import http from '../api/http'
	import {getSanyCameraSysLogStaticList,getSanyCameraSysLogStaticCharts} from '../api'
  import HeaderToSelected from '../components/checking-v20190410/HeaderToSelected'
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
				selectDialogShow: false, // 是否显示顶部事业部子公司弹窗
				companyValue:'',
				timer:null,
				warnMessage:false,
				/*companyOptions:[],
				careerValue: '', // 点击标题下拉事业部选中值
				careerOptions: [ // 事业部下拉option
          {label:'重机事业部',value:'zhongji'},
					{label:'泵送事业部',value:'bengsong'},
					{label:'重能事业部',value:'zhongneng'},
					{label:'重起事业部',value:'zhongqi'},
					{label:'重卡事业部',value:'zhongka'},
					{label:'港机事业部',value:'gangji'},
          {label:'筑工事业部',value:'zhugong'},
				],*/
				pickerOptionsStart: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
        /*time.getTime() < new Date(this.valueStart).getTime() - 3600*1000*24 ||*/
				pickerOptionsEnd:{
					disabledDate(time){
						return  time.getTime() > Date.now();
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
    components:{
      HeaderToSelected
    },
		mounted() {
			this.startTime = this.getStartTime();
			this.endTime = this.getCurrentDateTime1();
			this.currentTime = this.getCurrentDateTime();
			setInterval(() => {
				this.currentTime = this.getCurrentDateTime();
			}, 1000);
			this.getSanyCameraSysLogList(this.getStartTime(),this.getCurrentDateTime1());
			this.getSanyCameraSysLogStatic();
			setInterval(() => {
				this.getSanyCameraSysLogList(this.startTime,this.endTime);
				this.getSanyCameraSysLogStatic();
			}, 1000*60*2);
			this.timer = setInterval(() => {
				this.endTime = this.getCurrentDateTime1();
				this.startTime = this.getStartTime();
			},1000*60*2-1000);
			window.addEventListener('resize', this.handleResize); //给window对象绑定resize事件

		},
		methods: {
			handleResize() {
				//给每一个echarts添加resize事件
				this.echartsList.forEach((ele, index) => {
					ele.resize();
				})
			},
			getStartTime(){
				return moment(new Date().getTime() - 604800000).format('YYYY-MM-DD HH:mm:ss');
			},
			getCurrentDateTime1(){
				return moment(new Date().getTime() - 1000*60*5).format('YYYY-MM-DD HH:mm:ss');
			},
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
			getRightTime(time){
				return moment(time).format('YYYY-MM-DD HH:mm:ss');
			},
			showSelectDialog () {
			  this.selectDialogShow = true
			},
      //20190514头部下拉单独模块
			/*careerChange (val) {
			  // console.log(`选择的事业部是：${val}`)
			  this.companyOptions = []
			  this.companyValue = ''
			  if (val === 'bengsong') {
					this.companyOptions = [
						{label:'长沙泵送',value:'长沙泵送',},
						{label:'邵阳湖汽',value:'邵阳湖汽'},
						{label:'娄底中源',value:'娄底中源'},
						{label:'娄底中兴',value:'娄底中兴'},
						{label:'益阳中阳',value:'益阳中阳'},//20190510
						{label:'常德路机',value:'常德路机'},
					]
				} else if (val === 'zhongji') {
					this.companyOptions = [
						{label:'北京桩机',value:'北京桩机'},
						{label:'常熟索特',value:'常熟索特'},
						{label:'临港中挖',value:'临港中挖'}, //20190510
            // {label:'昆山重机',value:'昆山重机'},
            {label:'重机华湘',value:'重机华湘'},
            {label:'重机大挖',value:'重机大挖'},
            {label:'重机小挖',value:'重机小挖'},
					]
				} else if (val === 'zhongneng') {
					this.companyOptions = [
						{label:'三一重能',value:'三一重能'},
						{label:'三一叶片',value:'三一叶片'},
            {label:'三一电机',value:'三一电机'}
					]
				} else if (val === 'zhongqi') {
					this.companyOptions = [
						{label:'宁乡起重机',value:'宁乡起重机'},
						{label:'湖州装备',value:'湖州装备'}
					]
				} else if (val === 'zhongka') {
					this.companyOptions = [
						{label:'三一重卡',value:'三一重卡'}
					]
				} else if (val === 'gangji') {
					this.companyOptions = [
						{label:'长沙港机',value:'长沙港机'},
						{label:'珠海港机',value:'珠海港机'}
					]
				}else if (val === 'zhugong') {
          this.companyOptions = [
            {label:'快而居',value:'快而居'},
          ]
        }
			},
			handleConfirm () {
			  // console.log('选择的子公司是：',this.companyValue)
			  if (!this.careerValue) {
			    this.$message({
			      type: 'warning',
			      message: '请选择事业部!',
			      customClass: 'messageInfo'
			    });
			    return;
			  }
			  if (this.companyValue === '') {
			    this.$message({
			      type: 'warning',
			      message: '请选择子公司!'
			    });
			    return;
			  }

			  let BaseUrlReq = ''
				let code = ''
				if (this.companyValue === '长沙泵送'){
					BaseUrlReq = 'http://10.0.91.50:8083'
					code = '0201'
				} else if (this.companyValue === '邵阳湖汽'){
					BaseUrlReq = 'http://10.13.136.22:8083'
					code = '0206'
				} else if (this.companyValue === '娄底中源'){
					BaseUrlReq = 'http://10.14.0.17:8083'
					code = '0202'
				} else if (this.companyValue === '北京桩机') {
					BaseUrlReq = 'http://10.19.7.69:8083'
					code = '0303'
				} else if (this.companyValue === '常熟索特') {
					BaseUrlReq = 'http://10.15.150.21:8083'
					code = '0306'
				} else if (this.companyValue === '三一重能') {
					BaseUrlReq = 'http://10.19.7.70:8083'
					code = '0701'
				} else if (this.companyValue === '宁乡起重机') {
					BaseUrlReq = 'http://10.16.1.65:8083'
					code = '0502'
				} else if (this.companyValue === '湖州装备') {
          BaseUrlReq = 'http://10.29.77.240:8083'
        } else if (this.companyValue === '三一重卡') {
					BaseUrlReq = 'http://10.192.29.12:8083'
					code = '0101'
				} else if (this.companyValue === '娄底中兴') {
					BaseUrlReq = 'http://10.193.88.6:8083'
					code = '0303'
				} else if (this.companyValue === '三一叶片') {
					BaseUrlReq = 'http://10.19.220.179:8083'
				} else if (this.companyValue === '三一电机') {
          BaseUrlReq = 'http://10.19.7.70:8084'
        } else if (this.companyValue === '益阳中阳') {
					BaseUrlReq = 'http://10.22.33.100:8083'
				} else if (this.companyValue === '常德路机') {
          BaseUrlReq = 'http://10.21.23.101:8083'
        } else if (this.companyValue === '长沙港机') {
					BaseUrlReq = 'http://10.1.91.1:8083'
				} else if (this.companyValue === '临港中挖') {
					BaseUrlReq = 'http://10.11.16.187:8084'
				} else if (this.companyValue === '昆山重机') {
					BaseUrlReq = 'http://10.11.16.187:8083'
				} else if (this.companyValue === '重机华湘') {
          BaseUrlReq = 'http://10.11.16.187:8087'
        } else if (this.companyValue === '重机大挖') {
          BaseUrlReq = 'http://10.11.16.187:8085'
        } else if (this.companyValue === '重机小挖') {
          BaseUrlReq = 'http://10.11.16.187:8086'
        } else if (this.companyValue === '珠海港机') {
					BaseUrlReq = 'http://10.193.4.244:8083'
				}else if (this.companyValue === '快而居') {
          BaseUrlReq = 'http://10.192.20.245:8083'
        }
			  this.companyCode = code;
			  axios.defaults.baseURL = BaseUrlReq


			  clearInterval(this.refreshDataId)
			  this.selectDialogShow = false // 关闭弹窗


				this.getSanyCameraSysLogList(this.startTime,this.endTime);
				this.getSanyCameraSysLogStatic();
			},
			// 关闭顶部选择事业部弹窗
			handleCancel () {
			  this.selectDialogShow = false
			},*/
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
			async getSanyCameraSysLogList(startTime,endTime) {
				const logQuery = {
					state: this.index.toString(),
					pageNo: this.currentPage,
					pageSize: this.pageSize,
					masterTypeCode: this.typeMessageValue,
					/* startTime: this.startTime!=''?this.getRightTime(new Date(this.startTime)):'',
					endTime: this.endTime!=''?this.getRightTime(new Date(this.endTime)):'', */
					/* startTime: this.getRightTime(new Date(this.startTime)),
					endTime: this.getRightTime(new Date(this.endTime)), */
					startTime,
					endTime,
					userName: this.userName,
					loginIp: this.loginIp,
					content: this.content
				}
				const res = await getSanyCameraSysLogStaticList(logQuery)
				if (res && res.data.ret == 200) {
					if(res.data.data!=null){
						res.data.data.length>0?this.pageShow = true :this.pageShow = false
						this.tableList = res.data.data
						this.tableListTotal = res.data.total
						this.warnMessage = false
					}else{
						this.tableList = []
						this.tableListTotal = 0
						this.pageShow=false
						this.warnMessage = true
					}

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
					if(res.data.typeval instanceof Array){
						res.data.typeval.forEach((ele, index) => {
							this.topEchartsList.push({
								value: ele
							})
						})
					}
					if(res.data.typename instanceof Array){
						res.data.typename.forEach((ele, index) => {
							this.topEchartsList[index].name = ele
						})
					}
					if(res.data.ipval instanceof Array){
						res.data.ipval.forEach((ele, index) => {
							this.middleEchartsList.push({
								value: ele
							})
						})
					}
					if(res.data.ipname instanceof Array){
						res.data.ipname.forEach((ele, index) => {
							this.middleEchartsList[index].name = ele
						})
					}
					if(res.data.userval instanceof Array){
						res.data.userval.forEach((ele, index) => {
							this.bottomEchartsList.push({
								value: ele
							})
						})
					}
					if(res.data.username instanceof Array){
						res.data.username.forEach((ele, index) => {
							this.bottomEchartsList[index].name = ele
						})
					}

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
								},
								color:function(params){
									var colorList = [
										'#16c329','#c23835','#16c329','#4f06eb','#0dc79e','#078ceb','#61a0a9','#c9862b'
									]
									return colorList[params.dataIndex]
								},
								borderColor:'rgba(19,38,68,1)'
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
							color:function(params){
								var colorList = [
									'#c23835','#16c329','#4f06eb','#0dc79e','#078ceb','#61a0a9','#c9862b'
								]
								return colorList[params.dataIndex]
							},

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
				this.getSanyCameraSysLogList(this.startTime,this.endTime);
			},
			configClick() {
				this.index = 2;
				this.selectShow = false;
				this.currentPage = 1;
				this.getSanyCameraSysLogStatic();
				this.getSanyCameraSysLogList(this.startTime,this.endTime);
			},
			enterIndexPage(path) {
        this.$router.replace(path)
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.currentPage = 1;
				this.getSanyCameraSysLogList(this.startTime,this.endTime)
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.getSanyCameraSysLogList(this.startTime,this.endTime)
			},
			typeMessageFn() { //查询类型change事件
        this.getSanyCameraSysLogList(this.startTime,this.endTime)
			},
			getTableList() { //查询按钮事件
                clearInterval(this.timer)
				this.currentPage = 1;
				this.getSanyCameraSysLogList(this.startTime,this.endTime)
			},
			clearTableList() { //清除按钮点击事件
				/* this.typeMessageValue = 2; */
				this.userName = '';
				this.loginIp = '';
				this.content = '' ;
				this.startTime = '';
				this.endTime = '';
				this.currentPage = 1;
                this.getSanyCameraSysLogList(this.startTime,this.endTime);
			},
      //20190514分离headerToSelected
      selectDialogFunction(val){
        this.selectDialogShow = val.flag
        if(val.loadingData){
          this.getSanyCameraSysLogList(this.startTime,this.endTime);
          this.getSanyCameraSysLogStatic();
        }
      },
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
						position:relative;
					}
					.item_home_title:after{
						display: block;
						content: '';
						position: absolute;
						width: 12px;
						height: 12px;
						border-radius: 12px;
						background: #31E6FF;
						left: 0px;
						top: 43%;
						margin-top: -5px;
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

		.index_selectDialog{
		  background-color: rgba(9, 20, 40, 0.8);border:1px solid #6bb9d5;
		  position:fixed;top:105px;z-index:999;left:50%;transform: translateX(-50%);
		  padding:28px 60px 48px;
		  width:420px;margin:0 auto;font-size:12px;
		  .title{font-size:20px;color:#fff;margin-top:20px;}
		  .common_select{margin-top:10px;}
		  .el-select{
		    width:100%;
		  }
		  /deep/ .el-input__inner {
		      height: 38px !important;
		      line-height: 38px !important;
		  }
		  .btn{
		    height:40px;line-height:40px;display: inline-block;font-size:20px;
		    text-align: center;border-radius: 4px;margin-top:30px;width:48%;
		  }
		  .confirm{
		    background-color: #0088ff;color:#fff;cursor: pointer;
		  }
		  .cancel{
		    margin-left:4%;
		    background-color: #b3b3bd;color:#0c1932;cursor: pointer;
		  }
		}
	}
</style>
