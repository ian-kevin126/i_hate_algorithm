const queue = [];

// 入队
queue.push(1);
queue.push(2);

// 出队
const item1 = queue.shift();
const item2 = queue.shift();

// LeetCode 933：最近请求次数
const RecentCounter = function () {
  this.q = [];
};

RecentCounter.prototype.ping = function (t) {
  this.q.push(t);
  while (t - this.q[0] > 3000) {
    this.q.shift();
  }
  return this.q.length;
};
