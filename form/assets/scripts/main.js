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

        let label = getParentNode(node, 3).querySelector("label");

        label.classList.add('required');
    }
}




// Form checking
// -------------------------

// Catch the form submit
// --

// Get the <form> tag
const form = document.forms[0];

// catch the form submit event
form.addEventListener('submit', event => {

    // Consider the form has NO ERROR
    let hasError = false;


    // #region reset-error

    // reset all errors
    let messages = form.querySelectorAll('.invalid-feedback');

    for (let message of messages)
    {
        message.remove();
    }

    // #endregion reset-error


    // #region input-node

    // Retrieve form nodes
    // --

    let node_firstname        = form.firstname;
    let node_lastname         = form.lastname;
    let node_email            = form.email;
    let node_password         = form.password;
    let node_confirm_password = form.confirm_password;
    let node_birthday_day     = form['birthday[day]'];
    let node_birthday_month   = form['birthday[month]'];
    let node_birthday_year    = form['birthday[year]'];
    let node_agreeTerms       = form.agreeTerms;

    // #endregion input-node


    // #region input-value

    // Retrieve form data
    // --

    let firstname             = node_firstname.value;
    let lastname              = node_lastname.value;
    let email                 = node_email.value;
    let password              = node_password.value;
    let confirm_password      = node_confirm_password.value;
    let birthday_day          = node_birthday_day.value;
    let birthday_month        = node_birthday_month.value;
    let birthday_year         = node_birthday_year.value;
    let agreeTerms            = node_agreeTerms.checked;

    // #endregion input-node



    // Validate form data + Add error message
    // --


    // #region validate-firstname

    // Check Firstname
    // Obligatoire + Doit être une chaine de caractères (min, maj, -)
    if ( firstname.length <= 0 )
    {
        setErrorMessage(node_firstname, "Firstname is required");
        hasError = true;
    }
    else if ( !firstname.match(/^[a-z](([a-z-]+)?[a-z])?$/i) )
    {
        // Injection d'un message d'erreur sous le input#firstname
        setErrorMessage(node_firstname, "Firstname is not valid");
        hasError = true;
    }

    // #endregion validate-firstname


    // #region validate-lastname

    // Check Lastname
    // Obligatoire + Doit être une chaine de caractères (min, maj, -)
    if ( lastname.length <= 0 )
    {
        setErrorMessage(node_lastname, "Lastname is required");
        hasError = true;
    }
    else if ( !lastname.match(/^[a-z](([a-z-]+)?[a-z])?$/i) )
    {
        // Injection d'un message d'erreur sous le input#firstname
        setErrorMessage(node_lastname, "lastname is not valid");
        hasError = true;
    }

    // #endregion validate-lastname


    // #region validate-email

    // Check Email
    // Obligatoire + Doit correspondre à la syntaxe chaine@chaine.chaine (min, maj, nombre, - .)
    if ( email.length <= 0 )
    {
        setErrorMessage(node_email, "Email is required");
        hasError = true;
    }
    else if ( !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/i) )
    {
        setErrorMessage(node_email, "Email is not valid");
        hasError = true;
    }

    // #endregion validate-email


    // #region validate-password

    // Check Password
    // Obligatoire
    if ( password.length <= 0 )
    {
        setErrorMessage(node_password, "Password is required");
        hasError = true;
    }
    // else if ( !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/) )
    // {
    //     setErrorMessage(node_password, "Password is not valid");
    //     hasError = true;
    // }
    // au moins une minuscule,
    else if (!password.match(/(?=.*[a-z])/))
    {
        setErrorMessage(node_password, "Password must contain a lowercase");
        hasError = true;
    }
    // au moins une majuscule, 
    else if (!password.match(/(?=.*[A-Z])/))
    {
        setErrorMessage(node_password, "Password must contain a uppercase");
        hasError = true;
    }
    // au moins un nombre,
    else if (!password.match(/(?=.*[0-9])/))
    {
        setErrorMessage(node_password, "Password must contain a number");
        hasError = true;
    }
    // au moins un caractère spéciale (+=!?&-_%$€£@*|),
    else if (!password.match(/(?=.*[!@#\$%\^&\*])/))
    {
        setErrorMessage(node_password, "Password must contain a special char");
        hasError = true;
    }
    // Doit avoir min. 6 caractères
    else if ( password.length < 8 || password.length > 16 )
    {
        setErrorMessage(node_password, "Password must have min. 8 chars and max 16 chars");
        hasError = true;
    }

    // #endregion validate-password


    // #region validate-cpassword
    // Check Confirm Password
    // Doit être identique au "password"
    if (confirm_password != password)
    {
        setErrorMessage(node_confirm_password, "Confirmation password must be the same as Password");
        hasError = true;
    }
    // #endregion validate-cpassword


    // #region validate-birthday

    // Check Birthday
    let birthdayParent = getParentNode(node_birthday_day, 2);

    // Obligatoire
    if ( birthday_day == 0 || birthday_month == 0 || birthday_year == 0 )
    {
        setErrorMessage(birthdayParent, "Birthday is required");
        hasError = true;
    }
    // Date valide... dans le passé
    else if (!isValidDate(birthday_day, birthday_month, birthday_year))
    {
        setErrorMessage(birthdayParent, "Birthday is not valid");
        hasError = true;
    }
    // Age > 13 ans
    else {
        const today = new Date();

        const birthday_str = `${birthday_year}-${birthday_month}-${birthday_day}`;
        const birthday = new Date(birthday_str);

        let y = today.getFullYear() - birthday.getFullYear();
        let m = today.getMonth() - birthday.getMonth();
        // let d = today.getDate() - birthday.getDate();
      
        if ( m < 0 || (m === 0 && today.getDate() < birthday.getDate()) ) {
            y--;
        }

        if ( y < 13)
        {
            setErrorMessage(birthdayParent, "You are to young baby !!");
            hasError = true;
        }
    }

    // #endregion validate-birthday


    // #region validate-agreetrems

    // Check Terms
    // Obligatoire
    if (!agreeTerms)
    {
        let parent = getParentNode(node_agreeTerms, 1);

        setErrorMessage(parent, "You must accept the terms of use");
        hasError = true;
    }
    
    // #endregion validate-agreetrems


    // #region sending-form

    if (hasError)
    {
        event.preventDefault();
    }
    else 
    {
        console.log( "SOUMISSION DU FORM" );
    }

    // #endregion sending-form

})