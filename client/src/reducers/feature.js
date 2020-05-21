import { FETCH_FEATURE } from "../actions/types";

export const reducer = (state = {}, action) => {
  console.log("called FEATURE reducer", state);
  switch (action.type) {
    case FETCH_FEATURE:
      return { ...state, homePageFeatures: action.payload.result };
    default:
      return state;
  }
};
