/**
 * 数组定义：有序的元素序列，数组是一种线性表数据结构，它用一组连续的内存空间，来存储一组具有相同类型的数据（JS里面可以是任意的类型）
 * 关键点：连续的内存空间（数组是可以随机访问的）
 *
 * - 1、在操作系统中数组的特性为
 *   - 存储在物理空间上是连续的
 *   - 底层的数据长度是不可变的（js中之所以能随意修改数组的长度，是因为js做了数据优化）
 *   - 数据的变量，指向了数组第一个元素的位置
 *
 * - 2、底层数组的长度不可变，那底层是如何添加与删除元素的
 *   假设当前的数组的长度是8，此时需要往数组中添加一个新元素，底层会新建一个长度为16的数组，将之前的长度为8的数组中的数据拷贝过来，然后将新新元素添加进去；
 *   删除时，假设我们想删除一个index为5的元素，那5之后的元素都会向前挪动一位，因为存储在物理空间上是连续的。
 *
 * - 3、数组的优缺点
 *   - 优点：查询性能好，指定查询某一个index的元素
 *   - 缺点：
 *       - 因为空间必须是连续的，所以当数据比较大的时候，系统的空间碎片（空间碎片：当数组中出现空值，导致数组不是连续的，这个空值就是空间碎片，如果系统没有清除掉
 *         那会导致新元素无法继续存储进来。）较多的时候，容易存放不下
 *       - 因为数组的长度是固定的，所以数组的添加和删除代价是比较大的。
 *
 */

/**
 *  一、数组的创建
 **/
// ES5创建数组的方式
const newArray = [1, 2, 3, 4, 5]; // 字面量方式
const newArray1 = new Array(4); // [undefined, undefined, undefined, undefined] 创建指定长度的数组
const newArray2 = new Array(1, 2, 3, 4); // [1,2,3,4] 创建具有指定参数的数组

// ES6扩展了两个方法，Array.of和Array.from
// Array.of() 方法用来替代ES6之前的Array.prototype.slice.call(arguments)方法；
const newArray3 = Array.of(4); // [4] 优化new Array()方式创建数组
const newArray4 = Array.of(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]

const newArray5 = Array.from({ length: 3 }); // [undefined, undefined, undefined] 将类数组转化为数组
console.log(Array.from("kevin")); // ["k", "e", "v", "i", "n"]
console.log([..."hello"]); // ["h", "e", "l", "l", "o"]

// 处理Set和Map数据
const _set = new Set().add(1).add(2).add(3).add(4);
const _map = new Map().set(1, 2).set(3, 4);
console.log(Array.from(_set)); // [1, 2, 3, 4]
console.log(Array.from(_map)); // [Array(2), Array(2)]

// 处理迭代器
const iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  },
};
console.log(Array.from(iter)); // [1, 2, 3, 4]

// 处理普通函数的默认参数
function getArgsArray() {
  return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4, 5)); // [1, 2, 3, 4, 5]

// 处理类数组
const arrayLikeObject = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  length: 5,
};
console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4, 5]

// 迭代器方法：ES6中，Array在原型上暴露了三个用于检索数组内容的方法：keys()、values()和entries()
const testArray = ["foo", "bar", "baz", "qux"];
console.log("keys", Array.from(testArray.keys())); // [0, 1, 2, 3]
console.log("values", Array.from(testArray.values())); // ["foo", "bar", "baz", "qux"]
console.log("entries", Array.from(testArray.entries())); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]

// Array.from() 还可以接收第二个、第三个参数
// 接收第二个参数
console.log(Array.from([1, 2, 3, 4, 5], (x) => x * 2)); // [2, 4, 6, 8, 10]
// 接收第三个参数
console.log(
  Array.from(
    [1, 2, 3, 4, 5],
    function (x) {
      return x ** this.exponent;
    },
    { exponent: 2 }
  )
); // [1, 4, 9, 16, 25]

/**
 * 二、数组空位
 *  使用数组字面量初始化数组时，可以使用一连串逗号来创建空位（hole），ES会将逗号质检相应索引位置的值当成是空位，ES6规范重新定义了该如何处理这些空位。
 */
console.log([, , , , ,]); // [undefined, undefined, undefined, undefined, undefined]
console.log([1, , , , , 6].join("-")); // 1-----6
console.log([1, undefined, undefined, undefined, undefined, 6].join("-")); // 1-----6
console.log([1, , , , 5].map(() => 6)); // [6, undefined, undefined, undefined, 6] map()会跳过空位置

/**
 * 三、检测数组
 */
// 1、instanceof方法
console.log([1, 2, 3, 4] instanceof Array); // true
console.log("isArray: ", Array.isArray([1, 2, 3, 4])); // isArray: true
console.log(Object.prototype.toString.call([12, 2, 3, 4, 5])); // [object Array]
