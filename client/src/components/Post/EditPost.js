import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import Loader from "react-loader-spinner";
import ControlledEditor from "./controlledEditor";
import { Link } from "react-router-dom";
import Select from "react-select";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
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

  onChange = (editorState) => {
    this.setState({ editorState });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = (name) => {
    let postId = this.props.post.id;
    return (params) => {
      if (name === "save" && params["title"]) {
        this.props.updatePost(
          postId,
          params["title"],
          false,
          params["postEditor"],
          params["postTag"].id
        );
        this.setState({ editorState: EditorState.createEmpty() });
      } else if (name === "publish" && params["title"]) {
        this.props.updatePost(
          postId,
          params["title"],
          true,
          params["postEditor"],
          params["postTag"].id
        );
        this.setState({ editorState: EditorState.createEmpty() });
      }
    };
  };

  render() {
    const { handleSubmit } = this.props;
    if (!this.props.post || !this.props.tags) {
      return (
        <div className="loader">
          <Loader type="ThreeDots" color="#ffe31a" height={100} width={100} />
        </div>
      );
    }
    let tagsArrray = this.props.tags.map(i => ({ value: i.text, label: i.text, id: i.id }))
    return (
      <div className="mt-3">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="d-flex flex-row justify-content-between align-items-center " >
            <Field
              name='postTag'
              options={tagsArrray}
              component={(props) => (
                <Select
                  {...props}
                  className="basic-single col-3 Select"
                  classNamePrefix="select"
                  isSearchable={false}
                  value={props.input.value}
                  onChange={(value) => props.input.onChange(value)}
                  onBlur={() => props.input.onBlur(props.input.value)}
                  options={props.options}
                />
              )}
              multi
            />
            <div className="">
              <div className="d-flex flex-row">
                <button
                  className="ml-2 sign-btn "
                  action="submit"
                  name="publish"
                  onClick={handleSubmit(this.handleFormSubmit("publish"))}
                >
                  Publish Draft
                </button>
                <Link
                  className="com-links ml-2 "
                  to={`/previewPost/${this.props.post.id}`}
                >
                  <button
                    className="draft-post-btn p-2"
                    action="submit"
                    name="save"
                  >
                    Preview
                  </button>
                </Link>
                <button
                  className="ml-2 draft-post-btn"
                  action="submit"
                  name="save"
                  onClick={handleSubmit(this.handleFormSubmit("save"))}
                >
                  Save Draft
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <fieldset>
              <Field
                className="col-12 post-title-input"
                type="text"
                name="title"
                placeholder="Title"
                component="input"
              />
            </fieldset>
            <Field
              name="postEditor"
              component={ControlledEditor}
              editorContent={this.props.editorContent}
            />
          </div>
        </form>
      </div>
    );
  }
}

const populatePostValues = (state, desc) => {
  if (state.postDetails.details) {
    var info = {};
    info = {
      ...info,
      ...{ title: state.postDetails.details.title },
      postEditor: desc,
      postTag: {
        label: state.postDetails.details.tag.text,
        value: state.postDetails.details.tagId
      }
    };
    return info;
  } else return;
};

const mapStateToProps = (state) => {
  let desc = state.postDetails.description
    ? state.postDetails.description
    : convertToRaw(EditorState.createEmpty().getCurrentContent());
  return {
    account: state.auth.data,
    editorContent: desc,
    post: state.postDetails.details,
    description: state.postDetails.description,
    initialValues: populatePostValues(state, desc),
    tags: state.postDetails.tags
  };
};

const CreateFormPost = reduxForm({
  form: "createPost",
  enableReinitialize: true,
})(CreatePost);

export default connect(mapStateToProps, { ...actions, ...postActions })(CreateFormPost);
