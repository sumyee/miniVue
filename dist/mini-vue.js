(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.miniVue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      this.walk(value);
    } // 对象


    _createClass(Observe, [{
      key: "walk",
      value: function walk(obj) {
        var keys = Object.keys(obj);

        for (var i = 0; i < keys.length; i++) {
          defineReactive(obj, keys[i], obj[keys[i]]);
        }
      }
    }]);

    return Observe;
  }(); // 数据响应式（核心）


  function defineReactive(obj, key, val) {
    // 递归，使对象值也进行响应式
    observe(val); // 数据劫持

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        console.log("\uD83D\uDE80 ~ \u8BBF\u95EE\u503C ".concat(key), val);
        return val;
      },
      set: function set(value) {
        val = value;
        console.log("\uD83D\uDE80 ~ \u8BBE\u7F6E\u503C ".concat(key), value);
      }
    });
  }
  function observe(value) {
    if (value !== null && _typeof(value) === 'object' || Array.isArray(value)) {
      return new Observe(value);
    }
  }

  function proxy(target, sourceKey, key) {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        return target[sourceKey][key];
      },
      set: function set(val) {
        return target[sourceKey][key] = val;
      }
    });
  }
  function initState(vm) {
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    // 传入的 data
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
    console.log('🚀 ~ file: state.js ~ line 33 ~ initData ~ data', data); // 将 data 代理到 vm 上，可通过 this.dataKey 访问

    for (var key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        proxy(vm, '_data', key);
      }
    } // 观测数据 -- 响应式数据核心


    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 初始化状态

      initState(vm);
    };
  }

  function Vue(options) {
    // 初始化
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=mini-vue.js.map
