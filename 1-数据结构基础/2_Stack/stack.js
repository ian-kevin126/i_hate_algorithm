const stack = [];
stack.push(1);
stack.push(2);
stack.push(3);
const item1 = stack.pop();
const item2 = stack.pop();

// leetcode 20：有效的括号
const isValid = (s) => {
  const stack = [];
  const len = s.length;
  if (typeof s !== "string" || len % 2 === 1) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    const c = s[i];
    if (c === "(" || c === "{" || c === "[") {
      stack.push(c);
    } else {
      // 当前栈顶元素
      const t = stack[stack.length - 1];
      if (
        (t === "(" && c === ")") ||
        (t === "{" && c === "}") ||
        (t === "[" && c === "]")
      ) {
        // 如果当前栈顶元素和遍历到的这个符号匹配，就弹出栈顶元素
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return true;
};

console.log(isValid("((()))"));
// console.log(isValid("([]})"));
// console.log(isValid("(())}"));

// JS中的函数调用堆栈
const func1 = () => {
  func2();
};
const func2 = () => {
  func3();
};
const func3 = () => {};
func1();
