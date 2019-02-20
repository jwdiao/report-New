<template>
  <div class="index">
    <!-- 头部 start -->
    <div class="index_top">
      <div class="index_imgText">
        <span class="title">车辆门禁管理统计信息</span>
      </div>
      <em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
    </div>
    <div class="index_main">
      <div class="index_left">
        <div class="index_left_top">
          <p class="home_title home_title-blue" style="display: flex;justify-content: space-between"><span>车辆门禁管理结果统计</span><span style="text-align: right;font-family: fontnameRegular;">{{currentDate}}</span></p><!--style="color:#31A0FF;"-->
          <div class="index_left_top_main">
            <div class="index_left_top_main_Cars">
              <div class="index_left_top_main_Cars_module">
                <p><img src="../../assets/images/E1.png" alt="">车辆总数</p>
                <div class="index_left_top_main_Cars_module_num">{{carStatistics.carAllNum}}</div>
              </div>
              <!--<div class="index_left_top_main_Cars_img"><img src="../assets/images/E1.png" alt=""></div>-->
            </div>
            <div class="index_left_top_main_Cars">
              <div class="index_left_top_main_Cars_module">
                <p><img src="../../assets/images/E2.png" alt="">内部车辆</p>
                <div class="index_left_top_main_Cars_module_num">{{carStatistics.carInsideNum}}</div>
              </div>
            </div>
            <div class="index_left_top_main_Cars">
              <div class="index_left_top_main_Cars_module">
                <p><img src="../../assets/images/E3.png" alt="">外部车辆</p>
                <div class="index_left_top_main_Cars_module_num">{{carStatistics.carExternalNum}}</div>
              </div>
            </div>
            <!-- <div class="index_left_top_main_Cars">
               <div class="index_left_top_main_Cars_module">
                 <p><img src="../assets/images/E4.png" alt="">大货车</p>
                 <div class="index_left_top_main_Cars_module_num">{{carStatistics.carLargeNum}}</div>
               </div>
             </div>-->
          </div>
        </div>
        <div class="index_left_bottom">
          <div class="home_title home_title-blue">
            <p>车辆信息列表</p>

          </div>
          <div class="search">
            <el-date-picker
              v-model="valueStart"
              type="date" @change="handleDateStart" value-format="yyyy-MM-dd"
              :picker-options="pickerOptionsStart"
              placeholder="选择开始日期">
            </el-date-picker>
            <el-date-picker
              v-model="valueEnd" style="margin-left: 20px;"
              type="date" @change="handleDateEnd" value-format="yyyy-MM-dd"
              :picker-options="pickerOptionsEnd"
              placeholder="选择结束日期">
            </el-date-picker>
            <el-select  class="module" v-model="innerOrOuterCars" @change="innerOrOuterFn" clearable @clear="clearAll" placeholder="内部外部车辆">
              <el-option
                v-for="item in innerOrOuterArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label class="module">
              <input type="text" class="search-num" ref="inputCarNum" @focus="handlefocus" @blur="handleblur" @input="inputIsVal1" placeholder="请输入车牌号" value="">
              <i v-show="isRm1" data-index="1" @click="clearVal"></i>
            </label>
            <label class="module is-out">
              <el-select v-model="selectCarType" @change="carArrTypeFn" clearable placeholder="选择车辆类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </label>
            <label class="module is-out">
              <template>
                <el-select v-model="isOutStatus"  clearable placeholder="车辆是否离开"><!--@change="isOutStatusFn"-->
                  <el-option
                    v-for="item in carType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </label>
            <button class="search-btn" @click="gerSearchCarData">查找车辆</button>
          </div>
          <div class="title"><span>序号</span><span>车牌号</span><span>内部/外部</span><span>车辆类型</span><span>进入时间</span><span>离开时间</span><span>车主姓名</span></div>
          <div class="index_left_bottom_main">
            <el-scrollbar class="message" style="overflow-x: hidden;">
              <div class="title_message" v-for="(item,index) in carArr" :key="index">
                <span style="color:#fff03e;">{{(index+1)+(currentPage-1)*pageSize}}</span>
                <span>{{item.cCode}}</span>
                <span>{{item.memo}}</span>
                <span class="typeCar" :data-car-type = "item.plateTypeName">{{item.plateTypeName}}</span>
                <span>{{item.inDT}}</span>
                <span>{{item.outDT == null ? '未离开' : item.outDT}}</span>
                <span>{{item.customerName}}</span>
              </div>
            </el-scrollbar>
          </div>

          <!--<div class="title_message" style="background-color: #2b82d3;">
            <el-table
              :data="carArr"
              stripe
              size="mini"
              style="width: 100%" height="500" background="red">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="cCode"
                label="车牌号"
                width="140">
              </el-table-column>
              <el-table-column
                prop="memo"
                label="内部/外部"
                width="160">
              </el-table-column>
              <el-table-column
                prop="plateTypeName"
                label="车辆类型">
              </el-table-column>
              <el-table-column
                prop="inDT"
                label="进入时间">
              </el-table-column>
              <el-table-column
                prop="outDT"
                label="离开时间">
              </el-table-column>
              <el-table-column
                prop="customerName"
                label="车主姓名">
              </el-table-column>
            </el-table>
          </div>-->

          <template>
            <div class="block" style="text-align: center;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="carTotal">
              </el-pagination>
            </div>
          </template>
        </div>
      </div>
      <div class="index_right">
        <CarsManage/>
      </div>
    </div>
  </div>
</template>

<script>
  import CarsManage from '../../components/CarsManage'
  import echarts from 'echarts'
  import moment from 'moment'
  import $ from 'jquery'
  import http from '../../api/http'
  import BScroll from 'better-scroll'
  import {reqUserInfo,reqCarData}from'../../api'

  export default {
    name: 'cars',
    components: {
      CarsManage,
    },
    data() {
      return {
        carArr : [],
        timerId: '',        // 定时器
        timerIdHour: '',    // 中间小时的定时器
        currentTime: '',    // 系统当前时间
        currentDate: '',    // 系统当前日期
        valueStart: '',     //开始日期选择器的value
        valueEnd: '',       //结束日期选择器的value
        selectCarType:'',   //选择车辆类型
        innerOrOuterCars:'',//选择内部或外部车辆
        inputLabel:'',      //input车牌号码
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        pickerOptionsEnd:{
          disabledDate:(time) =>{
            return time.getTime() < new Date(this.valueStart).getTime() - 3600*1000*24 || time.getTime() > Date.now();
          }
        },
        innerOrOuterCarsHttp:'',
        innerOrOuterArr:[
          {
            value:'001',
            label:'内部车辆'
          },{
            value:'002',
            label:'外部车辆'
          }
        ],
        options:[
          {
            value:'01',
            label:'黄牌大型车'
          },{
            value:'02',
            label:'蓝牌小型车'
          },{
            value:'03',
            label:'白牌军用车'
          },{
            value:'04',
            label:'绿牌电动车'
          }
        ],
        //分页
        dataCount: 0,  //初始化信息条数
        pageSize: 20,//每页显示条数
        page:1, //当前页码
        historyData:[],
        isRm1: false,
        isRm2: false,
        currentPage: 1,
        carTotal: 0,
        carStatistics: {
          carAllNum: 0,
          carInsideNum: 0,
          carExternalNum: 0,
          carLargeNum: 0
        },
        carType: [{
          value: '',
          label: '全部'
        },{
          value: '1',
          label: '离开车辆'
        }, {
          value: '0',
          label: '未离开车辆'
        }],
        isOutStatus: '',
      }
    },
    created() {

      this.carData()
      this.setDefaultDate()
      this.carListData(this.valueStart,this.valueEnd, '','','','')
      setInterval(() => {
        this.carData()
      }, 300000)
    },
    mounted() {
      // 顶部日期时间
      this.currentTime = this.getCurrentDateTime();
      this.currentDate = this.getCurrentDate();
      setInterval(() => {
        this.currentTime = this.getCurrentDateTime();
      }, 1000)
    },
    methods: {
      async carListData (startDate,endDate,cCode,carType,carBelong,isOutStatus,page,pageSize) {
        if(isOutStatus === '离开车辆')  isOutStatus == '1';
        if(isOutStatus == '未离开车辆') isOutStatus == '0';
        if(isOutStatus == '全部') isOutStatus == '';
        // const res = await http.post('/carPlater/getSanyCarDataList',{'ccode': cCode, 'cartype': carType, page: page + '', pagesize: pageSize + '', isoutstatus: isOutStatus});
        const res = await reqUserInfo(startDate,endDate,cCode,carType,carBelong,isOutStatus,page,pageSize)//page,pageSize
        if (res && res.status == 200 && res.data.ret === "200") {
          console.log('res:',res)
          var carArrss = res.data.list;
          this.carTotal = res.data.total;
          for (var i = 0; i < carArrss.length; i++) {
            if(carArrss[i].memo !== '内部车辆' && carArrss[i].memo !== '外部车辆'){
              carArrss[i].memo = '外部车辆'
            }else if(carArrss[i].customerName === null){
              carArrss[i].customerName = '未记录'
            }else if(carArrss[i].inDT === null){
              carArrss[i].inDT = '未找到入场记录'
            }
          }
          this.carArr = carArrss
        }
      },
      async carData () {
        // const res = await http.get('/carPlater/getCarData');
        const res = await reqCarData()
        if (res && res.status == 200 && res.data.ret === "200") {
          this.carStatistics = res.data.data;
        }
      },
      /*函数名：carArrTypeFn
      参数：val:value值
      描述：下拉选项选取对应的车辆类型
    * */
      carArrTypeFn(val){
        let obj = {};
        obj = this.options.find((item)=>{
          return item.value === val;
        });
        this.selectCarType = obj.label
      },
      /*函数名：isOutStatusFn
         参数：val:value值
         描述：下拉选项选取是否离开车辆状态
       * */
      /*isOutStatusFn(){
        /!*const val = event.target.options[event.target.selectedIndex].value;
        this.isOutStatus = val;
        if(val === ''){
          this.carListData('', '', this.currentPage, this.pageSize, this.isOutStatus);
        }*!/
        if(this.isOutStatus === ''){
          this.carListData('', '', this.currentPage, this.pageSize, this.isOutStatus);
        }
      },*/
      /*函数名：handleDateStart
       参数：val:value值
       描述：从开始日期选项中选择对应的日期
     * */
      handleDateStart(val){
        this.valueStart = val
      },
      /*函数名：handleDateEnd
       参数：val:value值
       描述：从结束日期选项中选择对应的日期
     * */
      handleDateEnd(val){
        this.valueEnd = val
      },
      /*函数名：setDefaultDate
        参数：
        描述：设置默认日期
      * */
      setDefaultDate(){
        const hour = (new Date()).getHours();
        const month = new Date().getMonth() - 0 + 1 < 10 ? '0' + (new Date().getMonth() - 0 + 1) : new Date().getMonth() - 0 + 1,
          days = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
          hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours(),
          seconds = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds(),
          minutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        this.valueStart =this.valueEnd = new Date().getFullYear() +'-'+ month +'-'+ days;
      },
      /*函数名：innerOrOuterFn
        参数：val
        描述：选择内部或外部车辆
      * */
      innerOrOuterFn(val){
        let obj = {};
        obj = this.innerOrOuterArr.find((item)=>{
          return item.value === val;
        });
        this.innerOrOuterCars = obj.label
        this.innerOrOuterCarsHttp = obj.label.substring(0,2)
      },
      /*函数名：clearAll
        参数：val
        描述：清空选择内部或外部车辆
      * */
      clearAll(){
        this.innerOrOuterCarsHttp = ""
      },
      /*函数名：gerSearchCarData
        参数：无
        描述：车辆搜索
      * */
      gerSearchCarData(){
        this.currentPage = 1
        this.carListData(this.valueStart,this.valueEnd,this.inputLabel,this.selectCarType,this.innerOrOuterCarsHttp,this.isOutStatus,this.currentPage,this.pageSize);
      },
      /*函数名：inputIsVal1
       参数：无
       描述：动态获取input的值
     * */
      inputIsVal1(){
        event.target.value.length ? this.isRm1 = true :  this.isRm1 = false;
        this.inputLabel = event.target.value
      },
      /*函数名：clearVal
       参数：无
       描述：清空车牌号逻辑
     * */
      clearVal(){
        this.inputLabel = ''
        event.target.previousSibling.value = '';
        this.isRm1 = false;
        this.currentPage = 1
        this.carListData(this.valueStart,this.valueEnd,this.inputLabel,this.selectCarType,this.innerOrOuterCarsHttp,this.isOutStatus,this.currentPage,this.pageSize);
      },
      enterIndexPage(path) {
        // 路径从state中获取
        this.$router.replace(path)
      },
      /*函数名：handlefocus,handleblur
        参数：无
        描述：input输入车牌号聚焦与失焦样式
      * */
      handlefocus(){
        this.$refs.inputCarNum.style.backgroundColor = 'rgba(44, 149, 240, 0.3)'
      },
      handleblur(){
        this.$refs.inputCarNum.style.background = ''
      },
      // 时间格式化
      getCurrentDateTime() {
        return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      },
      // 日期格式化
      getCurrentDate() {
        return moment(new Date()).format('YYYY-MM-DD')
      },
      /*函数名：handleSizeChange
       参数：val:value值
       描述：分页
       * */
      handleSizeChange(val) {
        this.pageSize = val;
        this.carListData(this.valueStart,this.valueEnd,this.inputLabel,this.selectCarType,this.innerOrOuterCarsHttp,this.isOutStatus,this.currentPage,this.pageSize);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.carListData(this.valueStart,this.valueEnd,this.inputLabel,this.selectCarType,this.innerOrOuterCarsHttp,this.isOutStatus,val,this.pageSize);
      },
      destroyed() {
        // clearInterval(this.timerId)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .index{
    height:100%;
    background-image: url(../../assets/images/index_bg.png);
    background-size: cover;
    color: rgb(255, 255, 255);
    background-repeat: no-repeat;
    overflow: hidden;
    font-size: 13px;
    &_top{
      text-align: center;
      position: fixed;
      top: 12px;
      left: 2.5%;
      right: 2.5%;
      height: 70px;
      padding-top: 20px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /*background: url(../assets/images/body_title.png) no-repeat center center;*/
      background-size: auto 100%;
      img{display:inline-block;vertical-align: middle;width:50px;}
      .title{font-size: 0.44rem;
        color:#fff;font-weight:bold;}
      .time{
        width: 285px;
        font-size:0.32rem;
        color:#ababab;
        display: inline-block;
        vertical-align: middle;
        position: fixed;
        top:65px;
        right:20px;
        z-index: 10;
        text-align: left;
        font-family: fontnameUnidreamLED;
      }
			.button {
				width: 90px;
				height: 40px;
				background: url(../../assets/images/index_back.png) no-repeat;
				position:fixed;
				top:60px;
				left:40px;
				cursor:pointer;
			}

    }
    &_main{
      position: fixed;
      top:110px;
      left: 2.5%;
      right: 2.5%;
      bottom:15px;
      // border-top:1px solid red;
    }
    /*6s页面左侧盒子*/
    &_left{
      width: 65%;float: left;height:100%;padding-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      /*6s页面左侧上部*/
      &_top{
        flex: 2;
        width:100%;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        .home_title{
          padding-left: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 32px;
          line-height: 32px;
        }
        &_main{
          height: calc(100% - 47px);
          display: flex;
          margin: 15px auto 0 ;

          &_Cars{
            width: calc((100% - 45px)/3 );
            height: 100%;
            /*min-height: 90px;*/
            background: rgba(39,69,111,0.3);
            margin-right: 15px;
            &_module {
              width: 100%;
              height: 100%;
              padding: 15px 0;
              color: #fff;
              /*border: 1px solid #fff;*/
              &_num {
                text-align: center;
                line-height: 38px;
                font-size: 38px;
                font-family: fontnameRegular;
              }
              & > p {
                width: 100%;
                text-align: center;
                height: 30px;
                line-height: 30px;
                font-weight: 300;
                font-size: 24px;
                overflow: hidden;
                img {
                  vertical-align: middle;
                  width: 25px;
                  height: auto;
                  margin-right: 10px;
                  padding-bottom: 5px;
                }
              }
            }
            &_img {
              width: 100%;
              height: 53%;
              padding: 0;
              margin: 0;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              background: url("../../assets/images/cars_bg.png") no-repeat;
              background-position: center 90%;
              background-size: 90% 40%;
              img{
                width: 65%;
                margin-top: 2%;
              }
            }
          }
          &_Cars:nth-child(1){
            color: #02BBFE;
          }
          &_Cars:nth-child(2){
            color: #49E664;
          }
          &_Cars:nth-child(3){
            color: #FF3566;
          }
          &_Cars:nth-child(4){
            color: #FBD603;
            margin-right: 0;
          }
        }
        /*background-color: #eee;*/
      }
      /*cars页面左侧下部*/
      &_bottom{
        flex: 8;
        width:100%;
        overflow:hidden;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        /deep/ .el-table_1_column_1{
          color: #fff03e;
        }
        .pagesInfo{
          text-align: center;
        }
        .home_title{
          height: 32px;
          line-height: 32px;
          padding-left: 24px;
          font-weight: bold;
          font-size: 21px;
          p{
            display: inline-block;
            float: left;
          }

        }
        .search{
          width: 100%;
          /*float: right;*/
          margin-top: -5px;
          text-align: right;
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
              font-size: 14px;
              color: #2f96ef;
              line-height: 30px;
              text-indent: 1em;
              outline: #2f96ef;
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
              right: 4px;
              background: url("../../assets/images/rmReach.png") no-repeat center;
              background-size: 60% auto;
              cursor: pointer;
            }
          }
          .is-out{
            font-size: 13px;
            font-weight: 400;
            line-height: 32px;
            position: relative;
            select{
              width: 100%;
              height: 29px;
              border-radius: 3px;
              /*border: 1px solid rgba(89, 154, 229, 0.55);
              background-color: rgba(89, 154, 229, 0.1);
              color: #fff;*/
              font-size: 12px;
              option:last-child{
                border-bottom-right-radius: 3px;
                border-bottom-left-radius: 3px;
              }
            }
          }
          .search-btn {
            width: 70px;
            height: 30px;
            line-height: 22px;
            background-color: #2a6fbf;
            font-size: 12.5px;
            color: #fff;
            text-align: center;
            border-radius: 3px;
            border: 1px solid #2d6fbf;
            margin-left: 20px;
            cursor: pointer;
            &:hover{
              background-color: rgba(42,111,191,0.8);
            }
            &:active{
              background-color: rgba(42,111,191,0.6);
            }
          }

        }
        .title{
          width: 100%;
          color:white;
          height:22px;
          margin-top: 5px;
          padding: 0 3%;
          span{
            display:inline-block;
            width:14.2%;
            height:22px;
            box-sizing:border-box;
            line-height:22px;
            font-size: 16px;
            text-align: center;
          }
          span:nth-child(1){
            width:4%;
          }
          span:nth-child(5), span:nth-child(6){
            width:18%;
          }
        }
        &_main{
          height: calc(90% - 50px);
          overflow: hidden;
          .message{
            width:100%;
            height: 100%;
            margin-top: 5px;
            padding-bottom: 15px;
            overflow: hidden;
            /deep/ .el-scrollbar__wrap {
              overflow-x: hidden;
            }
            .title_message{
              width: 100%;
              height: 30px;
              line-height: 30px;
              margin-bottom: 2px;
              padding: 0 3%;
              overflow: hidden;
              color:#80dcf5;    /*#fff03e*/
              background:rgba(56,142,237,0.2);
              span{
                display:inline-block;
                width: 14%;
                height: auto;
                font-size: 14px;
                box-sizing:border-box;
                line-height:25px;
                text-align: center;
                user-select: auto;
              }
              span:nth-child(1){
                width:4%;
              }
              span:nth-child(2){
                width:15%;
              }
              span:nth-child(5), span:nth-child(6){
                width:18%;
              }
              /*span:nth-child(2), span:nth-child(3) {
                width:17%;
              }*/
            }
            .title_message:hover{
              background:rgba(56,142,237,0.6);
            }
          }
        }
          /deep/ span.el-pagination__total {
          color:#2b82d3;
        }
        /deep/ input.el-input__inner{
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
        /deep/ .el-pagination .btn-next, .el-pagination .btn-prev {
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
        /deep/ .el-date-editor{
          width: 176px;
        }
        /deep/ .el-picker-panel{
          background:rgb(19, 44, 83)!important;
        }
        /deep/.el-range-editor{
          background-color:#285e8c!important;
        }
      }
    }
    /*cars页面右侧盒子*/
    &_right{
      width: 35%;float: left;height:100%;
    }
    /deep/ .el-range-input {
      background-color:rgb(19, 44, 83)!important;
      color: #2F96EF!important;
    }
  }
</style>
