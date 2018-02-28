import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')
const test = r => require.ensure([], ()=> r(require('../pages/test/test')), 'test')


export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
      //地址为空时跳转home页面
      {
          path: '',
          redirect: '/home'
      },
      //首页
      {
          path: '/home',
          name: '首页',
          component: home
      },
      //登录注册页
      {
          path: '/login',
          name: '登陆页',
          component: login
      },
      //测试页
      {
        path: '/test',
        name: '测试页',
        component: test,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
        },
    },
  ]
}]