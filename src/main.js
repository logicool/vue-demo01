// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import routes from './router'
import store from './store'
import {routerMode} from './config/env'

Vue.config.productionTip = false

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}

Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	
})

// 用钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
      if (store.state.login.token) {  // 通过vuex state获取当前的token是否存在
        next();
      }
      else {    //如果没有权限,重定向到登录页,进行登录
        next({
          path: '/login',
          // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
    else { //不需要权限 直接跳转
      next();
    }
})

new Vue({
	router,
	store,
}).$mount('#app')
