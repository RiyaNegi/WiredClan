import History from "../history.js";

export const handleError = (error) => {
  debugger;
  if (
    error.response &&
    ["TokenExpiredError", "JsonWebTokenError", "ExpiredCookie"].includes(
      error.response.data.error
    )
  ) {
    History.push("/signout");
  } else {
    console.log("Error:", error.response || error);
  }
};
