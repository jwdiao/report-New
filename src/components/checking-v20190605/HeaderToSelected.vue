<template>
  <div class="index_selectDialog" v-show="selectDialogShow">
    <ul>
      <li>
        <p class="title">事业部</p>
        <div class="common_select">
          <el-select
            v-model="careerValue"
            @change="careerChange"
            placeholder="请选择"
          >
            <el-option
              v-for="item in careerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </li>
      <li>
        <p class="title">子公司</p>
        <div class="common_select">
          <el-select
            v-model="companyValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in companyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </li>
      <li>
        <span class="btn confirm" @click="handleConfirm">确定</span>
        <span class="btn cancel" @click="handleCancel">取消</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
  export default {
    name: 'HeaderToSelected',
    props:['selectDialogShow'],// 是否显示顶部事业部子公司弹窗
    data () {
      return {
        careerValue: '', // 点击标题下拉事业部选中值
        careerOptions: [ // 事业部下拉option
          {label:'重机事业部',value:'zhongji'},
          {label:'泵送事业部',value:'bengsong'},
          {label:'重能事业部',value:'zhongneng'},
          {label:'重起事业部',value:'zhongqi'},
          {label:'重卡事业部',value:'zhongka'},
          {label:'港机事业部',value:'gangji'},
          {label:'筑工事业部',value:'zhugong'},
          {label:'重装事业部',value:'zhongzhuang'},
        ],
        companyValue: '', // 子公司选中值
        companyCode: '', // 子公司选中值的code码
        companyOptions: [], // 子公司option

      }
    },
    created () {

    },
    mounted () {
      this.$store.commit('changeCenterNameMut','') // 加工中心为''

      let subompanyName = localStorage.getItem('companyNameCheckingSelectedSubcompany')
      axios.defaults.baseURL = localStorage.getItem('ipAddrCheckingSelectedSubcompany')
      // if(subompanyName){
      //   subompanyName = localStorage.setItem('companyNameCheckingSelectedSubcompany')
      // }
      this.$store.commit('changeSubcompanyMut',subompanyName)
    },
    watch: {
    },
    methods: {

      careerChange (val) {
        // console.log(`选择的事业部是：${val}`)
        this.companyOptions = []
        this.companyValue = ''
        if (val === 'bengsong') {
          this.companyOptions = [
            {label:'长沙泵送',value:'长沙泵送',},
            {label:'邵阳湖汽',value:'邵阳湖汽'},
            {label:'娄底中源',value:'娄底中源'},
            {label:'娄底中兴',value:'娄底中兴'},
            {label:'益阳中阳',value:'益阳中阳'},
            {label:'常德路机',value:'常德路机'},  //20190510
            {label:'三一西北',value:'三一西北'},  //20190603
            {label:'三一动力',value:'三一动力'},  //20190603
          ]
        } else if (val === 'zhongji') {
          this.companyOptions = [
            {label:'北京桩机',value:'北京桩机'},
            {label:'常熟索特',value:'常熟索特'},
            {label:'临港中挖',value:'临港中挖'}, //20190510
            // {label:'昆山重机',value:'昆山重机'},
            {label:'重机华湘',value:'重机华湘'},
            {label:'重机大挖',value:'重机大挖'},
            {label:'重机小挖',value:'重机小挖'},
            {label:'杭州力龙',value:'杭州力龙'},//20190529
          ]
        } else if (val === 'zhongneng') {
          this.companyOptions = [
            {label:'三一重能',value:'三一重能'},
            {label:'三一叶片',value:'三一叶片'},
            {label:'三一电机',value:'三一电机'}
          ]
        } else if (val === 'zhongqi') {
          this.companyOptions = [
            {label:'宁乡起重机',value:'宁乡起重机'},
            {label:'湖州装备',value:'湖州装备'}
          ]
        } else if (val === 'zhongka') {
          this.companyOptions = [
            {label:'三一重卡',value:'三一重卡'}
          ]
        } else if (val === 'gangji') {
          this.companyOptions = [
            {label:'长沙港机',value:'长沙港机'},
            {label:'珠海港机',value:'珠海港机'}
          ]
        } else if (val === 'zhugong') {
          this.companyOptions = [
            {label:'快而居',value:'快而居'},
          ]
        }else if (val === 'zhongzhuang') {
          this.companyOptions = [
            {label:'沈阳重装',value:'沈阳重装'},
          ]
        }
      },
      handleConfirm () {
        // console.log('选择的子公司是：',this.companyValue)
        if (!this.careerValue) {
          this.$message({
            type: 'warning',
            message: '请选择事业部!',
            customClass: 'messageInfo'
          });
          return;
        }
        if (this.companyValue === '') {
          this.$message({
            type: 'warning',
            message: '请选择子公司!'
          });
          return;
        }

        let BaseUrlReq = ''
        let code = ''
        if (this.companyValue === '长沙泵送'){
          BaseUrlReq = 'http://10.0.91.50:8083'
          // BaseUrlReq = 'http://10.88.190.36:8083'   //薄志成ip，20190524联调
          code = '0201'
        } else if (this.companyValue === '邵阳湖汽'){
          BaseUrlReq = 'http://10.13.136.22:8083'
          code = '0206'
        } else if (this.companyValue === '娄底中源'){
          BaseUrlReq = 'http://10.14.0.17:8083'
          code = '0202'
        } else if (this.companyValue === '北京桩机') {
          BaseUrlReq = 'http://10.19.7.69:8083'
          // BaseUrlReq = 'http://10.88.195.89:8083'  //20190524高杰调试
          code = '0303'
        } else if (this.companyValue === '常熟索特') {
          BaseUrlReq = 'http://10.15.150.21:8083'
          code = '0306'
        } else if (this.companyValue === '三一重能') {
          BaseUrlReq = 'http://10.19.7.70:8083'
          code = '0701'
        } else if (this.companyValue === '宁乡起重机') {
          BaseUrlReq = 'http://10.16.1.65:8083'
          code = '0502'
        }else if (this.companyValue === '湖州装备') {
          BaseUrlReq = 'http://10.29.77.240:8083'
        } else if (this.companyValue === '三一重卡') {
          BaseUrlReq = 'http://10.192.29.12:8083'
          code = '0101'
        } else if (this.companyValue === '娄底中兴') {
          BaseUrlReq = 'http://10.193.88.6:8083'
          code = '0303'
        } else if (this.companyValue === '三一叶片') {
          BaseUrlReq = 'http://10.19.220.179:8083'
        } else if (this.companyValue === '三一电机') {
          BaseUrlReq = 'http://10.19.7.70:8084'
        } else if (this.companyValue === '益阳中阳') {
          BaseUrlReq = 'http://10.22.33.100:8083'
        } else if (this.companyValue === '常德路机') {
          BaseUrlReq = 'http://10.21.23.101:8083'
        }  else if (this.companyValue === '三一西北') {
          BaseUrlReq = 'http://10.193.32.247:8083'
        } else if (this.companyValue === '三一动力') {
          BaseUrlReq = 'http://10.11.141.230:8083'
        }else if (this.companyValue === '长沙港机') {
          BaseUrlReq = 'http://10.1.91.1:8083'
        } else if (this.companyValue === '临港中挖') {
          BaseUrlReq = ' http://10.11.16.187:8084'
        } else if (this.companyValue === '昆山重机') {
          BaseUrlReq = 'http://10.11.16.187:8083'
        } else if (this.companyValue === '重机华湘') {
          BaseUrlReq = 'http://10.11.16.187:8087'
        } else if (this.companyValue === '重机大挖') {
          BaseUrlReq = 'http://10.11.16.187:8085'
        } else if (this.companyValue === '重机小挖') {
          BaseUrlReq = 'http://10.11.16.187:8086'
        } else if (this.companyValue === '杭州力龙') {
          BaseUrlReq = 'http://10.11.16.187:8082'
        } else if (this.companyValue === '珠海港机') {
          BaseUrlReq = 'http://10.193.4.244:8083'
        }else if (this.companyValue === '快而居') {
          BaseUrlReq = 'http://10.192.20.245:8083'
        } else if (this.companyValue === '沈阳重装') {
          BaseUrlReq = 'http://10.194.21.234:8083'
        }
        this.companyCode = code;
        axios.defaults.baseURL = BaseUrlReq
        localStorage.setItem('ipAddrCheckingSelectedSubcompany',BaseUrlReq)
        localStorage.setItem('companyNameCheckingSelectedSubcompany',this.companyValue)
        // localStorage.setItem('codeCheckingSelectedSubcompany',BaseUrlReq)

        clearInterval(this.refreshDataId)

        // this.selectDialogShow = false // 关闭弹窗
        var loadingData = true
        this.$emit('selectDialogShowName',{flag:!loadingData,loadingData:loadingData})

        this.$store.commit('changeCenterNameMut','') // 重置加工中心为全部
        this.$store.commit('changeSubcompanyMut',this.companyValue) // 选中的子公司
        this.$store.commit('changeSelectTabCheckingBetweenMut','kaoqin') // 中间选中的tab设置为考勤列表



      },
      // 关闭顶部选择事业部弹窗
      handleCancel () {
        // this.selectDialogShow = false
        var loadingData = false
        this.$emit('selectDialogShowName',{flag:loadingData,loadingData:loadingData})
      },
    }
  }
</script>
<style lang="scss" scoped>
  .index_selectDialog{
    background-color: rgba(9, 20, 40, 0.8);border:1px solid #6bb9d5;
    position:fixed;top:55px;z-index:999;left:50%;transform: translateX(-50%);
    padding:28px 60px 48px;
    width:420px;margin:0 auto;font-size:12px;
    .title{font-size:20px;color:#fff;margin-top:20px;}
    .common_select{margin-top:10px;}
    .el-select{
      width:100%;
    }
    /deep/ .el-input__inner {
      height: 38px !important;
      line-height: 38px !important;
    }
    .btn{
      height:40px;line-height:40px;display: inline-block;font-size:20px;
      text-align: center;border-radius: 4px;margin-top:30px;width:48%;
    }
    .confirm{
      background-color: #0088ff;color:#fff;cursor: pointer;
    }
    .cancel{
      margin-left:4%;
      background-color: #b3b3bd;color:#0c1932;cursor: pointer;
    }
  }
</style>
