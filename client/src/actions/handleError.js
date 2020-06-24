import History from "../history.js";

export const handleError = (error) => {
  if (
    error.response &&
    error.response.data.err &&
    ["TokenExpiredError", "JsonWebTokenError"].includes(
      error.response.data.err.name
    )
  ) {
    History.push("/signout");
  } else {
    console.log("Error:", error.response || error);
  }
};
