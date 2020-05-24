import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';

import {
  Creators as LoginActions,
  Types as LoginTypes,
} from '../../ducks/login';

function* location({ payload }) {
  console.tron.log('entrou na saga de login', payload);
  try {
    const response = yield call(api.post, '/users/login', payload);
    console.tron.log('teste requisição', response);
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

function* addLocation() {
  yield takeLatest(LoginTypes.LOGIN_REQUEST, location);
}

export default function* rootSaga() {
  yield all([fork(addLocation)]);
}
