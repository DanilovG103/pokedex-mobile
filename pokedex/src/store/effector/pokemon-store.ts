import { createStore, createEffect, createEvent } from 'effector';
import { useStore } from 'effector-react';
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

export const getLegendariesPokemons = createEffect<number, PokemonTypes[]>(
  async page => {
    const response = await api.get(`/pokemon/?offset=${page}&limit=9`);

    const datas = response.data.results.map(el =>
      fetch(el.url).then(res => res.json()),
    );

    const pokemons = await Promise.all(datas);

    return pokemons;
  },
);

export const getPokemons = createEffect<number, PokemonTypes[]>(async page => {
  const offset = page * 9;
  const response = await api.get(`/pokemon/?offset=${offset}&limit=9`);

  const datas = response.data.results.map(el =>
    fetch(el.url).then(res => res.json()),
  );

  const pokemons = await Promise.all(datas);

  return pokemons;
});

const setPokemonHandler = (state: PokemonTypes[], payload: PokemonTypes) => {
  return [...state, payload];
};

export const setPokemon = createEvent<PokemonTypes>();

export const clearPokemons = createEvent();

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
  .on(setPokemon, (state, payload) => ({
    ...state,
    comparedPokemons: setPokemonHandler(state.comparedPokemons, payload),
  }))
  .on(clearPokemons, state => ({
    ...state,
    comparedPokemons: [],
  }));

export const usePokemonStore = () => useStore(pokemonStore);
