<template>
  <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="loginForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="login" v-loading.fullscreen.lock="logining">登录</el-button>
    </el-form-item>

  </el-form>

</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        account: '',
        password: '',
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: true,
      logining: false,
    }
  },
  watch: {
  },
  methods:{
    // 登录按钮
    login(event){
      this.$refs.loginForm.validate((valid)=> {
        if (valid) {
          this.logining = true;
          let loginParams = {
            username: this.loginForm.account,
            password: this.loginForm.password
          }
          this.doLogin(loginParams).then(res => {
            console.log('doLogin', res);
            this.logining = false;
            if(res){
              this.$router.push({path: '/home'})
            } else {
              this.$notify({
                          title: '登录失败',
                          message: '用户名或密码错误，请联系管理员！',
                          type: 'error'
                        });
            }
          })
        }
      })
    },
    ...mapActions([
        'doLogin'
    ]),
  },
  created(){

  },
  mounted() {
    // console.log(this.$router);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
