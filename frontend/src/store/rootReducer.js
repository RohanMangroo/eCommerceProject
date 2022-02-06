import { createStore } from 'redux';
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import toggleLoginReducer from './logInReducer';
import toggleSignUpReducer from './signUpReducer';
import favReducer from './favReducer';
import toggleUserMenuReducer from './userMenuReducer';
import updateProductTypeReducer from './productsReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  open: toggleLoginReducer,
  signUp: toggleSignUpReducer,
  favs: favReducer,
  userMenu: toggleUserMenuReducer,
  productType: updateProductTypeReducer,
});

const store = createStore(rootReducer);

export default store;
