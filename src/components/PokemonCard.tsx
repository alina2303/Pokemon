import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActions } from '@mui/material';

interface IPokemonCardProps{
    pokemon: PokemonSimple
}

export default function PokemonCard(props: IPokemonCardProps) {

    return (
        <Card sx={{minHeight: '100%'}}>
            <CardMedia
                component="img"
                height="200"
                image={props.pokemon.image}
                alt={props.pokemon.name}
                style={{backgroundColor: '#ff8080', objectFit: 'contain'}}
            /> 
            <CardContent sx={{height: '100%'}}>
            <Typography variant="body1" color="text.secondary">
                Name: {props.pokemon?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Height: {props.pokemon?.height}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Weight: {props.pokemon?.weight}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Abilities: 
                <span style={{
                    marginLeft: 5,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                    }}>
                    {props.pokemon?.abilities.join(' ')}
                </span>
            </Typography>
            </CardContent >
            <CardActions>
            <Button
                    variant="outlined"
                    onClick={() => console.log(props.pokemon.name)}
                    fullWidth
                    sx={{marginTop: '1rem'}}
                >
                    See details
                </Button>
            </CardActions>
        </Card>
    )
}