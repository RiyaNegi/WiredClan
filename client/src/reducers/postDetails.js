import { FETCH_POST_DETAILS } from "../actions/types";
import { POST_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST_DETAILS:
      return {
        ...state,
        details: { ...action.payload, comments: null },
        comments: action.payload.comments,
        description: action.payload.description
      };
    case POST_COMMENT:
      let newState = JSON.parse(JSON.stringify(state));
      if (action.payload.parentId) {
        newState.comments
          .find(comment => comment.id === action.payload.parentId).replyComments
          .push(action.payload);
      } else {
        newState.comments.unshift(action.payload);
      }
      return newState;
    case UPDATE_COMMENT:
      let newEditState = JSON.parse(JSON.stringify(state));
      var arrIndex;
      if (action.payload.parentId) {
        arrIndex = newEditState.comments
          .find(comment => comment.id === action.payload.parentId).replyComments
          .findIndex(i => i.id === action.payload.id);
        newEditState.comments
          .find(comment => comment.id === action.payload.parentId).replyComments
          .splice(arrIndex, 1, action.payload);
      } else {
        arrIndex = newEditState.comments.findIndex(i => i.id === action.payload.id);
        newEditState.comments.splice(arrIndex, 1, action.payload);
      }
      return newEditState;
    case DELETE_COMMENT:
      // eslint-disable-next-line no-redeclare
      var arrIndex;
      debugger;
      let newDelState = JSON.parse(JSON.stringify(state));
      if (action.parentId) {
        arrIndex = newDelState.comments
          .find(comment => comment.id === action.parentId).replyComments
          .findIndex(i => i.id === action.commentId);
        newDelState.comments
          .find(comment => comment.id === action.parentId).replyComments
          .splice(arrIndex, 1);
      } else {
        arrIndex = newDelState.comments.findIndex(i => i.id === action.commentId);
        newDelState.comments.splice(arrIndex, 1);
      }
      return newDelState;
    default:
      return state;
  }
};
