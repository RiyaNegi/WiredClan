import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import Loader from "react-loader-spinner";


const yearArrray = [{ value: 1, label: 'First' },
{ value: 2, label: 'Second' },
{ value: 3, label: 'Third' },
{ value: 4, label: 'Fourth' }]

class UserForm extends PureComponent {
  componentWillMount() {
    this.props.fetchAccount(this.props.match.params.id);
  }

  handleFormSubmit = (userId, redirectHomeAfterSubmit) => (formProps) => {
    formProps = { ...formProps, year: formProps.year.value }
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
    if (!this.props.user) {
      return (
        <div className="loader">
          <Loader type="ThreeDots" color="#ffe31a" height={100} width={100} />
        </div>
      );
    }

    return (
      <div className="signin-back">
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
          <div className="d-flex mt-5  flex-column signup-box">
            <div className="d-flex justify-content-center" >
              <img
                src={this.props.user.imageUrl}
                style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                alt="userIcon"
              />
            </div>
            <div className="d-flex mt-5">
              <fieldset className="form-group">
                <label className="sign-text">First Name</label>
                <Field
                  className="form-control signup-field"
                  type="text"
                  name="firstName"
                  component="input"
                />
              </fieldset>
              <fieldset className="form-group signup-el">
                <label className="sign-text">Last Name</label>
                <Field
                  className="form-control signup-field"
                  type="text"
                  name="lastName"
                  component="input"
                />
              </fieldset>
            </div>
            <div className="d-flex mt-2">
              <fieldset className="form-group">
                <label className="sign-text">Batch Year</label>
                <Field
                  name="year"
                  options={yearArrray}
                  component={(props) => (
                    <Select
                      {...props}
                      className="basic-single col-14 Select-signup "
                      classNamePrefix="select"
                      placeholder="Select Year.."
                      isSearchable={false}
                      value={props.input.value}
                      onChange={(value) => props.input.onChange(value)}
                      onBlur={() => props.input.onBlur(props.input.value)}
                      options={props.options}
                    />
                  )}
                  multi
                />
              </fieldset>
              <fieldset className="form-group signup-el">
                <label className="sign-text">College</label>
                <Field
                  className="form-control signup-field"
                  type="text"
                  name="college"
                  component="input"
                />
              </fieldset>
            </div>
            {this.renderError()}
            <div className="d-flex mt-2 justify-content-between">
              <button
                type="submit"
                className="btn site-button"
                disabled={submitting}
              >
                Save
            </button>
              <div >
                <Link to="/homepage">
                  <button className="btn site-button mr-4">Skip</button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div >
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
  let year = state.auth.data.year;
  let yearLabel = yearArrray.filter(i => i.value === year)
  yearLabel = yearLabel.length > 0 ? yearLabel[0].label : null
  return {
    errorMessage: state.auth.error,
    initialValues: state.auth.data
      ? {
        firstName: state.auth.data.firstName,
        lastName: state.auth.data.lastName,
        year: {
          label: yearLabel,
          value: year,
        },
        college: state.auth.data.college,
      }
      : {},
    user: state.auth.data
  };
};

const UserFormForm = reduxForm({
  form: "createPost",
  enableReinitialize: true,
  validate,
})(UserForm);

export default connect(mapStateToProps, authActions)(UserFormForm);