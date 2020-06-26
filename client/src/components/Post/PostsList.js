import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import History from "../../history.js";
import { Modal, Button, Badge } from "react-bootstrap";
import * as postActions from "../../actions/postActions";
import { connect } from "react-redux";
import * as authActions from "../../actions/authActions";
import Loader from "react-loader-spinner";
import slugify from "slugify";
import PostLikes from "./likes";

class PostsList extends React.Component {
  state = {
    showModal: false,
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleEditPost(postId) {
    return (e) => {
      this.props.fetchPost(postId);
    };
  }

  handleLike(postId) {
    return (e) => {
      this.props.createLike(postId);
    };
  }

  handleDeleteClick = (postId) => {
    return (e) => {
      this.props.deletePost(postId);
      this.handleCloseModal();
    };
  };

  render() {
    const { className, style, draft } = this.props;
    return (
      <div className={className} style={style}>
        {this.props.posts ? (
          this.props.posts.map((post) => {
            return (
              <div
                key={post.id}
                className={"post-link box-shadow mb-3 p-0 post-box"}
                onClick={((History, draft) => (e) => {
                  if ([...e.target.classList].includes("post-link") === false) {
                    return;
                  }
                  if (draft) {
                    History.push(`/posts/${post.id}/edit`);
                    return
                  }
                  History.push(`/${slugify(post.title)}/${post.id}`);
                })(History, draft)}
              >
                <Modal
                  className="modal-background"
                  show={this.state.showModal}
                  onHide={this.handleCloseModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Delete this post permanently?</Modal.Body>
                  <Modal.Footer>
                    <Button
                      className=""
                      variant="secondary"
                      onClick={this.handleCloseModal}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      className=""
                      onClick={this.handleDeleteClick(post.id)}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div className="post-link d-flex flex-row py-4 pr-3">
                  <PostLikes likesCount={post.likesCount} postId={post.id} likedByCurrentUser={post.likedByCurrentUser} />
                  <div className="post-link">
                    <Link
                      className=" font-weight-bold no-decoration text-dark"
                      to={{
                        pathname: `/${slugify(post.title)}/${post.id}`,
                        state: { edit: false, draft: false },
                      }}
                    >
                      <span style={{ fontSize: "17px" }}>{post.title}</span>
                    </Link><br />
                    <span className="text-l-gray">
                      <a
                        className="text-l-gray username"
                        href={`/Users/${post.userId}`}
                      >
                        <img
                          src={
                            this.props.user
                              ? this.props.user.imageUrl
                              : post.user.imageUrl
                          }
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 20 / 2,
                          }}
                          alt="usericon"
                        />
                        <span className="username ml-2 ">
                          {this.props.user
                            ? this.props.user.firstName +
                            " " +
                            this.props.user.lastName
                            : post.user.firstName + " " + post.user.lastName}
                        </span>
                      </a>
                      <div className="hidden-sm-up"></div>
                      <span className="font-weight-light post-link">
                        <span className="mx-1 hidden-sm-down">|</span>
                        <Badge
                          className="post-link badge-light "
                          style={{ backgroundColor: "#e9e9e9" }}
                        >
                          {post.tag.text}
                        </Badge>
                        <span className="mx-1">|</span>
                        {post.commentsCount}
                        {post.commentsCount === 1 ? " comment" : " comments"}
                      </span>
                      {this.props.user &&
                        this.props.account &&
                        this.props.account.id === this.props.user.id ? (
                          <span className="feature-but-div">
                            <Link
                              className=" com-links edit-link"
                              to={{
                                pathname: `/posts/${post.id}/edit`,
                                state: { edit: true },
                              }}
                            >
                              <button
                                className="post-item-buttons edit-button"
                              >
                                <FontAwesomeIcon
                                  icon={faPen}
                                  size="1x"
                                  color="gray"
                                />{" "}
                                Edit
                            </button>
                            </Link>
                            <button
                              className=" post-item-buttons delete-button"
                              onClick={this.handleShowModal}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                size="1x"
                                color="gray"
                              />{" "} Delete
                          </button>
                            {draft ? (
                              <Link
                                className="com-links"
                                to={`/previewPost/${post.id}`}
                              >
                                <button className="post-item-buttons preview-button">
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    size="1x"
                                    color="gray"
                                  />{" "}
                                  Preview
                              </button>
                              </Link>
                            ) : null}
                          </span>
                        ) : null}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
            <div className="loader">
              <Loader type="ThreeDots" color="#ffe31a" height={100} width={100} />
            </div>
          )}
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.auth.data
  };
};

export default connect(mapStateToProps, { ...postActions, ...authActions })(
  PostsList
);
