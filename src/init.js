import { initState } from './state';
import { compileToFunctions } from './compiler/index';

export function initMixin(Vue) {
  // 初始化
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;

    // 初始化状态
    initState(vm);

    if (vm.$options.el) {
      this.$mount(vm.$options.el);
    }
  };

  // 挂载
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;

    el = document.querySelector(el);

    // 如果没有 render 属性
    if (!options.render) {
      let { template } = options;

      // 没有 render 和 template，但是存在 el，就把 el 外层 html 赋值给 template
      if (!template && el) {
        template = el.outerHTML;
      }

      // 把 template 转化为 render 函数
      if (template) {
        const render = compileToFunctions(template);
        options.render = render;
      }
    }
  };
}
