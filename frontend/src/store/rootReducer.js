import { createStore } from 'redux';
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import toggleLoginReducer from './logInReducer';
import toggleSignUpReducer from './signUpReducer';
import favReducer from './favReducer';
import toggleUserMenuReducer from './userMenuReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  open: toggleLoginReducer,
  signUp: toggleSignUpReducer,
  favs: favReducer,
  userMenu: toggleUserMenuReducer,
});

const store = createStore(rootReducer);

export default store;
