<template>
<div style="width:100%;height:100%;">
  <div class="cameraMonitoring">
    <div class="cameraMonitoring_header">
      <p class="title" @click="enterIndexPage('/HomeGuide')">北京三一桩机设备监控查询</p>
      <p class="time" v-text="currentTime"></p>
    </div>
    <div class="cameraMonitoring_main">
      <el-row :gutter="20" style="height:100%">
        <el-col :span="8" style="height:100%">
          <div class="cameraMonitoring_left">
            <div class="cameraMonitoring_form">
              <div class="cameraMonitoring_condition common_select">
                <el-row :gutter="8">
                  <el-col :span="6">
                      <p class="cameraMonitoring_formTitle">一级工艺</p>
                      <el-select
                        v-model="craftValue"
                        placeholder="请选择"
                        @change="craftChange"
                        size="mini">
                        <el-option
                          v-for="item in craftOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content">
                      <p class="cameraMonitoring_formTitle">二级工艺</p>
                      <el-select v-model="craftTwoValue" placeholder="请选择" size="mini">
                        <el-option
                          v-for="item in craftTwoOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content">
                      <p class="cameraMonitoring_formTitle">事业部</p>
                      <el-select
                      v-model="careerValue"
                      @change="careerChange"
                      placeholder="请选择"
                      size="mini">
                        <el-option
                          v-for="item in careerOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content">
                      <p class="cameraMonitoring_formTitle">子公司</p>
                      <el-select
                      v-model="subCompanyValue"
                      @change="subCompanyChange"
                      placeholder="请选择"
                      size="mini">
                        <el-option
                          v-for="item in subCompanyOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content">
                      <p class="cameraMonitoring_formTitle">厂房</p>
                      <el-select
                      v-model="factoryValue"
                      @change="factoryChange"
                      placeholder="请选择"
                      size="mini">
                        <el-option
                          v-for="item in factoryOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content">
                      <p class="cameraMonitoring_formTitle">设备</p>
                      <el-select
                      v-model="deviceValue"
                      placeholder="请选择"
                      size="mini">
                        <el-option
                          v-for="item in deviceOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content">
                      <p class="cameraMonitoring_formTitle" style="visibility:hidden">设备</p>
                      <el-input v-model="cameraName" placeholder="摄像头名称" size="mini"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content">
                      <p class="cameraMonitoring_formTitle" style="visibility:hidden">设备</p>
                      <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="common_table cameraMonitoring_table">
                <div class="cameraMonitoring_table_head">
                <el-table
                  :data="[]"
                  border
                  size="mini"
                  style="width: 100%">
                  <el-table-column
                    label="序号"
                    width="60">
                  </el-table-column>
                  <el-table-column
                    min-width="135"
                    label="设备名称">
                  </el-table-column>
                  <el-table-column
                    min-width="50"
                    label="工艺">
                  </el-table-column>
                  <el-table-column
                    min-width="50"                 
                    label="厂房">
                  </el-table-column>
                  <el-table-column
                    min-width="50"
                    label="子公司">
                  </el-table-column>
                  <el-table-column
                    min-width="60"                 
                    label="事业部">
                  </el-table-column>
                </el-table>
                </div>
                <div style="height:360px;overflow:hidden;">
                  <el-scrollbar class="message" style="height:100%;">                  
                  <el-table
                    :data="tableData"
                    border
                    ref="deviceTable"
                    :highlight-current-row="true"
                    :show-header="false"
                    size="mini"
                    @row-click="handleRowClick"
                    style="width: 100%">
                    <el-table-column
                      prop="num"
                      label="序号"
                      width="60">
                    </el-table-column>
                    <el-table-column
                      prop="deviceName"
                      min-width="135"
                      label="设备名称">
                    </el-table-column>
                    <el-table-column
                      prop="artclassName"
                      min-width="50"
                      label="工艺">
                    </el-table-column>
                    <el-table-column
                      prop="regionName"
                      min-width="50"                 
                      label="厂房">
                    </el-table-column>
                    <el-table-column
                      prop="companyName"
                      min-width="50"
                      label="子公司">
                    </el-table-column>
                    <el-table-column
                      prop="departName" 
                      min-width="60"                 
                      label="事业部">
                    </el-table-column>
                  </el-table>
                  </el-scrollbar>
                </div>
                <div class="common_paginaton" v-show="tableData.length>0">
                  <el-pagination
                    style="margin-top:6px;"
                    :current-page="pagination.pageNum"
                    :page-sizes="[10, 20, 30]"
                    :page-size="pagination.pageSize"
                    layout="total,sizes, prev, pager, next"
                    :total="pagination.total"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                  >
                  </el-pagination>
                </div>
              </div>
            </div>
            <div class="cameraMonitoring_echarts">
              <div class="top">
                <span>设备实时电流图</span>
                <span v-for="(item) in list" :key="item.id" @click="spantab(item.id)" :class="{spantab:true,current:activespan==item.id}">
                  {{item.message}}
                </span>
              </div>
              <div class="bottom">
                <div id="elecbox" style="width:100%;height:100%;"></div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16" style="height:100%">
          <div class="grid-content cameraMonitoring_right">
            <div class="cameraMonitoring_audioTitle">
              <span>
                {{currentTableObj.deviceName}}

                <em v-show="currentTableObj.artclassName">【</em>
                {{currentTableObj.artclassName}}
                <em v-show="currentTableObj.artclassName">】</em>

                <em v-show="currentTableObj.childArtclassName">【</em>
                {{currentTableObj.childArtclassName}}
                <em v-show="currentTableObj.childArtclassName">】</em>

                <em v-show="currentTableObj.regionName">【</em>
                {{currentTableObj.regionName}}
                <em v-show="currentTableObj.regionName">】</em>

                <em v-show="currentTableObj.companyName">【</em>
                {{currentTableObj.companyName}}
                <em v-show="currentTableObj.companyName">】</em>

                <em v-show="currentTableObj.departName">【</em>
                {{currentTableObj.departName}}
                <em v-show="currentTableObj.departName">】</em>
                </span>
              <!-- <el-button type="primary">点击查看全屏</el-button> -->
            </div>
            <div class="cameraMonitoring_audio">
              <object classid="clsid:461284E8-135D-44B3-BD59-549150A773EC"
								id="spv" width="100%" height="100%"> </object>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

  <div class="cameraMonitoring_fullScreen">
      <el-row :gutter="20" style="height:100%">
        <el-col :span="16" style="height:100%">
          left
        </el-col>
        <el-col :span="8" style="height:100%">
          left
        </el-col>
      </el-row>
  </div>
</div>
</template>
<script>
import moment from 'moment'
import echarts from 'echarts'
import http from '../api/http'
import {InitSpvx, SetLocalParam, SetToolBar, playVideoByOcx, getPreviewParamByUuid} from '../assets/js/ocx.js'

export default {
  name: 'CameraMonitoring',
  data() {
    return {
      currentTime: '',
      // 工艺下拉数据 
      craftOptions: [
        
      ],
      craftValue: '',
      // 二级工艺
      craftTwoOptions: [
        
      ],
      craftTwoValue: '',
      // 事业部数据
      careerOptions: [],
      careerValue: '',
      // 子公司
      subCompanyOptions: [],
      subCompanyValue: '',
      // 厂房
      factoryOptions: [],
      factoryValue: '',
      // 设备
      deviceOptions: [],
      deviceValue: '',
      // 摄像头名称
      cameraName: '',
      // 列表数据
      tableData: [
        /* {
          name: '10B1区域加工中心',
          gongyi: '机加',
          changfang: '大挖',
          subCompany: '重机',
          shiyebu: '重机事业部'
        } */
      ],
      // 列表分页
      pagination: {
        pageNum: 1, // 当前页
        pageSize: 10, // 每页多少条
        total: 0 //总条数
      },
       // 电流
      list: [{
        id: 'la',
        message: 'la'
      }, {
        id: 'lb',
        message: 'lb'
      }, {
        id: 'lc',
        message: 'lc'
      }],
      activespan: 'la',
      myChartDidanliu: '',
      dianliuData: [], // 电流数据
      currentTableObj: {}, // 当前
      allEchartsArr: [],
      timerId: '' // 定时器
    }
  },
  created () {
    
  },
  mounted() {
    // 时间
    this.currentTime = this.getCurrentDateTime();
    setInterval(() => {
      this.currentTime = this.getCurrentDateTime();
    }, 1000)


    // 页面一进入获取所有表格数据
    const allTableParam = {
      query:{
          artclassId: this.craftValue || null, //一级工艺
          childArtclassId: this.craftTwoValue  || null, //二级工艺
          departId: this.careerValue  || null, // 事业部
          companyId: this.subCompanyValue  || null, //子公司
          regionId: this.factoryValue || null, // 厂房
          deviceCode: this.deviceValue || null//设备
      },
      pageNum: this.pagination.pageNum,
      pageSize: this.pagination.pageSize
    }
    this.getTableData(allTableParam);

     // 一级工艺下拉数据获取
    this.getCraftData()
    // 事业部下拉数据获取
    this.getCareerData()
    
    
    // oct start
    var ocxObj = document.getElementById('spv'), initRet = InitSpvx(ocxObj);
    if (initRet === 0) {
      // 设置OCX本地参数
      var localParamRet = SetLocalParam(ocxObj);
      if (localParamRet === 0) {
        // 设置工具栏
        setTimeout(function() {
          SetToolBar(ocxObj);
        }, 500);        
      }
    }
    // ocx end=====

    window.addEventListener('resize', this.handleResize); //给window对象绑定resize事件
	},
  methods: {
    handleResize() {
      //给每一个echarts添加resize事件
      this.allEchartsArr.forEach((ele, index) => {
        ele.resize();
      })
    },
    enterIndexPage(path) {
      // 路径从state中获取
      // window.location.href = `${this.$store.state.baseUrl}/sanyShebei` //测试
      this.$router.replace(path)
    },
    getCurrentDateTime() {
      return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    // 分页当前页改变事件
    handleCurrentChange(val) { // 当前页
      // console.log(`当前页: ${val}`);
      this.pagination.pageNum = val
      const allTableParam = {
        query:{
            artclassId: this.craftValue || null, //一级工艺
            childArtclassId: this.craftTwoValue  || null, //二级工艺
            departId: this.careerValue  || null, // 事业部
            companyId: this.subCompanyValue  || null, //子公司
            regionId: this.factoryValue || null, // 厂房
            deviceCode: this.deviceValue || null//设备
        },
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      this.getTableData(allTableParam);
    },
    // 每页多少条改变事件
    handleSizeChange(val) { // 每页多少条
      // console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      this.pagination.pageNum = 1;
      const allTableParam = {
        query:{
            artclassId: this.craftValue || null, //一级工艺
            childArtclassId: this.craftTwoValue  || null, //二级工艺
            departId: this.careerValue  || null, // 事业部
            companyId: this.subCompanyValue  || null, //子公司
            regionId: this.factoryValue || null, // 厂房
            deviceCode: this.deviceValue || null//设备
        },
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      this.getTableData(allTableParam);
    },
    // 获取一级工艺数据
    async getCraftData () {
      const res = await http.get('http://10.19.7.70:9074/SanySgMachine/getArtclass')
      if (res && res.data && res.data.code === 200) {
        const dataArr = res.data.data.reverse()
        let list = [
          {
            label: '请选择',
            value: ''
          }
        ]
        for(var i=0;i<dataArr.length;i++) {
          var obj = {
            label: dataArr[i].artclassName,
            value: dataArr[i].artclassId,
          }
          list.push(obj)
        }
        this.craftOptions = list
        /* this.craftOptions.shift({
          label: '请选择工艺',
          value: ''
        }) */
      }
      // console.log('获取一级工艺下拉', res)
    },
    // 一级工艺下拉
    async craftChange (id) {
      // console.log('一级工艺选中值：', id)
      this.craftTwoOptions=[{value:'',label:'请选择'}]
      this.craftTwoValue=''
      // 获取二级工艺
      const res = await http.post('http://10.19.7.70:9074/SanySgMachine/getChildArtclassByArtclassId',{artclassId: id})
      if (res && res.data && res.data.code === 200) {
        const dataArr = res.data.data
        const list = []
        for(var i=0;i<dataArr.length;i++) {
          var obj = {
            label: dataArr[i].childArtclassName,
            value: dataArr[i].childArtclassId,
          }
          list.push(obj)
        }
        list.unshift({
          value: '',
          label: '请选择'
        });
        this.craftTwoOptions = list
      }
    },
    // 获取事业部数据
    async getCareerData () {
      const res = await http.get('http://10.19.7.70:9074/SanySgMachine/getAllDepart')
      // console.log('获取事业部数据：', res)
      if (res && res.data && res.data.code === 200) {
        const dataArr = res.data.data
        let list = [
          {
            label: '请选择',
            value: ''
          }
        ]
        
        for(var i=0;i<dataArr.length;i++) {
          var obj = {
            label: dataArr[i].departName,
            value: dataArr[i].departId,
          }
          list.push(obj)
        }
        this.careerOptions = list
      }
    },
    // 空选择
    emptySelect(name){
      switch (name){
        case 'career'://如果事业部是空
          this.subCompanyOptions=[{value:'',label:'请选择'}]
          this.subCompanyValue=''
          this.factoryOptions=[{value:'',label:'请选择'}]
          this.factoryValue=''
          this.deviceOptions=[{value:'',label:'请选择'}],
          this.deviceValue=''
          break;
        case 'subCompany'://如果子公司是空
          this.factoryOptions=[{value:'',label:'请选择'}]
          this.factoryValue=''
          this.deviceOptions=[{value:'',label:'请选择'}],
          this.deviceValue=''
          break;
        case 'factory'://如果厂房是空
          this.deviceOptions=[{value:'',label:'请选择'}],
          this.deviceValue=''
            break;
        default:
          break;
      }
    },
    
    /**
     * num 下拉选中的id
     * type 类型
     * message 请选择文字
     * url 请求链接
     */
    async getOptions (id, type, message,url) {
      let params = {}

      // 事业部下拉获取子公司option
      if (type === 'subCompany') {
        params = {departId: id}
      }
      // 子公司下拉获取厂房option
      if (type === 'factory') {
        params = {companyId: id}
      }
      // 厂房下拉获取设备option
      if (type === 'regionId') {
        params = {regionId: id}
      }

      const res = await http.post(url,params)

      if (res && res.data && res.data.code === 200) {
        const dataArr = res.data.data
        const list = []
        dataArr.map((ele, index) => {
          if (type === 'subCompany') {
            const obj = {
              label: ele.companyName,
              value: ele.companyId,
            }
            list.push(obj)
          }
          if (type === 'factory') {
            const obj = {
              label: ele.regionName,
              value: ele.regionId,
            }
            list.push(obj)
          }
          if (type === 'device') {
            console.log("设备name:", ele.deviceName)
            const obj = {
              label: ele.deviceName,
              value: ele.deviceCode,
            }
            list.push(obj)
          }
        })
        list.unshift({
          value: '',
          label: message
        });
        if (type === 'subCompany') {
          this.subCompanyOptions = list
        }
        if (type === 'factory') {
          this.factoryOptions = list
        }
        if (type === 'device') {
          this.deviceOptions = list
        }
      }
    },
    // 事业部下拉
    async careerChange (id) {
      // console.log('事业部选中值：', id)
      this.emptySelect('career')
      this.getOptions(id, 'subCompany', '请选择','http://10.19.7.70:9074/SanySgMachine/getCompanyByDepartId');
      // 获取子公司
      /* const res = await http.post('/SanySgMachine/getCompanyByDepartId',{departId: id})
      if (res && res.status === 200) {
        const dataArr = res.data.data
        this.emptySelect('career')
        const list = []
        for(var i=0;i<dataArr.length;i++) {
          var obj = {
            label: dataArr[i].companyName,
            value: dataArr[i].companyId,
          }
          list.push(obj)
        }
        list.unshift({
          value: '',
          label: '请选择子公司'
        });
        this.subCompanyOptions = list
      } */
      
    },
    // 子公司下拉
    async subCompanyChange (id) {
      // console.log('子公司选中值：', id)
      this.emptySelect('subCompany')
      this.getOptions(id, 'factory', '请选择','http://10.19.7.70:9074/SanySgMachine/getRegionByCompanyid');
      // 获取厂房数据
      /* const res = await http.post('/SanySgMachine/getRegionByCompanyid',{companyId: id})
      console.log('获取厂房数据是：', res)
      if (res && res.status === 200) {
        const dataArr = res.data.data
        this.emptySelect('subCompany')
        const list = []
        for(var i=0;i<dataArr.length;i++) {
          var obj = {
            label: dataArr[i].regionName,
            value: dataArr[i].regionId,
          }
          list.push(obj)
        }
        list.unshift({
          value: '',
          label: '请选择厂房'
        });
        this.factoryOptions = list
      } */
    },
    // 厂房下拉
    async factoryChange (id) {
      // console.log('厂房选中值：', id)
      this.emptySelect('factory')
      this.getOptions(id, 'device', '请选择','http://10.19.7.70:9074/SanySgMachine/getDeviceByRegionId');
      // 获取设备数据
      /* const res = await http.post('/SanySgMachine/getDeviceByRegionId',{regionId: id})
      console.log('获取厂房数据是：', res)
      if (res && res.status === 200) {
        const dataArr = res.data.data
        this.emptySelect('factory')
        const list = []
        for(var i=0;i<dataArr.length;i++) {
          var obj = {
            label: dataArr[i].deviceName,
            value: dataArr[i].deviceCode,
          }
          list.push(obj)
        }
        list.unshift({
          value: '',
          label: '请选择设备'
        });
        this.deviceOptions = list
      } */
    },
    // 获取表格数据
    async getTableData (param) {
      const res = await http.post('http://10.19.7.70:9074/SanySgMachine/getSanySgMachineByCondition',param)
      // console.log('获取的搜索数据：', res)
      if (res && res.data && res.data.code === 200) {
        const result = res.data.data
        this.pagination = {
          pageNum: result.pageNum, // 当前页
          pageSize: result.pageSize, // 每页多少条
          total: result.total, // 总页数
        }
        result.list.forEach((ele,index)=>{
          ele.num = (this.pagination.pageNum-1)*this.pagination.pageSize+index+1;
        }) 
        this.tableData = result.list; // 表格列表

        // 获取ocx组件和电流
        if (this.tableData.length > 0) {
          // 默认选中第一项
          this.$refs.deviceTable.setCurrentRow(this.tableData[0])
          this.handleRowClick(this.tableData[0])
        }
      }
    },
    // 获取当前条的电流和摄像头

    // 点击搜索
    handleSearch () {
      console.log('一级工艺：', this.craftValue)
      console.log('二级工艺：', this.craftTwoValue)
      console.log('事业部：', this.careerValue)
      console.log('子公司：', this.subCompanyValue)
      console.log('厂房：', this.factoryValue)
      console.log('设备：', this.deviceValue)
      // console.log('摄像头名称：', this.cameraName)
      let params = {
        query:{
            artclassId: this.craftValue || null, //一级工艺
            childArtclassId: this.craftTwoValue  || null, //二级工艺
            departId: this.careerValue  || null, // 事业部
            companyId: this.subCompanyValue  || null, //子公司
            regionId: this.factoryValue || null, // 厂房
            deviceCode: this.deviceValue || null//设备
        },
        pageNum: 1,
        pageSize: 10
      }
      // debugger;
      this.getTableData(params);
    },
    // 点击切换电流
    spantab(id) {
      this.activespan = id;
      // console.log('当前点击的电流是：', this.activespan)
      this.dianliuData = []
      clearInterval(this.timerId)
      this.renderDianliu(this.currentTableObj.deviceUuid)
    },
    numPad(number, length) {
      return (''+number).padStart(length, 0)
    },
    getFormatTimeString(now) {
      var str1 = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
      var str2 = [this.numPad(now.getHours(), 2), this.numPad(now.getMinutes(), 2), this.numPad(now.getSeconds(), 2)].join(':')
      return str1 + " " + str2;
    },
    // 2分钟获取电流
    async getDianliuTowMinuteData (id, currentDian) {
      // debugger;
      const res = await http.post('http://10.19.7.70:9074/current/getNewCurrents',{deviceUuid: id});
      // console.log('获取的2分钟的电流数据：', result)
      if (res && res.data && res.data.code === 200) {
        const result = res.data
        let listArr = result.data
        for(var i=0;i<listArr.length;i++) {
          var obj = {}
          var newTime = new Date(listArr[i].timeStr)
          var time2 = this.getFormatTimeString(newTime)
          var yValue = ''
          if (currentDian == 'lb') {
            yValue = listArr[i].lb
          } else if (currentDian == 'lc') {
            yValue = listArr[i].lc
          } else {
            yValue = listArr[i].ia
          }
          if (yValue === null) {
            yValue = 0
          }
          obj.name = time2
          obj.value = [time2, yValue]
          this.dianliuData.push(obj)
        }
        console.log('dianliuData:', this.dianliuData)
        this.myChartDidanliu.setOption({
          series: [{
            data: this.dianliuData
          }]
        });
        // [
          //   { name: '2016/2/18 03:00:00', value: [ '2016/2/18 03:00:00', 363 ] },
          //   { name: '2016/2/18 03:00:00', value: [ '2016/2/18 04:00:00', 384 ] },
          //   { name: '2016/2/18 03:00:00', value: [ '2016/2/18 05:00:00', 371 ] },
          // ]
          // console.log("电流数组长度是：",this.dianliuData.length)
          if (this.dianliuData.length >= listArr.length) {
            this.timerId = setInterval(() => {
              this.dianliuData.shift();
              this.getDianliuDataOneSecond(id, this.activespan); 
            }, 1000); 
          }
      }
    },
    // 1秒钟获取电流
    async getDianliuDataOneSecond (id, currentDian) {
      const res = await http.post('http://10.19.7.70:9074/current/getNewCurrent',{deviceUuid: id});
      if (res && res.data && res.data.code === 200 && res.data.data) {
        const result = res.data
        // console.log('获取的1s的电流数据：', result)
        let currentObj = result.data
        var obj = {}
        var newTime = new Date(currentObj.timeStr)
        var time2 = this.getFormatTimeString(newTime)
        var yValue = ''
        if (currentDian == 'lb') {
          yValue = currentObj.lb
        } else if (currentDian == 'lc') {
          yValue = currentObj.lc
        } else {
          yValue = currentObj.ia
        }
        if (yValue === null) {
          yValue = 0
        }
        obj.name = time2
        obj.value = [time2, yValue]
        let len = this.dianliuData.length;

        // 为了去除数组中重复数据中
        if(len === 0) {
          this.dianliuData.push(obj)
        }
        if(len>0 && this.dianliuData[len-1].name && this.dianliuData[len-1].name !== obj.name){
          this.dianliuData.push(obj)
        }
        /* else if(len === 0) {
          this.dianliuData.push(obj)
        }   */   
        // console.log('dianliuData:', this.dianliuData)
        this.myChartDidanliu.setOption({
          series: [{
            data: this.dianliuData
          }]
        });
      }
    },
    async renderDianliu(deviceUuid) {

      this.myChartDidanliu = echarts.init(document.getElementById("elecbox"))
      var option = {
        title: {
          text: '动态数据 + 时间坐标轴',
          show: false
        },
        legend: {
          show: false,
          top: 0,
          right: 10,
          textStyle: {
            color: '#D3DAE2'
          }
        },

        grid: {
          top: 20,
          bottom: 20,
          left: 40,
          right: 40,
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            params = params[0];
            var date = new Date(params.name);
            return this.getFormatTimeString(date);
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          axisLine: {  // 控制x轴线的样式
            lineStyle: {
              type: 'solid',
              color: '#56affb',
              width: '1'
            }
          },
          axisPointer: {
            type: 'shadow'
          },
          axisTick: { // 控制x轴坐标刻度不显示
            show: false
          },
          axisLabel : {
            textStyle: {
              color: '#2DD7EC'
            },
            // showMaxLabel: true, //是否显示最大 tick 的 label
            showMinLabel: true,
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLine: {  // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#56AFFB',
                width: '1' }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#556BA2'
              }
            },
            splitLine: { //网格线
              show: false,
              lineStyle: {
                color: ['#56AFFB'],
                width: 1,
                type: 'dotted'
              }
            }
          /* splitLine: {
            show: false
          },
          axisLine: { //轴线相关配置
            show: false //是否显示坐标轴轴线
          },
          axisLabel: {
            color: '#9EA2AB' //轴线文字相关配置
          } */
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          lineStyle: {
            color: 'blue'
            // color: 'rgba(255,235,12, 1)'
          },
          data: [],
          // data: [
          //   { value: [ '2016/2/18 03:00:00', 363 ] },
          //   { value: [ '2016/2/18 04:00:00', 384 ] },
          //   { value: [ '2016/2/18 05:00:00', 371 ] },
          // ]
        }]
      };
      this.myChartDidanliu.setOption(option);
      this.allEchartsArr.push(this.myChartDidanliu)


      // 刚开始获取最新的2分钟之内的数据
      this.getDianliuTowMinuteData(deviceUuid, this.activespan);

      // 定时器间隔1s请求1次
      /* setInterval(() => {
        if (this.dianliuData.length >= 120) {
          this.dianliuData.shift();
        }      
        this.getDianliuDataOneSecond(deviceUuid, this.activespan);
      }, 1000); */
    },
    async renderElec() {
      function numPad(number, length) {
        return (''+number).padStart(length, 0)
      }
      function getFormatTimeString(now) {
        var str1 = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
        var str2 = [numPad(now.getHours(), 2), numPad(now.getMinutes(), 2), numPad(now.getSeconds(), 2)].join(':')
        return str1 + " " + str2;
      }
      function randomData2() {
        var now = +new Date();
        var oneSecond = 1000;
        var value = Math.random() * 1000;
        now = new Date(+now + oneSecond);
        value = value + Math.random() * 21 - 10;
        return {
          name: now.toString(),
          value: [
            getFormatTimeString(now),
            Math.round(value)
          ]
        }
      }
      function randomData3() {
        // var now = +new Date(+now - 120000);
        // var oneSecond = 1000;
        // var value = Math.random() * 1000;
        now = new Date(+now + oneSecond);
        value = value + Math.random() * 21 - 10;
        return {
          name: now.toString(),
          value: [
            getFormatTimeString(now),
            Math.round(value)
          ]
        }
      }
      var data = [];
      var now = +new Date()-120000;
      var oneSecond = 1000;
      var value = Math.random() * 1000;
      console.log('data:',data)
      for (var i = 0; i < 120; i++) {
        this.dianliuData.push(randomData3());
      }
      // debugger
      // data.push(randomData2());

      // 刚开始获取最新的2分钟之内的数据
      // this.getDianliuData('2H3ZTYWSXIU1', '10', this.activespan);

      this.myChartDidanliu = echarts.init(document.getElementById("elecbox"))
      var option = {
        title: {
          text: '动态数据 + 时间坐标轴',
          show: false
        },
        legend: {
          show: false,
          top: 0,
          right: 10,
          textStyle: {
            color: '#D3DAE2'
          }
        },

        grid: {
          top: 20,
          bottom: 20,
          left: 40,
          right: 40,
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            params = params[0];
            var date = new Date(params.name);
            return this.getFormatTimeString(date);
            // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          axisLine: { //轴线相关配置
            show: true //是否显示坐标轴轴线
          },
          axisLabel: {
            color: '#9EA2AB' //轴线文字相关配置
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLine: { //轴线相关配置
            show: false //是否显示坐标轴轴线
          },
          axisLabel: {
            color: '#9EA2AB' //轴线文字相关配置
          }
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          lineStyle: {
            color: 'blue'
          },
          // data: data,
          data: this.dianliuData,
          // data: [
          //   { value: [ '2016/2/18 03:00:00', 363 ] },
          //   { value: [ '2016/2/18 04:00:00', 384 ] },
          //   { value: [ '2016/2/18 05:00:00', 371 ] },
          // ]
        }]
      };
      this.myChartDidanliu.setOption(option);
      var serIntervalId = setInterval(() => {
        if (this.dianliuData.length >= 120) {
          this.dianliuData.shift();
        }
        // this.getDianliuData('2H3ZTYWSXIU1', '1', this.activespan);
        this.dianliuData.push(randomData2());

        this.myChartDidanliu.setOption({
          series: [{
            data: this.dianliuData
          }]
        });
      }, 1000);
    },
    // OCX组件 =======start
    
    /**
     * @since 播放视频
     * @param textInfo
     *            表头显示内容
     * @param camerauuid
     *            摄像头uuid
     * @returns
     */
    playVideo(camerauuid, companyCode, ocxId) {
      if (camerauuid) {
        var	viewPath = getPreviewParamByUuid(camerauuid, 0, false, companyCode);
        // OCX播放
        if (viewPath) {
          var ocxObj = document.getElementById(ocxId);
          var playRet = playVideoByOcx(ocxObj, viewPath);
          if (playRet === 0) {
            // document.querySelector('td[data-camerauuid="' + camerauuid + '"]').parentNode.classList
                // .add('active');
          }
        }
      }
    },

    async handleRowClick (row, event, column) {
      this.currentTableObj = row; // 当前行

      // 获取电流
      this.dianliuData = []
      clearInterval(this.timerId)
      this.activespan = 'la'
      this.renderDianliu(this.currentTableObj.deviceUuid)

      // 获取ocx视频
      const res = await http.post('http://10.19.7.70:9074/SanySgMachine/getCameraUuid',{id: row.id})
      if (res && res.data && res.data.code === 200) {
        var resultUuid = res.data.data[0].uuid
        var companyCode = res.data.data[0].companyId
        console.log('获取的resultUuid是:', resultUuid)
        console.log('获取的companyCode是:', companyCode)
        this.playVideo(resultUuid, companyCode, 'spv');
      }   
    }
    
    // OCX组件 =======end
  }
}
</script>
<style lang="scss" scoped>

.cameraMonitoring{
  &_table{
    /deep/ .el-scrollbar__wrap{overflow-x: hidden}
    /deep/ .el-table .cell{white-space: nowrap;}
  }
  &_table_head{
    /deep/ .el-table__body-wrapper{display:none}
  }
  font-size:12px;
  height:100%;width:100%;
  background-image: url(../assets/images/index_bg.png);
  background-size: 100% 100%;
  color: rgb(255, 255, 255);
  background-repeat: no-repeat;overflow: hidden;
  &_header{
    height: 106px;text-align: center;
    .title{
      font-size:0.44rem;color:#fff;cursor: pointer;font-weight:bold;padding-top:20px;
      width:50%;margin:0 auto;
    }
    .time{
      font-size:32px;
      color:#ababab;position: absolute;top:50px;right:30px;z-index: 10;width: 230px;text-align: left;
      font-family: fontnameUnidreamLED !important;
    }
  }
  &_main{
    // border:1px solid red;
    height: calc(100% - 106px);
    padding-top:10px;
  }
  // left
  &_left{
    // border:1px solid #ff0;
  height:100%;}
  &_form{
    background-color: rgba(39, 69, 111, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 15px;height:582px;
  }
  &_formTitle{margin-bottom:5px;}
  &_condition{
    [class*=el-col-]{margin-bottom:10px;}
  }
  &_echarts{
      margin: 15px 0px;
			// display: flex;
			// flex-direction: column;
			background-color: rgba(39, 69, 111, 0.3);
			border: 1px solid rgba(255, 255, 255, 0.1);
			padding: 15px;
			flex: 1;
      height: calc(100% - 612px);
			.top {
				height: 30px;

				span {
					display: inline-block;
					vertical-align: middle;
					cursor: pointer;
				}

				span:nth-of-type(1) {
					color: #D2D1CC;
					font-size: 18px;
					font-weight: bold;
					margin-right: 30px;
				}

				.spantab {
					width: 35px;
					height: 15px;
					border-radius: 3px;
					background: #333C4D;
					text-align: center;
					margin-right: 5px;
				}

				.spantab.current {
					background: #26D9F9;
				}
			}

			.bottom {
				// flex: 1;
        // height:300px;
        width: 100%;height: calc(100% - 30px);
			}
  }




  &_right{
    // border:1px solid blue;
    background-color: rgba(39, 69, 111, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
    padding:10px;height: calc(100% - 15px);margin-bottom:15px;
  }
  &_audioTitle{
    padding: 7px 10px 7px;height:56px;display: flex;align-items: center;
    background: rgba(0, 0, 0, 0.35);
    font-size:20px;position: relative;
    .el-button--primary {
        position: absolute;
        right: 10px;
        padding: 10px 8px;
    }
  }
  &_audio{
    width:100%;height: calc(100% - 61px);margin-top:5px;
  }


  // 全屏
  &_fullScreen{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(8, 33, 60, 0.9);
    z-index: 20;
    display: none;
  }
}
</style>