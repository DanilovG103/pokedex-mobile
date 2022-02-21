import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import RootReducer from './reducer';
import { pokemonWatcher } from './saga/saga';

const saga = createSagaMiddleware();

export const store = createStore(RootReducer, applyMiddleware(saga));

saga.run(pokemonWatcher);
