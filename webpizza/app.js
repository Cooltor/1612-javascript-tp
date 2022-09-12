"use strict";

// Data definitions
// --

const pizzas = [
    {
        name: "Reine",
        priceVatFree: 8.50,
    },
    {
        name: "Margarita",
        priceVatFree: 8.99,
    },
    {
        name: "Calzone",
        priceVatFree: 10,
    },
    {
        name: "Hawaï",
        priceVatFree: 11.50,
    },
    {
        name: "Savoyarde",
        priceVatFree: 11.50,
    }
];
const drinks = [
    {
        name: "Eau",
        priceVatFree: 1.8,
    },
    {
        name: "Pepsi",
        priceVatFree: 2.9,
    },
    {
        name: "IceTea",
        priceVatFree: 3.1,
    },
    {
        name: "Biere",
        priceVatFree: 3.5,
    }
];
const desserts = [
    {
        name: "Bonbec",
        priceVatFree: 2.5,
    },
    {
        name: "Mars",
        priceVatFree: 3.5,
    },
    {
        name: "Magnum",
        priceVatFree: 3.5,
    },
    {
        name: "Cookie",
        priceVatFree: 1.8,
    },
    {
        name: "Fondont Choco",
        priceVatFree: 5.8,
    }
];

let cart = [];

// Text definitions
// --

const menuTxtPrefix = `Faites un choix:`;

const menuTxt = `${menuTxtPrefix}
    1: pizzas
    2: boissons
    3: desserts
    4: panier`;

const err001 = `Vous avez commis une monumental erreur.`;
const err002 = `Vous avez annuler la commande.`;


// Functions Definitions
// --

/**
 * Affiche le menu de Démarrage
 */
function start() 
{
    let menuChoice = prompt(menuTxt);

    if (menuChoice != null)
    {
        let menuNum = parseInt(menuChoice);

        if (isNaN(menuNum) || menuNum <= 0 || menuNum > 4)
        {
            alert(err001);
            start();
        }
        else 
        {
            switch (menuNum) {
                case 1: showItems(pizzas); break;
                case 2: showItems(drinks); break;
                case 3: showItems(desserts); break;
                case 4: showCart();  break;
            }
        }
    }
    else
    {
        alert(err002);
    }
}



/**
 * Affiche les entrées de l'argument "items"
 * 
 * @param Array items Listes des Pizzas, Boissons ou Desserts... selon le choix de l'utilisateur
 */
function showItems(items=[])
{
    console.log("Affiche les items", items);
}



/**
 * Affiche le contenue du panier
 */
function showCart() 
{
    console.log("Affiche le panier", cart);
}





// Démarrage réel de l'application
start();