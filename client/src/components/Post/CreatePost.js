import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import Loader from "react-loader-spinner";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import renderMembers from "./renderMembers";
import TextareaAutosize from 'react-textarea-autosize';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loginNotify: false
    };

  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };


  componentWillMount() {
    this.props.fetchTags()
  }

  // handleChange = (e) => {
  //   e.preventDefault();
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  handleFormSubmit = (name) => {
    return (params) => {
      var teammateIds = params["members"] && params["members"].map(i => i.id)
      if (!this.props.account) {
        this.notifyLogin();
        return
      }
      else if ((!params["postTag"] || !params["postTitle"] || !params["createPostEditor"])) {
        this.notify()
        return
      }
      else if (name === "submit" && params["postTitle"] && params["postTag"].id && params["createPostEditor"]) {
        this.props.createPost(params["postTitle"], true, params["createPostEditor"],
          params["postTag"].id, teammateIds);
        return
      }
      else if (name === "save" && params["postTitle"] && params["postTag"].id && params["createPostEditor"]) {
        this.props.createPost(params["postTitle"], false,
          params["createPostEditor"], params["postTag"].id, teammateIds);
        return
      }
      else {
        this.notify()
        return <div><ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
        /></div>
      }
    };
  };

  notify = () =>
    toast.error('⚠️ All fields are required', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  notifyLogin = () =>
    toast.warning('❗ SIGN IN to create post', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  renderTitle = (titleProps) => {
    return (
      < TextareaAutosize
        onChange={(e) => {
          debugger;
          titleProps.input.onChange(e.target.value);
        }}
        onBlur={titleProps.handleBlur}
        value={titleProps.input.value}
        className="textarea-title"
        placeholder="Title"
        ref={(tag) => (this.textarea = tag)}
      />
    )
  }

  renderRichEditor = (editorProps) => (
    <Editor {...editorProps} />
    // <textarea {...editorProps} className="post-editor" />
  )


  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    if (!this.props.tags || !Editor) {
      return (
        <div className="loader">
          <Loader type="ThreeDots" color="#ffe31a" height={100} width={100} />
        </div>
      );
    }
    if (!this.props.account && !this.state.loginNotify) {
      this.notifyLogin();
      this.setState({ loginNotify: true })
    }
    let tagsArray = this.props.tags.map(i => ({ value: i.text, label: i.text, id: i.id }))
    return (
      <div className="mt-4">
        <form >
          <div className="d-flex row flex-column-reverse flex-md-row flex-wrap justify-content-between">
            {/* <label className="m-0 d-flex align-self-center">
              CREATE A NEW POST
            </label> */}
            <div className="col-10 col-md-6 mt-2 row">
              <fieldset>
                <Field
                  name='postTag'
                  options={tagsArray}
                  component={(selectProps) => (
                    <Select
                      {...selectProps}
                      className="basic-single col-12 col-md-5 ml-2 p-0 Select-tag"
                      classNamePrefix="needsclick "
                      placeholder="Select Tag.."
                      isSearchable={false}
                      value={selectProps.input.value}
                      onChange={(value) => selectProps.input.onChange(value)}
                      onBlur={event => event.preventDefault()}
                      options={selectProps.options}
                    />
                  )}
                />
              </fieldset>
              <div className="col-4 d-flex align-self-center">
                <button
                  className=" team-modal-button"
                  type="button"
                  onClick={this.handleShowModal}
                >Add Teammates
                </button>
                <Modal
                  className="modal-background"
                  show={this.state.showModal}
                  onHide={this.handleCloseModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Manage Teammates</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="p-6">
                    <FieldArray name="members" component={renderMembers} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={this.handleCloseModal}
                    >
                      Close
                  </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            <div className="d-flex flex-row ml-4 ">
              <button
                className="draft-post-btn"
                action="submit"
                name="save"
                disabled={submitting || pristine}
                onClick={handleSubmit(this.handleFormSubmit("save")).bind(this)}
              >
                Save As Draft
                </button>
              <button
                className="ml-2 sign-btn"
                action="submit"
                name="submit"
                disabled={submitting || pristine}
                onClick={handleSubmit(this.handleFormSubmit("submit"))}
              >
                Submit Post
                </button>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
              />
            </div>
          </div>
          <div className="mt-3">
            <fieldset className="">


              <Field
                name="postTitle"
                component={this.renderTitle}
              />

            </fieldset>
            <fieldset className="rich-editor-field">
              <Field
                className="col-md-12 col-6 rich-editor"
                name="createPostEditor"

                component={this.renderRichEditor}
              />
            </fieldset>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.auth.data,
    tags: state.postDetails.tags,

  };
};

const CreateFormPost = reduxForm({
  form: "createPost",
})(CreatePost);

export default connect(mapStateToProps, { ...actions, ...postActions })(CreateFormPost);
