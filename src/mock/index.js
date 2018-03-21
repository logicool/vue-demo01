import Mock from 'mockjs'
import loginAPI from './login'
// import tableAPI from './table'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/user\/routerInfo\.*/, 'get', loginAPI.getUserRoutes)

// 列表相关


export default Mock