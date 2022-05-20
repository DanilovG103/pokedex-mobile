import { createStore, createEffect, createEvent } from 'effector';
import { useStore, useEvent } from 'effector-react';
import axios from 'axios';
import { PokemonTypes } from '../../../api/types';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});
interface State {
  loading: boolean;
  pokemons: PokemonTypes[];
  legendariesPokemons: PokemonTypes[];
  comparedPokemons: PokemonTypes[];
  filteredByTypePokemons: PokemonTypes[];
}

const initialState: State = {
  loading: false,
  pokemons: [],
  legendariesPokemons: [],
  comparedPokemons: [],
  filteredByTypePokemons: [],
};

const getLegendariesPokemons = createEffect<number, PokemonTypes[]>(
  async page => {
    const response = await api.get(`/pokemon/?offset=${page}&limit=9`);

    const datas = response.data.results.map(el =>
      fetch(el.url).then(res => res.json()),
    );

    const pokemons = await Promise.all(datas);

    return pokemons;
  },
);

const getPokemons = createEffect<number, PokemonTypes[]>(async page => {
  const offset = page * 9;
  const response = await api.get(`/pokemon/?offset=${offset}&limit=9`);

  const datas = response.data.results.map(el =>
    fetch(el.url).then(res => res.json()),
  );

  const pokemons = await Promise.all(datas);

  return pokemons;
});

const setPokemon = (state: PokemonTypes[], payload: PokemonTypes) => {
  return [...state, payload];
};

const setPokemonEvent = createEvent<PokemonTypes>();

const clearPokemonsEvent = createEvent();

const pokemonStore = createStore(initialState)
  .on(getPokemons.pending, (state, loading) => ({ ...state, loading }))
  .on(getPokemons.failData, (_, err) => console.log(err))
  .on(getPokemons.doneData, (state, pokemons) => ({
    ...state,
    pokemons: state.pokemons.concat(pokemons),
  }))
  .on(getLegendariesPokemons.pending, (state, loading) => ({
    ...state,
    loading,
  }))
  .on(getLegendariesPokemons.failData, (_, err) => console.log(err))
  .on(getLegendariesPokemons.doneData, (state, pokemons) => ({
    ...state,
    legendariesPokemons: state.legendariesPokemons.concat(pokemons),
  }))
  .on(setPokemonEvent, (state, payload) => ({
    ...state,
    comparedPokemons: setPokemon(state.comparedPokemons, payload),
  }))
  .on(clearPokemonsEvent, state => ({
    ...state,
    comparedPokemons: [],
  }));

export const usePokemonStore = () => useStore(pokemonStore);
export const useGetPokemonsEvent = () => useEvent(getPokemons);
export const useGetLPokesEvent = () => useEvent(getLegendariesPokemons);
export const useSetPokemon = () => useEvent(setPokemonEvent);
export const useClearPokemons = () => useEvent(clearPokemonsEvent);

clearPokemonsEvent.watch(_ => console.log('Triggered'));
