"use strict";

const title = "Super Car 3000 - les bagnolles du turfu !";
const cars = [
    {
        brand: "Ford",
        model: "Focus",
        motor: "gas",
        isNew: false,
    },
    {
        // brand: "Ford",
        model: "F-350",
        motor: "gas",
        isNew: false,
    },
    {
        brand: "Mustang",
        model: "Mach-e",
        motor: "electrical",
    },
    {
        brand: "Tesla",
        model: "Model X",
        motor: "electrical",
    },
    {
        brand: "Toyota",
        model: "Hilux",
        motor: "gas",
    },
    {
        brand: "DMC",
        model: "Delorean '22",
        motor: "electrical",
        isNew: true,
    },
];

const body = document.body;

// -----------------------------------------------------------------------------

// Set the title to the <title> tag
// --

// Get the title Node
let nodeTitle = document.getElementsByTagName('title')[0];

// Add the title to the <title> tag
nodeTitle.innerText = title;



// Create the <.container> element
// --

// Create the node in the document memory
let nodeContainer = document.createElement('DIV');

// Add the .container class to the node
nodeContainer.classList.add('container');

// Add the <.container> to the start of the <body>
body.prepend(nodeContainer);




// Create the <table>
// --

let nodeTable = document.createElement('TABLE');
    nodeTable.classList.add('table');
    nodeContainer.append(nodeTable);


// Create the <table> head (thead)
// --

let nodeTableHead = document.createElement('THEAD');
    nodeTable.append(nodeTableHead);

let nodeTHeadLine_1 = document.createElement('TR');
    nodeTableHead.append(nodeTHeadLine_1);
let nodeTHeadLine_1_col_brand = document.createElement('TH');
let nodeTHeadLine_1_col_model = document.createElement('TH');
let nodeTHeadLine_1_col_motor = document.createElement('TH');

    nodeTHeadLine_1_col_brand.innerHTML = "Marque";
    nodeTHeadLine_1_col_model.innerHTML = "Modèle";
    nodeTHeadLine_1_col_motor.innerHTML = "Motorisation";

    nodeTHeadLine_1.append(nodeTHeadLine_1_col_brand);
    nodeTHeadLine_1.append(nodeTHeadLine_1_col_model);
    nodeTHeadLine_1.append(nodeTHeadLine_1_col_motor);


// Create the <table> body (tbody)
// --

let nodeTableBody = document.createElement('TBODY');
    nodeTable.append(nodeTableBody);


for (const car of cars)
{
    console.log(car);
    let brand = car.brand;
    let model = car.model;
    let motor = car.motor;
    let isNew = car.isNew ?? false;

    let nodeTBodyLine = document.createElement('TR');
    let nodeTBodyCol_brand = document.createElement('TD');
    let nodeTBodyCol_model = document.createElement('TD');
    let nodeTBodyCol_motor = document.createElement('TD');

        if (isNew)
        {
            // nodeTBodyLine.classList.add('new');
            nodeTBodyLine.style.backgroundColor = "aqua";
        }

        nodeTBodyCol_brand.innerHTML = brand;
        nodeTBodyCol_model.innerHTML = model;
        nodeTBodyCol_motor.innerHTML = motor;

        nodeTBodyLine.append(nodeTBodyCol_brand);
        nodeTBodyLine.append(nodeTBodyCol_model);
        nodeTBodyLine.append(nodeTBodyCol_motor);

        nodeTableBody.append(nodeTBodyLine);
}