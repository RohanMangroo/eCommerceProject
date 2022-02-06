// Action Type
const TOGGLE_HAM = 'TOGGLE_HAM';

// Action creators
export const toggleHam = (boolean) => {
  return {
    type: TOGGLE_HAM,
    payload: {
      data: boolean,
    },
  };
};

const initialState = {
  open: false,
};

const toggleHamReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_HAM:
      return {
        ...state,
        open: payload.data,
      };
    default:
      return state;
  }
};

export default toggleHamReducer;
