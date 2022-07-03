'use strict';

// function currying => taking a function that has multiple parameters and breaking it dowm into a
// series of unary(one paramter) functions

const add = function (x) {
  return function (y) {
    return function (z) {
      console.log(x + y + z);
    };
  };
};

add(4)(7)(10);
add(40)(0)(12);

// function currying using closures
const multiply_ = function (x) {
  return function (y) {
    console.log(x * y);
  };
};

// along with the function, its closure is also returned
// closure is function bundled with its lexical environment
// that lexical environment contain references to variables and functions outside the scope of that function
multiply_(5)(8);

// its closure will have x = 2
const multiplyByTwo_ = multiply_(2);
multiplyByTwo_(12);
multiplyByTwo_(9);

// its closure will have x = 10
const mutiplyByTen_ = multiply_(10);
mutiplyByTen_(21);
mutiplyByTen_(11);

// function currying using bind()
const mutiply = function (x, y) {
  console.log(x * y);
};

// first argument has to be an object
// this -> global object
const mutiplyByTwo = mutiply.bind(this, 2); // x = 2, y = undefined
mutiplyByTwo(8);
mutiplyByTwo(12);

const mutiplyByFive = mutiply.bind(this, 5); // x = 5, y = undefined
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

// another example using bind()
const user1 = {
  firstName: 'Shubham',
  lastName: 'Purwar',
  role: 'admin',
  courseCount: 3,
  getInfo: function () {
    console.log(
      `${this.firstName} ${this.lastName} is the ${this.role} who has created ${this.courseCount} courses`
    );
  },
};

const user2 = {
  firstName: 'Kapil',
  lastName: 'Gupta',
  role: 'admin',
  courseCount: 2,
};

const user3 = {
  firstName: 'Aman',
  lastName: 'Roy',
  role: 'admin',
  courseCount: 5,
};

user1.getInfo();

// bind() always returns a function that can be invoked later
user1.getInfo.bind(user2)();
user1.getInfo.bind(user3)();

// call() will directly invoke a function
user1.getInfo.call(user2);
user1.getInfo.call(user3);
