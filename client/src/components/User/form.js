import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import BeatLoader from "react-spinners/BeatLoader";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AVATAR_URL } from "../../config"


const yearArrray = [{ value: 1, label: 'First' },
{ value: 2, label: 'Second' },
{ value: 3, label: 'Third' },
{ value: 4, label: 'Fourth' }]

class UserForm extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        avatar: this.props.user.avatar
      };
    };
  
  nextAvatar(){
    this.setState({avatar: this.state.avatar+1})
  }

  prevAvatar(){
    if(this.state.avatar > 0){
        this.setState({avatar: this.state.avatar-1})
    }
  }
    

  componentWillMount() {
    this.props.fetchAccount(this.props.user.id);
  }

  handleFormSubmit = (userId) => (formProps) => {
    formProps = { ...formProps, year: formProps.year.value }
    this.props.updateUser(
      { ...formProps, id: userId, avatar: this.state.avatar },
      this.props.location.state && this.props.location.state.redirectHomeAfterSubmit ? "/home" : undefined,
      this.props.location.state && this.props.location.state.loc ? `/${this.props.location.state.loc}` : undefined
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
        <div className="col-6 mt-5">
          <BeatLoader
            size={40}
            color={"#65ffea"}
          />
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
          <div className="col-12 col-md-6 p-4 d-flex justify-self-center mt-5 flex-column sign-box">
            <div className="d-flex justify-content-center align-items-center" >
            <FontAwesomeIcon
                onClick={()=> this.prevAvatar()}
                style={this.state.avatar === 0 ? {opacity: 0} : {cursor: 'pointer'}}
                className="mr-3"
                title="Change Avatar"
                icon={faChevronLeft}
                size="2x"
                color="rgba(214,214,214)"
              />
              <img
                src={AVATAR_URL + this.props.user.userName + this.state.avatar}
                style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                alt="userIcon"
            />
              <FontAwesomeIcon
                onClick={()=> this.nextAvatar()}
                style={{cursor: 'pointer'}}
                className="ml-3"
                title="Change Avatar"
                icon={faChevronRight}
                size="2x"
                color="rgba(214,214,214)"
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
            <div className="d-flex">
              <fieldset className="form-group col-6 pl-0">
                <label className="sign-text">Batch Year</label>
                <Field
                  name="year"
                  options={yearArrray}
                  component={(props) => (
                    <Select
                      {...props}
                      className="basic-single Select-signup Select-tag"
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
              <fieldset className="form-group col-6 pr-0">
                <label className="sign-text">Mobile</label>
                <Field
                  className="form-control signup-field"
                  type="text"
                  name="mobile"
                  component="input"
                />
              </fieldset>

            </div>

            <div className="d-flex">
              <fieldset className="form-group col-12 px-0">
                <label className="sign-text">College</label>
                <Field
                  className="form-control signup-field"
                  type="text"
                  name="college"
                  component="input"
                />
              </fieldset>
            </div>

            <div className="d-flex">
              <fieldset className="form-group col-12 px-0">
                <label className="sign-text">Bio</label>
                <Field
                  className="form-control signup-field"
                  type="text"
                  name="bio"
                  component="textarea"
                />
              </fieldset>
            </div>
            {this.renderError()}
            <div className="d-flex mt-2 justify-content-between">
              <Link to={this.props.location.state && this.props.location.state.loc ? "/Hackathon" : "/home"}>
                <button className=" px-4 sign-btn ">
                  Skip
                  </button>
              </Link>
              <button
                type="submit"
                className="m-0 px-4 sign-btn"
                disabled={submitting}
              >
                Save
              </button>
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

  if (!values.firstName) {
    errors.firstName = "Please enter First Name";
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
        bio: state.auth.data.bio
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
