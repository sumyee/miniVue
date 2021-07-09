import { parse } from './parse';

/**
 * 模板转化
 * @param {String} template 模板
 */
export function compileToFunctions(template) {
  const ast = parse(template);
  console.log(ast);
}
