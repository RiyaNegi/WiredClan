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

export const signinUser = ({ email, password }, loc) => {
  return (dispatch) => {
    // submit email/password to the server
    request
      .post(`/api/auth/login`, { email, password })
      .then((response) => {
        // if request is good...
        // - save the jwt token
        localStorage.setItem("token", response.data.token);
        // - redirect to the route '/posts'
        if (loc) {
          fetchAccount(response.data.user.id, true, "hackathon")(dispatch);
          return
        }
        else {
          fetchAccount(response.data.user.id, true)(dispatch);
          return
        }
      })
      .catch(() => {
        // if request is bad...
        // - show an error to the user
        dispatch(authError("The email address or password is incorrect."));
      });
  };
};

export const signupUser = ({ email, password, firstName, lastName, college, year, mobile }, confirmPassword, loc) => {
  return (dispatch) => {
    request
      .post(`/api/auth/register`, { email, password, firstName, lastName, college, mobile, year: year ? year.value : undefined, confirmPassword })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        if (loc) {
          fetchAccount(response.data.user.id, true, "hackathon")(dispatch);
          return
        }
        else {
          fetchAccount(response.data.user.id, true)(dispatch);
          return
        }
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
        History.push("/home");
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
  { id, firstName, lastName, year, college, mobile, bio, avatar },
  redirect = `/users/${id}`, loc
) => {
  return (dispatch) => {
    request
      .patch(
        `/api/users/${id}`,
        { id, firstName, lastName, year, college, mobile, bio, avatar },
      )
      .then((response) => {
        dispatch({
          type: FETCH_ACCOUNT,
          payload: response.data,
        });
        localStorage.setItem("profileData", JSON.stringify(response.data));
        if (loc) {
          History.push(loc);
        }
        else {
          History.push(redirect);
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };
};

export const googleLogin = ({ email, accessToken, firstName, lastName }, loc) => {
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
        if (loc) {
          fetchAccount(response.data.user.id, true, "hackathon")(dispatch);
          return
        }
        else {
          fetchAccount(response.data.user.id, true)(dispatch);
          return
        }
      })
      .catch(() => {
        dispatch(authError("Something went wrong."));
      });
  };
};

export const fetchAccount = (id, redirect = false, loc) => {
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
            History.push({
              pathname: "/users/" + response.data.id + "/form",
              state: {
                redirectHomeAfterSubmit: true, loc: loc
              }
            });
          } else if (loc === "hackathon") {
            History.push("/hackathon");
          }
          else {
            History.push("/home")
          }
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };
};
