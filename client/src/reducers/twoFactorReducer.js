import {
  CHECK_TWO_FACTOR, SETUP_TWO_FACTOR, VERIFY_TWO_FACTOR_TOKEN, DISABLE_TWO_FACTOR
} from '../constants/actionTypes';

const initialState = {
  isTwoFactor: null,
  twoFactorDetails: null
};

/**
 * @param {object} state
 * @param {object} action
 * @return {object} state - the new state
 */
const twoFactorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_TWO_FACTOR:
      state = {
        ...state,
        isTwoFactor: action.payload
      };
      break;
    case SETUP_TWO_FACTOR:
      state = {
        ...state,
        twoFactorDetails: action.payload
      };
      break;
    case VERIFY_TWO_FACTOR_TOKEN:
      state = {
        ...state,
        twoFactorEnabled: action.payload
      };
      break;
    case DISABLE_TWO_FACTOR:
      state = {
        ...state,
        twoFactorEnabled: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};
export default twoFactorReducer;
