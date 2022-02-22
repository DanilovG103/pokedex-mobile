import { SAGATYPE } from '../../types';

export const getPokes = (page: number) => {
  return { type: SAGATYPE.GET_POKES, page };
};

export const getLegendariesPokes = (page: number) => {
  return { type: SAGATYPE.GET_L_POKES, page };
};
