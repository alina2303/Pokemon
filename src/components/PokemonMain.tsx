import PokemonTable from './PokemonTable';
import React from 'react';
import { db } from './context/db';

export default function PokemonMain() {
    return (
        <PokemonTable 
            db={db}
        />
    )
}