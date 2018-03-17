import Vue from 'vue';
import VueRouter from 'vue-router';

import {routerMode} from '@/config/env';

const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(VueRouter)

/* 容器 */
import Container from '@/pages/container/Container';


const routes = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },

  {
    path: '/',
    component: Container,
    redirect: '/home',
    name: 'Home',
    hidden: true,
    children: [{
      path: 'home',
      component: _import('home/index')
    }]
  },
];

// const routes = [{
//     path: '/',
//     component: App, //顶层路由，对应index.html
//     children: [ //二级路由。对应App.vue
//       //地址为空时跳转home页面
//       {
//           path: '',
//           redirect: '/login'
//       },
//       //首页
//       {
//           path: '/home',
//           name: '首页',
//           component: home,
//           meta: {
//             requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
//           },
//       },
//       //登录注册页
//       {
//           path: '/login',
//           name: '登陆页',
//           component: login
//       },
//       //测试页
//       {
//         path: '/test',
//         name: '测试页',
//         component: test,
//       },
//       // 404页
//       {
//           path: '/page404',
//           name: '404页',
//           component: page404
//       },
//       {
//         path: '*', //其他页面，强制跳转到404页面 可以配合后端做路由设置，这里暂时前端控制；@MARK
//         redirect: '/page404'
//       }   
//     ]
// }];


// 配置路由
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
    if (from.meta.keepAlive) {
      from.meta.savedPosition = document.body.scrollTop;
    }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})


export default router;