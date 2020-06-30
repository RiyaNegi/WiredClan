import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import Loader from "react-loader-spinner";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
// import TinyMCE from "./tiny"
import { Editor } from '@tinymce/tinymce-react';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginNotify: false
    };

  }

  componentWillMount() {
    this.props.fetchTags()
  }

  // handleChange = (e) => {
  //   e.preventDefault();
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  handleFormSubmit = (name) => {
    return (params) => {
      if (!this.props.account) {
        this.notifyLogin();
        return
      }
      else if ((!params["postTag"] || !params["postTitle"] || !params["createPostEditor"])) {
        this.notify()
        return
      }
      else if (name === "submit" && params["postTitle"] && params["postTag"].id && params["createPostEditor"]) {
        this.props.createPost(params["postTitle"], true, params["createPostEditor"], params["postTag"].id); return
      }
      else if (name === "save" && params["postTitle"] && params["postTag"].id && params["createPostEditor"]) {
        this.props.createPost(params["postTitle"], false, params["createPostEditor"], params["postTag"].id); return
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
            <div className="col-md-5 mt-2 col-10">
              <Field
                name='postTag'
                options={tagsArray}
                component={(selectProps) => (
                  <Select
                    {...selectProps}
                    className="basic-single col-11 col-md-8 ml-2 p-0 Select"
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
                className="col-12 post-title-input"
                type="text"
                placeholder="Title"
                name="postTitle"
                component="input"
                row="1"
                onKeyPress={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
              />
            </fieldset>
            <fieldset className="">
              <Field
                className="col-md-12 col-6"
                name="createPostEditor"
                component={(editorProps) => (
                  <Editor
                    initialValue={editorProps.input.value}
                    apiKey='v3p2ek98ypo3oknpt4gt9bzbyxmvpb22a7rmkw2yo1wvwxpq'
                    onEditorChange={(content) => {
                      editorProps.input.onChange(content);
                    }}
                    init={{
                      selector: 'textarea',
                      plugins: 'preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table hr nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                      imagetools_cors_hosts: ['picsum.photos'],
                      menubar: false,
                      block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
                      toolbar: 'undo redo | bold italic underline strikethrough | alignleft alignjustify | outdent indent |  numlist bullist | backcolor removeformat| emoticons | insertfile image media link anchor codesample  | fullscreen  preview ',
                      toolbar_sticky: true,
                      autosave_ask_before_unload: true,
                      autosave_interval: "30s",
                      autosave_prefix: "{path}{query}-{id}-",
                      autosave_restore_when_empty: false,
                      autosave_retention: "2m",
                      image_advtab: true,
                      content_css: '//www.tiny.cloud/css/codepen.min.css',
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
                      height: '400',
                      image_caption: true,
                      quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                      noneditable_noneditable_class: "mceNonEditable",
                      toolbar_mode: 'sliding',
                      branding: false,
                      contextmenu: "link image imagetools table"
                    }}
                  // onBlur={(event, value) => { props.input.onChange(event.target.getContent()) }}
                  />)}
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
