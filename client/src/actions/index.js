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
  FETCH_USER,
  CREATE_POST
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
        .get(`${ROOT_URL}/api/posts`)
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

export const fetchPostDetails = id => {
  return dispatch => {
    setTimeout(function () {
      axios
        .get(`${ROOT_URL}/api/posts/${id}`)
        .then(response => {
          dispatch({
            type: FETCH_POST_DETAILS,
            payload: response.data
          });
        });
    }, 0)
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

export const fetchUser = (id) => {
  return dispatch => {
    console.log("user response called:")
    axios
      .get(`${ROOT_URL}/api/users/${id}`)
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
    console.log("coll data:", title, description)
    axios
      .post(`${ROOT_URL}/api/posts`, { title, description }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: CREATE_POST,
          payload: response.data,
        });
        History.push(`/PostDetails/${response.data.id}`);
      })
      .catch(err => {
        console.log("error:", err.response);
      });
  }
};
