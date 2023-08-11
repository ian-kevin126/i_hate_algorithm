/**
 * 集合：在高中数学中第一课就是集合，一种数学概念。通常用大写字母如A,B,S,T,...表示集合，而用小写字母如a,b,x,y,...表示集合的元素。若x是集合S的元素，
 * 则称x属于S，记为x∈S。若y不是集合S的元素，则称y不属于S，记为y∉S 。
 *
 * 在计算机中，集合是一种包含不同元素的数据结构。集合中的元素称为成员。以[value, value]的形式存储元素，几乎每种编程语言中，都有集合结构。集合比较常见的
 * 实现方式是哈希表。
 *
 * 集合的特点：
 *  - 集合通常是由一组无序的、不能重复的元素构成
 *  - 数学中常指的集合中的元素是可以重复的，但是计算机中的集合的元素是不能重复的
 *  - 集合是特殊的数组
 *    - 特殊之处在于里面的元素没有顺序，也不能重复
 *    - 没有顺序意味着不能通过下标值进行访问，不能重复意味着相同的对象在集合中只会存在一份
 *  - 不包含任何成员的集合称为空集，全集则是包含一切可能成员的集合
 *  - 如果两个集合的成员完全相同，则称两个集合相等
 *  - 如果一个集合中所有的成员都属于另外一个集合，则前一集合称为后一集合的子集
 *
 * 常见的集合操作：
 *  - add(value)：向集合添加一个新的项
 *  - remove(value)：从集合移除一个值
 *  - has(value)：如果值在集合中，返回true，否则返回false
 *  - clear()：移除集合中的所有项
 *  - size()：返回集合所包含元素的数量，与数组的length属性类型
 *  - values()：返回一个包含集合中所有值的数组
 *  - ...
 */

/**
 * 集合的 class 实现
 */
class ClassSet {
  constructor() {
    this.items = {};
  }

  // 判断集合中是否存在 value 值
  has(value) {
    return this.items.hasOwnProperty(value);
  }

  add(value) {
    if (this.has(value)) return false;
    this.items[value] = value;
    return true;
  }

  remove(value) {
    if (!this.has(value)) return false;
    delete this.items[value];
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    return Object.keys(this.items);
  }

  /** 集合间的操作 */

  // 求两个集合的并集
  union(otherSet) {
    // 1、创建一个新集合
    let unionSet = new ClassSet();
    // 2、将当前集合（this）的所有value，添加到新集合（unionSet）中去
    for (const value of this.values()) {
      unionSet.add(value);
    }
    // 3、将 otherSet 集合的所有value，添加到新集合（unionSet）中
    for (const value of otherSet.values()) {
      unionSet.add(value); // add操作已经做了重复判断
    }

    return unionSet;
  }

  // 求两个集合的交集
  intersection(otherSet) {
    let intersectionSet = new ClassSet();

    for (const value of this.values()) {
      if (otherSet.has(value)) {
        intersectionSet.add(value);
      }
    }
    return intersectionSet;
  }

  // 求两个集合的差集
  difference(otherSet) {
    let differenceSet = new ClassSet();

    for (const value of this.values()) {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    }
    return differenceSet;
  }

  // 判断是否是子集
  subset(otherSet) {
    if (this.size() > otherSet.size()) return false;
    for (const value of this.values()) {
      if (!otherSet.has(value)) {
        return false;
      }
    }
    return true;
  }
}

/**
 * 集合的 function 实现
 */
function FunctionSet() {
  let items = {};

  this.has = function (value) {
    return items.hasOwnProperty(value);
  };

  this.add = function (value) {
    if (this.has(value)) return false;
    items[value] = value;
    return true;
  };

  this.remove = function (value) {
    if (!this.has(value)) return false;
    delete items[value];
    return true;
  };

  this.clear = function () {
    items = {};
  };

  this.size = function () {
    return Object.keys(items).length;
  };

  // 上面用 ES6 的新方法来获取items的长度，但是浏览器的兼容性不是很好，所以我们也可以用循环遍历计数器的方式来完成这个功能。
  this.sizeLegacy = function () {
    let count = 0;
    for (const key in items) {
      if (Object.hasOwnProperty.call(items, key)) {
        ++count;
      }
    }
    return count;
  };

  this.valuesLegacy = function () {
    let values = [];
    for (const key in items) {
      if (Object.hasOwnProperty.call(items, key)) {
        values.push(items[key]);
      }
    }
    return values;
  };
}

var set = new FunctionSet();
set.add(1);
console.log(set.valuesLegacy()); //[1]
set.add(2);
console.log(set.valuesLegacy()); //[1, 2]
console.log(set.sizeLegacy()); //2
set.remove(2);
console.log(set.valuesLegacy()); //[1]
