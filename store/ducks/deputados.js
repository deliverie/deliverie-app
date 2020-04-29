export const Types = {
  GET_SHOPS: 'SHOPS/GET_SHOPS',
  GET_SHOPS_SUCCESS: 'SHOPS/GET_SHOPS_SUCCESS',
  GET_SHOPS_FAIL: 'SHOPS/GET_SHOPS_FAIL',
  CLEAR_SHOPS: 'SHOPS/CLEAR',
};

const INITIAL_STATE = {
  shops: [],
  loading: false,
  error: false,
};

export default function shops(state = INITIAL_STATE, action) {
  const {
    GET_SHOPS,
    GET_SHOPS_SUCCESS,
    GET_SHOPS_FAIL,
    CLEAR_SHOPS,
  } = Types;
  switch (action.type) {
    case GET_SHOPS:
      return { ...state, loading: true };
    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        shops: action.payload.data,
        loading: false,
      };
    case GET_SHOPS_FAIL:
      return { ...state, loading: false, error: true };
    case CLEAR_SHOPS:
      return { ...state, shops: [], loading: false, error: false };
    default:
      return state;
  }
}

export const Creators = {
  getShops: () => ({
    type: Types.GET_SHOPS,
  }),
  getShopsSuccess: (payload) => ({
    type: Types.GET_SHOPS_SUCCESS,
    payload,
  }),
  getShopsFail: () => ({
    type: Types.GET_SHOPS_FAIL,
  }),
};
