import React from 'react';
import {  NamedAPIResource, Pokemon, PokemonAbility } from 'pokenode-ts';
import Box from '@mui/material/Box';
import { Card, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface PokemonDetailsProps{
    pokemon?: Pokemon
}

export default function PokemonDetails({pokemon}: PokemonDetailsProps) {
    let navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

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
        <Card
            sx={
            {
                display:'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: 'auto',
                width: matches ? '80%' : '100%',
                marginTop: matches ? '20px' : 0
            }}>

       
            <Grid container maxWidth="lg" spacing={2} sx={
                {
                }}>
                    <Grid 
                        item   
                        sx={{ paddingRight: matches ? '16px' : 0 }}
                        xs={12}
                        lg={6}
                    >
                    <Box
                        sx={{ 
                            width: '100%',
                            height: matches ? 600 : 300,
                            backgroundColor: '#ff8080',
                            backgroundImage: `url(${pokemon.sprites.other?.['official-artwork'].front_default})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            objectFit: 'contain'
                        }}
                    ></Box>
                    </Grid>
                    <Grid 
                    item 
                    sx={{width: matches ? 300 : '100%', 
                        margin: '5px'}}
                   
                    >
                        <button className='goBackButton'
                            onClick={() => navigate(-1)}
                        >
                        <Box sx={{
                             display:'flex', 
                             alignItems: 'center', 
                             justifyContent: 'center'
                        }}>
                            <ArrowBackIosIcon sx={{width:'12px'}}/>
                            <Typography>Go to all pokemons</Typography>
                        </Box>
                        </button>
                         <Divider />
                            <Box sx={
                                {
                                    marginTop: '10px',
                                }}>
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
                        </Grid>
                </Grid>
            </Card>
    )
}