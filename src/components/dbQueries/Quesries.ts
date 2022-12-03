import { MySubClassedDexie } from '../context/db';

export async function getPokemons(db: MySubClassedDexie,offset: number, take: number, sort: string = 'name') {
    const pokemons = await db.pokemons.orderBy(sort).offset(offset).limit(take).toArray();
    return pokemons;
}