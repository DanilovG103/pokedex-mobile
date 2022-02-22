import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { PokemonTypes } from '../../../../api/types';
import { SAGATYPE, TYPE } from '../../types';

const getPokes = async (page: number) => {
  const offset = page * 9;
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=9`,
  );

  const datas = response.data.results.map(el =>
    fetch(el.url).then(res => res.json()),
  );

  return await Promise.all(datas);
};

const getLPokes = async (page: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=9`,
  );

  const datas = response.data.results.map(el =>
    fetch(el.url).then(res => res.json()),
  );

  return await Promise.all(datas);
};

function* pokemonWorker(action) {
  const { page } = action;
  yield put({ type: TYPE.GET_POKES_LOADING });
  try {
    const pokes: PokemonTypes[] = yield call(getPokes, page);
    yield put({ type: TYPE.GET_POKES_SUCCESS, payload: pokes });
  } catch (error) {
    yield put({ type: TYPE.GET_POKES_ERROR });
  }
}

function* legendariesPokemonWorker(action) {
  const { page } = action;
  yield put({ type: TYPE.GET_L_POKEMON_LOADING });
  try {
    const l_pokes: PokemonTypes[] = yield call(getLPokes, page);
    yield put({ type: TYPE.GET_L_POKEMON_SUCCESS, payload: l_pokes });
  } catch (error) {
    yield put({ type: TYPE.GET_L_POKEMON_ERROR });
  }
}

export function* pokemonWatcher() {
  yield takeEvery(SAGATYPE.GET_POKES, pokemonWorker);
  yield takeEvery(SAGATYPE.GET_L_POKES, legendariesPokemonWorker);
}
