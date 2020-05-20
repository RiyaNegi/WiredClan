import React from "react";
import { Route } from "react-router-dom";
import App from "../components/app";
import RequireAuth from "../components/auth/require_auth";
import Signin from "../components/auth/signin";
import Signout from "../components/auth/signout";
import Signup from "../components/auth/signup";
import Feature from "../components/feature";
import HomePage from "../components/HomePage";
import postDetails from "../components/postDetails";

const Routes = () => {
  return (
    <App>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signout" component={Signout} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/postdetails" component={postDetails} />
      <Route exact path="/feature" component={RequireAuth(Feature)} />
    </App>
  );
};

export default Routes;
