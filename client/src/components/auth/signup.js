import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import googleIcon from "./googleIcon.png";
import { GoogleLogin } from "react-google-login";
import normalizePhone from './normalizePhone'


const yearArrray = [{ value: 1, label: 'First' },
{ value: 2, label: 'Second' },
{ value: 3, label: 'Third' },
{ value: 4, label: 'Fourth' }]
class Signup extends PureComponent {
  handleFormSubmit = (formProps) => {
    let confirmPassword = formProps.password
    if (this.props.location.state && this.props.location.state.loc) {
      this.props.signupUser(formProps, confirmPassword,
        this.props.location.state.loc);
      return
    }
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
    if (this.props.location.state && this.props.location.state.loc) {
      this.props.googleLogin({
        accessToken: response.accessToken,
        email: response.profileObj.email,
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
      }, this.props.location.state.loc)
    }
    else {
      this.props.googleLogin({
        accessToken: response.accessToken,
        email: response.profileObj.email,
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
      })
    }
  }

  passwordLength = (value) =>
    value && value.length >= 6 ? undefined : "Password must be at least 6 characters."

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="col-12 col-md-6 p-4 d-flex justify-self-center mt-5 signup-box">
          <label className=" d-flex justify-content-center signin-heading">Sign up to create account</label>
          <fieldset className="form-group mt-md-4">
            <Field
              className="form-control signup-field"
              name="email"
              label="Email*"
              component={this.renderField}
              type="text"
            />
          </fieldset>
          <div className="d-flex">
            <fieldset className="form-group">
              <Field
                className="form-control signup-field"
                name="firstName"
                label="First Name*"
                component={this.renderField}
                type="text"
              />
            </fieldset>
            <fieldset className="form-group signup-el">
              <Field
                className="form-control signup-field"
                name="lastName"
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
                    className="basic-single m-0 p-0 Select-signup Select-tag"
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
              <label className="sign-text">Mobile Number</label>
              <Field
                className="form-control signup-field"
                type="text"
                name="mobile"
                component="input"
                normalize={normalizePhone}
              />
            </fieldset>
          </div>
          <div className="d-flex row">
            <fieldset className="form-group  col-12">
              <label className="sign-text">College</label>
              <Field
                className="form-control signup-field"
                type="text"
                name="college"
                component={this.renderField}
              />
            </fieldset>
          </div>
          <fieldset className="form-group">
            <Field
              className="form-control signup-field"
              name="password"
              label="Password*"
              component={this.renderField}
              type="password"
              validate={this.passwordLength}
            />
          </fieldset>
          {this.renderError()}
          <div className="d-flex justify-content-center">
            <button action="submit" className="col-5 sign-button button-7 mt-3" id="button-7" disabled={submitting}>
              <div id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" /></div>
              Sign Up
            </button>
          </div>
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
          <div className="d-flex justify-content-center mt-3" style={{ marginLeft: 11 }}>
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
    // eslint-disable-next-line no-useless-escape
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.college) {
    errors.college = "Please enter college";
  }

  if (!values.password) {
    errors.password = "Please enter password";
  }

  if (!values.firstName) {
    errors.firstName = "Please enter First Name";
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
