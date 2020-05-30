import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Comments from "./comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faComments } from "@fortawesome/free-solid-svg-icons";
import Loader from 'react-loader-spinner'
class PostDetails extends Component {
  componentWillMount() {
    this.props.fetchPostDetails(this.props.match.params.id);
  }
  renderPostDetails() {
    let post = this.props.post;
    return (
      <div className="post-details" key={post.id}>
        <div className="user">
          <div className="usericon">
            <a
              href={`/Users/${post.userId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                src={post.user.imageUrl}
                style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                alt="userIcon"
              />
            </a>
          </div>
          <div className="date-div details">
            <a
              href={`/Users/${post.userId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="username username-main">{post.user.userName}</span>
            </a>
            <span className="post-date" style={{ marginTop: 9 }}>
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
        <div className="card-title post-detail">{post.title}</div>
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
      return (
        <div className="loader">
          <Loader
            type="ThreeDots"
            color="#ffe31a"
            height={100}
            width={100}
          />
        </div >
      )
    }
    return (
      <div className="col-md-10">
        <ul>{this.renderPostDetails()}</ul>
        <Comments comments={this.props.comments} postId={this.props.post.id} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { post: state.postDetails.details, comments: state.postDetails.comments };
};

export default connect(mapStateToProps, actions)(PostDetails);
