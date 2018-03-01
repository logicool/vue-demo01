/**
 * 判断浏览器类型
 */
 export const getBowerInfo = {
    versions:function(){  
        var u = navigator.userAgent, app = navigator.appVersion;  
        return {//移动终端浏览器版本信息  
                trident: u.indexOf('Trident') > -1, //IE内核  
                presto: u.indexOf('Presto') > -1, //opera内核  
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端  
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器  
                iPad: u.indexOf('iPad') > -1, //是否iPad  
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
            };  
        }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
 }

 
var has = Object.prototype.hasOwnProperty;

/**
 * 请求参数字符串解析器
 * @param query
 * @returns {{}}
 */
function queryString(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  for (;
    part = parser.exec(query);
    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
  );

  return result;
}

/**
 * 对象转请求参数
 * @param obj
 * @param prefix
 * @returns {string}
 */
function queryStringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}


/**
 * 获取字符串json 对象里的某一个值
 * @param data
 * @param propsName
 * @returns {*}
 */
function getPropsFromJson(data, propsName) {
  //console.log("测试data",data);
  let obj = transformToObj(data);

  if (has.call(obj, propsName)) {
    return obj[propsName]
  }
  return undefined;
}

/**
 * 安全的string 转 json
 * @param data
 * @returns {{}}
 */
function transformToObj(data) {
  let obj = {};
  if (typeof data === 'string') {
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return {};
    }
  }
  return obj
}

export default {
  getPropsFromJson,
  transformToObj,
  queryStringify,
  queryString,
}