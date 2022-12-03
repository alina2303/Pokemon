import Dexie, { Table } from 'dexie';

export class MySubClassedDexie extends Dexie {
  pokemons!: Table<PokemonSimple>; 
  abilities!: Table<PokemonAbilities>;
  abilitiesPokemons!: Table<PokemonAbilitiesPokemon>;

  constructor() {
    super('pokemonDatabase');
    this.version(1).stores({
      pokemons: '++id, name, height, weight, image', // Primary key and indexed props
      abilities: '++id, name',
      abilitiesPokemons: '++id, pokemonId, abilityId'
    });
  }
}

export const db = new MySubClassedDexie();