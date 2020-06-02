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

function* calcShipment({ payload }) {
  try {
    const { status, data } = yield call(
      api.post,
      '/shipment',
      payload,
    );
    if (status === 200) {
      yield put(
        LocationsActions.calcShipmentSuccess({ shipment: data }),
      );
    } else {
      showToast(
        'Ops',
        'Houve um problema ao calcular valor de entregar',
        'danger',
      );
      yield put(LocationsActions.calcShipmentFail());
    }
  } catch (error) {
    alert(
      'Ops',
      error?.response?.data?.message ||
        'Houve um problema ao calcular valor de entregar',
    );
    // showToast(
    //   'Ops',
    //   error?.response?.data?.message ||
    //     'Houve um problema ao calcular valor de entregar',
    //   'danger',
    // );
    yield put(LocationsActions.calcShipmentFail());
  }
}

/* function* addLocation({ payload }) {
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
} */

// function* addLocationWatcher() {
//   yield takeLatest(LoginTypes.LOGIN_REQUEST, addLocation);
// }

function* allLocationsWatcher() {
  yield takeLatest(
    LocationsTypes.GET_LOCATIONS_REQUEST,
    allLocations,
  );
}

function* calcShipmentWatcher() {
  yield takeLatest(
    LocationsTypes.CALC_SHIPMENT_REQUEST,
    calcShipment,
  );
}

export default function* rootSaga() {
  yield all([fork(allLocationsWatcher), fork(calcShipmentWatcher)]);
}
