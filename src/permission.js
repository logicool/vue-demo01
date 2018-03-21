import router from './router'
import store from './store'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

import { Message } from 'element-ui'
import { getToken } from '@/core/auth'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' }) // 跳转到home页
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetUserInfo').then(res => { // 拉取用户信息
                    // const token = res.data.token
                    // store.dispatch('GenerateRoutes', { token }).then(() => { // 根据后端权限生成可访问的路由表
                    //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                    //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    // })
                    next()
                }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error('验证失败,请重新登录')
                        next({ path: '/login' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})