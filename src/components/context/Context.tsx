import React, { createContext, PropsWithChildren, useState} from 'react';
import {PokemonClient } from 'pokenode-ts';

interface ISharedContext {
    client: PokemonClient
  }

  const defaultState: ISharedContext = 
{ 
  client: new PokemonClient() 
};

export const ApplicationContext = createContext({ state: defaultState });

export const ApplicationProvider = ({ children }: PropsWithChildren) => {
    const [state] = useState(defaultState);
    return (
        <ApplicationContext.Provider value={{ state: state }}>
          {children}
        </ApplicationContext.Provider>
      );
}