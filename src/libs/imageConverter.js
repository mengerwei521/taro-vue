import { BatchGeneratePresignedUri } from '@/api/public'

/**
 * 将逗号分隔的 osskey 字符串拆分为标准格式数组，自动去重
 * @param {string} data - 逗号分隔的 osskey 字符串
 * @param {number} level - 图片等级，默认 1
 * @returns {Array<{osskey: string, level: number}>}
 */
function splitOssKeys(data, level = 1) {
  if (!data || typeof data !== 'string') return []
  if (data.includes(',')) {
    const seen = new Set()
    return data.split(',').reduce((list, key) => {
      const trimmed = key.trim()
      if (trimmed && !seen.has(trimmed)) {
        seen.add(trimmed)
        list.push({ osskey: trimmed, level })
      }
      return list
    }, [])
  }
  return [{ osskey: data, level }]
}

/**
 * 递归遍历数据，收集所有匹配 imgKey 字段的 OSS key
 * @param {*} value - 待遍历的数据（对象/数组/基本类型）
 * @param {string} imgKey - 图片字段名
 * @param {Array} osskeyList - 收集结果数组，递归时传递
 * @param {number} level - 图片等级
 * @returns {Array<{osskey: string, level: number}>}
 */
function collectOssKeys(value, imgKey, osskeyList = [], level = 1) {
  if (value == null) return osskeyList

  if (Array.isArray(value)) {
    value.forEach((item) => collectOssKeys(item, imgKey, osskeyList, level))
    return osskeyList
  }

  if (typeof value === 'object') {
    for (const key of Object.keys(value)) {
      if (key === imgKey) {
        const val = value[key]
        if (Array.isArray(val)) {
          val.forEach((item) => {
            if (typeof item === 'string') {
              osskeyList.push(...splitOssKeys(item, level))
            } else {
              collectOssKeys(item, imgKey, osskeyList, level)
            }
          })
        } else if (typeof val === 'string') {
          osskeyList.push(...splitOssKeys(val, level))
        } else {
          collectOssKeys(val, imgKey, osskeyList, level)
        }
      } else {
        collectOssKeys(value[key], imgKey, osskeyList, level)
      }
    }
  }

  return osskeyList
}

/**
 * 对 osskeyList 按 osskey 去重，保留首次出现的条目
 * @param {Array<{osskey: string, level: number}>} list
 * @returns {Array<{osskey: string, level: number}>}
 */
function dedupeOssKeys(list) {
  const seen = new Set()
  return list.filter((item) => {
    if (seen.has(item.osskey)) return false
    seen.add(item.osskey)
    return true
  })
}

/**
 * 构建 osskey → url 的映射表，O(1) 查找
 * @param {Array<{osskey: string, url: string}>} urlList
 * @returns {Map<string, string>}
 */
function buildUrlMap(urlList) {
  const map = new Map()
  if (Array.isArray(urlList)) {
    urlList.forEach((item) => {
      if (item.osskey && item.url) {
        map.set(item.osskey, item.url)
      }
    })
  }
  return map
}

/**
 * 递归遍历数据，将预签名 URL 按 osskey 匹配分发回数据中
 * 匹配成功后在数据上添加 {imgKey}_url 字段
 * @param {Map<string, string>} urlMap - osskey → url 映射表
 * @param {*} data - 待分发数据
 * @param {string} imgKey - 图片字段名
 * @returns {*}
 */
function distributeUrls(urlMap, data, imgKey) {
  if (data == null) return data

  if (Array.isArray(data)) {
    data.forEach((item) => distributeUrls(urlMap, item, imgKey))
    return data
  }

  if (typeof data === 'object') {
    for (const key of Object.keys(data)) {
      if (key === imgKey) {
        const val = data[key]

        if (Array.isArray(val)) {
          // 数组元素可能是字符串（osskey）或包含 osskey 的嵌套对象/数组
          const hasNonString = val.some((item) => typeof item !== 'string')
          if (hasNonString) {
            // 包含嵌套对象 → 递归处理每个元素，_url 由内层设置
            val.forEach((item) => distributeUrls(urlMap, item, imgKey))
          } else {
            // 纯字符串数组 → 映射为 URL 数组
            data[imgKey + '_url'] = val
              .map((osskey) => urlMap.get(osskey))
              .filter(Boolean)
          }
        } else if (typeof val === 'string') {
          if (val.includes(',')) {
            // 逗号分隔多图 → 映射为 URL 数组
            data[imgKey + '_url'] = val
              .split(',')
              .map((k) => urlMap.get(k.trim()))
              .filter(Boolean)
          } else {
            // 单图 → 字符串，未匹配到则为空字符串
            data[imgKey + '_url'] = urlMap.get(val) || ''
          }
        } else if (val != null) {
          // val 是对象/数组 → 递归
          distributeUrls(urlMap, val, imgKey)
        }
      } else {
        distributeUrls(urlMap, data[key], imgKey)
      }
    }
  }

  return data
}

/**
 * 获取图片 URL — 将对象中指定 key 对应的 OSS key 批量转换为预签名 HTTP URL
 * @param {Object|Array} data - 包含图片 osskey 的数据
 * @param {string} imgKey - 图片字段名
 * @param {number} level - 图片等级，默认 1
 * @returns {Promise<Object|Array>} 注入 {imgKey}_url 字段后的数据
 */
export async function GetImgUrlFn(data, imgKey, level = 1) {
  const osskeyList = collectOssKeys(data, imgKey, [], level)

  if (osskeyList.length === 0) {
    return data
  }
  try {
    const deduped = dedupeOssKeys(osskeyList)
    const response = await BatchGeneratePresignedUri(deduped)
    // response.data 为 [{osskey, url}, ...]
    const urlMap = buildUrlMap(response.data)
    return distributeUrls(urlMap, data, imgKey)
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 获取图片地址（不分发到原始数据），直接返回 API 响应
 * @param {Array<{osskey: string, level?: number}>} array - osskey 数组
 * @returns {Promise<Object>} API 原始响应
 */
export async function getImgAddress(array) {
  if (!array || array.length === 0) {
    return Promise.reject(new Error('getImgAddress: osskey 数组不能为空'))
  }
  try {
    return await BatchGeneratePresignedUri(array)
  } catch (error) {
    return Promise.reject(error)
  }
}
