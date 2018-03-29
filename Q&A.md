> vue 一些问题记录，毕竟大脑有限

# main.js import scss失败 及 .vue 中引用 scss失败

```

  main.js import '@/styles/index.scss'
  App.vue style @import '@/styles/index.scss' 

```
>用vue-cli架子搭建完成后，安装了sass-loader，配置了webpack后出现了问题，main.js引用scss文件失败，vue的style中引用成功，删掉webpack配置后，问题解决。

.vue 引用用如下方法
```
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
```

# 发布生产环境动态配置url
> 有这样一个需求，服务端的url不确定，可能随时更改，这样在axios.create中配置固定的baseURL就不行了，webpack打包完，修改的话就要重新打包啊！

那么这里就用到了webpack的一个插件，生成一个serverconfig.json来做配置文件，以后服务地址改了，只需要修改这个文件就可以了。
` generate-asset-webpack-plugin `先install这个插件，然后配置下生产环境的webpack.prod.conf.js

``` js
// 配合插件生成serverconfig.json baseUrl配置文件
var GenerateAssetPlugin=require('generate-asset-webpack-plugin'); 
var createServerConfig=function(compilation){
  let serverJson={baseUrl:"http://localhost:8089/xxxx"};
  return JSON.stringify(serverJson);
}
```

下面的`plugins:[]`也添加一下插件
``` js
// 打包出单独的json配置文件
    new GenerateAssetPlugin({
      filename: 'serverconfig.json',
      fn: (compilation, cb) => {
          cb(null, createServerConfig(compilation));
      },
      extraFiles: []
  })
```

接着在main.js里面，读取下json的配置内容，然后通过钩子在挂到axios上就行了。

``` js
if (process.env.NODE_ENV === 'production') {
  function getConfigJson() {
    axios.get("serverconfig.json").then((result)=>{
      localStorage.setItem('baseUrl',result.data.baseUrl);
    }).catch((error)=>{console.log(error)});
  }
}
```
> 当然这里最好判断下是不是生产环境并且放到localStorage里面

# 发布到生产环境服务器的配置小坑

## 首先是vue-router的hash和history模式

切换到history模式后，tomcat的web.xml需要修改下`<error-page>`标签
 ``` xml
  <error-page>
		<error-code>404</error-code>
		<location>/</location>
	</error-page>
 ```
 另外`new VueRouter`里也需要添加一下`base`基路径
 ``` js
 base: '/app/'
 ```
 例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"



## 接着是静态文件路径问题
静态文件访问路径的问题，网上有很多，基本上都是`config/index.js`配置
```js 
assetsPublicPath: './' // 修改静态路径 / => ./
```
这里提一下tomcat的配置，我按照网络上的方法给spring.xml添加配置，没有效果。
``` xml
</mvc:annotation-driven>
```
于是只好用笨方法在web.xml里面配置如下
```xml
<servlet-mapping>  
   <servlet-name>default</servlet-name>  
   <url-pattern>*.css</url-pattern>  
 </servlet-mapping>  
 <servlet-mapping>  
   <servlet-name>default</servlet-name>  
   <url-pattern>*.xml</url-pattern>  
 </servlet-mapping>  
 <servlet-mapping>  
   <servlet-name>default</servlet-name>  
   <url-pattern>*.json</url-pattern>  
 </servlet-mapping>   
 <servlet-mapping>  
   <servlet-name>default</servlet-name>  
   <url-pattern>*.png</url-pattern>  
 </servlet-mapping>  
 <servlet-mapping>  
   <servlet-name>default</servlet-name>  
   <url-pattern>*.js</url-pattern>  
 </servlet-mapping> 
 .
 .
 .
```

> 这里多提一嘴，生产环境的console和debugger可以在webpack里面配置下UglifyJsPlugin来屏蔽掉

``` js
new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true, // 去掉生产环境的log和debug
          drop_console: true,
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
```


# TodoList

- 密码保存问题：现在的状态是登录后把token保存在cookie里面，后面很多权限都用到getToken()获取cookie里的token来做登录控制；那么如果在登录页面加入是否保存密码的选项，这个token就要变动到保存到store里面，然后每次登录去判断是否cookie里面存在token；另外服务端token时候超时的，如果超时，那么重新获取token的机制也要考虑一下；