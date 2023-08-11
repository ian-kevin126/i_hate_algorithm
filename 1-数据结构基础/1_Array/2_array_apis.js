/***************************************** 一、会改变数组自身的方法（9个） **********************************************************************/

/**
 * 1、Array.prototype.copyWithin(target[, start[, end]])：在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。
 *    - target：0位基底的索引，赋值到该位置。
 *      - 如果是负数，target将从末尾开始计算。
 *      - 如果 target >= arr.length 将不会发生拷贝
 *    - start：0为基底的索引，开始复制元素的起始位置。
 *      - 如果是负数，start将会从末尾开始计算。
 *      - 如果start被忽略，将从0开始复制。
 *    - end：0为基底的索引，开始复制元素的结束位置。
 *      - copyWithin将会拷贝到这个位置，但不包括end这个位置的元素。
 *      - 如果是负数，end将会从末尾开始计算；
 *      - 如果end被忽略，将会一直复制到结尾（默认为arr.length）
 */
const copy_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(copy_array.copyWithin());        // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(copy_array.copyWithin(-2));      // [0, 1, 2, 3, 4, 5, 6, 7, 0, 1]
// console.log(copy_array.copyWithin(0, 3, 4)); // [3, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(copy_array.copyWithin(-2, -3, -1)); // [0, 1, 2, 3, 4, 5, 6, 7, 7, 8]

/**
 * 2、Array.prototype.fill(value[, start[, end]])：用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引。
 */
const fill_array = [1, 2, 3, 4, 5];
// console.log(fill_array.fill(0, 2, 4)); // [1, 2, 0, 0, 5]
// console.log(fill_array.fill(5, 1)); // [1, 2, 0, 0, 5]
// console.log(fill_array.fill(6)); // [6, 6, 6, 6, 6]
console.log(fill_array.fill(4, NaN, NaN)); // [1, 2, 3, 4, 5]

/**
 * 3、Array.prototype.pop()：从数组中删除最后一个元素，并返回该元素的值。
 */
console.log([12, 2, 3, 44, , 55, 56, 6, 6].pop()); // 6

/**
 * 4、Array.prototype.push(element1, ..., elementN))：将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
 * 注意：返回的是数组的新长度。
 */
console.log([1, 2, 3, 4, 5].push(6, 7, 8, 9)); // 9

/**
 * 5、Array.prototype.shift()：从数组中删除第一个元素，并返回该元素的值。
 */
console.log([1, 2, 3, 4, 5, 6].shift()); // 1

/**
 * 6、Array.prototype.unshift(element1, ..., elementN)：将一个或多个元素添加到数组的开头，并返回该数组的新长度。
 */
console.log([1, 2, 3, 4, 5].unshift(0, 0, 0)); // 8

/**
 * 7、Array.prototype.reverse()：在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。
 */
const reverse_array = [1, 2, 3, 4, 5];
const reversed_array = reverse_array.reverse();
console.log(reverse_array, reversed_array, reversed_array === reverse_array); // [5, 4, 3, 2, 1]  [5, 4, 3, 2, 1]  true

/**
 * 8、Array.prototype.sort([compareFunction]))：用原地算法对数组的元素进行排序，并返回数组。
 */
const months = ["March", "Jan", "Feb", "Dec"];
console.log(months.sort()); // ["Dec", "Feb", "Jan", "March"]

const sort_array = [1, 30, 4, 21, 100000];
console.log(sort_array.sort()); // [1, 100000, 21, 30, 4]
console.log(sort_array.sort((a, b) => a - b)); // [1, 4, 21, 30, 100000]

const sort_array_1 = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic" },
  { name: "Zeros", value: 37 },
];
console.log(
  sort_array_1.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  })
);

/**
 * 9、Array.prototype.splice(start[, deleteCount[, item1[, item2[, ...]]]])：通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容
 */
const splice_array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(splice_array.splice(2, 0, ["a", "b", "c"])); // []
console.log(splice_array); // [1, 2, Array(3), 3, 4, 5, 6, 7, 8, 9]

/***************************************** 二、不会改变数组的方法（9个）**********************************************************************/

/**
 * 1、Array.prototype.concat(arrayX, arrayX, ..., arrayX)：用于连接两个或多个数组，返回被连接数组的一个副本。
 */
const arr_1 = [1, 2, 3, 4, 5, 6];
const newArr_1 = arr_1.concat(["a", "b", "c"], false, "ddd");
console.log(newArr_1); // [1, 2, 3, 4, 5, 6, "a", "b", "c", false, "ddd"]
console.log(arr_1); // [1, 2, 3, 4, 5, 6] 不改变原数组

/**
 * 2、Array.prototype.join([separator])：将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
 *    如果数组只有一个项目，那么将返回该项目而不使用分隔符。如果一个元素为undefined或者null，它会被转换为空字符串。
 */
const arr_2 = ["Fire", "water", "element"];
console.log(arr_2.join()); // Fire,water,element
console.log([1].join("-")); // 1
console.log([1, , , , , , , , , 5].join("-")); // 1---------5

/**
 * 3、Array.prototype.slice(begin, end)：方法返回一个新数组，这一对象是一个由begin和end（不包括end）决定的原数组的拷贝，不改变原数组。
 */
const slice_arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(slice_arr.slice()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(slice_arr.slice(0)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(slice_arr.slice(12)); // []  超过数组长度返回空数组
console.log(slice_arr.slice(-1)); // [9]  负数会被转换为 数组长度+负数
console.log(slice_arr.slice(-12)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] 负数的绝对值超过数组长度，被转换成0
console.log(slice_arr.slice(5, 4)); // []  end大于begin也会返回空数组
console.log(slice_arr.slice(-4, -5)); // []
console.log(slice_arr.slice(4, 5)); // [4]

// slice方法的经典用法：类数组转数组
function list() {
  return Array.prototype.slice.call(arguments);
}

console.log(list(1, 2, 3, 4)); // [1, 2, 3, 4]

/**
 * 4、Array.prototype.includes(valueToFind[, fromIndex])：用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回true，否则返回false。
 *    需要注意的是：对象数组是不能使用这个方法去检测元素的。
 */
console.log([1, 2, 3, 4, 5].includes(2)); // true
console.log([1, 2, 3, 4, 5].includes(2, 4)); // false

// 如果fromIndex的值为负数，将会转换成 数组长度+fromIndex
const includes_arr = ["a", "b", "c"];
console.log(includes_arr.includes("a", -100)); // true 如果计算出来的索引小于0，则整个数组都会被搜索
console.log(includes_arr.includes("a", -2)); // false

/**
 * 5、Array.prototype.indexOf(searchElement[, fromIndex = 0])：返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1；
 */
const indexOf_arr = ["ant", "bison", "camel", "duck", "bison"];
console.log(indexOf_arr.indexOf("bison1")); // -1
console.log(indexOf_arr.indexOf("bison")); // 1
console.log(indexOf_arr.indexOf("bison", 2)); // 4

/**
 * 6、Array.prototype.lastIndexOf(searchElement[, fromIndex = 0])：返回在数组中可以找到一个给定元素的最后一个索引，如果不存在，则返回-1；
 *    fromIndex：从此位置开始逆向查找。默认为数组的长度减1，即整个数组都会被查找。
 */
const lastIndexOf_arr = ["ant", "bison", "camel", "duck", "bison"];
console.log(lastIndexOf_arr.lastIndexOf("bison1")); // -1
console.log(lastIndexOf_arr.lastIndexOf("bison")); // 4
console.log(lastIndexOf_arr.lastIndexOf("bison", 2)); // 1

/**
 * 7、Array.prototype.toString()：返回一个字符串，表示指定的数组及其元素。
 */
console.log([1, 2, 3, 4, "a", "b"].toString()); // 1,2,3,4,a,b
console.log([].toString()); // 空字符串

/**
 * 8、Array.prototype.toLocaleString([locales[,options]])：返回一个字符串表示数组中的元素。数组中的元素将使用各自的toLocaleString方法转成字符串，这些字符串将使用
 * 一个特定滚动语言环境的字符串（例如一个逗号“,”隔开。
 */
console.log([1, "a", new Date("21 Dec 1997 14:12:00 UTC")].toLocaleString()); // 1,a,1997/12/21下午10:12:00
console.log(
  ["￥7", 500, 8123, 12].toLocaleString("ja-JP", {
    style: "currency",
    currency: "JPY",
  })
); // ￥7,￥500,￥8,123,￥12

/**
 * 9、Array.prototype.toSource()：在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。
 */

/***************************************** 三、数组遍历方法（12个）**********************************************************************/

/**
 * 1、Array.prototype.forEach(callback[, thisArg])：对数组的每一个元素执行一次提供的回调函数。
 */
const forEach_array = ["a", "b", "c"];
forEach_array.forEach(function (element) {
  console.log(element); // a b c
});

/**
 * 2、Array.prototype.map()：创建一个新数组，其结果是该数组中的每一个元素都调用一个提供的函数后返回的结果。
 * var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 *  // Return element for new_array
 * }[, thisArg])
 */
const map_array = [1, 2, 3, 4, 5];
const new_map_array = map_array.map((x) => x * 2);
console.log(new_map_array); // [2, 4, 6, 8, 10]

/**
 * 3、Array.prototype.every(callback[, thisArg]))：测试一个数组内的所有元素是否都通过某个指定函数的测试。
 * 它返回一个布尔值
 */
function isBigEnough(element, index, array) {
  return element >= 10;
}
console.log([12, 5, 8, 130, 44].every(isBigEnough)); // false
console.log([12, 54, 18, 130, 44].every(isBigEnough)); // true
/**
 * 4、Array.prototype.filter(callback(element[, index[, array]])[, thisArg])：创建一个新数组，其包含通过所提供的的函数实现的测试的所有元素。
 */
const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(filtered); // [12, 130, 44]

/**
 * 5、Array.prototype.some(callback(element[, index[, array]])[, thisArg])：方法测试是否至少有一个可以通过被提供的函数方法，返回一个Boolean值。
 */
const some_array = [1, 2, 3, 4, 5];
const even = function (element) {
  return element % 2 === 0;
};
console.log(some_array.some(even)); // true

/**
 * 6、Array.prototype.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])：方法对数组中的每一个元素执行一个由您提供的reducer函数（升序执行）
 * 将其结果汇总为单个返回值。
 */
const reduce_array = [0, 1, 2, 3, 4].reduce(function (
  accumulator,
  currentValue,
  currentIndex,
  array
) {
  return accumulator + currentValue;
},
10);
console.log(reduce_array); // 20

/**
 * 7、Array.prototype.reduceRight(callback[, initialValue])：接收一个函数作为累加器和数组的每个值（从右到左）将其减少为单个值。
 */
const reduce_right_array = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));
console.log(reduce_right_array); // [4, 5, 2, 3, 0, 1]

const reduce_right_array_2 = [0, 1, 2, 3, 4].reduceRight(function (
  previousValue,
  currentValue,
  index,
  array
) {
  return previousValue + currentValue;
},
10);
console.log(reduce_right_array_2); // 20

/**
 * 8、Array.prototype.findIndex(callback[, thisArg])：返回数组中满足提供的测试函数的第一个元素的索引，否则会返回-1。
 */
const find_index_array = [5, 12, 8, 130, 44];
function isLargeNumber(element) {
  return element > 13;
}
console.log(find_index_array.findIndex(isLargeNumber)); // 3
/**
 * 9、Array.prototype.find(callback[, thisArg])：返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined。
 */
const find_array = [5, 12, 8, 130, 44];
const found = find_array.find(function (element) {
  return element > 10;
});
console.log(found); // 12

/**
 * 10、Array.prototype.keys()：返回一个包含数组中每个索引键的 Array Iterator 对象。
 */
const keys_array = ["a", "b", "c"];
const iterator = keys_array.keys();

for (let key of iterator) {
  console.log(key); //  0 1 2
}

/**
 * 11、Array.prototype.values()：返回一个新的 Array Iterator 对象，该对象包含数组的每个索引的值。
 */
const values_array = ["a", "b", "c"];
const _values = values_array.values();
for (const value of _values) {
  console.log(value); // "a" "b" "c"
}

/**
 * 12、Array.prototype.entries()：返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键值对；
 */
const entries_array = ["a", "b", "c"];
const iterator1 = entries_array.entries();
console.log(iterator1.next().value); // expected output: Array [0, "a"]
console.log(iterator1.next().value); // expected output: Array [1, "b"]

/**
 * 四、其他方法（6个）
 */

/**
 * 1、Array.of()：创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
 */

/**
 * 2、Array.from()：从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例。
 */

/**
 * 3.Array.isArray()：用于确定传递的值是否是一个 Array。
 */

/**
 * 4.Array.valueOf()：返回 Array 对象的原始值。
 */
const value_of_array = ["Banana", "Orange", "Apple", "Mango"];
const _value_ = value_of_array.valueOf();
console.log(_value_); // ["Banana", "Orange", "Apple", "Mango"]

/**
 * 5.Array.prototype.flat(depth)：该方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
 */
// 典型的应用就是数组的扁平化
const flat_array_1 = [1, 2, [3, 4]];
console.log(flat_array_1.flat()); // [1, 2, 3, 4]

const flat_array_2 = [1, 2, [3, 4, [5, 6]]];
console.log(flat_array_2.flat()); // [1, 2, 3, 4, [5, 6]]

const flat_array_3 = [1, 2, [3, 4, [5, 6]]];
console.log(flat_array_3.flat(2)); // [1, 2, 3, 4, 5, 6]

//使⽤ Infinity 作为深度，展开任意深度的嵌套数组
console.log(flat_array_3.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

/**
 * 6.Array.prototype.flatMap()：首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和深度值为1的flat几乎相同。
 * 但是 flatMap 通常会在合并成一种方法的效率稍微高一些。
 * var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
 * // 返回新数组的元素
 * }[, thisArg])
 */
const flat_map_array = [1, 2, 3, 4];
flat_map_array.map((x) => [x * 2]); // [[2], [4], [6], [8]]
flat_map_array.flatMap((x) => [x * 2]); // [2, 4, 6, 8]

// 只会将 flatMap 中的函数返回的数组 “压平” ⼀层
flat_map_array.flatMap((x) => [[x * 2]]); // [[2], [4], [6], [8]]
