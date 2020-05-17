import {
  all,
  call,
  takeLatest,
  put,
  select,
  fork,
  delay,
} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import loginSagas from './login';

export default function* rootSaga() {
  return yield all([loginSagas()]);
}
