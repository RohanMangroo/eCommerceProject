// Action Type
const UPDATE_QUERY = 'UPDATE_QUERY';

// Action creators
export const updateQuery = (data) => {
  return {
    type: UPDATE_QUERY,
    payload: {
      data: data,
    },
  };
};

const initialState = '';

const queryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_QUERY:
      return payload.data;

    default:
      return state;
  }
};

export default queryReducer;
