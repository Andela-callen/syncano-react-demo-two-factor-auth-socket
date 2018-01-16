import { REGISTER_SUCCESSFUL, REGISTER_UNSUCCESSFUL } from '../constants/actionTypes';

const initialState = {
  success: false
};

/**
 * @param {object} state
 * @param {object} action
 * @return {object} state - the new state
 */
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESSFUL:
      state = {
        ...state,
        success: true
      };
      break;
    case REGISTER_UNSUCCESSFUL:
      state = {
        ...state,
        success: false
      };
      break;
    default:
      return state;
  }
  return state;
};
export default registerReducer;
