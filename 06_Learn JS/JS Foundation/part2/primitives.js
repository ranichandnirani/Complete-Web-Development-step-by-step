// Number

let balance = 100;
let unotherBalance = new Number(100);

// console.log(balance); // 100
// console.log(unotherBalance); // [Number: 100]
console.log(typeof balance); // "number"
console.log(typeof unotherBalance); // "object"

// Boolean
let isActive = true;
let unotherIsActive = new Boolean(true); // !not recommended

//Null and Undefined

let firstName;
console.log(firstName); // undefined

let lastName = null;
console.log(lastName); // null

// string

let userName = "John";
let mytsring = "Hola";
let username = "chandni";

let oldGreet = userName +" Hello";
console.log(oldGreet); // JohnHello

let greeting = `how are you ${mytsring} !`;
console.log(greeting); // how are you Hola !

let sm1 = Symbol("id"); // unique
let sm2 = Symbol();

console.log(sm1);
console.log(sm1 === sm2); // false