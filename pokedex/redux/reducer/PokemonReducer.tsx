const initialState = {
  loading: false,
  pokemons: [],
  errorMessage: '',
  pokemon: {},
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
        pokemons: state.pokemons.concat(action.payload.results),
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
    default:
      return state;
  }
}
