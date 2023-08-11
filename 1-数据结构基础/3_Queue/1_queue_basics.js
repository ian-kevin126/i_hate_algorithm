/**
 * 3、队列：队列也是一种受限的、遵循先进先出（FIFO）的线性数据结构。特殊之处在于，对列只允许在前端进行删除操作，在后端进行插入操作。
 *
 * 队列常见的操作：
 *    - 入队（enqueue(element)）：向队列尾部添加一个（或多个）新的项
 *    - 出队（dequeue）：移除队列的第一项，并返回被移除的元素。
 *    - 队列第一个元素（front）：最先被添加的元素
 *    - 对垒是否为空（isEmpty）：如果队列中不包含任意元素，返回true，否则false
 *    - 队列元素个数（size）：返回队列元素个数。
 *    - 队列字符串化（toString）：将队列中的内容字符串化
 */

const Queue = (function () {
  const _items = new WeakMap();
  class Queue {
    constructor() {
      _items.set(this, []);
    }

    enqueue(element) {
      const que = _items.get(this);
      que.push(element);
    }

    dequeue() {
      const que = _items.get(this);
      return que.shift();
    }

    clear() {
      _items.set(this, []);
    }

    // 查看队头元素
    front() {
      const que = _items.get(this);
      return que[0];
    }

    isEmpty() {
      return _items.get(this).length === 0;
    }

    size() {
      return _items.get(this).length;
    }

    toString() {
      return _items.get(this).toString();
    }
  }
  return Queue;
})();

const _queue = new Queue();
_queue.enqueue(1);
_queue.enqueue(2);
_queue.enqueue(3);
_queue.enqueue(4);
_queue.enqueue(5);
console.log(_queue.toString()); // 1,2,3,4,5
console.log(_queue.front()); // 1
console.log(_queue.dequeue()); // 1
console.log(_queue.toString()); // 2,3,4,5
console.log(_queue.isEmpty()); // false
console.log(_queue.size()); // 4

/**
 * 队列高级
 */

// 普通队列
const Queue = (function () {
  const _items = new WeakMap();

  class Queuer {
    constructor() {
      _items.set(this, []);
    }

    enqueue(element) {
      const _queue = _items.get(this);
      _queue.push(element);
    }

    dequeue() {
      const _queue = _items.get(this);
      const s = _queue.shift();
      return s;
    }

    front() {
      return _items.get(this)[0];
    }

    isEmpty() {
      return _items.get(this).length === 0;
    }

    size() {
      return _items.get(this).length;
    }

    clear() {
      _items.set(this, []);
    }

    print() {
      return _items.get(this).toString();
    }
  }

  return Queuer;
})();

// 函数写法
const Queue2 = (function () {
  function Queue() {
    this.items = [];
  }

  Queue.prototype.enqueue = function (ele) {
    this.items.push(ele);
  };

  Queue.prototype.dequeue = function () {
    if (this.items.length === 0) {
      return "Queue is empty";
    }
    const _item = this.items.shift();
    return _item;
  };

  Queue.prototype.front = function () {
    return this.items[0];
  };

  Queue.prototype.isEmpty = function () {
    return this.items.length === 0;
  };

  Queue.prototype.size = function () {
    return this.items.length;
  };

  Queue.prototype.print = function () {
    return this.items.toString();
  };
  return Queue;
})();

const queue = new Queue2();
console.log(queue.isEmpty()); // true
queue.enqueue("John");
queue.enqueue("Jack");
queue.enqueue("Camila");
console.log(queue.print()); // John,Jack,Camila
console.log(queue.size()); // 3
console.log(queue.isEmpty()); // false
queue.dequeue();
queue.dequeue();
console.log(queue.print()); // Camila

/**
 * 栈实现队列
 */
class MyQueue {
  constructor() {
    this.inputStack = [];
    this.outputStack = [];
  }

  enqueue(ele) {
    this.inputStack.push(ele);
  }

  dequeue() {
    let dequeueElement;
    // 将inputStack中的元素全都push到outputStack中去
    this.outputStack = [];

    if (this.inputStack.length > 0) {
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }

    if (this.outputStack.length > 0) {
      // 重新将output中的元素push到inputStack中去
      dequeueElement = this.outputStack.pop();
      this.inputStack = [];
      while (this.outputStack.length > 0) {
        this.inputStack.push(this.outputStack.pop());
      }
    }
    return dequeueElement;
  }

  peek() {
    if (this.outputStack.length <= 0) {
      while (this.inputStack.length !== 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }

    // 缓存 outputStack 的长度
    const len = this.outputStack.length;
    return len && this.outputStack[len - 1];
  }

  isEmpty() {
    // 若 inputStack 和 outputStack 都为空，那么队列为空
    return !this.inputStack.length && !this.outputStack.length;
  }

  // 遍历inputStack中的元素
  listIn() {
    let i = 0;
    while (i < this.inputStack.length) {
      console.log(this.inputStack[i]);
      i++;
    }
  }

  // 遍历outStack中的元素
  listOut() {
    let i = 0;
    while (i < this.outputStack.length) {
      console.log(this.outputStack[i]);
      i++;
    }
  }
}

const _myQueue = new MyQueue();
_myQueue.enqueue(1);
_myQueue.enqueue(2);
_myQueue.enqueue(8);
_myQueue.enqueue(9);
console.log(_myQueue.dequeue()); // 1
console.log(_myQueue.dequeue()); // 2

/**
 * 链式队列
 */
class QueueNode {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class LinkedQueue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(data) {
    const newNode = new QueueNode(data);

    if (!this.size) {
      this.first = newNode;
    } else {
      this.last.next = newNode;
    }

    this.last = newNode;
    this.size++;

    return this.size;
  }

  dequeue() {
    if (!this.size) return null;
    const removeNode = this.first;
    this.first = removeNode.next;
    this.size--;

    if (!this.size) this.last = null;

    return removeNode;
  }
}

const linkedQueue = new LinkedQueue();

console.log(linkedQueue.enqueue(10)); // 1
console.log(linkedQueue.size); // 1
console.log(linkedQueue.enqueue(100)); // 2
console.log(linkedQueue.size); // 2
console.log(linkedQueue.enqueue(1000)); // 3
console.log(linkedQueue.size); // 3
console.log(linkedQueue.dequeue()); // 10
linkedQueue.dequeue();
console.log(linkedQueue.size); // 1
linkedQueue.dequeue();
console.log(linkedQueue.dequeue()); // null
console.log(linkedQueue.size); // 1

/**
 * 队列的典型应用，击鼓传花
 */
function passGame(nameList, number) {
  const _queue = new Queue();
  // 将 nameList 里面的每一个元素入队
  for (const name of nameList) {
    _queue.enqueue(name);
  }
  while (_queue.size() > 1) {
    for (let i = 0; i < number - 1; i++) {
      // number数字之前的人重新放入队列尾部（即把对头的元素删除，再加入到队尾）
      _queue.enqueue(_queue.dequeue());
    }
    // number对应这个人，直接从队列中删除，由于队列没有像数组一样的下标值，不能取到某一元素，所以采用把number之前的number-1个元素先删除后添加到队列末尾
    // 这样number个元素就排到了队列的最前面，可以直接使用dequeue方法进行删除。
    _queue.dequeue();
  }

  // 获取最后剩下的那个人
  const endName = _queue.front();
  // 返回这个人在原数组中对应的索引
  return nameList.indexOf(endName);
}

const names = ["lily", "lucy", "tom", "tony", "jack"];
const targetIndex = passGame(names, 4);
console.log("击鼓传花", names[targetIndex]); // 击鼓传花 lily

/**
 * 循环队列：我们用一个击鼓传花来说明循环队列在实际中的应用
 */
function hotPotato(nameList, num) {
  const queue = new Queue();

  for (let i = 0; (ci = nameList[i]); i++) {
    queue.enqueue(ci);
  }

  let eliminated = "";

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(`${eliminated} has been eliminated`);
  }

  return queue.dequeue();
}
let nameLists = ["John", "Jack", "Camila", "Ingrid", "Carl"];
let winner = hotPotato(nameLists, 7);
console.log(`The winner is: ${winner}`); // The winner is: John
