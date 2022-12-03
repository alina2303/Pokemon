import { MySubClassedDexie } from '../context/db';

export async function getPokemons(db: MySubClassedDexie, offset: number, take: number, sort: string = 'name') {
    const pokemons = await db.pokemons.orderBy(sort).offset(offset).limit(take).toArray();
    return pokemons;
}

export async function countResults(db: MySubClassedDexie) {
    return await db.pokemons.count();
}

export async function searchPokemons(db: MySubClassedDexie, searchQuery: string, offset: number, take: number, sortBy: string) {
    // One input field is used for search without indication
    // If it is a pokemon name or ability 
    
    //check if string is an ability
    const abilitiesPromise = db.abilities.where({name: searchQuery }).toArray();
    // check if search string is pokemon name
    const pokemonsPromise = db.pokemons.where({name: searchQuery}).toArray();

    let [abilities, pokemons] =  await Promise.all([abilitiesPromise, pokemonsPromise]);

    if (abilities.length !== 0) {
        pokemons = await fetchPokemonsByAbilities(db, abilities, sortBy);
    }

    return {count: pokemons.length, pokemons: takeX(pokemons, offset, take)};
}

async function fetchPokemonsByAbilities(db: MySubClassedDexie, abilities: PokemonAbilities[], sortBy: string) {
    const abilitiesSet = new Set(abilities.map(x => x.id));
    const response = await db.abilitiesPokemons.filter(x => abilitiesSet.has(x.abilityId)).toArray();

    const abilitiesPokemonsSet = new Set(response.map(x => x.pokemonId));
    const pokemonsWithAbilities = await db.pokemons.filter(x => abilitiesPokemonsSet.has(x.id)).toArray();

    const pokemons = sortArray(pokemonsWithAbilities, sortBy);

    return pokemons;
}

export function getPokemonByName(db:MySubClassedDexie ,pokeName: string) {
    const result = db.pokemons.where({name: pokeName});
    return result;
}

function takeX<T>(input: T[], offset: number, amount: number) {
    
    if (offset > input.length){
        return input.slice(0, amount);
    }

    const result = input.slice(offset, offset + amount);
    return result;
}

function sortArray(pokemons: PokemonSimple[], sortBy: string)  {

    switch (sortBy) {
        case 'name':
            pokemons = pokemons.sort((a,b) => a.name.localeCompare(b.name));
          break;
        case 'height':
            pokemons = pokemons.sort((a,b) => a.height - b.height);
            break;
        case 'weight':
            pokemons = pokemons.sort((a,b) => a.weight - b.weight);
          break;
        default:
          console.log(`Sorry, no ${sortBy}.`);
      }

      return pokemons;
}