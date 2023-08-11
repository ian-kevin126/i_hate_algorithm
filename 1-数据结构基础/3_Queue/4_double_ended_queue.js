/**
 * 双端队列（double-ended queue)：是一种允许我们同时从前端和后端添加和移除元素的特殊队列，在计算机科学中，双端队列的一个常见应用是存储一系列的撤销操作。
 * 双端队列同时遵守了先进先出和后进先出的原则，可以说是把队列和栈相结合的一种数据结构，如果链表实现，即是头插法和尾插法。
 *
 *    push ——>   -------------------------------  pop ——>
 *               |  4 | 1 | 6 | 7 | 3 | 2 | 5  |
 *     <—— pop   -------------------------------  <—— push
 */

/**
 * 典型的问题：滑动窗口问题（双端队列）：允许在队列的两端进行插入和删除操作，提现在编码上，最常见的载体就是即允许使用pop、push同时有允许使用shift、unshift。
 *
 * 题目描述：给定一个数组 nums 和滑动窗口的大小 k ，请找出所有滑动窗口里的最大值。
 * 示例：输入 ——> nums = [1, 3, -1, -3, 5, 3, 6, 7]，和 k = 3
 *      输出 ——> [3, 3, 5, 5, 6, 7]
 */

/**
 * 解决方案一：双指针 + 遍历法，时间复杂度：O(kn)
 * @param {*} nums
 * @param {*} k
 * @returns
 */
const maxSlidingWindow1 = function (nums, k) {
  // 缓存数组的长度
  const len = nums.length;
  // 定义结果数组
  const res = [];
  // 初始化左指针
  let left = 0;
  // 初始化右指针
  let right = k - 1;
  // 当数组没有被遍历完时，执行循环体内的逻辑
  while (right < len) {
    // 计算当前窗口内的最大值
    const max = calMax(nums, left, right);
    // 将最大值推入结果数组
    res.push(max);
    // 左指针前进一步
    left++;
    // 右指针前进一步
    right++;
  }
  // 返回结果数组
  return res;
};

// 这个函数用来计算最大值
function calMax(arr, left, right) {
  // 处理数组为空的边界情况
  if (!arr || !arr.length) {
    return;
  }
  // 初始化 maxNum 的值为窗口内第一个元素
  let maxNum = arr[left];
  // 遍历窗口内所有元素，更新 maxNum 的值
  for (let i = left; i <= right; i++) {
    if (arr[i] > maxNum) {
      maxNum = arr[i];
    }
  }
  // 返回最大值
  return maxNum;
}

/**
 * 双端队列法：维护一个递减的双端队列
 * - 检查队尾元素，看是不是都满足大于等于当前元素的条件。如果是的话，直接将当前元素入队。否则，将队尾元素逐个出队、直到队尾元素大于等于当前元素为止。
 * - 将当前元素入队
 * - 检查队头元素，看队头元素是否已经被排除在滑动窗口的范围之外了。如果是，则将队头元素出队。
 * - 判断滑动窗口的状态：看当前遍历过的元素个数是否小于 k。如果元素个数小于k，这意味着第一个滑动窗口内的元素都还没遍历完、第一个最大值还没出现，此时我们还不能动结果数组，
 *   只能继续更新队列；如果元素个数大于等于k，这意味着滑动窗口的最大值已经出现了，此时每遍历到一个新元素（也就是滑动窗口每往前走一步）都要及时地往结果数组里添加当前滑动窗口对应的最大值
 *   （最大值就是此时此刻双端队列的队头元素）
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow2 = function (nums, k) {
  // 缓存数组的长度
  const len = nums.length;
  // 初始化结果数组
  const res = [];
  // 初始化双端队列
  const deque = [];
  // 开始遍历数组
  for (let i = 0; i < len; i++) {
    // 当队尾元素小于当前元素时
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      // 将队尾元素（索引）不断出队，直至队尾元素大于等于当前元素
      deque.pop();
    }
    // 入队当前元素索引（注意是索引）
    deque.push(i);
    // 当队头元素的索引已经被排除在滑动窗口之外时
    while (deque.length && deque[0] <= i - k) {
      // 将队头元素索引出队
      deque.shift();
    }
    // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
    if (i >= k - 1) {
      res.push(nums[deque[0]]);
    }
  }
  // 返回结果数组
  return res;
};
