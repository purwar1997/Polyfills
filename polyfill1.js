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

const user1 = {
  name: 'Shubham',
  age: 24,
};

const user2 = {
  name: 'Kapil',
  age: 25,
};

const user3 = {
  name: 'Prashant',
  age: 23,
};

const userInfo = function (job, city, state) {
  console.log(`${this.name}, ${this.age} years old ${job} lives in ${city}, ${state}`);
};

// how call() and apply() works
userInfo.call(user1, 'coder', 'Etawah', 'UP');
userInfo.apply(user2, ['designer', 'Noida', 'UP']);

// polyfill of call()
Function.prototype.polyCall = function (reference, ...args) {
  // this refers to the object on which the method is called i.e. userInfo
  reference.funcProperty = this;
  reference.funcProperty(...args); // invokes function and passes arguments
};

userInfo.polyCall(user1, 'engineer', 'Agra', 'MP');
userInfo.polyCall(user2, 'enterprenuer', 'Mambai', 'Maharashtra');

// polyfill of apply()
Function.prototype.polyApply = function (reference, args) {
  reference.funcProperty = this;
  reference.funcProperty(...args); // invokes function() and passes arguments
};

userInfo.polyApply(user2, ['teacher', 'Bhopal', 'MP']);
userInfo.polyApply(user3, ['chef', 'Rohtak', 'Haryana']);

// bind() => doesn't invoke function but returns that function copy
const student1 = {
  firstname: 'Shubham',
  lastname: 'Purwar',
};

const student2 = {
  firstname: 'Aman',
  lastname: 'Shah',
};

const aboutStu = function (college, location) {
  console.log(`${this.firstname} ${this.lastname} college ${college}, ${location}`);
};

const aboutStu1 = aboutStu.bind(student1, 'VIT', 'Bhopal');
aboutStu1();

// polyfill for bind()
// Function.prototype.polyBind = function (reference, ...args) {
//   reference.funcProperty = this;
//   return reference.funcProperty;
// };

// const aboutStu2 = aboutStu.polyBind(student2, 'IIIT', 'Mumbai');
// aboutStu2();
