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
      this.heap[parentIndex].value > this.heap[index].value
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
      this.heap[leftIndex].value < this.heap[index].value
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }

    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].value < this.heap[index].value
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

/******************** LeetCode 347：前K个高频元素 ****************************/
var topKFreqeunt = function (nums, k) {
  // 字典来统计数字出现的频率
  const map = new Map();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  console.log(map); // Map(3) {1 => 3, 2 => 2, 3 => 1}
  // 接下来堆频率进行排序
  // 将字典转化为数组
  console.log(Array.from(map));
  const list = Array.from(map).sort((a, b) => b[1] - a[1]);
  console.log(list);
  return list.slice(0, k).map((n) => n[0]); // (2) [1, 2]
};

console.log(topKFreqeunt([1, 1, 1, 2, 2, 3], 2));

// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 用最小堆来解决
var topKFreqeunt1 = function (nums, k) {
  // 字典来统计数字出现的频率
  const map = new Map();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });

  const h = new MinHeap();
  map.forEach((value, key) => {
    h.insert({ value, key });
    if (h.size() > k) {
      h.pop();
    }
  });
  return h.heap.map((a) => a.key);
};

console.log(topKFreqeunt1([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFreqeunt1([1], 1)); // [1]

// 时间复杂度：O(nlogk)
// 空间复杂度：O(n)
