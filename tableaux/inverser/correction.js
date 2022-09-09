"use strict";

var cars = [
    "Ford",
    "Chevrolet",
    "Aston Martin",
    "Mercury",
    "Licoln",
    "Tesla",
    "Polestar",
];


// 1 - Trier le tableau en ordre alphabetique
cars.sort();

// 2 - Afficher le tableau en ordre alphabetique inversé.
cars.reverse();


cars.forEach(value => console.log(value));