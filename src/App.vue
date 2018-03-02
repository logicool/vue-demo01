<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
	body {
		margin: 0px;
		padding: 0px;
		// background: rgba(3, 133, 219, 0.5);
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-size: 14px;
		-webkit-font-smoothing: antialiased;
	}
	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
  .router-fade-enter-active, .router-fade-leave-active {
	  	transition: all .3s ease;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
