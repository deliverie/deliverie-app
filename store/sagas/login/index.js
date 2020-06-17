import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import api from '../../../services/api';
import { showToast } from '../../../utils/toast';
import * as RootNavigation from '../../../services/navigation';

import {
  Creators as LoginActions,
  Types as LoginTypes,
} from '../../ducks/login';

function* login({ payload }) {
  console.tron.log('LOGIN:::', payload);
  try {
    const response = yield call(api.post, '/users/login', payload);

    yield AsyncStorage.setItem(
      '@@DELIVERIE@@:token',
      response.data.token,
    );
    yield AsyncStorage.setItem(
      '@@DELIVERIE@@:refreshToken',
      response.data.refreshToken,
    );

    yield put(
      LoginActions.loginSuccess(
        response.data,
        payload.navigateBackTo ? payload.navigateBackTo : null,
      ),
    );

    if (payload.navigateBackTo) {
      RootNavigation.navigate(payload.navigateBackTo);
    }
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

function* refreshLogin({ payload }) {
  try {
    const { status, data } = yield call(
      api.post,
      '/users/login',
      payload,
    );

    if (status === 200) {
      yield AsyncStorage.setItem('@@DELIVERIE@@:token', data.token);
      yield AsyncStorage.setItem(
        '@@DELIVERIE@@:refreshToken',
        data.refreshToken,
      );
      yield put(LoginActions.refreshLoginSuccess(data));
    } else {
      yield put(LoginActions.refreshLoginFail());
      showToast('Ops', 'Erro ao verificar login.', 'danger');
    }
  } catch (error) {
    yield put(LoginActions.refreshLoginFail());
    showToast('Ops', 'Erro ao verificar login.', 'danger');
  }
}

function* loginWatcher() {
  yield takeLatest(LoginTypes.LOGIN_REQUEST, login);
}

function* refreshLoginWatcher() {
  yield takeLatest(LoginTypes.REFRESH_LOGIN_REQUEST, refreshLogin);
}

export default function* rootSaga() {
  yield all([fork(loginWatcher), fork(refreshLoginWatcher)]);
}
