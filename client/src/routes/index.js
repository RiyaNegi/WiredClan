import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "../components/app";
import Signin from "../components/auth/signin";
import Signout from "../components/auth/signout";
import Signup from "../components/auth/signup";
import UserForm from "../components/User/form";
import HomePage from "../components/HomePage";
import test from "../components/test";
import postDetails from "../components/Post/postDetails";
import Profile from "../components/User/Profile";
import CreatePost from "../components/Post/CreatePost";
import EditPost from "../components/Post/EditPost";
import pageNotFound from "../components/pageNotFound";
import Hackathon from "../components/hackathon/Hackathon";
import Community from "../components/communities/Community";

const Routes = () => {
  const profileData = JSON.parse(localStorage.getItem("profileData"));
  return (
    <App>
      <Switch>
        {/* <Route exact path="/hey" render={() => { window.location.href = "hey" }} /> */}
        {profileData && <Route exact path="/" component={HomePage} />}
        {!profileData && <Route exact path="/" render={() => { window.location.href = "hey/index.html" }} />}
        <Route exact path="/test" component={test} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/users/:id/form" component={UserForm} />
        <Route path="/signup" component={Signup} />
        <Route path="/previewPost/:id" component={postDetails} />
        <Route path="/home" component={HomePage} />
        <Route path="/CreatePost" component={CreatePost} />
        <Route path="/posts/:id/edit" component={EditPost} />
        <Route path="/users/:id" component={Profile} />
        <Route path="/hackathon" component={Hackathon} />
        <Route path="/community/:slug/" component={Community} />
        <Route path="/:slug/:id" component={postDetails} />
        <Route component={pageNotFound} />
      </Switch>
    </App>
  );
};

export default Routes;
