import React from 'react';
import { render } from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { MemoryRouter } from 'react-router';

describe('Pokemon card', () => {

    it('Renders pokemon card correctly', async () => {
        const pokemon: PokemonSimple = {
            id: 1,
            name: 'abra',
            image: 'url',
            height: 5,
            weight: 5,
            abilities: ['magic']
        };
    
        const { getByText } = render(
            <MemoryRouter>
                <PokemonCard pokemon={pokemon} />
            </MemoryRouter>
                );
    
        const name = getByText(/abra/i);
    
        expect(name).toBeInTheDocument();
    });
});
