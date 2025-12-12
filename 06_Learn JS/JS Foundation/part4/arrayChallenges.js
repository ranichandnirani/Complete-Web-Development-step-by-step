/* 1. Declare an array named `teaFlovors` containing the following strings: "green", "black", "herbal", "oolong", "white".
Access the first element of the array and store it in a variable named `firstFlavor`.
*/

let teaFlavors = ["green-tea", "black-tea", "herbal-tea", "oolong-tea"];

const firstTea = teaFlavors[0];
console.log(firstTea);


// 2. Declare anarray named `cities` containing "London", "Paris", "New York", "Tokyo", "Sydney".
//Access the third element of the array and store it in a variable named `favoriteCity`.

let cities = ["London", "Paris", "New York", "Tokyo", "Sydney"];
const favoriteCity = cities[2];

console.log(favoriteCity);

/* 3.  You have an array named "teatypes" containing the following elements: "Green", "Black", "Oolong", "White", "Herbal".
chnage the second element of the array to "jaismine tea".*/

let teatypes = ["Green-tea", "Black-tea", "Oolong-tea", "White-tea", "Herbal-tea"];

teatypes[1] = "jaismine tea";

console.log (teatypes);

/* 4. Declare an array named `citicesVisited` containing "London", "Paris", "New York", "Tokyo", "Sydney".
Add "Berlin" to the end of the array using `push` method. */

let citicesVisited = ["London", "Paris", "New York", "Tokyo", "Sydney"];

citicesVisited.push("Berlin");

console.log(citicesVisited);

/* 5.  You have an array named `teaOrders` containing "Green", "Black", "Oolong", "White", "Herbal".
Remove the last element from the array using the `pop` method and store it in a variable named `lastOrder`. */

let teaOrders = ["Green-tea", "Black-tea", "Oolong-tea", "White-tea", "Herbal-tea"];

const lastOrder = teaOrders.pop();

console.log(lastOrder);
console.log(teaOrders);

/* 6. You have an array name `popularTeas` containing "Green-tea", "Black-tea", "Oolong", "Chai", "Herbal-tae".
Create a soft copy of this array named `softCopyTeas`.*/

let popularTeas = ["Green-tea", "Black-tea", "Oolong", "Chai", "Herbal-tae"];

let softCopyTeas = popularTeas;
popularTeas.pop();

console.log(softCopyTeas);
console.log(popularTeas);

/* 7. You have an array named `topCities` containing "New York", "Los Angeles", "Chicago", "Houston", "Phoenix".
Create a hard copy of this array named `hardCopyCities`.*/

let topCities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

let hardCopyCities = [...topCities];

topCities.pop();
console.log(hardCopyCities);
console.log(topCities);

/* 8. You Have two arrays named `europeanCities` contain "Paris", "Rome" and `asianCities` containe "Tokiyo" Bangkok.
Marge these two arrays into a new array named "worldCities". */

let europeanCities = ["Paris", "Rome"];
let asianCities = ["Tokiyo", "Bangkok"];

let worldCities = europeanCities.concat(asianCities);

console.log(worldCities);

/* 9. You have an array teaMenu containing "Green", "Black", "Oolong", "White", "Herbal".
Find the legth of the array and store it in a variable named `menuLength`. */

let teaMenu = ["Green-tea", "Black-tea", "Oolong-tea", "White-tea", "Herbal-tea"];

let menuLength = teaMenu.length;

console.log(menuLength);

/* 10. You have an array named `cityBucketList` containing "New York", "Los Angeles", "Chicago", "Houston", "Phoenix".
Check if "Chaicago" is in the array and store the result in a variable named `isChicagoInList`. */

let cityBucketList = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

let isChicagoInList = cityBucketList.includes("Chicago");

console.log(isChicagoInList);