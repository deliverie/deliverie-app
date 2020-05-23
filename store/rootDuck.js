import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import * as locations from './ducks/locations';
import * as company from './ducks/company';

export const rootReducer = combineReducers({
  locations: locations.reducer,
  company: company.reducer,
});

export function* rootSaga() {
  yield all([company.saga()]);
}
