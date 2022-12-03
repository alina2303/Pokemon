
import React, {useEffect, useState } from 'react';

import PokemonCard from './PokemonCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MySubClassedDexie } from './context/db';
import { getPokemons } from './dbQueries/Quesries';

interface PokemonTableProps{
    db: MySubClassedDexie
}

export default function PokemonTable({db}: PokemonTableProps) {
    const [pokemons, setPokemons] = useState<PokemonSimple[]>([]);

    const initialLoad = async () => {
        const data = await getPokemons(db, (1 - 1) * 20, 20, 'name');
        setPokemons(data);
    }

    useEffect(() => {
      initialLoad();
  }, []);

    if (pokemons.length === 0){
        return <div>Loading...</div>
    }

    return (
        <Box style={{ margin: 20 }}>
      
            <Grid container maxWidth="xl" spacing={2}>
                {pokemons.map((pokemon, index) =>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        xl={3}
                        key={index}>
                        <PokemonCard
                            pokemon={pokemon}
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}