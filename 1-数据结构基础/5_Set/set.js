// 去重
// const arr = [1, 2, 3, 4, 5, 655, 6, 7, 2, 1, 2, 13];
// const _arr = [...new Set(arr)];

// console.log(_arr);

// LeetCode 349：两个数组的交集
var intersection = function (arr1, arr2) {
  return [...new Set(arr1)].filter((n) => arr2.includes(n));
};

console.log(
  intersection([1, 2, 3, 4, 5, 6, 12, 3, 4, 5], [1, 2, 3, 5, 632, 23, 4])
);

let mySet = new Set();

mySet.add(1);
mySet.add(2);
mySet.add(3);
const o = { a: 1, b: 2 };
mySet.add(o);
mySet.add({ a: 1, b: 2 });

console.log(mySet); // {1, 2, 3, {a: 1, b: 2}, {a: 1, b: 2}}
for (const item of mySet) {
  console.log(item);
}

const myArr = Array.from(mySet);
console.log(myArr);
