// Action Type
const UPDATE_CART = 'UPDATE_CART';
const EMPTY_CART = 'EMPTY_CART';

// Action creators
export const updateCart = (data) => {
  const array = data ? data : [];
  return {
    type: UPDATE_CART,
    payload: {
      data: array,
    },
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CART:
      const items = [...payload.data];
      return {
        ...state,
        items: items,
      };
    case EMPTY_CART:
      return {
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
