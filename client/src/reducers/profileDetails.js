import { FETCH_USER } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};