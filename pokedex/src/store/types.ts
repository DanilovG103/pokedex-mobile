import { PokemonTypes, Types } from '../../api/types';

export enum TYPE {
  GET_POKES_LOADING = 'GET_POKES_LOADING',
  GET_POKES_SUCCESS = 'GET_POKES_SUCCESS',
  GET_POKES_ERROR = 'GET_POKES_ERROR',
  GET_L_POKEMON_LOADING = 'GET_L_POKEMON_LOADING',
  GET_L_POKEMON_SUCCESS = 'GET_L_POKEMON_SUCCESS',
  GET_L_POKEMON_ERROR = 'GET_L_POKEMON_ERROR',
  GET_POKEMON_BY_TYPE_LOADING = 'GET_POKEMON_BY_TYPE_LOADING',
  GET_POKEMON_BY_TYPE_SUCCESS = 'GET_POKEMON_BY_TYPE_SUCCESS',
  GET_POKEMON_BY_TYPE_ERROR = 'GET_POKEMON_BY_TYPE_ERROR',
  GET_TYPES_LOADING = 'GET_TYPES_LOADING',
  GET_TYPES_SUCCESS = 'GET_TYPES_SUCCESS',
  GET_TYPES_ERROR = 'GET_TYPES_ERROR',
  SET_POKEMON = 'SET_POKEMON',
  CLEAR_COMPARED_POKEMONS = 'CLEAR_COMPARED_POKEMONS',
  SET_SELECTED_TYPES = 'SET_SELECTED_TYPES',
  SET_EXPERIENCE = 'SET_EXPERIENCE',
  SET_ATTACK = 'SET_ATTACK',
  REFRESH = 'REFRESH',
}

export enum SAGATYPE {
  GET_POKES = 'GET_POKES',
  GET_L_POKES = 'GET_L_POKES',
  GET_TYPES = 'GET_TYPES',
}

export interface Store {
  PokemonReducer: PokemonReducer;
  FilterReducer: FilterReducer;
}

export interface PokemonReducer {
  loading: boolean;
  pokemons: PokemonTypes[];
  legendariesPokemons: PokemonTypes[];
  errorMessage: string;
  comparedPokemons: PokemonTypes[];
  filteredByTypePokemons: PokemonTypes[];
}

export interface FilterReducer {
  experienceFrom: number;
  experienceTo: number;
  attackFrom: number;
  attackTo: number;
  types: Types[];
  type: string;
  loading: boolean;
  typeLoading: boolean;
}
