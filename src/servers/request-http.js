import { httpRequest } from './request-axios';
/**
 * @description: http get请求
 * @param {*} url 请求地址
 * @param {*} params  请求参数
 * @param {*} headers 请求头
 * @param {*} otherOptions  Taro.request 其他参数
 * @returns
 */
export const httpGet = ({ url, params = {}, headers = {}, otherOptions = {} }) => {
  return httpRequest.request({
    method: 'get',
    url: url,
    params: params,
    headers: headers,
    otherOptions: otherOptions
  })
}
/**
 * @description: http post请求
 * @param {*} url 请求地址
 * @param {*} data 请求参数
 * @param {*} headers 请求头
 * @param {*} otherOptions  Taro.request 其他参数
 * @returns
 */
export const httpPost = ({ url, data, headers = {}, otherOptions = {} }) => {
  return httpRequest.request({
    method: 'post',
    url: url,
    data: { data },
    headers: headers,
    otherOptions: otherOptions
  })
}
