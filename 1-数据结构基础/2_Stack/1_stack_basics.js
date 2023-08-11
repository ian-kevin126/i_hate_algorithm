/**
 * 栈：相比于数组，可以在任意位置插入和删除元素，栈是一种受限的、遵循后进先出（LIFO）原则的线性数据结构，更像是一种变种的数组，没有那么多方法，也没有那么灵活，但是栈这种数据结构
 * 比数组更加的高效和可控，在js中，想要模拟栈，依据的主要形式页是数组；
 *
 * 典型的栈场景：浏览的前进后退，路由的push和pop。
 *
 * 时间复杂度：增、删 —— O（1），查 —— O（n）
 *
 * 常见的栈操作：
 *    - 入栈：push
 *    - 出栈：pop
 *    - 栈顶元素：peek
 *    - 判空：isEmpty
 *    - 栈大小：size
 *    - 转换字符串：toString
 */

/**
 * 栈的实现
 */

/** -------------------------------- ES5 实现 ---------------------------- */
function ESFiveStack() {
  let items = [];
  // 向栈添加新元素
  this.push = function (element) {
    items.push(element);
  };

  // 从栈内弹出一个元素
  this.pop = function () {
    return items.pop();
  };

  // 返回栈顶的元素
  this.peek = function () {
    return items[items.length - 1];
  };

  // 判断栈是否为空
  this.isEmpty = function () {
    return items.length === 0;
  };

  // 返回栈的长度
  this.size = function () {
    return items.length;
  };

  // 清空栈
  this.clear = function () {
    items = [];
  };

  // 打印栈内的所有元素
  this.print = function () {
    console.log(items.toString());
  };
}

// 这种模拟栈的方式虽然简单，但是有一个问题：我们在函数中声明了一个私有变量items，这个类的每个实例都会创建一个items变量的副本，如果有多个Stack类
// 的实例的话，这显然不是最佳方案。

/** --------------------------- function 实现 （优化）-------------------------------------- */
const FunctionStack = (function () {
  function Stack() {
    this.top = 0;
    this.items = [];

    // const items = [];
    // this.pop = function() {
    //   return this.items.pop();
    // }

    // 为什么不建议写在函数内？
    // 使用函数内的方法我们可以访问到函数内部的私有变量，如果我们通过构造函数new出来的对象需要我们去操作构造函数内部的私有变量的话，我们才会将方法写在函数内部。
    // 但是，当我们需要通过一个函数创建大量的对象，并且这些对象还都有许多的方法的时候，这时我们就要考虑在函数的prototype上添加这些方法，这样做的好处是节省内存。
  }

  // 在Stack的原型上定义方法，所有实例都能复用。
  Stack.prototype.push = function (ele) {
    this.items[this.top] = ele;
    this.top++;
  };

  Stack.prototype.pop = function () {
    if (this.top === 0) {
      return "Stack is empty";
    }
    this.top--;
    const result = this.items[this.top];
    this.items = this.items.splice(0, this.top);
    return result;
  };

  Stack.prototype.size = function () {
    return this.top;
  };

  Stack.prototype.peek = function () {
    return this.items[this.top - 1];
  };

  Stack.prototype.view = function () {
    for (let index = 0; index < this.top; index++) {
      console.log(this.items[index]);
    }
  };

  Stack.prototype.isEmpty = function () {
    return this.top === 0;
  };

  Stack.prototype.clear = function () {
    this.items = [];
    this.top = 0;
  };

  Stack.prototype.toString = function () {
    let _str = "";
    for (const i of this.items) {
      _str += i + ",";
    }
    return _str;
  };

  return Stack;
})();

const stack_2 = new FunctionStack();
stack_2.push(1);
stack_2.push(2);
stack_2.push(3);
stack_2.push(4);
stack_2.push(5);
stack_2.view(); // 1 2 3 4 5
console.log(stack_2.toString()); // 1,2,3,4,5,
console.log(stack_2.pop()); // 5
console.log(stack_2.size()); // 4
stack_2.clear();
console.log(stack_2.size()); // 0

/** --------------------------- class 实现 -------------------------------------- */
class ClassStack {
  constructor() {
    this.items = [];
    this.top = 0; // 栈的size
  }

  // 入栈
  push(ele) {
    this.items.push(ele);
    this.top += 1;
    return this;
  }

  // 出栈
  pop() {
    if (this.top > 0) {
      this.items.pop();
      this.top -= 1;
      return this.items.length;
    }
    return null;
  }

  // 清空栈
  clear() {
    this.items = [];
  }

  // 获取栈中元素个数
  get size() {
    return this.top;
  }

  // 是否空栈
  get isEmpty() {
    return this.top === 0;
  }

  // 获取栈顶元素
  get peek() {
    if (this.top !== 0) {
      return this.items[this.items.length - 1];
    }
    return null;
  }

  // 将栈字符串化
  get toString() {
    return this.items.toString();
  }

  // 判断一个对象是否是栈的实例
  static isStack(el) {
    return el instanceof ClassStack;
  }
}

const stack_1 = new ClassStack();
// 类（class）通过 static 关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用。
console.log("是否是ClassStack的实例: ", ClassStack.isStack(stack_1)); // 是否是ClassStack的实例:  true
stack_1.push(1);
stack_1.push(2);
stack_1.push(3);
stack_1.push(4);
stack_1.push(5);
console.log(stack_1.peek); // 5
console.log("toString: ", stack_1.toString); // toString:  1,2,3,4,5
stack_1.clear();
console.log(stack_1.peek); // undefined

/** ------------------------------- 优化版的 Stack ----------------------------------------- */
// 上面使用class实现栈，类的成员变量只能放到constructor构造函数中。虽然代码看起来更像类了，但是成员变量items仍然是共有的。我们不希望在类的外部访问items变量而对其中的元素进行操作
// 因为这样会破坏栈这种数据结构的基本特性，我们可以使用ES6的限定作用域Symbol实现，Symbol表示的是独一无二的值。

const _items = Symbol();

class GoodStack {
  constructor() {
    this[_items] = [];
  }

  push(ele) {
    this[_items].push(ele);
  }

  pop() {
    return this[_items].pop();
  }

  clear() {
    this[_items] = [];
  }

  peek() {
    return this[_items][this[_items].length - 1];
  }

  isEmpty() {
    return this[_items].length === 0;
  }

  size() {
    return this[_items].length;
  }

  print() {
    return this[_items].toString();
  }
}

// 这样我们就不能通过Stack类的实例来访问其他内部成员变量_items了，但是仍然可以有变通的方法来访问_items:
const stack_3 = new GoodStack();
stack_3.push(1);
stack_3.push(2);
stack_3.push(3);
stack_3.push(4);
stack_3.push(5);
const object_symbols = Object.getOwnPropertySymbols(stack_3);
console.log(stack_3[object_symbols[0]]); // [1, 2, 3, 4, 5]

// 通过 Object.getOwnPropertySymbols() 方法，我们可以获取到类的实例中的所有Symbol属性，然后就可以对其进行操作了。如此说来，这个方法仍然不能完美实现我们想要的
// 效果。我们可以使用ES6的WeakMap类来确保Stack类的属性是私有的：
const items = new WeakMap();

class BetterStack {
  constructor() {
    items.set(this, []);
  }

  push(ele) {
    const _items = items.get(this);
    _items.push(ele);
  }

  pop() {
    const _items = items.get(this);
    return _items.pop();
  }

  peek() {
    const _items = items.get(this);
    return _items[_items.length - 1];
  }

  isEmpty() {
    return items.get(this).length === 0;
  }

  size() {
    return items.get(this).length;
  }

  clear() {
    items.set(this, []);
  }

  print() {
    return items.get(this).toString();
  }
}

// 现在，items在Stack类里面是真正的私有属性了，但是，它在Stack类的外部声明的，这就意味着谁都可以对它进行操作，虽然我们可以将Stack类和items变量的声明放到闭包中，但是这样
// 却又失去了类本身的一些特性（比如扩展类无法继承私有属性）。所以，尽管我们可以用ES6的新语法来简化一个类的实现，但是毕竟不能像其他强类型语言一样声明类的私有属性和方法。
// 有许多地方都可以达到相同的效果，但无论是语法还是性能，都有各自的优缺点。

export const Stack = (function () {
  const items = new WeakMap();
  class Stack {
    constructor() {
      items.set(this, []);
    }

    push(element) {
      let s = items.get(this);
      s.push(element);
    }

    pop() {
      let s = items.get(this);
      return s.pop();
    }

    peek() {
      let s = items.get(this);
      return s[s.length - 1];
    }

    isEmpty() {
      return items.get(this).length === 0;
    }

    size() {
      return items.get(this).length;
    }

    clear() {
      items.set(this, []);
    }

    print() {
      return items.get(this).toString();
    }
  }
  return Stack;
})();

const stack_4 = new Stack();
stack_4.push(1);
stack_4.push(2);
stack_4.push(3);
stack_4.push(4);
stack_4.push(5);
console.log(stack_4.print()); // 1,2,3,4,5

/**
 * 链式栈
 */
class StackNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

export default class LinkedStack {
  constructor() {
    this.first = null; // 栈顶元素
    this.last = null; // 栈底元素
    this.size = 0; // 栈长度
  }

  push(data) {
    this.first = new StackNode(data, this.first);

    if (!this.size) {
      this.last = this.first;
    }

    this.size++;

    return this.size;
  }

  pop() {
    if (!this.size) return null;

    const removeNode = this.first;
    this.first = removeNode.next;

    this.size--;

    return removeNode;
  }
}

const _linkedStack = new LinkedStack();

_linkedStack.push(10);
_linkedStack.push(100);
_linkedStack.push(1000);
console.log(_linkedStack.pop()); // 1000
console.log(_linkedStack.size); // 2
_linkedStack.pop();
_linkedStack.pop();
console.log(_linkedStack.size); // 0
console.log(_linkedStack.pop()); // null
