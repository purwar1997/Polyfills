'use strict';

// code for the function sum(a)(b)(c)()()()()(n) that returns the sum of a+b+c+...+n

let sum = 0;

let calcSum = function (num) {
  if (typeof num === 'number') {
    sum += num;
    return calcSum;
  } else {
    return sum;
  }
};

console.log(calcSum(3)(11)(8)(10)(1)(11)(10)(5)(1)(10)(30)());

// code for the function sum(1)(2)(3)()()()()(n) that returns the sum of 1+2+3+...+n

sum = function (a) {
  return function (b) {
    if (b) {
      return sum(a + b);
    }
    return a;
  };
};

console.log(sum(1)(2)(3)(4)(5)(6)());

// above written code in ES6 syntax

sum = a => b => b ? sum(a + b) : a;
console.log(sum(3)(4)(7)(6)());
