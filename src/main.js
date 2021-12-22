// let getTemplate = async () => {
//     try {
//         const response = await fetch('./templates/pokemon-card.html');
//         let htmlContent = await response.text();
//         htmlContent = htmlContent.replace('__POKEMON_NAME__', 'Pikachu');
//         let parser = new DOMParser();
//         let htmlElement = parser.parseFromString(htmlContent, 'text/html');
//         console.log(htmlElement.firstChild);
//     } catch (error) {
//         console.error(error);
//     }
// };

// getTemplate();

/**
 * @param {string} pokemonName
 * @returns {{name:string,height:number,weight:number,types: any[]}}
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
    const pokemon = await getPokemon('pikachu');
    console.log(pokemon);
};

main();
