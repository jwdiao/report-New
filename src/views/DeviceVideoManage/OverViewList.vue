<template>
  <div class="overviewList">
    <div  class="navLine">
      <span :class="{FirstTitleNobg:true,secTitlebg:activeindex==100}">{{message}}</span>
      <span :class="{FirstTitleNobg:true,secTitlebg:activeindex==index}" v-for="(item , index) in navLineList" :key="index">{{item.workCenterName}}</span>
    </div>
    <ul class="overview-nav">
      <li class="nav" @click="crafClick('工艺类型')" :class="{active: currentView == 'CraftType'}" v-show="CraftTypeShow"> 工艺类型</li>
      <li class="nav" @click="WorkCenterClick('事业部')" :class="{active: currentView == 'WorkCenter'}" v-show="WorkCenterShow">事业部</li>

      <!-- <li class="nav" @click="currentView = 'DeviceList'" :class="{active: currentView == 'DeviceList'}">设备列表</li> -->
    </ul>
    <keep-alive>
      <div class="overview-navCon">
        <div :is="currentView" @handleLiClick="handleParent(arguments)" @handleClick="handleWorkCenter(arguments)"></div>
      </div>
    </keep-alive>
  </div>
</template>
<script>
  import CraftType from './components/CraftType'
  import WorkCenter from './components/WorkCenter'
  /* import DeviceList from './components/DeviceList' */

  export default {
    name: 'OverViewList',
    components: {
      CraftType,
      WorkCenter,
      /* DeviceList */
    },
    data() {
      return {
        currentView: 'CraftType',
        navLineList:[],
        activeindex:100,
        message:'工艺类型',
        CraftTypeShow:true,
        WorkCenterShow:true

      }
    },
    methods:{
      /*工艺类型tab点击时间*/
      crafClick(msg){
        this.navLineList.pop();
        this.activeindex=100;
        this.currentView = 'CraftType'
        this.message = msg
        this.WorkCenterShow = true;
      },
      /*事业部点击事件*/
      WorkCenterClick(msg){
        this.navLineList.pop();
        this.activeindex=100;
        this.message = msg
        this.currentView = 'WorkCenter'
        this.CraftTypeShow = true;
      },
      /*监听工艺类型每一个item点击事件*/
      handleParent(msg){
        this.WorkCenterShow = false;
        this.tablineMessage(msg);

      },
      /*监听事业部每一个item点击事件*/
      handleWorkCenter(msg){
        this.CraftTypeShow = false;
        this.tablineMessage(msg);
      },
      tablineMessage(msg){
        if(this.navLineList.length>0){
          this.navLineList.pop();
          this.navLineList.push(msg[0]);
          this.activeindex = this.navLineList.length-1;
        }else{
          this.navLineList.push(msg[0]);
          this.activeindex = this.navLineList.length-1;
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .overviewList{
    // height:550px;
    // height: 500px;
    height:100%;
    // width:1420px;
    width: 100%;
    padding:15px 10px;
    // background-color:#11213c;

    overflow: hidden;
    .navLine{
      background: url("./images/nav-bg.png") no-repeat;
      background-size: 100% 100%;
      width: 101%;
      height: 42px;
      margin-left: -10px;margin-bottom: 15px;
      .FirstTitlebg{
        display: inline-block;
        width: 120px;
        height: 42px;line-height: 42px;
        text-align: center;font-size: 16px;
        background:url("./images/firstR-bg.png") no-repeat;
      }
      .FirstTitleNobg{
        display: inline-block;
        width: 120px;
        height: 42px;line-height: 42px;
        text-align: center;font-size: 16px;
      }
      .secTitlebg{
        display: inline-block;
        width: 120px;
        height: 42px;line-height: 42px;
        text-align: center;font-size: 16px;
        margin-left: -15px;
        background:url("./images/secTitle-bg.png") no-repeat;
      }
    }
    .overview-nav{
      width: 40px;
      float: left;
      // margin-left:30px;
    }
    .nav{
      color: #fff;cursor: pointer;
      text-align: center;
      font-size:16px;
      padding: 25px 5px;
      height: 142px;
      background: url('./images/overview_tab-primary.png') 100% 100% no-repeat;

      &.active{
        background: url('./images/overview_tab-active.png') 100% 100% no-repeat;
      }
    }
    .overview-navCon{
      // border:1px solid red;
      margin-left: 40px;
      height:100%;
      width: calc(100% - 40px);
    }
    .overview-gongyi{

    }

  }
</style>
