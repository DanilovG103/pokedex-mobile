import axios from 'axios';
import { Dispatch } from 'redux';

export const getPokemonsList = (page: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_POKES_LOADING' });

    const offset = page * 10;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`,
    );

    dispatch({ type: 'GET_POKES_SUCCESS', payload: response.data });
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
