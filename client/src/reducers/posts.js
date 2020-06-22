import { FETCH_POSTS, FETCH_SEARCH, DELETE_POST, CREATE_LIKE, DELETE_LIKE } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.posts, drafts: action.drafts };
    case FETCH_SEARCH:
      return { ...state, posts: action.posts, drafts: action.drafts };
    case DELETE_POST:
      let newDelStatePost = JSON.parse(JSON.stringify(state.posts));
      let arrPostIndex = newDelStatePost.findIndex(
        (i) => i.id === action.postId
      );
      if (arrPostIndex >= 0) {
        newDelStatePost.splice(arrPostIndex, 1);
      }
      let newDelStateDrafts = JSON.parse(JSON.stringify(state.drafts));
      let arrDraftIndex = newDelStateDrafts.findIndex(
        (i) => i.id === action.postId
      );
      newDelStateDrafts.splice(arrDraftIndex, 1);
      if (arrDraftIndex >= 0) {
        newDelStateDrafts.splice(arrDraftIndex, 1);
      }
      return { ...state, posts: newDelStatePost, drafts: newDelStateDrafts };
    case CREATE_LIKE:
      let newLikeState = JSON.parse(JSON.stringify(state));
      var arrIndex = newLikeState.posts.findIndex(
        (i) => i.id === action.postId
      );
      let arr = state.posts[arrIndex];
      arr.likesCount += 1;
      arr.likedByCurrentUser = true;
      newLikeState.posts.splice(arrIndex, 1, arr);
      return newLikeState;
    case DELETE_LIKE:
      newLikeState = JSON.parse(JSON.stringify(state));
      arrIndex = newLikeState.posts.findIndex(
        (i) => i.id === action.postId
      );
      arr = state.posts[arrIndex];
      arr.likesCount -= 1;
      arr.likedByCurrentUser = false;
      newLikeState.posts.splice(arrIndex, 1, arr);
      return newLikeState;
    default:
      return state;
  }
};


