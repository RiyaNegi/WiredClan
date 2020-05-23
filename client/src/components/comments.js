import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Comments extends Component {
    // state = {
    //     postId: ""
    // }
    // componentWillMount() {
    //     this.setState({ postId: this.props })
    // }

    renderComments() {
        return (
            <div className="comments-title">
                Comments
            </div>
        )
    }

    render() {
        console.log("comments", this.props.comments);
        if (!this.props.comments) {
            return <div>woah! No comments here..</div>;
        }
        return (
            <ul>{this.renderComments()}</ul>
        )
    }

}


export default Comments