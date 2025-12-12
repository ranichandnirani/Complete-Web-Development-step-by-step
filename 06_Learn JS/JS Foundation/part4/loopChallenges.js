/* 1. Write a `While` loop that calculates the sum of all numbers from 1 to 5 and stores the result in a variable named `sum`. */

let sum = 0;
let i = 1;

while (i <= 5) {

    sum = sum + i
    i++;
}

console.log(sum); // 5+4+3+2+1 = 15

/* 2. Write a `While` loop that count down from 5 to 1 and store number in an array named `countdown`. */

let countdown = [];
let n = 5;

while (n > 0) {
    countdown.push(n);
    n--;
}
console.log(countdown); // [5, 4, 3, 2, 1]

/* 3. Write a `do while` loop that pprompts a user to enter their favorite tea type unitl they enter "Stop". Store each tea type in an array named `teaCollection`. */


let teaCollection = [];
let tea;

do {
    tea = prompt("Enter your favorite tea type (or type 'Stop' to finish):");
    if (tea !== "Stop") {
        teaCollection.push(tea);
    }

} while(tea !== "Stop");

console.log(teaCollection);

/* 4. Write a ` do while` loop that adds numbers from 1 to 3 and stores the result in a variable named `total`. */

let total = 0;
let num = 1;

do {
    total += num;
    num++;

} while (num <= 3);

console.log(total); // 1 + 2 + 3 = 6

/* 5. Write a `for` loop that multiplies each element in the array `[2, 4, 6]` by 2 and stores the results in a new array named `multipliedNumbers`.
*/

let multipliedNumbers = [];
let numbers = [2, 4, 6];

for (let l = 0; l < numbers.length; l++) {
  //   takeNumber = numbers[l] * 2;
  //   multipliedNumbers.push(takeNumber);

  multipliedNumbers.push(numbers[l] * 2);
}
// console.log(multipliedNumbers);

/* 
6. Write a `for` loop that lists all the cities in the array `["Paris", "New York", "Tokyo", "London"]` and stores each city in a new array named `cityList`.
*/

let cities = ["Paris", "New York", "Tokyo", "London"];
let cityList = [];

for (let c = 0; c < cities.length; c++) {
  const myCity = cities[c];
  cityList.push(myCity);
}
console.log(cityList);
