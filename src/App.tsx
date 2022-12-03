import React from 'react';
import './App.css';
import Context from './components/context/Context';
import PokemonTable from './components/PokemonTable';
import { BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import { db } from './components/context/db';

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<PokemonTable db={db} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
