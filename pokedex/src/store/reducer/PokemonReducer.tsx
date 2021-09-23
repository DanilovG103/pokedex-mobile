const initialState = {
  loading: false,
  pokemons: [],
  legendariesPokemons: [],
  errorMessage: '',
  pokemon: null,
  comparedPokemons: [],
  types: [],
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
    case 'GET_TYPES_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_TYPES_SUCCESS':
      return {
        ...state,
        loading: false,
        types: action.payload.results,
      };
    case 'GET_TYPES_ERROR':
      return {
        ...state,
        loading: false,
        errorMessage: 'An error occured',
      };
    case 'GET_L_POKEMON_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_L_POKEMON_SUCCESS':
      return {
        ...state,
        loading: false,
        legendariesPokemons: [...state.legendariesPokemons, ...action.payload],
      };
    case 'GET_L_POKEMON_ERROR':
      return {
        ...state,
        loading: false,
        errorMessage: 'An error occured',
      };
    default:
      return state;
  }
}
