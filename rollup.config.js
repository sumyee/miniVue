import babel from 'rollup-plugin-babel';

export default {
  input: './src/index.js', // 入口文件
  output: {
    file: 'dist/mini-vue.js', // 输出
    format: 'umd', // 模块规范
    name: 'miniVue',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
