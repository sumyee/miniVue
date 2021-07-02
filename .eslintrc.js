module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    // 'vue',
  ],
  rules: {
    'no-underscore-dangle': 0, // 禁止标识符中有悬空下划线
    'no-param-reassign': 0, // 禁止对 function 的参数进行重新赋值
    'no-use-before-define': 0, // 禁止在变量定义之前使用它们
    'no-multi-assign': 0, // 禁止连续赋值
    'func-names': 0, // 要求或禁止使用命名的 function 表达式
    'class-methods-use-this': 0, // 强制类方法使用 this
    'import/prefer-default-export': 0,
    'no-restricted-syntax': 0, // 禁用特定的语法
    'consistent-return': 0, // 要求 return 语句要么总是指定返回的值，要么不指定
    'no-plusplus': 0, // 禁用一元操作符 ++ 和 --
    'no-console': 0,
    'no-proto': 0,
  },
};
