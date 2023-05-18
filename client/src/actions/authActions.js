import { CONSTANTS } from "../actions";

export const signIn = (userID) => {
  return {
    type: CONSTANTS.SIGN_IN,
    payload: {
      userID,
    },
  };
};

export const signOut = () => {
  return {
    type: CONSTANTS.SIGN_OUT,
  };
};
