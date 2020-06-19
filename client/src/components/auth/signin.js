/* eslint-disable react-app/react/jsx-no-undef */
import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import { connect } from "react-redux";
import "./auth.css";
import croodSignin from "./Signin.png";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { GoogleLogin } from "react-google-login";

class Signin extends PureComponent {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <string>Oops! {this.props.errorMessage}</string>
        </div>
      );
    }
  }

  responseGoogle(response) {
    console.log("FOROM GOOOOGLE", response);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signin-back">
        <div className="yellow-bg"></div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="sign-box">
            <fieldset className="form-group sign-text">
              <label>Email:</label>
              <Field
                className="form-control "
                name="email"
                component="input"
                type="text"
              />
            </fieldset>
            <fieldset className="form-group sign-text">
              <label>Password:</label>
              <Field
                className="form-control"
                name="password"
                component="input"
                type="password"
              />
            </fieldset>
            {this.renderError()}
            <button action="submit" className="btn site-button">
              Sign in
            </button>
            <div style={{ marginLeft: 11, marginTop: 8 }}>
              Don't have an account? Click here to{" "}
              <Link to="/signup">Sign up</Link>
            </div>
            <GoogleLogin
              clientId="967814823791-iohjqrepre2s3pbo5eds8ods6fce086c.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            ,
          </div>
        </form>
        <div className="signin-image">
          <img
            src={croodSignin}
            style={{ width: 350, height: 270 }}
            alt="userIcon"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: "signin",
})(connect(mapStateToProps, actions)(Signin));
