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

// Generate birthday[year] <option>
// --



// Add "required" symbol to <label>
// -------------------------




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