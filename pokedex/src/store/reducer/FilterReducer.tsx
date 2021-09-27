const initialState = {
  experienceFrom: 0,
  experienceTo: 609,
  attackFrom: 0,
  attackTo: 600,
  types: [],
  type: null,
  loading: false,
  typeLoading: false,
};

export default function FilterReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_EXPERIENCE':
      return {
        ...state,
        experienceFrom: action.payload.from,
        experienceTo:
          action.payload.to < action.payload.from + 1 ? 609 : action.payload.to,
      };
    case 'SET_ATTACK':
      return {
        ...state,
        attackFrom: action.payload.from,
        attackTo:
          action.payload.to < action.payload.from + 1 ? 600 : action.payload.to,
      };
    case 'REFRESH':
      return {
        ...state,
        type: null,
        experienceFrom: 0,
        experienceTo: 609,
        attackFrom: 0,
        attackTo: 600,
      };
    case 'GET_POKEMON_BY_TYPE_LOADING':
      return {
        ...state,
        typeLoading: true,
      };
    case 'GET_POKEMON_BY_TYPE_SUCCESS':
      return {
        ...state,
        typeLoading: false,
        type: action.payload.type,
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
    default:
      return state;
  }
}
