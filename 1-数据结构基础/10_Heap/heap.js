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
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }

    if (this.heap[rightIndex] < this.heap[index]) {
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
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
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

const h = new MinHeap();
h.insert(3);
h.insert(2);
h.insert(1);
h.pop();

/******************** LeetCode 215：数组中的第K个最大元素 ****************************/
var findKthLargest = function (nums, k) {
  const h = new MinHeap();
  nums.forEach((n) => {
    h.insert(n);
    if (h.size() > k) {
      h.pop();
    }
  });
  return h.peek();
};

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
// 时间复杂度：O(nlogk)
// 空间复杂度：O(k)
