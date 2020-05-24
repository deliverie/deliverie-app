import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';

import {
  Creators as CompanyActions,
  Types as CompanyTypes,
} from '../../ducks/company';

function* getCompanies({ payload }) {
  try {
    const response = yield call(api.get, '/companies', payload);

    console.tron.log('response companies', response);
    if (response.status === 200) {
      const { page, total, lastPage } = response.data;
      yield put(
        CompanyActions.getCompanySuccess({
          company: response.data.data,
          page,
          total,
          lastPage,
        }),
      );
    } else {
      showToast('Erro', 'Erro ao obter estabelecimentos', 'error');
      yield put(CompanyActions.getCompanyError());
    }
  } catch (e) {
    showToast('Erro', 'Erro ao obter estabelecimentos', 'error');
    yield put(CompanyActions.getCompanyError());
  }
}

function* getCompaniesWatcher() {
  yield takeLatest(CompanyTypes.GET_COMPANY, getCompanies);
}

export default function* rootSaga() {
  yield all([fork(getCompaniesWatcher)]);
}
