import { FETCH_USER, DELETE_POST } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      const user = action.payload;
      return { ...state, user, posts: user.posts, drafts: user.drafts };
    case DELETE_POST:
      debugger;
      let newDelStatePost = JSON.parse(JSON.stringify(state.user.posts));
      let arrPostIndex = newDelStatePost
        .findIndex(i => i.id === action.postId);
      if (arrPostIndex >= 0) {
        newDelStatePost.splice(arrPostIndex, 1);
      }
      let newDelStateDrafts = JSON.parse(JSON.stringify(state.user.drafts));
      let arrDraftIndex = newDelStateDrafts
        .findIndex(i => i.id === action.postId);
      newDelStateDrafts.splice(arrDraftIndex, 1);
      if (arrDraftIndex >= 0) {
        newDelStateDrafts.splice(arrDraftIndex, 1);
      }
      return { ...state, posts: newDelStatePost, drafts: newDelStateDrafts }
    default:
      return state;
  }
};