<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <canvas id="test-canvas" width="300" height="200">
      
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'test',
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
</style>
