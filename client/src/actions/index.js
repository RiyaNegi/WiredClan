import axios from "axios";
import History from "../history.js";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_POSTS,
  FETCH_POST_DETAILS
} from "./types";
import HomePage from "../components/hoomePage.js";

const ROOT_URL = "http://localhost:8000";

export const signinUser = ({ email, password }) => {
  return dispatch => {
    // submit email/password to the server
    axios
      .post(`${ROOT_URL}/auth/login`, { email, password })
      .then(response => {
        // if request is good...
        // - update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - save the jwt token
        localStorage.setItem("token", response.data.token);
        // - redirect to the route '/posts'
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
  return { type: UNAUTH_USER };
};

export const fetchPosts = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/posts`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: FETCH_POSTS,
          payload: response.data
        });
      });
  };
};

export const fetchPostDetails = id => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/posts/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        console.log("response:", response);
        dispatch({
          type: FETCH_POST_DETAILS,
          payload: response.data
        });
      });
  };
};


