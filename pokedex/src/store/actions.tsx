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

export const getLegendariesPokemonsList =
  (page: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: 'GET_L_POKEMON_LOADING' });

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=9`,
      );

      const datas = response.data.results.map(el =>
        fetch(el.url).then(res => res.json()),
      );

      const pokemons = await Promise.all(datas);

      dispatch({ type: 'GET_L_POKEMON_SUCCESS', payload: pokemons });
    } catch (error) {
      dispatch({ type: 'GET_L_POKEMON_ERROR' });
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

export const getPokemonByType =
  (type: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: 'GET_POKEMON_BY_TYPE_LOADING' });

      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${type}`,
      );

      const datas = response.data.pokemon.map(el =>
        fetch(el.pokemon.url).then(res => res.json()),
      );

      const pokemons = await Promise.all(datas);

      dispatch({
        type: 'GET_POKEMON_BY_TYPE_SUCCESS',
        payload: { type, pokemons },
      });
    } catch (error) {
      dispatch({ type: 'GET_POKEMON_BY_TYPE_ERROR' });
    }
  };

export const getTypes = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_TYPES_LOADING' });

    const response = await axios.get('https://pokeapi.co/api/v2/type');

    dispatch({
      type: 'GET_TYPES_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'GET_TYPES_ERROR' });
  }
};

export const setPokemon = (pokemon: PokemonTypes) => (dispatch: Dispatch) => {
  dispatch({ type: 'SET_POKEMON', payload: pokemon });
};

export const clearComparedPokemons = () => (dispatch: Dispatch) => {
  dispatch({ type: 'CLEAR_COMPARED_POKEMONS' });
};

export const setSelectedValues = (type: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'SET_SELECTED_TYPES', payload: type });
};

export const setExperience =
  (from: number, to: number) => (dispatch: Dispatch) => {
    dispatch({ type: 'SET_EXPERIENCE', payload: { from, to } });
  };

export const setAttack = (from: number, to: number) => (dispatch: Dispatch) => {
  dispatch({ type: 'SET_ATTACK', payload: { from, to } });
};

export const Refresh = () => (dispatch: Dispatch) => {
  dispatch({ type: 'REFRESH' });
};
