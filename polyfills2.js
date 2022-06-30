'use strict';

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
// first argument will always be an object that 'this' keyword will refer to
userInfo.call(user1, 'coder', 'Etawah', 'UP'); // in call(), args are passed individually
userInfo.apply(user2, ['designer', 'Noida', 'UP']); // in apply(), args are passed in the form of an array

// polyfill of call()
Function.prototype.polyCall = function (object, ...args) {
  // this refers to the object(function) on which the method is called i.e. userInfo
  object._this = this; // _this is just a newly created property of object
  return object._this(...args); // invokes function and passes arguments
};

userInfo.polyCall(user1, 'engineer', 'Agra', 'MP');
userInfo.polyCall(user2, 'enterprenuer', 'Mambai', 'Maharashtra');

// polyfill of apply()
Function.prototype.polyApply = function (object, args) {
  object._this = this;
  return object._this(...args); // invokes function() and passes arguments
};

userInfo.polyApply(user2, ['teacher', 'Bhopal', 'MP']);
userInfo.polyApply(user3, ['chef', 'Rohtak', 'Haryana']);

// bind() => doesn't invoke function on which it is applied but returns that function copy
// in that function copy, 'this' keyword refers to the object that is passed as an argument
const student1 = {
  firstname: 'Shubham',
  lastname: 'Purwar',
};

const student2 = {
  firstname: 'Aman',
  lastname: 'Shah',
};

const student3 = {
  firstname: 'Prashant',
  lastname: 'Saxena',
};

const aboutStu = function (college, location, cgpa, company) {
  console.log(
    `${this.firstname} ${this.lastname} has graduated from ${college}, ${location} with a CGPA of ${cgpa}\nCurrently working in ${company}`
  );
};

let aboutStu1 = aboutStu.bind(student1, 'VIT', 'Bhopal');
aboutStu1(9.8, 'Cred');

// polyfill for bind()
Function.prototype.polyBind = function (object, ...args) {
  object._this = this;
  // when this function is returned, its closure is also returned along with it
  // due to which variables(object and args) outside the scope of function can be accessed
  return function (...args_) {
    return object._this(...args, ...args_);
  };
};

let aboutStu2 = aboutStu.polyBind(student2, 'IIIT', 'Mumbai');
aboutStu2(9.1, 'Google');

let aboutStu3 = aboutStu.polyBind(student3, 'NIT', 'Trichy');
aboutStu3(8.2, 'Meta');

// polyfill for bind() which uses call() method
Function.prototype.polyBindUsingCall = function (object, ...args) {
  // _this is just a variable
  const _this = this;
  return function (...args_) {
    return _this.call(object, ...args, ...args_);
  };
};

aboutStu1 = aboutStu.polyBindUsingCall(student1, 'IIT', 'Delhi');
aboutStu1(8.3, 'Ola');

// polyfill for bind() which uses apply() method
Function.prototype.polyBindUsingApply = function (object, ...args) {
  const _this = this;
  return function (...args_) {
    return _this.apply(object, [...args, ...args_]);
  };
};

aboutStu2 = aboutStu.polyBindUsingApply(student2, 'IIT', 'Madras');
aboutStu2(9.9, 'Apple');

aboutStu3 = aboutStu.polyBindUsingApply(student3, 'BITS', 'Pilani');
aboutStu3(10, 'Uber');
