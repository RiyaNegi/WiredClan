import { FETCH_USER, DELETE_POST } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      const user = action.payload;
      return { ...state, user };
    default:
      return state;
  }
};
