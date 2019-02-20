<template>
  <div class="index">
    <div class="index_top">
      <div class="index_imgText">
        <span class="title">历史版本</span>
      </div>
      <em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
    </div>
    <div class="index_main">
      <div class="index_left">
        <div class="index_left_top">
          <div style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);">
            <p class="home_title" style="background:rgba(58, 96, 133, 0.9);display: flex;justify-content: space-between;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span> 人员考勤</span>
            </p>
            <div class="home_title" style="font-weight: lighter;cursor: pointer"  @click="goTo('/CheckingV1')">v1.0</div>
            <div class="home_title" style="font-weight: lighter;cursor: pointer"  @click="goTo('/CheckingV2')">v2.0</div>
            <div class="home_title" style="font-weight: lighter;cursor: pointer"  @click="goTo('/CheckingV3')">v3.0</div>
            <div class="home_title" style="font-weight: lighter;cursor: pointer"  @click="goTo('/CheckingV4')">v4.0</div>
          </div>
        </div>
      </div>
      <div class="index_center">
        <div class="index_left_top">
          <div style=" border-radius:5px;background-color: rgba(42, 75, 133, 0.3);">
            <p class="home_title" style="background:rgba(58, 96, 133, 0.9);display: flex;justify-content: space-between;border-radius:5px 5px 0 0;">
              <span><span style="margin-left:5px;font-size: 32px; color: #02c9fc;">•</span> 车辆管理</span>
            </p>
            <div class="home_title" style="font-weight: lighter;cursor: pointer" @click="goTo('/CarsV10')">v1.0-2018-12-17</div>
            <div class="home_title" style="font-weight: lighter;cursor: pointer" @click="goTo('/CarsV20')">v2.0-2019-01-31</div>
            <div class="home_title" style="font-weight: lighter;cursor: pointer" @click="goTo('/CarshlgV21')">v2.1-2019-02-14</div>
            <div class="home_title" style="font-weight: lighter;cursor: pointer" @click="goTo('/CarsHLGV31')">v3.0-2019-02-18</div>

          </div>
        </div>
      </div>
      <div class="index_right">

      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import $ from 'jquery'

  export default {
    name: 'cars',
    components: {
    },
    data() {
      return {}
    },
    created() {},
    mounted() {
      // 顶部日期时间
      this.currentTime = this.getCurrentDateTime();
      setInterval(() => {
        this.currentTime = this.getCurrentDateTime();
      }, 1000)

    },
    methods: {
      goTo(path){
        this.$router.replace(path)
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
      width: 25%;float: left;height:100%;padding-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      /*6s页面左侧上部*/
      &_top{
        width:100%;
        height: 100%;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        .home_title{
          padding-left: 0px;
          padding-right: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 55px;
          line-height: 45px;
        }
        &_main{
          /*height: calc(100% - 47px);*/
          height: 110px;
          display: flex;
          /*margin: 15px auto 0 ;*/
          justify-content: center;
          &_Cars{
            width: calc((100% - 45px)/0.7 );
            height: 40%;
            margin-right: 100px;
            &_module {
              width: 100%;
              height: 100%;
              padding: 10px 0;
              &_num {
                color:#01cbff;
                text-align: center;
                line-height: 40px;
                font-size: 40px;
                font-family: fontnameRegular;
                vertical-align: middle;
                display: inline-block;
                margin-bottom: 3%;
              }
              & > p {
                width: 100%;
                margin-left: 15%;
                margin-bottom: 6%;
                height: 40px;
                line-height: 30px;
                font-weight: 300;
                font-size: 20px;
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

        }
        /*background-color: #eee;*/
      }
      /*cars页面左侧下部*/
      &_bottom{
        height: calc(100% - 197px);
        display: flex;flex-direction: column;
        width:100%;
        overflow:hidden;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        .abnormal-item{
          flex: 1;
          .home_title{
            padding-left: 0px;
          }
          .inOrOut{
            width: 100%;
            height: calc(100% - 48px);
          }
          .carType{
            width: 100%;
            height: calc(100% - 48px);
          }
        }



        /deep/ .el-table_1_column_1{
          color: #fff03e;
        }
        .pagesInfo{
          text-align: center;
        }
        .home_title{
          height: 32px;
          line-height: 32px;
          /*padding-left: 24px;*/
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
            width: 30%;
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
            width:24%;
            height:22px;
            box-sizing:border-box;
            line-height:0px;
            font-size: 16px;
            text-align: center;
          }
          span:nth-child(1){
            width:8%;
          }
          span:nth-child(2){
            width:25%;
          }
          span:nth-child(3){
            width:45%;
          }
          span:nth-child(4){
            width:16%;
          }

        }
        &_main{
          height: calc(85% - 50px);
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
                width: 24%;
                height: auto;
                font-size: 14px;
                box-sizing:border-box;
                line-height:0px;
                text-align: center;
                user-select: auto;
              }
              span:nth-child(1){
                width:8%;
              }
              span:nth-child(2){
                width:25%;
              }
              span:nth-child(3){
                width:45%;
              }
              span:nth-child(4){
                width:16%;
              }
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
    /*6s页面左侧盒子*/
    &_center{
      width: 25%;float: left;height:100%;margin-right: 15px;
      display: flex;flex-direction: column;flex-shrink: 0;
      &_top{
        display: flex;
        width:100%;
        background: rgba(39,69,111,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        padding: 15px;
        &>div{
          flex: 1;
        }
        .home_title{
          padding-left: 0px;
          padding-right: 24px;
          font-weight: bold;
          font-size: 21px;
          height: 55px;
          line-height: 45px;
        }
        &_main{
          /*height: calc(100% - 47px);*/
          height: 118px;
          display: flex;
          /*margin: 15px auto 0 ;*/
          justify-content: center;
          &_Cars{
            width: calc((100% - 45px)/0.7 );
            height: 40%;
            margin-right: 100px;
            &_module {
              width: 100%;
              height: 100%;
              padding: 10px 0;
              &_num {
                color:#01cbff;
                text-align: center;
                line-height: 40px;
                font-size: 40px;
                font-family: fontnameRegular;
                vertical-align: middle;
                display: inline-block;
                margin-bottom: 3%;
              }
              & > p {
                width: 100%;
                margin-left: 15%;
                margin-bottom: 6%;
                height: 40px;
                line-height: 30px;
                font-weight: 300;
                font-size: 20px;
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

        }
        /*background-color: #eee;*/
      }
      /*cars页面左侧下部*/
      &_bottom{
        height: calc(100% - 197px);
        display: flex;flex-direction: column;
        width:100%;
        overflow:hidden;
        background: rgba(39,69,111,0.4);
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 15px;
        &_titleSitch{
          display: flex;
          &>p{
            width: 250px; text-align:center;border-radius:5px 5px 0 0;color: #466DC8;
            height: 45px;
            line-height: 45px;
            font-weight: bold;
            font-size: 21px;
          }
          .isShow{
            color: #fff;
            background:rgba(42, 75, 133, 0.3);
          }
        }
        &_searchContent{
          background:rgba(39,69,111,0.4);
          height: 100%;
        }
        /deep/ .el-table_1_column_1{
          color: #fff03e;
        }
        .pagesInfo{
          text-align: center;
        }
        .search{
          width: 100%;
          /*float: right;*/
          margin-top: -5px;
          text-align: right;
          overflow: hidden;
          .module {
            width: 30%;
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
            width:24%;
            height:22px;
            box-sizing:border-box;
            line-height:0px;
            font-size: 16px;
            text-align: center;
          }
          span:nth-child(1){
            width:8%;
          }
          span:nth-child(2){
            width:25%;
          }
          span:nth-child(3){
            width:45%;
          }
          span:nth-child(4){
            width:16%;
          }

        }
        &_main{
          height: calc(85% - 50px);
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
                width: 24%;
                height: auto;
                font-size: 14px;
                box-sizing:border-box;
                line-height:0px;
                text-align: center;
                user-select: auto;
              }
              span:nth-child(1){
                width:8%;
              }
              span:nth-child(2){
                width:25%;
              }
              span:nth-child(3){
                width:45%;
              }
              span:nth-child(4){
                width:16%;
              }
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
      width: 25%;float: left;height:100%;
    }
    /deep/ .el-range-input {
      background-color:rgb(19, 44, 83)!important;
      color: #2F96EF!important;
    }
  }
</style>
