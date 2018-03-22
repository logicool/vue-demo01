# vue-demo01

> A Vue.js project

练习用vue全家桶工程
vue2 + vue-router + vuex 

# 组件

> axios 网络请求
  ~~fastclick 连续点击~~
  elementUI 饿了么UI库

* 按需加载区分了生产环境和开发环境，防止hot reload时间过久；
* 图片用了 svg-sprite-loader 的webpackage插件，用来根据导入的 svg 文件自动生成 symbol 标签并插入 html；
* token 采用了 js-cookie 轻量库存储，毕竟storage有些浏览器是明文保存的
* normalize.css浏览器一致性
* 由于目前 keep-alive 和 router-view 是强耦合的，而且查看文档和源码不难发现 keep-alive 的 include 默认是优先匹配组件的 name ，所以在编写路由router和路由对应的 view component 的时候一定要确保 两者的name 是完全一致的。(切记 name 命名时候尽量保证唯一性 切记不要可某些组件的命名重复了 不然会递归引用最后内存溢出等问题)

# 路由懒加载

> 区分开发和生产环境

当你的项目页面越来越多之后，在开发环境之中使用 lazy-loading 会变得不太合适，每次更改代码触发热更新都会变得非常的慢。所以建议只在生成环境之中使用路由懒加载功能。

```  
@/pages/下的 .vue 文件都会被打包。不管你是否被依赖。所以这样就产生了一个副作用，就是会多打包一些可能永远都用不到js代码。当然这只会增加 dist 文件的大小，但不会对线上代码产生任何的副作用。
```

# 动态加载路由&后端获取权限路由

1. router下声明动态页面
2. 获取后端路由配置
3. 遍历替换声明的页面
4. vuex保存

> 几个坑

>> ~~动态添加路由的时候 `{path: '*', redirect: '/404'}` 要最后push进去~~

>> store commit的时候要深拷贝，否则路由变化的时候不会通过mutation改变路由状态

>> addRoutes 的时候也要深拷贝，因为vue-router不会通过提交mutation改变路由对象

>> 路由获取异常的时候很尴尬！！

# 自动打包路由

1. 约定pages页的命名规则；（如：xxxxIndex.vue）
2. vue的script的name必须填写，并且和页面名称一致；（如下）
   ``` 
    export default {
          name: 'xxxxIndex',
        }
   ```




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build:report
```

