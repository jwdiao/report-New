<template>
	<div class="container">
		<div class="header">
			<!--标头-->
			<div class="manage6s_imgText">
				   <span>北京三一集团三现数据中心</span>
			</div>
			<!--右上角时间-->
			<em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
		</div>
		<div class="main">
			<div class="message">
				<!--下拉列表查询条件开始-->
				<div class="search common_select">
					<div class="item">
						<div class="title">工艺</div>
						<div class="form">
							<template>
								<el-select v-model="groupValue" placeholder="请选择" @change="groupChange()" >
									<el-option v-for="item in group" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</div>
					</div>
					<div class="item">
						<div class="title">二级工艺</div>
						<div class="form">
							<template>
								<el-select v-model="secondGroupValue" placeholder="请选择" @change="secondGroupChange()" >
									<el-option v-for="item in secondeGroupOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</div>
					</div>
					<div class="item">
						<div class="title">事业部</div>
						<div class="form">
							<template>
								<el-select v-model="orgValue" placeholder="请选择" @change="org()">
									<el-option v-for="item in orgOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</div>
					</div>
					<div class="item">
						<div class="title">子公司</div>
						<div class="form">
							<template>
								<el-select v-model="companyValue" placeholder="请选择" @change="company()">
									<el-option v-for="item in companyOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</div>
					</div>
					<div class="item">
						<div class="title">厂房</div>
						<div class="form">
							<template>
								<el-select v-model="factoryValue" placeholder="请选择" @change="factory()">
									<el-option v-for="item in factoryOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</div>
					</div>
					<div class="item">
						<div class="title">设备</div>
						<div class="form">
							<template>
								<el-select v-model="cameraValue" placeholder="请选择" @change="facility()">
									<el-option v-for="item in cameraOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</div>
					</div>
					<div class="item">
						<div class="title"></div>
						<div class="form">
							<el-input placeholder="请输入内容" v-model="cameraNameValue" clearable>
							</el-input>
						</div>
					</div>
					<div class="item">
						<div class="title"></div>
						<div class="form">
							<el-button type="primary" @click="getMonitorClick">搜索</el-button>
						</div>
					</div>
				</div>
	      <!--下拉列表查询条件结束-->
				<!--表格开始-->
					<div class="common_table table" style="position:relative;">
						<div style="position:absolute;height:40px;overflow: hidden;width:100%;z-index: 100;">
							<template>
								<el-table :data="tableData" border style="width: 100%"
								@row-click="handleRowClick"
								:row-class-name="tableRowClassName"
								:row-style="selectedHighlight"
								ref="spuProfileTable"
								row-key="kid"
								>
									<el-table-column prop="num" label="序号" width="50">
										<template scope="scope">
											 <span style="color:yellow">{{scope.row.num}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="firstGroupName" label="工艺" width="50">
									</el-table-column>
									<el-table-column prop="cameraName" label="设备名称" min-width="135">
									</el-table-column>
									<el-table-column prop="factoryName" label="厂房" width="100">
									</el-table-column>
									<el-table-column prop="companyName" label="子公司">
									</el-table-column>
									<el-table-column prop="orgName" label="事业部">
									</el-table-column>
								</el-table>
							</template>
						</div>

						<el-scrollbar :class="{isScroll:isScroll,minHeight:true}">
							<template>
								<el-table :data="tableData" border style="width: 100%"
								@row-click="handleRowClick"
								:row-class-name="tableRowClassName"
								:row-style="selectedHighlight"
								ref="spuProfileTable"
								row-key="kid"
								>
									<el-table-column prop="num" label="序号" width="50">
										<template scope="scope">
											 <span style="color:yellow">{{scope.row.num}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="firstGroupName" label="工艺" width="50">
									</el-table-column>
									<el-table-column prop="cameraName" label="设备名称" min-width="135">
									</el-table-column>
									<el-table-column prop="factoryName" label="厂房" width="100">
									</el-table-column>
									<el-table-column prop="companyName" label="子公司">
									</el-table-column>
									<el-table-column prop="orgName" label="事业部">
									</el-table-column>
								</el-table>
							</template>
						</el-scrollbar>
						<!--分页开始-->
						<div class="common_paginaton" v-show="pageShow">
							<template>
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
									:page-sizes="[10,18, 30, 40, 50]" :page-size="pageSize"
									layout="total, sizes, prev, pager, next"
									:total="tableTotal"
									style="height:100%;">
									</el-pagination>
							</template>
						</div>
						<!--分页结束-->
					</div>
				<!--表格结束-->

			</div>
			  <!--视频开始-->
			<div :class="{monitor:true,isAllScreen:allScreen}">
				<div class="top">
					<span v-text="monitorViewMessage.cameraName"></span>
					<span v-show="monitorViewMessage.companyCode">【</span>
					<span v-text="monitorViewMessage.firstGroupName"></span>
					<span v-show="monitorViewMessage.companyCode">】</span>
					<span v-show="monitorViewMessage.companyCode">【</span>
					<span v-text="monitorViewMessage.secondGroupName"></span>
					<span v-show="monitorViewMessage.companyCode">】</span>
					<span v-show="monitorViewMessage.companyCode">【</span>
					<span v-text="monitorViewMessage.factoryName"></span>
					<span v-show="monitorViewMessage.companyCode">】</span>
					<span v-show="monitorViewMessage.companyCode">【</span>
					<span v-text="monitorViewMessage.companyName"></span>
					<span v-show="monitorViewMessage.companyCode">】</span>
					<span v-show="monitorViewMessage.companyCode">【</span>
					<span v-text="monitorViewMessage.orgName"></span>
					<span v-show="monitorViewMessage.companyCode">】</span>
					<el-button type="primary" @click="allScreenLook">{{screenMessage}}</el-button>
				</div>
				<div class="bottom">
					<object classid="clsid:461284E8-135D-44B3-BD59-549150A773EC" id="spv" width="50%" height="50%"> </object>
          <object classid="clsid:461284E8-135D-44B3-BD59-549150A773EC" id="spv2" width="50%" height="50%"> </object>
          <object classid="clsid:461284E8-135D-44B3-BD59-549150A773EC" id="spv3" width="50%" height="50%"> </object>
          <object classid="clsid:461284E8-135D-44B3-BD59-549150A773EC" id="spv4" width="50%" height="50%"> </object>
				</div>
			</div>
			 <!--视频结束-->
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import http from '../../api/http'
	import {
		InitSpvx,
		SetLocalParam,
		SetToolBar,
		playVideoByOcx,
		getScreenWidthAndHeight,
		getPreviewParamByUuid,
		getPreviewParam
	} from '../../assets/js/ocx2.js'
	import {searchCameraList,getOption} from '../../api'
	export default {
		name: 'monitor',
		data() {
			return {
				currentTime: '',//与时间绑定的数据
				labelPosition: 'top',//使表单上下排列
				allScreen:false,//是否全屏显示开关
				screenMessage:'点击查看全屏',	//全屏按钮文字
				flag: true,
				monitorViewMessage:{},//右侧监控左上部分信息
				secondeGroupOptions:[],//二级工艺数组
				orgOptions: [], //事业部数组
				companyOptions: [], //子公司数组
				factoryOptions: [], //厂房数组
				cameraOptions:[],//设备名称数组
				group: [{//工艺数组
					value: '',
					label: '请选择工艺'
				}, {
          value: '00',
          label: '重点'
        }, {
					value: '01',
					label: '下料'
				}, {
					value: '02',
					label: '成型'
				}, {
					value: '03',
					label: '热处理'
				}, {
					value: '04',
					label: '焊接'
				}, {
					value: '05',
					label: '机加'
				}, {
					value: '06',
					label: '涂装'
				}, {
					value: '07',
					label: '装配'
				}, {
					value: '08',
					label: '调试'
				}, {
					value: '09',
					label: '公共'
				}],
				tableData: [],//左下部表格数组
				groupValue: '00',//工艺value值
				secondGroupValue:'',//二级工艺
				orgValue: '',//事业部value值
				companyValue: '',//子公司value值
				factoryValue: '',//厂房value值
				cameraValue:'',//设备value值
				cameraNameValue:'',//输入框的value值
				getIndex:0,//表格行索引
				isScroll:false,//是否出现滚动条开关
				tableTotal:0,//总条数默认为0
				currentPage: 1,//当前页默认为第一页
				pageSize:18,//每页默认18条
				pageShow:false//是否显示分页

			};
		},
		mounted(){
			this.currentTime = this.getCurrentDateTime();
			setInterval(() => {
				this.currentTime = this.getCurrentDateTime();
			}, 1000)
			window.addEventListener('resize', this.handleResize); //给window对象绑定resize事件
			//页面首次加载获取事业部下拉列表数据
			this.getOptions(0, 'org', '请选择事业部','/sanybasicorg/getOrg/');
			//页面首次加载表格内加载摄像头信息
			this.getMonitor();
			// oct =====
			var ocxObj = document.getElementById('spv'),
				initRet = InitSpvx(ocxObj);
			if (initRet === 0) {
				// 设置OCX本地参数
				var localParamRet = SetLocalParam(ocxObj);
				if (localParamRet === 0) {
					// 设置工具栏
					// setTimeout(function() {
					// 	SetToolBar(ocxObj);
					// }, 500);
					 var minHeight = getScreenWidthAndHeight(false,
					     false);
				}
			}
			var ocxObj2 = document.getElementById('spv2'),
				initRet2 = InitSpvx(ocxObj2);
			if (initRet === 0) {
				// 设置OCX本地参数
				var localParamRet2 = SetLocalParam(ocxObj);
				if (localParamRet === 0) {
					// 设置工具栏
					// setTimeout(function() {
					// 	SetToolBar(ocxObj);
					// }, 500);
					 var minHeight2 = getScreenWidthAndHeight(false,
					     false);
				}
			}
			var ocxObj3 = document.getElementById('spv3'),
				initRet3 = InitSpvx(ocxObj3);
			if (initRet === 0) {
				// 设置OCX本地参数
				var localParamRet3 = SetLocalParam(ocxObj);
				if (localParamRet === 0) {
					// 设置工具栏
					// setTimeout(function() {
					// 	SetToolBar(ocxObj);
					// }, 500);
					 var minHeight3 = getScreenWidthAndHeight(false,
					     false);
				}
			}
			var ocxObj4 = document.getElementById('spv4'),
				initRet4= InitSpvx(ocxObj4);
			if (initRet === 0) {
				// 设置OCX本地参数
				var localParamRet4 = SetLocalParam(ocxObj);
				if (localParamRet === 0) {
					// 设置工具栏
					// setTimeout(function() {
					// 	SetToolBar(ocxObj);
					// }, 500);
					 var minHeight4 = getScreenWidthAndHeight(false,
					     false);
				}
			}
      //页面首次加载请选择二级工艺
      this.emptySelect('group');
      this.getOptions(this.groupValue, 'group', '请选择二级工艺','/cameraGroup/getGroup/');
			// ocx =====
		},
		methods: {
			handleResize() {
				//给每一个echarts添加resize事件
				this.countTableSize()
			},
			enterIndexPage(path) {
				// 路径从state中获取
				// window.location.href = `${this.$store.state.baseUrl}/sanyShebei`; //测试
				this.$router.replace(path)
			},
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
			handleSizeChange(val) {//每页多少条
				this.pageSize = val;
				this.currentPage=1;
				this.getMonitor();
			},
			handleCurrentChange(val) {//当前页
				this.currentPage = val;
				this.getMonitor();
			},
			groupChange() {//工艺选择change联动事件
				this.emptySelect('group');
				this.getOptions(this.groupValue, 'group', '请选择二级工艺','/cameraGroup/getGroup/');
			},
			org() {//事业部change事件
					this.emptySelect('org');
					this.getOptions(this.orgValue, 'company', '请选择子公司','/sanybasicorg/getOrg/');
			},
			company() {//子公司change事件
			    this.emptySelect('company');
					this.getOptions(this.companyValue, 'factory', '请选择厂房','/sanybasicorg/getOrg/');
			},
			factory(){//厂房change事件
			    this.emptySelect('factory');
					this.getOptions(this.factoryValue, 'camera', '请选择设备','/camera/getCameraByFactoryCode/');
			},
			facility(){//设备名称change事件

			},
			allScreenLook(){//全屏按钮点击事件函数
				this.allScreen=!this.allScreen;
				this.screenMessage = this.screenMessage=="点击查看全屏"?"还原":"点击查看全屏";
			},
			/*
			  函数名:emptySelect
			  参数：name:用于区分change事件来源于哪个选择器
			  描述：当前选择器的值为空时将它所联动的下级选择器的值初始化
			*/
			emptySelect(name){
				switch (name){
					case 'group':
					 this.secondeGroupOptions=[{value:'',label:'请选择'}];
					 this.secondGroupValue='';
					 break;
					case 'org'://如果事业部是空
					 this.companyOptions=[{value:'',label:'请选择'}];
					 this.companyValue='';
					 this.factoryOptions=[{value:'',label:'请选择'}];
					 this.factoryValue='';
					 this.cameraOptions=[{value:'',label:'请选择'}];
					 this.cameraValue='';
					 this.cameraNameValue='';
						break;
					case 'company'://如果子公司是空
					 this.factoryOptions=[{value:'',label:'请选择'}];
					 this.factoryValue='';
					 this.cameraOptions=[{value:'',label:'请选择'}];
					 this.cameraValue='';
					 this.cameraNameValue='';
						break;
					case 'factory'://如果厂房是空
					 this.cameraOptions=[{value:'',label:'请选择'}];
					 this.cameraValue='';
					 this.cameraNameValue='';
						 break;
					case 'facility':
					 this.cameraNameValue='';
					default:
						break;
				}
			},
			countTableSize(){//通过对滚动组件切换类名来实现有滚动条和没滚动条的高度自适应
				if(this.tableData.length>18){
					this.isScroll=true;
					const myHeight = document.getElementsByClassName('table')[0].offsetHeight-50;
					document.getElementsByClassName('minHeight')[0].style.height = myHeight + 'px';
				}else{
					const tbHeight = this.tableData.length*35;
					document.getElementsByClassName('minHeight')[0].style.minHeight = "90px";
					document.getElementsByClassName('minHeight')[0].style.height = "";
				}
			},

			/*函数名：getMonitor
			参数：num:请求携带参数;type:change事件来源于谁;message:不同选择器被制空后默认显示的提示信息;url:请求地址
			描述：查询后将摄像头信息展示到表格内
			*/

			async getOptions(num, type, message,url) {
				const res = await getOption(url , num);
				if (res && res.data.ret == 200) {
					const list = [];
					res.data.data.forEach(function(ele, index) {
						if(type=='camera'){
							const obj = {
								value: ele.cameraName,
								label: ele.cameraName
							}
							list.push(obj);
						}else if(type=='group'){
							const obj = {
								value:ele.groupCode,
								label:ele.groupName
							}
							list.push(obj);
						}else{
							const obj = {
								value: ele.orgCode,
								label: ele.orgName
							}
							list.push(obj);
						}

					})
					list.unshift({
						value: '',
						label: message
					});
					if (type == 'org') {
						this.orgOptions = list;
					} else if (type == "company") {
					  this.companyValue = '';
						this.companyOptions = list;
					} else if (type == "factory") {
						this.factoryValue = ''
						this.factoryOptions = list;
					} else if (type=="camera"){
						this.cameraValue = '';
						this.cameraOptions = list;
					} else if (type=='group'){
						this.secondGroupValue = '';
						this.secondeGroupOptions = list;
					}
				}
			},
			getMonitorClick(){
				this.currentPage=1;
				this.getMonitor()
			},
			/*函数名：getMonitor
			参数：无
			描述：查询后将摄像头信息展示到表格内
			*/
			async getMonitor() { //表格数据
			  this.getIndex = 0;//每次调用之后都默认显示第一行
				/* const cameraserchObj = {
					'secondGroupCode':this.secondGroupValue,//二级工艺
					'orgCode': this.orgValue || '',//事业部
					'companyCode': this.companyValue||'',//子公司
					'factoryCode': this.factoryValue || '',//工厂
					'firstGroupCode': this.groupValue || '',//工艺
					'cameraName': this.cameraValue || '',//设备
					'searchNme': this.cameraNameValue || '',//搜索框的值
					'startIndex':(this.currentPage-1)*this.pageSize,//当前页码-1乘以每页显示多少条
					'pageSize':this.pageSize//每页显示多少条
				}	 */
				const res = await searchCameraList(this.secondGroupValue,this.orgValue,this.companyValue,this.factoryValue,this.groupValue,this.cameraValue,this.cameraNameValue,(this.currentPage-1)*this.pageSize,this.pageSize);
				if (res && res.data.ret == 200) {
				  res.data.data.list.forEach((ele,index)=>{
						    ele.num = (this.currentPage-1)*this.pageSize+index+1;
					})
					this.tableData = res.data.data.list;
				  // console.log('tableData:',this.tableData)
					this.tableTotal = res.data.data.totalCount;
					if(this.tableData.length>0){
						this.pageShow=true;
						this.monitorViewMessage = this.tableData[0];//当调用表格接口时视频上方默认显示第一行各列信息
						this.countTableSize();
						this.playVideo(this.monitorViewMessage);//当调用表格接口时默认显示第一个摄像头
					}else{
						this.pageShow=false;
					}

				}
			},
			/*函数名：playVideo
			参数：viewData:要调取摄像头的表格行所对应的字典，要将字典中的cameraUuid和companyCode作为参数传递
			描述：播放ocx方法函数
			*/
			playVideo(viewData) {
				var viewPath = getPreviewParamByUuid(viewData.cameraUuid, 0, false, viewData.companyCode);
				if (viewPath) {
					var ocxObj = document.getElementById('spv');
					var ocxObj2 = document.getElementById('spv2');
					var playRet = playVideoByOcx(ocxObj, viewPath);
					var playRet2 = playVideoByOcx(ocxObj2, viewPath);
					if (playRet === 0) {
					}
				}
			},
			tableRowClassName({row,rowIndex}){
				row.index = rowIndex//把每一行的索引放入row
			},
      //如果this.getIndex==当前行索引当前行加高亮背景色
			selectedHighlight({row,rowIndex}){
				if((this.getIndex===rowIndex)){
					return{
						"background-color" : "rgba(56, 142, 237, 0.6)"
					}
				}
			},
      //点击每一行显示对应
			handleRowClick(row, event, column) {
				this.monitorViewMessage=row	//将每一行的字典赋值给	this.monitorViewMessage即监控视频左上方文字描述字典
				this.getIndex = row.index//将选中行的索引赋值给this.getIndex
				this.playVideo(row);//调用ocx组件播放方法，并将当前行的uid和code传递
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.handleResize)
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-image: url(../../assets/images/body_bg.png);
		background-size: 100% 100%;
		color: rgb(255, 255, 255);
		background-repeat: no-repeat;
		overflow: hidden;
		padding: 0.10rem 0.20rem;
		.header {
			height: 1.1rem;
			.manage6s_imgText {
				background-image: url(../../assets/images/body_title.png);
				background-size:100% 100%;
				font-size: 0.44rem;
				color: #fff;
				font-weight: bold;
				text-align: center;
				height: 100%;
				line-height: 1.10rem;
			}
			.time {
				width: 2.50rem;
				font-size: 0.32rem;
				right: 1.9rem;
				color: #ababab;
				position: fixed;
				top: 0.60rem;
				z-index: 10;
				text-align: left;
				font-family: fontnameUnidreamLED !important;
			}
			.button {
				width: 90px;
				height: 40px;
				background: url(../../assets/images/index_back.png) no-repeat;
				position:fixed;
				top:0.60rem;
				left:0.15rem;
				cursor:pointer;
			}
		}

		.main {
			flex: 1;
			display: flex;
			flex-direction: row;

			.message {
				width: 6.06rem;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				.search {
					min-height: 1.10rem;
					width: 6.06rem;
					overflow: hidden;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;

					.item {
						height: 0.55rem;
						width: 25%;
						display: flex;
						flex-direction: column;
						padding-right: 0.05rem;

						.title {
							font-size: 0.13rem;
							margin-bottom: 0.05rem;
							height: 0.17rem;

						}
						 .form {
							height: 0.30rem;
							/deep/ .el-input {
								display: block;

								.el-input__inner {
									height: 0.30rem;
									line-height: 0.30rem;
								}
							}

							/deep/ .el-select {
								display: block;

								/deep/ .el-input__inner {
									height: 0.30rem;
								}

								/deep/ .el-input__icon {
									line-height: 0.30rem;
								}
							}

							/deep/ .el-button {
								display: block;
								height: 0.30rem;
								line-height: 0;
							}
						}
					}
				}

				.table {
					margin: 10px 0px;
                    flex:1;
					/* max-height:400px; */
					/* overflow-y:auto;
					width:650px; */
					/*如果需要滚动条则给固定高度*/
					/* /deep/ .isScroll.minHeight{
						height:650px;
					} */
					/*如不需要滚动条则给最小高度*/
					/deep/ .minHeight{
						min-height:90px;
					}
					/*去掉横向滚动条和默认的-margin值*/
					/deep/ .el-scrollbar__wrap{
						overflow-x:hidden;
						margin-bottom: 0px !important;
					}
					/deep/ .el-table .cell {
						white-space: nowrap;
						padding: 0px 5px;
					}

					/deep/ .el-table td {
						padding: 5px 0px;
					}
                    /deep/ .el-table__row{
						cursor:pointer;
					}
				    /deep/ .el-table tbody tr:hover>td {
						background:rgba(56, 142, 237, 0.6);
					}
					/* /deep/ .el-table__row:hover{
						cursor:pointer;
						background:yellow;
					} */
					/* /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
						background-color:gray !important;
					} */
				    }

				.common_paginaton {
					height: 40px;
					margin-top:10px;
				}
			}

			.monitor {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0px 10px;

				.top {
					display: flex;
					height:54px;
					position: relative;
					padding: 7px 10px 7px;
					background: rgba(0, 0, 0, 0.35);
					/deep/ .el-button--primary{
						position:absolute;
						right:10px;
						padding:10px 8px;
					}

					span {
						font-size: 0.20rem;
						display: inline-block;
						line-height:0.42rem;
					}
				}

				.bottom {
					flex: 1;
				}

			}
			.monitor.isAllScreen{
				position:fixed;
				top:0;
				bottom:0;
				left:0;
				right:0;
				//padding: 20px;
				background: rgba(8, 33, 60, 0.9);
			}
		}
	}
</style>
