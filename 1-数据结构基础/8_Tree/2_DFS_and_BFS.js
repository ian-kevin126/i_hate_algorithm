/**
 * DFS：深度优先遍历：也就是将左子树搜索完后没有发现目标值，再去搜索右子树；
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let a = new Node("a");
let b = new Node("b");
let c = new Node("c");
let d = new Node("d");
let e = new Node("e");
let f = new Node("f");
let g = new Node("g");

a.left = c;
c.left = f;
b.left = d;
a.right = b;
b.right = e;
c.right = g;

/**
 * 二叉树深度优先搜索
 * @param {*} root    开始值//根节点
 * @param {*} target  目标值
 * @returns
 */
function DFSFunc(root, target) {
  if (root == null || target == null) return false;
  if (root.value == target) {
    return true;
  }
  var left = DFSFunc(root.left, target);
  var right = DFSFunc(root.right, target);
  return left || right;
}

console.log(DFSFunc(a, "g")); // true

function DepthFirstSearch(biTree) {
  let stack = [];
  stack.push(biTree);
  while (stack.length != 0) {
    let node = stack.pop();
    console.log(node.data);
    if (node.rChild) {
      stack.push(node.rChild);
    }
    if (node.lChild) {
      stack.push(node.lChild);
    }
  }
}

/**
 * BFS：广度优先遍历：同一行的搜索完后再去搜索下一行
 */
/**
 * 广度优先搜索
 * @param {*} rootList  查询列表
 * @param {*} target  目标值
 * @returns
 */
function BFSFunc(rootList, target) {
  if (rootList == null || rootList.length == 0) return false;
  var childList = [];
  for (let i = 0; i < rootList.length; i++) {
    if (rootList[i].value != null) return false;
    if (rootList[i] != null && rootList[i].value == target) {
      return true;
    } else {
      childList.push(rootList[i].left);
      childList.push(rootList[i].right);
    }
  }
  return BFSFunc(childList, target);
}

console.log(BFSFunc([a], "o")); // false

function BreadthFirstSearch(biTree) {
  let queue = [];
  queue.push(biTree);
  while (queue.length != 0) {
    let node = queue.shift();
    console.log(node.data);
    if (node.lChild) {
      queue.push(node.lChild);
    }
    if (node.rChild) {
      queue.push(node.rChild);
    }
  }
}

const tree = {
  value: "a",
  children: [
    {
      value: "b",
      children: [
        {
          value: "d",
          children: [],
        },
        {
          value: "e",
          children: [],
        },
      ],
    },
    {
      value: "c",
      children: [
        {
          value: "f",
          children: [],
        },
        {
          value: "g",
          children: [],
        },
      ],
    },
  ],
};

// 深度优先遍历，其实就是一个递归
const DFS_func = (tree) => {
  console.log(tree.value);
  tree.children.forEach(DFS_func);
};

DFS_func(tree); // a b d e c f g

// 广度优先遍历
const BFS_func = (tree) => {
  // 1、新建一个队列，并把根节点入队
  const _queue = [tree];
  // 4、只要队列不为空，就重复第二2、3步，直到队列为空
  while (_queue.length) {
    // 2、把队头出队并访问
    const head = _queue.shift();
    // 拿到队头，访问队头
    console.log(head.value);
    // 3、把队头的children挨个入队
    head.children.forEach((item) => {
      _queue.push(item);
    });
  }
};

BFS_func(tree); // a b c d e f g
