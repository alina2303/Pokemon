import React from 'react';
import './App.css';
import PokemonMain from './components/PokemonMain';
import Context from './components/context/Context';

function App() {
  return (
    <Context>
      <PokemonMain />
    </Context>
  );
}

export default App;
