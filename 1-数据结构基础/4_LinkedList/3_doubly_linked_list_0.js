/**
 * 双向链表：单向链表中的每一个元素只有一个next指针，用来指向下一个节点，这使得我们只能从链表的头部开始遍历整个链表，任何一个节点只能找到它的下一个节点，而不能找到它的上一个节点。
 * 这时候就出现了双向链表，双向链表中的每一个元素拥有两个指针，一个用来指向下一个节点，一个用来指向上一个节点。这样，我们就不仅可以从头部遍历整个链表，还能从尾部遍历整个链表。
 */
let DoublyLinkedList = (function () {
  class Node {
    constructor(element) {
      this.element = element;
      this.next = null;
      this.prev = null; //NEW
    }
  }

  const length = new WeakMap();
  const head = new WeakMap();
  const tail = new WeakMap(); // NEW

  class DoublyLinkedList {
    constructor() {
      length.set(this, 0);
      head.set(this, null);
      tail.set(this, null);
    }

    append(element) {
      let node = new Node(element),
        current,
        _tail;

      if (this.getHead() === null) {
        //first node on list
        head.set(this, node);
        tail.set(this, node); //NEW
      } else {
        //attach to the tail node //NEW
        _tail = this.getTail();
        _tail.next = node;
        node.prev = _tail;
        tail.set(this, node);
      }

      //update size of list
      let l = this.size();
      l++;
      length.set(this, l);
    }

    insert(position, element) {
      //check for out-of-bounds values
      if (position >= 0 && position <= this.size()) {
        let node = new Node(element),
          current = this.getHead(),
          previous,
          index = 0;

        if (position === 0) {
          //add on first position

          if (!this.getHead()) {
            //NEW
            head.set(this, node);
            tail.set(this, node);
          } else {
            node.next = current;
            current.prev = node; //NEW {1}
            head.set(this, node);
          }
        } else if (position === this.size()) {
          //last item //NEW

          current = tail; // {2}
          current.next = node;
          node.prev = current;
          tail.set(this, node);
        } else {
          while (index++ < position) {
            //{3}
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;

          current.prev = node; //NEW
          node.prev = previous; //NEW
        }

        //update size of list
        let l = this.size();
        l++;
        length.set(this, l);

        return true;
      } else {
        return false;
      }
    }

    removeAt(position) {
      //check for out-of-bounds values
      if (position > -1 && position < this.size()) {
        let _head = this.getHead(),
          _tail = this.getTail(),
          current = _head,
          previous,
          index = 0;

        //removing first item
        if (position === 0) {
          _head = current.next; // {1}

          //if there is only one item, then we update tail as well //NEW
          if (this.size() === 1) {
            // {2}
            _tail = null;
          } else {
            _head.prev = null; // {3}
          }
        } else if (position === this.size() - 1) {
          //last item //NEW

          current = _tail; // {4}
          _tail = current.prev;
          _tail.next = null;
        } else {
          while (index++ < position) {
            // {5}

            previous = current;
            current = current.next;
          }

          //link previous with current's next - skip it to remove
          previous.next = current.next; // {6}
          current.next.prev = previous; //NEW
        }

        head.set(this, _head);
        tail.set(this, _tail);

        //update size of list
        let l = this.size();
        l--;
        length.set(this, l);

        return current.element;
      } else {
        return null;
      }
    }

    remove(element) {
      let index = this.indexOf(element);
      return this.removeAt(index);
    }

    indexOf(element) {
      let current = this.getHead(),
        index = -1;

      //check first item
      if (element == current.element) {
        return 0;
      }

      index++;

      //check in the middle of the list
      while (current.next) {
        if (element == current.element) {
          return index;
        }

        current = current.next;
        index++;
      }

      //check last item
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

    toString() {
      let current = this.getHead(),
        s = current ? current.element : "";

      while (current && current.next) {
        current = current.next;
        s += ", " + current.element;
      }

      return s;
    }

    inverseToString() {
      let current = this.getTail(),
        s = current ? current.element : "";

      while (current && current.prev) {
        current = current.prev;
        s += ", " + current.element;
      }

      return s;
    }

    print() {
      console.log(this.toString());
    }

    printInverse() {
      console.log(this.inverseToString());
    }

    getHead() {
      return head.get(this);
    }

    getTail() {
      return tail.get(this);
    }
  }
  return DoublyLinkedList;
})();

let list = new DoublyLinkedList();
list.append(15);
list.append(16); //15,16
list.print(); //15,16
list.printInverse(); //16, 15
list.insert(0, 13); //13,15,16
list.removeAt(0); //15,16

/**
 * 函数实现
 */
function DoubleLinkedList() {
  //属性
  this.head = null;
  this.tail = null;
  this.length = 0;

  //元素的构造函数
  function Node(item) {
    this.item = item;
    this.next = null;
    this.prev = null;
  }

  //方法

  //在末尾加入元素
  DoubleLinkedList.prototype.append = function (item) {
    let node = new Node(item);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  };

  //向指定位置插入元素
  DoubleLinkedList.prototype.insert = function (position, item) {
    //判断位置
    if (position < 0 || position > this.length) {
      return false;
    }
    let node = new Node(item);
    let index = 0;
    let current = this.head;
    let prev = null;
    if (position === this.length) {
      this.append(item);
    } else if (position === 0) {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      this.length++;
    } else {
      while (index < position) {
        prev = current;
        current = current.next;
        index++;
      }
      prev.next = node;
      current.prev = node;
      node.prev = prev;
      node.next = current;
      this.length++;
    }
  };

  //展示链表数据
  DoubleLinkedList.prototype.toString = function () {
    let current = this.head;
    let string = "";
    while (current) {
      string += current.item + " ";
      current = current.next;
    }
    return string;
  };

  //获取对应位置上的元素
  DoubleLinkedList.prototype.get = function (position) {
    if (position < 0 || position > this.length - 1) {
      return false;
    }
    let index = 0;
    let current = this.head;
    while (index < position) {
      current = current.next;
      index++;
    }
    return current.item;
  };

  //获取元素的索引
  DoubleLinkedList.prototype.indexOf = function (item) {
    let current = this.head;
    let index = 0;
    while (index < this.length) {
      if (current.item === item) {
        return index;
      } else {
        index++;
        current = current.next;
      }
    }
    return -1;
  };

  //修改某位置上的元素
  DoubleLinkedList.prototype.update = function (position, item) {
    if (position < 0 || position >= this.length) {
      return false;
    }
    let index = 0;
    let current = this.head;
    while (index < position) {
      index++;
      current = current.next;
    }
    current.item = item;
    return true;
  };

  //移除某位置上的元素
  DoubleLinkedList.prototype.removeAt = function (position) {
    //判断是否越界
    if (position < 0 || position >= this.length) {
      return false;
    }

    // 判断清除的元素是否为链表的唯一元素
    if (position === 0 && position === this.length - 1) {
      this.head = null;
      this.tail = null;
    }
    //判断清除的元素是否为链表的第一个元素
    else if (position === 0) {
      this.head.next.prev = null;
      this.head = this.head.next;
    }
    //判断清除的元素是否为链表的最后一个元素
    else if (position === this.length - 1) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      let current = this.head;
      let prev = null;
      let index = 0;
      while (index < position) {
        index++;
        prev = current;
        current = current.next;
      }
      prev.next = current.next;
      current.next.prev = prev;
    }
    this.length--;
    return true;
  };

  //移除某元素
  DoubleLinkedList.prototype.remove = function (data) {
    let index = this.indexOf(data);

    this.removeAt(index);

    return index;
  };

  //判断双向链表是否为空
  DoubleLinkedList.prototype.isEmpty = function () {
    if (this.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  //返回双向链表元素个数
  DoubleLinkedList.prototype.size = function () {
    return this.length;
  };
}

let _linked_list = new DoublyLinkedList();
_linked_list.append(15);
_linked_list.append(16); //15,16
_linked_list.print(); //15,16
_linked_list.printInverse(); //16, 15
_linked_list.insert(0, 13); //13,15,16
_linked_list.removeAt(0); //15,16
