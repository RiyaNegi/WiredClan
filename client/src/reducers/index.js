import { combineReducers } from "redux";
import { reducer as authReducer } from "./auth";
import { reducer as postReducer } from "./posts";
import { reducer as formReducer } from "redux-form";
import { reducer as postDetailsReducer } from "./postDetails";
import { reducer as leaderboardReducer } from "./leaderboard";
import { reducer as profileDetailsReducer } from "./profileDetails";
import { reducer as createPostReducer } from "./createPost";
import { reducer as hackathonReducer } from "./hackathon";


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  posts: postReducer,
  hackathon: hackathonReducer,
  postDetails: postDetailsReducer,
  leaderboard: leaderboardReducer,
  userDetails: profileDetailsReducer,
  createPost: createPostReducer,
});

export default rootReducer;
