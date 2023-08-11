/**
 * 树：一种非线性的数据结构，以分层的方式存储数据，它对存储需要快速查找的数据非常有用。树又有很多子集，比如二叉树、二叉搜索树、2-3树、红黑树等。
 *
 * 树相比于数组、链表、哈希表的优势：
 *  - 数组
 *    + 优点：可以通过下标值访问，效率高；
 *    + 缺点：查找数据时需要先对数据进行排序，生成有序数组，才能提高查找效率；并且在插入和删除元素时，需要大量的位移操作。
 *  - 链表
 *    + 优点：数据的插入和删除操作效率很高
 *    + 缺点：查找效率低，需要从头开始依次查找，直到找到目标数据为止，当需要在链表中间插入或删除数据时，插入或删除的效率都不高。
 *  - 哈希表
 *    + 优点：哈希表的插入、查询、删除效率都非常高
 *    + 缺点：空间利用率不高，底层使用的数组中又很多单元没有被充分利用；并且哈希表中的元素是无序的，不能按照固定顺序遍历哈希表中的元素；而且不能快速找出哈希表中最大值或最小值这些特殊值。
 *  - 树：
 *    + 优点：树综合了上述三种数据结构的优点，同时也弥补了它们存在的缺点（虽然效率不一定都比它们高），比如树结构中数据都是有序的，查找效率高；并且可以快速获取到最大值和最小值。
 *
 * https://www.cnblogs.com/jaxu/p/11309385.html
 * https://www.yuque.com/docs/share/a71bb492-8ab2-4015-8a47-8a86fcde97dd?# 《1、二叉树》
 */

/**
 * 二叉树：树的节点可以有 0 个或多个子节点，当一棵树（的所有节点）最多只能有两个子节点时，这样的数被称为二叉树。
 *  - 节点：树的一个元素
 *  - 叶子：度为0的节点
 *  - 层： 根在第一层，以此类推
 *  - 节点的度：节点拥有的子树的个数，二叉树的度不大于2
 *  - 树的度：树中的最大节点度数
 *  - 高度：叶子节点的高度为1，根节点的高度最高
 *
 * 二叉树分类：
 *  - 完满二叉树：除去叶节点，每个节点都有两个子节点
 *  - 完全二叉树：除了最深一层之外，其余所有层的节点都必须有两个子节点
 *  - 完美二叉树：满足完全二叉树的性质，即满二叉树，树的叶子节点均在最后一层
 */

/**
 * 二叉树的遍历
 *              A
 *           /     \
 *         B          C
 *       /   \      /   \
 *      D     E    F     G
 *    /   \
 *   H     I
 *
 * 前序遍历： 首先，遍历根节点； 然后，遍历其左子树； 最后，遍历其右子树； —— A B D H I E C F G
 * 中序遍历:  首先，遍历其左子树； 然后，遍历根（父）节点； 最后，遍历其右子树； —— H D I B E A F C G
 * 后序遍历： 首先，遍历其左子树子节点，再父节点； 然后，遍历其右子树； 最后，遍历根（父）节点； —— H I D E B F G C A
 * 层序遍历： 先打印父节点的，再打印子节点的，自上而下层层打印； —— A B C D E F G H I
 *
 * https://www.yuque.com/docs/share/11ab79b9-5a19-4709-a295-2031cb9ea157?# 《2、二叉搜索树》
 */

// 二叉树在计算机中的样子
const binaryTree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: null,
      right: null,
    },
    right: {
      value: 5,
      left: null,
      right: null,
    },
  },
  right: {
    value: 3,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 7,
      left: null,
      right: null,
    },
  },
};

// 先序遍历（递归版）
const preOrder = (root) => {
  if (!root) return;
  // 1、先访问根节点
  console.log(root.value);
  // 2、对根节点的左子树进行前序遍历
  preOrder(root.left);
  // 3、对根节点的右子树进行前序遍历
  preOrder(root.right);
};

// 中序遍历（递归版）
const inOrder = (root) => {
  if (!root) return;
  // 1、对根节点的左子树进行中序遍历
  inOrder(root.left);
  // 2、访问根节点
  console.log(root.value);
  // 3、对根节点的右子树进行中序遍历
  inOrder(root.right);
};

// 后序遍历（递归版）
const postOrder = (root) => {
  if (!root) return;
  // 1、对根节点左子树进行后序遍历
  postOrder(root.left);
  // 2、对根节点右子树进行后序遍历
  postOrder(root.right);
  // 3、访问根节点
  console.log(root.value);
};

// preOrder(binaryTree); // 1 2 4 5 3 6 7
// inOrder(binaryTree); // 4 2 5 1 6 3 7
// postOrder(binaryTree); // 4 5 2 6 7 3 1

// 一般来说，递归版的太过容易，导致面试的时候面试官不屑于考这种题目，所以我们需要掌握更高阶的非递归版本，堆栈实现，将要访问的节点push到堆栈，用完就pop出来

/**
 * 先序遍历
 *
 * 堆栈实现前序遍历的过程：
 * 1、先把根节点push进栈，弹出来，访问根节点
 * 2、将右子树和左子树push进栈，while条件生效，弹出左子节点，访问其值，再将左子节点的左子节点和右子节点push进栈
 * 3、等把所有的左子节点全部访问完了，在访问右子节点
 */
const advancedPreOrder = (root) => {
  if (!root) return;
  // 1、将根元素push到栈中
  const stack = [root];
  // 4、循环逻辑
  while (stack.length) {
    // 2、将栈顶元素弹出，并访问节点的值
    const node = stack.pop();
    console.log(node.value);
    // 3、由于栈是后进先出，我们需要先将右子树push进栈，再将左子树push进栈
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
};

// advancedPreOrder(binaryTree); // 1 2 4 5 3 6 7

/**
 * 中序遍历
 *
 * 堆栈实现中序遍历的过程：
 * 1、先把根节点左子树全部入栈，弹出左节点，访问它，
 * 2、再把右节点入栈，弹出右节点，然后访问它。
 */
const advancedInOrder = (root) => {
  if (!root) return;

  const stack = [];

  let p = root;

  // 先左边入栈
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const node = stack.pop();
    console.log(node.value);
    p = node.right;
  }
};

// advancedInOrder(binaryTree); // 4 2 5 1 6 3 7

/**
 * 后序遍历
 *
 * 实现技巧：先序遍历是“根左右”，而后序遍历是“左右根”，我们把它倒过来变成“根右左”，就跟先序遍历很像的操作。
 */
const advancedPostOrder = (root) => {
  if (!root) return;

  // 倒序输出序列
  const outputStack = [];
  const stack = [root];

  // 复用先序遍历的逻辑，只不过是将节点入栈到输出栈里面，左右节点的入栈顺序也调整一下
  while (stack.length) {
    const node = stack.pop();
    outputStack.push(node);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  // 倒序输出就是后序遍历的顺序了
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.value);
  }
};

advancedPostOrder(binaryTree); // 4 5 2 6 7 3 1
