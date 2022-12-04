import React, {useContext, useEffect, useState } from 'react';
import { ApplicationContext } from './context/Context';
import { Pokemon } from 'pokenode-ts';
import { useMatch } from 'react-router';
import PokemonDetails from './PokemonDetails';
import Layout from './layout/Layout';

export default function PokemonDetailsWrapper() {
    const {state} = useContext(ApplicationContext);
    const match = useMatch('/pokemons/details/:name/');
    const pokemonName = match?.params.name ?? '';

    const [pokemon, setPokemon] = useState<Pokemon>();
    
    const fetchData = async () => {
        const poke = await state.client.getPokemonByName(pokemonName);
        setPokemon(poke);
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Layout>
            <PokemonDetails pokemon={pokemon} />
        </Layout>

    )
}