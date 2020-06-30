import { FETCH_USER } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      const user = action.payload;
      return { ...state, user };
    default:
      return state;
  }
};
