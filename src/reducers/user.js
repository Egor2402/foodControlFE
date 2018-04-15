import { SIGN_UP,
         SIGN_IN,
         SIGN_UP_SUCCESS,
         SIGN_UP_FAIL,
         SIGN_IN_SUCCESS,
         SIGN_IN_FAIL,
         LOAD_USER,
         LOAD_USER_SUCCESS,
         LOGOUT,
         RESET_ERRORS } from '../constants/User';

const initialState = {
  userData: {},
  fetching: false,
  isSignIn: false,
  errors: {}
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
    case LOAD_USER:
      return { ...state, fetching: true, errors: {} };

    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return { ...state, userData: action.payload, fetching: false, isSignIn: true };

    case SIGN_IN_FAIL:
    case SIGN_UP_FAIL:
      return { ...state, errors: action.payload, fetching: false };

    case LOGOUT:
      return initialState;

    case RESET_ERRORS:
      return { ...state, errors: {} };

    default:
      return state;
  }
}
