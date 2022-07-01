'use strict';

const num = [12, 90, 3, 65, 5, 10];

// polyfill for map()
Array.prototype.myMap = function (callback) {
  const output = [];
  for (const [index, item] of this.entries()) {
    output.push(callback(item, index, this));
  }
  return output;
};

console.log(num.myMap(item => item * 5));

// polyfill for filter()
Array.prototype.myFilter = function (callback) {
  const output = [];
  for (const [index, item] of this.entries()) {
    if (callback(item, index, this)) {
      output.push(item);
    }
  }
  return output;
};

console.log(num.myFilter(item => item % 3 === 0));

// polyfill for reduce()
Array.prototype.myReduce = function (callback, initialAcc) {
  let acc = initialAcc;
  for (const [index, item] of this.entries()) {
    acc = callback(acc, item, index, this);
  }
  return acc;
};

console.log(num.myReduce((product, item) => product * item, 1));
console.log(num.myReduce((sum, item) => sum + item, 0));

// polyfill for find()
Array.prototype.myFind = function (callback) {
  for (const [index, item] of this.entries()) {
    if (callback(item, index, this)) {
      return item;
    }
  }
};

console.log(num.myFind(item => item % 2 === 1));

// polyfill for findIndex()
Array.prototype.myFindIndex = function (callback) {
  for (const [index, item] of this.entries()) {
    if (callback(item, index, this)) {
      return index;
    }
  }
};

console.log(num.myFindIndex(item => item % 2 === 1));
console.log(num.myFindIndex(item => item % 2 === 0));

// polyfill for sort()
Array.prototype.mySort = function (compare) {
  for (let index = 0; index < this.length; index++) {
    for (let index = 0; index < this.length - 1; index++) {
      if (compare(this[index], this[index + 1]) > 0) {
        // swap values
        const temp = this[index];
        this[index] = this[index + 1];
        this[index + 1] = temp;
      }
    }
  }
  return this;
};

console.log(num.mySort((a, b) => a - b));
console.log(num.mySort((a, b) => b - a));

// creating objects using a normal function
function Student(name, age) {
  const student = Object.create({}, { name: { value: name }, age: { value: age } });
  return student;
}

const stu1 = Student('Kapil', 25);
const stu2 = Student('John', 20);
const stu3 = Student('Sharan', 23);

const studentInfo = function (course, college) {
  return `${this.name}, ${this.age} years old is pursuing ${course} from ${college}`;
};

// polyfill for call()
Function.prototype.myCall = function (object, ...args) {
  object._this = this;
  return object._this(...args);
};

console.log(studentInfo.myCall(stu1, 'Btech', 'IIIT'));
console.log(studentInfo.myCall(stu3, 'MS', 'NIT'));

// polyfill for apply()
Function.prototype.myApply = function (object, args) {
  object._this = this;
  return object._this(...args);
};

console.log(studentInfo.myApply(stu1, ['Btech', 'BITS PIlani']));
console.log(studentInfo.myApply(stu3, ['MCA', 'IGNOU']));

const aboutStudent = function (course, college, company, location) {
  return `${this.name}, ${this.age} years old has completed his ${course} from ${college}\nCurrently working in ${company}, ${location}`;
};

// polyfill for bind()
Function.prototype.myBind = function (object, ...args) {
  object._this = this;
  return function (...args_) {
    return object._this(...args, ...args_);
  };
};

let aboutStu1 = aboutStudent.myBind(stu1, 'BCA', 'IGNOU');
console.log(aboutStu1('Cred', 'Mumbai'));

let aboutStu2 = aboutStudent.myBind(stu2, 'BSc', 'DTU');
console.log(aboutStu2('Paytm', 'Noida'));

// polyfill for bind() using call()
Function.prototype.myBindUsingCall = function (object, ...args) {
  const _this = this;
  return function (...args_) {
    return _this.call(object, ...args, ...args_);
  };
};

aboutStu2 = aboutStudent.myBindUsingCall(stu2, 'MTech', 'BIT Mesra');
console.log(aboutStu2('Oyo', 'Mumbai'));

// polyfill for bind() using apply()
Function.prototype.myBindUsingApply = function (object, ...args) {
  const _this = this;
  return function (...args_) {
    return _this.apply(object, [...args, ...args_]);
  };
};

let aboutStu3 = aboutStudent.myBindUsingApply(stu3, 'Btech', 'IIT Delhi');
console.log(aboutStu3('Uber', 'California'));
