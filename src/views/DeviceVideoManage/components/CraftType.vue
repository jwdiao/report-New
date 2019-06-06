<template>
<div style="height:100%" ref="tableBox" id="tableBox">
	<el-scrollbar style="height:90%;" v-show="machineShow">
	  <ul class="clear overview-crafttype" >
	    <li
	      v-for="(item, index) in ListArray" :key="index"
				@click="handleLiClick(item,index)"
	      :class="`overview-navConItem ${item.totalNum?'':'overview-navConItem-disable'}`"
	    >
			  <!--@click="handleClick(item)"-->
	      <div class="clear title" >
	        <div class="left">
	          <em class="num">{{index+1}}.</em>
	          <span class="ellipsis name">{{item.firstGroupCode}}</span>
	        </div>
	        <!-- <div class="right amount">{{item.totalNum}}台</div> -->
	      </div>
	      <div class="content">
	        <ul>
			  <li>
				<span class="label">总数</span>
				<span class="value">{{item.totalCount}}</span>
			  </li>
			  <li>
			    <span class="label">在线数</span>
			    <span class="value">{{item.onlineNum}}</span>
			  </li>
			  <li>
			    <span class="label">在线率</span>
			    <span class="value">{{item.onlinerate}}%</span>
			  </li>
	          <li>
	            <span class="label">离线率</span>
	            <span class="value">{{item.offlinerate}}%</span>
	          </li>
	          <li>
	            <span class="label">离线数</span>
	            <span class="value">{{item.offlineNum}}</span>
	          </li>
	        </ul>
	      </div>
	    </li>
	  </ul>
	</el-scrollbar>
	<el-scrollbar style="height:90%;" v-show="machineSecondShow">
	  <ul class="clear overview-crafttype" >
	    <li
	      v-for="(item, index) in secondArrList" :key="index"
				@click="handleLiSecondClick(item,index)"
	      :class="`overview-navConItem ${item.totalNum?'':'overview-navConItem-disable'}`"
	    >
			  <!--@click="handleClick(item)"-->
	      <div class="clear title" >
	        <div class="left">
	          <em class="num">{{index+1}}.</em>
	          <span class="ellipsis name">{{item.groupName}}</span> 
	        </div>
	        <!-- <div class="right amount">{{item.totalNum}}台</div> -->
	      </div>
	      <div class="content">
	        <ul>
			  <li>
				<span class="label">总数</span>
				<span class="value">{{item.totalCount}}</span>
			  </li>
			  <li>
			    <span class="label">在线数</span>
			    <span class="value">{{item.onlineNum}}</span>
			  </li>
			  <li>
			    <span class="label">在线率</span>
			    <span class="value">{{item.onlinerate}}%</span>
			  </li>
	          <li>
	            <span class="label">离线率</span>
	            <span class="value">{{item.offlinerate}}%</span>
	          </li>
	          <li>
	            <span class="label">离线数</span>
	            <span class="value">{{item.offlineNum}}</span>
	          </li>
	        </ul>
	      </div>
	    </li>
	  </ul>
	</el-scrollbar>
	
	
	
</div>
</template>
<script>
import moment from 'moment'
import {
  reqCountDeviceMain,getVideoServe
} from '../../../api/deviceVideoManageApi'
import {
  getOption
} from '../../../api'
//import getOption from '../../../api/index'
export default {
  name: 'CraftType',
  data() {
    return{
      currentTime: '', // 系统当前日期
      list: [],
      companyCode: '',
			pageShow:true,
			pageSize:18,
			currentPage:1,
			tableTotal:18,
			cameraList:[],
			getIndex:0,//表格行索引
			ListArray:[],
			secondCodeList:[],
			secondArrList:[],
			
			
			//machineSecondShow:false
			//tableHeight:350
			//isMachineShow:true
    }
  },
  computed: {
		companyCodeStr() {
		  return this.$store.state.sbhlOverViewSelectedCompany;
		},
		machineShow(){
			return this.$store.state.isMachineShow;
		},
		tableHeight(){
			return this.$store.state.tableHeight;
		},
		machineSecondShow(){
			return this.$store.state.machineSecondShow;
		}
		
  },
  watch: {
    companyCodeStr(newvalue) {
      
    },
		machineShow(newvalue){
			console.log(newvalue)
		}
  },
	created(){
		//console.log(this.$refs.tableBox)
		
	},
  mounted() {
		   //
		   //this.tableHeight = 200
		  //console.log(this.$refs.tableBox)
	this.getVideoServeHttp();
    this.currentTime = moment(new Date()).format('YYYY-MM-DD');
	//this.getVideoServeHttp1();
    if(this.companyCodeStr) { // 页面切换tab时，this.companyCodeStr=''
       this.getCraftTypeData()
    }
	//this.getOptions()
	window.addEventListener('resize', this.handleResize);
  },
  methods: {
		handleResize(){
			this.$store.state.tableHeight = this.$refs.tableBox.offsetHeight-70
		},
		handleLiClick(item,index){
			//console.log(item,index)
			//this.$store.state.tableHeight = this.$refs.tableBox.offsetHeight-70
			this.$emit('handleLiClick',item,index);
			//this.searchCameraListHttp();
			this.$store.state.isMachineShow = false;
			this.getOptions(item.firstGroupCode);
			this.$store.state.machineSecondShow = true;
		},
		handleLiSecondClick(item,index){
			console.log('item',item);
			this.$store.gyData = item;
			this.$store.state.jgldShow = true;
			this.$store.state.centerDialogShow = false;
			sessionStorage.groupCodeSelf = item.groupCode
			this.$router.push('/EnergyDeviceInfoList');
		},
		
		/*拿到二级CODE集合*/
		async getOptions(val){
			let optionArray = {'下料':'01','成型':'02','焊接':'03','热处理':'04','机加':'05','涂装':'06','装配':'07','调试':'08'}
			const res = await getOption('/cameraGroup/getGroup/',optionArray[val]);
			console.log('要看的',res.data.data);
			for(var i=0;i<res.data.data.length;i++){
				this.getVideoServeHttp1(optionArray[val],res.data.data[i].groupCode,res.data.data[i].groupName,res.data.data[i].groupCode)
			}
		},
		
		/*拿到二级摄像头渲染页面数组*/
		async getVideoServeHttp1(firstVal,secondVal,groupName,groupCode){
			const query = {
				 "cameraName": "",//摄像头名称
			     "companyCode": "0303",//子公司编号
			     "factoryCode": "",//厂房
			     "firstGroupCode":firstVal,//一级工艺
			     "orgCode": "",//事业部编号
			     "searchNme": "",
			     "secondGroupCode": secondVal//二级工艺编号
			}
			const res = await getVideoServe(query);
			res.data.data.groupName = groupName;
			res.data.data.groupCode = groupCode;
			this.secondArrList.push(res.data.data);
			console.log('可以作为循环的数组',this.secondArrList);
		},
		
		
		async getVideoServeHttp(){
			let myArr = ['01','02','03','04','05','06','07','08'];
			let firstGroupName = ['下料','成型','焊接','热处理','机加','涂装','装配','调试']
			let ListArray = [];
			for(var i=0;i<myArr.length;i++){
				const query = {
					 "cameraName": "",//摄像头名称
				     "companyCode": "0303",//子公司编号
				     "factoryCode": "",//厂房
				     "firstGroupCode": myArr[i],//一级工艺
				     "orgCode": "",//事业部编号
				     "searchNme": "",
				     "secondGroupCode": ""//二级工艺编号
				}
				const res = await getVideoServe(query);
				const obj = {
					firstGroupCode:firstGroupName[i],
					offlineNum: res.data.data.offlineNum,
				    offlinerate: res.data.data.offlinerate,
				    onlineNum: res.data.data.onlineNum,
				    onlinerate: res.data.data.onlinerate,
				    totalCount: res.data.data.totalCount
				}
				ListArray.push(obj)
			}
			this.ListArray = ListArray
		},
		
		handleSizeChange(){
			
		},
		handleCurrentChange(){
			
		},
		tableRowClassName({row,rowIndex}){
			row.index = rowIndex//把每一行的索引放入row
		},
		selectedHighlight({row,rowIndex}){
			if((this.getIndex===rowIndex)){//如果this.getIndex==当前行索引当前行加高亮背景色
				return{
					"background-color" : "rgba(56, 142, 237, 0.6)"
				}
			}
		},
		handleRowClick(row, event, column) {
			this.getIndex = row.index//将选中行的索引赋值给this.getIndex
		},
    
  },
}
</script>
<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden;
}
  .overview-crafttype{

  }
  .overview-navConItem{
    width:278px;
    height: 261px;
    background-image: url(../images/overview_tabItem-primary.png);
    background-repeat: no-repeat;
    padding: 0 25px;
    float: left;
    margin-left:30px;
    // cursor: pointer;
    .title{
      height: 55px;line-height: 55px;cursor: pointer;
      font-size:16px;padding-left: 20px;padding-right: 10px;padding-top:5px;
      .num{color:#3d88e8;display: inline-block;vertical-align: middle}
      .name{color:#fff;max-width: 140px;display: inline-block;vertical-align: middle}
      .amount{color:#cccccc}
    }
    .content{
      font-size:16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: calc(100% - 55px);
      ul{
        margin-top:-15px;
      }
      li{
        margin-top:10px;
        &:first-child{
          margin-top:0;
        }
      }

      .label{color:#cccccc;width:100px;text-align: right;display: inline-block;}
      .value{color:#02c9fc;margin-left:10px;}
    }
  }
  .overview-navConItem-disable{
    .title{
      cursor: default;
    }
  }
	/deep/ .el-table--scrollable-y .el-table__body-wrapper{
		width:102%;
	}
	/deep/ .el-table__body, .el-table__footer, .el-table__header{
		background:rgba(0,0,0,0);
	}
	/deep/ .el-table--border th.gutter:last-of-type{
		display:none;
	}
</style>

