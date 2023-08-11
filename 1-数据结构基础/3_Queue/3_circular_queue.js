/**
 * 循环队列
 *
 * 普通队列的入队其实就是在队列尾部追加一个元素，不需要移动任何元素，因此时间复杂度为O（1）
 * 但是，普通队列的出队则会导致队列中的其他元素都得向前移动，时间复杂度变为O（n）
 *
 * 这时候就需要循环队列了。
 *
 * 参考：https://www.yuque.com/docs/share/fa6c5e82-7fdf-4e58-a491-029d961b1b30?# 《3、队列（Queue）》
 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class CircularQueue {
  constructor(k) {
    this.capacity = k; // 链表的容量
    this.head = null; // 头部指针
    this.tail = null; // 尾部指针
    this.count = 0; // 元素个数
  }

  // 获取队首元素，如果队列为空，返回-1
  Front() {
    if (this.isEmpty()) return -1;
    return this.head.value;
  }

  // 获取队尾元素，如果队列为空，返回-1
  Rear() {
    if (this.isEmpty()) return -1;
    return this.tail.value;
  }

  // 入队
  enQueue(val) {
    if (this.isFull()) return false;
    let node = new Node(val);
    if (this.isEmpty()) {
      // 为空，头部都指向node
      this.head = this.tail = node;
    } else {
      // 将当前循环队列的尾指针指向新加入的node
      this.tail.next = node;
      // 再将尾指针移动到刚刚入队的node
      this.tail = node;
    }
    this.count++;
    return true;
  }

  // 出队
  deQueue() {
    if (this.isEmpty()) return false;
    // 取出头部node
    let temp = this.head;
    // 将头指针移动到第二个node
    this.head = this.head.next;
    this.count--;
    return temp;
  }

  isEmpty() {
    return this.count === 0;
  }

  isFull() {
    return this.count === this.capacity;
  }
}

function hotPotato(nameList, num) {
  let queue = new CircularQueue(nameList.length);
  for (let i = 0; i < nameList.length; i++) {
    queue.enQueue(nameList[i]);
  }

  let eliminated = "";
  while (queue.count > 1) {
    for (let j = 0; j < num; j++) {
      queue.enQueue(queue.deQueue()?.value);
    }
    eliminated = queue.deQueue();
    console.log(eliminated.value + "被淘汰");
  }
  return queue.Front();
}

const names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
const winner = hotPotato(names, 7);
console.log(winner + "胜利者"); // John胜利者
