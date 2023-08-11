const graph = {
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [3],
};

/************************ 图的深度优先遍历 ****************************/
const visited = new Set();
const dfs = (n) => {
  // 1，访问根节点
  console.log(n);
  visited.add(n);
  graph[n].forEach((c) => {
    // 2，对根节点的 “没有访问过的相邻节点” 挨个进行深度优先遍历
    if (!visited.has(c)) {
      dfs(c);
    }
  });
};

dfs(2); // 2 0 1 3

/************************ 图的广度优先遍历 ****************************/
const visited1 = new Set();
visited1.add(2);
// 起始节点
const q = [2];
while (q.length) {
  const n = q.shift();
  console.log(n);
  graph[n].forEach((c) => {
    if (!visited1.has(c)) {
      q.push(c);
      visited1.add(c);
    }
  });
}

/************************ LeetCode 65：有效数字 ****************************/
var isNumber = (s) => {
  // 邻接表
  const graph = {
    0: { blank: 0, sign: 1, ".": 2, digit: 6 },
    1: { digit: 6, ".": 2 },
    2: { digit: 3 },
    3: { digit: 3, e: 4 },
    4: { digit: 5, sign: 7 },
    5: { digit: 5 },
    6: { digit: 6, ".": 3, e: 4 },
    7: { digit: 5 },
  };

  // 起始节点
  let state = 0;
  // 遍历字符串
  for (let c of s.trim()) {
    if (c >= "0" && c <= "9") {
      c = "digit";
    } else if (c === " ") {
      c = "blank";
    } else if (c === "+" || c === "-") {
      c = "sign";
    } else {
      c = "e";
    }
    state = graph[state][c];
    if (state === undefined) {
      return false;
    }
  }

  return state === 3 || state === 5 || state === 6;
};

// 时间复杂度：O(n)
// 空间复杂度：O(1)

console.log(isNumber("0")); // true
console.log(isNumber(" 0.1")); // true
console.log(isNumber("abc")); // false
console.log(isNumber("1 a")); // false

/********************* LeetCode 417：太平洋大西洋水流问题 ******************************/
const pacificAtlantic = function (matrix) {
  // 排除矩阵的异常情况
  if (!matrix || !matrix[0]) {
    return [];
  }
  const m = matrix.length;
  const n = matrix[0].length;
  const flow1 = Array.from({ length: m }, () => new Array(n).fill(false));
  const flow2 = Array.from({ length: m }, () => new Array(n).fill(false));

  const dfs = (r, c, flow) => {
    flow[r][c] = true;
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([nr, nc]) => {
      if (
        // 保证在矩阵中
        nr >= 0 &&
        nr < m &&
        nc >= 0 &&
        nc < n &&
        // 防止死循环
        !flow[nr][nc] &&
        // 保证逆流而上
        matrix[nr][nc] >= matrix[r][c]
      ) {
        dfs(nr, nc, flow);
      }
    });
  };

  // 沿着海岸线逆流而上
  for (let r = 0; r < m; r++) {
    dfs(r, 0, flow1);
    dfs(r, n - 1, flow2);
  }

  for (let c = 0; c < n; c++) {
    dfs(0, c, flow1);
    dfs(m - 1, c, flow2);
  }

  // 搜集能流到两个大洋里的坐标
  const res = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      // 如果既能流到太平洋又能流到大西洋，就是目标结果
      if (flow1[r][c] && flow2[r][c]) {
        res.push([r, c]);
      }
    }
  }
  return res;
};

/********************* LeetCode 133：克隆图 ******************************/
function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

var cloneGraph = function (node) {
  if (!node) return false;
  const visited = new Map();
  const dfs = (n) => {
    console.log(n.val);
    // 克隆节点
    const nCopy = new Node(n.val);
    // 存储节点
    visited.set(n);
    (n.neighbors || []).forEach((ne) => {
      if (!visited.has(ne)) {
        dfs(ne);
      }
      nCopy.neighbors.push(visited.get(ne));
    });
  };
  dfs(node);
  return visited.get(node);
};

// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 用广度优先遍历做
var cloneGraph1 = function (node) {
  if (!node) return false;
  const visited = new Map();
  visited.set(node, new Node(node.val));
  const q = [node];
  while (q.length) {
    const n = q.shift();
    console.log(n.val);
    (n.neighbors || []).forEach((ne) => {
      if (!visited.has(ne)) {
        q.push(ne);
        visited.set(ne, new Node(ne.val));
      }
      visited.get(n).neighbors.push(visited.get(ne));
    });
  }
  return visited.get(node);
};
