import { observe } from './observer/index';

// 数据代理
export function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return target[sourceKey][key];
    },
    set(val) {
      target[sourceKey][key] = val;
    },
  });
}

export function initState(vm) {
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }

  if (opts.methods) {
    initMethods(vm);
  }

  if (opts.data) {
    initData(vm);
  }

  if (opts.computed) {
    initComputed(vm);
  }

  if (opts.watch) {
    initWatch(vm);
  }
}

function initProps() {}

function initMethods() {}

// 初始化 data
function initData(vm) {
  // 传入的 data
  let { data } = vm.$options;

  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  console.log('🚀 ~ file: state.js ~ line 33 ~ initData ~ data', data);

  // 将 data 代理到 vm 上，可通过 this.dataKey 访问
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      proxy(vm, '_data', key);
    }
  }

  // 观察数据 -- 响应式数据核心
  observe(data);
}

function initComputed() {}

function initWatch() {}
