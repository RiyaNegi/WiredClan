import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import Comments from "../comments";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from "react-router-dom";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostDetailLikes from "./postDetailLike";
import "./details.css";
import * as authActions from "../../actions/authActions";
import { Modal, Button } from "react-bootstrap";
import History from "../../history.js";
import Prism from "prismjs";
import "../../style/prism.css"


class PostDetails extends Component {
  state = {
    showModal: false,
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleDeleteClick = (postId) => {
    return (e) => {
      this.props.deletePost(postId);
      this.handleCloseModal();
      History.push("/");
    };
  };

  componentWillMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  // componentDidMount() {
  //   Prism.highlightAll();
  // }


  componentDidMount() {
    this.updateCodeSyntaxHighlighting();
  }

  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach(block => {
      debugger;
      Prism.highlightElement(block, Prism.languages.python);
      // Prism.highlight(block);
    });
  };

  convertDataFromJSONToHTML = (object) => {
    const html = object;
    const cleanHtml = (html) => {
      // Clean spaces between tags
      var newText = html.replace(
        /(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g,
        "$1$3"
      );

      // Clean empty paragraphs before the content
      // <p><br/><p> && <p></p>
      var slicer;
      while (
        newText.slice(0, 20) === "<p>&nbsp;</p>" ||
        newText.slice(0, 11) === "<p><br></p>"
      ) {
        if (newText.slice(0, 20) === "<p>&nbsp;</p>") slicer = 13;
        else slicer = 11;
        newText = newText.substring(slicer, newText.length);
      }

      // Clean empty paragraphs after the content
      while (
        newText.slice(-13) === "<p>&nbsp;</p>" ||
        newText.slice(-11) === "<p><br></p>"
      ) {
        if (newText.slice(-13) === "<p>&nbsp;</p>") slicer = 13;
        else slicer = 11;
        newText = newText.substring(0, newText.length - slicer);
      }
      // Return the clean Text
      return newText;
    };

    return cleanHtml(html);
  };

  handleLike(postId) {
    return (e) => {
      this.props.createLike(postId);
    };
  }


  renderPostDetails() {
    let post = this.props.post;
    return (
      <div className="col-12 col-md-11 p-0" key={post.id}>
        <label className="signin-heading" style={{ fontSize: 40 }}>{post.title}</label>
        <div>
          <span className="text-muted" > Posted by </span>{" "}
          {post.teammates.map((i, index) =>
            <a href={`/users/${i.userId}`} className="no-decoration">
              <span className="font-weight-bold" >
                {" "}
                <img
                  src={i.user.imageUrl}
                  style={{ width: 20, height: 20, borderRadius: 20 / 2 }}
                  alt="userIcon"
                  className="mr-1"
                />
                {i.user.firstName} {i.user.lastName}
              </span>
              <span>{!(post.teammates.length === (index + 1)) && ", "}</span>
            </a>
          )}
        </div>
        <div className="mt-3 post-display" style={{ fontSize: 18 }}>
          <div
            dangerouslySetInnerHTML={{
              __html: this.convertDataFromJSONToHTML(post.description),
            }}
          ></div>
        </div>
        <div className="mt-2 d-flex flex-row justify-content-between">
          <PostDetailLikes likesCount={post.likesCount} postId={post.id} likedByCurrentUser={post.likedByCurrentUser} />
          <div className="d-flex mr-md-5">
            <button
              type="button"
              className="btn btn-light post-tag-button text-l-gray align-self-center"
            >
              {this.props.post.tag.text}
            </button>
            {(this.props.account && this.props.account.id === this.props.postUser) && (
              <div className="d-flex align-items-center">
                <Link
                  className="com-links edit-link"
                  to={{
                    pathname: `/posts/${post.id}/edit`,
                    state: { edit: true },
                  }}
                >
                  <button
                    className=" post-item-buttons edit-button"
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      size="1x"
                      color="gray"
                    />{" "}
                    Edit
                  </button>
                </Link>
                <button
                  className="post-item-buttons delete-button"
                  onClick={this.handleShowModal}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="1x"
                    color="gray"
                  />{" "} Delete
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.post) {
      return (
        <div className="col-6 mt-5">
          <PacmanLoader
            size={40}
            color={"yellow"}
          />
        </div>
      );
    }
    return (
      <div className="col-12 col-md-11 col-md-4 mt-2 p-0">
        {this.renderPostDetails()}
        <Comments comments={this.props.comments} postId={this.props.post.id} />
        <Modal
          className="modal-background"
          show={this.state.showModal}
          onHide={this.handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Delete this post permanently?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleCloseModal}
            >
              Close
  </Button>
            <Button
              variant="primary"
              onClick={this.handleDeleteClick(this.props.post.id)}
            >
              Delete
  </Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    postUser: state.postDetails.postUser,
    account: state.auth.data,
    post: state.postDetails.details,
    comments: state.postDetails.comments,
    edit: state.postDetails.edit,
  };
};

export default connect(mapStateToProps, { ...actions, ...postActions, ...authActions })(PostDetails);
