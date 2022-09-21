"use strict";

// API BASIS
// --

// Basis API URL
const api_base = "https://pokeapi.co/api/v2/";

// Pokemon list endpoint
const endpoint_pokemon = "pokemon/";

// Pokemon types endpoint
const endpoint_type = "type/";


// PAGINATION SETTINGS
// --



// DOM NODES
// --

const node_list = document.getElementById("pokemons");
const node_count = document.getElementById("count");
const node_pagination = document.getElementById("pagination");
const node_current_page = document.getElementById('current_page');
const node_count_page = document.getElementById('count_page');




// APP START
// --

// window.onload = () => showPokemons();
// window.onload = function() { showPokemons(); };
window.addEventListener('load', showPokemons);


// POKEMONS FUNCTIONS
// --

/**
 * Show pokemons in <#pokemons>
 */
async function showPokemons()
{
    const response = await getPokemons();
    const pokemons = response.results;
    const total = response.count;


    // Loop on Pokemons list
    // --

    for (const pokemon of pokemons)
    {
        let node = document.createElement('DIV');
            node.innerText = pokemon.name;
            node.dataset.url = pokemon.url;
            node.setAttribute('role', "button");
            node.onclick = async (event) => {
                let id = getIdFromUrl( node.dataset.url );
                showPokemon(id);
            };

        node_list.append(node);
    }


    // Set total items value
    // --

    node_count.innerText = total;
}


async function showPokemon(id)
{
    const response = await getPokemonById(id);
    console.log( response );
}


/**
 * Get pokemons list
 * 
 * @param {number} page
 * @return the paginated pokemons list
 */
async function getPokemons(page=1)
{
    // Pagination settings

    // Request Settings
    const url = `${api_base}${endpoint_pokemon}`;
    const response = await httpGet(url);
    
    return response;
}

async function getPokemonById(id)
{
    const url = `${api_base}${endpoint_pokemon}${id}/`;
    const response = await getPokemonByUrl(url);
    return response;
}

async function getPokemonByUrl(url)
{
    const response = await httpGet(url);
    return response;
}


// UTILS FUNCTIONS
// --

/**
 * Make an HTTP Request with GET method
 * 
 * @param {string} url of the request
 * @returns a json response
 */
async function httpGet(url)
{
    const fetch_response = await fetch(url);
    const json_response = await fetch_response.json();
    return json_response;
}

/**
 * Retrieve an ID from an URL
 * 
 * @param {string} url 
 * @returns {number} 
 */
function getIdFromUrl(url)
{
    let arr = url.split("/");
        arr.pop();
    
    let last = arr.length - 1;
    let id = arr[last];
        id = parseInt(id);

    return id;
}