import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { PokemonTypes } from '../../../api/types';
import { SAGATYPE, TYPE } from '../types';

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

function* pokemonWorker() {
  const page = arguments[0].page;
  yield put({ type: TYPE.GET_POKES_LOADING });
  try {
    const pokes: PokemonTypes = yield call(getPokes, page);
    yield put({ type: TYPE.GET_POKES_SUCCESS, payload: pokes });
  } catch (error) {
    yield put({ type: TYPE.GET_POKES_ERROR });
  }
}

export function* pokemonWatcher() {
  yield takeEvery(SAGATYPE.GET_POKES, pokemonWorker);
}
