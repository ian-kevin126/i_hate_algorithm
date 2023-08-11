/**
 * BST的 function 实现
 */
function BinarySearchTree() {
  // 属性
  this.root = null;

  // 节点生成构造函数
  function Node(key, value = null) {
    this.key = key;
    this.value = value;
    this.right = null;
    this.left = null;
  }

  // 向二叉树中插入数据
  BinarySearchTree.prototype.insert = function (key, value = null) {
    // 1、创建节点
    let node = new Node(key, value);
    // 2、判断根节点是否存在
    // 2-1、不存在
    if (!this.root) {
      this.root = node;
      return;
    }

    // 2-2、存在
    this.insertNode(this.root, node);
  };

  // 插入节点函数（内部）
  BinarySearchTree.prototype.insertNode = function (oldNode, newNode) {
    // 判断我们插入的数据的 key 是否大于父节点的 key
    if (newNode.key < oldNode.key) {
      // 若 newNode 的 key 小于父节点的 key ，再判断父节点的子节点是否为空
      if (oldNode.left === null) {
        // 若左子节点为空，直接将新节点插入左子节点
        oldNode.left = newNode;
      } else {
        // 左子节点不为空，继续向下找到左子节点为空的节点进行插入
        this.insertNode(oldNode.left, newNode);
      }
    } else {
      // 若 newNode 的 key 大于父节点的 key ，再判断父节点的右子节点是否为空
      if (oldNode.right === null) {
        // 若右子节点为空，直接将新节点插入右子节点
        oldNode.right = newNode;
      } else {
        // 右子节点不为空，继续向下找到右子节点为空的节点进行插入
        this.insertNode(oldNode.right, newNode);
      }
    }
  };

  // 先序遍历并返回结果（外部函数）
  BinarySearchTree.prototype.preOrder = function (handle) {
    this.preOrderNodes(this.root, handle);
  };

  // 以先序遍历的方式遍历整个树（内部函数）
  BinarySearchTree.prototype.preOrderNodes = function (node, handle) {
    if (node !== null) {
      handle(node.key);
      this.preOrderNodes(node.left, handle);
      this.preOrderNodes(node.right, handle);
    }
  };

  // 中序遍历并返回结果（外部函数）
  BinarySearchTree.prototype.inOrder = function (handle) {
    this.inOrderNodes(this.root, handle);
  };

  // 以中序遍历的方式遍历整个树（内部函数）
  BinarySearchTree.prototype.inOrderNodes = function (node, handle) {
    if (node !== null) {
      this.inOrderNodes(node.left, handle);
      handle(node.key);
      this.inOrderNodes(node.right, handle);
    }
  };

  // 后序遍历并返回结果（外部函数）
  BinarySearchTree.prototype.postOrder = function (handle) {
    this.postOrderNodes(this.root, handle);
  };

  // 以后序遍历的方式遍历整个树（内部函数）
  BinarySearchTree.prototype.postOrderNodes = function (node, handle) {
    if (node !== null) {
      this.postOrderNodes(node.left, handle);
      this.postOrderNodes(node.right, handle);
      handle(node.key);
    }
  };

  // 获取二叉树中的最大值
  BinarySearchTree.prototype.getMax = function () {
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  };

  BinarySearchTree.prototype.getMin = function () {
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  };

  // 查找指定的 key 对应的数据
  BinarySearchTree.prototype.search = function (key) {
    let node = this.root;

    while (node !== null) {
      if (key > node.key) {
        node = node.right;
      } else if (key < node.key) {
        node = node.left;
      } else {
        return node.value;
      }
    }

    return false;
  };

  // 删除指定的 key 的数据
  BinarySearchTree.prototype.remove = function (key) {
    this.node = this.root;
    this.parent = null;
    let direction = "";

    // 1、找到需要被删除的节点
    while (node !== null) {
      if (key < node.key) {
        parent = node;
        direction = "left";
        node = node.left;
      } else if (key > node.right) {
        parent = node;
        direction = "right";
        node = node.right;
      } else {
        break;
      }
    }

    // 1-1、未找到对应节点，删除失败
    if (this.node === null) return false;

    // 1-2、找到对应节点
    // 2、判断节点类型（叶子节点、只有一个子节点、有两个子节点）

    // 2-1、节点类型为叶子节点
    if (this.node.left === null && node.right === null) {
      if (node === this.root) {
        // 如果是根节点，直接置空
        this.root = null;
      } else {
        // 如果是子节点，则将对应的direction的节点置空
        parent[direction] = null;
      }
    } else if (node.left === null) {
      // 2-2、节点只有一个右子节点

      if (node === this.root) {
        this.root = this.root.right;
      } else {
        parent[direction] = node.right;
      }
    } else {
      let minNode = node.right;
      let minNode_parent = node;
      // 2.3.1 找到被删除节点右子节点的子孙节点中最小的节点
      while (minNode.left !== null) {
        minNode_parent = minNode;
        minNode = minNode.left;
      }

      // 2.3.2 判断 minNode是否有右子节点
      // 2.3.2.1 无右子节点
      if (minNode.right === null) {
        if (node === this.root) {
          this.root = minNode;
        } else {
          parent[direction] = minNode;
        }
        minNode.left = node.left;
        minNode.right = node.right;
        minNode_parent.left = null;
      }

      // 2.3.2.2 有右子节点
      else {
        if (node === this.root) {
          this.root = minNode;
        } else {
          parent[direction] = minNode;
        }
        minNode_parent.left = minNode.right;
        minNode.left = node.left;
        minNode.right = node.right;
      }
    }
  };
}
