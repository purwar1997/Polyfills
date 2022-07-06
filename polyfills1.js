'use strict';

const arr1 = [12, 9, 6, 8, 16, 3, 1];

// square() and max() will be inside the __proto__ property of array object
// square() and max() will become methods of array object
Array.prototype.square = function () {
  const squares = [];
  for (const item of this) {
    squares.push(item ** 2);
  }
  return squares;
};

console.log(arr1.square());
console.log([9, 8].square());

Array.prototype.max = function () {
  let max = this[0];
  for (const item of this) {
    if (item > max) {
      max = item;
    }
  }
  return max;
};

console.log(arr1.max());
console.log([90, 89, 12, 0].max());

// polyfill for reverse()
Array.prototype.reversal = function () {
  const reverse = [];
  for (const item of this) {
    reverse.unshift(item);
  }
  return reverse;
};

console.log(arr1.reversal());
console.log([90, 89, 12, 0].reversal());

// polyfill for includes()
Array.prototype.has = function (element) {
  for (const item of this) {
    if (item === element) return true;
    else continue;
  }
  return false;
};

console.log(arr1.has(12));
console.log([90, 899, 'oppo'].has('oppo'));
console.log([90, 899, 'oppo'].has('oppos'));

// polfill for join()
Array.prototype.merge = function (joint) {
  let str = '';
  for (const item of this) {
    str = str + String(item) + joint;
  }
  str = str.slice(0, str.lastIndexOf(joint));
  return str;
};

console.log(arr1.merge('+'));
console.log(arr1.merge('007'));
console.log(arr1.merge('text'));

// polyfill for concat()
Array.prototype.polyConcat = function (arr) {
  return [...this, ...arr];
};

// polyfill for fill()
Array.prototype.polyFill = function (filler, start, end) {
  let i, j;
  if (start) {
    i = start;
    j = end ? end : this.length;
  } else {
    i = 0;
    j = this.length;
  }

  for (let index = i; index < j; index++) this[index] = filler;
  return this;
};

console.log(arr1.polyFill('empty', 2, 5));
console.log(arr1.polyFill('empty', 3));

// poyfill for map()
Array.prototype.polyMap = function (callback) {
  const outputArr = [];
  for (const [index, item] of this.entries()) {
    let output = callback(item, index, this);
    outputArr.push(output);
  }
  return outputArr;
};

console.log(arr1);
console.log(arr1.polyMap(item => item * 2));
console.log(arr1.polyMap((item, index) => `Item ${index}: ${item}`));
console.log(arr1.polyMap(item => item.toString(2)));

// polyfill for filter()
Array.prototype.polyFilter = function (callback) {
  const outputArr = [];
  for (const [index, item] of this.entries()) {
    if (callback(item, index, this)) {
      outputArr.push(item);
    }
  }
  return outputArr;
};

console.log(arr1);
console.log(arr1.polyFilter(item => item % 2 === 0));
console.log(arr1.polyFilter(item => item % 2 === 1));
console.log(arr1.polyFilter(item => item > 10));
console.log(arr1.polyFilter(item => item > 100));

// polyfill for find()
Array.prototype.polyFind = function (callback) {
  for (const [index, item] of this.entries()) {
    if (callback(item, index, this)) {
      return item;
    }
  }
};

console.log(arr1);
console.log(arr1.polyFind(item => item % 2 === 0));
console.log(arr1.polyFind(item => item < 5));
console.log(arr1.polyFind(item => item > 500));

// polyfill for findIndex()
Array.prototype.polyFindIndex = function (callback) {
  for (const [index, item] of this.entries()) {
    if (callback(item, index, this)) {
      return index;
    }
  }
};

console.log(arr1);
console.log(arr1.polyFindIndex(item => item % 2 === 0));
console.log(arr1.polyFindIndex(item => item < 5));
console.log(arr1.polyFindIndex(item => item > 500));

// polyfill for reduce()
Array.prototype.polyReduce = function (callback, initialAcc) {
  let acc = initialAcc;
  for (const [index, item] of this.entries()) {
    acc = callback(acc, item, index, this);
  }
  return acc;
};

console.log(arr1);
console.log(arr1.polyReduce((sum, item) => sum + item, 0));

const arr2 = ['Shubham ', 'Purwar ', 'Code'];
console.log(arr2.polyReduce((acc, item) => acc + item, 'Great '));

// polyFill for sort()
Array.prototype.polySort = function (compare) {
  for (let index = 0; index < this.length; index++) {
    for (let index = 0; index < this.length - 1; index++) {
      const output = compare(this[index], this[index + 1]);
      if (output > 0) {
        // swap values
        const temp = this[index];
        this[index] = this[index + 1];
        this[index + 1] = temp;
      } else {
        continue;
      }
    }
  }
  return this;
};

console.log(arr1);
console.log(arr1.polySort((a, b) => a - b));
console.log(arr1.polySort((a, b) => b - a));
console.log([9, 5, 12, 0, 12, -8].sort((a, b) => b - a));

// polyfill for some()
Array.prototype.polySome = function (callback) {
  for (let [index, item] of this.entries()) {
    if (callback(item, index, this)) {
      return true;
    }
  }
  return false;
};

let numbers = [2, 44, 8, 34, -10];
console.log(numbers.polySome(item => item < 0));
console.log(numbers.polySome(item => item % 3 === 0));

// polyfill for every()
Array.prototype.polyEvery = function (callback) {
  for (let [index, item] of this.entries()) {
    if (callback(item, index, this) === false) {
      return false;
    }
  }
  return true;
};

numbers = [2, 44, 8, 34, 1];
console.log(numbers.polyEvery(item => item > 0));
console.log(numbers.polyEvery(item => item % 2 === 0));

// Note: callbacks inside filter(), find(), findIndex(), some() and every() returns either true or false
