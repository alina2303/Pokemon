
import React, {  useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchInput from './SearchInput';
import { countResults, getPokemons, searchPokemons } from './dbQueries/Queries';
import SelectOption from './SelectItemsPerPage';
import { itemsPerPageConstant, sortByConstant } from './Constants';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { MySubClassedDexie } from './context/db';
import Layout from './layout/Layout';

interface PokemonTableProps{
    db: MySubClassedDexie
}

export default function PokemonTable({db}: PokemonTableProps) {
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const [readyToLoad, setReadyToLoad] = useState(false);
    
    const [totalPokemonsDb, setTotalPokemonsDb] = useState<number>();
    const [pokemons, setPokemons] = useState<PokemonSimple[]>([]);
    const [total, setTotal] = useState<number>(1154);
    
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const count = Math.ceil(total / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [sortBy, setSortBy] = useState('name');

    const fetchData = async () => {
        const data = await getPokemons(db, (currentPage - 1) * itemsPerPage, itemsPerPage, sortBy);
        setPokemons(data);
        if (totalPokemonsDb) {
            setTotal(totalPokemonsDb);
        }
    }

    const composeSearchParams = (searchQuery: string, sortBy: string) =>
        navigate({
            pathname: '/',
            search: `?sort=${sortBy}&search=${searchQuery}`,
        });

    const searchPokemon = async () => {
        const data = await searchPokemons(db, searchInput, (currentPage - 1) * itemsPerPage, itemsPerPage, sortBy);
        setPokemons(data.pokemons);
        setTotal(data.count);
    }
    const initialLoad = async () => {
        if (!readyToLoad) {
            return;
        }

        composeSearchParams(searchInput, sortBy);
        const loadDataMethod = searchInput === '' ? fetchData : searchPokemon;
        await loadDataMethod();
    }

    useEffect(() => {
        // on the initial load get query params
        setSortBy(searchParams.get('sort') ?? 'name');
        setSearchInput(searchParams.get('search') ?? '');

        // check how many records are in the db for pagination
        countResults(db).then(x => {
            setTotalPokemonsDb(x);
            setTotal(x);
            setReadyToLoad(true);
        })
            .catch(e => {
                console.error(e);
                setTotalPokemonsDb(0);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, itemsPerPage, sortBy, readyToLoad]);

    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage]);

    if (pokemons.length === 0){
        return <div>Loading...</div>
    }

    return (
        <Layout>
            <Box style={{ margin: 20 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 30

                }}>
                    <SearchInput
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                        onKeyPress={initialLoad}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 30,
                    columnGap: 10

                }}>
                    <SelectOption
                        value={itemsPerPage.toString()}
                        onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                        label="Items per page"
                        options={itemsPerPageConstant}
                    />
                    <SelectOption
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            composeSearchParams(searchInput, e.target.value);
                        }}
                        label="SortBy"
                        options={sortByConstant}
                    />
                </div>
                <Pagination
                    count={count}
                    size="large"
                    page={currentPage}
                    shape="rounded"
                    onChange={(e, page) => setCurrentPage(page)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />

                <Grid container maxWidth="xl" sx={{ margin: 'auto' }} spacing={2}>
                    {pokemons.map((pokemon, index) =>
                        <Grid
                            item
                            sx={{ paddingRight: '16px' }}
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
                <Pagination
                    count={count}
                    size="large"
                    page={currentPage}
                    shape="rounded"
                    onChange={(e, page) => setCurrentPage(page)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            </Box>
        </Layout>
    )
}