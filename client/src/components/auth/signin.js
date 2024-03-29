import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";
import "./auth.css";
import googleIcon from "./googleIcon.png";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import History from "../../history.js";

class Signin extends PureComponent {
  handleFormSubmit({ email, password }) {
    if (this.props.location.state && this.props.location.state.loc) {
      this.props.signinUser({ email, password }, this.props.location.state.loc);
      return
    }
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

  responseGoogle = (response) => {
    if (this.props.location.state && this.props.location.state.loc) {
      this.props.googleLogin({
        accessToken: response.accessToken,
        email: response.profileObj.email,
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
      }, this.props.location.state.loc);
    }
    else {
      this.props.googleLogin({
        accessToken: response.accessToken,
        email: response.profileObj.email,
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
      });

    }
  };

  email = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "Invalid email address"
      : undefined
  required = (value) =>
    value || typeof value === "number" ? undefined : "Required"

  renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <React.Fragment>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />
      {touched &&
        ((error && (
          <span className="text-danger signin-text-error">
            {error}
          </span>
        )) ||
          (warning && <span className="text-danger signin-text-error">{warning}</span>))}
    </React.Fragment>
  )

  render() {
    const { handleSubmit } = this.props;
    let location = (this.props.location.state && this.props.location.state.loc) ? "hackathon" : null
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="col-12 col-md-6 p-4 d-flex justify-self-center mt-5 column flex-column sign-box">
            <label className="mt-3 d-flex justify-content-center signin-heading">Sign in to your account</label>
            <fieldset className="mt-4 form-group sign-text">
              <label>Email:</label>
              <Field
                className="form-control"
                name="email"
                component={this.renderField}
                type="text"
                validate={[this.required, this.email]}
              />
            </fieldset>
            <fieldset className="form-group sign-text">
              <label>Password:</label>
              <Field
                className="form-control"
                name="password"
                component={this.renderField}
                type="password"
                validate={[this.required]}
              />
            </fieldset>
            {this.renderError()}
            <div className="d-flex justify-content-center">
              <button action="submit" className="col-5 sign-button button-7 mt-3" id="button-7">
                <div id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" /></div>
                Sign in
            </button>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <GoogleLogin
                clientId="967814823791-iohjqrepre2s3pbo5eds8ods6fce086c.apps.googleusercontent.com"
                render={renderProps => (
                  <button className="d-flex justify-content-center mt-2 pr-2 google-login" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <img
                      className="float-left googleIcon-img"
                      src={googleIcon}
                      style={{ width: 35, height: 35, borderRadius: 50, marginTop: '2px' }}
                      alt="userIcon"
                    />
                    <label className=" mt-2 ml-2">  Sign in with Google</label></button>
                )}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="d-flex justify-content-center mt-3" style={{ marginLeft: 11 }}>
              Don't have an account? Click here to {" "}
              <Link className="ml-1" to={{ pathname: '/signup', state: { loc: location } }}
              >{" "} Sign up</Link>
            </div>
          </div>
        </form>
        {/* <div className="d-none col-12 d-flex flex-end signin-image">
          <img
            className="d-none d-md-block"
            src={humaaans}
            style={{ width: 350, height: 470 }}
            alt="userIcon"
          />
        </div> */}
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: "signin",
})(connect(mapStateToProps, authActions)(Signin));
