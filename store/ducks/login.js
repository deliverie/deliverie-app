export const Types = {
  LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN/LOGIN_FAIL',
  LOGIN_LOGOUT: 'LOGIN/LOGIN_LOGOUT',
};

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: false,
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      console.log(action.payload);
      return { ...state, loading: true };
    case Types.LOGIN_SUCCESS:
      console.tron.log('teste saga succcess', action);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case Types.LOGIN_FAIL:
      return { ...state, loading: false, error: true };
    case Types.REMOVE_SINGLE_LOCATION:
      return { ...state, shops: [], loading: false, error: false };
    case Types.LOGIN_LOGOUT:
      return {
        data: null,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  loginRequest: payload => ({
    type: Types.LOGIN_REQUEST,
    payload,
  }),
  loginSuccess: payload => ({
    type: Types.LOGIN_SUCCESS,
    payload,
  }),
  loginFail: () => ({
    type: Types.LOGIN_FAIL,
  }),
  loginLogout: () => ({
    type: Types.LOGIN_LOGOUT,
  }),
};
