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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";

function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Preview
    </Tooltip>
  );
}
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
          <div className="d-flex row flex-column-reverse flex-md-row flex-wrap justify-content-between">
            <div className="col-md-5 mt-2 col-10">
              <Field
                name='postTag'
                options={tagsArrray}
                component={(props) => (
                  <Select
                    {...props}
                    className="basic-single col-10 col-md-8 ml-2 p-0 Select"
                    classNamePrefix="needsclick "
                    isSearchable={false}
                    value={props.input.value}
                    onChange={(value) => props.input.onChange(value)}
                    onBlur={event => event.preventDefault()}
                    options={props.options}
                  />
                )}
                multi
              />
            </div>
            <div className="d-flex flex-row ml-4 ">
              <Link
                className="com-links "
                to={`/previewPost/${this.props.post.id}`}
              >
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 100, hide: 100 }}
                  overlay={renderTooltip}
                >
                  <button
                    className="icon-btn"
                    action="submit"
                    name="save"
                  ><FontAwesomeIcon
                      icon={faEye}
                      size="1x"
                      color="black"
                    /></button>
                </OverlayTrigger>
              </Link>
              <button
                className="ml-2 draft-post-btn"
                action="submit"
                name="save"
                onClick={handleSubmit(this.handleFormSubmit("save"))}
              >
                Save
                </button>
              <button
                className="ml-2 sign-btn "
                action="submit"
                name="publish"
                onClick={handleSubmit(this.handleFormSubmit("publish"))}
              >
                Publish
                </button>
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
