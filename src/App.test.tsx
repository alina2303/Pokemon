import React from 'react';
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import PokemonTable from './components/PokemonTable';
import { MemoryRouter } from 'react-router';
import { MySubClassedDexie } from './components/context/db';

jest.setTimeout(999999999)
test('renders learn react link', async () => {

  const pokemons: PokemonSimple[] = [{
    id: 1,
    name: 'abra',
    image: 'url',
    height: 5,
    weight: 5,
    abilities: ['magic']
  }]

  const mockDb = {
    count: jest.fn().mockResolvedValue(200),
    orderBy: jest.fn().mockImplementation(() => mockDb),
    offset: jest.fn().mockImplementation(() => mockDb),
    limit: jest.fn().mockImplementation(() => mockDb),
    toArray: jest.fn().mockImplementation(() => pokemons)
  } as any;

  const db = {
    pokemons: mockDb
  } as unknown as MySubClassedDexie;

  const { getByText, getAllByText } =  render(
    <MemoryRouter initialEntries={['/?sort=name&search=']}>
      <PokemonTable db={db} />
    </MemoryRouter>);

  await waitForElementToBeRemoved(getByText('Loading...'), {timeout: 2000}).catch(err =>
    console.log(err),
  )

  await waitFor(() => expect(db.pokemons.toArray).toHaveBeenCalledTimes(1))

  const names = getAllByText(/abra/i);

  for (const name of names) {
    expect(name).toBeInTheDocument();
  }
});
