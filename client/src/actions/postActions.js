import slugify from "slugify";
import History from "../history.js";
import { handleError } from "./handleError";
import request from "./request";

import {
  CREATE_POST, DELETE_POST, FETCH_POSTS, FETCH_POST_DETAILS, UPDATE_POST, CREATE_LIKE, DELETE_LIKE,
  CREATE_POST_LIKE, DELETE_POST_LIKE, FETCH_EMAIL_USER
} from "./types";

export const createPost = (title, published, description, tagId) => {
  return (dispatch) => {
    request
      .post(
        `/api/posts`,
        { title, published, description, tagId },
      )
      .then((response) => {
        dispatch({
          type: CREATE_POST,
          payload: response.data,
        });
        History.push(`/${slugify(response.data.title)}/${response.data.id}`);
        var redirectUrl = published ? { pathname: `/${slugify(response.data.title)}/${response.data.id}`, state: { draft: false } }
          : { pathname: `/users/${response.data.user.id}`, state: { draft: true } }
        History.push(redirectUrl);
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const fetchPost = (id) => {
  return (dispatch) => {
    request
      .get(
        `/api/posts/${id}`
      )
      .then((response) => {
        dispatch({
          type: FETCH_POST_DETAILS,
          payload: response.data,
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    request
      .delete(`/api/posts/${postId}`)
      .then((response) => {
        dispatch({
          type: DELETE_POST,
          postId,
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    request.get(`/api/posts?page=1`)
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

export const fetchEmailUser = (emailId) => {
  return (dispatch) => {
    request.get(`/api/users/${emailId}`)
      .then((response) => {
        dispatch({
          type: FETCH_EMAIL_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
}

export const createLike = (postId) => {
  return (dispatch) => {
    request.post(`/api/likes`, { postId })
      .then((response) => {
        dispatch({
          type: CREATE_LIKE,
          postId
        });
      })
      .catch((error) => {
        handleError(error);
      });;

  };
};

export const updatePost = (postId, title, published, description, tagId) => {
  return (dispatch) => {
    request
      .post(
        `/api/posts/${postId}`,
        { postId, title, published, description, tagId }
      )
      .then((response) => {
        dispatch({
          type: UPDATE_POST,
          payload: response.data,
        });
        var redirectUrl = published ? { pathname: `/${slugify(response.data.title)}/${response.data.id}`, state: { draft: false } }
          : { pathname: `/users/${response.data.user.id}`, state: { draft: true } }
        History.push(redirectUrl);
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const deleteLike = (postId) => {
  return (dispatch) => {
    request.delete(`/api/likes`, {
      data: { postId },
    })
      .then((response) => {
        dispatch({
          type: DELETE_LIKE,
          postId
        });
      })
      .catch((error) => {
        handleError(error);
      });;
  };
};

export const createPostLike = (postId) => {
  return (dispatch) => {
    request.post(`/api/likes`, { postId })
      .then((response) => {
        dispatch({
          type: CREATE_POST_LIKE,
          postId
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const deletePostLike = (postId) => {
  return (dispatch) => {
    request.delete(`/api/likes`, {
      data: { postId },
    })
      .then((response) => {
        dispatch({
          type: DELETE_POST_LIKE,
          postId
        });
      })
      .catch((error) => {
        handleError(error);
      });;
  };
};