<template>
  <div class="leftTopPersonNum">
    <div class="leftWarp">
      <p class="titleText1 titleText">计件总人数
        <em class="titleTotalNum" v-if="info && info.totalNum">{{info.totalNum}}<em>人</em></em>
        <em class="titleTotalNum" v-else>0<em>人</em></em>
      </p>
      <p class="titleText1">劳务人数
        <em class="titleTotalNum" v-if="info && info.totalNum">{{info.totalNum}}<em>人</em></em>
        <em class="titleTotalNum" v-else>0<em>人</em></em>
      </p>
      <p class="titleText1">冗余人数
        <em class="titleTotalNum" v-if="info && info.totalNum">{{info.totalNum}}<em>人</em></em>
        <em class="titleTotalNum" v-else>0<em>人</em></em>
      </p>
    </div>
    <!--几个人数-->
    <div class="statusList">
      <ul class="statusListTop">
        <li>
          <p class="statusTitle"> </p>
          <div class="statusDiv">
            计件人数
          </div>
          <div class="statusDiv2">
            劳务人数
          </div>
        </li>
        <li>
          <p class="statusTitle">派工人数</p>
          <div class="statusDiv">
            <em class=" statusCount num" v-show="info&&info.totalPlanNum" v-text="info.totalPlanNum" style="letter-spacing:-1px;">0</em>
            <em class="statusCount num" v-show="!info || !info.totalPlanNum" style="letter-spacing:-1px;">0</em>
            <em class="statusDanw">人</em>
            <div class="dayNightNumBox">
              <div class="line"></div>
              <div class="con">
                <p>
                  白
                  <span v-text="info.dayPlanTotalNum">0</span>
                </p>
                <p>
                  夜
                  <span v-text="info.nightPlanTotalNum">0</span>
                </p>
              </div>
            </div>
          </div>
          <div class="statusDiv2">
            <em class=" statusCount num" v-show="info&&info.totalPlanNum" v-text="info.totalPlanNum" style="letter-spacing:-1px;">0</em>
            <em class="statusCount num" v-show="!info || !info.totalPlanNum" style="letter-spacing:-1px;">0</em>
            <em class="statusDanw">人</em>
            <div class="dayNightNumBox">
              <div class="line"></div>
              <div class="con">
                <p>
                  白
                  <span v-text="info.dayPlanTotalNum">0</span>
                </p>
                <p>
                  夜
                  <span v-text="info.nightPlanTotalNum">0</span>
                </p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p class="statusTitle">实时派工</p>
          <div class="statusDiv">
            <em class="statusCount num" style="letter-spacing:-1px;">{{info.planNum}}</em>
            <em class="statusDanw">人</em>
            <em style="display: inline-block;vertical-align: middle;font-size: 0.24rem;color: #02c9fc;margin-left: 10px;">
              ({{isDayOrNigint.substring(0,1) === 'N' ? '夜' : '白'}})


            </em>
          </div>
          <div class="statusDiv2">
            <em class="statusCount num" style="letter-spacing:-1px;">{{info.planNum}}</em>
            <em class="statusDanw">人</em>
            <em style="display: inline-block;vertical-align: middle;font-size: 0.24rem;color: #02c9fc;margin-left: 10px;">
              ({{isDayOrNigint.substring(0,1) === 'N' ? '夜' : '白'}})


            </em>
          </div>
        </li>
        <li>
          <p class="statusTitle">考勤人数</p>
          <div class="statusDiv">
            <em class="statusCount" v-show="info&&info.userRecordNum" v-text="info.userRecordNum"></em>
            <em class="statusCount" v-show="!info || !info.userRecordNum">0</em>
            <em class="statusDanw">人</em>
          </div>
          <div class="statusDiv2">
            <em class="statusCount" v-show="info&&info.userRecordNum" v-text="info.userRecordNum"></em>
            <em class="statusCount" v-show="!info || !info.userRecordNum">0</em>
            <em class="statusDanw">人</em>
          </div>
        </li>
        <li>
          <p class="statusTitle">有效在岗人数</p>
          <div class="statusDiv">
            <em class="statusCount" v-show="info&&info.validNum" v-text="info.validNum"></em>
            <em class="statusCount" v-show="!info || !info.validNum">0</em>
            <em class="statusDanw">人</em>
          </div>
          <div class="statusDiv2">
            <em class="statusCount" v-show="info&&info.validNum" v-text="info.validNum"></em>
            <em class="statusCount" v-show="!info || !info.validNum">0</em>
            <em class="statusDanw">人</em>
          </div>
        </li>
        <li>
          <p class="statusTitle">迟到</p>
          <div class="statusDiv">
            <em class="statusCount chidao" v-if="info && info.lateNum" v-text="info.lateNum"></em>
            <em class="statusCount" v-else>0</em>
            <em class="statusDanw">人</em>
          </div>
          <div class="statusDiv2">
            <em class="statusCount chidao" v-if="info && info.lateNum" v-text="info.lateNum"></em>
            <em class="statusCount" v-else>0</em>
            <em class="statusDanw">人</em>
          </div>
        </li>
        <li>
          <p class="statusTitle">离岗</p>
          <div class="statusDiv">
            <em class="statusCount chidao" v-if="info && info.outNum" v-text="info.outNum"></em>
            <em class="statusCount" v-else>0</em>
            <em class="statusDanw">人</em>
          </div>
          <div class="statusDiv2">
            <em class="statusCount chidao" v-if="info && info.outNum" v-text="info.outNum"></em>
            <em class="statusCount" v-else>0</em>
            <em class="statusDanw">人</em>
          </div>
        </li>
        <li>
          <p class="statusTitle">未到</p>
          <div class="statusDiv">
            <em class="statusCount kuanggong" v-if="info && info.absentNum" v-text="info.absentNum"></em>
            <em class="statusCount" v-else>0</em>
            <em class="statusDanw">人</em>
          </div>
          <div class="statusDiv2">
            <em class="statusCount kuanggong" v-if="info && info.absentNum" v-text="info.absentNum"></em>
            <em class="statusCount" v-else>0</em>
            <em class="statusDanw">人</em>
          </div>
        </li>
        <li>
          <p class="statusTitle">未派工</p>
          <div class="statusDiv">
          <em class="statusCount tiaoban" v-if="info && info.abnormalNum" v-text="info.abnormalNum"></em>
          <em class="statusCount" v-else>0</em>
          <em class="statusDanw">人</em>
        </div>
          <div class="statusDiv2">
            <em class="statusCount tiaoban" v-if="info && info.abnormalNum" v-text="info.abnormalNum"></em>
            <em class="statusCount" v-else>0</em>
            <em class="statusDanw">人</em>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CheckingLeftTopNumHistory',
    props: [ 'info' , 'isDayOrNigint' ]
  }
</script>
<style lang="scss" scoped>
  .leftTopPersonNum{
    .leftWarp{
      display: flex;
      .titleText1{
        font-size: 0.20rem;
        color: #fff;
        padding-left: 20px;
        .titleTotalNum{
          color: #01cbff;
          font-size: 0.30rem;
          vertical-align: middle;
          em{
            font-size: 0.19rem;
            color: #30adff;
            vertical-align: bottom;
          }
        }
      }
      .titleText2{
        color: #CDCDCD;
        .titleTotalNum{
          color: #CDCDCD;
          em{
            color: #CDCDCD;
          }
        }
      }
    }
    .leftWarp p:nth-child(2){
      margin-left: 40px;
      .titleTotalNum{
        color: #32CD71;
        em{
          color: #32CD71;
        }
      }
    }
    .leftWarp p:nth-child(3){
      margin-left: 40px;
      .titleTotalNum{
        color: #FFD101;
        em{
          color: #FFD101;
        }
      }
    }
    .statusList {
      /*height: calc(100% - 0.35rem);*/
      height: 155px;
      display: flex;
      flex-direction: column;
      .statusListTop {
        flex: 1;
        display: flex;
        align-items: center;
        background: url("../../assets/images/num_bg.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 10px;
        padding-left: 15px;
        li {
          flex: 1;
          text-align: center;
          .statusTitle {
            font-size: 0.18rem;
            color: #d5d5d5;
            margin-top: 5px;
          }
          .statusDiv {
            margin-bottom: 5px;
            color: #d5d5d5;
            font-size: 0.18rem;
            .dayNightNumBox{
              line-height: 20px;
              font-size: 0.15rem;
              color: #02c9fc;
              display: inline-block;
              vertical-align: middle;
              padding-left:3px;
              .line{
                width:1px;
                height:34px;
                background: #02c9fc;
                vertical-align: middle;
                display: inline-block;
              }
              .con{
                vertical-align: middle;
                display: inline-block;
                padding-left: 4px;
                span{
                  margin-left: -3px;
                  font-size: 0.16rem;
                  font-family: fontnameRegular;
                }
              }
            }
          }
          .statusDiv2 {
            margin-bottom: 5px;
            color: #d5d5d5;
            font-size: 0.18rem;
            .dayNightNumBox{
              line-height: 20px;
              font-size: 0.15rem;
              color: #32CD71;
              display: inline-block;
              vertical-align: middle;
              padding-left:3px;
              .line{
                width:1px;
                height:34px;
                background: #32CD71;;
                vertical-align: middle;
                display: inline-block;
              }
              .con{
                vertical-align: middle;
                display: inline-block;
                padding-left: 4px;
                span{
                  margin-left: -3px;
                  font-size: 0.16rem;
                  font-family: fontnameRegular;
                }
              }
            }
            .statusCount {
              font-size: 0.32rem;
              color: #32CD71;
              vertical-align: bottom;
            }
            .statusDanw {
              font-size: 0.19rem;
              color: #32CD71;
              vertical-align: bottom;
            }
          }
          .statusCount {
            font-size: 0.32rem;
            color: #30adff;
            vertical-align: bottom;
          }
          .statusDanw {
            font-size: 0.19rem;
            color: #30adff;
            vertical-align: bottom;
          }
        }
      }
      .statusListTop li:nth-child(1){
        margin-top: 25px;
        flex: 0.7;
        .statusDiv2{
          margin-top: 20px;
        }
      }
    }
  }
</style>
