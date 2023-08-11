const a = { val: "a" };
const b = { val: "b" };
const c = { val: "c" };
const d = { val: "d" };

a.next = b;
b.next = c;
c.next = d;

// 遍历链表
let p = a;
while (p) {
  console.log(p.val);
  p = p.next;
}

// 插入值
const e = { val: "e" };
c.next = e;
e.next = d;

// 删除
c.next = d;

// leetCode 237：删除链表中的节点
var deleteNode = (node) => {
  // 将被删除节点的值改为下一个节点的值（下个节点往前移一位）
  node.val = node.next.val;
  // 删除下一个节点
  node.next = node.next.next;
};

// LeetCode 206：反转单链表
var reverseList = function (head) {
  let p1 = head; // 快指针
  let p2 = null; // 慢指针
  // 终止条件是快指针遍历完链表就好了
  while (p1) {
    // 保存p1位临时遍历，不影响它的遍历
    const temp = p1.next;
    p1.next = p2;
    p2 = p1;
    p1 = temp;
  }
  console.log(p1 && p1.val, p2 && p2.val); // null 5
  // 最终返回慢指针
  return p2;
};

// LeetCode 2：两数相加
var addTwoNumber = (l1, l2) => {
  // 新建一个空链表，用来存储结果
  const l3 = new ListNode(0);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  // 存储相加的进位，比如：4 + 7 = 11
  let carry = 0;

  // 遍历p1，p2指针，直到最长的那个链表被遍历完
  while (p1 || l2) {
    // 获取链表节点的值
    const v1 = p1 ? p1.val : 0;
    const v2 = p2 ? p2.val : 0;

    // 两节点的值相加，carry是上一次相加的进位
    const val = v1 + v2 + carry;
    // 存储此次相加的进位
    carry = Math.floor(val / 10);
    // 将结果追加到新建的l3链表上
    p3.next = new ListNode(val % 10);

    // 往后继续遍历
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
    // 同时也要将l3链表往前一位
    p3 = p3.next;
  }
  // 如果遍历完了以后，进位还有值，说明最高位相加结果大于10，还有进位
  if (carry) {
    p3.next = new ListNode(carry);
  }
  // 返回结果
  return p3.next;
};

// 时间复杂度：O（n）—— l1和l2这两个链表的最大值
// 空间复杂度：O（n）

// LeetCode 83：删除排序链表中的重复元素
var deleteDuplicates = function (head) {
  let p = head;
  while (p && p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return head;
};

// LeetCode 141：环形链表
var hasCycle = function (head) {
  let p1 = head;
  let p2 = head;

  while (p1 && p2 && p2.next) {
    // 两个指针——快指针p1和慢指针p2
    p1 = p1.next;
    p2 = p2.next.next;
    // 如果两个指针相逢了，说明是有环的
    if (p1 === p2) {
      return true;
    }
  }
  return false;
};

// js原型链
const obj = {};
const fun = () => {};
const arr = [];

// instanceof原理：如果A沿着原型链能找到B.prototype，那么 A instanceof B 就为true
const _instanceof = (A, B) => {
  let p = A;
  while (p) {
    if (p === B.prototype) {
      return true;
    }
    p = p.__proto__;
  }
  return false;
};

// 使用链表指针获取JSON的节点值
const _json = {
  a: { b: { c: 1 } },
  d: { e: 2 },
};

const path = ["a", "b", "c"];

let p = _json;
path.forEach((k) => {
  p = p[k];
  console.log(p);
});
