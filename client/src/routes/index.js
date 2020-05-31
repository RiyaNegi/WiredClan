import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "../components/app";
import RequireAuth from "../components/auth/require_auth";
import Signin from "../components/auth/signin";
import Signout from "../components/auth/signout";
import Signup from "../components/auth/signup";
import HomePage from "../components/HomePage";
import postDetails from "../components/postDetails";
import Profile from "../components/Profile";


const Routes = () => {
  return (
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/postdetails/:id" component={postDetails} />
        <Route path="/HomePage" component={HomePage} />
        <Route path="/Users/:id" component={Profile} />
      </Switch>
    </App>
  );
};

export default Routes;
