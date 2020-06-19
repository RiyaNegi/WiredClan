import axios from "axios";
import History from "../history.js";
import { FETCH_TOP_CONTRIBUTORS } from "./types";

const ROOT_URL = "http://localhost:8000";

export const fetchTopContributors = () => {
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/users`)
      .then((response) => {
        dispatch({
          type: FETCH_TOP_CONTRIBUTORS,
          topContributors: response.data.result,
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };
};
