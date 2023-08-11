/**
 * 链表的应用
 */

/**
 * 1、链表的遍历
 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const a = new Node(1);
const b = new Node(2);
const c = new Node(3);
const d = new Node(4);
a.next = b;
b.next = c;
c.next = d;
d.next = null;

// 遍历链表
function each(result) {
  if (result === null) return;
  console.log(result.value);
  each(result.next);
}
each(a); // 1 2 3 4

/**
 * 2、链表逆置
 *
 *     | A | ——> | B | ——> | C |   变成   | A | <—— | B | <—— | C |
 */
function reverse(result) {
  // 如果找到倒数第二个节点值
  if (result.next.next === null) {
    // 将倒数第一个节点的next指向倒数第二个
    result.next.next = result;
    // 将其返回
    return result.next;
  } else {
    // 使用递归，接受返回的数据
    const value = reverse(result.next);
    // 将前一个的next指向自己
    result.next.next = result;
    // 将当前的next置空，如果不置空，当为第一节点时第一个会指向第一个节点，因为一开始第一个节点就指向第二节点
    result.next = null;
    return value;
  }
}
reverse(a);
each(d); // 4 3 2 1

/**
 * 升级版：局部反转一个链表
 * 题目描述：反转从未知 m 到 n 的链表，请使用一趟扫描完成反转
 * 示例：1 ——> 2 ——> 3 ——> 4 ——> 5 ——> NULL， m=2， n=4
 * 输出：1 ——> 4 ——> 3 ——> 2 ——> 5 ——> NULL
 *
 * 注意：我们遍历链表的顺序是从前往后遍历，那么为了避免节点 1 和节点 2 随着遍历向后推进被遗失，我们需要提前把 1 节点缓存下来。而节点 5 就没有那么麻烦了：随着遍历的进行，
 * 但我们完成了节点 4 的指针反转后，此时的current指针就恰好指在节点 5 上。
 * */
const reverseBetween = function (head, m, n) {
  // 定义 pre， cur， 用leftHead来承接整个区间的前驱节点
  let previous, current, leftHead;
  // 别忘了 dummy 节点
  const dummy = new ListNode();
  // dummy节点的后继节点是头节点
  dummy.next = head;
  // p 是一个游标，用于遍历，最初指向dummy
  let p = dummy;
  // p往前走m-1不，走到整个区间的前驱节点处
  for (let i = 0; i < m - 1; i++) {
    p = p.next;
  }

  // 缓存这个前驱节点到 leftHead 里
  leftHead = p;
  // start是反转区间的第一个节点
  let start = leftHead.next;
  // previous 指向start
  previous = start;
  // current 指向 start 的下一个节点
  current = previous.next;
  // 开始重复反转动作
  for (let j = m; j < n; j++) {
    let next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  // leftHead 的后继节点此时为反转后的区间的第一个节点
  leftHead.next = previous;
  // 将区间内反转后的最后一个节点 next 指向 current
  start.next = current;
  return dummy.next;
};

/**
 * 3、链表的应用——环形链表-入环的起点
 *
 * 真题描述：给定一个链表，返回链表开始入环的第一个结点。如果链表无环，则返回null。
 *
 * 思路：只需要在第一次flag时返回该节点就可以了
 *
 * 注意⚠️：若条件给定不能修改节点，则可以改为用快慢指针来做
 *
 * https://www.yuque.com/docs/share/7164eb06-5bd8-46b6-9455-0a376b77efa1?# 《6、链表应用》
 */
// 入参是头节点
const detectCycle = function (head) {
  while (head) {
    if (head.flag) {
      return head;
    } else {
      head.flag = true;
      head = head.next;
    }
  }
  return null;
};

/**
 * 4、环形链表 - 链表是否有环
 *
 * 思路：走一步立一个flag，当有一个flag存在时该链表就有环
 */
// 入参是头节点
const hasRecycle = function (head) {
  while (head) {
    if (head.flag) {
      return true;
    } else {
      head.flag = true;
      head = head.next;
    }
  }
  return false;
};

/**
 * 5、合并链表：将两个有序链表合并为一个新的有序链表并返回，新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 思路：比较当前两个元素的大小，小的添加到链表，循环进行，直至链表为空
 *
 * 注意：处理链表的本质，是处理链表节点之间的指针关系
 */
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const mergeTwoLinkedList = function (linkedList_1, linkedList_2) {
  // 定义头节点，确保链表可以被访问到
  let head = new ListNode();
  // current 就是咱们那根“针”
  let current = head;
  // 针开始在“l1”和“l2”之间穿梭了
  while (linkedList_1 && linkedList_2) {
    // 如果 linkedList_1 的节点值小
    if (linkedList_1.value <= linkedList_2.value) {
      // 先串起 linkedList_1 的节点
      current.next = linkedList_1;
      // linkedList_1 指针向前移一步
      linkedList_1 = linkedList_1.next;
    } else {
      // linkedList_2 较小时，串起 linkedList_2 节点
      current.next = linkedList_2;
      // linkedList_2 向前一步
      linkedList_2 = linkedList_2.next;
    }

    // “针”在串起一个节点后，也会往前一步
    current = current.next;
  }

  // 处理链表不等长的情况
  current.next = linkedList_1 !== null ? linkedList_1 : linkedList_2;
  // 返回起始节点
  return head.next;
};

/**
 * 6、链表节点的删除：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次
 */
const deleteDuplicates = function (head) {
  // 设定 current 指针，初始位置为链表第一个节点
  let current = head;
  // 遍历链表
  while (current !== null && current.next !== null) {
    // 若当前节点和它后面一个节点值相等（重复）
    if (current.value === current.next.value) {
      current.next = current.next.next;
    } else {
      // 若不重复，继续遍历
      current = current.next;
    }
  }
  return head;
};

/**
 * 7、删除链表的倒数第N个节点（快慢指针）
 *
 * 快慢指针指的是两个一前一后的指针，两个指针往同一个方向走，只是一个快一个慢。快慢指针严格来说只能有俩，不过实际做题中，可能出现一前、一中、一后的三个指针，这种
 * 超过两个指针的解题方法也叫“多指针法”。快慢指针 + 多指针，双管齐下，可以帮我们解决很多链表中的大部分复杂操作的问题。
 *
 * 思路：
 *  - 首先两个指针 slow 和 fast，全部指向链表的起始位 —— dummy 节点
 *  - 快指针先出发，闷头走 n 步，在第n个节点处打住，这里 n = 2；
 *  - 然后，快慢指针一起前进，当快指针前进到最后一个节点处时，两个指针再一起停下来
 *  - 此时，慢指针所指的位置，就是倒数第 n 个节点的前一个节点。基于此节点进行删除。
 *
 * dummy节点：它可以帮助我们处理掉头结点为空的边界问题，帮助我们简化解题过程。因此涉及链表操作、尤其是涉及节点删除的题目（对前驱节点的存在性要求比较高）。
 * */
const removeNthFromEnd = function (head, n) {
  // 初始化 dummy 节点
  const dummy = new ListNode();
  // dummy 指向头节点
  dummy.next = head;
  // 初始化快慢指针，均指向dummy
  let fast = dummy;
  let slow = dummy;

  // 快指针闷头走 n 步
  while (n !== 0) {
    fast = fast.next;
    n--;
  }

  // 快慢指针一起走
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  // 慢指针删除自己的后继节点
  slow.next = slow.next.next;
  // 返回头节点
  return dummy.next;
};

/**
 * 8、旋转链表
 */
