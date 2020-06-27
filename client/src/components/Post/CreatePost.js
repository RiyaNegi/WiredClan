import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Loader from "react-loader-spinner";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";



function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID a7b451dcec71d8f");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      console.log("Image upload error:", error);
      reject(error);
    });
  });
}

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postEditorState: EditorState.createEmpty(),
      loginNotify: false
    };

  }

  componentWillMount() {
    this.props.fetchTags()
  }

  onChangePost = (postEditorState) => this.setState({ postEditorState });

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = (name) => {
    return (params) => {
      if (!this.props.account) {
        this.notifyLogin();
        return
      }
      if ((!params["postTag"] || !params["postTitle"]) && this.props.account) {
        this.notify()
        return
      }
      else if (name === "submit" && params["postTitle"] && params["postTag"].id) {
        let convertedData = draftToHtml(
          convertToRaw(this.state.postEditorState.getCurrentContent())
        );
        this.props.createPost(params["postTitle"], true, convertedData, params["postTag"].id);
        this.setState({ postEditorState: EditorState.createEmpty() });
        return
      }
      else if (name === "save" && params["postTitle"] && params["postTag"].id) {
        let convertedData = draftToHtml(
          convertToRaw(this.state.postEditorState.getCurrentContent())
        );
        this.props.createPost(params["postTitle"], false, convertedData, params["postTag"].id);
        this.setState({ postEditorState: EditorState.createEmpty() });
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
    toast.error('⚠️ TAG and Title required', {
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
    if (!this.state.postEditorState || !this.props.tags) {
      console.log("loaderrr");
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
          <div className="d-flex flex-row justify-content-between">
            {/* <label className="m-0 d-flex align-self-center">
              CREATE A NEW POST
            </label> */}
            <Field
              name='postTag'
              options={tagsArray}
              component={(props) => (
                <Select
                  {...props}
                  className="basic-single col-3 Select"
                  classNamePrefix="needsclick "
                  placeholder="Select Tag.."
                  isSearchable={false}
                  value={props.input.value}
                  onChange={(value) => props.input.onChange(value)}
                  onBlur={event => event.preventDefault()}
                  options={props.options}
                />
              )}
              multi
            />
            <div className="">
              <div className="d-flex flex-row">
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
                  className="ml-3 sign-btn"
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
            <Editor
              editorState={this.state.postEditorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onChangePost}
              wrapperStyle={{
                border: "1px solid gray",
                marginBottom: "20px",
              }}
              editorStyle={{ height: "100%", padding: "10px" }}
              stripPastedStyles={true}
              placeholder="Time to write something great"
              toolbar={{
                options: [
                  "inline",
                  "fontSize",
                  "image",
                  "emoji",
                  "list",
                  "link",
                  "history",
                ],
                fontSize: {
                  options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36],
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                },
                inline: {
                  options: [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "monospace",
                  ],
                  bold: { className: "bordered-option-classname" },
                  italic: { className: "bordered-option-classname" },
                  underline: { className: "bordered-option-classname" },
                  strikethrough: { className: "bordered-option-classname" },
                  code: { className: "bordered-option-classname" },
                },
                image: {
                  previewImage: true,
                  uploadCallback: uploadImageCallBack,
                  alt: { present: false },
                  defaultSize: {
                    height: "350",
                    width: "350",
                  },
                },
              }}
            />
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
