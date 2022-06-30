'use strict';

// function currying means function borrowing

// function currying using bind()
const mutiply = function (x, y) {
  console.log(x * y);
};

// first argument has to be an object
// this -> global object
const mutiplyByTwo = mutiply.bind(this, 2); // x = 2, y = undefined
mutiplyByTwo(8);
mutiplyByTwo(12);

const mutiplyByFive = mutiply.bind(this, 5); // x = 2, y = undefined
mutiplyByFive(12);
mutiplyByFive(6);

// both these functions are borrowing multiply() function
// that is called Function Borrowing
// bind() enables function borrowing because instead of calling function, it returns function

const userName = function (name, info) {
  console.log(`${name}: ${info}`);
};

// userInfo has borrowed userName()
const userInfo = userName.bind(this, 'Shubham');
userInfo('24');
userInfo('password134');

const userInfo2 = userInfo.bind(this, 'shubham@ai.com');
userInfo2();
userInfo2();

// function currying using closures
const multiply_ = function (x) {
  return function (y) {
    console.log(x * y);
  };
};

// along with the function, its closure is also returned
multiply_(5)(8);

// its closure will have x = 2
const multiplyByTwo_ = multiply_(2);
multiplyByTwo_(12);
multiplyByTwo_(9);

// its closure will have x = 10
const mutiplyByTen_ = multiply_(10);
mutiplyByTen_(21);
mutiplyByTen_(11);
