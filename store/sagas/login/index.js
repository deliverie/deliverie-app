import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import api from '../../../services/api';
import { showToast } from '../../../utils/toast';

import {
  Creators as LoginActions,
  Types as LoginTypes,
} from '../../ducks/login';

function* login({ payload }) {
  console.tron.log('entrou na saga de login', payload);
  try {
    const response = yield call(api.post, '/users/login', payload);

    yield AsyncStorage.setItem(
      '@@DELIVERE@@:token',
      response.data.token,
    );
    yield put(LoginActions.loginSuccess(response.data));
  } catch (error) {
    console.tron.log('catch', error);
    yield put(LoginActions.loginFail());

    showToast(
      'Ops',
      'Erro ao realizar login. Verifique suas credenciais e tente novamente',
      'danger',
    );
  }
}

function* loginWatcher() {
  yield takeLatest(LoginTypes.LOGIN_REQUEST, login);
}

export default function* rootSaga() {
  yield all([fork(loginWatcher)]);
}
