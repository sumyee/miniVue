import { def } from '../utils/index';

// 原生数组原型
const arrayProto = Array.prototype;
// arrayMethods 继承数组原型
export const arrayMethods = Object.create(arrayProto);

// 拦截这 7 个会改变元数组的方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
];

// 拦截数组方法
// eslint-disable-next-line prefer-arrow-callback
methodsToPatch.forEach(function (method) {
  const original = arrayProto[method];

  def(arrayMethods, method, function (...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    // 数组有新增的元素
    let inserted;
    // eslint-disable-next-line default-case
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    // 新增的元素 也进行响应式观测
    if (inserted) ob.observeArray(inserted);
    return result;
  });
});
