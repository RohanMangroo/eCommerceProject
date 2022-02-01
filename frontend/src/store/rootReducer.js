import { createStore } from 'redux';
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import toggleLoginReducer from './logInReducer';
import toggleSignUpReducer from './signUpReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  open: toggleLoginReducer,
  signUp: toggleSignUpReducer,
});

const store = createStore(rootReducer);

export default store;
