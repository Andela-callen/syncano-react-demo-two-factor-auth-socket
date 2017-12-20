import Syncano from 'syncano-client';
import * as actionTypes from '../constants/actionTypes';
import { handle401 } from '../utils/helpers';

const s = new Syncano(process.env.SYNCANO_INSTANCE);

const checkTwoFactorAction = history => (dispatch) => {
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
        handle401(history);
      } else {
        dispatch({ type: actionTypes.CHECK_TWO_FACTOR, payload: false });
      }
    });
};

const setUpTwoFactorAction = history => (dispatch) => {
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
        handle401(history);
      } else {
        dispatch({ type: actionTypes.ALERT_ERROR, payload: err.response.data.message });
      }
    });
};

const verifyTwoFactorTokenAction = (twoFactorToken, history) => (dispatch) => {
  s.post('two-factor-auth/verify_token', {
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token'),
    two_factor_token: twoFactorToken
  })
    .then(() => {
      dispatch({ type: actionTypes.VERIFY_TWO_FACTOR_TOKEN, payload: true });
      history.push('/dashboard');
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({ type: actionTypes.LOGOUT });
        handle401(history);
      } else {
        dispatch({ type: actionTypes.ALERT_ERROR, payload: err.response.data.message });
      }
    });
};

const disableTwoFactorAction = (twoFactorToken, history) => (dispatch) => {
  s.post('two-factor-auth/disable_two_factor', {
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token'),
    two_factor_token: twoFactorToken
  })
    .then(() => {
      dispatch({ type: actionTypes.DISABLE_TWO_FACTOR, payload: false });
      history.push('/dashboard');
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch({ type: actionTypes.LOGOUT });
        handle401(history);
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
