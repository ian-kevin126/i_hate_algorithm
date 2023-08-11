/*************** 电话号码的组合 *********************** */
const telephoneCombo = (str) => {
  // 建立电话号码键盘映射
  let map = ["", 1, "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  // 把输入字符串按单字符分隔变成数组，234=>[2,3,4]
  let num = str.split("");
  // 保存键盘映射后的字母内容，如 23=>['abc','def']
  let code = [];
  num.forEach((item) => {
    if (map[item]) {
      code.push(map[item]);
    }
  });
  let comb = (arr) => {
    // 临时变量用来保存前两个组合的结果
    let tmp = [];
    // 最外层的循环是遍历第一个元素，里层的循环是遍历第二个元素
    for (let i = 0, il = arr[0].length; i < il; i++) {
      for (let j = 0, jl = arr[1].length; j < jl; j++) {
        tmp.push(`${arr[0][i]}${arr[1][j]}`);
      }
    }
    arr.splice(0, 2, tmp);
    if (arr.length > 1) {
      comb(arr);
    } else {
      return tmp;
    }
    return arr[0];
  };
  return comb(code);
};

/*************** 卡牌分组 *********************** */
const cardClassification = (arr) => {
  // 对这副牌进行排序，升序、降序都可以
  arr.sort((a, b) => a - b);
  let min = Number.MAX_SAFE_INTEGER;
  let dst = [];
  let result = true;
  for (let i = 0, len = arr.length, tmp = []; i < len; i++) {
    tmp.push(arr[i]);
    for (let j = i + 1; j < len - 1; j++) {
      if (arr[i] === arr[j]) {
        tmp.push(arr[j]);
      } else {
        if (min > tmp.length) {
          min = tmp.length;
        }
        dst.push([].concat(tmp));
        tmp.length = 0;
        i = j;
        break;
      }
    }
  }
  dst.every((item) => {
    if (item.length % min !== 0) {
      result = false;
      return false;
    }
  });
  return result;
};

/*************** 种花问题 *********************** */
const func3 = (arr, n) => {
  // 计数器
  let max = 0;
  for (let i = 0, len = arr.length - 1; i < len; i++) {
    if (arr[i] === 0) {
      if (i === 0 && arr[1] === 0) {
        max++;
        i++;
      } else if (arr[i - 1] === 0 && arr[i + 1] === 0) {
        max++;
        i++;
      }
    }
  }
  return max >= n;
};

/*************** 格雷编码 *********************** */
const func4 = (n) => {
  // 递归函数，用来算输入为n的格雷编码序列
  let make = (n) => {
    if (n === 1) {
      return ["0", "1"];
    } else {
      let prev = make(n - 1);
      let result = [];
      let max = Math.pow(2, n) - 1;
      for (let i = 0, len = prev.length; i < len; i++) {
        result[i] = `0${prev[i]}`;
        result[max - i] = `1${prev[i]}`;
      }
      return result;
    }
  };
  return make(n);
};
