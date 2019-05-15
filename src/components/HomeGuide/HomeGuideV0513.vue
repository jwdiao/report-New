<template>
  <div class="home-page">
    <div class="home-page-wrap">
      <!-- <div class="btnArea" @click="goTo('/TextOcx')" style="position:fixed;top:0;left:50%;z-index:10;">ocx test</div> -->
      <!-- 6s管理 -->
      <!-- <div class="btnArea" @click="goTo('/Monitor')"></div> -->
      <div class="btnArea" @click="goTo('/Manage6S')"></div>
      <!-- 人员考勤 -->
      <div class="btnArea" @click="goTo('/CheckingJt')"></div>
      <!-- <div class="btnArea" @click="goTo('/CheckingJt')"></div> -->
      <!-- 区域视频管理 -->
      <!--<a class="btnArea" @click="goToVideoPage"></a>-->
      <!--设备安全统计-->
      <a class="btnArea" @click="goTo('/deviceVideoManage')"></a>
      <!-- 监控设备查询 -->
     <!-- <a class="btnArea" @click="goTo('/Monitor')"></a> -->
	  <!--<router-link class="btnArea" to="/Monitor"></router-link>-->
      <!-- <a class="btnArea" @click="goToControlPage"></a> -->
      <!-- 车辆信息 -->
      <!--<div class="btnArea" @click="goTo('/CarshlgV21')"></div>-->
      <div class="btnArea" @click="goTo('/CarsHLGV31')"></div>
      <!--控制台日志-->
      <div class="btnArea" @click="goTo('/ControlLog')"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: "HomeGuide",
    mounted() {
      axios.defaults.baseURL = 'http://10.19.7.69:8083'
      localStorage.setItem('ipAddrCheckingSelectedSubcompany', 'http://10.19.7.69:8083')
      localStorage.setItem('companyNameCheckingSelectedSubcompany','北京桩机')
    },
    methods:{
      goTo(path){
		  this.$router.push(path)
      },
      goToVideoPage () {
        window.location.href = `${this.$store.state.baseUrl}/videodemo` // 视频
      },
     /* goToControlPage () {
        window.location.href = `${this.$store.state.baseUrl}/sanyDeviceCameraList` // 监控
      },*/
    }
  }
</script>

<style  lang="scss" scoped>
.home-page{
  width: 100%;height: 100%;
  background: url("./images/home-page20190513.png") no-repeat;background-size: 100% 100%;
  .home-page-wrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0%;
    right: 0;
    margin: auto;
    width: 82%;
    height: 27%;
    /*border: 1px solid #ff0000;*/
    padding-left: 1%;
    .btnArea{
      text-align: center;
      display: block;
      float: left;
      width: 19%;
      height: 100%;
      /*border: 1px solid green;*/
      margin-right: 0.7%;
      margin-left: 0%;
      padding-left: 1%;
      box-sizing: border-box;
      &:hover{
        cursor: pointer;
      }
    }
  }
}
</style>

<!--以下代码为20190423针对每一单元独立区域，引入背景图即可使用（不可以滑动）-->
<!--
<template>
  <div class="home-page">
    <div class="titleLogo">
      <img src="./images/logo.png" alt="">
      <span class="titleLogoTxt">&nbsp;&nbsp;三现管理系统</span>
    </div>
    <div class="home-page-wrap">
      &lt;!&ndash;左侧旋转&ndash;&gt;
      <div class="leftHalf threeBlock">
        &lt;!&ndash; 6s管理 &ndash;&gt;
        <div class="btnArea sixS"  @click="goTo('/Manage6S')">
          <div class="titleContent">
            <img class="title" src="./images/6S.png" alt="">
            <div class="content">6S管理</div>
            <div class="englishContent">MANAGEMENT</div>
          </div>

        </div>
        &lt;!&ndash; 人员考勤 &ndash;&gt;
        <div class="btnArea personChecking" @click="goTo('/CheckingV71')">
          <div class="titleContent">
            <img class="title" src="./images/gongren.png" alt="">
            <div class="content">人员考勤管理</div>
            <div class="englishContent">ATTENTENCE</div>
          </div>
        </div>
        &lt;!&ndash; 区域视频管理 &ndash;&gt;
        <a class="btnArea areaCamera" @click="goToVideoPage">
          <div class="titleContent">
            <img class="title" src="./images/shipin.png" alt="">
            <div class="content">区域视频管理</div>
            <div class="englishContent">VIDEO MANAGEMENT</div>
          </div>
        </a>
      </div>
      &lt;!&ndash;中间不旋转&ndash;&gt;
      <div class="centerHalf deviceSafe">
        &lt;!&ndash;设备安全统计&ndash;&gt;
        <a class="btnArea" @click="goTo('/equipmentSafety')">
          <div class="titleContent">
            <img class="title" src="./images/shipin.png" alt="">
            <div class="content">设备在线统计</div>
            <div class="englishContent">ONLINE STATISTICS</div>
          </div>
        </a>
      </div>
      &lt;!&ndash;右侧旋转&ndash;&gt;
      <div class="rightHalf threeBlock">
        &lt;!&ndash; 监控设备查询 &ndash;&gt;
        <router-link class="btnArea devcieCamera" to="/Monitor">
          <div class="titleContent">
            <img class="title" src="./images/shipin.png" alt="">
            <div class="content">监控设备查询</div>
            <div class="englishContent">MONITORING EQUIPMENT</div>
          </div>
        </router-link>
        &lt;!&ndash; 车辆信息 &ndash;&gt;
        <div class="btnArea CarInfo" @click="goTo('/CarsHLGV31')">
          <div class="titleContent">
            <img class="title" src="./images/cheliangguanli.png" alt="">
            <div class="content">车辆信息</div>
            <div class="englishContent">VEHICLE</div>
          </div>
        </div>
        &lt;!&ndash;控制台日志&ndash;&gt;
        <div class="btnArea ConsloeD" @click="goTo('/ControlLog')">
          <div class="titleContent">
            <img class="title" src="./images/cheliangguanli.png" alt="">
            <div class="content">安全监控</div>
            <div class="englishContent">SECURITY MONITORING</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: "HomeGuide",
    mounted() {
      axios.defaults.baseURL = 'http://10.19.7.69:8083'
      localStorage.setItem('ipAddrCheckingSelectedSubcompany', 'http://10.19.7.69:8083')
      localStorage.setItem('companyNameCheckingSelectedSubcompany','北京桩机')
    },
    methods:{
      goTo(path){
		  this.$router.push(path)
      },
      goToVideoPage () {
        window.location.href = `${this.$store.state.baseUrl}/videodemo` // 视频
      },
    }
  }
</script>

<style  lang="scss" scoped>
.home-page{
  width: 100%;height: 100%;
  display: flex;flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./images/bj.jpg") no-repeat;background-size: 100% 100%;
  .titleLogo{
    font-size: 0;
    margin: 0 auto;
    margin-top: -50px;
    margin-bottom: 100px;
    img{
      vertical-align: middle;
    }
    .titleLogoTxt{
      font-size: 40px;
      vertical-align: middle;
      color: #fff;

    }
  }
  .home-page-wrap{
    display: flex;
    width: 80%;
    height: 20%;
    /*border: 1px solid #000;*/
    justify-content: center;
    align-items: center;
    perspective: 1200px;
    .threeBlock{
      display: flex;
      width: 10%;
      height: 100%;
      flex: 10;
      /*border: 1px solid red;*/
      margin-left: 1%;
      box-sizing: border-box;
      &:hover{
        cursor: pointer;
      }
      .btnArea{
        flex: 1;display: flex;justify-content: center;align-items: center;
        width: 100%;
        height: 100%;
        /*border: 1px solid green;*/
        margin-left: 1%;
        -webkit-box-reflect: below 10px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.1)));
        /*-webkit-transform: scaleY(-1);
        -moz-transform: scaleY(-1);
        -ms-transform: scaleY(-1);
        -o-transform: scaleY(-1);
        transform: scaleY(-1);
        filter:fliapv;
        opacity: 0.2;
        filter:alpha(opacity('20'));*/
        .titleContent{
          display: flex;flex-direction:column; justify-content: center;align-items: center;
          .title{
            color: #ffffff;font-weight: bold;font-size: 55px;
          }
          .content{
            color: #ffffff;font-size: 30px;
          }
          .englishContent{
            color: #ffffff;font-size: 16px;
          }
        }
      }
    }
    .centerHalf{
      flex: 3;
      display: flex;justify-content: center;align-items: center;
      width: 100%;
      height: 89.5%;
      /*border: 1px solid red;*/
      margin-left: 1%;
      background:linear-gradient(45deg,#1A68C0,#37BEF6);;/*设备安全统计*/
      -webkit-box-reflect: below 10px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.1)));
      &:hover{
        cursor: pointer;
      }
      .titleContent{
        display: flex;flex-direction:column; justify-content: center;align-items: center;
        .title{
          color: #ffffff;font-weight: bold;font-size: 55px;
        }
        .content{
          color: #ffffff;font-size: 26px;
        }
        .englishContent{
          color: #ffffff;font-size: 16px;
        }
      }
    }
    .leftHalf{
      transform-style: preserve-3d;
      transform: rotateY(25deg);
      margin-right: -2%;
      .sixS{
        background:linear-gradient(45deg,#549539,#CCD137);   /*6s管理*/
      }
      .personChecking{
        background:linear-gradient(45deg,#107392,#30CBA3);/*人员考勤*/
      }
      .areaCamera{
        background:linear-gradient(45deg,#346FEA,#4BC6F2);/*区域设备*/
      }
    }
    .rightHalf{
      transform-style: preserve-3d;
      transform: rotateY(-25deg);
      margin-left: -1.3%;
      .devcieCamera{
        background:linear-gradient(45deg,#1A68C0,#37BEF6);/*设备监控*/
      }
      .CarInfo{
        background:linear-gradient(45deg,#5352EB,#611EB9);/*车辆信息*/
      }
      .ConsloeD{
        background:linear-gradient(45deg,#BA6B3F,#BD398C);/*控制台日志*/
      }
    }
  }
}
</style>
-->
