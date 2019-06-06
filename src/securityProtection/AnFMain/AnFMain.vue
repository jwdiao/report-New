<template>
  <div class="index">
    <!-- 头部 start -->
    <div class="index_top">
      <div class="index_imgText">
        <span class="title" style="cursor:pointer;">安防周界统计报表</span>
      </div>
      <em class="time" v-text="currentTime"></em>
			<div class="button"></div>  <!--@click="enterIndexPage('/HomeGuide')"--><!--返回按钮-->
    </div>
    <div class="index_main">
      <div class="index_left">
        <!--左上园区图-->
        <div class="index_left_top" >
          <p class="totalNum">总数量 <em>1000</em></p>
          <div id="boxImg" style="overflow: hidden;height: 100%;">
            <img class="anfImage" id="anfImg" src="../images/anfang_bg.png" @mousedown="moveImg" alt="">
          </div>
        </div>
        <!--左下列表-->
        <div class="index_left_bottom">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column prop="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="eventOrigin" label="事件源" width="180"></el-table-column>
            <el-table-column prop="eventType" label="事件类型" width="180"></el-table-column>
            <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
            <el-table-column prop="logContent" label="日志内容"></el-table-column>
            <el-table-column prop="cameraInfo" label="抓拍及联动信息">
              <template slot-scope="scope">
                <el-button size="mini" type="text"
                           @click="handleLookInfo(scope.$index, scope.row)">查看联动</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            background
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>

      </div>
      <div class="index_right">
        <AnFManage/>
      </div>
    </div>
  </div>
</template>
<script>
  import AnFManage from '../Echarts/AnFEcharts.vue'
  import echarts from 'echarts'
  import moment from 'moment'
  import $ from 'jquery'
  import http from '../../api/http'
  import BScroll from 'better-scroll'
  import {
    reqUserInfo,
    reqCarData,
    reqCarEchartsList,
    reqRightForm,
    reqLeftCarsData,
    reqHLGCarsData,
    reqCenterThreeTimesCarsData,
    reqThreeTimesEchartsData,
    reqAllSearchData
  }from'../../api'

  export default {
    name: 'cars',
    components: {
      AnFManage,
    },
    data() {
      return {
        currentTime: '',    // 系统当前时间
        currentDate: '',    // 系统当前日期
        //分页
        pageSize: 10,//每页显示条数
        page:1, //当前页码
        currentPage: 1,
        totalNum:0,
        offX:0,
        offY:0,
        imageDiv:null,//获取图片img
        boxImg:null,//获取外包图片img
        tableData: [{
          index:'1',
          eventOrigin: '鹰眼全景',
          eventType: '区域入侵',
          startTime: '2016-05-02 09:00',
          endTime: '2016-05-02 17:00',
          logContent: '安全检查',
        }, {
          index:'2',
          eventOrigin: '鹰眼全景',
          eventType: '区域入侵',
          startTime: '2016-05-02 09:00',
          endTime: '2016-05-02 17:00',
          logContent: '安全检查',
        }],
      }
    },
    created() {},
    mounted() {
      // 顶部日期时间
      this.currentTime = this.getCurrentDateTime();
      this.currentDate = this.getCurrentDate();
      setInterval(() => {
        this.currentTime = this.getCurrentDateTime();
      }, 1000)
      // 给window对象绑定resize事件
       window.addEventListener('resize',this.handleResize)
      // this.imageDiv = this.$refs.anfImg
      this.imageDiv = document.getElementById('anfImg')
      this.boxImg = document.getElementById('boxImg')
      console.log('this.imageDiv:', typeof this.imageDiv)
    },
    methods: {

      enterIndexPage(path) {
        // 路径从state中获取
        this.$router.replace(path)
      },
      // 时间格式化
      getCurrentDateTime() {
        return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      },
      // 日期格式化
      getCurrentDate() {
        return moment(new Date()).format('YYYY-MM-DD')
      },
      //左上部分拖动图片逻辑
      moveImg(ev){
        // var divBox = this.$refs.divBox
        ev.preventDefault()
        var oevent = ev||event
        var distanceX = oevent.clientX
        var distanceY = oevent.clientY
        document.onmousemove =  (ev) => {
          var oevent = ev||event
          var x1 = oevent.clientX - distanceX
          var y1 = oevent.clientY - distanceY
          distanceX= oevent.clientX  //更新位置
          distanceY= oevent.clientY
          this.imageDiv.style.marginLeft = (x1 + this.offX) + 'px'
          this.imageDiv.style.marginTop = (y1 + this.offY) + 'px'
          this.offX = x1 + this.offX
          this.offY = y1 + this.offY
          //范围限定
          if(this.offX>0){this.offX=0 }
          if(this.offY>0){this.offY=0 }
          var anfWidth = this.imageDiv.offsetWidth
          var anfHeight = this.imageDiv.offsetHeight
          var boxWidth = this.boxImg.offsetWidth
          var boxHeight = this.boxImg.offsetHeight
          var w = anfWidth - boxWidth
          var h = anfHeight - boxHeight
          if(Math.abs(this.offX)>w){
            this.offX = -w
          }
          if(Math.abs(this.offY)>h){
            this.offY = -h
          }
        }
        document.onmouseup = function () {
          document.onmousemove = null
        }
      },
      //点击查看联动信息
      handleLookInfo(row,index){
        console.log('点击查看联动信息000000000')
      },
      //分页
      handleSizeChange(){},
      handleCurrentChange(){},
    }
  }
</script>
<style lang="scss" scoped>
  .index{
    height:100%;
    background-image: url(../../assets/images/index_bg0522.png);
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
      /*padding-top: 20px;*/
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /*background: url(../assets/images/body_title.png) no-repeat center center;*/
      background-size: auto 100%;
      img{display:inline-block;vertical-align: middle;width:50px;}
      .title{font-size: 0.32rem;
        color:#fff;font-weight:bold;}
      .time{
        width: 285px;
        font-size:0.32rem;
        color:#ababab;
        display: inline-block;
        vertical-align: middle;
        position: fixed;
        top:28px;
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
				top:28px;
				left:40px;
				cursor:pointer;
			}
      .historyBtn{
        font-size:16px;width:100px;height:36px;line-height: 36px;
        margin-top: 20px;margin-left:10px;cursor: pointer;
        background:linear-gradient(#176275,#06437d);border-radius: 3px;
        position:fixed;
        top:10px;
        left:150px;
      }
    }
    &_main{
      position: fixed;
      top:60px;
      left: 1%;
      right: 0.5%;
      bottom:15px;
      // border-top:1px solid red;
    }
    /*页面左侧盒子*/
    &_left{
      width: 74%;float: left;height:100%;padding-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      /*页面左侧上部*/
      &_top {
        width: 100%;
        height: 400px;
        background: rgba(39, 69, 111, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 15px;
        padding: 15px;
        overflow: hidden;
        .totalNum{
          color: #fff;font-size: 0.18rem;
          em{
            color: #00c7fa;font-size: 0.24rem;
          }
        }
      }
      &_bottom{
        height: calc(100% - 400px);
        display: flex;flex-direction: column;
        width:100%;
        overflow:hidden;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        /deep/ .el-table{
          background: rgba(39,69,111,0.3);
          color: #00c7fa;font-size: 0.14rem;
        }
        /deep/ .el-table th{
          background: rgba(39,69,111,0.001);
          color: #fff;
        }
        /deep/ .el-table tr{
          background: rgba(39,69,111,0.001);
        }
        /deep/ .el-table tr>td:nth-child(1){
          color: #ffea00;
        }
        /deep/ .el-table tr>td:nth-child(7)>div>button{
          color: #31cd70;
        }
        /deep/ .el-table .el-table__body tr:hover>td{
          background-color: rgba(0,199,250,0.4) !important;
        }
        /deep/ .el-table thead{
          color: #fff;
        }
        /deep/ .el-table__header th{
          background: rgba(39,69,111,0.001);
        }
        /deep/ .el-table td{
          border-bottom: 2px solid #132644;
          background: rgba(39,69,111,0.001);
        }
        /deep/ .el-table th.is-leaf{
          border-bottom: 2px solid #132644;
          background: rgba(39,69,111,0.001);
        }
        /deep/ .el-table--border::after{
          content: '';
          position: absolute;
          background: rgba(39,69,111,0.001);
          z-index: 1;
        }
        /deep/ .el-table--group::after{
          content: '';
          position: absolute;
          background: rgba(39,69,111,0.001);
          z-index: 1;
        }
        /deep/ .el-table::before{
          content: '';
          position: absolute;
          background: rgba(39,69,111,0.001);
          z-index: -1;
        }
        /deep/ .el-pagination{   // 分页start--------------------------------->
          text-align: right;
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
        /deep/ .el-date-editor{            // 分页end--------------------------------->
          width: 145px;
        }
      }
    }
    /*页面右侧盒子*/
    &_right{
      width: 25%;float: left;height:100%;
    }
    /deep/ .el-range-input {
      background-color:rgb(19, 44, 83)!important;
      color: #2F96EF!important;
    }
  }
</style>
