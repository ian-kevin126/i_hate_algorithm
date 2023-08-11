/**
 * 链表：链表在逻辑结构上是一个挨着一个的数据，在实际存储时，并没有像顺序表（数组）那样也相互挨着。恰恰相反，数据随机分布在内存中的各个位置，这种存储结构称为线性表的链式存储。
 *
 * 链表存储有序的元素集合，但是和数组不同的是，链表中的元素在内存中的存储并不是连续的。每一个链表元素都包含了一个存储元素本身的节点和一个指向下一个元素的引用。
 *
 * 每个元素本身由两个部分组成：
 *    - 数据域：本身存储的信息
 *    - 指针域：指向直接后继的指针
 *
 *     ————————————        ————————————
 *     | 4 | next |  ——>   | 6 | next | ——>    next存储的为6这个node的索引，并不是值
 *     ————————————        ————————————
 *
 * 链表的特点：
 *    - 空间上不是连续的，链表更像是锁链，一环扣一环
 *    - 存放的一个值，都要多开销一个引用空间
 *
 * 优缺点：
 *  - 优点
 *    - 只要内存足够大，就能存的下，不用担心空间碎片的问题
 *    - 链表的添加和删除非常容易操作，时间复杂度为O（1）
 *    - 大小不固定，拓展很灵活
 *  - 缺点
 *    - 查询速度比较慢（查询某一个位置的数据）：链表是通过指针将零散的内存块串联起来的，所以链表不支持随机访问，如果要找特定的项，只能从头开始遍历，之道找到某个项，所以访问的时间复杂度是O（n）
 *    - 链表每一个节点都需要创建一个指向next的引用，会浪费一些空间
 *
 * 链表的实现：
 *  - append(element)：向链表尾部添加一个新元素，要注意的是链表是无序的。
 *  - insert(element)：在链表指定位置插入一个新元素。
 *  - remove(element)：从链表中移除一项
 *  - indexOf(element)：返回该元素在链表中的索引，如果链表中没有该元素就返回-1
 *  - removeAt(position)：从链表的指定位置移除元素
 *  - isEmpty：判断链表是否为空
 *  - size：返回链表包含的元素个数
 *  - toString：返回链表元素的字符串值
 *
 * https://www.yuque.com/docs/share/c762ca6e-f8b1-4039-8ae5-cc014b0e6bc3?# 《1、链表》
 */

// 生成链表
function Node(value) {
  this.value = value;
  this.next = null;
}

const a = new Node(1);
const b = new Node(2);
const c = new Node(3);
const d = new Node(4);

a.next = b;
b.next = c;
c.next = d;

console.log(a.value); // 1
console.log(a.next.value); // 2
console.log(a.next.next.value); // 3
console.log(a.next.next.next.value); // 4

/**
 * 链表的基本实现（单向链表）
 */
function LinkedList() {
  // node是链表中的单独元素，但是这个元素中又包含自身的值和指向下一个node的指针
  const Node = function (element = null, next = null) {
    // node的自身元素
    this.element = element;
    // 这个next要特别注意，它在理论上是指向链表下一个节点元素的指针，但是在js的实现中，其实这个指针不过是一个对象的索引，而这个索引包含的就是下一个node
    // 就像是这样{element:1,next:{element,next:{element:3,next...}}}，这种对象的一层层嵌套，这样也可以解释了为什么在中间插入链表元素时，
    // 需要一层一层的迭代到需要插入的位置。
    // 换句话说，这里的next指针，指向的是下一个node节点元素的整体，不单单只是node中的element元素。
    this.next = next;
  };

  let length = 0; // 链表长度初始化
  let head = null; // 在链表中，我们需要存储第一个节点元素的引用，也就是head，在没有节点元素的时候初始化为null。

  /**
   * append方法类似于js数组的push，向链表的尾部添加节点元素
   * append方法中有两种情况：一种是没有节点元素，链表长度是0，另一种是已经存在了至少一个节点元素，应对这两种不同的情况会有不同的操作。
   */
  this.append = function (element) {
    // 声明变量，append添加的element应该是node，所以通过Node类进行包装
    let node = new Node(element);
    // 这里就存在一个问题，就是我们在给链表添加节点元素的时候只有head的引用，也就是我们只知道head是什么，但是其他的我们一概不知。
    // 所以这里声明一个current变量，用来存储我们当前的节点是什么
    let current;

    // 这里，如果head是null，说明该链表是空的，因为有节点元素的链表的head会指向第一个节点元素，不可能为null。那么既然如此，我们的head=node就可以了。
    // 还有，这里的“=”，实在是让人很迷茫，既然是指针，为什么要“赋值”？因为无论是head、node.next（链表节点元素的指针）还是current还是下面会声明的previous。
    // 都是存储当前位置信息的一个存储器，也就是说，这些变量所代表的的是一个值信息的存储，它们存储的值代表它们所指向的节点元素。
    console.log(head);

    if (head === null) {
      head = node;
    } else {
      // 这里，如果head !== null，说明该链表至少有一个节点元素，那么当前的current自然就是head，因为我们要从head开始迭代到结尾。
      current = head;
      // 设置current为head，那么无论只有一个元素还是有多个节点元素，最后一个节点元素的next必为null，所以这里只要current.next不为null，那么久循环到current.next为null为止。
      while (current.next) {
        current = current.next;
      }

      // 既然我们找到了链表中的最后一个节点元素，那么把该节点元素的next = node就好了，每一个新的node的next必为null，那么我们将current.next指向node的时候，链表最后一个节点元素的指向自然就是null
      current.next = node;
    }

    // 别忘了，将链表的长度+1
    length++;
  };

  // 在链表的任意“合法”位置插入节点元素，position代表插入的位置
  this.insert = function (position, element) {
    // 如果position小于0，或者大于链表的长度，说明这个position不合法，直接返回false
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        // 当前的current是head，指的是要插入节点的position的右元素
        current = head,
        // 新增一个previous，指的是要衔接的插入的节点的position的左元素
        previous,
        // 这个index不是length，它是为了记录限定循环的计数器
        index = 0;

      if (position === 0) {
        // 如果position是0，意思就是在头部插入，那么新建的节点元素的指针 next 就指向了当前元素，而 head 自然就是新建的节点元素 node 了
        node.next = current;
        head = node;
      } else {
        // 如果position不是0，意思是在其他位置插入元素，在还没有达到目标位置之前，我们需要从head开始迭代过去，依次替换current和previous，直到到达目标位置。
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        // 当我们打到达目标位置之后，我们需要把新建的node节点元素插入到previous和current之间，也就是改变node节点和previous节点的指针，使node节点的指针指向当前的current，而previous的指向node
        node.next = current;
        previous.next = node;
      }
      // 插入成功后，长度+1，并返回true
      length++;
      return true;
    } else {
      return false;
    }
  };

  // 移除指定位置的节点元素
  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let current = head,
        previous,
        index = 0;

      if (position === 0) {
        head = current.next;
      } else {
        // 做同样的迭代
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        // 迭代到了我们指定的目标位置的时候
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };

  // 获取该元素在链表中的位置
  this.indexOf = function (element) {
    let current = head,
      index = 0;
    // 如果current为null，说明链表是空的
    while (current) {
      // 当element和current的element相等时，说明我们找到了，直接返回index就行了
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };

  // 获取指定位置的元素值
  this.getElementAt = function (position) {
    if (position < 0 || position > length) return null;
    let current = head;
    for (let i = 0; i < position; i++) {
      current = current.next;
    }
    return current.element;
  };

  // 既然我们有了removeAt和indexOf两个方法，那么设计remove方法就容易了
  this.remove = function (element) {
    let index = this.indexOf(element);
    console.log(index);
    return this.removeAt(index);
  };

  this.isEmpty = function () {
    return length === 0;
  };

  this.size = function () {
    return length;
  };

  this.getHead = function () {
    return head;
  };

  this.toString = function () {
    let current = head,
      string = "";
    while (current) {
      string += current.element + (current.next ? "n" : "");
      current = current.next;
    }
    return string;
  };

  this.print = function () {
    console.log(this.toString());
  };
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
list.print(); //1n2n3n4n5
list.insert(2, 99);
list.print(); //1n2n99n3n4n5
list.removeAt(1);
list.print(); //1n99n3n4n5
