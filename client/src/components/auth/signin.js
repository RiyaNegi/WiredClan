import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import { connect } from "react-redux";
import "./auth.css";
import croodSignin from "./Signin.png";

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

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="signin-back">
        <div className='yellow-bg'></div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="sign-box" >
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
          </div>
        </form>
        <div className="signin-image"><img src={croodSignin} style={{ width: 350, height: 270 }}
          alt="userIcon" /></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: "signin"
})(connect(mapStateToProps, actions)(Signin));
