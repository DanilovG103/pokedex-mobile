import axios from 'axios';

export const getPokemons = (page: number) => async dispatch => {
  try {
    dispatch({ type: 'GET_POKES_LOADING' });

    const offset = page * 9;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=9`,
    );

    dispatch({ type: 'GET_POKES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_POKES_ERROR' });
  }
};
