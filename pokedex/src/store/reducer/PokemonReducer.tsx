const initialState = {
  loading: false,
  pokemons: [],
  errorMessage: '',
  pokemon: null,
  comparedPokemons: [],
};

export default function PokemonReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_POKES_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_POKES_ERROR':
      return {
        ...state,
        loading: false,
        errorMessage: 'An error occured',
      };
    case 'GET_POKES_SUCCESS':
      return {
        ...state,
        loading: false,
        pokemons: [...state.pokemons, ...action.payload],
      };
    case 'GET_POKEMON_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_POKEMON_SUCCESS':
      return {
        ...state,
        loading: false,
        pokemon: action.payload,
      };
    case 'GET_POKEMON_ERROR':
      return {
        ...state,
        loading: false,
        errorMessage: 'An error occured',
      };
    case 'SET_POKEMON':
      return {
        ...state,
        comparedPokemons: state.comparedPokemons.concat(action.payload),
      };
    case 'CLEAR_POKEMON_STATE':
      return {
        ...state,
        pokemon: null,
      };
    case 'CLEAR_COMPARED_POKEMONS':
      return {
        ...state,
        comparedPokemons: [],
      };
    default:
      return state;
  }
}
