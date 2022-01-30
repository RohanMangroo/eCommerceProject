// Action Type
const TOGGLE_LOGIN = 'TOGGLE_LOGIN';

// Action creators
export const toggleLogin = (boolean) => {
  return {
    type: TOGGLE_LOGIN,
    payload: {
      data: boolean,
    },
  };
};

const initialState = {
  open: false,
};

const toggleLoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_LOGIN:
      return {
        ...state,
        open: payload.data,
      };
    default:
      return state;
  }
};

export default toggleLoginReducer;
