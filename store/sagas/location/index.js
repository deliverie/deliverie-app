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

function* addLocation({ payload, navigation }) {
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

function* addLocationWatcher() {
  yield takeLatest(LocationsTypes.ADD_LOCATION_REQUEST, addLocation);
}

function* allLocationsWatcher() {
  yield takeLatest(
    LocationsTypes.GET_LOCATIONS_REQUEST,
    allLocations,
  );
}
export default function* rootSaga() {
  yield all([fork(allLocationsWatcher), fork(addLocationWatcher)]);
}
