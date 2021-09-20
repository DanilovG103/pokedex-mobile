import axios from 'axios';
import { Dispatch } from 'redux';
import { PokemonTypes } from '../../api/types';

export const getPokemonsList = (page: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_POKES_LOADING' });

    const offset = page * 9;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=9`,
    );

    const datas = response.data.results.map(el =>
      fetch(el.url).then(res => res.json()),
    );

    const pokemons = await Promise.all(datas);

    dispatch({ type: 'GET_POKES_SUCCESS', payload: pokemons });
  } catch (error) {
    dispatch({ type: 'GET_POKES_ERROR' });
  }
};

export const getPokemon = (name: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_POKEMON_LOADING' });

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );

    dispatch({
      type: 'GET_POKEMON_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'GET_POKEMON_ERROR' });
  }
};

export const setPokemon = (pokemon: PokemonTypes) => (dispatch: Dispatch) => {
  dispatch({ type: 'SET_POKEMON', payload: pokemon });
};
