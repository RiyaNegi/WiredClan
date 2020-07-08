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
import Hackathon from "../components/Hackathon";


const Routes = () => {
  return (
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/test" component={test} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/users/:id/form" component={UserForm} />
        <Route path="/signup" component={Signup} />
        <Route path="/previewPost/:id" component={postDetails} />
        <Route path="/HomePage" component={HomePage} />
        <Route path="/CreatePost" component={CreatePost} />
        <Route path="/posts/:id/edit" component={EditPost} />
        <Route path="/users/:id" component={Profile} />
        <Route path="/:slug/:id" component={postDetails} />
        <Route path="/Hackathon" component={Hackathon} />
        <Route component={pageNotFound} />
      </Switch>
    </App>
  );
};

export default Routes;
