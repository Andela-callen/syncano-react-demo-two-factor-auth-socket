import Syncano from 'syncano-client';
import * as actionTypes from '../constants/actionTypes';
import history from '../utils/history';
import { handle401 } from '../utils/helpers';

const s = new Syncano(process.env.SYNCANO_INSTANCE);

const checkTwoFactorAction = () => (dispatch) => {
  s.post('two-factor-auth/check_two_factor', {
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token')
  })
    .then((data) => {
      dispatch({ type: actionTypes.CHECK_TWO_FACTOR, payload: data.is_two_factor });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({ type: actionTypes.LOGOUT });
        handle401();
      } else {
        dispatch({ type: actionTypes.CHECK_TWO_FACTOR, payload: false });
      }
    });
};

const setUpTwoFactorAction = () => (dispatch) => {
  s.post('two-factor-auth/setup_two_factor', {
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token')
  })
    .then((data) => {
      dispatch({ type: actionTypes.SETUP_TWO_FACTOR, payload: data });
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({ type: actionTypes.LOGOUT });
        handle401();
      } else {
        dispatch({ type: actionTypes.ALERT_ERROR, payload: err.response.data.message });
      }
    });
};

const verifyTwoFactorTokenAction = twoFactorToken => (dispatch) => {
  s.post('two-factor-auth/verify_token', {
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token'),
    two_factor_token: twoFactorToken
  })
    .then(() => {
      dispatch({ type: actionTypes.VERIFY_TWO_FACTOR_TOKEN, payload: true });
      history.push('/');
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({ type: actionTypes.LOGOUT });
        handle401();
      } else {
        dispatch({ type: actionTypes.ALERT_ERROR, payload: err.response.data.message });
      }
    });
};

const disableTwoFactorAction = twoFactorToken => (dispatch) => {
  s.post('two-factor-auth/disable_two_factor', {
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token'),
    two_factor_token: twoFactorToken
  })
    .then(() => {
      dispatch({ type: actionTypes.DISABLE_TWO_FACTOR, payload: false });
      history.push('/');
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({ type: actionTypes.LOGOUT });
        handle401();
      } else {
        dispatch({ type: actionTypes.ALERT_ERROR, payload: err.response.data.message });
      }
    });
};

export {
  checkTwoFactorAction,
  setUpTwoFactorAction,
  verifyTwoFactorTokenAction,
  disableTwoFactorAction
};
