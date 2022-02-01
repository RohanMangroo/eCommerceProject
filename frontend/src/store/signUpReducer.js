// Action Type
const TOGGLE_SIGNUP = 'TOGGLE_SIGNUP';

// Action creators
export const toggleSignUp = (boolean) => {
  return {
    type: TOGGLE_SIGNUP,
    payload: {
      data: boolean,
    },
  };
};

const initialState = {
  open: false,
};

const toggleSignUpReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIGNUP:
      return {
        ...state,
        open: payload.data,
      };
    default:
      return state;
  }
};

export default toggleSignUpReducer;
