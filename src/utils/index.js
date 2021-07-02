/**
 * 是否是对象
 * @param {*} value 判断元素
 * @returns Boolean
 */
export function isObject(value) {
  return value !== null && typeof value === 'object';
}

/**
 * 定义一个属性
 * @param {Object} obj 目标对象
 * @param {String} key 定义的属性
 * @param {*} val 初始值
 * @param {*} enumerable 是否可枚举
 */
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    configurable: true,
    writable: true,
  });
}
