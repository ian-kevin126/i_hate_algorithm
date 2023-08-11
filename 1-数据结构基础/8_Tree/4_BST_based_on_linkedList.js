/**
 * 基于链表的二叉搜索树的 class 实现
 */

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 向树中插入一个节点
  insert(key) {
    let newNode = new Node(key);

    if (this.root === null) this.root = newNode;
    else insertNode(this.root, newNode);
  }

  // 在树中查找一个节点
  search(key) {
    return searchNode(this.root, key);
  }

  // 通过先序遍历方式遍历树中的所有节点
  preOrderTraverse(callback) {
    preOrderTraverseNode(this.root, callback);
  }

  // 通过中序遍历方式遍历树中的所有节点
  inOrderTraverse(callback) {
    inOrderTraverseNode(this.root, callback);
  }

  // 通过后序遍历方式遍历树中的所有节点
  postOrderTraverse(callback) {
    postOrderTraverseNode(this.root, callback);
  }

  // 返回树中的最小节点
  min() {
    return minNode(this.root);
  }

  // 返回树中的最大节点
  max() {
    return maxNode(this.root);
  }

  // 从树中移除一个节点
  remove(key) {
    this.root = removeNode(this.root, key);
  }
}

let insertNode = function (node, newNode) {
  if (newNode.element < node.element) {
    if (node.prev === null) node.prev = newNode;
    else insertNode(node.prev, newNode);
  } else {
    if (node.next === null) node.next = newNode;
    else insertNode(node.next, newNode);
  }
};

let preOrderTraverseNode = function (node, callback) {
  if (node !== null) {
    callback(node.element);
    preOrderTraverseNode(node.prev, callback);
    preOrderTraverseNode(node.next, callback);
  }
};

let inOrderTraverseNode = function (node, callback) {
  if (node !== null) {
    inOrderTraverseNode(node.prev, callback);
    callback(node.element);
    inOrderTraverseNode(node.next, callback);
  }
};

let postOrderTraverseNode = function (node, callback) {
  if (node !== null) {
    postOrderTraverseNode(node.prev, callback);
    postOrderTraverseNode(node.next, callback);
    callback(node.element);
  }
};

let minNode = function (node) {
  if (node === null) return null;

  while (node && node.prev !== null) {
    node = node.prev;
  }
  return node;
};

let maxNode = function (node) {
  if (node === null) return null;

  while (node && node.next !== null) {
    node = node.next;
  }
  return node;
};

let searchNode = function (node, key) {
  if (node === null) return false;

  if (key < node.element) return searchNode(node.prev, key);
  else if (key > node.element) return searchNode(node.next, key);
  else return true;
};

let removeNode = function (node, key) {
  if (node === null) return null;

  if (key < node.element) {
    node.prev = removeNode(node.prev, key);
    return node;
  } else if (key > node.element) {
    node.next = removeNode(node.next, key);
    return node;
  } else {
    // 第一种情况：一个叶子节点（没有子节点）
    if (node.prev === null && node.next === null) {
      node = null;
      return node;
    }
    // 第二种情况：只包含一个子节点
    if (node.prev === null) {
      node = node.next;
      return node;
    } else if (node.next === null) {
      node = node.prev;
      return node;
    }

    // 第三种情况：有两个子节点
    let aux = minNode(node.next);
    node.element = aux.element;
    node.next = removeNode(node.next, aux.element);
    return node;
  }
};
