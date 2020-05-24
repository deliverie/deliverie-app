import { combineReducers } from 'redux';

import login from './login';
import locations from './locations';
import company from './company';

const rootReducer = combineReducers({
  login,
  locations,
  company,
});

export default rootReducer;
