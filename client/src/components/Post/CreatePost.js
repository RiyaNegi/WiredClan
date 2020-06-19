import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Loader from "react-loader-spinner";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
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
    };
  }

  onChangePost = (postEditorState) => this.setState({ postEditorState });

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = (name) => {
    return (params) => {
      if (name === "submit" && params["postTitle"]) {
        let convertedData = draftToHtml(
          convertToRaw(this.state.postEditorState.getCurrentContent())
        );
        this.props.createPost(params["postTitle"], true, convertedData);
        this.setState({ postEditorState: EditorState.createEmpty() });
      } else if (name === "save" && params["postTitle"]) {
        let convertedData = draftToHtml(
          convertToRaw(this.state.postEditorState.getCurrentContent())
        );
        this.props.createPost(params["postTitle"], false, convertedData);
        this.setState({ postEditorState: EditorState.createEmpty() });
      }
    };
  };
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    if (!this.state.postEditorState) {
      console.log("loaderrr");
      return (
        <div className="loader">
          <Loader type="ThreeDots" color="#ffe31a" height={100} width={100} />
        </div>
      );
    }
    return (
      <div className="mt-4">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="d-flex flex-row justify-content-between">
            <label className="m-0 d-flex align-self-center">
              CREATE A NEW POST
            </label>
            <div className="">
              <div className="d-flex flex-row">
                <button
                  className="ml-3 btn btn-secondary"
                  action="submit"
                  name="save"
                  disabled={submitting || pristine}
                  onClick={handleSubmit(this.handleFormSubmit("save"))}
                >
                  Save As Draft
                </button>
                <button
                  className="ml-3 btn btn-light site-button post-button"
                  action="submit"
                  name="submit"
                  disabled={submitting || pristine}
                  onClick={handleSubmit(this.handleFormSubmit("submit"))}
                >
                  Submit Post
                </button>
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
                  uploadCallback: uploadImageCallBack,
                  alt: { present: true, mandatory: true },
                  defaultSize: {
                    height: "300",
                    width: "300",
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
  };
};

const CreateFormPost = reduxForm({
  form: "createPost",
})(CreatePost);

export default connect(mapStateToProps, actions)(CreateFormPost);
