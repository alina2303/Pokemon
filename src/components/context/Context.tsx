import React, { createContext, PropsWithChildren, useEffect, useState} from 'react';
import {NamedAPIResource, Pokemon, PokemonClient } from 'pokenode-ts';
import { db } from './db';

interface ISharedContext {
    client: PokemonClient
  }

  const defaultState: ISharedContext = 
{ 
  client: new PokemonClient() 
};

export const ApplicationContext = createContext({ state: defaultState });

function splitChunks<T>(array: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunks.push(chunk);
  }

  return chunks;
}

async function getPokemonDetails(chunks: NamedAPIResource[][], state: ISharedContext) {
  let allPokemons: Pokemon[] = [];

      for (const chunk of chunks) {
        const tasks = chunk.map(x => state.client.getPokemonByName(x.name));
        allPokemons = [...allPokemons, ...await Promise.all(tasks)];
      }

      const pokemonsSimple: PokemonSimple[] = allPokemons.map(x => ({
        id: x.id,
        name: x.name,
        height: x.height,
        weight: x.weight,
        abilities: x.abilities.map(x => x.ability.name),
        image: x.sprites.other?.['official-artwork'].front_default ?? ''
      }));

      return {allPokemons, pokemonsSimple};
}

function mapAbilities(allPokemons: Pokemon[]) {
  const abilityMap = new Map<string, number[]>();
    for (const pokemon of allPokemons) {
      for (const ability of pokemon.abilities) {
        const name = ability.ability.name;
        if (abilityMap.has(name)) {
          abilityMap.get(name)!.push(pokemon.id);
          continue;
        }

        abilityMap.set(name, [pokemon.id]);
      }
    }

    return abilityMap;
}

function mapPokemonIdsToAbilityId(abilities: Map<string, number>, abilityPokemonMap: Map<string, number[]>) {
  let pokemonAbilitiesWithPokemonIds: PokemonAbilitiesPokemon[] = [];

      for (const [name, id] of Array.from(abilities)) {

        const pokemonIds = abilityPokemonMap.get(name);

        const pokemonAbilities = pokemonIds?.map(x => ({ abilityId: id, pokemonId: x }));

        if (Array.isArray(pokemonAbilities)) {
          pokemonAbilitiesWithPokemonIds = [...pokemonAbilitiesWithPokemonIds, ...pokemonAbilities];
        }
      }

  return pokemonAbilitiesWithPokemonIds;
}

export const ApplicationProvider = ({ children }: PropsWithChildren) => {
    const [state] = useState(defaultState);

    const loadData = async () => {
      try {
        // Check if the db was initialized and populated with data
        const pokemon = await db.pokemons.limit(1).toArray();
        if (pokemon.length !== 0) {
          return;
        }

        // Get all pokemons, we know there are 1154 of them
        // otherwise we would first call pokemons.count 
        const pokemons = await state.client.listPokemons(0, 1154);

        // Fetch pokemon details in batch requests
        const chunks = splitChunks(pokemons.results, 100);

        // Get data that we use for db and populate pokemons table
        const {allPokemons, pokemonsSimple} = await getPokemonDetails(chunks, state);

        await db.pokemons.bulkAdd(pokemonsSimple);

        // Map abilities
        const abilityMap = mapAbilities(allPokemons);
        const abilityNames = Array.from<string>(abilityMap.keys());
        // Populate abilities
        await db.abilities.bulkAdd(abilityNames.map(x => ({ name: x } as PokemonAbilities)));

        // Map pokemonids to their ability ids 
        const abilities = new Map<string, number>((await db.abilities.toArray()).map(x => [x.name, x.id]));
        const pokemonAbilitiesWithPokemonIds = mapPokemonIdsToAbilityId(abilities, abilityMap); 
        await db.abilitiesPokemons.bulkAdd(pokemonAbilitiesWithPokemonIds);

      } catch (error) {
        console.log(`Failed ${error}`);
      }
    }

    useEffect(() => {
      loadData();
    }, []);
    
    return (
        <ApplicationContext.Provider value={{ state: state }}>
          {children}
        </ApplicationContext.Provider>
      );
}

export default ApplicationProvider;