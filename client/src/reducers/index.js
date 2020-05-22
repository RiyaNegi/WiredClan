import { combineReducers } from "redux";
import { reducer as authReducer } from "./auth";
import { reducer as postReducer } from "./post";
import { reducer as formReducer } from "redux-form";
import { reducer as postDetailsReducer } from "./postDetails";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  posts: postReducer,
  postDetails: postDetailsReducer
});

export default rootReducer;
