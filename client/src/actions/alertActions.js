import { ALERT_SUCCESS, ALERT_CLEAR, ALERT_ERROR } from '../constants/actionTypes';

const alertSuccess = message => (dispatch) => {
  return dispatch({ type: ALERT_SUCCESS, message });
};

const alertError = message => (dispatch) => {
  return dispatch({ type: ALERT_ERROR, message });
};

const alertClear = () => (dispatch) => {
  return dispatch({ type: ALERT_CLEAR });
};

export {
  alertSuccess,
  alertError,
  alertClear
};
