import Vue from 'vue'

import 'normalize.css/normalize.css'

import FastClick from 'fastclick';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // 权限控制 router钩子

Vue.config.productionTip = false

// 连点防止
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}

// 加载其他库
Vue.use(ElementUI)


new Vue({
	router,
	store,
}).$mount('#app')
