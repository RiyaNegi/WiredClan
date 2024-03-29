import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from "../actions/types";
import { FETCH_ACCOUNT } from "../actions/types"

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: "", authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false, data: {} };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_ACCOUNT:
      return { ...state, data: action.payload }
    default:
      return state;
  }
};
