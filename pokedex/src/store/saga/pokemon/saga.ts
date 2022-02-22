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

const getPokemonByType = async (type: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);

  const datas = response.data.pokemon.map(el =>
    fetch(el.pokemon.url).then(res => res.json()),
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

function* pokesTypesWorker(action) {
  const { typeName } = action;
  yield put({ type: TYPE.GET_POKEMON_BY_TYPE_LOADING });
  try {
    const pokemons: PokemonTypes[] = yield call(getPokemonByType, typeName);
    yield put({
      type: TYPE.GET_POKEMON_BY_TYPE_SUCCESS,
      payload: { type: typeName, pokemons },
    });
  } catch (error) {
    yield put({ type: TYPE.GET_POKEMON_BY_TYPE_ERROR });
  }
}

function* setPokemonWorker(action) {
  const { pokemon } = action;
  yield put({ type: TYPE.SET_POKEMON, payload: pokemon });
}

function* removePokemonsWorker() {
  yield put({ type: TYPE.CLEAR_COMPARED_POKEMONS });
}

export function* pokemonWatcher() {
  yield takeEvery(SAGATYPE.GET_POKES, pokemonWorker);
  yield takeEvery(SAGATYPE.GET_L_POKES, legendariesPokemonWorker);
  yield takeEvery(SAGATYPE.GET_POKEMON_BY_TYPE, pokesTypesWorker);
  yield takeEvery(SAGATYPE.SET_POKEMON, setPokemonWorker);
  yield takeEvery(SAGATYPE.REMOVE_POKEMONS, removePokemonsWorker);
}
