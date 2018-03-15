/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * 
 */

let baseUrl = 'https://www.easy-mock.com/mock/5a9508669b817962797a3dbb/VD'; 
let routerMode = 'hash'; // history 后端支持的话可以开history模式去掉#

export {
	baseUrl,
	routerMode,
}