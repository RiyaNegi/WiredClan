import { FETCH_POSTS } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, homePage: action.payload.result };
    default:
      return state;
  }
};
