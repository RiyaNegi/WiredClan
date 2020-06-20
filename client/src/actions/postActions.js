import axios from "axios";
import slugify from "slugify";
import History from "../history.js";
import { DELETE_POST, FETCH_POSTS, FORCE_LOGOUT, ALERT } from "./types";

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
      axios.get(`${ROOT_URL}/api/posts?page=1`).then((response) => {
        dispatch({
          type: FETCH_POSTS,
          posts: response.data.result,
        });
      });
    }, 0);
  };
};
