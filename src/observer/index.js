import { isObject, def } from '../utils/index';
import { arrayMethods } from './array';

class Observe {
  constructor(value) {
    // 增加 __ob__ 属性
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  // 对象
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  // 数组
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
}

// 数据响应式（核心）
export function defineReactive(obj, key, val) {
  // 递归，使对象值也进行响应式
  observe(val);
  // 数据劫持
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`🚀 ~ 访问值 ${key}`, val);
      return val;
    },
    set(value) {
      val = value;
      console.log(`🚀 ~ 设置值 ${key}`, value);
    },
  });
}

// 观察数据
export function observe(value) {
  if (isObject(value) || Array.isArray(value)) {
    return new Observe(value);
  }
}
