import Syncano from 'syncano-client';
import * as actionTypes from '../constants/actionTypes';
import { handle401 } from '../utils/helpers';

const s = new Syncano(process.env.SYNCANO_INSTANCE);

/**
 * @param {object} userDetails
 * @param {object} history
 * @return {void}
 */
const loginAction = (userDetails, history) => (dispatch) => {
  s.post('two-factor-auth/login', userDetails)
    .then((user) => {
      if (user.message) {
        dispatch({ type: actionTypes.LOGIN_SHOW_OTP });
      } else {
        sessionStorage.setItem('token', user.token);
        sessionStorage.setItem('username', user.username);
        dispatch({ type: actionTypes.LOGIN_SUCCESSFUL, payload: user });
        history.push('/dashboard');
      }
    })
    .catch((err) => {
      dispatch({ type: actionTypes.LOGIN_UNSUCCESSFUL });
      dispatch({ type: actionTypes.ALERT_ERROR, payload: err.response.data.message });
    });
};

/**
 * @param {object} userDetails
 * @param {object} history
 * @return {void}
 */
const registerAction = (userDetails, history) => (dispatch) => {
  s.post('rest-auth/register', userDetails)
    .then((user) => {
      sessionStorage.setItem('token', user.token);
      sessionStorage.setItem('username', userDetails.username);
      dispatch({ type: actionTypes.REGISTER_SUCCESSFUL });
      dispatch({ type: actionTypes.LOGIN_SUCCESSFUL, payload: user });
      history.push('/dashboard');
    })
    .catch((err) => {
      dispatch({ type: actionTypes.REGISTER_SUCCESSFUL });
      dispatch({ type: actionTypes.ALERT_ERROR, payload: err.response.data.username });
    });
};

/**
 * On logout refresh user token then clear sessionStorage
 * @param {object} history
 * @return {void}
 */
const logoutAction = history => (dispatch) => {
  s.post('rest-auth/refresh', {
    _user_key: sessionStorage.getItem('token')
  })
    .then(() => {
      dispatch({ type: actionTypes.LOGOUT });
      handle401(history);
    });
};

export {
  loginAction,
  registerAction,
  logoutAction
};
