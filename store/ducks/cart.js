import { takeLatest, put, call } from 'redux-saga/effects';
import { showToast } from '../../utils/toast';

export const Types = {
  ADD_CART: 'CART/ADD_CART',
};

const INITIAL_STATE = {
  loading: false,
  cart: [],
  company_id: null,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_CART: {
      let { company_id } = state;
      if (!company_id) {
        company_id = action.payload.company_id;
      }
      return {
        ...state,
        company_id,
        cart: [...state.cart, action.payload],
      };
    }
    default:
      return state;
  }
}

export const Creators = {
  addCart: payload => ({
    type: Types.ADD_CART,
    payload,
  }),
};
