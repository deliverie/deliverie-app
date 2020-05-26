import { combineReducers } from 'redux';

import login from './login';
import locations from './locations';
import company from './company';
import products from './products';

const rootReducer = combineReducers({
  login,
  locations,
  company,
  products,
});

export default rootReducer;
