import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import Loader from 'react-loader-spinner'
class Comments extends Component {
    state = {
        replyClicked: [],
    }
    handleClick = (commentId) => {
        return (e) => {
            var newStateArray = this.state.replyClicked.slice();
            newStateArray.push({ "id": commentId });
            this.setState({ replyClicked: newStateArray });
        }
    }

    renderReplies = (comment, parentId) => {
        return comment.replyComments.map(replyComment => {
            return (
                <div className="reply-box" key={replyComment.id}>
                    <div className="reply-items user">
                        <a
                            href={`/Users/${replyComment.user.id}`}
                            style={{ textDecoration: "none", color: "black" }}
                        >
                            <div className="usericon">
                                <img
                                    src={replyComment.user.imageUrl}
                                    style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                                    alt=""
                                />
                            </div>
                        </a>
                        <div className="text-reply">
                            <div className="comment-text">
                                <a
                                    href={`/Users/${replyComment.user.id}`}
                                    style={{ textDecoration: "none", color: "black" }}
                                >
                                    <div className="date-div" >
                                        <span className="username">{replyComment.user.userName}</span>
                                    </div>
                                </a>
                                <div className="card-text"> {replyComment.text}</div>
                            </div>
                            <button className="reply-button reply-sec" onClick={this.handleClick(replyComment.id)}>
                                <FontAwesomeIcon
                                    icon={faReply}
                                    size="1x"
                                    color="gray"
                                /> Reply
                            </button>
                        </div>
                    </div>
                    {this.state.replyClicked.filter(ci => ci.id === replyComment.id).length ? this.UserReply(parentId, replyComment.id) : null}
                </div >
            );
        });

    }
    renderComments() {
        return this.props.comments.map(comment => {
            console.log('rendering comment#', comment.id);
            return (
                <div key={comment.id}>
                    <div className="user">
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
                    {this.state.replyClicked.filter(ci => ci.id === comment.id).length ? this.UserReply(comment.id, comment.id) : null}
                    {comment.replyComments.length ? this.renderReplies(comment, comment.id) : null}
                </div >
            );
        });
    }


    handleFormSubmit = (parentId, replyId) => {
        return (params) => {
            if (!!params['comment' + replyId]) {
                if (!parentId) {
                    this.props.postComment(this.props.postId, params['comment' + replyId])
                }
                else {
                    this.props.postComment(this.props.postId, params['comment' + replyId], parentId)
                }
                this.setState({ replyClicked: [] })
            }
        };
    }

    UserReply(parentId, replyId) {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit(parentId, replyId).bind(this))}>
                <ul className="post-reply-sec">
                    <div className="profile-items">
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
                        <div className="post-reply-but">
                            <button className="post-reply" action="submit" >
                                Post
                    </button>
                        </div>
                    </div>
                </ul>
            </form>
        )
    }
    render() {
        // let replyLen = this.props.comments.map(i => i += i.replyComments.length)
        // let len = this.props.comments.length + replyLen
        if (!this.props.comments) {
            return <div>woah! No comments here..</div>;
        }

        return (
            <div>
                <ul className="comments-title">
                    {this.props.comments.length}{" "}
                    {this.props.comments.length === 1 ? "Comment" : "Comments"}
                </ul>
                {this.UserReply()}
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