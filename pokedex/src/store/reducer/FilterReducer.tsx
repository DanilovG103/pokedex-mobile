const initialState = {
  experienceFrom: 0,
  experienceTo: 100000,
  attackFrom: 0,
  attackTo: 100000,
  type: null,
};

export default function FilterReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_EXPERIENCE':
      return {
        ...state,
        experienceFrom: action.payload.from,
        experienceTo:
          action.payload.to < action.payload.from + 1
            ? 100000
            : action.payload.to,
      };
    case 'SET_ATTACK':
      return {
        ...state,
        attackFrom: action.payload.from,
        attackTo:
          action.payload.to < action.payload.from + 1
            ? 100000
            : action.payload.to,
      };
    case 'REFRESH':
      return {
        ...state,
        type: null,
        experienceFrom: 0,
        experienceTo: 100000,
        attackFrom: 0,
        attackTo: 100000,
      };
    case 'GET_POKEMON_BY_TYPE_SUCCESS':
      return {
        ...state,
        type: action.payload.type,
      };
    default:
      return state;
  }
}
