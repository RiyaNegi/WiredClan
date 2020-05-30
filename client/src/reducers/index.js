import { combineReducers } from "redux";
import { reducer as authReducer } from "./auth";
import { reducer as postReducer } from "./post";
import { reducer as formReducer } from "redux-form";
import { reducer as postDetailsReducer } from "./postDetails";
import { reducer as profileDetailsReducer } from "./profileDetails";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  posts: postReducer,
  postDetails: postDetailsReducer,
  userDetails: profileDetailsReducer
});

export default rootReducer;
