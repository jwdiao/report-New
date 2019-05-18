<template>
<div style="height:100%" ref="tableBox" id="tableBox">
	<el-scrollbar style="height:90%;" v-show="machineShow">
	  <ul class="clear overview-crafttype" >
	    <li
	      v-for="(item, index) in list" :key="index"
				@click="handleLiClick(item,index)"
	      :class="`overview-navConItem ${item.totalNum?'':'overview-navConItem-disable'}`"
	    >
			  <!--@click="handleClick(item)"-->
	      <div class="clear title" >
	        <div class="left">
	          <em class="num">{{index+1}}.</em>
	          <span class="ellipsis name">{{item.workCenterName}}</span>
	        </div>
	        <div class="right amount">{{item.totalNum}}台</div>
	      </div>
	      <div class="content">
	        <ul>
	          <li>
	            <span class="label">开机率</span>
	            <span class="value">{{item.kaijiLv}}%</span>
	          </li>
	          <li>
	            <span class="label">作业率</span>
	            <span class="value">{{item.zuoyeLv}}%</span>
	          </li>
	          <li>
	            <span class="label">故障率</span>
	            <span class="value">{{item.alarmLv}}%</span>
	          </li>
	          <li>
	            <span class="label">利用率</span>
	            <span class="value">{{item.liyongLv}}%</span>
	          </li>
	          <li>
	            <span class="label">总耗电量</span>
	            <span class="value">{{item.elcPower}} kw•h</span>
	          </li>
	        </ul>
	      </div>
	    </li>
	  </ul>
		
	</el-scrollbar>
	<div class="common_table" v-show="!machineShow">
		<template>
			<el-table :data="cameraList" border style="width: 100%"
			:height="tableHeight"
			@row-click="handleRowClick"
			:row-class-name="tableRowClassName"
			:row-style="selectedHighlight"
			ref="spuProfileTable"
			row-key="kid"
			>
				<el-table-column prop="num" label="序号" width="100">
				</el-table-column>
				<el-table-column prop="firstGroupName" label="工艺" width="100">
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
		<div class="common_paginaton" v-show="pageShow" style="margin-top:10px;">
			<template>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
				 :page-sizes="[10,18, 30, 40, 50,60]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="tableTotal"
				 style="height:100%;">
				</el-pagination>
			</template>
		</div>
	</div>
	
</div>
</template>
<script>
import moment from 'moment'
import {
  reqCountDeviceMain, searchCameraList
} from '../../../api/deviceVideoManageApi'
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
		}
  },
  watch: {
    companyCodeStr(newvalue) {
      // console.log('craftType code:',newvalue)
      this.getCraftTypeData()
    },
		machineShow(newvalue){
			console.log(newvalue)
		}
  },
	created(){
		console.log(this.$refs.tableBox)
		
	},
  mounted() {
		//
		//this.tableHeight = 200
		//console.log(this.$refs.tableBox)
		
    this.currentTime = moment(new Date()).format('YYYY-MM-DD');
	  
    if(this.companyCodeStr) { // 页面切换tab时，this.companyCodeStr=''
       this.getCraftTypeData()
    }
		window.addEventListener('resize', this.handleResize);
  },
  methods: {
		handleResize(){
			this.$store.state.tableHeight = this.$refs.tableBox.offsetHeight-70
		},
		handleLiClick(item,index){
			//console.log(item,index)
			this.$store.state.tableHeight = this.$refs.tableBox.offsetHeight-70
			this.$emit('handleLiClick',item,index);
			this.searchCameraListHttp();
			this.$store.state.isMachineShow = false;
		},
		async searchCameraListHttp(){
			const res = await searchCameraList('','','','','01','','',0,18);
			this.cameraList = res.data.data.list
			console.log(this.cameraList)
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
    async getCraftTypeData() {
      this.companyCode = JSON.parse(this.companyCodeStr).value
      this.list = [];
      const res = await reqCountDeviceMain(this.companyCode,'','02',this.currentTime) //
      // const res = await reqCountDeviceMain('0301','','02') //
      if(res&&res.data.code===200&&res.data.data.length){
        const resList = res.data.data
        const newList = resList.forEach(item => {

          // debugger;
          const runTime = item.runTime == null ? 0 : item.runTime // 作业时间
          const idleTime = item.idleTime == null ? 0 : item.idleTime // 空闲时间（待机时间）
          const naturalTime = item.naturalTime == null ? 0 : item.naturalTime // 自然时间
          const alarmNum = item.alarmNum == null ? 0 : item.alarmNum // 故障数
          const totalNum = item.totalNum == null ? 0 : item.totalNum // 总数
          const elcPower = item.elcPower == null ? 0 : item.elcPower // 总耗电量

          let kaijiTime = runTime + idleTime; // 开机时间（作业时间+空闲时间）
          // let kaijiLv = kaijiTime / naturalTime; // 开机率（开机时间/自然时间）
          // let zuoyeLv = runTime / kaijiTime // 作业率（作业时间/开机时间）
          // let alarmLv = alarmNum / totalNum // 故障率（故障数/总数）
          // let liyongLv = kaijiLv / zuoyeLv // 利用率（开机率/作业率）

          let kaijiLv = 0; // 开机率（开机时间/自然时间）
          if (kaijiTime == 0) {
            kaijiLv = 0;
          } else {
            kaijiLv = (kaijiTime / naturalTime *100).toFixed(2); // 开机率（开机时间/自然时间）
          }

          let zuoyeLv = 0; // 作业率（作业时间/开机时间）
          if (runTime == 0) {
            zuoyeLv = 0;
          } else {
            zuoyeLv = (runTime / kaijiTime *100).toFixed(2) // 作业率（作业时间/开机时间）
          }

          // 故障率
          let alarmLv = 0;
          if (alarmNum == 0) {
            alarmLv = 0;
          } else {
            alarmLv = (alarmNum / totalNum *100).toFixed(2) // 故障率（故障数/总数）
          }

          // 利用率
          let liyongLv = 0
          if (kaijiLv == 0) {
            liyongLv = 0
          } else {
            liyongLv = ((kaijiLv/100 * zuoyeLv/100)*100).toFixed(2) // 利用率（开机率/作业率）
          }

          let workCenterName = '';
          if (item.firstGroupCode === '01') {
            workCenterName = '下料'
          } else if (item.firstGroupCode === '02') {
            workCenterName = '成型'
          } else if (item.firstGroupCode === '03') {
            workCenterName = '焊接'
          } else if (item.firstGroupCode === '04') {
            workCenterName = '热处理'
          } else if (item.firstGroupCode === '05') {
            workCenterName = '机加'
          } else if (item.firstGroupCode === '06') {
            workCenterName = '涂装'
          } else if (item.firstGroupCode === '07') {
            workCenterName = '装配'
          } else if (item.firstGroupCode === '08') {
            workCenterName = '调试'
          }


          // let totalNum =
          let obj = {
            firstGroupCode: item.firstGroupCode,
            workCenterName,
            totalNum,
            kaijiLv,
            zuoyeLv,
            alarmLv,
            liyongLv,
            elcPower
          }
          // 开机率
          this.list.push(obj)

        })
      }
    },
   /* handleClick(item) {
      if (!item.totalNum) {
        return;
      }
      const deviceHomeObj = {type: '01',typeCode: item.firstGroupCode} // 类型 01 工艺，02 加工中心
      localStorage.setItem('sbhl-DeviceHome-Param',JSON.stringify(deviceHomeObj))

      this.$router.push('/DeviceHome')

    } */
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

