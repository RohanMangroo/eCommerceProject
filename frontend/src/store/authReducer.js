// Action Type
const UPDATE_AUTH = 'UPDATE_AUTH';

// Action creators
export const updateAuth = (data) => {
  return {
    type: UPDATE_AUTH,
    payload: {
      data: data,
    },
  };
};

const initialState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  username: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_AUTH:
      return {
        ...state,
        ...payload.data,
      };
    default:
      return state;
  }
};

export default authReducer;
