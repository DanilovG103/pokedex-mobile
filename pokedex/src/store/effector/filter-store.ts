import { createEffect, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import { api } from '../../../api/axios';
import { Result } from '../../../api/types';

interface State {
  experienceFrom: number;
  experienceTo: number;
  attackFrom: number;
  attackTo: number;
  types: Result[];
  type: string | null;
  loading: boolean;
}

const initialState: State = {
  experienceFrom: 0,
  experienceTo: 609,
  attackFrom: 0,
  attackTo: 600,
  types: [],
  type: null,
  loading: false,
};

export const getTypes = createEffect<void, Result[]>(async () => {
  const response = await api.get('/type');

  return response.data.results.filter(
    (item: Result) => item.name !== 'unknown' && item.name !== 'shadow',
  );
});

export const setType = createEvent<string>();

export const setExp =
  createEvent<Pick<State, 'experienceFrom' | 'experienceTo'>>();

export const setAtk = createEvent<Pick<State, 'attackFrom' | 'attackTo'>>();

export const refresh = createEvent();

const setExpHandler = (
  state: State,
  {
    experienceFrom,
    experienceTo,
  }: Pick<State, 'experienceFrom' | 'experienceTo'>,
) => {
  return {
    ...state,
    experienceFrom,
    experienceTo: experienceTo < experienceFrom + 1 ? 609 : experienceTo,
  };
};

const setAtkHandler = (
  state: State,
  { attackFrom, attackTo }: Pick<State, 'attackFrom' | 'attackTo'>,
) => {
  return {
    ...state,
    attackFrom,
    attackTo: attackTo < attackTo + 1 ? 600 : attackTo,
  };
};

const filterStore = createStore(initialState)
  .on(getTypes.pending, (state, loading) => ({ ...state, loading }))
  .on(getTypes.failData, (_, err) => console.log(err))
  .on(getTypes.doneData, (state, types) => ({ ...state, types }))
  .on(setType, (state, type) => ({ ...state, type }))
  .on(setExp, (state, data) => setExpHandler(state, data))
  .on(setAtk, (state, data) => setAtkHandler(state, data))
  .on(refresh, state => ({ ...state, ...initialState }));

export const useFilterStore = () => useStore(filterStore);
