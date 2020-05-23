import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Comments from "./comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faComments } from "@fortawesome/free-solid-svg-icons";

class PostDetails extends Component {
  componentWillMount() {
    this.props.fetchPostDetails(this.props.match.params.id);
  }
  renderPostDetails() {
    let post = this.props.post;
    return (
      <div className=" post-details">
        <div className="user">
          <div className="usericon">
            <img
              src={post.user.imageUrl}
              style={{ width: 28, height: 28, borderRadius: 28 / 2 }}
            />
          </div>
          <div className="date-div">
            <span className="username">{post.user.userName}</span>
            <span className="post-date">
              {" "}
              Posted on{" "}
              {
                ["4th July", "22nd May", "15th Nov"][
                Math.floor(Math.random() * 3)
                ]
              }{" "}
            </span>
          </div>
        </div>
        <div className="card-title">{post.title}</div>
        <div className="card-text">{post.description}</div>
        <div className="tech-stack">
          <div className="tech">Technology Stack :</div>
          <div className="tech-details">React, redux, nodeJS</div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.post) {
      return <div>Loading...</div>;
    }
    console.log("post->>>>", this.props.post)
    return (
      <div>
        <ul>{this.renderPostDetails()}</ul>
        <Comments comments={this.props.post.comments} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { post: state.postDetails.data };
};

export default connect(mapStateToProps, actions)(PostDetails);
