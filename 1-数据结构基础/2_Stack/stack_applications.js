/***  十进制转二进制 */
const decToBin = (num) => {
  const stack = [];

  // 1，将num % 2的模进栈
  while (num >= 1) {
    stack.push(num % 2);
    num = Math.floor(num / 2);
  }

  let res = "";
  while (stack.length) {
    res += stack.pop();
  }

  return res;
};

console.log(decToBin(100));

// 击鼓传花
let passGame = (nameList, num) => {
  const queue = [...nameList];
  while (queue.length > 1) {
    for (let i = 0; i < num - 1; i++) {
      queue.push(queue.shift());
    }
    queue.shift();
  }
  return queue[0];
};

console.log(passGame(["kevin", "tom", "jim", "li", "lee"], 3));
