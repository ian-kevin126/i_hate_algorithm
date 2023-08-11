/** ************ JavaScript实现：最小堆类 ***************** */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 获取节点的父节点
  getParentIndex(i) {
    return (i - 1) >> 1;
  }

  // 获取左侧节点
  getLeftIndex(i) {
    return i * 2 + 1;
  }

  // 获取右侧节点
  getRightIndex(i) {
    return i * 2 + 2;
  }

  swap(l1, l2) {
    const temp = this.heap[l1];
    this.heap[l1] = this.heap[l2];
    this.heap[l2] = temp;
  }

  // 上移
  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].val > this.heap[index].val
    ) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].val < this.heap[index].val
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }

    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].val < this.heap[index].val
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  // 插入
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }

  // 删除堆顶
  pop() {
    if (this.size() === 1) return this.heap.shift();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
    return top;
  }

  // 获取堆顶
  peek() {
    return this.heap[0];
  }

  // 获取堆的大小
  size() {
    return this.heap.length;
  }
}

/******************** LeetCode 23：合并K个排序链表 ****************************/
function ListNode(val) {
  this.val = val;
  this.next = null;
}

var mergeKList = function (lists) {
  const res = new ListNode(0);
  let p = res;
  const h = new MinHeap();
  lists.forEach((l) => {
    if (l) h.push(l);
  });
  while (h.size()) {
    const n = h.pop();
    p.next = n;
    p = p.next;
    if (n.next) h.insert(n.next);
  }
  return res.next;
};

// 时间复杂度：O(nlogK)
// 空间复杂度：O(K)
