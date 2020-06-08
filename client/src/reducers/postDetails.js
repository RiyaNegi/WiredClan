import { FETCH_POST_DETAILS } from "../actions/types";
import { POST_COMMENT, UPDATE_COMMENT } from "../actions/types";

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
    case UPDATE_COMMENT:
      let newEditState = JSON.parse(JSON.stringify(state));
      let arr = newEditState.comments.indexOf(action.payload.id)
      if (action.payload.parentId) {
        newEditState.comments.find(comment => comment.id === action.payload.parentId).replyComments.splice(arr, 1, action.payload);
      } else {
        newEditState.comments.splice(arr, 1, action.payload);
      }
      return newEditState;
    default:
      return state;
  }
};
