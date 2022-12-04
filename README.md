# Pokemons portal

This project is a POC of the portal where users are able to search for pokemons. It is completed in respect with given time.

Technology stack: React, TypeScript, Dexie.js - Indexed DB, Material UI, Jest for testing.

Requirements to be able to run the application locally: latest version of Node.js, Chrome, IDE (for example Visual Studio Code)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Check if database was created
Having installed the dependencies, initial load will create an indexed database in the browser. To check if the database has been created correctly, open DevTools -> Application -> Storage -> IndexedDB -> pokemonDatabase

## Database
The database should contain following tables: pokemons, abilities, abilitiesPokemons. This approach has been taken in order to optimize search queries, as given API contains 2 separate endpoints to search for pokemons by name and to search for abilities. This database contains only properties used to display information on cards. The schemas for the tables are defined in the db.ts file. 

Pros of using Indexed DB: 
  1. Reduced calls to API
  2. Possible to sort
  3. Faster search
  4. Easy to use
 
 Cons of using Indexed DB:
 Mapping data from API to database designed schemas
 
## Context
Context.tsx contains methods to fetch data from the API and populate tables of the indexed database

## Components
The UI part of the project is using Material UI components. They have modern, airy design and allow to speed development process up.

## TableComponent
Has following components: search filed, sorting option (items per page and sort by), pagination on the top and bottom of the page and the grid with the pokemon cards.
Clicking on the “See details” button will redirect to the PokemonDetails component

## Details component
Contains a pokemon image and detailed information about selected pokemon.
The initial idea to display all the details was to use a recursive function. But as more different types and properties had to be taken into consideration, the method was getting more complex, thus harder to read and maintain. That is why I opted to simply display properties from the DTO in the render function.

Note: Due to lack of time, displaying some of the properties was not implemented and can be potentially done in V2 of the project.

## Styles
The project is using inline styling. My preferable method is using “styled components” but it requires more time.
Responsiveness of the application is handled using Maretial UI grid.

