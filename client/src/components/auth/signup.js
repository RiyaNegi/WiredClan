import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";
import humaaans from "./humaaans.png";
import { Link } from "react-router-dom";
import Select from "react-select";
import googleIcon from "./googleIcon.png";
import { GoogleLogin } from "react-google-login";


const yearArrray = [{ value: 1, label: 'First' },
{ value: 2, label: 'Second' },
{ value: 3, label: 'Third' },
{ value: 4, label: 'Fourth' }]
class Signup extends PureComponent {
  handleFormSubmit(formProps) {
    let confirmPassword = formProps.password
    this.props.signupUser(formProps, confirmPassword);
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label className="sign-text">{label}</label>
      <div>
        <input
          className="form-control "
          {...input}
          type={type}
        />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger signuptext-danger">
          <string>Oops! {this.props.errorMessage}</string>
        </div>
      );
    }
  }
  responseGoogle = (response) => {
    this.props.googleLogin({
      accessToken: response.accessToken,
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
    })
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="col-12 col-md-6 p-4 d-flex justify-self-center mt-5 signup-box">
          <label className=" d-flex justify-content-center signin-heading">Sign up to create account</label>
          <fieldset className="form-group">
            <Field
              className="form-control signup-field"
              name="Email"
              label="Email"
              component={this.renderField}
              type="text"
            />
          </fieldset>
          <div className="d-flex mt-1">
            <fieldset className="form-group">
              <Field
                className="form-control signup-field"
                name="FirstName"
                label="First Name"
                component={this.renderField}
                type="text"
              />
            </fieldset>
            <fieldset className="form-group signup-el">
              <Field
                className="form-control signup-field"
                name="Last Name"
                label="Last Name"
                component={this.renderField}
                type="text"
              />
            </fieldset>
          </div>
          <div className="d-flex row">
            <fieldset className="form-group  col-12 col-md-6">
              <label className="sign-text">Batch Year</label>
              <Field
                className="form-control signup-field"
                name="year"
                options={yearArrray}
                component={(props) => (
                  <Select
                    {...props}
                    className="basic-single p-0 Select-signup "
                    classNamePrefix="needsclick "
                    placeholder="Select Year.."
                    isSearchable={false}
                    value={props.input.value}
                    onChange={(value) => props.input.onChange(value)}
                    onBlur={event => event.preventDefault()}
                    options={props.options}
                  />
                )}
                multi
              />
            </fieldset>
            <fieldset className="form-group  col-12 col-md-6">
              <label className="sign-text">College</label>
              <Field
                className="form-control signup-field"
                type="text"
                name="college"
                component="input"
              />
            </fieldset>
          </div>
          <fieldset className="form-group">
            <Field
              className="form-control signup-field"
              name="password"
              label="Password"
              component={this.renderField}
              type="password"
            />
          </fieldset>
          {this.renderError()}
          <button type="submit" className="col-6 sign-btn" disabled={submitting}>
            Sign Up
        </button>
          <div className="d-flex justify-content-center mt-1">
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
                  <label className=" mt-2 ml-2">  Sign up with Google</label></button>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          <div className="d-flex justify-content-center" style={{ marginLeft: 11, marginTop: 8 }}>
            Have an account? Click here to <Link className="ml-1" to="/signin">Sign in</Link>
          </div>
        </div>

      </form >
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2, 4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Please enter password";
  }

  if (!values.FirstName) {
    errors.FirstName = "Please enter First Name";
  }
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: "signin",
  validate
})(connect(mapStateToProps, authActions)(Signup));
