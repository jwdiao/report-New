<template>
  <div class="login_page fillcontain bg">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <img src="./images/logo.png" alt="">
          <p style="text-shadow: 1px 1px 0px #39205f6b;">三现系统</p>
        </div>
        <el-form ref="loginForm" :model="loginData" :rules="rules" style="margin-top: 20px;">
          <el-form-item prop="username">
            <i></i>
            <el-input placeholder="请输入登录账号" v-model="loginData.username"><span></span></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <i></i>
            <el-input type="password" v-model="loginData.password" placeholder="请输入登录密码" @keyup.enter.native="login()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :plain="true" class="submit_btn" @click.native="login()">登 &nbsp; 陆</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import $http from '../../api/http'
  import axios from 'axios'
  // import CryptoJS from 'crypto-js'


  export default {
    data(){
      return{
        loginData: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      ...mapActions([
        'loginInAction'
      ]),
      //DES加密 Pkcs7填充方式
     /* encryptByDES(message, key){
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
      },
      //DES解密
      decryptByDES(ciphertext, key){
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        // direct decrypt ciphertext
        const decrypted = CryptoJS.DES.decrypt({
          ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
      },*/
      async login () {
        this.$refs.loginForm.validate(async (valid) => {
          if (!valid) return;
          const {username, password} = this.loginData
          let loginStatus = false;
          // const formData = new FormData();
          // formData.append('loginAccount',username);
          // formData.append('loginPwd',password);

          /**
           * 加密应用：
           * const _key = username     const _password = password
           * 加密：let xx = this.encryptByDES(_password,_key) // 输出：sHTd/9exYuk=
           * 解密：let yy = this.decryptByDES(xx,_key) // 输出： 123456
           */

          const formData = {
            loginAccount: username,
            loginPwd: password
            // loginPwd: this.encryptByDES(password,username) // 密码加密，后期放开
          }
          this.loginMethods(formData)
        });
      },
      async loginMethods (formData) {
        const res = await $http.post('http://10.19.8.22:9085/SanyBasicUser/login', formData);

        const dataInfo = res.data;
        const userInfo = dataInfo.data
        if (dataInfo.msg === 'ok') {
          this.$message({
            type: 'success',
            message: '登陆成功!'
          });
          let user = {
            username: userInfo.loginAccount,
            // password: userInfo.loginPwd,
            ipAddress: userInfo.ipAddress,
            port: userInfo.port,
            token: '789789'
          }
          // 登陆成功，把信息记录到localStorage存储中
          this.loginInAction(user)
          this.$router.push('/HomeGuideJK')
        } else {
          this.$message({
            type: 'error',
            message: dataInfo.msg
          })
        }
      }
    }
  }
</script>
<style scoped>
  /deep/ .el-input{
    text-align: right;
    border-radius: 5px;
    background-size: 20px;
    border: 1px solid #0e336a;
  }
  .el-form .el-form-item {
    background: rgba(3, 25, 58, 0.95);
  }
  .el-form .el-form-item i {
    width: calc(16% - 10px);
    background: #fff;
    position: absolute;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    height: calc(100% - 2px);
    left: 1px;
    top: 1px;
  }
  /deep/ .el-form .el-form-item:nth-child(1) i{
    background: #02163B url("./images/user.png") no-repeat 10px center;
  }
  /deep/ .el-form .el-form-item:nth-child(2) i{
    background: #02163B url("./images/close.png") no-repeat 10px center;
  }
  /deep/ .el-input__inner {
    background: none;
    width: 88%;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    color: #fff;
    border: 1px solid rgba(3, 25, 58, 0.1);
  }
  /deep/ .el-button--primary.is-plain {
    color: #fff;
    background: #0592e0;
    border-color: #058bd5;
  }
</style>
<style lang="less">
  @import '../../assets/css/mixin';
  .login_page{
    background-color: #324057;
  }
  .manage_tip{
    text-align: center;
    background: url("./images/buildbg.png") no-repeat center center;
    background-size: 100% 100%;
    img {
      width: 50px;
      height: auto;
      margin-bottom: 10px;
    }
    p{
      font-size: 23px;
      color: #fff;
      font-weight: 300;
    }
  }
  .bg {
    height: 100%;
    background: url("./images/login-bg.png") no-repeat;
    background-position: center;
    background-size: cover;
  }
  .form_contianer{
    .wh(300px, 300px);
    .ctp(300px, 300px);
    padding: 25px;
    margin-top: -242px;
    margin-left: -188px;
    border-radius: 5px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(77, 118, 194, 0.4);
    box-shadow: 17px 13px 40px rgba(3, 29, 68, 0.42);
    .submit_btn{
      width: 100%;
      font-size: 16px;
    }
  }
  .tip{
    font-size: 14px;
    color: red;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
  .el-message{  // 调整跳出框的显示位置
    top: 62%;
    left: 51.3%;
  }
</style>
