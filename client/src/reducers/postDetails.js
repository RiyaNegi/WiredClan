import { FETCH_POST_DETAILS } from "../actions/types";
import { POST_COMMENT } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST_DETAILS:
      return {
        ...state,
        details: { ...action.payload, comments: null },
        comments: action.payload.comments
      };
    case POST_COMMENT:
      let newState = JSON.parse(JSON.stringify(state));
      if (action.payload.parentId) {
        newState.comments.find(comment => comment.id === action.payload.parentId).replyComments.push(action.payload);
      } else {
        newState.comments.push(action.payload);
      }
      return newState;
    default:
      return state;
  }
};
