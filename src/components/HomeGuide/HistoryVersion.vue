<template>
  <div class="historyVersion">
    <div class="historyVersion_top">
      <div class="historyVersion_imgText">
        <span class="title">历史版本</span>
      </div>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
    </div>
    <div class="historyVersion_main">
      <div class="historyVersion_checking">
        <p class="title">
          <span class="circle">•</span><span class="text">人员考勤</span>
        </p>
        <ul class="listbox">
          <li @click="goTo('/CheckingV1')">
            <p class="version">v1.0</p>
          </li>
          <li @click="goTo('/CheckingV2')">
            <p class="version">v2.0</p>
          </li>
          <li @click="goTo('/CheckingV3')">
            <p class="version">v3.0</p>
          </li>
          <li @click="goTo('/CheckingV4')">
            <p class="version">v4.0</p>
          </li>
          <li @click="goTo('/CheckingV5')">
            <p class="version">v5.0（2019/02/13）</p>
            <p class="desc">1、新增人员考勤雷达图：迟到、离岗、未到、未派工</p>
          </li>
          <li @click="goTo('/CheckingV6')">
            <p class="version">v6.0（2019/02/21）</p>
            <p class="desc">1、修改人员考勤雷达图为：派工、异常、上岗、在岗、出勤。2、新增考勤历史页面</p>
          </li>
          <li @click="goTo('/CheckingV7')">
            <p class="version">v7.0（2019/02/27）</p>
            <p class="desc">1、新增能源点击查看进入-详情页面 2、修改雷达图的样式</p>
          </li>
        </ul>
      </div>
      <div class="historyVersion_car">
        <p class="title">
          <span class="circle">•</span><span class="text">车辆管理</span>
        </p>
        <ul class="listbox">
          <li @click="goTo('/CarsV10')">
            <p class="version">v1.0-2018-12-17</p>
          </li>
          <li @click="goTo('/CarsV20')">
            <p class="version">v2.0-2019-01-31</p>
          </li>
          <li @click="goTo('/CarshlgV21')">
            <p class="version">v2.1-2019-02-14</p>
          </li>
          <li @click="goTo('/CarsHLGV31')">
            <p class="version">v3.0-2019-02-18</p>
          </li>
        </ul>
      </div>
      <div class="historyVersion_right">

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'historyVersion',
    methods: {
      goTo(path){
        this.$router.replace(path)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .historyVersion{
    font-size: 12px;
    height:100%;
    background-image: url(../../assets/images/index_bg.png);
    background-size: 100% 100%;
    color: rgb(255, 255, 255);
    background-repeat: no-repeat;overflow: hidden;
    &_top{
      position: fixed;top:0;left:15px;right:15px;box-sizing: border-box;
      height: 106px;line-height:106px;text-align: center;
      .title {
        font-size: 0.44rem;
        color:#fff;font-weight:bold;
        span{cursor: pointer;}
      }
    }
    &_main{
      position: fixed;top:120px;left:15px;right:15px;bottom:15px;
      .title{
        background:rgba(58, 96, 133, 0.9);display: flex;border-radius:5px 5px 0 0;align-items:center;
        font-size:20px;font-weight:bold;
        .circle{
          margin-left:5px;font-size: 32px; color: #02c9fc;
        }
        .text{
          margin-left:5px;
        }
      }
      .listbox{
        padding: 15px;
        li{
          margin-bottom:15px;cursor: pointer;
          .version{font-size:18px;}
          .desc{font-size:12px;text-indent: 2em;}
        }
      }
    }
    &_checking{
      width: 25%;float: left;height:100%;padding-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      border-radius:5px;background-color: rgba(42, 75, 133, 0.3);
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        // margin-top: 15px;
        margin-right: 15px;
        padding: 15px;
    }
    &_car{
      width: 25%;float: left;height:100%;margin-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        // margin-top: 15px;
        padding: 15px;
    }
  }
</style>
