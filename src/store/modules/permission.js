import { staticRoutes, errorRoutes, remoteRoutes } from '@/router/index'
import { getUserRoutes } from '@/api/login'

/*
 {
    path: '/table',
    component: 'Container',  //Container,
    children: [{
      path: 'index',
      component: 'table', //_import('demo/table'),
      name: 'table',
      meta: { title: 'Table', icon: 'table' }
    }]
  }
*/

/**
 * 递归过滤异步路由表，映射component
 * @param asyncRouterMap
 */
function filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.map(route => {
      if (route.component) {
          route.component = remoteRoutes[route.component];
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children)
        }
      }
      return route
    })
    console.log('accessedRouters', accessedRouters); // for debug
    return accessedRouters
  }

const permission = {
  state: {
    routers: staticRoutes,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = staticRoutes.concat(routers).concat(errorRoutes);
    }
  },
  actions: {
    GenerateRoutes({ commit }, token) {
      return new Promise(resolve => {
        getUserRoutes(token).then(response=>{
            let accessedRouters = filterAsyncRouter(response.data);
            commit('SET_ROUTERS', accessedRouters)
            resolve()
        })
      })
    }
  }
}

export default permission
