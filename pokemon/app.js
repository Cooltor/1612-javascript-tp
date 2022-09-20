"use strict";

// API Settings
const api_endpoint = "https://pokeapi.co/api/v2/";
const api_path = "pokemon/";

// Pagination Settings
const per_page = 20;
const pagination_buttons = 7;
let total = 0;

const node_list = document.getElementById("pokemons");
const node_count = document.getElementById("count");
const node_pagination = document.getElementById("pagination");
const node_current_page = document.getElementById('current_page');
const node_count_page = document.getElementById('count_page');
const node_illustration = document.getElementById('illustration');
// ...


async function showPokemons(page=1)
{
    page = !isNaN(parseInt(page)) ? page : 1;

    const response = await getPokemons(page);
    const pokemons = response.results;

    node_list.innerText = '';
    total = response.count;

    for (const pokemon of pokemons)
    {
        let pokemon_node = document.createElement('div');
            pokemon_node.innerText = pokemon.name;
            pokemon_node.dataset.url = pokemon.url;
            pokemon_node.onclick = () => {
                showPokemon( pokemon.url );
            }
        
        node_list.append(pokemon_node);
    }

    node_count.innerText = total;

    paginator(total, page, per_page);
}

async function showPokemon(url)
{
    const pokemon = await getPokemonByURL(url);
    const illustration = pokemon.sprites.other.home.front_default;

    console.log( pokemon );
    console.log( illustration );

    node_illustration.setAttribute('src', illustration);
}

function paginator(totalItems, currentPage, perPage)
{
    const pages = Math.ceil(totalItems / perPage);
    const btn_offset = pagination_buttons / 2;   

    let btn_min = currentPage - btn_offset;
    let btn_max = currentPage + btn_offset;

    if (btn_min <= 0)
    {
        btn_min = 0;
        btn_max = pagination_buttons
    }

    if (btn_max >= pages)
    {
        btn_max = pages;
        btn_min = pages-pagination_buttons;
    }

    node_pagination.innerText = '';


    // Btn PAGE 1
    // ...

    // Btn PREV
    // ...

    for (let i=1; i<=pages; i++)
    {
        if (i > btn_min && i <= btn_max)
        {
            let btn = document.createElement('button');
                btn.innerText = i;
                btn.classList.add('btn')
                btn.classList.add('btn-primary')
    
                btn.onclick = event => {
                    showPokemons(i);
                }
    
            node_pagination.append(btn);
        }
    }

    // Btn NEXT
    // ...

    // Btn PAGE END
    // ...

    node_current_page.innerText = currentPage;
    node_count_page.innerText = pages;
}

/**
 * Get the Pokemons list
 * 
 * @param {number} page 
 * @returns paginated pokemons list
 */
async function getPokemons(page=1)
{
    // pagination
    const limit = per_page;
    const offset = (page-1) * limit;

    // request
    const url = `${api_endpoint}${api_path}?offset=${offset}&limit=${limit}`;
    const response = await httpGet(url);

    return response;
}

async function getPokemon(id)
{
    const url = `${api_endpoint}/${id}`;
    return await getPokemonByURL(url);
}

async function getPokemonByURL(url)
{
    const response = await httpGet(url);
    return response;
}

/**
 * Make the HHTP Request
 * 
 * @param {string} url 
 * @returns request response
 */
async function httpGet(url)
{
    const response = await fetch(url);
    return await response.json();
}


window.addEventListener('load', showPokemons);