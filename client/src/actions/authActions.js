import History from "../history.js";
import request from "./request.js";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_ACCOUNT,
  FETCH_USER,
  FETCH_POSTS,
  RESET_POST_DETAILS,
} from "./types";

import { handleError } from "./handleError";

export const signinUser = ({ email, password }) => {
  return (dispatch) => {
    // submit email/password to the server
    request
      .post(`/api/auth/login`, { email, password })
      .then((response) => {
        // if request is good...
        // - save the jwt token
        localStorage.setItem("token", response.data.token);
        // - redirect to the route '/posts'
        fetchAccount(response.data.user.id, true)(dispatch);
        History.push("/");
      })
      .catch(() => {
        // if request is bad...
        // - show an error to the user
        dispatch(authError("Something went wrong."));
      });
  };
};

export const signupUser = ({ email, password, firstName, lastName, college, year }, confirmPassword) => {
  return (dispatch) => {
    request
      .post(`/api/auth/register`, { email, password, firstName, lastName, college, year: year ? year.value : undefined, confirmPassword })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        fetchAccount(response.data.user.id, true)(dispatch);
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
      .post(`/api/users/logout`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("profileData");
        localStorage.removeItem("auth");
        History.push("/");
        dispatch({
          type: UNAUTH_USER,
        });
      })
  };

};

export const fetchUser = (id, draft) => {
  return (dispatch) => {
    dispatch({
      type: RESET_POST_DETAILS,
    });
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
    console.log("Sending request as:", {
      email,
      accessToken,
      firstName,
      lastName,
    });
    request
      .post(`/api/auth/googleLogin`, {
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
        dispatch(authError("Something went wrong."));
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
            History.push("/");
          }
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };
};
