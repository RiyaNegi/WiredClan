import axios from "axios";
import History from "../history.js";
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_ACCOUNT,
    FETCH_USER,
    FETCH_POSTS,
} from "./types";


const ROOT_URL = "http://localhost:8000";

export const signinUser = ({ email, password }) => {
    return (dispatch) => {
        // submit email/password to the server
        axios
            .post(`${ROOT_URL}/auth/login`, { email, password })
            .then((response) => {
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
    return (dispatch) => {
        // submit email/password to the server
        axios
            .post(`${ROOT_URL}/signup`, { email, password })
            .then((response) => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem("token", response.data.token);
                History.push("/posts");
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
    localStorage.removeItem("token");
    localStorage.removeItem("profileData");
    History.push("/HomePage");
    return {
        type: UNAUTH_USER,
    };
};


export const fetchUser = (id, draft) => {
    return (dispatch) => {
        axios
            .get(
                `${ROOT_URL}/api/users/${id}`,
                draft
                    ? {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                    : {}
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
            });
    };
};

export const googleLogin = (email, accessToken) => {
    console.log("google login :", email, accessToken)
    return (dispatch) => {
        axios
            .post(`${ROOT_URL}/auth/googleLogin`, { email, accessToken })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                fetchAccount()(dispatch);
                History.push("/HomePage");
            })
            .catch(() => {
                dispatch(authError("Bad Login Info"));
            });
    };
}

export const fetchAccount = () => {
    return (dispatch) => {
        axios
            .get(`${ROOT_URL}/api/account`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            })
            .then((response) => {
                console.log("account:", response);
                dispatch({
                    type: FETCH_ACCOUNT,
                    payload: response.data.user,
                });
                dispatch({ type: AUTH_USER });
                localStorage.setItem("profileData", JSON.stringify(response.data.user));
            })
            .catch((error) => {
                console.log("Account error:", error);
            });
    };
};
