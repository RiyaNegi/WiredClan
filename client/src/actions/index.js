import request from "./request";
import { handleError } from "./handleError";
import {
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  FETCH_TAGS,
  FETCH_TAG,
  FETCH_SEARCH,
  FETCH_POSTS,
  FETCH_TOP_CONTRIBUTORS,
  RESET_POSTS,
  RESET_TOP_CONTRIBUTORS
} from "./types";

export const resetPosts = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_POSTS
    });
  };
};

export const resetTopContributors = (id, draft) => {
  return (dispatch) => {
    dispatch({
      type: RESET_TOP_CONTRIBUTORS
    });
  };
};

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


export const fetchTagPosts = (tagId) => {
  return (dispatch) => {
    request.get(`/api/posts?page=1&tagId=${tagId}`)
      .then((response) => {
        dispatch({
          type: FETCH_POSTS,
          posts: response.data.result,
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const fetchTagTopContributors = (tagId) => {
  return (dispatch) => {
    request
      .get(`/api/users?tagId=${tagId}`)
      .then((response) => {
        dispatch({
          type: FETCH_TOP_CONTRIBUTORS,
          topContributors: response.data.result,
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };
};

export const fetchTag = (community) => {
  return (dispatch) => {
    request
      .get(`/api/tags/${community}`)
      .then((response) => {
        dispatch({
          type: FETCH_TAG,
          payload: response.data,
        });
        fetchTagPosts(response.data.id)(dispatch);
        fetchTagTopContributors(response.data.id)(dispatch);
      });
  }
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
          dispatch({
            type: FETCH_SEARCH,
            payload: response.data,
          });
        });
    }, 0);
  };
};
