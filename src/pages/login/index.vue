<template>
  <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="loginForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input :type="pwdType" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin"></el-input>
      <span class="show-pwd" @click="showPwd">
        <svg-icon icon-class="eye" />
      </span>
    </el-form-item>

    <el-checkbox v-model="checked" @click="savePwd" class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" v-loading.fullscreen.lock="logining">登录</el-button>
    </el-form-item>

  </el-form>

</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        account: "admin",
        password: "admin"
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true,
      logining: false,
      pwdType: "password"
    };
  },
  watch: {},
  methods: {
    savePwd() {
      this.checked = !this.checked;
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    // 登录按钮
    handleLogin(event) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let loginParams = {
            username: this.loginForm.account,
            password: this.loginForm.password,
            saveInfo: this.checked
          };
          console.log(loginParams)
          this.$store.dispatch('Login', loginParams).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
            this.$notify({
                title: "登录失败",
                message: "用户名或密码错误，请联系管理员！",
                type: "error"
              });
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  created() {},
  mounted() {
    // console.log(this.$router);
  }
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
$bg:#eee;
$icolor: #889aa4;
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: $bg;
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
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: $bg;
    border-radius: 5px;
    color: $icolor;
  }
  .show-pwd {
    position: absolute;
    right: 15px;
    top: 2px;
    font-size: 16px;
    color: $icolor;
    cursor: pointer;
    user-select: none;
  }
}
</style>
