import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import Comments from "../comments";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostDetailLikes from "./postDetailLike";
import "./details.css";
import * as authActions from "../../actions/authActions";
import { Modal, Button } from "react-bootstrap";
import "../../style/prism.css"
import hljs from 'highlight.js';
import slugify from "slugify";
import { AVATAR_URL } from "../../config"



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
      this.props.deletePostDetail(postId);
      this.handleCloseModal();
    };
  };

  componentWillMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  componentDidMount() {
    // Prism.highlightAll();
  }


  componentDidMount() {
    this.updateCodeSyntaxHighlighting();
  }

  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  updateCodeSyntaxHighlighting = () => {
    // hljs.configure({ useBR: false, tabReplace: '    ' });

    document.querySelectorAll("pre code").forEach(block => {
      // Prism.highlight(block.innerHTML, Prism.languages.javascript, 'javascript')
      hljs.highlightBlock(block);
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
      <div className="img-fix-div p-2 px-3" key={post.id}>
        <label className="signin-heading" style={{ fontSize: 40, color: "white" }}>{post.title}</label>
        <div className="postedby-box py-2">
          <span className="text-muted" > Posted by </span>{" "}
          {post.teammates.map((i, index) =>
            <a href={`/users/${i.userId}`} className="no-decoration">
              <span className="font-weight-bold ml-1 text-muted" >
                {" "}{" "}
                <img
                  src={AVATAR_URL + i.user.userName}
                  style={{ width: 20, height: 20, borderRadius: 20 / 2 }}
                  alt="userIcon"
                  className="mr-1"
                />{" "}
                {i.user.firstName} {i.user.lastName}
              </span>
              <span>{!(post.teammates.length === (index + 1)) && ", "}</span>
            </a>
          )}
        </div>
        <div className="mt-3 post-display" style={{ fontSize: 18 }}>
          <div
            dangerouslySetInnerHTML={{
              // __html: this.convertDataFromJSONToHTML(post.description),
              __html: (post.description),
            }}
          ></div>
        </div>
        <div className="mt-3 d-flex flex-row flex-wrap justify-content-between">
          <PostDetailLikes likesCount={post.likesCount} postId={post.id} likedByCurrentUser={post.likedByCurrentUser} />
          <div className="d-flex mt-3">
            <a className="text-decoration-none" href={`/community/${slugify(this.props.post.tag.text)}`}>
              <button
                type="button"
                className="btn btn-dark post-tag-button align-self-center"
              >
                {this.props.post.tag.text}
              </button>
            </a>
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
          <BeatLoader

            size={40}
            color={"#65ffea"}
          />
        </div>
      );
    }
    return (
      <div className="row justify-content-center">

        <div className="post-details-box col-12 col-md-10 mt-4 p-4">
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
