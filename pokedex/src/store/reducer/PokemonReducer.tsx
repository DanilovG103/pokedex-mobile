import { TYPE } from '../types';

const initialState = {
  loading: false,
  pokemons: [],
  legendariesPokemons: [],
  errorMessage: '',
  comparedPokemons: [],
  filteredByTypePokemons: [],
};

export default function PokemonReducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.GET_POKES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TYPE.GET_POKES_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: 'An error occured',
      };
    case TYPE.GET_POKES_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemons: [...state.pokemons, ...action.payload],
      };
    case TYPE.SET_POKEMON:
      return {
        ...state,
        comparedPokemons: state.comparedPokemons.concat(action.payload),
      };
    case TYPE.CLEAR_COMPARED_POKEMONS:
      return {
        ...state,
        comparedPokemons: [],
      };
    case TYPE.GET_L_POKEMON_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TYPE.GET_L_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        legendariesPokemons: [...state.legendariesPokemons, ...action.payload],
      };
    case TYPE.GET_L_POKEMON_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: 'An error occured',
      };
    case TYPE.GET_POKEMON_BY_TYPE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TYPE.GET_POKEMON_BY_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: 'An error occured',
      };
    case TYPE.GET_POKEMON_BY_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        filteredByTypePokemons: action.payload.pokemons,
      };
    case TYPE.REFRESH:
      return {
        ...state,
        filteredByTypePokemons: [],
      };
    default:
      return state;
  }
}
