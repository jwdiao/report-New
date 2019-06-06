<template>
  <div class="helloContainer">
    <div class="titleface">人脸数据</div>
    <ul class="operationContainer">
      <li class="leftOperation conItem">
        <p class="itemHeader">操作区域</p>
        <el-form
          :inline="true"
          size="medium"
          class="common-form-inline searchInfo"
        >
          <el-form-item label="员工工号">
            <el-input v-model="perCode" placeholder="请输入员工工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100px" >查询</el-button>
            <el-button type="primary" style="width: 100px" @click="addDialogClick" >新增</el-button>
          </el-form-item>
        </el-form>
        <!--主列表-->
        <div class="common-table">
          <el-table header-row-class-name="table-header" stripe  border  style="width: 100%" height="600"
                    :data="tableData">
            <el-table-column prop="number" label="序号" width="50"></el-table-column>
            <el-table-column prop="proCode" label="工号">  </el-table-column>
            <el-table-column prop="proImage" label="图像">
              <template slot-scope="scope">
                <el-button size="mini" type="text"
                           @click="lookImageInfo(scope.$index, scope.row)">111</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
            <el-table-column prop="feature" label="特征"> </el-table-column>
            <el-table-column prop="operate" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="text"
                           @click="deleteInfo(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 新增弹窗 -->
        <el-dialog
          title="新增管理"
          :close-on-click-modal="false"
          :visible.sync="dialogVisibles"
          @close="handleDialogClose"
          width="520px">
          <div class="addVisitorDialog">
            <el-form
              :inline="true"
              ref="addOuterWorkerInfo"
              size="medium"
              label-width="100px"
              class="marginTop20 common-form-inline addVisitorDialog_form">
              <el-form-item label="工号" prop="username">
                <el-input v-model="addProCode" placeholder="请输入工号"></el-input>
              </el-form-item>
              <el-form-item label="上传照片" style="width:700px" prop="photo">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card" id="formBiao"
                  ref="upload"
                  :on-preview="handlePictureCardPreview"
                  :on-change="handleChange"
                  :http-request="uploadSectionFile"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-form>
            <!-- 表单 end -->
          </div>
          <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialogCancle">取 消</el-button>
      <el-button class="btnIsBlue" type="primary" @click="handleDialogConfirm">确 定</el-button>
    </span>
        </el-dialog>
      </li>
      <li class="rightShow conItem">
        <p class="itemHeader">图像预览区域</p>
        <div class="rightImg">
          <img :src="imgUrl" alt="">
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  import http from '../api/http'
  import {regIDCard} from '../api'
export default {
  name: 'FaceIndex',
  data () {
    return {
      perCode:'',//员工工号
      addProCode:'',//新增员工工号
      tableData:[
        {number:1,proCode:'10010011',proImage:'',status:'01',feature:'正面',}
      ],
      dialogVisibles:false,//新增弹窗
      dialogImageUrl: '',//上传图片显示地址
      dialogVisible: false,//上传图片显示
      imgUrl:'',//图片预览区地址

    }
  },
  mounted(){
    this.getText()
  },
  methods:{
    //列表中删除逻辑
    deleteInfo(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //列表中查看图像
    lookImageInfo(){

    },
    //测试接口
    async getText(){
      const formData = {
        loginAccount: 'diaojw',
        loginPwd: 'Diaojunwen123',
        parkCode:'回龙观园区',
      }
      const res = await regIDCard(formData)
    },
    //新增按钮
    addDialogClick(){
      this.dialogVisibles = true
      this.addProCode = ''
      document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'inline-block';
      this.$refs.upload.clearFiles()
    },
    handleDialogClose(){this.dialogVisibles = false},
    handleDialogCancle(){this.dialogVisibles = false},
    //新增弹窗确定按钮
    handleDialogConfirm(){
      this.dialogVisibles = false
       this.$refs.upload.submit();//相当于调用了uploadSectionFile函数
    },
    //上传照片--start--
    handleRemove(file, fileList) {
      console.log(file, fileList);
      document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'inline-block';
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file,fileList){
      this.imgUrl = file.url
      console.log('this.imgUrl :',this.imgUrl )
      document.getElementsByClassName('el-upload--picture-card')[0].style.display= 'none';
    },
    uploadSectionFile(param){//覆盖默认的上传值，可以自定义上传行为
      var fileObj = param.file;
      var form = new FormData(document.getElementById('formBiao'));
      form.append("file", fileObj);
      //this.fileUpload(form);
    },
    //上传文件携带form对象,与后台交互
    async fileUpload(formData){
      const res = await http.postFileData('/user/SanyBasicShrUser/fileUpload',formData);
      if(res&&res.data.code===200){
        this.$message('上传成功')
      }else{
        this.$message({
          type: 'warning',
          message: '上传失败'
        });
      }
    },
    //上传照片--end--
  },
}
</script>

<style lang="scss" scoped>
  .helloContainer{
    width: 100%;
    height: 100%;
  }
  .titleface{
    width: 100%;height: 100px;line-height:100px;background: #99A9BF;
    text-align: center;margin-bottom: 15px;font-size: 30px;
  }
  .operationContainer{
    height: calc(100% - 115px);;
    display: flex;
    .conItem{
      background: #E5E9F2;
      .itemHeader{
        width: 100%;height:50px;background: #8094ac;
        text-align: center;font-size: 24px;
        line-height: 50px;
      }
    }
    .leftOperation{
      flex: 1.5;
      margin-right: 15px;
      .searchInfo{
        margin-top: 15px;text-align: left;
      }
    }
    .rightShow {
      flex: 1;
      .rightImg{
        width: 100%;height:100%;
        img{
          width: 100%;
        }
      }
    }
  }
  /*上传样式*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /*element样式*/
 /deep/ .el-input__inner{
    width: 80%;
  }
 /deep/ .el-dialog__header{
   border-bottom: 1px solid #DCDFE6;
  }
 /deep/ .el-dialog__footer{
   border-top: 1px solid #DCDFE6;
  }
</style>

