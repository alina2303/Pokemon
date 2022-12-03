import React from 'react';
import { render } from '@testing-library/react';
import { Pokemon, PokemonAbility } from 'pokenode-ts';
import { MemoryRouter } from 'react-router';
import PokemonDetails from './PokemonDetails';

describe('Pokemon details', () => {

    it('Renders pokemon details correctly', async () => {
        
        const ability :PokemonAbility = {
            slot: 1,
            is_hidden: false,
            ability: {
                name: 'shock',
                url: 'url'
            }
        };

        const pokemon: Pokemon = {
            id: 1,
            name: 'abra',
            height: 5,
            weight: 5,
            abilities: [ability],
            order: 1,
            base_experience: 1,
            is_default: true,
            forms: [
                {
                    name: 'abra',
                    url: 'url'
                },
                {
                    name: 'kadabra',
                    url: 'url'
                },
                {
                    name: 'alakazam',
                    url: 'url'
                }
            ],
            sprites: {
                other: {
                    'official-artwork' : {
                        front_default : 'artworkUrl'
                    }
                }
            }
        } as Pokemon;
    
        const { getAllByText } = render(
            <MemoryRouter initialEntries={['/pokemons/details/abra']}>
                <PokemonDetails pokemon={pokemon} />
            </MemoryRouter>);
    

        const names = getAllByText(/abra/i);
    
        for (const name of names) {
            expect(name).toBeInTheDocument();
        }
    });
});
