import { combineReducers } from 'redux';

import login from './login';
import locations from './locations';

const rootReducer = combineReducers({
  login,
  locations,
});

export default rootReducer;
