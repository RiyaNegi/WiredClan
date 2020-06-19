import React from "react";
import { Link } from "react-router-dom";
import { faHeart as faHearts } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartr } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import History from "../../history.js";
import { Modal, Button, Badge } from "react-bootstrap";
import * as postActions from "../../actions/postActions";
import { connect } from "react-redux";

import Loader from "react-loader-spinner";

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
      this.props.fetchPostDetails(postId);
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
                className="box-shadow mb-3 p-0 post-box"
                onClick={((History) => (e) => {
                  const intersect = (a, b) => {
                    return a.filter(Set.prototype.has, new Set(b));
                  };
                  // DO NOT forget to include class name here if making anything clickable.
                  if (
                    intersect(
                      [...e.target.classList],
                      ["username", "edit-link", "delete-link", "ignore-link"]
                    ).length > 0
                  ) {
                    return;
                  }

                  History.push(`/postDetails/${post.id}`);
                })(History)}
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
                      className="ignore-link"
                      variant="secondary"
                      onClick={this.handleCloseModal}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      className="ignore-link"
                      onClick={this.handleDeleteClick(post.id)}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className="d-flex flex-row py-4 pr-3">
                  <div className="col-1 mt-2 p-0">
                    <Link className="upvote d-flex flex-column align-items-center h-100">
                      <FontAwesomeIcon
                        className="white-heart"
                        icon={faHeartr}
                        size="1x"
                        color="gray"
                      />
                      {post.karma}
                      <FontAwesomeIcon
                        icon={faHearts}
                        className="red-heart"
                        size="1x"
                        color="white"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="font-weight-bold no-decoration text-dark"
                      to={{
                        pathname: `/postDetails/${post.id}`,
                        state: { edit: false, draft: false },
                      }}
                    >
                      <span style={{ fontSize: "17px" }}>{post.title}</span>
                    </Link>
                    <div className="d-flex flex-row text-l-gray mt-1">
                      <a
                        className="text-l-gray username"
                        href={`/Users/${post.userId}`}
                      >
                        <div>
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
                        </div>
                      </a>

                      <div className="font-weight-light">
                        <span className="mx-1">|</span>
                        <Badge
                          className="badge-light ignore-link"
                          style={{ backgroundColor: "#e9e9e9" }}
                        >
                          {post.tag.text}
                        </Badge>
                        <span className="mx-1">|</span>
                        {post.commentsCount}
                        {post.commentsCount === 1 ? " comment" : " comments"}
                      </div>

                      {this.props.user &&
                      this.props.account.id === this.props.user.id ? (
                        <div className="feature-but-div">
                          <Link
                            className="com-links edit-link"
                            to={{
                              pathname: `/posts/${post.id}/edit`,
                              state: { edit: true },
                            }}
                          >
                            {/* <button
                            className=" post-item-buttons edit-button"
                            // onClick={this.handleEditPost(post.id)}
                          > */}
                            <FontAwesomeIcon
                              icon={faPen}
                              size="1x"
                              color="gray"
                            />{" "}
                            Edit
                            {/* </button> */}
                          </Link>
                          <button
                            className="post-item-buttons delete-link"
                            onClick={this.handleShowModal}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              size="1x"
                              color="gray"
                            />
                            Delete
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
                        </div>
                      ) : null}
                    </div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.auth.data,
  };
};

export default connect(mapStateToProps, { ...postActions })(PostsList);
