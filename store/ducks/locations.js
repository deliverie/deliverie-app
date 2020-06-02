export const Types = {
  GET_LOCATIONS_REQUEST: 'LOCATION/GET_LOCATIONS_REQUEST',
  GET_LOCATIONS_SUCCESS: 'LOCATION/GET_LOCATIONS_SUCCESS',
  GET_LOCATIONS_FAIL: 'LOCATION/GET_LOCATIONS_FAIL',
  ADD_LOCATION_REQUEST: 'LOCATION/ADD_LOCATION_REQUEST',
  ADD_LOCATION_SUCCESS: 'LOCATION/ADD_LOCATION_SUCCESS',
  REMOVE_SINGLE_LOCATION: 'LOCATION/REMOVE_SINGLE_LOCATION',
  SET_LOCATION: 'LOCATION/SET_LOCATION',
};

const INITIAL_STATE = {
  locations: [],
  currentLocation: null,
  loading: false,
  error: true,
  redirectTo: false,
};

export default function locations(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_LOCATIONS_REQUEST:
      return { ...state, loading: true };
    case Types.GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload,
        currentLocation: action.payload[0],
        loading: false,
        error: false,
      };
    case Types.GET_LOCATIONS_FAIL:
      return { ...state, loading: false, error: true };
    case Types.ADD_LOCATION_REQUEST:
      return { ...state, loading: true, error: false };
    case Types.ADD_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        redirectTo: true,
      };
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
  addLocation: (payload, navigation) => ({
    type: Types.ADD_LOCATION_REQUEST,
    payload,
    navigation,
  }),
  addLocationSuccess: () => ({
    type: Types.ADD_LOCATION_SUCCESS,
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
