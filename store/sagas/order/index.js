import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';

import {
  Creators as OrderActions,
  Types as OrderTypes,
} from '../../ducks/order';

function* addItem(payload) {
  try {
    const { data: cart, status } = yield call(
      api.post,
      '/cart',
      payload,
    );
    if (status === 200) {
      return cart.id;
    }
  } catch (error) {
    return null;
  }
  return null;
}

function* createOrder({ payload, addressId, paymentType }) {
  try {
    const cartId = yield call(addItem, payload);
    if (cartId) {
      const orderPayload = {
        cart_id: cartId,
        address_id: addressId,
        payment_type: paymentType,
      };
      const { data: order, status } = yield call(
        api.post,
        '/orders',
        orderPayload,
      );
      if (status === 200) {
        yield put(OrderActions.createOrderSuccess({ order }));
        alert('Pedido feito com sucesso!');
      } else {
        yield put(OrderActions.createOrderFail());
        alert('Houve um problema ao realizar pedido.');
        // showToast(
        //   'Ops',
        //   'Houve um problema ao realizar pedido.',
        //   'danger',
        // );
      }
    } else {
      alert('Houve um problema ao adicionar os items ao carrinho.');
      // showToast(
      //   'Ops',
      //   'Houve um problema ao adicionar os items ao carrinho.',
      //   'danger',
      // );
    }
  } catch (error) {
    yield put(OrderActions.createOrderFail());
    alert('Houve um problema ao realizar pedido.');
    // showToast(
    //   'Ops',
    //   'Houve um problema ao realizar pedido.',
    //   'danger',
    // );
  }
}

function* createOrderWatcher() {
  yield takeLatest(OrderTypes.CREATE_ORDER, createOrder);
}

export default function* rootSaga() {
  yield all([fork(createOrderWatcher)]);
}
