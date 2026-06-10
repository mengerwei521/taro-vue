import { httpGet, httpPost } from "@/servers/request-http";
export function GetConfigInfor(params) {
  return httpGet({
    url: '/api/UserInfoAPI/GetPatientStaticConfigV2',
    params: params,
  })
}
/**{@see http://doc.shensx.com/project/12/interface/api/5349 } 获取阿里云图库-批量生产OssKey临时授权HttpUrl扩展（支持多质量图） */
export function BatchGeneratePresignedUriEx(data) {
  return httpPost({
    url: '/api/wxH5Api/BatchGeneratePresignedUriEx',
    data: data,
  })
}
/**
 * @description {@see http://doc.shensx.com/project/12/interface/api/1258 } 批量生产OssKey临时授权HttpUrl
 * @param {{osskey: string, level: number}} data 请求体
 * @returns {[osskey:string,url:string]} 返回一个Promise对象，包含批量生产OssKey临时授权HttpUrl的结果
 * */
export function BatchGeneratePresignedUri(data) {
  return httpPost({
    url: '/api/wxH5Api/BatchGeneratePresignedUri',
    data: data,
  })
}

