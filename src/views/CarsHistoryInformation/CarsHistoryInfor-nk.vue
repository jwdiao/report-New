<template>
  <div class="index">
    <!-- 头部 搜索start -->
    <div class="index_top">
      <div class="index_imgText">
        <span class="title" style="cursor:pointer;" @click="switchData('/CarsHLGV31')">南口•南大门车辆历史统计</span><!--南口•南大门-->
      </div>
      <em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/CarsNKV31')"></div>
      <!--日期start-->
      <el-date-picker  class="buttonDateOne"
        v-model="valueDateStart"
        type="date" @change="handleDateStart" value-format="yyyy-MM-dd"
        :picker-options="pickerOptionsStart"
        placeholder="开始日期">
      </el-date-picker>
      <el-date-picker class="buttonDateTwo"
        v-model="valueDateEnd"
        type="date" @change="handleDateEnd" value-format="yyyy-MM-dd"
        :picker-options="pickerOptionsEnd"
        placeholder="结束日期">
      </el-date-picker>
      <div class="buttonSearch" @click="searchAll">确定</div>
      <!--日期end-->
    </div>
    <!--标题-->
    <div class="index_main">
      <div class="index_center">
        <div class="index_center_top">
          <div class="first" style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
            <p class="home_title" style=";display: flex;justify-content: space-between;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;"></span></span>
            </p>
            <div class="index_center_top_main">
              <div class="iconbg">
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>编号</p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p class="leaveNumP">日期</p><!--{{carAllData.strandedTruckNum}}-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="second" style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
            <p class="home_title" style="display: flex;justify-content: center;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span>当日进入</span>
            </p>
            <div class="index_center_top_main">
              <div class="iconbg">
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>内部小车</p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>内部大货车</p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>外部小车</p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>外部大货车</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="third" style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
            <p class="home_title" style="display: flex;justify-content: center;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span>晚6点大货车进出</span>
            </p>
            <div class="index_center_top_main">
              <div class="iconbg">
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>进</p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>出</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="forth" style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
            <p class="home_title" style="display: flex;justify-content: center;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span>晚9点小车进出</span>
            </p>
            <div class="index_center_top_main">
              <div class="iconbg">
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>进</p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>出</p><!--{{carAllData.strandedTruckNum}}-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="five" style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
            <p class="home_title" style="display: flex;justify-content: center;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span>抬杆进出</span>
            </p>
            <div class="index_center_top_main">
              <div class="iconbg">
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>进</p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>出</p><!--{{carAllData.strandedTruckNum}}-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sixth" style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 0px">
            <p class="home_title" style="display: flex;justify-content: center;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span>24小时未离开</span>
            </p>
            <div class="index_center_top_main">
              <div class="iconbg">
                <div class="index_center_top_main_Cars">
                  <div class="index_center_top_main_Cars_module carsN">
                    <p>内部小车</p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>内部大货车</p>
                  </div>
                </div>
                <div class="index_center_top_main_Cars ">
                  <div class="index_center_top_main_Cars_module carsH">
                    <p>外部大货车</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--列表-->
        <div class="index_center_bottom" style="overflow: hidden">
        <div class="scrollAll">
          <div class="scrollDiv" v-for="(item,index) in CarsHistoryArr" :key="index">
            <div class="first" style=" border-radius:0 0 5px 5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
              <div class="index_center_bottom_main">
                <div class="iconbg">
                  <div class="index_center_bottom_main_Cars">
                    <div class="index_center_bottom_main_Cars_module carsN">
                      <p>{{index+1}}</p>
                    </div>
                  </div>
                  <div class="index_center_bottom_main_Cars ">
                    <div class="index_center_bottom_main_Cars_module carsH">
                      <p class="leaveNumP">{{item.date}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="second" style=" border-radius:0 0 5px 5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
              <div class="index_center_bottom_main">
                <div class="iconbg">
                  <div class="index_center_bottom_main_Cars">
                    <div class="index_center_bottom_main_Cars_module carsN">
                      <p>{{item.enterInsideCarnum}}</p>
                    </div>
                  </div>
                  <div class="index_center_bottom_main_Cars">
                    <div class="index_center_bottom_main_Cars_module carsN">
                      <p>{{item.enterInsideTrucknum}}</p>
                    </div>
                  </div>
                  <div class="index_center_bottom_main_Cars">
                    <div class="index_center_bottom_main_Cars_module carsN">
                      <p>{{item.enterOutsideCarnum}}</p>
                    </div>
                  </div>
                  <div class="index_center_bottom_main_Cars">
                    <div class="index_center_bottom_main_Cars_module carsN">
                      <p>{{item.enterOutsideTrucknum}}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="third" style=" border-radius:0 0 5px 5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
              <div class="index_center_bottom_main">
                <div class="iconbg">
                  <div class="index_center_bottom_main_Cars">
                    <div class="index_center_bottom_main_Cars_module carsN">
                      <p>{{item.after6EnterTruckNum}}</p>
                    </div>
                  </div>
                  <div class="index_center_bottom_main_Cars ">
                    <div class="index_center_bottom_main_Cars_module carsH">
                      <p>{{item.after6EnterTruckNum}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="forth" style=" border-radius:0 0 5px 5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
              <div class="index_center_bottom_main">
                <div class="iconbg">
                  <div class="index_center_bottom_main_Cars">
                    <div class="index_center_bottom_main_Cars_module carsN">
                      <p>{{item.after9EnterCarNum}}</p>
                    </div>
                  </div>
                  <div class="index_center_bottom_main_Cars ">
                    <div class="index_center_bottom_main_Cars_module carsH">
                      <p>{{item.after9LeaveCarNum}}</p><!--{{carAllData.strandedTruckNum}}-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="five" style=" border-radius:0 0 5px 5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 10px">
              <div class="index_center_bottom_main">
                <div class="iconbg">
                  <div class="index_center_bottom_main_Cars">
                    <div class="index_center_bottom_main_Cars_module carsN">
                      <p>{{item.upEnterNum}}</p>
                    </div>
                  </div>
                  <div class="index_center_bottom_main_Cars ">
                    <div class="index_center_bottom_main_Cars_module carsH">
                      <p>{{item.upLeaveNum}}</p><!--{{carAllData.strandedTruckNum}}-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sixth" style=" border-radius:0 0 5px 5px;background-color: rgba(42, 75, 133, 0.3);margin-right: 0px">
              <div class="index_center_bottom_main">
                <div class="iconbg">
                  <div class="index_center_bottom_main_Cars">
                    <div class="index_center_bottom_main_Cars_module carsN">
                      <p>{{item.strandedInsideCarNum}}</p>
                    </div>
                  </div>
                  <div class="index_center_bottom_main_Cars ">
                    <div class="index_center_bottom_main_Cars_module carsH">
                      <p>{{item.strandedInsideTruckNum}}</p>
                    </div>
                  </div>
                  <div class="index_center_bottom_main_Cars ">
                    <div class="index_center_bottom_main_Cars_module carsH">
                      <p>{{item.strandedOutsideTruckNum}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        </div>
      </div>
      </div>
    </div>
</template>
<script>
  import moment from 'moment'
  import http from '../../api/http'
  import BScroll from 'better-scroll'
  import {
    reqHistoryCarsInformationNKData
  }from'../../api'

  export default {
    name: 'cars',

    data() {
      return {
        isShow:false,
        isShowContent:false,

        CarsHistoryArr:[],

        currentTime: '',    // 系统当前时间
        currentDate: '',    // 系统当前日期
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 1000*60*60*24|| time.getTime() < Date.now() - 1000*60*60*24*19;
          }
        },
        pickerOptionsEnd: {
          disabledDate(time) {
            return  time.getTime() > Date.now() - 1000*60*60*24; /*|| time.getTime() < new Date(this.valueDateStart).getTime()*/
          }
        },
        valueDateStart:'', //开始时间
        valueDateEnd:'', //结束时间
        screenHeight:document.body.clientHeight,

      }
    },
    created() {
      this.setDefaultDateStart()
      this.setDefaultDateEnd()
    },
    mounted() {
      // 顶部日期时间
      this.currentTime = this.getCurrentDateTime();
      this.currentDate = this.getCurrentDate();
      setInterval(() => {
        this.currentTime = this.getCurrentDateTime();
      }, 1000)
      this.$nextTick(()=>{
        new BScroll('.index_center_bottom',{
          scrollbar:true,
          bounce:false,//回弹效果
          mouseWheel:true,//滚轮滚动
        })
      })
      //初始化列表
      this.getCarsHistoryData(this.valueDateStart,this.valueDateEnd)
      // 给window对象绑定resize事件
      window.addEventListener('resize',this.handleResize)
    },
    methods: {
      //初始化开始时间
      setDefaultDateStart(){
        const nowTimeOne = new Date().getTime() - 1000*60*60*24*16
        const nowTime = new Date(nowTimeOne)
        const month  = nowTime.getMonth() - 0 + 1 < 10 ? '0' + (nowTime.getMonth() - 0 + 1) : nowTime.getMonth() - 0 + 1,
          days  = nowTime.getDate()  < 10 ? '0' + nowTime.getDate() : nowTime.getDate() ;
        this.valueDateStart  = nowTime.getFullYear() +'-'+ month +'-'+ days;
      },
      //初始化结束时间
      setDefaultDateEnd(){
        const nowTimeOne = new Date().getTime() - 1000*60*60*24*1
        const nowTime = new Date(nowTimeOne)
        console.log('nowHour:',nowTime)
        console.log('nowTime.getMonth():',nowTime.getMonth())
        const month  = nowTime.getMonth() - 0 + 1 < 10 ? '0' + (nowTime.getMonth() - 0 + 1) : nowTime.getMonth() - 0 + 1,
          days  = nowTime.getDate() < 10 ? '0' + nowTime.getDate()  : nowTime.getDate() ;
        this.valueDateEnd  = nowTime.getFullYear() +'-'+ month +'-'+ days;
      },
      //选择当前日期开始
      handleDateStart(val){
        this.valueDateStart = val
        console.log('val:',val)
      },
      //选择当前日期结束
      handleDateEnd(){
        this.valueDateEnd = val
        console.log('valEnd:',val)
      },
      // 给window对象绑定resize事件,根据窗口大小适应屏幕
      handleResize(){
        if($(window).height() >= 1000){
          $('.index_center_bottom').css('height','800px')
        }else{
          $('.index_center_bottom').css('height','687px')
        }
      },
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
      //查询
      searchAll(){
        var startTime = new Date(this.valueDateStart).getTime()
        var endTime = new Date(this.valueDateEnd).getTime()
        console.log('datenow:',new Date(Date.now() - 1000*60*60*24))
        if(startTime>endTime){
          this.$message({message:'选择结束时间必须大于开始时间'})
          var nowTime = Date.now() - 1000*60*60*24
          const month  = nowTime.getMonth() - 0 + 1 < 10 ? '0' + (nowTime.getMonth() - 0 + 1) : nowTime.getMonth() - 0 + 1,
            days  = nowTime.getDate() < 10 ? '0' + nowTime.getDate()  : nowTime.getDate() ;
          this.valueDateEnd  = nowTime.getFullYear() +'-'+ month +'-'+ days;
          return
        }
        this.CarsHistoryArr = []
        this.getCarsHistoryData(this.valueDateStart,this.valueDateEnd)
      },
      async getCarsHistoryData(startDate,endDate){
        const res = await reqHistoryCarsInformationNKData(startDate,endDate)
        // const res = await http.post('http://10.88.195.89:8083/carPlater/getHistoryCarData',{startDate,endDate})
          if(res&&res.data.ret==='200'){
              this.CarsHistoryArr = res.data.historyList
            console.log('this.CarsHistoryArr:',this.CarsHistoryArr)
          }
      },
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
				position:fixed;
				top:60px;
				left:40px;
				cursor:pointer;
        background: url(../../assets/images/index_back.png) no-repeat;
			}
			.buttonDateOne {
				width: 90px;
				height: 40px;
        line-height: 40px;
				position:fixed;
				top:60px;
				left:170px;
				cursor:pointer;
			}
			.buttonDateTwo {
				width: 90px;
				height: 40px;
        line-height: 40px;
				position:fixed;
				top:60px;
				left:340px;
				cursor:pointer;
			}
			.buttonSearch {
				width: 50px;
				height:30px;
				position:fixed;
				top:65px;
				left:520px;
        line-height: 30px;
        background: gradient(linear, left top, left bottom, from(#4CDDED), to(#0088FE));
        background: linear-gradient(to top, #4CDDED, #0088FE);
        background: -ms-linear-gradient(to top, #4CDDED, #0088FE);
        border-radius: 5px;
        cursor:pointer;
        font-size: 14px;
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
    /*6s页面上面盒子*/
    &_center{
      width: 100%;float: left;min-height:calc(100% - 15px);margin-right: 15px;margin-top: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      background: rgba(39,69,111,0.3);
      border: 1px solid rgba(255,255,255,0.1);

      &_top{
        display: flex;
        width:100%;
        /*background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);*/
        /*margin-top: 15px;*/
        padding: 15px 15px 0 15px;
        .iconbg{
          display: flex;
          flex: 1;
          background:#2A4B85;
          border-radius: 0 20px 0 0;
        }
        .first{
          flex: 2;
        }
        .second{
          flex: 4;
        }
        .third{
          flex: 2;
        }
        .forth{
          flex: 2;
        }
        .five{
          flex: 2;
        }
        .sixth{
          flex: 3;
        }
        .home_title{
          padding-left: 0px;
          padding-right: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 45px;
          line-height: 40px;
        }
        &_main{
          height: 45px;
          display: flex;
          justify-content: center;
          &_Cars{
            width: 100%;
            height: 40%;
            margin-right: 0px;
            &_module {
              width: 100%;
              height: 100%;
              text-align: center;
              & > p {
                width: 100%;
                margin-left: 0%;
                height: 40px;
                line-height: 43px;
                font-weight: bold;
                font-size: 16px;
                overflow: hidden;
                color: #53E3FD;
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

        }
        /*background-color: #eee;*/
      }
      /*6s页面下面盒子*/
      &_bottom{
        width:100%;
        /*background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);*/
        /*margin-top: 15px;*/
        padding: 0 15px 15px 15px;
        height: 687px;
        .scrollDiv{
          display: flex;
          &>div{
            height: 45px;
          }
        }
        .iconbg{
          display: flex;
          flex: 1;
          background:rgba(42,75,133,0.4);
        }
        .first{
          flex: 2;
        }
        .second{
          flex: 4;
        }
        .third{
          flex: 2;
        }
        .forth{
          flex: 2;
        }
        .five{
          flex: 2;
        }
        .sixth{
          flex: 3;
        }
        .home_title{
          padding-left: 0px;
          padding-right: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 45px;
          line-height: 40px;
        }
        &_main{
          height: 35px;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          &_Cars{
            width: 100%;
            height: 40%;
            margin-right: 0px;
            &_module {
              width: 100%;
              height: 100%;
              text-align: center;
              & > p {
                width: 100%;
                margin-left: 0%;
                height: 35px;
                line-height: 35px;
                /*font-weight: bold;*/
                font-size: 16px;
                overflow: hidden;
                color: #53E3FD;
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

        }
        /*background-color: #eee;*/
      }
    }


    /deep/ .el-range-input {
      background-color:rgb(19, 44, 83)!important;
      color: #2F96EF!important;
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
      width: 145px;
    }
    /deep/ .el-picker-panel{
      background:rgb(19, 44, 83)!important;
    }
    /deep/.el-range-editor{
      background-color:#285e8c!important;
    }
  }
</style>
