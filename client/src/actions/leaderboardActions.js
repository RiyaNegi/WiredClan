import request from "./request";
import { FETCH_TOP_CONTRIBUTORS } from "./types";

export const fetchTopContributors = () => {
  return (dispatch) => {
    request
      .get(`/api/users`)
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
