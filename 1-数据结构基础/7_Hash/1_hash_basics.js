/**
 * 哈希表：也叫散列表，我们都知道，无论是 array、object、栈、队列还是集合、字典都是需要遍历的，不然我们根本拿不到我们想要操作的具体的元素。
 * 但是这样就有一个问题，那就是效率。如果我们的数据有成千上万的数据。我们每一次循环遍历都会消耗大量的时间，用户体验就很差了。那么，有没有一种
 * 快速有效的定位我们想要的元素的数据结构呢？答案就是hashMap。hashMap在存储元素的时候，会通过loselose散列函数来设置key，这样我们就无需遍历
 * 整个数据结构，就可以快递的定位到该元素的具体位置。
 *
 * 哈希表通常是基于数组实现的，但是对于数组，它有更多的优势：
 *  - 哈希表可以提供非常快速的 插入-删除-查找 操作
 *  - 无论多少数据，插入和删除值都是只需接近常量的时间，即O（1）的时间复杂度，实际上，只需要几个机器指令即可完成。
 *  - 哈希表的速度比树还要快，基本可以瞬间查找到想要的元素
 *  - 哈希表相对于树来说编码要简单得多
 *
 * 哈希表同样存在不足之处：
 * - 哈希表中的数据是没有顺序的，所以不能以一种固定的方式（比如从小到大）来遍历其中的元素。
 * - 通常情况下，哈希表中的key是不允许重复的，不能放置相同的key，用于保存不同的元素。
 *
 * 日常生活中的案例：
 *  - 公司想要存储10000个人的信息，每一个工号对应一个员工的信息。若使用数组，增删数据时比较麻烦，使用链表，获取数据的时候比较麻烦。有没有一种数据结构，能
 *    把某一员工的姓名转换为它对应的工号，再根据工号查找该员工的完整信息呢？没错此时就可以使用哈希表的哈希函数来实现；
 *  - 存储联系人和对应的电话号码：当要查找张三的号码时，若使用数组，由于不知道存储张三数据对象的下标值，所以查起来十分麻烦，使用链表时也同样麻烦。而使用哈希表就能
 *    通过哈希函数把张三这个名称转换为它对应的下标值，再通过这个下标值查找效率就非常高了。
 *
 * 也就是说，哈希表最后还是通过数组来实现的，只不过哈希表能通过哈希函数把字符串转化为对应的下标值，建立字符串和下标值的映射关系。
 *
 * https://www.cnblogs.com/jaxu/p/11302315.html
 */

class HashTable {
  constructor() {
    this.table = [];
  }

  // 散列函数
  loseloseHashCode(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  }

  // 将键值对存放在哈希表中
  put(key, value) {
    let position = this.loseloseHashCode(key);
    this.table[position] = value;
  }

  // 通过 key 查找哈希表中的值
  get(key) {
    return this.table[this.loseloseHashCode(key)];
  }

  // 通过 key 从哈希表中删除对应的值
  remove(key) {
    this.table[this.loseloseHashCode(key)] = undefined;
  }

  // 判断哈希表是否为空
  isEmpty() {
    return this.size() === 0;
  }

  // 返回哈希表的长度
  size() {
    let count = 0;
    this.table.forEach((item) => {
      if (item !== undefined) count++;
    });
    return count;
  }

  // 清空哈希表
  clear() {
    this.table = [];
  }
}

let hash = new HashTable();
hash.put("Gandalf", "gandalf@email.com"); // 19 - Gandalf
hash.put("John", "john@email.com"); // 29 - John
hash.put("Tyrion", "tyrion@email.com"); // 16 - Tyrion

console.log(hash.isEmpty()); // false
console.log(hash.size()); // 3
console.log(hash.get("Gandalf")); // gandalf@email.com
console.log(hash.get("Loiane")); // undefined

hash.remove("Gandalf");
console.log(hash.get("Gandalf")); // undefined
hash.clear();
console.log(hash.size()); // 0
console.log(hash.isEmpty()); // true
