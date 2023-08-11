import { Stack } from "./stack_basics";
/**
 * 1、利用栈结构的特点封装实现十进制转换为二进制的方法
 *
 * 10 / 2 = 5   rem = 0    将余数放入栈中 0
 * 5 / 2 = 2    rem = 1    将余数放入栈中 10
 * 2 / 2 = 1    rem = 0    将余数放入栈中 010
 * 1 / 2 = 0    rem = 1    将余数放入栈中 1010
 * 输出：1010
 *
 */

function decimalToBinary(decNumber) {
  // 声明一个stack对象
  const remStack = new Stack();

  // 需要转换的数字
  let number = decNumber;

  // 每次相除后得到的余数
  let rem;

  // 转换后的二进制字符串
  let binaryString = "";

  // 当number为0的时候结束循环
  while (number > 0) {
    // 对余数向下取整，因为这里不取整的话会出现小数，js没有浮点或者整形这一说
    rem = Math.floor(number % 2);
    // 存储当前的余数
    remStack.push(rem);
    // 因为上面对number取余只是拿到了最后余数的结果，number本身并没有除以2，所以这里除以2是为了保证后面可以再一次取余的结果的正确性
    number = Math.floor(number / 2);
  }

  // 拼接栈元素
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}

console.log(decimalToBinary(0)); // ''
console.log(decimalToBinary(1)); // 1
console.log(decimalToBinary(2)); // 10
console.log(decimalToBinary(10)); // 1010
console.log(decimalToBinary(111)); // 1101111

/**
 * 2、十进制转任何进制
 */

function baseConverter(decNumber, base) {
  const remStack = new Stack();

  // 这里是转换的对比字典，十位进制转换中，10代表A，11代表B，所以当我们在转换时，需要使余数的数字被字母代替；
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let number = decNumber;
  let rem;
  let baseString = "";

  // 这里只做2到36位之间的转换，因为理论上来讲可以进行任何位数之间的互相转换。但在不同位数之间转换的时候会有更为复杂的情况
  if (!(base >= 2 && base <= 36)) {
    return "";
  }

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }

  return baseString;
}

console.log(baseConverter(100, 16)); // 64
console.log(baseConverter(1, 16)); // 1
console.log(baseConverter(12, 8)); // 14
console.log(baseConverter(1222323112, 36)); // K7QMJS
console.log(baseConverter(1111111111, 18)); // 1EC07D51
console.log(baseConverter(99, 16)); // 63
console.log(baseConverter(233231, 23)); // J3KB

/**
 * 3、最小栈
 *
 * 问题描述：设计一个支持push、pop、top操作，并能在常数时间内检索到最小元素的栈
 * 思路：维护一个递减栈，并在添加和删除时同时对递减栈进行操作。
 */
const MinStack = function () {
  this.stack = [];
  this.subStack = []; // 辅助栈
};

MinStack.prototype.push = function (ele) {
  this.stack.push(ele);
  // 若入栈的值小于当前最小值，则推入辅助栈栈顶
  if (
    this.subStack.length === 0 ||
    this.subStack[this.subStack.length - 1] >= ele
  ) {
    this.subStack.push(ele);
  }
};

MinStack.prototype.pop = function () {
  // 若出栈的值和当前最小值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
  if (this.stack.pop() === this.subStack[this.subStack.length - 1]) {
    this.subStack.pop();
  }
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  // 辅助栈的栈顶，存的就是目标中的最小值
  return this.subStack[this.subStack.length - 1];
};

const _minStack = new MinStack();
_minStack.push(1);
_minStack.push(12);
_minStack.push(323);
_minStack.push(43);
_minStack.push(12);
_minStack.push(3);
console.log(_minStack.getMin()); // 1
