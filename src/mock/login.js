import { param2Obj } from '@/core/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'http://ww2.sinaimg.cn/mw690/3ea59eacjw1eebregipn8g207z07qgms.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'http://ww1.sinaimg.cn/mw690/3ea59eacjw1eebreej2jjg209n0920vs.gif',
    name: 'Normal Editor'
  }
}

const routeMap = {
  admin: [
    {
      path: '/demo',
      component: 'Container',  //Container,
      name: 'demo',
      meta: { title: 'Demo', icon: 'example' },
      children: [
        {
          path: 'index',
          component: 'table', //_import('demo/table'),
          name: 'table',
          meta: { title: 'Table', icon: 'table' }
        },
        {
          path: 'demo1',
          component: 'demo1', 
          name: 'demo1',
          meta: { title: 'Demo', icon: 'tree' }
        }
      ]
    },
  ],
  editor: [
    {
      path: '/demo1',
      component: 'Container',
      children: [{
        path: 'index',
        component: 'demo1',
        name: 'demo1',
        meta: { title: 'Demo', icon: 'tree' }
      }]
    },
  ],
}

export default {
  loginByUsername: config => {
    //   console.log('config',config, config.body);
    // const { username } = JSON.parse(config.body)
    return userMap[config.body]
  },
  getUserInfo: config => {
    //   console.log('config',param2Obj(config.url));
    const { token } = param2Obj(config.url)

    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success',

  getUserRoutes: config => {
    console.log(config, config.url)

    const { token } = param2Obj(config.url);

    console.log(token)
    if (routeMap[token]) {
      return routeMap[token]
    } else {
      return false
    }
  }
}