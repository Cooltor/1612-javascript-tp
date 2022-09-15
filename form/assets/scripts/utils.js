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