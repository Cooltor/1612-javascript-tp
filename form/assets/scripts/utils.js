"use strict";

/**
 * Switch the first letter of string to Upper case
 * 
 * @param string string 
 * 
 * @returns string
 */
function upperCaseFirst( string )
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}



/**
 * Get the parent of a node element with DOM 
 * 
 * @param Object node the first child node
 * @param Number level - Number of parent
 * @returns Object
 */
function getParentNode(node, level)
{
    for (let i = 0; i<level; i++)
    {
        node = node.parentNode;
    }

    return node;
}


/**
 * Set an error message to the DOM
 * @param Object input node
 * @param string message - error message
 */
function setErrorMessage(input, message)
{
    let errNode = document.createElement('DIV');
        errNode.classList.add('invalid-feedback');
        errNode.innerHTML = message;

    input.parentNode.append(errNode);
}


/**
 * Get the number of days in any particular month
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {integer} m The month (valid: 0-11)
 * @param  {integer} y The year
 * @return {integer}   The number of days in the month
 */
 var daysInMonth = function (m, y) {
    switch (m) {
        case 1 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8 : case 3 : case 5 : case 10 :
            return 30;
        default :
            return 31
    }
};

/**
 * Check if a date is valid
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {[type]}  d The day
 * @param  {[type]}  m The month
 * @param  {[type]}  y The year
 * @return {Boolean}   Returns true if valid
 */
var isValidDate = function (d, m, y) {
    m = parseInt(m, 10) - 1;
    return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
};