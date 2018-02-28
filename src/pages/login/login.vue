<template>
  <div class="login">
    <h1>{{ test }}</h1>
    <h1>{{ msg }}</h1>
    <p>userRoles: {{ userRoles }}</p>
    <button @click="login"> Login </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to login',
      test: this.$store.state.login,
      userRoles: this.$store.getters.userRoles,
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
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
