import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
class Comments extends Component {
  state = {
    replyClicked: [],
    editClicked: []
  }

  handleClick = (commentId) => {
    return (e) => {
      var newStateArray = this.state.replyClicked.slice();
      newStateArray.push({ "id": commentId });
      this.setState({ replyClicked: newStateArray });
    }
  }

  handleEditClick = (commentId) => {
    return (e) => {
      var newStateArray = this.state.editClicked.slice();
      newStateArray.push({ "id": commentId });
      this.setState({ editClicked: newStateArray });
    }
  }

  renderReplies = (comment, parentId) => {
    return comment.replyComments.map(replyComment => {
      console.log("called it redner replies")
      return (
        <div className="reply-box" key={replyComment.id}>
          {
            this.state.editClicked.filter(ci => ci.id === replyComment.id).length && this.props.account ?
              this.UserReply(parentId, replyComment.id, true)
              :
              this.renderComment(replyComment)
          }
          {this.state.replyClicked.filter(ci => ci.id === replyComment.id).length && this.props.account ? this.UserReply(parentId, replyComment.id) : null}
        </div >
      );
    });

  }

  renderComment(comment) {
    console.log("called it render com")
    return <div className="user com-user">
      <div className="comment-space">
        <div className="comment-row-sec">
          <a
            href={`/Users/${comment.user.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="usericon">
              <img
                src={comment.user.imageUrl}
                style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                alt="userIcon"
              />
            </div>
          </a>
          <div className="text-reply">
            <div className="comment-text">
              <div className="date-div" >
                <a
                  href={`/Users/${comment.user.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span className="username">{comment.user.userName}</span>
                </a >
              </div>

              <div className="card-text">{comment.text}</div>
            </div>
            <button className="reply-button reply-sec" onClick={this.handleClick(comment.id)}>
              <FontAwesomeIcon
                icon={faReply}
                size="1x"
                color="gray"
              /> Reply
                    </button>
          </div>
        </div>
        <div className="comment-edit">
          {this.props.account && comment.userId === this.props.account.id ? (
            <div className="dropdown">
              <button type="button" className="btn btn-secondary  edit-comment-but" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false" >
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  size="1x"
                />
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <button className="dropdown-item" onClick={this.handleEditClick(comment.id)}>Edit</button>
                <button className="dropdown-item" href="#">Delete</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>;
  }

  renderComments() {
    return this.props.comments.map(comment => {
      console.log("called it render coms")
      return (
        <div key={comment.id}>
          {
            this.state.editClicked.filter(ci => ci.id === comment.id).length && this.props.account ?
              this.UserReply(comment.id, comment.id, true)
              :
              this.renderComment(comment)
          }
          {this.state.replyClicked.filter(ci => ci.id === comment.id).length && this.props.account ? this.UserReply(comment.id, comment.id) : null}
          {comment.replyComments.length ? this.renderReplies(comment, comment.id) : null}
        </div >
      );
    });
  }


  handleFormSubmit = (parentId, replyId, edit) => {
    return (params) => {
      if (edit) {
        if (params['comment' + replyId]) {
          this.props.updateComment(this.props.postId, params['comment' + replyId], replyId)
          this.setState({ replyClicked: [], editClicked: [] })
        }
      }
      else {
        if (params['comment' + replyId]) {
          if (!parentId) {
            this.props.postComment(this.props.postId, params['comment' + replyId])
          }
          else {
            this.props.postComment(this.props.postId, params['comment' + replyId], parentId)
          }
          this.setState({ replyClicked: [], editClicked: [] })
        }
      }
    };
  }

  handleCancel = (commentId) => {
    return (e) => {
      let filteredReplyArray = this.state.replyClicked.filter(i => i.id !== commentId)
      let filteredEditArray = this.state.editClicked.filter(i => i.id !== commentId)
      this.setState({ replyClicked: filteredReplyArray, editClicked: filteredEditArray });
    }
  }
  UserReply(parentId, replyId, edit) {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={edit ?
        handleSubmit(this.handleFormSubmit(parentId, replyId, edit).bind(this))
        :
        handleSubmit(this.handleFormSubmit(parentId, replyId).bind(this))}>
        <div className={"post-reply-sec" + edit ? "newedit" : ""}>
          <div className="profile-items">
            <div className="prof-row-item">
              <div className="profile-icon">
                <img
                  src={this.props.account.imageUrl}
                  style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                  alt="userIcon"
                />
              </div>
              <fieldset className="com-box" >

                < Field className="post-comment"
                  type='text'
                  placeholder="Type your reply here."
                  component='input'
                  name={'comment' + replyId}
                />
              </fieldset>
            </div>
            <div className="post-reply-but">
              <button className="site-button post-button post-reply " action="submit" >
                Post
              </button>
              <button className="btn-secondary site-button dept-button cancel-btn " action="cancel" onClick={this.handleCancel(replyId)} >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
  render() {
    if (!this.props.comments) {
      return <div>woah! No comments here..</div>;
    }

    return (
      <div>
        <ul className="comments-title">
          {this.props.comments.length}{" "}
          {this.props.comments.length === 1 ? "Comment" : "Comments"}
        </ul>
        {this.props.account ? this.UserReply()
          : (
            <div className="comment-box-spec">
              <div className="signin-box-com">
                <div className="signin-box-text"> Log in or Sign up to comment</div>
                <div className="space-bet-com">
                  <div className="signin-but-com site-button dept-button">
                    <Link className="com-links" to="/signin"> LOG IN</Link>
                  </div>
                  <div className="signup-but-com site-button post-button">
                    <Link className="com-links" to="/signup"> SIGN UP</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        <ul>{this.renderComments()}</ul>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return { account: state.auth.data };
};

export default reduxForm({
  form: "postComment"
})(connect(mapStateToProps, actions)(Comments));