import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserForm extends PureComponent {
  componentWillMount() {
    this.props.fetchAccount(this.props.match.params.id);
  }

  handleFormSubmit = (userId, redirectHomeAfterSubmit) => (formProps) => {
    this.props.updateUser(
      { ...formProps, id: userId },
      redirectHomeAfterSubmit ? "/" : undefined
    );
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label className="sign-text">{label}</label>
      <div>
        <input className="form-control " {...input} type={type} />
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
        <div className="yellow-bg"></div>
        <form
          onSubmit={handleSubmit(
            this.handleFormSubmit(
              this.props.match.params.id,
              this.props.history.location.state
                ? this.props.history.location.state.redirectHomeAfterSubmit
                : false
            )
          )}
        >
          <Link to="/">
            <label className="bg-text">codejimmy...</label>{" "}
          </Link>
          <div className="signup-box">
            <div className="signup-row">
              <fieldset className="form-group signup-field">
                <label className="sign-text">First Name</label>
                <Field
                  className="form-control"
                  type="text"
                  name="firstName"
                  component="input"
                />
              </fieldset>

              <fieldset className="form-group signup-field signup-el">
                <label className="sign-text">Last Name</label>
                <Field
                  className="form-control"
                  type="text"
                  name="lastName"
                  component="input"
                />
              </fieldset>
            </div>
            <div className="signup-row">
              <fieldset className="form-group signup-field">
                <label className="sign-text">Year</label>
                <Field
                  className="form-control"
                  type="text"
                  name="year"
                  component="input"
                />
              </fieldset>
              <fieldset className="form-group signup-field signup-el">
                <label className="sign-text">College</label>
                <Field
                  className="form-control"
                  type="text"
                  name="college"
                  component="input"
                />
              </fieldset>
            </div>

            {this.renderError()}
            <button
              type="submit"
              className="btn site-button"
              disabled={submitting}
            >
              Save
            </button>
            <div style={{ marginLeft: 11, marginTop: 8 }}>
              <Link to="/homepage">Skip</Link>
            </div>
          </div>
        </form>
        <div className="signup-image">
          <img style={{ width: 380, height: 270 }} alt="userIcon" />
        </div>
        <div className="signup-image-area">
          <img style={{ width: 380, height: 270 }} alt="userIcon" />
        </div>
      </div>
    );
  }
}

const validate = (values) => {
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

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error,
    initialValues: state.auth.data
      ? {
          firstName: state.auth.data.firstName,
          lastName: state.auth.data.lastName,
          year: state.auth.data.year,
          college: state.auth.data.college,
        }
      : {},
  };
};

const UserFormForm = reduxForm({
  form: "createPost",
  enableReinitialize: true,
  validate,
})(UserForm);

export default connect(mapStateToProps, authActions)(UserFormForm);
