import React, { Component } from "react";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Modal, Button, Tabs, Tab, Badge } from "react-bootstrap";
import PostsList from "../Post/PostsList";
import * as authActions from "../../actions/authActions";
import { faHeart as faHearts } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartr } from "@fortawesome/free-regular-svg-icons";

import "./user.css";

class Profile extends Component {
  state = {
    edit: "edit",
    showModal: false,
  };

  componentWillMount() {
    let id = parseInt(this.props.match.params.id);
    if (this.props.account && id === this.props.account.id) {
      this.props.fetchUser(this.props.match.params.id, true);
    } else {
      this.props.fetchUser(this.props.match.params.id, false);
    }
  }
  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleEditPost(postId) {
    return (e) => {
      let id = parseInt(this.props.match.params.id);
      if (id === this.props.account.id) {
        this.props.fetchPostDetails(postId, true);
      } else {
        this.props.fetchPostDetails(postId, false);
      }
    };
  }

  handleDeleteClick = (postId) => {
    return (e) => {
      this.props.deletePost(postId);
      this.handleCloseModal();
    };
  };

  renderPosts(posts, { draft } = { draft: false }) {
    return (
      <PostsList
        posts={posts}
        draft={draft}
        user={this.props.user}
        account={this.props.account}
      />
    );
  }

  renderUserCard() {
    return (
      <div className="box-shadow d-flex flex-column align-items-center profile-box p-3">
        <img
          className=""
          src={this.props.user.imageUrl}
          style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
          alt="userIcon"
        />
        <label className="mt-3 font-weight-bold text-center">
          {this.props.user.firstName} {this.props.user.lastName}
        </label>
        <div>
          <div className="d-flex flex-row align-items-center">
            <FontAwesomeIcon
              className="white-heart"
              icon={faHeartr}
              size="1x"
              color="gray"
            />
            <div className="ml-2 text-muted font-weight-bold">
              {this.props.user.karma} karma
            </div>
          </div>
        </div>
        {this.props.user.badges && this.props.user.badges.length > 0 && (
          <Badge pill variant="secondary" className="d-flex mt-2">
            {this.props.user.badges[0]}
          </Badge>
        )}
        <div className="text-muted font-weight-bold text-center">
          {this.props.user.college}
        </div>
        {this.props.user.year && (
          <div className="text-muted font-weight-bold">
            Year {this.props.user.year}
          </div>
        )}
        <div className="text-muted font-weight-bold">
          <a href={`/users/${this.props.user.id}/form`}>edit</a>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.user || !this.props.posts) {
      return (
        <div className="loader">
          <Loader type="ThreeDots" color="#ffe31a" height={100} width={100} />
        </div>
      );
    }

    return (
      <div className="mt-4 row">
        <div className="col-12 col-md-3">{this.renderUserCard()}</div>
        <div className="col-12 col-md-9">
          <React.Fragment>
            <Tabs defaultActiveKey="user-posts" id="user-tab">
              <Tab eventKey="user-posts" title="Posts">
                <div className="mt-3">{this.renderPosts(this.props.posts)}</div>
              </Tab>
              {this.props.account &&
                this.props.account.id === this.props.user.id && (
                  <Tab eventKey="user-drafts" title="Drafts">
                    <div className="mt-3">
                      {this.renderPosts(this.props.drafts, { draft: true })}
                    </div>
                  </Tab>
                )}
            </Tabs>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userDetails.user,
    account: state.auth.data,
    posts: state.posts.posts,
    drafts: state.posts.drafts,
  };
};

export default connect(mapStateToProps, {
  ...actions,
  ...postActions,
  ...authActions,
})(Profile);
