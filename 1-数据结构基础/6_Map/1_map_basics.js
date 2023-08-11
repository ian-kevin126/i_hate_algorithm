/**
 * 字典：是一种以键值对形式存储数据的数据结构，就如同我们平时查看通讯录一样，要找一个电话，首先找到该号码的机主名字，名字找到了，紧接着电话号码也就有了。
 *
 * 在JavaScript中，Object类就是以字典的形式设计的。
 *
 * 字典的特点：
 *  - 存储的是键值对，主要特点是一一对应
 *  - 比如保存一个人的信息
 *    - 数组形式：[19, "kevin", 1.65]，可以通过下标值取出信息
 *    - 字典形式：{ "age": 19, "name": "kevin", "height": 165}，可以通过key取出value
 *  - 此外，在字典中key是不能重复且无序的，而value是可以重复的。
 *
 * 字典的常见操作：
 *  - set(key, value)：向字典中添加新元素
 *  - remove(key)：通过使用键值来从字典中移除键对应的值
 *  - has(key)：如果某个键值存在于这个字典中，则返回true，否则返回false
 *  - get(key)：通过键值查找特定的数值并返回。
 *  - clear()：将这个字典中的所有元素全部删除
 *  - size()：返回字典所包含的元素的数量，与数组的length属性类似
 *  - keys()：将字典所包含的所有键名以数组的形式返回
 *  - values()：将字典所包含的键值以数组的形式返回
 */

/**
 * 字典的 class 实现
 */
class ClassMap {
  constructor() {
    this.items = {};
  }

  has(key) {
    return this.items.hasOwnProperty(key);
  }

  set(key, value) {
    this.items[key] = value;
  }

  remove(key) {
    if (!this.has(key)) return false;
    delete this.items[key];
  }

  get(key) {
    return this.has(key) ? this.items[key] : undefined;
  }

  clear() {
    this.items = {};
  }

  keys() {
    return Object.keys(this.items);
  }

  values() {
    return Object.values(this.items);
  }

  size() {
    return this.keys().length;
  }

  getItems() {
    return this.items;
  }
}

var map = new ClassMap();

map.set("zak", "fat");
map.set("lily", "thin");
map.set("david", "big");
map.set("jams", "small");

console.log(map.has("jams")); //true
console.log(map.has("zaking")); //false

console.log(map.size()); //4
console.log(map.keys()); //["zak", "lily", "david", "jams"]
console.log(map.values()); //["fat", "thin", "big", "small"]
console.log(map.get("zak")); //fat

map.remove("zak");
console.log(map.has("zak")); //false
console.log(map.getItems()); //{lily: "thin", david: "big", jams: "small"}
