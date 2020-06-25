import History from "../history.js";
import request from "./request.js";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_ACCOUNT,
  FETCH_USER,
  FETCH_POSTS,
} from "./types";

import { handleError } from "./handleError";

const ROOT_URL = "http://localhost:8000";

export const signinUser = ({ email, password }) => {
  return (dispatch) => {
    // submit email/password to the server
    request
      .post(`/auth/login`, { email, password })
      .then((response) => {
        // if request is good...
        // - save the jwt token
        localStorage.setItem("token", response.data.token);
        // - redirect to the route '/posts'
        fetchAccount(response.data.user.id, true)(dispatch);
        History.push("/HomePage");
      })
      .catch(() => {
        // if request is bad...
        // - show an error to the user
        dispatch(authError("Bad Login Info"));
      });
  };
};

export const signupUser = ({ email, password, FirstName, LastName, college, year }) => {
  return (dispatch) => {
    // submit email/password to the server
    request
      .post(`/auth/register`, { email, password, FirstName, LastName, college, year })
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        History.push("/");
      })
      .catch((err) => {
        dispatch(authError(err.response.data.error));
      });
  };
};

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

export const signoutUser = () => {

  return (dispatch) => {

    request
      .post(`/api/logout`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("profileData");
        History.push("/HomePage");
        dispatch({
          type: UNAUTH_USER,
        });
      })
  };

};

export const fetchUser = (id, draft) => {
  return (dispatch) => {
    request
      .get(
        `/api/users/${id}`
      )
      .then((response) => {
        dispatch({
          type: FETCH_USER,
          payload: response.data,
        });
        dispatch({
          type: FETCH_POSTS,
          posts: response.data.posts,
          drafts: response.data.drafts,
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const updateUser = (
  { id, firstName, lastName, year, college },
  redirect = `/users/${id}`
) => {
  return (dispatch) => {
    request
      .patch(
        `/api/users/${id}`,
        { id, firstName, lastName, year, college },
      )
      .then((response) => {
        dispatch({
          type: FETCH_ACCOUNT,
          payload: response.data,
        });
        localStorage.setItem("profileData", JSON.stringify(response.data));
        History.push(redirect);
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const googleLogin = ({ email, accessToken, firstName, lastName }) => {
  return (dispatch) => {
    request
      .post(`/auth/googleLogin`, {
        email,
        accessToken,
        firstName,
        lastName,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        fetchAccount(response.data.user.id, true)(dispatch);
      })
      .catch(() => {
        dispatch(authError("Bad Login Info"));
      });
  };
};

// TODO: Remove.
export const fetchAccount = (id, redirect = false) => {
  return (dispatch) => {
    request
      .get(`/api/users/${id}`)
      .then((response) => {
        dispatch({
          type: FETCH_ACCOUNT,
          payload: response.data,
        });
        dispatch({ type: AUTH_USER });
        localStorage.setItem("profileData", JSON.stringify(response.data));
        if (redirect) {
          if (!response.data.college || !response.data.year) {
            History.push("/users/" + response.data.id + "/form", {
              redirectHomeAfterSubmit: true,
            });
          } else {
            History.push("/HomePage");
          }
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };
};
