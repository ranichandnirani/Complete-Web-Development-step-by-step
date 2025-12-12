const username = {firstname: "chandni", isLoggedin: true};

username.firstname = "Anjali";
username.lastname = "Sharma";

console.log(username.firstname);
console.log(username.lastname); 
console.log(username);
console.log(typeof username); // "object"

// Array

let heros = ["Ironman", "Spiderman", "Thor"];
console.log(heros[0]); // Ironman