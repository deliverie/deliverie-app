import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';

import {
  Creators as LocationsActions,
  Types as LocationsTypes,
} from '../../ducks/locations';

function* allLocations() {
  try {
    const response = yield call(api.get, '/address');
    yield put(LocationsActions.getLocationsSuccess(response.data));
  } catch (error) {
    console.tron.log('catch', error);
    yield put(LocationsActions.getLocationsFail());
    showToast(
      'Ops',
      'Houve um problema ao buscar seu endereços',
      'danger',
    );
  }
}

function* addLocation({ payload }) {
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

// function* addLocationWatcher() {
//   yield takeLatest(LoginTypes.LOGIN_REQUEST, addLocation);
// }

function* allLocationsWatcher() {
  yield takeLatest(
    LocationsTypes.GET_LOCATIONS_REQUEST,
    allLocations,
  );
}
export default function* rootSaga() {
  yield all([fork(allLocationsWatcher)]);
}
