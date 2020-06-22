import axios from "axios";
import slugify from "slugify";
import History from "../history.js";
import { DELETE_POST, FETCH_POSTS, FORCE_LOGOUT, ALERT, CREATE_LIKE, DELETE_LIKE, CREATE_POST_LIKE, DELETE_POST_LIKE, } from "./types";

const ROOT_URL = "http://localhost:8000";

export const deletePost = (postId) => {
  return (dispatch) => {
    axios
      .delete(`${ROOT_URL}/api/posts/${postId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        dispatch({
          type: DELETE_POST,
          postId,
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    setTimeout(function () {
      axios.get(`${ROOT_URL}/api/posts?page=1`, localStorage.getItem("token")
        ? {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
        : {})
        .then((response) => {
          dispatch({
            type: FETCH_POSTS,
            posts: response.data.result,
          });
        });
    }, 0);
  };
};

export const createLike = (postId) => {
  return (dispatch) => {
    setTimeout(function () {
      axios.post(`${ROOT_URL}/api/likes`, { postId },
        localStorage.getItem("token") ?
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
          : {})
        .then((response) => {
          dispatch({
            type: CREATE_LIKE,
            postId
          });
        });
    }, 0);
  };
};

export const deleteLike = (postId) => {
  return (dispatch) => {
    console.log("token :", localStorage.getItem("token"))
    axios.delete(`${ROOT_URL}/api/likes`, {
      data: { postId },
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        dispatch({
          type: DELETE_LIKE,
          postId
        });
      });
  };
};

export const createPostLike = (postId) => {
  return (dispatch) => {
    setTimeout(function () {
      axios.post(`${ROOT_URL}/api/likes`, { postId },
        localStorage.getItem("token") ?
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
          : {})
        .then((response) => {
          dispatch({
            type: CREATE_POST_LIKE,
            postId
          });
        });
    }, 0);
  };
};

export const deletePostLike = (postId) => {
  return (dispatch) => {
    console.log("token :", localStorage.getItem("token"))
    axios.delete(`${ROOT_URL}/api/likes`, {
      data: { postId },
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        dispatch({
          type: DELETE_POST_LIKE,
          postId
        });
      });
  };
};