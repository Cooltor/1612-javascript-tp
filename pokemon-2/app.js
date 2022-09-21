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
const per_page = 20;
const pagination_buttons = 5;


// DOM NODES
// --

const node_pokemons = document.getElementById("pokemons");
const node_pokemon = document.getElementById("pokemon");
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


function paginator(totalItems, itemPerPage, currentPage)
{
    const pages = Math.ceil(totalItems / itemPerPage);
    const btn_offset = Math.floor(pagination_buttons / 2);

    let btn_min = currentPage - btn_offset;
    let btn_max = currentPage + btn_offset

    if (btn_min <= 0)
    {
        btn_min = 0;
        btn_max = pagination_buttons;
    }

    if (btn_max >= pages)
    {
        btn_min = pages-(pagination_buttons-1);
        btn_max = pages;
    }

    // Reset btn view
    node_pagination.innerText = '';


    // Btn First Page
    const btn_first = document.createElement('BUTTON');
        btn_first.classList.add('btn','btn-secondary');
        btn_first.innerHTML = '&lt;&lt;&lt;';
        btn_first.onclick = () => {
            showPokemons(1);
        }
        if (currentPage <= 1)
        {
            btn_first.setAttribute('disabled', "disabled");
        }
    node_pagination.append(btn_first);


    // Page PREV
    const btn_prev = document.createElement('BUTTON');
        btn_prev.classList.add('btn','btn-secondary');
        btn_prev.innerHTML = '&lt;';
        btn_prev.onclick = () => {
            showPokemons(--currentPage);
        }
        if (currentPage <= 1)
        {
            btn_prev.setAttribute('disabled', "disabled");
        }
    node_pagination.append(btn_prev);


    for (let i=1; i<=pages; i++)
    {
        if (i>=btn_min && i<=btn_max)
        {
            const node = document.createElement('BUTTON');
                node.classList.add('btn','btn-primary');
                node.innerText = i;
                node.onclick = () => {
                    showPokemons(i);
                }

                if (i == currentPage)
                {
                    node.setAttribute('disabled', "disabled");
                    node.classList.add('current');
                }
    
            node_pagination.append(node);
        }
    }


    // Page NEXT
    const btn_next = document.createElement('BUTTON');
        btn_next.classList.add('btn','btn-secondary');
        btn_next.innerHTML = '&gt;'
        btn_next.onclick = () => {
            showPokemons(++currentPage);
        }
        if (currentPage >= pages)
        {
            btn_next.setAttribute('disabled', "disabled");
        }
    node_pagination.append(btn_next);

    // Btn Last page
    const btn_last = document.createElement('BUTTON');
        btn_last.classList.add('btn','btn-secondary');
        btn_last.innerHTML = '&gt;&gt;&gt;'
        btn_last.onclick = () => {
            showPokemons(pages);
        }
        if (currentPage >= pages)
        {
            btn_last.setAttribute('disabled', "disabled");
        }
    node_pagination.append(btn_last);


    node_current_page.innerText = currentPage;
    node_count_page.innerText = pages;
}

/**
 * Show pokemons in <#pokemons>
 */
async function showPokemons(page)
{
    page = isNaN(page) ? 1 : page;
    // console.log(page);

    const response = await getPokemons(page);
    const pokemons = response.results;
    const total = response.count;


    // Loop on Pokemons list
    // --

    // Reset pokemons view
    node_pokemons.innerText = '';

    for (const pokemon of pokemons)
    {
        let node = document.createElement('DIV');
            node.innerText = pokemon.name;
            node.dataset.url = pokemon.url;
            node.setAttribute('role', "button");
            node.onclick = () => {
                let id = getIdFromUrl( node.dataset.url );
                showPokemon(id);
            };

        node_pokemons.append(node);
    }


    // Set total items value
    // --

    node_count.innerText = total;


    // Refresh pagination
    // --

    paginator(total, per_page, page);
}

async function showPokemon(id)
{
    const response = await getPokemonById(id);

    const name = response.name;
    const weight = response.weight;
    const types = response.types;
    const illustration = response.sprites.other.home.front_default;

    // Reset <#pokemon>
    node_pokemon.innerText = '';
    // node_pokemon.querySelector('.card')?.remove();

    // Create Card <img>
    const node_img = document.createElement('IMG');
        node_img.classList.add('card-img-top');
        node_img.setAttribute('src', illustration);
        node_img.setAttribute('alt', name);

    
    // Create Card title
    const node_title = document.createElement('H5');
        node_title.innerText = name;

    // Create node ID
    const node_div_id = document.createElement('DIV');
        node_div_id.innerText = `Pokemon ID : ${id}`;

    // Create node Types
    const node_div_types = document.createElement('DIV');

    let arr_types = [];
    for (let type of types) {arr_types.push(type.type.name);}
    let str_types = arr_types.join(", ");

    node_div_types.innerText = `Types : ${str_types}`;


    // Create node Weight
    const node_div_weight = document.createElement('DIV');
        node_div_weight.innerText = `Pokemon Weight : ${weight}hgr`;

    
    // Create <.card-body>
    const node_card_body = document.createElement('DIV');
        node_card_body.classList.add('card-body');
        node_card_body.append(node_title);
        node_card_body.append(node_div_id);
        node_card_body.append(node_div_types);
        node_card_body.append(node_div_weight);

    // Create the final <.card>
    const node_card = document.createElement('DIV');
        node_card.classList.add("card");
        node_card.append(node_img);
        node_card.append(node_card_body);

    node_pokemon.append(node_card);

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
    const limit = per_page;
    const offset = (page-1) * limit;

    // Request Settings
    const url = `${api_base}${endpoint_pokemon}?offset=${offset}&limit=${limit}`;
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