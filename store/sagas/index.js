import {
  all,
  call,
  takeLatest,
  put,
  select,
  fork,
  delay,
} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

function* getShops() {
  // const { page, deputados } = yield select(state => state.deputados);
  // try {
  //   const response = yield call(
  //     api.get,
  //     `deputados?itens=100&pagina=${page}&ordenarPor=nome`
  //   );
  //   if (response.data.dados.length === 0) {
  //     yield put(
  //       DeputadosActions.getDeputadosSuccess({
  //         data: deputados,
  //         page: null
  //       })
  //     );
  //   } else {
  //     yield put(
  //       DeputadosActions.getDeputadosSuccess({
  //         data: [...deputados, ...response.data.dados],
  //         page: page + 1
  //       })
  //     );
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
}

export default function* rootSaga() {
  return yield all([]);
}
