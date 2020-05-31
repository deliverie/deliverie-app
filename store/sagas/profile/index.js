import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';

import {
  Creators as ProfileActions,
  Types as ProfileTypes,
} from '../../ducks/profile';

import { Creators as LoginActions } from '../../ducks/login';

// eslint-disable-next-line require-yield
function* profileUpdate({ payload }) {
  let data = {};
  if (payload.password && payload.password_confirmation) {
    data = {
      name: payload.name,
      email: payload.email,
      cpf: payload.cpf,
      phone_ddd: payload.phone.slice(0, 2),
      phone_num: payload.phone.slice(2, 14),
      password: payload.password,
      password_confirmation: payload.password,
    };
  } else {
    data = {
      name: payload.name,
      phone_ddd: payload.phone.slice(0, 2),
      phone_num: payload.phone.slice(2, 14),
    };
  }

  try {
    const response = yield call(api.put, '/users', data);

    yield put(ProfileActions.profileUpdateSuccess());
    yield put(LoginActions.loginSuccess({ user: response.data }));
    showToast(
      'Feito',
      'Seu cadastro foi realizado com sucesso',
      'success',
    );
  } catch (error) {
    console.tron.log('error', error);
    yield put(ProfileActions.profileUpdateFail());

    showToast(
      'Ops',
      'Erro ao realizar seu perfil, tente novamente',
      'danger',
    );
  }
}

function* profileUpdateWatcher() {
  yield takeLatest(
    ProfileTypes.PROFILE_UPDATE_REQUEST,
    profileUpdate,
  );
}

export default function* rootSaga() {
  yield all([fork(profileUpdateWatcher)]);
}
