
import Vue from 'vue';
import FastClick from 'fastclick';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router';
import store from './store';

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
