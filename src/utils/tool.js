/**
 * @desc 判断值是否非空（有值）
 * @param {*} target - 任意类型
 * @param {boolean} strict - 严格模式：0 视为有值；非严格模式：0 视为空，默认 true
 * @returns {boolean} true=有值，false=空（null / undefined / '' / [] / {} / 严格模式外的 0）
 */
export function isNotEmpty(target, strict = true) {
  // null / undefined → 空
  if (target == null) return false

  // 字符串 / 数组 → 有长度才有值
  if (typeof target === 'string' || Array.isArray(target)) {
    return target.length > 0
  }

  // 数字 → 非严格下 0 算空
  if (typeof target === 'number') {
    return target !== 0 || strict
  }

  // 纯对象 → 有可枚举自有属性才有值
  if (typeof target === 'object') {
    return Object.keys(target).length > 0
  }

  // boolean、function、symbol 等一律视为有值
  return true
}

/**
 * @desc 判断值是否为空（isNotEmpty 的反义）
 */
export function isEmpty(target, strict = true) {
  return !isNotEmpty(target, strict)
}

/**
 * @desc 深克隆（支持对象、数组、Date、RegExp、Map、Set、基本类型，处理循环引用）
 * @param {*} source - 源数据
 * @param {WeakMap} hash - 内部循环引用记录，调用时无需传
 * @returns {*} 克隆后的新对象
 */
export function deepClone(source, hash = new WeakMap()) {
  // null / undefined / 基本类型 直接返回
  if (source == null || typeof source !== 'object') return source

  // 处理循环引用：已拷贝过的对象直接返回缓存
  if (hash.has(source)) return hash.get(source)

  // Date
  if (source instanceof Date) {
    return new Date(source.getTime())
  }

  // RegExp
  if (source instanceof RegExp) {
    return new RegExp(source.source, source.flags)
  }

  // Map
  if (source instanceof Map) {
    const clone = new Map()
    hash.set(source, clone)
    source.forEach((val, key) => {
      clone.set(deepClone(key, hash), deepClone(val, hash))
    })
    return clone
  }

  // Set
  if (source instanceof Set) {
    const clone = new Set()
    hash.set(source, clone)
    source.forEach((val) => {
      clone.add(deepClone(val, hash))
    })
    return clone
  }

  // Array / 普通 Object
  const clone = Array.isArray(source) ? [] : Object.create(Object.getPrototypeOf(source))
  hash.set(source, clone)

  // 拷贝自有可枚举属性 + Symbol 键
  const keys = Object.keys(source).concat(Object.getOwnPropertySymbols(source))
  for (const key of keys) {
    clone[key] = deepClone(source[key], hash)
  }

  return clone
}
