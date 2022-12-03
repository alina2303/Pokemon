import React from 'react';
import { NamedAPIResource, Pokemon, PokemonAbility } from 'pokenode-ts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface PokemonDetailsProps{
    pokemon?: Pokemon
}

export default function PokemonDetails({pokemon}: PokemonDetailsProps) {
    let navigate = useNavigate();

    const renderListOfAbilities = (abilities: PokemonAbility[]) => {
        return abilities.map((x, index) => (
            <ul
            key={index}>
                <li> Is hidden: {x.is_hidden.toString()}</li>
                <li> Slot: {x.slot}</li>
                <li> Name: {x.ability.name}</li>
            </ul> 
            ))
    }

    const renderListOfForms = (forms: NamedAPIResource[]) => {
        return forms.map((x, index) => (
            <ul
            key={index}>
                <li> name: {x.name}</li>
            </ul> 
            ))
    }

    if (!pokemon) {
        return <p>No pokemon</p>
    }

    return (
            <Grid container maxWidth="lg" spacing={2} sx={
                {
                    display:'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: 'auto'
                }}>
                
                <Grid 
                    item   
                    sx={{ paddingRight: '16px' }}
                    xs={12}
                    sm={6}
                    lg={6}
                    >
                    <Box
                        sx={{ 
                            width: '100%',
                            height: 400,
                            backgroundColor: '#ff8080',
                            backgroundImage: `url(${pokemon.sprites.other?.['official-artwork'].front_default})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                        }}
                    >
                    </Box>
                    <Box>
                        <Typography variant="body1" color="text.secondary">
                            {pokemon.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Name: {pokemon.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Base experience: {pokemon.base_experience}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Height: {pokemon.height}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Is default: {pokemon.is_default.toString()}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Order: {pokemon.order}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Weight: {pokemon.weight}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Abilities:
                        </Typography>
                        {renderListOfAbilities(pokemon.abilities)}
                        <Typography variant="body1" color="text.secondary">
                            Forms:
                        </Typography>
                        {renderListOfForms(pokemon.forms)}

                    </Box>
                    <Button 
                    variant="contained"
                    onClick={() => navigate(-1)}
                    >
                        Go back
                    </Button>
                </Grid>
            </Grid>
    )
}