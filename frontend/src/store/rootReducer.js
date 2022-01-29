import { createStore } from 'redux';
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
