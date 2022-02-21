import { SAGATYPE } from '../../types';

export const getPokes = (page: number) => {
  return { type: SAGATYPE.GET_POKES, page };
};
