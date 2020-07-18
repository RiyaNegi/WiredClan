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

import TextareaAutosize from 'react-textarea-autosize';



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
      showModal: false
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

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleFormSubmit = (name) => {
    let postId = this.props.post.id;
    return (params) => {
      debugger;
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
          debugger
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
          debugger;
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
      init={{
        selector: '.rich-editor-field textarea',
        content_css: '/editor.css?' + new Date().getTime(),
        skin: 'oxide-dark',
        plugins: 'fullpage autoresize preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table hr nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: false,
        block_formats: '3=h3',
        textpattern_patterns: [
          { start: '*', end: '*', format: 'italic' },
          { start: '**', end: '**', format: 'bold' },
          { start: '#', format: 'h1' },
          { start: '##', format: 'h2' },
          { start: '###', format: 'h3' },
          { start: '####', format: 'h4' },
          { start: '#####', format: 'h5' },
          { start: '######', format: 'h6' },
          { start: '1. ', cmd: 'InsertOrderedList' },
          { start: '* ', cmd: 'InsertUnorderedList' },
          { start: '- ', cmd: 'InsertUnorderedList' }
        ],
        toolbar: 'undo redo | bold italic underline strikethrough | alignleft alignjustify | outdent indent |  numlist bullist | backcolor removeformat| emoticons | insertfile image media link anchor codesample  | fullscreen  preview ',
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "0s",
        autosave_restore_when_empty: false,
        autosave_retention: "0m",
        fullpage_default_font_size: "16px",
        image_advtab: false,
        importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
          /* Provide file and text for the link dialog */
          if (meta.filetype === 'file') {
            callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype == 'image') {
            var input = document.getElementById('my-file');
            input.click();
            input.onchange = function () {
              var file = input.files[0];
              var reader = new FileReader();
              reader.onload = function (e) {
                callback(e.target.result, {
                  alt: file.name
                });
              };
              reader.readAsDataURL(file);
            };
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
          }
        },
        min_height: 430,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h5 blockquote quickimage quicktable',
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: 'sliding',
        branding: false,
        contextmenu: "link image imagetools table"
      }}
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
              <input id="my-file" type="file" name="my-file" style={{ display: 'none' }} onchange="" />
              <Field
                className="col-md-12 col-6 rich-editor"
                name="postEditor"
                component={this.renderRichEditor}
              />
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
