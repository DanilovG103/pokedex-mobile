import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SAGATYPE, TYPE } from '../../types';
import { Types } from '../../../../api/types';

const getTypes = async () => {
  return await (
    await axios.get('https://pokeapi.co/api/v2/type')
  ).data;
};

function* typesWorker() {
  yield put({ type: TYPE.GET_TYPES_LOADING });
  try {
    const types: Types[] = yield call(getTypes);
    yield put({ type: TYPE.GET_TYPES_SUCCESS, payload: types });
  } catch (error) {
    yield put({ type: TYPE.GET_TYPES_ERROR });
  }
}

function* refreshWorker() {
  yield put({ type: TYPE.REFRESH });
}

function* attackWorker(action) {
  const { from, to } = action;
  yield put({ type: TYPE.SET_ATTACK, payload: { from, to } });
}

function* expWorker(action) {
  const { from, to } = action;
  yield put({ type: TYPE.SET_EXPERIENCE, payload: { from, to } });
}

export function* filterWatcher() {
  yield takeEvery(SAGATYPE.GET_TYPES, typesWorker);
  yield takeEvery(SAGATYPE.REFRESH, refreshWorker);
  yield takeEvery(SAGATYPE.SET_ATTACK, attackWorker);
  yield takeEvery(SAGATYPE.SET_EXP, expWorker);
}
