<template>
<el-scrollbar style="height:100%;">
  <ul class="clear overview-crafttype" v-show="departmentShow">
    <li
      v-for="(item, index) in departmentList" :key="index"
			@click="handleClick(item,index)"
      :class="`overview-navConItem ${item.totalNum?'':'overview-navConItem-disable'}`"
    >
		  <!--@click="handleClick(item)"-->
      <div class="clear title" >
        <div class="left">
          <em class="num">{{index+1}}.</em>
          <span class="ellipsis name">重机事业部</span>
        </div>
       <!-- <div class="right amount">{{item.totalCount}}台</div> -->
      </div>
      <div class="content">
        <ul>
		  <li>
			  <span class="label">总数</span>
			  <span class="value">{{item.totalCount}}台</span>
		  </li>
          <li>
            <span class="label">在线率</span>
            <span class="value">{{item.onlinerate}}%</span>
          </li>
          <li>
            <span class="label">在线数</span>
            <span class="value">{{item.offlineNum}}</span>
          </li>
          <li>
            <span class="label">离线率</span>
            <span class="value">{{item.onlinerate}}%</span>
          </li>
          <li>
            <span class="label">离线数</span>
            <span class="value">{{item.onlineNum}}</span>
          </li>
          
        </ul>
      </div>
    </li>
  </ul>
  <ul class="clear overview-crafttype" v-show="departmentSecondShow">
    <li
      v-for="(item, index) in departmentSecondList" :key="index"
  			@click="handleClickSecond(item,index)"
      :class="`overview-navConItem ${item.totalNum?'':'overview-navConItem-disable'}`"
    >
  		  <!--@click="handleClick(item)"-->
      <div class="clear title" >
        <div class="left">
          <em class="num">{{index+1}}.</em>
          <span class="ellipsis name">北京装机</span>
        </div>
       <!-- <div class="right amount">{{item.totalCount}}台</div> -->
      </div>
      <div class="content">
        <ul>
  		  <li>
  			  <span class="label">总数</span>
  			  <span class="value">{{item.totalCount}}台</span>
  		  </li>
          <li>
            <span class="label">在线率</span>
            <span class="value">{{item.onlinerate}}%</span>
          </li>
          <li>
            <span class="label">在线数</span>
            <span class="value">{{item.offlineNum}}</span>
          </li>
          <li>
            <span class="label">离线率</span>
            <span class="value">{{item.onlinerate}}%</span>
          </li>
          <li>
            <span class="label">离线数</span>
            <span class="value">{{item.onlineNum}}</span>
          </li>
          
        </ul>
      </div>
    </li>
  </ul>
</el-scrollbar>
</template>
<script>
import moment from 'moment'
import {
  getVideoServe
} from '../../../api/deviceVideoManageApi'
export default {
  name: 'WorkCenter',
  data() {
    return{
      currentTime: '', // 系统当前日期
      list: [],
      companyCode: '',
	  departmentList:[],
	  departmentSecondList:[],
    }
  },
  computed: {
    departmentShow(){
		return this.$store.state.departmentShow
	},
	departmentSecondShow(){
		return this.$store.state.departmentSecondShow
	}
  },
  watch: {
    
  },
  mounted() {
    this.currentTime = moment(new Date()).format('YYYY-MM-DD');
	
    this.departmentHttp();
	
  },
  methods: {
	handleClick(item,index){
		//this.$emit('handleClick',item,index)
		console.log(111);
		this.secondDepartmentHttp();
		this.$store.state.departmentShow = false;
		this.$store.state.departmentSecondShow = true;
	},
	handleClickSecond(item , index){
		console.log(222);
		this.$store.state.gyData = {};
		this.$store.state.centerDialogShow = true;
		this.$store.state.jgldShow = false;
		sessionStorage.groupCodeSelf = '';//如果从事业部跳入则将groupCode的值置为空
		this.$router.push('/EnergyDeviceInfoList');
	},
	async departmentHttp(){
		const query = {
			 "cameraName": "",//摄像头名称
		     "companyCode": "",//子公司编号
		     "factoryCode": "",//厂房
		     "firstGroupCode":"",//一级工艺
		     "orgCode": "03",//事业部编号
		     "searchNme": "",
		     "secondGroupCode":""//二级工艺编号
		}
		const res = await getVideoServe(query);
		this.departmentList.push(res.data.data);
		console.log('事业部的数据',this.departmentList);
	},
	async secondDepartmentHttp(){
		const query = {
			 "cameraName": "",//摄像头名称
		     "companyCode": "0303",//子公司编号
		     "factoryCode": "",//厂房
		     "firstGroupCode":"",//一级工艺
		     "orgCode": "03",//事业部编号
		     "searchNme": "",
		     "secondGroupCode":""//二级工艺编号
		}
		const res = await getVideoServe(query);
		this.departmentSecondList.push(res.data.data)
		console.log('sds',this.departmentSecondList)
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
</style>

