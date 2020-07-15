import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import PacmanLoader from "react-spinners/PacmanLoader";
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
      init={{
        selector: '.rich-editor-field textarea',
        skin: 'oxide-dark',
        content_css: '/editor.css?' + new Date().getTime(),
        plugins: 'fullpage autoresize preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table hr nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
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
        menubar: false,
        block_formats: '3=h3',
        toolbar: 'undo redo | bold italic underline strikethrough | alignleft alignjustify | outdent indent |  numlist bullist | backcolor removeformat| emoticons | insertfile image media link anchor codesample  | fullscreen  preview ',
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "0s",
        autosave_restore_when_empty: false,
        autosave_retention: "0m",
        fullpage_default_font_size: "16px",
        image_advtab: true,
        // content_css: '//www.tiny.cloud/css/codepen.min.css',
        link_list: [
          { title: 'My page 1', value: 'http://www.tinymce.com' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_list: [
          { title: 'My page 1', value: 'http://www.tinymce.com' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_class_list: [
          { title: 'None', value: '' },
          { title: 'Some class', value: 'class-name' }
        ],
        importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
          /* Provide file and text for the link dialog */
          if (meta.filetype === 'file') {
            callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === 'image') {
            callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
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
    const { handleSubmit, submitting, pristine } = this.props;
    if (!this.props.tags || this.props.isLoading) {
      return (
        <div className="col-6 mt-5">
          <PacmanLoader
            size={40}
            color={"#FADA5E"}
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
      <div className="mt-4">
        <form >
          <div className="d-flex row flex-column-reverse flex-md-row flex-wrap justify-content-between">
            {/* <label className="m-0 d-flex align-self-center">
              CREATE A NEW POST
            </label> */}
            <div className="col-10 col-md-9 mt-2 row">
              <fieldset>
                <Field
                  name='postTag'
                  options={tagsArray}
                  component={(selectProps) => (
                    <Select
                      {...selectProps}
                      className="basic-single col-10 col-md-6 ml-4 ml-md-2 p-0 mt-3 mt-md-0 Select-tag"
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
              <div className="col-8 mt-3 mt-md-0 col-md-3 mr-4 d-flex align-self-center">
                <button
                  className="team-modal-button ml-2"
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
    tags: state.postDetails.tags
  };
};

const CreateFormPost = reduxForm({
  form: "createPost",
})(CreatePost);

export default connect(mapStateToProps, { ...actions, ...postActions })(CreateFormPost);
