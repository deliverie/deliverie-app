export const Types = {
  GET_LOCATIONS_REQUEST: 'LOCATION/GET_LOCATIONS_REQUEST',
  GET_LOCATIONS_SUCCESS: 'LOCATION/GET_LOCATIONS_SUCCESS',
  GET_LOCATIONS_FAIL: 'LOCATION/GET_LOCATIONS_FAIL',
  REMOVE_SINGLE_LOCATION: 'LOCATION/REMOVE_SINGLE_LOCATION',
  SET_LOCATION: 'LOCATION/SET_LOCATION',
};

const INITIAL_STATE = {
  locations: [],
  currentLocation: null,
  loading: false,
  error: true,
};

export default function locations(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_LOCATIONS_REQUEST:
      return { ...state, loading: true };
    case Types.GET_LOCATIONS_SUCCESS:
      console.tron.log('action', action.payload);
      return {
        ...state,
        locations: action.payload,
        currentLocation: action.payload[0],
        loading: false,
        error: false,
      };
    case Types.GET_LOCATIONS_FAIL:
      return { ...state, loading: false, error: true };
    case Types.REMOVE_SINGLE_LOCATION:
      return { ...state, shops: [], loading: false, error: false };
    case Types.SET_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  getLocations: () => ({
    type: Types.GET_LOCATIONS_REQUEST,
  }),
  getLocationsSuccess: payload => ({
    type: Types.GET_LOCATIONS_SUCCESS,
    payload,
  }),
  getLocationsFail: () => ({
    type: Types.GET_LOCATIONS_FAIL,
  }),
  removeSingleLocation: payload => ({
    type: Types.REMOVE_SINGLE_LOCATION,
    payload,
  }),
  setLocation: payload => ({
    type: Types.SET_LOCATION,
    payload,
  }),
};
