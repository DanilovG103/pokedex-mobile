import { Store } from '../types';

export const selectPokemons = (store: Store) => store.PokemonReducer;
