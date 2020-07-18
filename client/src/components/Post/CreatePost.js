import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import BeatLoader from "react-spinners/BeatLoader";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import renderMembers from "./renderMembers";
import modalTutorial from "./modalTutorial";
import TextareaAutosize from 'react-textarea-autosize';
import init from './init';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loginNotify: false,
      showVideoTutorial: false,
    };

  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleShowVideoTutorial = () => {
    this.setState({ showVideoTutorial: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false, showVideoTutorial: false });
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
      var published = name === "submit" ? true : name === "save" ? false : null;
      if (!this.props.account) {
        // this.notifyLogin();
        return
      }
      else if ((!params["postTag"] || !params["postTitle"] || !params["createPostEditor"])) {
        this.notify()
        return
      }
      else if (params["postTitle"] && params["postTag"].id && params["createPostEditor"]) {
        this.props.createPost(params["postTitle"], published, params["createPostEditor"],
          params["postTag"].id, teammateIds, this.props.account.id);
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
    toast.error('⚠️ Tag, title, body are required', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  // notifyLogin = () =>
  //   toast.warning('❗ SIGN IN to create post', {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: false,
  //     progress: undefined,
  //   });

  renderTitle = (titleProps) => {
    return (
      < TextareaAutosize
        onChange={(e) => {
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
    // Making a separate component out of this does not work. Not sure why.
    <Editor
      initialValue={editorProps.input.value}
      apiKey='v3p2ek98ypo3oknpt4gt9bzbyxmvpb22a7rmkw2yo1wvwxpq'
      onEditorChange={(content) => {
        editorProps.input.onChange(content);
      }}
      init={init}
    // onBlur={(event, value) => { props.input.onChange(event.target.getContent()) }}
    />
  )


  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    if (!this.props.tags || this.props.isLoading) {
      return (
        <div className="col-6 mt-5">
          <BeatLoader

            size={40}
            color={"#65ffea"}
          />
        </div>
      );
    }
    if (!this.props.account && !this.state.loginNotify) {
      this.notifyLogin();
      this.setState({ loginNotify: true })
    }
    let tagsArray = this.props.tags.map(i => ({ value: i.text, label: i.text, id: i.id }))
    return (
      <div className="">
        <form >
          <div className="d-flex flex-row flex-wrap justify-content-between">
            {/* <label className="m-0 d-flex align-self-center">
              CREATE A NEW POST
            </label> */}
            <div className="d-flex flex-row mt-3">
              <fieldset>
                <Field
                  name='postTag'
                  options={tagsArray}
                  component={(selectProps) => (
                    <Select
                      {...selectProps}
                      className="basic-single Select-tag"
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
              <div className="">
                <button
                  className="team-modal-button ml-3 mt-1"
                  type="button"
                  onClick={this.handleShowModal}
                >Manage Team
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
            <div className="d-flex flex-row mt-3">
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
                className="ml-3 post-comment-btn px-2"
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
              <input id="my-file" type="file" name="my-file" style={{ display: 'none' }} onchange="" />
              <Field
                className="col-md-12 col-6 rich-editor"
                name="createPostEditor"
                component={this.renderRichEditor}
              />
            </fieldset>
            <div className="float-right mt-3">
              <a
                className="text-decoration-none text-muted "
                href="#"
                onClick={this.handleShowVideoTutorial}
              >How to upload a demo video?
                </a>
              <Modal
                className="modal-background"
                show={this.state.showVideoTutorial}
                onHide={this.handleCloseModal}
              >
                <Modal.Header closeButton>
                  <Modal.Title>How to link a YouTube video?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-6">
                  <FieldArray name="members" component={modalTutorial} />
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.auth.data,
    tags: state.postDetails.tags
  };
};

const CreateFormPost = reduxForm({
  form: "createPost",
})(CreatePost);

export default connect(mapStateToProps, { ...actions, ...postActions })(CreateFormPost);
