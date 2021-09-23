import { combineReducers } from 'redux';
import PokemonReducer from './PokemonReducer';
import FilterReducer from './FilterReducer';

export default combineReducers({
  PokemonReducer,
  FilterReducer,
});
