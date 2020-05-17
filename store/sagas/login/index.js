import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from '../../../services/api';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../../../styles';
import { showToast } from '../../../utils/toast';

import {
  Creators as LoginActions,
  Types as LoginTypes,
} from '../../ducks/login';

function* login({ payload }) {
  console.tron.log('entrou na saga de login');
  try {
    const response = yield call(api.post, '/users/login', payload);
    console.tron.log(response);
    yield put(LoginActions.loginSucces(response.data));
  } catch (error) {
    yield put(LoginActions.loginFail());

    showToast(
      'Ops',
      'Erro ao realizar login. Verifique suas credenciais e tente novamente',
      'danger',
    );
  }
}

function* loginWatcher() {
  takeLatest(LoginTypes.LOGIN_REQUEST, login);
}

export default function* rootSaga() {
  yield all([fork(loginWatcher)]);
}
