/**
 * 堆：堆是一种完全二叉树；JavaScript中通常用数组来表示对。
 *
 * 最小堆：所有的节点都小于等于它的子节点
 * 最大堆：左右的节点都大于等于他的子节点
 *
 * 堆的表示：
 *                  1(0)
 *               /        \
 *            3(1)         6(2)
 *          /     \         /
 *        5(3)   9(4)     8(5)
 *
 *        | 1 | 3 | 6 | 5 | 9 | 8 |
 *          0   1   2   3   4   5
 *
 * - 左侧子节点的位置是 2 * index + 1    比如：3的位置是1 = 2 * 0 + 1      5的位置是3 = 1 * 2 + 1
 * - 右侧子节点的位置是 2 * index + 2    比如：9的位置是4 = 2 * 1 + 2      6的位置是2 = 2 * 0 + 2
 * - 任意节点的父节点的位置是 （index - 1） / 2 (求商)   比如：5的父节点的位置1 = （3 - 1） / 2
 *
 * 堆的应用：
 *  - 堆能高效地、快速地找出最大值和最小值，而且时间复杂度为O（1）
 *  - 找出第 k 个最大（小）元素
 *
 * 应用：找出第 k 个最大（小）元素
 *  - 构建一个最小堆（如上图），并将元素依次插入堆中
 *  - 当堆的容量超过 k，就删除堆顶
 *  - 插入结束以后，堆顶就是第 k 个最大元素
 */

/**
 * 实现最小堆类
 *  - 在类里，声明一个数组，用来装元素
 *  - 主要方法：插入、删除堆顶、获取堆顶、获取堆大小
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  /**
   * 插入
   *  - 将值插入堆的底部，即数组的尾部
   *  - 然后上移：将这个值和它的父节点进行交换，直到父节点小于等于这个插入的值
   *  - 大小为 k 的堆中插入元素的时间复杂度为O（logk）
   */

  // 获取父节点
  getParentIndex(i) {
    // return Math.floor((i - 1) / 2);
    // 更简洁的写法，用位移
    return (i - 1) >> 1;
  }

  swap(pIndex, index) {
    const temp = this.heap[pIndex];
    this.heap[pIndex] = this.heap[index];
    this.heap[index] = temp;
  }

  shiftUp(index) {
    // 如果上移的节点已经是堆顶的了，就停止
    if (index === 0) return;
    // 拿到父节点的index
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      // 如果父节点的值大于当前节点的值，说明这个结构是不对的，需要交换一下
      this.swap(parentIndex, index);
      // 继续上移，直到上移到顶点
      this.shiftUp(parentIndex);
    }
  }

  insert(value) {
    // 将值插入堆底部
    this.heap.push(value);
    // 上移，就是将刚插入到堆底部的值上移
    this.shiftUp(this.heap.length - 1);
  }

  /**
   * 删除堆顶
   *  - 用数组尾部元素替换堆顶（直接删除堆顶，所有后面的元素都会向前移动一位，会破坏堆结构）
   *  - 然后下移：将新堆顶和它的子节点进行交换，直到子点大于等于这个新堆顶
   *  - 大小为 k 的堆中删除堆顶的时间复杂度为O（logk）
   */

  // 获取左子节点的位置
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  // 获取右子节点的位置
  getRightIndex(i) {
    return i * 2 + 2;
  }

  shiftDown(index) {
    // 获取左右子节点的位置
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      // 在最小堆中，如果左子节点的值小于节点的值，说明是不对的，要交换值
      this.swap(leftIndex, index);
      // 继续下移，直到找到它合适的位置
      this.shiftDown(leftIndex);
    }

    if (this.heap[rightIndex] < this.heap[index]) {
      // 在最小堆中，如果右子节点的值小于节点的值，说明是不对的，要交换值
      this.swap(rightIndex, index);
      // 继续下移，直到找到它合适的位置
      this.shiftDown(rightIndex);
    }
  }

  pop() {
    // 将堆底的元素移除，然后放到堆顶，保证堆结构不被破坏
    this.heap[0] = this.heap.pop();
    // 执行下移操作
    this.shiftDown(0);
  }

  /**
   * 获取堆顶：返回数组的头部
   */
  peek() {
    return this.heap[0];
  }

  /**
   * 获取队的大小：返回数组的长度
   */
  size() {
    return this.heap.length;
  }
}

const _heap = new MinHeap();
_heap.insert(3);
_heap.insert(2);
_heap.insert(1);
console.log(_heap); // heap: (3) [1, 3, 2]
_heap.pop();
console.log(_heap); // heap: (2) [2, 3] 1被删除了，说明我们的方法是有效的
console.log(_heap.peek()); // 2
console.log(_heap.size()); // 2
