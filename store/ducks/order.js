import { takeLatest, put, call } from 'redux-saga/effects';
import { showToast } from '../../utils/toast';

export const Types = {
  ADD_ITEM: 'ORDER/ADD_ITEM',
  ADD_ITEM_SUCCESS: 'ORDER/ADD_ITEM_SUCCESS',
  ADD_ITEM_FAIL: 'ORDER/ADD_ITEM_FAIL',
  CREATE_ORDER: 'ORDER/CREATE_ORDER',
  CREATE_ORDER_SUCCESS: 'ORDER/CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAIL: 'ORDER/CREATE_ORDER_FAIL',
};

const INITIAL_STATE = {
  loading: false,
  order: null,
  cart: null,
  error: null,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.ADD_ITEM_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case Types.ADD_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case Types.CREATE_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case Types.CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export const Creators = {
  addItem: payload => ({
    type: Types.ADD_ITEM,
    payload,
  }),
  addItemSuccess: payload => ({
    type: Types.ADD_ITEM_SUCCESS,
    payload,
  }),
  addItemFail: () => ({
    type: Types.ADD_ITEM_FAIL,
  }),
  createOrder: (payload, addressId, paymentType, change) => ({
    type: Types.CREATE_ORDER,
    payload,
    addressId,
    paymentType,
    change,
  }),
  createOrderSuccess: payload => ({
    type: Types.CREATE_ORDER_SUCCESS,
    payload,
  }),
  createOrderFail: () => ({
    type: Types.CREATE_ORDER_FAIL,
  }),
};
