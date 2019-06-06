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
          {label:'北京总部',value:'zhongbu'},
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
        if (val === 'zhongbu') {
          this.companyOptions = [
            {label:'北京总部',value:'北京总部',},
          ]
        } else if (val === 'zhongji') {
          this.companyOptions = [
            {label:'北京桩机',value:'北京桩机'},
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
        if (this.companyValue === '北京总部'){
          BaseUrlReq = 'http://10.19.8.22:8099'
        } else if (this.companyValue === '快而居') {
          BaseUrlReq = 'http://10.192.20.245:8083'
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
        this.$store.commit('changeSubcompanyMutTime',this.companyValue) // 选中的子公司（计时）
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
