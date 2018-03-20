# vue 一些问题记录，毕竟大脑有限

## main.js import scss失败 及 .vue 中引用 scss失败

```

  main.js import '@/styles/index.scss'
  App.vue style @import '@/styles/index.scss' 

```
>用vue-cli架子搭建完成后，安装了sass-loader，配置了webpack后出现了问题，main.js引用scss文件失败，vue的style中引用成功，删掉webpack配置后，问题解决。

### .vue 引用用如下方法
```
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
```


# TodoList

- 密码保存问题：现在的状态是登录后把token保存在cookie里面，后面很多权限都用到getToken()获取cookie里的token来做登录控制；那么如果在登录页面加入是否保存密码的选项，这个token就要变动到保存到store里面，然后每次登录去判断是否cookie里面存在token；另外服务端token时候超时的，如果超时，那么重新获取token的机制也要考虑一下；