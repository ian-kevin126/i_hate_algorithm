const myMap = new Map();

myMap.set("a", "AA");
myMap.set("b", "BB");

console.log(myMap.get("a"));

myMap.delete("a");

myMap.set("a", 111);

console.log(myMap.get("a"));

// LeetCode 348：两个数组的交集
var intersection = (nums1, nums2) => {
  const map = new Map();
  // 遍历数组nums1，填充字典
  nums1.forEach((n) => {
    map.set(n, true);
  });
  const res = [];
  // 遍历nums2，遇到字典中存在的值就选出到res里面
  nums2.forEach((m) => {
    if (map.get(n)) {
      res.push(n);
      // 选出之后，删除字典里的映射值，防止下次遇到相同的项再被push到res里面
      map.delete(n);
    }
  });
  return res;
};

// LeetCode 20：有效的括号
const strIsValid = (s) => {
  if (s.length % 2 === 1) {
    return false;
  }
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "(" || c === "{" || c === "[") {
      stack.push(c);
    } else {
      const t = stack[stack.length - 1];
      if (
        (t === "(" && c === ")") ||
        (t === "{" && c === "}") ||
        (t === "[" && c === "]")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

const strIsValid1 = (s) => {
  if (s.length % 2 === 1) {
    return false;
  }
  const stack = [];
  const map = new Map();
  map.set("(", ")");
  map.set("{", "}");
  map.set("[", "]");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (map.has(c)) {
      stack.push(c);
    } else {
      const t = stack[stack.length - 1];
      if (map.get(t) === c) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

console.log(strIsValid1("(((())))"));
console.log(strIsValid1("(((())})"));

// LeetCode 1：两数之和
var twoSumNum = (nums, target) => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const n2 = target - n;
    if (map.has(n2)) {
      return [map.get(n2), i];
    } else {
      map.set(n, i);
    }
  }
};
// 时间复杂度：O（n）
// 空间复杂度：O（n）

// LeetCode 3：无重复字符的最长子串
/**
 * - 1，用双指针维护一个滑动窗口，用来剪切子串
 * - 2，不断移动右指针，遇到重复字符就把左指针移动到重复字符的下一位
 * - 3，过程中，记录所有窗口的长度，并返回最大值
 */
var lengthOfLongestSubString = (s) => {
  // 左指针
  let l = 0;
  let res = 0;
  const map = new Map();
  // 右指针不断向前移动
  for (let i = 0; i < s.length; i++) {
    // 如果字符串中存在重复字符，并且右指针在滑动窗口里
    if (map.has(s[i]) && map.get(s[i]) >= l) {
      // 将左指针移动到重复字符的下一位
      l = map.get(s[i]) + 1;
    }
    // 记录所有窗口的长度，并返回最大值
    res = Math.max(res, i - l + 1);
    map.set(s[i], i);
  }
  return res;
};

console.log(lengthOfLongestSubString("abcabcbb")); // 3
console.log(lengthOfLongestSubString("abbcdea")); // 5

// 时间复杂度：O（n）
// 空间复杂度：O（m），m是字符串中不重复字符的长度

// LeetCode 76：最小覆盖子串
/**
 * - 1，用双指针维护一个滑动窗口
 * - 2，移动右指针，找到包含T的子串，移动左指针，尽量减少包含T的子串的长度
 * - 3，循环上述过程，找出包含T的最小子串
 */
function minWindow(s, t) {
  // 左指针
  let l = 0;
  // 右指针
  let r = 0;
  // 需要的字符以及个数
  const need = new Map();
  // 遍历目标字符串
  for (let c of t) {
    // 设置字符的长度，如果在字典里能找到它，就将原来的长度 + 1，否则就初始化为1
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }
  // console.log(need); // Map(3) {A => 1, B => 1, C => 1}
  // 需要的类型数量，比如：“ABC”就是三个
  let needType = need.size;
  let res = "";
  // 移动右指针
  while (r < s.length) {
    // 获取右指针当前的字符
    const c = s[r];
    // 如果右指针在目标字符串生成的字典里面，
    if (need.has(c)) {
      // 就将字典里对应字符的长度 -1，比如("ADOBECODEBANC", "ABC")，A、B、C 在字典里分别为1，遍历字符串第一个的时候，就是A，这时候就将字典里的A长度 -1，表示遍历到了目标字符串的一个字符，接着遍历其他的字符。
      need.set(c, need.get(c) - 1);
      // 如果它需要的目标字符串的长度为0了，表示已经全部匹配到了，就将needType -1。
      if (need.get(c) === 0) needType -= 1;
    }
    // 如果字符串匹配完了
    while (needType === 0) {
      const newRes = s.substring(l, r + 1);
      if (!res || newRes.length < res.length) res = newRes;
      // 获取左指针当前字符
      const c2 = s[l];
      // 如果左指针在目标字符串字典里面，
      if (need.has(c2)) {
        need.has(c2, need.get(c2) + 1);
        if (need.get(c2) === 1) needType += 1;
      }
      l += 1; // 移动左指针
    }
    r += 1; // 移动右指针
  }
  return res;
}

const result = minWindow("ADOBECODEBANC", "ABC");
console.log(result);

// 时间复杂度：O(m) + O(n)
// 空间复杂度：O(n)
