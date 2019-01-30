<template>
  <div class="home-page">
    <div class="home-page-wrap">
      <!-- 6s管理 -->
      <!-- <div class="btnArea" @click="goTo('/Monitor')"></div> -->
      <div class="btnArea" @click="goTo('/Manage6S')"></div>
      <!-- 人员考勤 -->
      <div class="btnArea" @click="goTo('/Checking')"></div>
      <!-- 区域视频管理 -->
      <a class="btnArea" @click="goToVideoPage"></a>
      <!--设备安全统计-->
      <a class="btnArea" @click="goTo('/DeviceSafeOnline')"></a>
      <!-- 监控设备查询 -->
      <a class="btnArea" @click="goTo('/Monitor')"></a>
      <!-- <a class="btnArea" @click="goToControlPage"></a> -->
      <!-- 车辆信息 -->
      <div class="btnArea" @click="goTo('/Cars')"></div>
      <!--控制台日志-->
      <div class="btnArea" @click="goTo('/ControlLog')"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeGuide",
    methods:{
      goTo(path){
        this.$router.replace(path)
      },
      goToVideoPage () {
        window.location.href = `${this.$store.state.baseUrl}/videodemo` // 视频
      },
      goToControlPage () {
        window.location.href = `${this.$store.state.baseUrl}/sanyDeviceCameraList` // 监控
      },
    }
  }
</script>

<style  lang="scss" scoped>
.home-page{
  width: 100%;height: 100%;
  background: url("./images/home-page7.jpg") no-repeat;background-size: 100% 100%;
  .home-page-wrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 2%;
    right: 0;
    margin: auto;
    width: 95%;
    height: 30%;
    /*border: 1px solid #000;*/
    padding-left: 10px;
    .btnArea{
      display: block;
      float: left;
      width: 12.5%;
      height: 100%;
      /*border: 1px solid gray;*/
      margin-right: 5px;
      margin-left: 1%;
      box-sizing: border-box;
      &:hover{
        cursor: pointer;
      }
    }
  }
}
</style>
