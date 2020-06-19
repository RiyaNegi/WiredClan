import { FETCH_TOP_CONTRIBUTORS } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TOP_CONTRIBUTORS:
      return { ...state, topContributors: action.topContributors };
    default:
      return state;
  }
};
