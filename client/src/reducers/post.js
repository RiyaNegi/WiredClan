import { FETCH_POSTS, FETCH_SEARCH } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, homePage: action.payload.result };
    case FETCH_SEARCH:
      return { ...state, homePage: action.payload.result };
    default:
      return state;
  }
};
