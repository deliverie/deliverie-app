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

function* addLocation({ payload }) {
  console.tron.log('entrou na saga de login', payload);
  try {
    yield call(api.post, '/address', {
      ...payload,
      lat: '-24.4881',
      lng: '-47.8348',
    });
    yield put(LocationsActions.getLocations());
    navigation.goBack();
  } catch (error) {
    showToast(
      'Ops',
      'Não foi possível adicionar seu endereço, tente novamente',
      'danger',
    );
  }
}

function* removeLocation({ payload }) {
  try {
    yield call(api.delete, `/address/${payload}`);
    yield put(LocationsActions.getLocations());
    showToast('Pronto', 'Seu endereço foi removido', 'success');
  } catch (error) {
    showToast(
      'Ops',
      'Não foi possível adicionar seu endereço, tente novamente',
      'danger',
    );
  }
}

function* addLocationWatcher() {
  yield takeLatest(LocationsTypes.ADD_LOCATION_REQUEST, addLocation);
}

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

function* removeLocationWatcher() {
  yield takeLatest(
    LocationsTypes.REMOVE_LOCATION_REQUEST,
    removeLocation,
  );
}

export default function* rootSaga() {
  yield all([
    fork(allLocationsWatcher),
    fork(removeLocationWatcher),
    fork(addLocationWatcher),
    fork(calcShipmentWatcher),
  ]);
}
