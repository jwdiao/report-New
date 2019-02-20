<template>
  <div class="home">
    <div class="home_head">
      <img src="../../assets/history/images/logo.png" alt="logo">
      <p>三现数据制造体系人员管理系统-北京三一桩机</p>
      <!--<div class="home_head-btn" @click="bostmachcenter">加工中心</div>-->

    </div>
    <div class="home_layout">
      <AbnormalStatistics :info="baseInfo" :monthYearData="monthYearDataLeft" />
      <div class="home_con">
        <Checking :info="baseInfo" :hourEchartsDataBetween="hourEchartsDataBetween" />
        <!-- <Checking /> -->
      </div>
      <attendance :dayInfo="dayEchartsDataRight" :monthInfo="monthEchartsDataRight" :yearInfo="yearEchartsDataRight" />
    </div>
    <MachingCenter @selectName="selectedCenterName" />

  </div>
</template>

<script>
import echarts from 'echarts'
import AbnormalStatistics from '@/components/checking-v20181201/AbnormalStatistics'
import Attendance from '@/components/checking-v20181201/Attendance'
import Checking from '@/components/checking-v20181201/checking'
import MachingCenter from '@/components/checking-v20181201/MachingCenter'
import http from '../../api/http'
export default {
  name: 'home',
  components:{
	  AbnormalStatistics,
    Attendance,
    Checking,
    MachingCenter
  },
  data () {
    return {
      centername: '',
      baseInfo: {}, //基本信息
      monthYearDataLeft: {}, // 左侧异常年和月数据
      dayEchartsDataRight: {}, // 右侧日echarts图
      monthEchartsDataRight: {}, // 右侧月echarts图
      yearEchartsDataRight: {}, // 右侧年echarts图
      hourEchartsDataBetween: {}, // 中间一小时考勤
      timerId: ''
    }
  },
  created () {
    // this.$store.dispatch('getBaseDataAction')
    // setInterval(()=>{
    //   this.$store.dispatch('getBaseDataAction')
    // },10000)
  },
  mounted () {
    // 基本信息顶部
    this.getBaseInfoData(this.centername)

    // 左侧异常月和异常年
    this.getMonthYearLeftData (this.centername)

    // 右侧日/月/年统计
    this.getDayMonthYearRightData(this.centername, 'DAY')
    this.getDayMonthYearRightData(this.centername, 'MON')
    this.getDayMonthYearRightData(this.centername, 'YEAR')

    // 中间一小时echart图
    this.HourBetweenData(this.centername)

    // 定时器刷新
    /* this.timerId = setInterval(() =>{
      this.getBaseInfoData(this.centername)
      this.getMonthYearLeftData (this.centername)
      this.getDayMonthYearRightData(this.centername, 'DAY')
      this.getDayMonthYearRightData(this.centername, 'MON')
      this.getDayMonthYearRightData(this.centername, 'YEAR')
    },10000)
    this.timerIdHour = setInterval(() =>{
      this.HourBetweenData(this.centername)
    }, 30000) */
  },
  methods: {
    // 基本信息顶部
    async getBaseInfoData (centername) {
      const res = await http.post('/sanyAttendanceData/getAttendanceData', {centername: centername})
      if (res.data && res.data.ret == 200) {
        this.baseInfo = res.data.titledata
      }
    },
    // 左侧异常月和异常年
    async getMonthYearLeftData (centername) {
      const res = await http.post('/sanyUserPushRecord/getLateEchartsData', {centername: centername})
      if (res.data && res.data.ret == 200) {
        this.monthYearDataLeft = res.data
      }
    },
		
		
    // 右侧人员考勤日/月/年统计
    async getDayMonthYearRightData (centername, querySign) {
      const res = await http.post('/sanyUserPushRecord/getWorkEchartsData', {centername: centername, querySign: querySign})
      if (res.data && res.data.ret == 200) {
        if (querySign === 'DAY') {
          this.dayEchartsDataRight = res.data
        }
        if (querySign === 'MON') {
          this.monthEchartsDataRight = res.data
        }
        if (querySign === 'YEAR') {
          this.yearEchartsDataRight = res.data
        }


      }
    },
    // 中间一小时echart图
    async HourBetweenData (centername) {
      const res = await http.post('/sanyAttendanceData/getWorkIngEchartsData', {centername: centername})
      if (res.data && res.data.ret == 200) {
        // console.log('between:',res.data)
        this.hourEchartsDataBetween = res.data
      }
    },
    selectedCenterName (centername) {
      // console.log('uu:',centername)
      this.centername = centername
      // 重新加载数据
      this.getBaseInfoData(this.centername)
      this.getMonthYearLeftData (this.centername)
      this.getDayMonthYearRightData(this.centername, 'DAY')
      this.getDayMonthYearRightData(this.centername, 'MON')
      this.getDayMonthYearRightData(this.centername, 'YEAR')
      this.HourBetweenData(this.centername)
    }
  },
  destroyed () {
    clearInterval(this.timerId)
    clearInterval(this.timerIdHour)
  }
}
</script>
<style lang="scss">
// @import '~@/assets/css/home';
.home{
  background-image: url(../../assets/history/images/BJ.png);
}

.home{
    height:100%;font-size:12px;
    background-size: cover;
    color: rgb(255, 255, 255);
    font-family: fontnameRegular;
    background-repeat: no-repeat;overflow: hidden;
    &_head{
      position: fixed;top:0;left:30px;right:35px;height:100px;line-height:100px;text-align:center;
      img{width: 50px;display: inline-block;vertical-align: middle}
      p{
        color: #05f4f1;
        font-size: 24px;display: inline-block;vertical-align: middle;
        margin-left: 10px;
      }
      &-btn{
        position: fixed;right:24px;top:35px;width:150px;height:44px;text-align: center;line-height: 44px;
        background-color:#1578cf;color:#fff;font-size:24px;border-radius: 5px;cursor: pointer;
      }
    }
    &_layout{
      position: fixed;top:100px;left:30px;right:35px;bottom:15px;
    }

    &_abnormal{
      width:25%;float: left;height:100%;
      //background-color: rgba(0, 0, 255, 0.1);
      //border:1px solid rgb(9, 44, 76);
      padding:0 15px;
      display:flex;flex-direction: column;
      &-item{
        flex:1;
        //height: 32.5%;
      }
      .day{
        overflow: hidden;position: relative;display: flex;flex-wrap: wrap;align-items:center;
        height:85%;
        li{
          width: 50%;text-align: center;
        }
        p{
          font-size:60px;transform: translate3d(0px,14px,0px);
          &.chidao{
            background: -webkit-gradient(linear, 0 0, 0 bottom, from(#a1010d), to(#f20013));
			      position:relative;color:#fa0014;
			      &:before{content: attr(text);position:absolute;z-index:10;color:#fa0014;-webkit-mask:linear-gradient(to bottom,#98010c,#f20013);}
          }
          &.ligang{
            background: -webkit-gradient(linear, 0 0, 0 bottom, from(#D96CF1), to(#8338FA));
            position:relative;color:#D96CF1;
			      &:before{content: attr(text);position:absolute;z-index:10;color:#D96CF1;-webkit-mask:linear-gradient(to bottom,#D96CF1,#8338FA);}
          }
          &.kuanggong{
            background: -webkit-gradient(linear, 0 0, 0 bottom, from(#2DD7EC), to(#0189FF));
            position:relative;color:#2DD7EC;
			      &:before{content: attr(text);position:absolute;z-index:10;color:#2DD7EC;-webkit-mask:linear-gradient(to bottom,#2DD7EC,#0189FF);}
          }
          &.zaotui{
            background: -webkit-gradient(linear, 0 0, 0 bottom, from(#FFB200), to(#EB2800));
            position:relative;color:#FFB200;
			      &:before{content: attr(text);position:absolute;z-index:10;color:#FFB200;-webkit-mask:linear-gradient(to bottom,#FFB200,#EB2800);}
          }
          &.chidao,&.ligang,&.kuanggong,&.zaotui{
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-family: fontnameRegular;
          }
        }
        span{font-size:18px;}
      }
			/*左侧考勤模态框*/
			.home_container_left{
				width: 25%;
				max-height: 640px;
				background-color: #032046;
				opacity: 0.9;
				position: fixed;
				top:150px;
				left:0px;
				z-index:100;
				text-align: center;
				.top{
					text-align:right;
					padding: 10px;
					span{
						font-size:20px;
						cursor:pointer;
					}
				}
				.message{
					width:100%;
					padding:10px;
					height:135px;
					div{
						height:32%;
						span{
							display:inline-block;
							width:22%;
							height:36px;
							text-align: center;
							line-height: 36px;
						}
						/*第一列的span需要宽一些*/
						span:nth-of-type(1){
							display:inline-block;
							width:34%;
							height:36px;
						}
					}
				}
			}
    }
  .month{width: 100%;height: 85%;position: relative;}
  .year{width: 100%;height: 85%;position: relative;}
    &_con{
      width:48%;float: left;height:100%;
      //background-color: rgba(0, 0, 255, 0.1);
      color: rgb(255, 255, 255);
      margin-left: 1%;
      margin-right: 1%;
      //border:1px solid rgb(9, 44, 76);
      display: flex;
      flex-direction: column;
      .checking-text{
        //flex: 1;
        .checktest-wrap{
          width: 100%;
          display: flex;
          position: relative;
          top: 10%;
          .total-pro{
            flex: 1;
            &>img{
              float: left;
              margin-top: 20px;
            }
            &>div{
              float: left;
              text-align: center;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
              &>p{
                font-size:80px;
                font-weight: bold;
                font-family: fontnameRegular;
                color: #0DCCEA;
              }
              &>span{
                font-size: 24px;
              }
            }
          }
          .single-pro{
            flex: 2;
            display: flex;
            flex-direction: column;
            &>ul:first-of-type{
              margin-bottom: 25px;    //两个ul之间的距离
            }
            &>ul{
              flex: 1;
              display: flex;

              &>li{
                flex: 1;
                text-align: center;
                position: relative;
                &>.lv{
                  width: 100%;
                  height: 99px;
                }
                &>p{
                  font-size: 24px;
                  color: #02C9FC;
                }
                &>span{
                  font-size: 14px;
                  text-align: center;
                  position: absolute;
                  bottom: -18px;
                  margin: auto -35px;
                }
              }
            }
          }
        }
      }
      .checking-list{
        //flex: 2;
        //margin-top: 75px;
        &>div{
          width: 100%;
          height: 100%;
          //background-color: #cccccc;
          //&>div.off{
          //  display: none;
          //}
        .checking-search{
            margin-top: 10px;
            margin-bottom: 20px;
            &>input{
              width: 35%;
              height: 33px;
              outline: none;
              padding-left: 10px;
              color: #ffffff;
              background: rgba(8,221,242,0.2);
              border: 1px solid #176fA6;
              border-radius:5px ;
              margin-left: 20px;
              float: left;
            }
            &>input::-webkit-input-placeholder{
              color: #27bcf2;
            }
            &>div{
              display: inline-block;
              width: 5%;
              height: 33px;
              line-height: 33px;
              margin-left: 2%;
              outline: none;
              font-size: 14px;
              cursor: pointer;
              border-radius: 5px;
              text-align: center;
              //background: gradient(linear, left top, left bottom, from(#4CDDED), to(#0088FE));
              //background: linear-gradient(top,  #4CDDED,  #0088FE);
              background-color: #0088FE;
            }
          }
        .search-map{
            margin-top: 20px;
            width: 96%;
            height: 537px;       ///平面图的大小
          }
        .echarts-time{
          height: 545px;
          &.off{
            display: none;
          }
          &>ul{
            position: relative;
            padding-right: 32px;
            &>div{
              width: 250px;
              height: 550px;
              float: right;
              //overflow: auto;
                overflow: hidden;
              &.off{
                display: none;
              }
            }
            &>div>div{
              overflow: hidden;
            }
            &>div>div>div{
              width: 210px;
              height: 100px;
              background-color: #031021;
              margin-bottom: 3px;
              float: right;
              position: relative;
              padding-left: 10px;
              border: 1px solid #136394;
              border-radius: 0 20px 0 20px;
              overflow: hidden;
              .num{
                width: 20px;
                height: 20px;
                border-radius: 20px;
                background-color: #ff0000;
                position: absolute;
                top: -5px;
                left: -5px;
                text-align: center;
                font-size: 10px;
                line-height: 26px;
              }
              img{
                width: 70px;
                height: 70px;margin-top: 15px;
              }
              .information{
                position: absolute;
                top: 10px;
                left: 85px;
                font-size: 10px;
                color: #5CAFF1;
                span{
                  color: #75EEFF;
                }
              }
            }
          }
          &>ul>li{
            width: 70px;
            height: 70px;
            position: absolute;
            background:rgba(15,150,200,0.8);
            border-radius: 50px;
            &>div{
              position: absolute;
              background-color: #ff0000;
              border: 1px solid #6894BA;
              width: 15px!important;
              height: 15px!important;
              border-radius:10px;
              display: inline-block;
              text-align: center;
              font-size: 10px;
              &:hover{
                cursor: pointer;
              }

            }
            &.camera1{
              top: 0;
              left: 50px;
            }
            &.camera2{
              top: 85px;
              left: 50px;
            }
            &.camera3{
              top: 170px;
              left: 50px;
            }
            &.camera4{
              top: 245px;
              left: 20px;
            }
            &.camera5{
              top: 245px;
              left: 110px;
            }
            &.camera6{
              top: 350px;
              left: 110px;
            }
            &.camera7{
              top: 0;
              left: 290px;
            }
            &.camera8{
              top: 105px;
              left: 290px;
            }
            &.camera9{
              top: 190px;
              left: 320px;
            }
            &.camera10{
              top: 300px;
              left: 290px;
            }
            &.camera11{
              top: 0;
              left: 620px;
            }
            &.camera12{
              top: 110px;
              left:590px;
            }
          }
        }
        }
        &>div .echarts-time{
          //padding-top: 20px;
          box-sizing: border-box;
        }
      }
    }
    &_normal{
      width:25%;float: left;height:100%;
      background-color: rgba(0, 0, 255, 0.1);
      display: flex;
      flex-direction: column;
      border:1px solid rgb(9, 44, 76);
      display: flex;
      flex-direction: column;

    }
    &_title{
        margin-top:10px;
        padding-left: 5px;
        border-left: 3px solid rgb(0, 136, 254);
        font-size:18px;
    }
    &_attendance{
      margin:15px 0px;
      padding-left: 5px;
      border-left: 3px solid rgb(0, 136, 254);
      font-size:14px;
    }

  }
</style>
