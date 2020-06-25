import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../actions";
import * as postActions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../style/style2.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyClicked: [],
      editClicked: [],
      showModalArray: [],
    };
  }
  handleShowModal = (commentId) => {
    return () => {
      var newStateArray = this.state.showModalArray.slice();
      newStateArray.push({ id: commentId });
      this.setState({ showModalArray: newStateArray });
    };
  };

  handleCloseModal = (commentId) => {
    return () => {
      let filteredModalArray = this.state.editClicked.filter(
        (i) => i.id !== commentId
      );
      this.setState({ showModalArray: filteredModalArray });
    };
  };

  handleClick = (commentId) => {
    return (e) => {
      var newStateArray = this.state.replyClicked.slice();
      newStateArray.push({ id: commentId });
      this.setState({ replyClicked: newStateArray });
    };
  };

  handleEditClick = (commentId) => {
    return (e) => {
      var newStateArray = this.state.editClicked.slice();
      newStateArray.push({ id: commentId });
      this.setState({ editClicked: newStateArray });
    };
  };

  handleDeleteClick = (commentId, parentId) => {
    return (e) => {
      this.props.deleteComment(this.props.postId, commentId, parentId);
    };
  };

  renderReplies = (comment, parentId) => {
    return comment.replyComments.map((replyComment) => {
      return (
        <div className="reply-box mt-3 ml-5" key={replyComment.id}>
          {this.state.editClicked.filter((ci) => ci.id === replyComment.id)
            .length && this.props.account
            ? this.UserReply(parentId, replyComment.id, true, false)
            : this.renderComment(replyComment)}
          {this.state.replyClicked.filter((ci) => ci.id === replyComment.id)
            .length && this.props.account
            ? this.UserReply(parentId, replyComment.id, false, true)
            : null}
        </div>
      );
    });
  };

  renderComment(comment) {
    return (
      <div className="user com-user">
        {this.state.showModalArray.filter((ci) => ci.id === comment.id)
          .length && this.props.account ? (
            <Modal
              className="modal-background"
              show={true}
              onHide={this.handleCloseModal(comment.id)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Comment</Modal.Title>
              </Modal.Header>
              <Modal.Body>Delete this comment permanently?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseModal}>
                  Close
              </Button>
                <Button
                  variant="primary"
                  onClick={this.handleDeleteClick(comment.id, comment.parentId)}
                >
                  Delete
              </Button>
              </Modal.Footer>
            </Modal>
          ) : null}

        <div className="d-flex flex-row col-12 mt-3 justify-content-between">
          <div>
            <div className="card-text">{comment.text}</div>
            <div className="d-flex mt-1">
              <a
                href={`/Users/${comment.user.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="usericon">
                  <img
                    src={comment.user.imageUrl}
                    style={{ width: 20, height: 20, borderRadius: 20 / 2 }}
                    alt="userIcon"
                  />
                </div>
              </a>
              <a
                href={`/Users/${comment.user.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className="username ml-2">{comment.user.firstName} {comment.user.lastName}</span>
              </a>
              {/* <label className="mx-2" style={{ color: "rgb(83, 83, 83)" }}>|</label> */}
              <div className="">
                <button
                  className="post-item-buttons"
                  onClick={this.handleClick(comment.id)}
                >
                  <FontAwesomeIcon icon={faReply} size="1x" color="gray" /> Reply
              </button>
              </div>
            </div>
          </div>
          <div className="d-flex flex-end mt-2">
            {this.props.account && comment.userId === this.props.account.id ? (
              <div className="dropdown">
                <button
                  type="button"
                  className="edit-post-button px-2"
                  data-toggle="dropdown"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faEllipsisV} size="1x" />
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <Button
                    className="dropdown-item"
                    onClick={this.handleEditClick(comment.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="dropdown-item"
                    onClick={this.handleShowModal(comment.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  renderComments() {
    return this.props.comments.map((comment) => {
      console.log("called it render coms");
      return (
        <div key={comment.id}>
          {this.state.editClicked.filter((ci) => ci.id === comment.id).length &&
            this.props.account
            ? this.UserReply(comment.id, comment.id, true, false)
            : this.renderComment(comment)}
          {this.state.replyClicked.filter((ci) => ci.id === comment.id)
            .length && this.props.account
            ? this.UserReply(comment.id, comment.id, false, true)
            : null}
          {comment.replyComments.length
            ? this.renderReplies(comment, comment.id)
            : null}
        </div>
      );
    });
  }

  handleFormSubmit = (parentId, replyId) => {
    return (params) => {
      if (params["replyComment" + replyId]) {
        if (!parentId) {
          this.props.postComment(
            this.props.postId,
            params["replyComment" + replyId]
          );
          this.notify();
        } else {
          this.props.postComment(
            this.props.postId,
            params["replyComment" + replyId],
            parentId
          );
          this.notify();
        }
        this.setState({ replyClicked: [], editClicked: [] });
        return;
      } else if (params["comment" + replyId]) {
        if (!parentId) {
          this.props.postComment(
            this.props.postId,
            params["comment" + replyId]
          );
          this.notify();
        } else {
          this.props.postComment(
            this.props.postId,
            params["comment" + replyId],
            parentId
          );
          this.notify();
        }
        this.setState({ replyClicked: [], editClicked: [] });
        return;
      } else if (params["editComment" + replyId]) {
        this.props.updateComment(
          this.props.postId,
          params["editComment" + replyId],
          replyId
        );
        this.setState({ replyClicked: [], editClicked: [] });
        this.notify();
      }
    };
  };

  handleCancel = (commentId) => {
    return (e) => {
      let filteredReplyArray = this.state.replyClicked.filter(
        (i) => i.id !== commentId
      );
      let filteredEditArray = this.state.editClicked.filter(
        (i) => i.id !== commentId
      );
      this.setState({
        replyClicked: filteredReplyArray,
        editClicked: filteredEditArray,
      });
    };
  };

  notify = () =>
    toast.dark("🚀  Comment Posted!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

  UserReply(parentId, replyId, edit, reply) {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        onSubmit={
          edit
            ? handleSubmit(
              this.handleFormSubmit(parentId, replyId, edit).bind(this)
            )
            : handleSubmit(this.handleFormSubmit(parentId, replyId).bind(this))
        }
      >
        <div className="mt-3 ml-3 ">
          <div className="profile-items">
            <div className="d-flex">
              <div className="profile-icon">
                <img
                  src={this.props.account.imageUrl}
                  style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                  alt="userIcon"
                />
              </div>
              <fieldset className="com-box ml-3">
                <Field
                  className="post-comment"
                  type="text"
                  placeholder="Type your reply here."
                  component="input"
                  autoFocus={edit || reply}
                  name={
                    reply
                      ? "replyComment" + replyId
                      : edit
                        ? "editComment" + replyId
                        : "comment" + replyId
                  }
                />
              </fieldset>
            </div>
            <div className="d-flex ml-2 mt-1 float-right">
              <button
                className="site-button post-button post-reply-but px-3 "
                action="submit"
                disabled={submitting || pristine}
              >
                Post
              </button>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
              />
              <button
                className=" site-button dept-button cancel-btn "
                action="cancel"
                onClick={this.handleCancel(replyId)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
  render() {
    if (!this.props.comments) {
      return <div>woah! No comments here..</div>;
    }
    return (
      <div className="col-10 col-md-12 mt-5 comment-card pr-5">
        <label className="signin-heading text-muted">Comments</label>
        {(!this.props.account) ? (<div className="d-flex col-12 mt-2">
          <div className="signin-box-com">
            <div className="">
              {" "}
              Sign in or Sign up to comment
      </div>
            <div className="d-flex">
              <div className="mr-3">
                <Link className="com-links" to="/signin">
                  {" "}
                  SIGN IN
          </Link>
              </div>
              <div className="">
                <Link className="com-links" to="/signup">
                  {" "}
                  SIGN UP
          </Link>
              </div>
            </div>
          </div>
        </div>) : <ul className="p-0">{this.UserReply()}</ul>}
        <ul className="p-0 mt-4">{this.renderComments()}</ul>
      </div>
    );
  }
}

const populateCommentValues = (state) => {
  var i, a;
  var coms = {};
  let comments = state.postDetails.comments;
  for (i in comments) {
    coms["editComment" + comments[i].id] = comments[i].text;
    if (comments[i].replyComments.length > 0) {
      for (a in comments[i].replyComments) {
        coms["editComment" + comments[i].replyComments[a].id] =
          comments[i].replyComments[a].text;
      }
    }
  }
  return coms;
};

const mapStateToProps = (state) => {
  return {
    account: state.auth.data,
    initialValues: populateCommentValues(state),
    comments: state.postDetails.comments
  };
};

const CommentsWithForm = reduxForm({
  form: "postComment",
  enableReinitialize: true,
})(Comments);

export default connect(mapStateToProps, { ...actions, ...postActions })(CommentsWithForm);
