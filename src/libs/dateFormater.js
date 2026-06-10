import dayjs from "dayjs";

/**
 * @description: 将时间戳转为指定格式的时间字符串
 * @param {number} unix - 时间戳
 * @param {string} format - 时间格式，默认为 'YYYY-MM-DD'
 * @param {boolean} millisecond - 是否为毫秒级时间戳，默认为 false
 * @returns {string} 格式化后的时间字符串
 */
export const getFormattedTime = (
  unix,
  format = "YYYY-MM-DD",
  millisecond = false,
) => {
  if (millisecond) {
    // 如果是毫秒级时间戳，直接使用 dayjs 进行格式化
    return dayjs(unix).format(format);
  } else {
    if (unix < 1e10) {
      // 当unix小于1e10【即10,000,000,000,2286-11-20 17:46:40】时，认为它是秒级时间戳，需要乘以1000转换为毫秒 [不一定精准，但一般来说，秒级时间戳不会超过这个值]
      // 如果他真的是毫秒级则不考虑 1970‑04‑26以前的时间了 【真出现了考虑使用millisecond = true】
      unix = unix * 1000;
    }
    return dayjs(unix).format(format);
  }
};
/**
 * @description: 将时间戳转为指定格式的时间字符串，专门用于接口响应时间的处理
 * @param {number} unix - 时间戳
 * @param {string} format - 时间格式，默认为 'YYYY-MM-DD'
 * @returns {string} 格式化后的时间字符串
 */
export const handleResponseTime = (unix, format = "YYYY-MM-DD") => {
  unix = Number(unix) - 8 * 3600;
  return getFormattedTime(unix, format, false);
};
/**
 * @description: 将时间戳转为指定格式的时间字符串，专门用于上传时间的处理
 * @param {Date|string|number} date 解析标准ISO 8601格式的日期字符串 毫秒级时间戳、秒级时间戳 或者 Date对象
 * @returns {number} 秒级时间戳
 */
export const uploadTdate = (date) => {
  return dayjs(date).unix() + 8 * 3600;
};
/**
 * @description: 将字符串转为unix时间戳
 * @param {string} dateString - 日期字符串
 *  * @param {boolean} millisecond - 是否为毫秒级时间戳，默认为 false
 * @returns {number} unix时间戳 默认毫秒级
 */
export const handleStringToUnix = (dateString, millisecond = false) => {
  if (millisecond) {
    return dayjs(dateString).valueOf();
  } else {
    return dayjs(dateString).unix();
  }
}
/**
 * @description: 递归处理接口响应数据中的时间戳，将指定键的值转换为格式化的时间字符串
 * @param {*} data 接口响应数据
 * @param {string} date_key 需要处理的时间戳键
 * @param {string} format 时间格式
 * @returns {*} 接口响应数据
 */
export const interfaceTimeOrDate = (data, date_key, format = "YYYY-MM-DD") => {
  if (data.constructor == Object) {
    if (date_key in data) {
      if (key == date_key) {
        if (data[key] == null || data[key] == '') {
          break
        }
        if (data[key].constructor !== Object || data[key].constructor !== Array) {
          data[key + '_time'] = handleResponseTime(data[key], format)
        } else {
          interfaceTimeOrDate(data[key], date_key, format)
        }

      } else {
        interfaceTimeOrDate(data[key], date_key, format)
      }
    }
  } else if (data.constructor == Array) {
    for (let key in data) {
      interfaceTimeOrDate(data[key], date_key, format)
    }
  }
  return data;
}
