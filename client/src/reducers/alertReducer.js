import { ALERT_SUCCESS, ALERT_CLEAR, ALERT_ERROR } from '../constants/actionTypes';

const alert = (state = {}, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        type: 'alert-success',
        message: action.payload
      };
    case ALERT_ERROR:
      return {
        type: 'alert-danger',
        message: action.payload
      };
    case ALERT_CLEAR:
      return {};
    default:
      return state;
  }
};

export default alert;
