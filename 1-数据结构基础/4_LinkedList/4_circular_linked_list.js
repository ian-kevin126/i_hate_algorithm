/**
 * 循环链表：最后一个元素指向不是null，而是指向第一个元素（head）。
 * https://www.cnblogs.com/jaxu/p/11277732.html
 * https://www.yuque.com/docs/share/bb01fa4a-5af0-46b2-885d-eab61dc5429b?# 《4、循环链表》
 */
let CircularLinkedList = (function () {
  class Node {
    constructor(element) {
      this.element = element;
      this.next = null;
    }
  }

  const length = new WeakMap();
  const head = new WeakMap();

  class CircularLinkedList {
    constructor() {
      length.set(this, 0);
      head.set(this, null);
    }

    append(element) {
      let node = new Node(element),
        current;

      if (this.getHead() === null) {
        // 如果链表是空的
        head.set(this, node);
      } else {
        current = this.getHead();

        // 循环链表，直到最后一个
        while (current.next !== this.getHead()) {
          // 最后一个元素连接head，而不再是null了
          current = current.next;
        }

        // 遍历到最后一个元素，将current.next指向这个节点元素
        current.next = node;
      }

      // 别忘了，再将最后一个元素连接到第一个元素
      node.next = this.getHead();

      // 更新length
      let l = this.size();
      l++;
      length.set(this, l);
    }

    insert(position, element) {
      // 校验position的值，不能小于0，不能大于length
      if (position >= 0 && position <= this.size()) {
        let node = new Node(element),
          current = this.getHead(),
          previous,
          index = 0;

        if (position === 0) {
          // 插入头部
          node.next = current;
          while (current.next !== this.getHead()) {
            current = current.next;
          }

          head.set(this, node);
          // 将最后一个元素的指向变更为新的head
          current.next = this.getHead();
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;
        }

        let l = this.size();
        l++;
        length.set(this, l);

        return true;
      } else {
        return false;
      }
    }

    removeAt(position) {
      // 检查position的合法性
      if (position > -1 && position < this.size()) {
        let current = this.getHead(),
          previous,
          index = 0;

        // 移除头部元素
        if (position === 0) {
          while (current.next !== this.getHead()) {
            // 更新最后一个元素连接的对象
            current = current.next;
          }

          head.set(this, this.getHead().next);
          current.next = this.getHead();
        } else {
          //  如果不是头部元素，中间的就不需要更新指向了
          while (index++ < position) {
            previous = current;
            current = current.next;
          }

          // 连接previous到current.next，跳过中间的一个元素，就实现了移除
          previous.next = current.next;
        }

        let l = this.size();
        l--;
        length.set(this, l);

        return current.element;
      } else {
        return null;
      }
    }

    remove(element) {
      let index = indexOf(element);
      return removeAt(index);
    }

    indexOf(element) {
      let current = this.getHead(),
        index = -1;

      // 如果是头部节点
      if (element == current.element) {
        return 0;
      }

      index++;

      // 如果是中间的节点
      while (current.next !== this.getHead()) {
        if (element == current.element) {
          return index;
        }

        current = current.next;
        index++;
      }

      // 如果是最后一个节点
      if (element == current.element) {
        return index;
      }

      return -1;
    }

    isEmpty() {
      return this.size() === 0;
    }

    size() {
      return length.get(this);
    }

    getHead() {
      return head.get(this);
    }

    toString() {
      let current = this.getHead(),
        s = current.element;

      while (current.next !== this.getHead()) {
        current = current.next;
        s += ", " + current.element;
      }

      return s.toString();
    }

    print() {
      console.log(this.toString());
    }
  }
  return CircularLinkedList;
})();

// 测试
let circularLinkedList = new CircularLinkedList();
circularLinkedList.append(15);
circularLinkedList.append(16); //15,16
circularLinkedList.insert(0, 14); //14,15,16
circularLinkedList.removeAt(0); //15,16
circularLinkedList.indexOf(16); //1
circularLinkedList.print(); // 15,16
