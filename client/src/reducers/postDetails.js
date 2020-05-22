import { FETCH_POST_DETAILS } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST_DETAILS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
