import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './reducer';
import { rootWatcher } from './saga/root';

const saga = createSagaMiddleware();

export const store = createStore(RootReducer, applyMiddleware(saga));

saga.run(rootWatcher);
