// Action Type
const UPDATE_FAV = 'UPDATE_FAV';

// Action creators
export const updateFav = (data) => {
  return {
    type: UPDATE_FAV,
    payload: {
      data: data,
    },
  };
};

const initialState = {};

const favReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_FAV:
      return {
        ...state,
        ...payload.data,
      };
    default:
      return state;
  }
};

export default favReducer;
