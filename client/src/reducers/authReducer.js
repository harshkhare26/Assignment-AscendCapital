import { CONSTANTS } from "../actions";

const initialState = { userID: null, isAuthenticated: false };
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SIGN_IN:
      return { userID: action.payload.userID, isAuthenticated: true };
    case CONSTANTS.SIGN_OUT:
      return { userID: null, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
