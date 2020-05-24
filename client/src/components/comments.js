import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

class Comments extends Component {

    onClick = () => {
        <userReply />
    }
    renderReplies(comment) {
        return comment.replyComments.map(replyComment => {
            return (
                <div className="reply-box">
                    <div className="reply-items user">
                        <div className="usericon">
                            <img
                                src={replyComment.user.imageUrl}
                                style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                            />
                        </div>
                        <div className="text-reply">
                            <div className="comment-text">
                                <div className="date-div" style={{ marginTop: 5 }}>
                                    <span className="username">{replyComment.user.userName}</span>
                                </div>
                                <div className="card-text">{replyComment.text}</div>
                            </div>
                            <button className="reply-button reply-sec">
                                <FontAwesomeIcon
                                    icon={faReply}
                                    size="1x"
                                    color="gray"
                                /> Reply
                            </button>
                        </div>
                    </div>
                </div >
            );
        });

    }
    renderComments() {
        return this.props.comments.map(comment => {
            return (
                <div>
                    <div className="user">
                        <div className="usericon">
                            <img
                                src={comment.user.imageUrl}
                                style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                            />
                        </div>
                        <div className="text-reply">
                            <div className="comment-text">
                                <div className="date-div" style={{ marginTop: 5 }}>
                                    <span className="username">{comment.user.userName}</span>
                                </div>
                                <div className="card-text">{comment.text}</div>
                            </div>
                            <button className="reply-button reply-sec">
                                <FontAwesomeIcon
                                    icon={faReply}
                                    size="1x"
                                    color="gray"
                                /> Reply
                            </button>
                        </div>
                    </div>
                    {comment.replyComments.length ? this.renderReplies(comment) : null}
                </div >
            );
        });
    }

    userReply() {
        console.log("userREply called")
        return (
            <ul className="profile-items">
                <div className="profile-icon">
                    <img
                        src={this.props.account.imageUrl}
                        style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                    />
                </div>
                <div className="com-box" >
                    <input className="post-comment" type='text' placeholder="Type your reply here." />
                </div>
            </ul>
        )
    }
    render() {
        console.log("state: ", this.props.account);
        let replyLen = this.props.comments.map(i => (i += i.replyComments.length))
        let len = this.props.comments.length + replyLen
        if (!this.props.comments) {
            return <div>woah! No comments here..</div>;
        }
        return (
            <div>
                <ul className="comments-title">
                    {this.props.comments.length}{" "}
                    {this.props.comments.length === 1 ? "Comment" : "Comments"}
                </ul>
                <ul className="profile-items">
                    <div className="profile-icon">
                        <img
                            src={this.props.account.imageUrl}
                            style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                        />
                    </div>
                    <div className="com-box" >
                        <input className="post-comment" type='text' placeholder="Type your reply here." />
                    </div>
                </ul>
                <ul>{this.renderComments()}</ul>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return { account: state.auth.data };
};

export default connect(mapStateToProps, actions)(Comments)