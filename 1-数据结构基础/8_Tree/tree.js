const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        {
          val: "d",
          children: [],
        },
        {
          val: "e",
          children: [],
        },
      ],
    },
    {
      val: "c",
      children: [
        {
          val: "f",
          children: [],
        },
        {
          val: "g",
          children: [],
        },
      ],
    },
  ],
};

/**
 * 深度优先遍历
 * @param {*} root
 */
const dfs = (root) => {
  // 1，访问根节点
  console.log(root.val);
  //,2，对根节点的children挨个进行深度优先遍历
  root.children.forEach(dfs);
};

// dfs(tree); // a b d e c f g

/**
 * 广度优先遍历
 * @param {*} root
 */
const bfs = (root) => {
  // 1，新建一个队列，把根节点入队
  const q = [root];
  // 4，重复2,3步，知道队列为空
  while (q.length > 0) {
    // 2，把队头出队并访问
    const n = q.shift();
    console.log(n.val);
    // 3，把队头的children挨个入队
    n.children.forEach((child) => {
      q.push(child);
    });
  }
};

// bfs(tree); // a b c d e f g

/**
 * 二叉树的遍历
 */
const binaryTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
};

/*********************************  先中后序遍历（递归版） *********************************/

// 先序遍历（根-左-右）
const preOrder = (root) => {
  if (!root) return;
  console.log(root.val);
  preOrder(root.left);
  preOrder(root.right);
};

// console.log("先序遍历（递归版）", preOrder(binaryTree)); // 1 2 4 5 3 6 7

// 中序遍历（左-根-右）
const inOrder = (root) => {
  if (!root) return;
  inOrder(root.left);
  console.log(root.val);
  inOrder(root.right);
};

// console.log("中序遍历（递归版）", inOrder(binaryTree)); // 4 2 5 1 6 3 7

// 后序遍历（左-右-根）
const postOrder = (root) => {
  if (!root) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
};

// console.log("后序遍历（递归版）", postOrder(binaryTree)); // 4 5 2 6 7 3 1

/*********************************  先中后序遍历（非递归版） *********************************/

// 先序遍历（根-左-右）
const preOrder1 = (root) => {
  // if (!root) return;
  // console.log(root.val);
  // preOrder(root.left);
  // preOrder(root.right);

  if (!root) return;
  // 1，先将根节点推出栈中
  const stack = [root];
  // 不断遍历栈，直到栈为空
  while (stack.length) {
    // 弹出弹顶
    const n = stack.pop();
    // 访问栈顶节点值
    console.log(n.val);
    // 由于栈是后进先出，所以先把右节点push进栈
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
};

console.log("先序遍历（递归版）");
preOrder1(binaryTree); // 1 2 4 5 3 6 7

// 中序遍历（左-根-右）
const inOrder1 = (root) => {
  // if (!root) return;
  // inOrder1(root.left);
  // console.log(root.val);
  // inOrder1(root.right);

  if (!root) return;
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      // 先把左子树push进栈
      stack.push(p);
      p = p.left;
    }
    // 访问左子树
    const n = stack.pop();
    console.log(n.val);
    // 访问完了之后，将指针移到右子树
    p = n.right;
  }
};

console.log("中序遍历（递归版）");
inOrder1(binaryTree); // 4 2 5 1 6 3 7

// 后序遍历（左-右-根）
const postOrder1 = (root) => {
  if (!root) return;
  // postOrder1(root.left);
  // postOrder1(root.right);
  // console.log(root.val);
  const stack = [root];
  // 倒置的栈
  const outputStack = [];
  // 不断循环，按照左-右-根的顺序将节点进栈到倒置栈里
  while (stack.length) {
    // 将根节点弹出，push到倒置栈里面
    const n = stack.pop();
    outputStack.push(n);

    // 接着先进栈左子树
    if (n.left) stack.push(n.left);
    // 进栈右子树
    if (n.right) stack.push(n.right);
  }

  // 进栈完成以后，遍历栈，访问节点值
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.val);
  }
};

console.log("后序遍历（递归版）");
postOrder1(binaryTree); // 4 5 2 6 7 3 1

/*********************** LeetCode 104：二叉树的最大深度（深度优先遍历） **********************/
var maxDepth = function (root) {
  let res = 0;
  const dfs = (n, l) => {
    if (!n) return;
    if (!n.left && !n.right) {
      // 如果当前节点是叶子节点，再去取最大的深度，这样避免掉一些无所谓的计算，节省时间
      res = Math.max(res, l);
    }
    // 深度遍历左、右子树，每次遍历到子树就把深度加1
    dfs(n.left, l + 1);
    dfs(n.right, l + 1);
  };
  dfs(root, 1);
};

/*********************** LeetCode 111：二叉树的最小深度（广度优先遍历） **********************/
var minDepth = function (root) {
  if (!root) return;
  // 记录节点及其深度
  const q = [[root, 1]];
  // 广度优先遍历
  while (q.length) {
    const [n, l] = q.shift();
    console.log(n.val);
    // 只要遍历到一个节点为叶节点就不再遍历，说明已经出现最小深度的节点了
    if (!n.left && !b.right) return;
    if (n.left) q.push([n.left, l + 1]);
    if (n.right) q.push([n.right, l + 1]);
  }
};

// 时间复杂度：O（n）
// 空间复杂度：O（n）

/********************** LeetCode 102：二叉树的层序遍历 *****************************/
var levelOrder = (root) => {
  if (!root) return [];
  // 放置二叉树的节点和层级
  const q = [[root, 0]];
  const res = [];
  while (q.length) {
    const [n, level] = q.shift();
    console.log(n.val, level);

    // 如果res中没有对应层级的节点值，就新建一个
    if (!res[level]) {
      res.push([n.val]);
    } else {
      // 如果有，就将节点值push到同层的数组
      res[level].push(n.val);
    }
    if (n.left) q.push([n.left, level + 1]);
    if (n.right) q.push([n.right, level + 1]);
  }
  return res;
};
// 时间复杂度：O（n）
// 空间复杂度：O（n）

/**
 * 更好的方法，如果我们能在每次层序遍历的时候，把同层的出队，再把下一层级的节点全部入队，那这样就能将同层的直接push到
 * 最终的数组里，就不需要记录层级。
 */
var levelOrder1 = (root) => {
  if (!root) return;
  const q = [root];
  const res = [];
  while (q.length) {
    let len = q.length;
    // 为每个层级新建一个空数组，来装这一层级的节点值
    res.push([]);
    // 有几个节点就循环几次
    while (len--) {
      const n = q.shift();
      // 将同层的push到最终的数组
      res[res.length - 1].push(n.val);
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
  }
  return res;
};
// 时间复杂度：O（n）
// 空间复杂度：O（n）

/*********************** LeetCode 94：二叉树的中序遍历 **********************/
var inOrderTraversal = (root) => {
  const res = [];
  // 中序遍历
  const rec = (n) => {
    if (!n) return;
    rec(n.left);
    res.push(n.val);
    rec(n.right);
  };
  rec(root);
  return res;
};

// 递归版的太简单了，我们用一下迭代版的
var inOrderTraversal1 = (root) => {
  const res = [];
  const stack = [];
  let p = root;
  while (stack.length || p) {
    // 先将所有的左子节点全部入栈
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    res.push(n.val);
    p = n.right;
  }
  return res;
};

console.log(inOrderTraversal1(binaryTree)); // [4, 2, 5, 1, 6, 3, 7]

/*********************** LeetCode 112：路径总和（深度优先遍历） **********************/
const binaryTree1 = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11,
      left: {
        val: 7,
        left: null,
        right: null,
      },
      right: {
        val: 2,
        left: null,
        right: null,
      },
    },
    right: null,
  },
  right: {
    val: 8,
    left: {
      val: 13,
      left: null,
      right: null,
    },
    right: {
      val: 4,
      left: null,
      right: {
        val: 1,
        left: null,
        right: null,
      },
    },
  },
};

var hasPathSum = (root, sum) => {
  if (!root) return false;
  let res = false;
  const dfs = (n, s) => {
    console.log(n.val, s);
    // 如果遍历到叶子节点，并且找到了和为目标值的路径，就返回true
    if (!n.left && !n.right && s === sum) {
      res = true;
    }
    if (n.left) dfs(n.left, s + n.left.val);
    if (n.right) dfs(n.right, s + n.right.val);
  };
  // 记录当前节点之前的节点之和
  dfs(root, root.val);
  return res;
};

// 时间复杂度：O(n)
// 空间复杂度：O(n)

console.log("路径总和");
console.log(hasPathSum(binaryTree1, 22)); // true

/*********************** 前端与树：遍历json的所有的节点值 **********************/
const json = {
  a: { b: { c: 1 } },
  d: [1, 2],
};

// n：节点值，path：路径
const _dfs = (n, path) => {
  console.log(n, path);
  Object.keys(n).forEach((k) => {
    _dfs(n[k], path.concat(k));
  });
};

_dfs(json, []);
