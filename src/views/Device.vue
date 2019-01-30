<template>
  <div class="device">
    <div class="device_header">
      <p class="title">北京三一桩机三现设备看板</p>
      <p class="time">2018-12-20 14:19:23</p>
      <div class="dayOrnight">
        <!-- <img v-show="dayOrNightStatus ==='白班'" src="../assets/images/index_sun.png" /> -->
        <!-- <img v-show="dayOrNightStatus ==='夜班'" src="../assets/images/index_moon.png" /> -->
        <img src="../assets/images/index_sun.png" />
        <span>白班</span>
        <!-- <span v-text="dayOrNightStatus">白班</span> -->
      </div>
    </div>
    <div class="device_category">
      <div class="item">
        <p class="title"><span>1.</span>下料</p>
        <ul class="info">
          <li><i>可工作时间</i><em>402.68h</em></li>
          <li><i>派工时间</i><em>402.68h</em></li>
          <li><i>工作率间</i><em>402.68h</em></li>
          <li><i>设备执行率</i><em>402.68h</em></li>
        </ul>
      </div>
      <div class="item">
        <p class="title"><span>1.</span>下料</p>
        <ul class="info">
          <li><i>可工作时间</i><em>402.68h</em></li>
          <li><i>派工时间</i><em>402.68h</em></li>
          <li><i>工作率间</i><em>402.68h</em></li>
          <li><i>设备执行率</i><em>402.68h</em></li>
        </ul>
      </div>

    </div>
    <div class="device_container">
      <div class="device_left"></div>
      <div class="device_con"></div>
      <div class="device_right"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Device'
}
</script>
<style lang="scss" scoped>
.device{
  height:100%;width:1920px;
  background-image: url(../assets/images/index_bg.png);
  background-size: cover;
  color: rgb(255, 255, 255);
  background-repeat: no-repeat;overflow: hidden;
  &_header{
    height: 106px;line-height: 106px;text-align: center;
    .title{
      font-size:44px;color:#fff;cursor: pointer;font-weight:bold;
    }
    .time{
      font-size:32px;
      color:#ababab;position: absolute;top:28px;right:30px;z-index: 10;width: 230px;text-align: left;
      font-family: fontnameUnidreamLED !important;
    }
    .dayOrnight{
      position: absolute;top:30px;left:0;
      img{vertical-align: middle;width: 86px;}
      span{
        font-size:34px;color:#ababab;
        vertical-align: middle;margin-left:-10px;
      }
    }
  }
  &_category{
    overflow: hidden;margin-top:25px;
    .item{
      width:205px;float: left;margin-left:28px;
      .title{
        height:50px;color:#fff;font-size:21px;font-weight: bold;padding-top:14px;
        background-color:#153f87;
        span{color:#5397eb;}
      }
      .info{
        border:1px solid #106a93;font-size:16px;padding:0 5px;
        i{width:88px;text-align: right;color:#bcc3ce;font-style: normal}
        em{color:#02d2ff;}
      }
    }
  }
}
</style>