const initialState = {
  selectedTypes: [],
  experienceFrom: 0,
  experienceTo: 100000,
  attackFrom: 0,
  attackTo: 100000,
};

export default function FilterReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_TYPES':
      return {
        ...state,
        selectedTypes: state.selectedTypes
          .filter(item => item !== action.payload)
          .concat(action.payload),
      };
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
    default:
      return state;
  }
}
