import { SAGATYPE } from '../../types';
import { PokemonTypes } from '../../../../api/types';

export const getPokes = (page: number) => {
  return { type: SAGATYPE.GET_POKES, page };
};

export const getLegendariesPokes = (page: number) => {
  return { type: SAGATYPE.GET_L_POKES, page };
};

export const getPokeByType = (type: string) => {
  return { type: SAGATYPE.GET_POKEMON_BY_TYPE, typeName: type };
};

export const setPoke = (pokemon: PokemonTypes) => {
  return { type: SAGATYPE.SET_POKEMON, pokemon };
};
