import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faComments } from "@fortawesome/free-solid-svg-icons";

// 1. Render all the posts with the correct ID in the URLs.
// 2. Pass them to the post component when you click on a post
// 3. Before rendering fetch post from API. You will have to pass the id that you got to the API

class PostDetails extends Component {
  componentWillMount() {
    this.props.fetchPostDetails(this.props.match.params.id);
  }
  renderPostDetails() {
    let post = this.props.post;
    return (
      <div className=" post card">
        <div className="user">
          <div className="usericon">
            <FontAwesomeIcon icon={faUserCircle} size="3x" color="gray" />
          </div>
          <div className="date-div">
            <div className="username">{post.user.userName}</div>
            <div className="post-date">20th May 2020</div>
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
    console.log("post", this.props.post);
    if (!this.props.post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul>{this.renderPostDetails()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { post: state.postDetails.data };
};

export default connect(mapStateToProps, actions)(PostDetails);
