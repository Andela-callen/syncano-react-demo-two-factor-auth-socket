import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import twoFactorReducer from './twoFactorReducer';

export default combineReducers({
  alertReducer,
  loginReducer,
  registerReducer,
  twoFactorReducer
});
