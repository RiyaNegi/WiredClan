import axios from "axios";
import History from "../history.js";
import {
  FETCH_POST_DETAILS,
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  CREATE_POST,
  UPDATE_POST,
  FETCH_SEARCH,
} from "./types";

const ROOT_URL = "http://localhost:8000";


export const fetchSearch = (text) => {
  return (dispatch) => {
    setTimeout(function () {
      axios
        .get(`${ROOT_URL}/api/posts?page=1&search=${text}`)
        .then((response) => {
          console.log(response);
          dispatch({
            type: FETCH_SEARCH,
            payload: response.data,
          });
        });
    }, 0);
  };
};

export const fetchPostDetails = (id) => {
  return (dispatch) => {
    axios
      .get(
        `${ROOT_URL}/api/posts/${id}`,
        localStorage.getItem("token")
          ? {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
          : {}
      )
      .then((response) => {
        dispatch({
          type: FETCH_POST_DETAILS,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log("error:", err.response || err);
      });
  };
};


export const postComment = (postId, text, parentId) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${ROOT_URL}/api/posts/${postId}/comments`,
        { postId, text, parentId },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        response.data.user = getState().auth.data;
        response.data.replyComments = [];
        dispatch({
          type: POST_COMMENT,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log("error:", err.response);
      });
  };
};

export const updateComment = (postId, text, commentId) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${ROOT_URL}/api/posts/${postId}/comments/${commentId}`,
        { postId, text, commentId },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        response.data.user = getState().auth.data;
        dispatch({
          type: UPDATE_COMMENT,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log("error:", err.response || err);
      });
  };
};

export const deleteComment = (postId, commentId, parentId) => {
  return (dispatch) => {
    console.log("delete action called", commentId);
    axios
      .delete(`${ROOT_URL}/api/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        dispatch({
          type: DELETE_COMMENT,
          commentId,
          parentId,
        });
      })
      .catch((err) => {
        console.log("error:", err.response || err);
      });
  };
};

export const createPost = (title, published, description) => {
  return (dispatch) => {
    axios
      .post(
        `${ROOT_URL}/api/posts`,
        { title, published, description },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        dispatch({
          type: CREATE_POST,
          payload: response.data,
        });
        History.push(`/postDetails/${response.data.id}`);
      })
      .catch((err) => {
        console.log("error:", err.response);
      });
  };
};

export const updatePost = (postId, title, published, description) => {
  return (dispatch) => {
    axios
      .post(
        `${ROOT_URL}/api/posts/${postId}`,
        { postId, title, published, description },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        dispatch({
          type: UPDATE_POST,
          payload: response.data,
        });
        History.push(`/postDetails/${response.data.id}`);
      })
      .catch((err) => {
        console.log("error:", err.response);
      });
  };
};
