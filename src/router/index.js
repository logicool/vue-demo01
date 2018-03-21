import Vue from 'vue';
import VueRouter from 'vue-router';

import {routerMode} from '@/config/env';

const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(VueRouter)

/* 容器 */
import Container from '@/pages/container/Container';

// 后端路由的前端映射
export const remoteRoutes = {
  Container,
  table: _import('demo/table'),
  demo1: _import('demo/demo1')
}

export const staticRoutes = [
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
  {
    path: '/form',
    component: Container,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('demo/form'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
];

export const errorRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

// 配置路由
const router = new VueRouter({
	staticRoutes,
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