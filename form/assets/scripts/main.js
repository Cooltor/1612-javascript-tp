"use strict";

// Generate Birthday <option>
// -------------------------

// Generate birthday[day] <option>
// --

// Get the <select[name=birthday[day]]>
const node_birthdayDay = document.getElementsByName('birthday[day]')[0];

// Loop from 1 to 31
for (let i=1; i <= 31; i++)
{
    // Create <option> tag
    const node_option = document.createElement('OPTION');

    // Add i between <option>
    // i <= 9       Condition : i doit etre strictement inférieur à 9
    // ?            Opérateur ternaire
    // "0"+i        SI la condition retourne TRUE, alors on retourn 01, 02, 03, ...
    // :            SINON
    // i;           On retourn i (1, 2, 3, ...)
    node_option.innerText = i <= 9 ? "0"+i : i;

    // Add i as value of <option>
    node_option.value = i;

    // Insert <option> in <select>
    node_birthdayDay.append(node_option);
}


// Generate birthday[month] <option>
// --

// Define the list of months
const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// Get the <select[name=birthday[month]]>
const node_birthdayMonth = document.getElementsByName('birthday[month]')[0];

// Loop on months list
for (let index in months)
{
    let month_num = parseInt(index) + 1;
    let month_name = upperCaseFirst(months[index]);

    // Create <option> tag
    const node_option = document.createElement('OPTION');

    // Add month name between <option>
    node_option.innerText = month_name;

    // Add month num as value of <option>
    node_option.value = month_num;

    // Insert <option> in <select>
    node_birthdayMonth.append(node_option);
}


// Generate birthday[year] <option>
// --

const date = new Date();
const current_year = date.getFullYear();
const min_year = current_year - 100;

// Get the <select[name=birthday[year]]>
const node_birthdayYear = document.getElementsByName('birthday[year]')[0];

for (let i=current_year; i>=min_year; i--)
{
    // Create <option> tag
    const node_option = document.createElement('OPTION');

    // Add year between <option>
    node_option.innerText = i;

    // Add year as value of <option>
    node_option.value = i;

    // Insert <option> in <select>
    node_birthdayYear.append(node_option);
}


// Add "required" symbol to <label>
// -------------------------

// Get all required input
// --
const requiredNodes = document.querySelectorAll('[required]');

// Loop on each node of the NodeList
for (let node of requiredNodes)
{
    const nodeName = node.nodeName;
    const nodeType = node.getAttribute('type');

    // console.log(nodeName, nodeType);


    // For all INPUT
    if (nodeName == "INPUT")
    {
        // For all <input type="checkbox">
        if (nodeType == "checkbox")
        {
            // Get the parent of the node
            // retrieve the <label> form the <input required>
            let parent = node.parentNode;

            // Get the <label> form the parent node
            let label = parent;

            // Add the class required to the <label>
            label.classList.add('required');
        }

        // For all other <input>
        else 
        {
            // Get the parent of the node
            // retrieve the <.mb-3> form the <input required>
            let parent = node.parentNode;
        
            // Get the <label> form the parent node
            // retrieve the <label> in the <.mb-3>
            let label = parent.querySelector("label");
        
            // Add the class required to the <label>
            // "label?" : SI label != null, on execute la suite de la ligne de code
            label?.classList.add('required');
        }
    }

    // For all SELECT
    else if (nodeName == "SELECT")
    {
        // let label = node.parentNode.parentNode.parentNode.querySelector("label")
        let label = getParent(node, 3).querySelector("label");

        label.classList.add('required');
    }
}




// Form checking
// -------------------------

// Catch the form submit
// --

// Retrieve form data
// --

// Validate form data + Add error message
// --

// Check Firstname
// Obligatoire + Doit être une chaine de caractères (min, maj, -)

// Check Lastname
// Obligatoire + Doit être une chaine de caractères (min, maj, -)

// Check Email
// Obligatoire + Doit correspondre à la syntaxe chaine@chaine.chaine (min, maj, nombre, - .)

// Check Password
// Obligatoire + Doit avoir min. 6 caractères, max. 16 caractères, 
// au moins une minuscule,
// au moins une majuscule, 
// au moins un nombre,
// au moins un caractère spéciale (+=!?&-_%$€£@*|),

// Check Confirm Password
// Doit être identique au "password"

// Check Birthday
// Obligatoire + Date valide... dans le passé
// Age > 13 ans

// Check Terms
// Obligatoire