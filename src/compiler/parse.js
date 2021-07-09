/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-cond-assign */
/* eslint-disable no-useless-escape */
const ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z]*'; // 匹配标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 匹配特殊标签
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配标签开始
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束  >
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性

// 根节点，当前父节点
let root;
let currentParent;
//
const stack = [];
// 元素、文本 nodeType 值
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;

// 生成ast
function creatASTElement(tagName, attrs) {
  return {
    tag: tagName,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null,
  };
}

// 处理开始标签
function handleStartTag({ tagName, attrs }) {
  const element = creatASTElement(tagName, attrs);

  if (!root) {
    root = element;
  }

  currentParent = element;
  stack.push(element);
}

// 处理结束标签
function handleEndTag(tagName) {
  // 取出栈顶元素
  const element = stack.pop();

  currentParent = stack[stack.length - 1];

  if (currentParent) {
    element.parent = currentParent;
    currentParent.children.push(element);
  }
}

// 处理文本
function handleChars(text) {
  // 去掉空格
  text = text.replace(/\s/g, '');
  if (text) {
    currentParent.children.push({
      type: TEXT_TYPE,
      text,
    });
  }
}

//  将 HTML 字符串转换为 AST。
export function parse(html) {
  while (html) {
    // 查找 <
    const textEnd = html.indexOf('<');

    // 如果 < 在第一个 证明接下来就是一个标签 不管是开始还是结束标签
    if (textEnd === 0) {
      // 匹配开始标签
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        // 生成AST
        handleStartTag(startTagMatch);
        continue;
      }

      // 匹配结束标签
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        handleEndTag(endTagMatch[1]);
        continue;
      }
    }

    // 文本
    let text;
    if (textEnd > -1) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      handleChars(text);
    }
  }

  // 匹配开始标签
  function parseStartTag() {
    const start = html.match(startTagOpen);

    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };

      // 匹配到后，截取掉开始标签
      advance(start[0].length);

      let end;
      let attr;

      while (
        !(end = html.match(startTagClose))
        && (attr = html.match(attribute))
      ) {
        advance(attr[0].length);
        attr = {
          name: attr[1],
          value: attr[3] || attr[4] || attr[5], // 这里是因为正则捕获支持双引号 单引号 和无引号的属性值
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
