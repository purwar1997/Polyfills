'use strict';

function Names(firstName, lastName) {
  // there will be no methods inside __proto__
  const name = Object.create(
    {},
    { firstName: { value: firstName }, lastName: { value: lastName } }
  );
  return name;
}

const name1 = Names('Shubham', 'Purwar');
const name2 = Names('Suyash', 'Purwar');
const name3 = Names('Kapil', 'Malakar');

const printFullName = function () {
  console.log(`${this.firstName} ${this.lastName}`);
};

const about = function (city, state, country) {
  console.log(`${this.firstName} ${this.lastName} lives in  ${city}, ${state}, ${country}`);
};

// every function in JS has access to call(), apply() and bind() methods

// call() method
// first argument -> object that this keyword will refers to

printFullName.call(name2);
printFullName.call(name3);

// in call(), args are passed individually
about.call(name1, 'Etawah', 'UP', 'India');
about.call(name3, 'Guwahati', 'Assam', 'India');

// in apply(), an array of args will be passed
about.apply(name2, ['Etawah', 'UP', 'India']);
about.apply(name3, ['Guwahati', 'Assam', 'India']);

// bind() method
// bind() will bind function (printFullName()) will the object (name3) i.e. 'this' will always refer to name3 object
// bind() will return copy of the function that can be invoked later
// printName will contain copy of the printFullName() function in which 'this' will refer to name3 object

const printName = printFullName.bind(name3);
console.log(printName);
printName();

const printName2 = printFullName.bind(name1);
printName2();

// about2 will have copy of about() function in which 'this' will refer to name2 object
const about2 = about.bind(name2, 'Etawah', 'UP', 'India');
about2();

// about1 will have copy of about() function in which 'this' will refer to name1 object
const about1 = about.bind(name1, 'Etawah', 'UP', 'India');
about1();

// another example
const test = {
  a: 12,
  b: 100,
};

function tester(a, b) {
  console.log(`a: ${this.a} and b: ${this.b} | other a: ${a} and b: ${b}`); // this -> test
}

// call()
tester.call(test, 200, 400);

// apply()
tester.apply(test, [200, 400]);

// bind()
tester.bind(test, 200, 400)();

function tester2(a, b, c) {
  console.log(`a: ${this.a} and b: ${this.b} | other a: ${a} b: ${b} c: ${c}`); // this -> test
}

tester2.bind(test, 10, 20)(30);
tester2.bind(test, 10)(20, 30);
tester2.bind(test)(10, 20, 30);
