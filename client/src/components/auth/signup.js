import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";
import croodSignup from "./Signup.png";
import croodArea from "./area.png";
import { Link } from "react-router-dom";

class Signup extends PureComponent {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
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

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="signin-back">
        <div className='yellow-bg'>
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Link to="/"><label className='bg-text'>codejimmy...</label> </Link>
          <div className="signup-box" >
            <fieldset className="form-group signup-field">
              <Field
                name="email"
                label="Email"
                component={this.renderField}
                type="text"
              />
            </fieldset>
            <fieldset className="form-group  signup-field">
              <Field
                name="Username"
                label="Username"
                component={this.renderField}
                type="text"
              />
            </fieldset>

            <div className="signup-row">
              <fieldset className="form-group signup-field">
                <Field
                  name="FirstName"
                  label="First Name"
                  component={this.renderField}
                  type="text"
                />
              </fieldset>
              <fieldset className="form-group signup-field signup-el">
                <Field
                  name="Last Name"
                  label="Last Name"
                  component={this.renderField}
                  type="text"
                />
              </fieldset>
            </div>
            <div className="signup-row">
              <fieldset className="form-group signup-field">
                <Field
                  name="Year"
                  label="Year"
                  component={this.renderField}
                  type="text"
                />
              </fieldset>
              <fieldset className="form-group signup-field signup-el">
                <Field
                  name="Department"
                  label="Department"
                  component={this.renderField}
                  type="text"
                />
              </fieldset>
            </div>
            <fieldset className="form-group signup-field">
              <Field
                name="password"
                label="Password"
                component={this.renderField}
                type="password"
              />
            </fieldset>
            {this.renderError()}
            <button type="submit" className="btn site-button" disabled={submitting}>
              Sign Up
        </button>
            <div style={{ marginLeft: 11, marginTop: 8 }}>
              Already have an account? Click here to <Link to="/signin">Sign in</Link>
            </div>
          </div>
        </form>
        <div className="signup-image"><img src={croodSignup} style={{ width: 380, height: 270 }}
          alt="userIcon" /></div>
        <div className="signup-image-area"><img src={croodArea} style={{ width: 380, height: 270 }}
          alt="userIcon" /></div>
      </div>
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

  if (!values.Username) {
    errors.Username = "Please enter Username";
  }

  if (!values.FirstName) {
    errors.FirstName = "Please enter First Name";
  }

  if (!values.Year) {
    errors.Year = "Please enter year";
  }

  if (!values.Department) {
    errors.Department = "Please enter Department";
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
