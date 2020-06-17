import axios from "axios";
import History from "../history.js";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_POSTS,
  FETCH_POST_DETAILS,
  FETCH_ACCOUNT,
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  FETCH_USER,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  FETCH_SEARCH
} from "./types";


const ROOT_URL = "http://localhost:8000";

export const signinUser = ({ email, password }) => {
  return dispatch => {
    // submit email/password to the server
    axios
      .post(`${ROOT_URL}/auth/login`, { email, password })
      .then(response => {
        // if request is good...
        // - save the jwt token
        localStorage.setItem("token", response.data.token);
        // - redirect to the route '/posts'
        fetchAccount()(dispatch);
        History.push("/HomePage");

      })
      .catch(() => {
        // if request is bad...
        // - show an error to the user
        dispatch(authError("Bad Login Info"));
      });
  };
};

export const signupUser = ({ email, password }) => {
  return dispatch => {
    // submit email/password to the server
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        History.push("/posts");
      })
      .catch(err => {
        dispatch(authError(err.response.data.error));
      });
  };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const signoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("profileData");
  History.push("/HomePage");
  return {
    type: UNAUTH_USER
  };
};

export const fetchPosts = () => {
  return dispatch => {
    setTimeout(function () {
      axios
        .get(`${ROOT_URL}/api/posts?page=1`)
        .then(response => {
          console.log(response)
          dispatch({
            type: FETCH_POSTS,
            payload: response.data
          });
        });
    }, 0)
  }
};

export const fetchSearch = text => {
  return dispatch => {
    setTimeout(function () {
      axios
        .get(`${ROOT_URL}/api/posts?page=1&search=${text}`)
        .then(response => {
          console.log(response)
          dispatch({
            type: FETCH_SEARCH,
            payload: response.data
          });
        });
    }, 0)
  }
};

export const fetchPostDetails = (id) => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/posts/${id}`, localStorage.getItem("token") ? {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      } : {})
      .then(response => {
        dispatch({
          type: FETCH_POST_DETAILS,
          payload: response.data
        });
      })
      .catch(err => {
        console.log("error:", err.response || err);
      });

  };
};

export const fetchAccount = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/account`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }
      )
      .then(response => {
        console.log("account:", response);
        dispatch({
          type: FETCH_ACCOUNT,
          payload: response.data.user
        });
        dispatch({ type: AUTH_USER });
        localStorage.setItem("profileData", JSON.stringify(response.data.user));
      })
      .catch(error => {
        console.log("Account error:", error);
      });
  }
};

export const postComment = (postId, text, parentId) => {
  return (dispatch, getState) => {
    axios
      .post(`${ROOT_URL}/api/posts/${postId}/comments`, { postId, text, parentId }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        response.data.user = getState().auth.data;
        response.data.replyComments = [];
        dispatch({
          type: POST_COMMENT,
          payload: response.data,
        });
      })
      .catch(err => {
        console.log("error:", err.response);
      });

  }
};

export const updateComment = (postId, text, commentId) => {
  return (dispatch, getState) => {
    axios
      .post(`${ROOT_URL}/api/posts/${postId}/comments/${commentId}`, { postId, text, commentId }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        response.data.user = getState().auth.data;
        dispatch({
          type: UPDATE_COMMENT,
          payload: response.data
        });
      })
      .catch(err => {
        console.log("error:", err.response || err);
      });

  }
};

export const deleteComment = (postId, commentId, parentId) => {
  return (dispatch) => {
    console.log("delete action called", commentId)
    axios
      .delete(`${ROOT_URL}/api/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: DELETE_COMMENT,
          commentId,
          parentId
        });
      })
      .catch(err => {
        console.log("error:", err.response || err);
      });

  }
};

export const fetchUser = (id, draft) => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/users/${id}`, draft ? {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      } : {})
      .then(response => {
        dispatch({
          type: FETCH_USER,
          payload: response.data
        });
      });
  };
};

export const createPost = (title, published, description) => {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/api/posts`, { title, published, description }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: CREATE_POST,
          payload: response.data
        });
        History.push(`/postDetails/${response.data.id}`);
      })
      .catch(err => {
        console.log("error:", err.response);
      });
  }
};

export const updatePost = (postId, title, published, description) => {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/api/posts/${postId}`, { postId, title, published, description }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: UPDATE_POST,
          payload: response.data
        });
        History.push(`/postDetails/${response.data.id}`);
      })
      .catch(err => {
        console.log("error:", err.response);
      });
  }
};
export const deletePost = (postId) => {
  return (dispatch) => {
    axios
      .delete(`${ROOT_URL}/api/posts/${postId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: DELETE_POST,
          postId
        });
      })
      .catch(err => {
        console.log("error:", err);
      });
  }
};
