import axios from 'axios'
import store from '../store'
import { baseUrl } from '@/config/env.js'
import * as Logger from '@/core/logger.js'
import { getToken } from '@/core/auth'
/**
 * 网络请求设置
 * @type {{Content-Type: string}}
 */
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded', //application/json;charset=utf-8
  'X-Requested-With': 'XMLHttpRequest'
};

export let instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  withCredentials: false,
  // responseType: 'json',
  headers: headers,
});

// 请求拦截
instance.interceptors.request.use(function (config) {
    if(store.getters.token) {
      config.headers.Authorization = `token ${getToken()}`;
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response;

    // // @MARK 业务相关验证
    // const res = response.data;
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload()// 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error');
    // } else {
    //   return response;
    // }
  }, function (error) {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
);


/**
 * @param type  'GET','POST','DELETE','PUT'
 * @param url
 * @param config
 * @param request
 * @param response
 * @param error bool型true表示是error
 */
function requestGroupLog(type,url,config,request,response,error=false) {
  Logger.groupStart(type, url);
  //if(request && request.toString() !== "[object Object]") //request 不等于{}
    console.log("request", request);
  //if(config && config.toString() !== "[object Object]")
    console.log("config", config);
  if(error){
    console.log("Error", {...response});
  }else{
    console.log("response", response);
  }
  Logger.groupEnd(type, url);
}

/**
 * 网络请求
 */
export let request = () => {
  return {
    get: (url, config = {}) => {
      return instance.get(url, config)
        .then(response => {
          requestGroupLog('GET',url,config,{},response);
          return response.data;
        })
        .catch((error) => {
          requestGroupLog('GET',url,config,{},error,true);
          return error;
        });
    },
    post: (url, data = {}, config = {}) => {
      return instance.post(url, data, config)
        .then(response => {
          requestGroupLog('POST',url,config,data,response);
          return response.data
        })
        .catch((error)=>{
          requestGroupLog('POST',url,config,data,error,true);
          return error;
        });
    },
    delete: (url, config = {}) => {
      return instance.delete(url, config)
        .then(response =>{
          requestGroupLog('DELETE',url,config,{},response);
          return response.data;
        })
        .catch((error) => {
          requestGroupLog('DELETE',url,config,{},error,true);
          return error;
        });
    },
    put:(url,data={},config={})=>{
      return instance.put(url, data, config)
        .then(response=>{
          requestGroupLog('PUT',url,config,data,response);
          return response.data
        })
        .catch((error)=>{
          requestGroupLog('PUT',url,config,data,error,true);
          return error;
        });
    }

  }
};