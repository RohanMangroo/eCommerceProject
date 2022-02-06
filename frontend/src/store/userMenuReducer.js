// Action Type
const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';

// Action creators
export const toggleUserMenu = (boolean) => {
  return {
    type: TOGGLE_USER_MENU,
    payload: {
      data: boolean,
    },
  };
};

const initialState = {
  open: false,
};

const toggleUserMenuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_USER_MENU:
      return {
        ...state,
        open: payload.data,
      };
    default:
      return state;
  }
};

export default toggleUserMenuReducer;
