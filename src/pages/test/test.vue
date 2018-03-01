<template>
  <div class="test">
    <div id="content">我是内容<br />我也是内容</div>
        <div id="actor">我是演员</div>
    </div>
</template>

<script>
export default {
  name: 'test',
  props: ['token'],
  data () {
    return {
      msg: 'Welcome to test'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.test { height: 400px; background: #c00;}
#content, #actor { display: inline-block; vertical-align: middle;}
#content { font-size: 12px; color: #fff;}
#actor {height: 400px; font-size: 0;}
</style>
