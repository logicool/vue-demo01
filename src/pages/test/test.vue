<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <h2>{{ test }}</h2>
    <p>
      语言版本: {{bowerInfo.language}}
    </p>
    <p>
      是否为移动终端: {{bowerInfo.versions.mobile}}
    </p>
    <p>
      ios终端: {{bowerInfo.versions.ios}}
    </p>
    <p>
      android终端: {{bowerInfo.versions.android}}
    </p>
    <p>
      是否为iPhone: {{bowerInfo.versions.iPhone}}
    </p>
    <p>
      是否iPad: {{bowerInfo.versions.iPad}}
    </p>
    <div class="main">
      <p>userRoles: {{ userRoles }}</p>
      <button @click="login"> Login </button>
      <router-link v-if="test.token" :to="{ name: '测试页', params: { token: test.token }}" replace>go next</router-link>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import { getBowerInfo } from '@/core/utils';
export default {
  name: 'test',
  props: ['token'],
  data () {
    return {
      msg: 'Welcome to test',
      test: this.$store.state.login,
      userRoles: this.$store.getters.userRoles,
      bowerInfo: {},
    }
  },
  methods:{
    // 登录按钮
    login(){
        this.doLogin();
    },
    ...mapActions([
        'doLogin'
    ]),
  },
  created(){
    let sys = getBowerInfo;
    //sys.browser得到浏览器的类型，sys.ver得到浏览器的版本
    this.bowerInfo = sys;
  },
  mounted() {
    // console.log(this.$router);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.test {  background: cyan;}
.main { 
    text-align: center; /*让div内部文字居中*/
    background-color: transparent;
    border-radius: 20px;
    width: 300px;
    height: 350px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: red;
}
</style>
