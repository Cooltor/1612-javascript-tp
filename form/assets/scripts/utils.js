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
