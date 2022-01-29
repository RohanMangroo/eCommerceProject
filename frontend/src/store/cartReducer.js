// Action Type
const UPDATE_CART = 'UPDATE_CART';

// Action creators
export const updateCart = (data) => {
  return {
    type: UPDATE_CART,
    payload: {
      data: data,
    },
  };
};

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CART:
      const items = [...state.items, payload.data];
      return {
        ...state,
        items: items,
      };
    default:
      return state;
  }
};

export default cartReducer;
