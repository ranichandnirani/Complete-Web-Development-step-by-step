/* 1. Write a for loop that loops through the array "green tea", "black tea", "chai", "oolong tea". and stops the loop when it find "chai".

Store all teas before "chai" int a new array named "selectedTeas". */

let teas = ["green tea", "black tea", "chai", "oolong tea"];
let selectedTeas = [];

for(let i = 0; i <teas.length; i++) {
    if(teas[i] === 'chai') {
        break;
    }
    selectedTeas.push(teas[i]);
}

// console.log(selectedTeas);

/* 2. Write a for loop that loops through the array ["London", "New York", "Paris", "Berlin"] and skips "Paris",

Store the other cities in a new array name 'visitedCities'.
*/

let cities = ["London", "New York", "Paris", "Berlin"];
let visitedCities = [];
for(let i = 0; i < cities.length; i++) {
    if(cities[i] === 'Paris') {
        continue;
    }
    visitedCities.push(cities[i]);
}
// console.log(visitedCities);

/* 3. Use a for-of loop to iterate through the array [1, 2, 3, 4, 5] and stop when the number '4' is found. 
Store the numbers before '4' in an array named 'smallNumbers'.
*/

let number = [1, 2, 3, 4, 5];
let smallNumbers = [];

for(const num of number) {
    if(num === 4) {
        break;
    }
    smallNumbers.push(num)
}

// console.log(smallNumbers);

/* 4. USe a for-of loop to iterate through the array ["chai", "green tea", "herbal tea", "black tea"] and skip "herbal tea".
Store the other teas in an array named "preferedTeas".
*/

let teaTypes = ["chai", "green tea", "herbal tea", "black tea"];
let preferedTeas = [];

for(const tea of teaTypes) {
    if(tea === "herbal tea") {
        continue;
    }
    preferedTeas.push(tea);
}

// console.log(preferedTeas);

/* 5. Use for-in loop to loop through an object containing city population.
Stop the loop when the population of "Berlin" is found and store all previous cities population in a new object named "citypopulations".
let citiesPopulation = {
    "London": 8900000,
    "New York": 8400000,
    "Paris": 2200000,
    "Berlin": 3500000
};
*/
let citiesPopulation = {
    London: 8900000,
    "New York": 8400000,
    Paris: 2200000,
    Berlin: 3500000
};

let cityPopulations = {}
// console.log(Object.values(citiesPopulation));
for (const city in citiesPopulation) {
    // key = value
    cityNewPopulations[city] = citiesPopulation[city];
    // console.log(citiesPopulation[city]);
}
console.log(cityNewPopulations);
