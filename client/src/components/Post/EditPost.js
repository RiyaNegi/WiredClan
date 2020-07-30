import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import BeatLoader from "react-spinners/BeatLoader";
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import renderMembers from "./renderMembers";

import modalTutorial from "./modalTutorial";
import TextareaAutosize from 'react-textarea-autosize';
import init from './init';

function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Preview
    </Tooltip>
  );
}
class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showVideoTutorial: false,
    };
  }
  componentWillMount() {
    if (this.props.match.params.id) {
      if (this.props.account.id) {
        this.props.fetchPost(this.props.match.params.id, true);
      } else {
        this.props.fetchPost(this.props.match.params.id, false);
      }
    }
    this.props.fetchTags()
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

  handleFormSubmit = (name) => {
    let postId = this.props.post.id;
    return (params) => {
      let published = name === "save" ? false : name === "publish" ? true : null;
      if (!params["postTag"] || !params["title"] || !params["postEditor"]) {
        this.notify()
        return
      }
      else if (name === "preview" && params["title"] && params["postTag"].value && params["postEditor"]) {
        this.props.previewPost(
          postId,
          params["title"],
          false,
          params["postEditor"],
          params["postTag"].value
        );
        return
      }
      else if (params["title"] && params["postTag"].value && params["postEditor"]) {
        if (this.props.hackathonId) {
          this.props.updatePost(
            postId,
            params["title"],
            published,
            params["postEditor"],
            params["postTag"].value,
            this.props.account.id,
            this.props.hackathonId
          );
          return
        }
        else {
          this.props.updatePost(
            postId,
            params["title"],
            published,
            params["postEditor"],
            params["postTag"].value,
            this.props.account.id
          );
          return
        }

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
    const { handleSubmit, submitting } = this.props;
    if (!this.props.post || !this.props.tags || this.props.isLoading) {
      return (
        <div className="col-6 mt-5">
          <BeatLoader

            size={40}
            color={"#65ffea"}
          />
        </div>
      );
    }
    let tagsArrray = this.props.tags.map(i => ({ value: i.text, label: i.text, id: i.id }))
    return (
      <div className="">
        <form style={{ zIndex: 1 }} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="d-flex flex-row flex-wrap justify-content-between">
            <div className="d-flex flex-row mt-3">
              <fieldset>
                <Field
                  name='postTag'
                  options={tagsArrray}
                  component={(props) => (
                    <Select
                      {...props}
                      className="basic-single Select-tag"
                      classNamePrefix="needsclick "
                      isSearchable={false}
                      value={props.input.value}
                      onChange={(value) => props.input.onChange(value)}
                      onBlur={event => event.preventDefault()}
                      options={props.options}
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
                    <FieldArray name="members" component={renderMembers} props={{ editPost: true }} />
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
              <OverlayTrigger
                placement="top"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
              >
                <button
                  className="icon-btn mr-3"
                  action="submit"
                  name="save"
                  onClick={handleSubmit(this.handleFormSubmit("preview"))}
                  disabled={submitting}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    size="1x"
                    color="gray"
                  />
                </button>
              </OverlayTrigger>
              <button
                className=" draft-post-btn mr-2"
                action="submit"
                name="save"
                onClick={handleSubmit(this.handleFormSubmit("save"))}
                disabled={submitting}
              >
                Save Draft
                </button>
              <button
                className="ml-2 post-comment-btn px-3 mr-3 "
                action="submit"
                name="publish"
                onClick={handleSubmit(this.handleFormSubmit("publish"))}
                disabled={submitting}
              >
                Publish
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
          <div className="mt-2">
            <fieldset>
              <Field
                name="title"
                component={this.renderTitle}
              />
            </fieldset>
            <fieldset className="rich-editor-field">
              <input id="my-file" type="file" accept="image/x-png,image/jpeg" name="my-file" style={{ display: 'none' }} onchange="" />
              <Field
                className="col-md-12 col-6 rich-editor"
                name="postEditor"
                component={this.renderRichEditor}
              />
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

            </fieldset>
          </div>

        </form>
      </div>
    );
  }
}

const populatePostValues = (state, desc) => {
  if (state.postDetails.details) {
    var memberArray = state.postDetails.details.teammates.map(a =>
      ({ id: a.user.id, firstName: a.user.firstName, lastName: a.user.lastName, imageUrl: a.user.imageUrl }))
    var info = {};
    info = {
      ...info,
      ...{ title: state.postDetails.details.title },
      postEditor: desc,
      postTag: {
        label: state.postDetails.details.tag.text,
        value: state.postDetails.details.tagId
      },
      members: memberArray
    };
    return info;
  }
  else return;
}

const mapStateToProps = (state) => {
  let desc = state.postDetails.description
  return {
    account: state.auth.data,
    editorContent: desc,
    post: state.postDetails.details,
    description: state.postDetails.description,
    initialValues: populatePostValues(state, desc),
    tags: state.postDetails.tags,
    isLoading: state.createPost.isLoading,
    hackathonId: state.postDetails.hackathonId
  };
};

const CreateFormPost = reduxForm({
  form: "createPost",
  enableReinitialize: true,
})(EditPost);

export default connect(mapStateToProps, { ...actions, ...postActions })(CreateFormPost);
