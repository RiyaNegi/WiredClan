import request from "./request";
import { handleError } from "./handleError";
import {
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  FETCH_TAGS,
  FETCH_SEARCH
} from "./types";

export const postComment = (postId, text, parentId) => {
  return (dispatch, getState) => {
    request
      .post(
        `/api/posts/${postId}/comments`,
        { postId, text, parentId }
      )
      .then((response) => {
        response.data.user = getState().auth.data;
        response.data.replyComments = [];
        dispatch({
          type: POST_COMMENT,
          payload: response.data,
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const updateComment = (postId, text, commentId) => {
  return (dispatch, getState) => {
    request
      .post(
        `/api/posts/${postId}/comments/${commentId}`,
        { postId, text, commentId }
      )
      .then((response) => {
        response.data.user = getState().auth.data;
        dispatch({
          type: UPDATE_COMMENT,
          payload: response.data,
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const deleteComment = (postId, commentId, parentId) => {
  return (dispatch) => {
    request
      .delete(`/api/posts/${postId}/comments/${commentId}`)
      .then((response) => {
        dispatch({
          type: DELETE_COMMENT,
          commentId,
          parentId,
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const fetchTags = () => {
  return (dispatch) => {
    request
      .get(`/api/tags`)
      .then((response) => {
        dispatch({
          type: FETCH_TAGS,
          payload: response.data,
        });
      });
  }
};

export const fetchSearch = (text) => {
  return (dispatch) => {
    setTimeout(function () {
      request
        .get(`api/posts?page=1&search=${text}`)
        .then((response) => {
          console.log(response);
          dispatch({
            type: FETCH_SEARCH,
            payload: response.data,
          });
        });
    }, 0);
  };
};
