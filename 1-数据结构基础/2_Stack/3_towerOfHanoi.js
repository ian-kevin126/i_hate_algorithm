import { Stack } from "./stack_basics";
/**
 * 汉诺塔问题
 */

//plates:盘子数量，source源柱子，helper暂存柱子，dest目标柱子，sourceName源柱子名称，helperName暂存柱子名称，destName目标柱子名称，moves步数（若不传值则默认为一个数组）
function towerOfHanoi(
  plates,
  source,
  helper,
  dest,
  sourceName,
  helperName,
  destName,
  moves = []
) {
  console.log(moves.length);
  //如果盘子的数字不大于0 ，那么直接返回moves,终止递归的条件。
  if (plates <= 0) return moves;
  if (plates === 1) {
    dest.push(source.pop());
    const move = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    moves.push(move);
  } else {
    //递归调用自身。并且将盘子的数量减少一个，这里交换了dest和helper的位置，是为了dest.push中存入的栈是helper栈，也就是说是为了存入对应的柱子。
    towerOfHanoi(
      plates - 1,
      source,
      dest,
      helper,
      sourceName,
      destName,
      helperName,
      moves
    );
    //从源柱子拿出最顶层的一个放入目标柱子（如果dest和helper互换了位置，那么其实这里的dest实际上代表的是helper）
    dest.push(source.pop());
    //声明常量，用来存储当前各个柱子的盘子栈况
    const move = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    // 存入moves
    moves.push(move);
    towerOfHanoi(
      plates - 1,
      helper,
      source,
      dest,
      helperName,
      sourceName,
      destName,
      moves
    );
  }
  return moves;
}

function hanoiStack(plates) {
  // 创建每一个柱子的栈对象，source是最开始拥有所有圈圈的柱子，dest是目标柱子，helper是中间的暂存柱子
  const source = new Stack();
  const dest = new Stack();
  const helper = new Stack();
  //倒序循环把每一个圈圈序号放入source栈
  for (let i = plates; i > 0; i--) {
    source.push(i);
  }
  //通过return调用towerOfHanoi计算方法。
  return towerOfHanoi(plates, source, helper, dest, "source", "helper", "dest");
}

//这个方法是计算在汉诺塔的层数为plates的时候，每一个是从哪个柱子拿到哪个柱子的
function hanoi(plates, source, helper, dest, moves = []) {
  if (plates <= 0) return moves;
  if (plates === 1) {
    moves.push([source, dest]);
  } else {
    hanoi(plates - 1, source, dest, helper, moves);
    moves.push([source, dest]);
    hanoi(plates - 1, helper, source, dest, moves);
  }
  return moves;
}

console.log("3个盘子: ", hanoi(3, "source", "helper", "dest")); // (7) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)] 3个盘子一共需要7步
console.log(hanoiStack(2)); // [{…}, {…}, {…}]
console.log(hanoiStack(3)); // (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
