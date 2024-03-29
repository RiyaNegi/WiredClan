import slugify from "slugify";
import History from "../history.js";
import { handleError } from "./handleError";
import request from "./request";

import {
    CREATE_HACKATHON_POST, FETCH_HACKATHON_DETAILS, SET_LOADING, DELETE_HACKATHON_POST
} from "./types";

export const createHackathonPost = (title, published, tagId, hackathonId, ideaCode) => {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING,
            isLoading: true
        });
        request
            .post(
                `/api/posts`,
                { title, published, tagId, hackathonId, ideaCode },
            )
            .then((response) => {
                dispatch({
                    type: CREATE_HACKATHON_POST,
                    payload: response.data,
                });
                History.push("/hackathon")
                History.go();
            })
            .catch((error) => {
                handleError(error);
            });
    };
};

export const createIdeathonPost = (title, published, tagId, hackathonId, ideaCode) => {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING,
            isLoading: true
        });
        request
            .post(
                `/api/posts`,
                { title, published, tagId, hackathonId, ideaCode },
            )
            .then((response) => {
                dispatch({
                    type: CREATE_HACKATHON_POST,
                    payload: response.data,
                });
                History.push("/flamingo")
                History.go();
            })
            .catch((error) => {
                handleError(error);
            });
    };
};

export const fetchHackathonDetails = () => {
    return (dispatch) => {
        request
            .get(
                `/api/hackathons/WINTER-DEC-2020`
            )
            .then((response) => {
                dispatch({
                    type: FETCH_HACKATHON_DETAILS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                handleError(error);
            });
    };
};

export const fetchIdeathonDetails = () => {
    return (dispatch) => {
        request
            .get(
                `/api/hackathons/FLAM-NOV-2020`
            )
            .then((response) => {
                dispatch({
                    type: FETCH_HACKATHON_DETAILS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                handleError(error);
            });
    };
};

export const deleteHackathonPost = (postId) => {
    return (dispatch) => {
        request
            .delete(`/api/posts/${postId}`)
            .then((response) => {
                dispatch({
                    type: DELETE_HACKATHON_POST,
                    postId,
                });
            })
            .catch((error) => {
                handleError(error);
            });
    };
};