import axios from 'axios'
import store from '../store'
import router from '../router'
import { baseUrl } from '@/config/env.js'
import * as Logger from '@/core/logger.js'

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
    // 在发送请求之前做些什么
    store.commit('SET_LOADING',true);
    // 如果有token,添加到请求报文 后台会根据该报文返回status
    if(store.state.login.token) {
      config.headers.Authorization = `token ${store.state.login.token}`;
    }

    return config;

  }, function (error) {
    // 对请求错误做些什么
    alert('网络错误,请稍后再试');
    store.commit('SET_LOADING',false);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 加到时器主要是为了 展示Loading效果 项目中应去除
    setTimeout(()=>{
      store.commit('SET_LOADING',false);
    },300)

    return response;

  }, function (error) {
    // 对响应错误做点什么
    store.commit('SET_LOADING',false);

    if(error.response) {
      if(error.response.status== 401) {
          // 如果返回401 即没有权限，跳到登录页重新登录
        // store.commit('CHANGE_TOKEN',0);
        alert('请重新登录');
        router.replace({
          path: '/page404',
          query: {redirect: router.currentRoute.fullPath}
        })

      }
    }
    return Promise.reject(error);
  }
);


/**
 *
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