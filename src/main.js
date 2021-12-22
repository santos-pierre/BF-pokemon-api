/**
 * @param {{name:string,height:number,weight:number,types: any[], sprites: string}} pokemon
 */
const addPokemonToDOM = async (pokemon) => {
    const pokemonList = document.querySelector('#pokemon-list');
    try {
        // Get template
        const response = await fetch('./templates/pokemon-card.html');
        let htmlContent = await response.text();
        // Replace with content
        htmlContent = htmlContent.replaceAll('__POKEMON_NAME__', pokemon.name);
        htmlContent = htmlContent.replaceAll('__POKEMON_IMAGE__', pokemon.sprites);
        // Create HTML node with the new content
        let parser = new DOMParser();
        let htmlElement = parser.parseFromString(htmlContent, 'text/html');
        // Retrieve the node element to add it to the parents list (pokemon-list)
        let newPokemonElement = htmlElement.querySelector(`#${pokemon.name}`);
        pokemonList.appendChild(newPokemonElement);
    } catch (error) {
        console.error(error);
    }
};

/**
 * @param {string} pokemonName
 * @returns {{name:string,height:number,weight:number,types: any[], sprites: string}}
 */
const getPokemon = async (pokemonName) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        let data = await response.json();
        return {
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types,
            sprites: data.sprites.front_default,
        };
    } catch (error) {
        return {
            name: pokemonName,
            height: 0,
            weight: 0,
            types: [],
            sprites: './assets/img/empty-pokemon.png',
        };
    }
};

const main = async () => {
    // const pokemon = await getPokemon('pikachu');
    // console.log(pokemon);
    addPokemonToDOM({
        name: 'Pikachu',
        height: 0,
        weight: 0,
        types: [],
        sprites: './assets/img/empty-pokemon.png',
    });
};

main();
