import { SIGN_UP,
         SIGN_IN,
         SIGN_UP_SUCCESS,
         SIGN_UP_FAIL,
         SIGN_IN_SUCCESS,
         SIGN_IN_FAIL,
         LOGOUT,
         RESET_ERRORS,
         LOAD_USER,
         LOAD_USER_SUCCESS } from '../constants/User';

import api from '../api';
import Auth from '../modules/Auth';

export function signUp(user) {
  return (dispatch) => {
    dispatch({
      type: SIGN_UP
    });

    api.post('/user', user).then(({ data }) => {
      Auth.setUserToken(data.token);
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: data.user
      });
    }, ({ response }) => {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: response.data.errors
      });
    });
  };
}

export function signIn(user) {
  return (dispatch) => {
    dispatch({
      type: SIGN_IN
    });

    api.post('/login', user).then(({ data }) => {
      Auth.setUserToken(data.token);
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: data.user
      });
    }, ({ response }) => {
      dispatch({
        type: SIGN_IN_FAIL,
        payload: response.data.errors
      });
    });
  };
}

export function logout() {
  Auth.removeUserToken();
  return {
    type: LOGOUT
  };
}

export function resetErrors() {
  return {
    type: RESET_ERRORS
  };
}

export function loadUser() {
  return (dispatch) => {
    dispatch({
      type: LOAD_USER
    });

    api.get('/custom', { headers: { Authorization: Auth.getUserToken() } }).then(({ data }) => {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data
      });
    }, () => {
      console.log('Not found');
    });
  };
}
