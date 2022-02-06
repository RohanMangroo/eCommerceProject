// Action Type
const UPDATE_PRODUCT_TYPE = 'UPDATE_PRODUCT_TYPE';

// Action creators
export const updateProductType = (data) => {
  return {
    type: UPDATE_PRODUCT_TYPE,
    payload: {
      data: data,
    },
  };
};

const initialState = 'movie';

const updateProductTypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PRODUCT_TYPE:
      console.log(state);
      return payload.data;

    default:
      return state;
  }
};

export default updateProductTypeReducer;
