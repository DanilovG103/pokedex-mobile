import { all } from 'redux-saga/effects';
import { filterWatcher } from './filter/filter';
import { pokemonWatcher } from './pokemon/saga';

export function* rootWatcher() {
  yield all([pokemonWatcher(), filterWatcher()]);
}
