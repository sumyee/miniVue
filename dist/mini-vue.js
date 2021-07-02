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

  /**
   * 是否是对象
   * @param {*} value 判断元素
   * @returns Boolean
   */
  function isObject(value) {
    return value !== null && _typeof(value) === 'object';
  }
  /**
   * 定义一个属性
   * @param {Object} obj 目标对象
   * @param {String} key 定义的属性
   * @param {*} val 初始值
   * @param {*} enumerable 是否可枚举
   */

  function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      configurable: true,
      writable: true
    });
  }

  var arrayProto = Array.prototype; // arrayMethods 继承数组原型

  var arrayMethods = Object.create(arrayProto); // 拦截这 7 个会改变元数组的方法

  var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']; // 拦截数组方法
  // eslint-disable-next-line prefer-arrow-callback

  methodsToPatch.forEach(function (method) {
    var original = arrayProto[method];
    def(arrayMethods, method, function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = original.apply(this, args);
      var ob = this.__ob__; // 数组有新增的元素

      var inserted; // eslint-disable-next-line default-case

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
          break;
      } // 新增的元素 也进行响应式观测


      if (inserted) ob.observeArray(inserted);
      return result;
    });
  });

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      // 增加 __ob__ 属性
      def(value, '__ob__', this);

      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    } // 对象


    _createClass(Observe, [{
      key: "walk",
      value: function walk(obj) {
        var keys = Object.keys(obj);

        for (var i = 0; i < keys.length; i++) {
          defineReactive(obj, keys[i], obj[keys[i]]);
        }
      } // 数组

    }, {
      key: "observeArray",
      value: function observeArray(items) {
        for (var i = 0; i < items.length; i++) {
          observe(items[i]);
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
  } // 观察数据

  function observe(value) {
    if (isObject(value) || Array.isArray(value)) {
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
        target[sourceKey][key] = val;
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
    } // 观察数据 -- 响应式数据核心


    observe(data);
  }

  /* eslint-disable no-unused-vars */

  /* eslint-disable no-cond-assign */

  /* eslint-disable no-useless-escape */
  var ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z]*'; // 匹配标签名

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // 匹配特殊标签

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配标签开始

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束  >

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性
  // 根节点，当前父节点

  var root;


  function parse(html) {
    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        parseStartTag();
      }
    } // 匹配开始标签


    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        }; // 匹配到后，截取掉开始标签

        advance(start[0].length);
        var end;
        var attr;

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          attr = {
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          };
          match.attrs.push(attr);
        }

        if (end) {
          advance(1);
          return match;
        }
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    return root;
  }

  /**
   * 模板转化
   * @param {String} template 模板
   */

  function compileToFunctions(template) {
    parse(template);
  }

  function initMixin(Vue) {
    // 初始化
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 初始化状态

      initState(vm);

      if (vm.$options.el) {
        this.$mount(vm.$options.el);
      }
    }; // 挂载


    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // 如果没有 render 属性

      if (!options.render) {
        var template = options.template; // 没有 render 和 template，但是存在 el，就把 el 外层 html 赋值给 template

        if (!template && el) {
          template = el.outerHTML;
        } // 把 template 转化为 render 函数


        if (template) {
          var render = compileToFunctions(template);
          options.render = render;
        }
      }
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
