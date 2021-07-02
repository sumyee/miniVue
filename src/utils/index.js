export function isObject(value) {
  return value !== null && typeof value === 'object';
}

// 定义属性
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    configurable: true,
    writable: true,
  });
}
