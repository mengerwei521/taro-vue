import Taro from '@tarojs/taro';
import { makeSign, deepCopy } from './request-utils';

/**
  * 判断是否为小程序环境
  * @returns {boolean} 是否为小程序环境
  */
function isMiniProgram() {
  return process.env.TARO_ENV !== 'h5';
}
/**
 * 获取基础 URL
 * @param {string} url - 请求路径
 * @returns {string} 基础 URL
 */
function getBaseURL(url) {
  const domains = {
    api: process.env.TARO_ENV === 'h5' ? url : process.env.TARO_APP_MINI_BASE_URL_API,
    micro: process.env.TARO_ENV === 'h5' ? url : process.env.TARO_APP_BASE_URL_MICRO,
  };
  if (url.startsWith('/api')) return domains.api;
  if (url.startsWith('/micro')) return domains.micro;
  throw new Error(`无法识别的URL路径: ${url}`);
}
//请求封装
class HttpRequest {
  constructor() {
    this.header = {
      'content-type': 'application/json',
      'pretty_json': 'on',
    }
    if (isMiniProgram()) {
      // 小程序环境
      this.header['platform_type'] = 1; //代表那个小程序
      this.header['APPID'] = process.env.TARO_APP_MINI_REQUEST_APP_ID;
    } else {
      // H5环境
      this.header['Cache-Control'] = 'no-cache';
      this.header['APPID'] = process.env.TARO_APP_H5_REQUEST_APP_ID;
    }
  }
  /**
   * @desc request 请求方法
   * @param {
   *  otherOptions: Taro.request 其他参数如： enableCache enableChunked 等
   * } parameter 请求参数
   * @returns
   */
  request(parameter) {
    try {
      let { httpUrl, method, params, header } = this._initRequestInterceptor(parameter);
      console.log('请求参数：', { parameter, httpUrl, method, params, header });
      return Taro.request({
        url: httpUrl,
        method: method,
        data: params,
        header: header,
        ...parameter?.otherOptions,
        success: (res) => {
          return this._initResponseInterceptor(parameter, res);
        },
        fail: (error) => {
          Taro.hideLoading();
          return Promise.reject(error);
        }
      })
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * @desc request 请求参数的处理
   * @param {*} parameter 请求参数
   * @returns
   */
  _initRequestInterceptor(parameter) {
    let method = parameter.method.toUpperCase();
    let params = method == 'GET' ? deepCopy(parameter.params) : parameter.data;
    let { sign, queryString, token } = makeSign(params, method);
    let httpUrl = getBaseURL(parameter.url) + queryString;
    let header = {
      'SIGN': sign,
      "TOKEN": token,
      ...this.header,
      ...parameter?.header
    }
    return { httpUrl, method, params, header }
  }
  /**
   * @desc response 响应数据的处理
   * @param {*} parameter 请求参数
   * @param {*} res 响应数据
   * @returns
   */
  _initResponseInterceptor(parameter, res) {
    if (res.statusCode === 200) {
      let data = this._transData(res.data);
      if (parameter?.header?.API_V == 'V2') {
        if (data.code === 200) {
          if (data?.kpointinfo?.info) {
            //积分信息
            Taro.showToast({
              title: data.kpointinfo.info,
              icon: 'none',
            })
          }
          return Promise.resolve(data);
        } else {
          // 业务错误
          Taro.hideLoading(); //停止加载
          let data = data.code === 302 ? data.redirectinfo : data.toastinfo
          this._requestErrorHandle(data.toastinfo, parameter, data.code)
          return Promise.reject(error);
        }
      } else {
        console.log('响应数据：', Promise.resolve(data));
        return Promise.resolve(data);
      }
    } else {
      // HTTP 错误
      Taro.hideLoading(); //停止加载
      let data = this._transData(res.data)
      this._requestErrorHandle(data, parameter, res.statusCode)
      return Promise.reject(error);
    }
  }
  /**
   * @desc 转换响应数据，去除空值并将键转换为小写
   * @param {*} data
   * @returns
   */
  _transData(data) {
    if (data === null) return
    if (data.constructor === Object) {
      for (let i in data) {
        if (data[i] === null) {
          delete data[i]
        } else {
          data[i.toLowerCase()] = this._transData(data[i]);
        }
      }
    } else if (data.constructor === Array) {
      for (let i in data) {
        if (data[i] === null) {
          delete data[i]
        } else {
          data[i] = this._transData(data[i]);
        }
      }
    }
    return data;
  }
  /**
   * @desc 业务错误or请求错误的处理
   * @param {*} data
   * @param {*} parameter
   * @param {*} code
   */
  _requestErrorHandle(data, parameter, code) {
    if (code === 410 && data?.errorinfo?.length > 0) {
      if (data.level == 1) {
        Taro.showModal({
          title: '温馨提示',
          content: data.errorinfo,
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#407cd4',
          success: (res) => { }
        });
      } else {
        Taro.showToast({
          title: data.errorinfo,
          icon: 'none',
          mask: true
        });
      }
    } else if (code === 302) {
      if (data.redirect_mode == 0) {
        //交互，对话框
        if (data.show_area != null && Object.keys(data.show_area).length > 0) {
          let buttonList = data?.interactive_area_list;
          let title = show_area?.title || '提示';
          let content = show_area.mcontent;
          if (buttonList?.length == 0) {
            Taro.showModal({
              title: title,
              content: content,
              showCancel: false,
              confirmText: '关闭弹框'
            })
          } else if (buttonList?.length == 1) {
            wx.showModal({
              title: title,
              content: content,
              showCancel: false,
              confirmText: buttonList[0].text,
              success(res) {
                if (res.confirm) {
                  // appEventType([buttonList[0]], parameter.type)
                }
              }
            })
          } else {
            wx.showModal({
              title: title,
              content: content,
              confirmText: buttonList[0].text,
              cancelText: buttonList[1].text,
              success(res) {
                if (res.confirm) {
                  // appEventType([buttonList[0]], parameter.type)
                } else if (res.cancel) {
                  // appEventType([buttonList[1]], parameter.type)
                }
              }
            })
          }
        }
      } else { }
    }
  }
}
const httpRequest = new HttpRequest();
export { httpRequest };
