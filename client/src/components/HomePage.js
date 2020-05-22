import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faComments,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

class HomePage extends PureComponent {
  componentWillMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <div key={post.id}>
          <div className="post">
            <a
              href={`/profile/${post.userId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="user">
                <div className="usericon">
                  <FontAwesomeIcon icon={faUserCircle} size="3x" color="gray" />
                </div>
                <div className="date-div">
                  <div className="username">{post.user.userName}</div>
                  <div className="post-date">{post.createdAt}</div>
                </div>
              </div>
            </a>
            <a
              href={`/postDetails/${post.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="card-title">{post.title}</div>
              <div className="comments-box">
                <div className="card-subtitle mb-2 text-muted">
                  {post.description}
                </div>
                <div className="post-comments">
                  <div>
                    <FontAwesomeIcon
                      icon={faComments}
                      size="lg"
                      className="comment"
                    />
                  </div>
                  comments
                  <div>
                    <FontAwesomeIcon icon={faBookmark} size="lg" /> save
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.posts) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul>{this.renderPosts()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts.homePage };
};

export default connect(mapStateToProps, actions)(HomePage);
