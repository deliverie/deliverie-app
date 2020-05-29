import { combineReducers } from 'redux';

import login from './login';
import locations from './locations';
import company from './company';
import products from './products';
import cart from './cart';

const rootReducer = combineReducers({
  login,
  locations,
  company,
  products,
  cart,
});

export default rootReducer;
