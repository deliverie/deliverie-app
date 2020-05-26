import { all } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import loginSagas from './login';
import locationSagas from './location';
import companySagas from './company';
import productsSagas from './products';

export default function* rootSaga() {
  return yield all([
    companySagas(),
    loginSagas(),
    locationSagas(),
    productsSagas(),
  ]);
}
