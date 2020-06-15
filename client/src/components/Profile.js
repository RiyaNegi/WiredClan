import React, { Component } from "react"
import * as actions from "../actions";
import { connect } from "react-redux";
import Croods from "./croods.png";
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

class Profile extends Component {
    state = {
        edit: 'edit',
        showModal: false
    }

    componentWillMount() {
        let id = parseInt(this.props.match.params.id);
        if (id === this.props.account.id) {
            this.props.fetchUser(this.props.match.params.id, true);
        }
        else {
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
                this.props.fetchPostDetails(postId, true)
            }
            else {
                this.props.fetchPostDetails(postId, false)
            }
        }
    }

    handleDeleteClick = (postId) => {
        return (e) => {
            this.props.deletePost(postId)
            this.handleCloseModal()
        }

    }

    renderPosts(posts, edit) {
        return posts.map(post => {
            return (
                <div key={post.id} className="post prof-post-box">
                    <Modal className="modal-background" show={this.state.showModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Delete this post permanently?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseModal}>
                                Close
                         </Button>
                            <Button variant="primary" onClick={this.handleDeleteClick(post.id)}>
                                Delete
                         </Button>
                        </Modal.Footer>
                    </Modal>
                    <a
                        href={`/Users/${post.userId}`}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div className="user">
                            <div className="usericon">
                                <img
                                    src={this.props.user.imageUrl}
                                    style={{ width: 28, height: 28, borderRadius: 28 / 2 }}
                                    alt="usericon"
                                />
                            </div>
                            <div className="date-div">
                                <span className="username username-main">{this.props.user.userName}</span>
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
                    </a>
                    <Link
                        to={edit ? { pathname: `/posts/${post.id}/edit`, state: { edit: true } } : `/postDetails/${post.id}`}
                        className="com-links" >
                        <div className="card-title prof-title">{post.title}</div>
                    </Link>
                    <div className="comments-box">
                        <div className="post-comments feature-div">
                            <div>
                                {post.commentsCount}{" "}
                                {post.commentsCount === 1 ? "Comment" : "Comments"}
                            </div>
                            <div className="user-prof-det">
                                {/* <label className="user-prof-details-name com-branch">
                                        {this.props.user.department}
                                    </label> */}
                            </div>
                            {this.props.account.id === this.props.user.id ? (<div className="feature-but-div">
                                <Link className="com-links" to={{ pathname: `/posts/${post.id}/edit`, state: { edit: true } }} >
                                    <button className=" post-item-buttons edit-button" onClick={this.handleEditPost(post.id)} >
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            size="1x"
                                            color="gray"
                                        /> Edit
                                </button>
                                </Link>
                                <button className="post-item-buttons delete-button" onClick={this.handleShowModal} >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        size="1x"
                                        color="gray"
                                    /> Delete
                                </button>
                                {edit ? (
                                    <Link className="com-links" to={`/previewPost/${post.id}`} >
                                        <button className="post-item-buttons preview-button">
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                size="1x"
                                                color="gray"
                                            /> Preview
                                </button>
                                    </Link>
                                ) : null}
                            </div>) : null}
                        </div>
                    </div>
                </div >
            );
        });
    }
    render() {
        if (!this.props.user) {
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
            <div className="row-div-profile">
                <div className="image-col">
                    <div className="profile-card">
                        <div className="profileDet-icon">
                            <img
                                src={this.props.user.imageUrl}
                                style={{ width: 80, height: 80, borderRadius: 80 / 2 }}
                                alt="userIcon"
                            />
                        </div>
                        <div className="user-prof-det">
                            <label className="user-prof-details-username">
                                {this.props.user.userName}
                            </label>
                        </div>
                        <div className="user-prof-det">
                            <label className="user-prof-details-name">
                                {this.props.user.firstName} {this.props.user.lastName}
                            </label>
                        </div>
                        <div className="user-prof-det">
                            <label className="user-prof-details-name">
                                Branch: {this.props.user.department}
                            </label>
                        </div>
                    </div>
                    <div className="prof-image-deets"><img src={Croods} style={{ width: 370, height: 290 }}
                        alt="userIcon" /></div>
                </div>
                <div className="profile-posts col-md-9">
                    {this.props.account && this.props.account.id === this.props.user.id ? (
                        <React.Fragment>
                            <ul class="nav nav-tabs nav-tabs-profile" id="myTab" role="tablist">
                                <li class="nav-item nav-items-profile">
                                    <a class="nav-link active nav-links-profile" id="post-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Posts</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link nav-links-profile" id="draft-tab" data-toggle="tab" href="#drafts" role="tab" aria-controls="drafts" aria-selected="false">Drafts</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="post-tab">
                                    <label className="prof-post-header">{this.props.posts.length > 1 ? this.props.posts.length + " Posts Created" : this.props.posts.length === 1 ? this.props.posts.length + " Post Created" : " No Posts Created"}</label>
                                    {this.renderPosts(this.props.posts)}</div>
                                <div class="tab-pane fade" id="drafts" role="tabpanel" aria-labelledby="draft-tab">
                                    <label className="prof-post-header">{this.props.drafts.length > 1 ? this.props.drafts.length + " Drafts Created" : this.props.drafts.length === 1 ? this.props.drafts.length + " Draft Created" : " No Drafts Created"}</label>
                                    {this.renderPosts(this.props.drafts, true || [], true)}</div>
                            </div>
                        </React.Fragment>
                    ) :
                        <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="post-tab">
                            <label className="prof-post-header">{this.props.posts.length > 1 ? this.props.posts.length + " Posts Created" : this.props.posts.length === 0 ? this.props.posts.length + " Post Created" : " No Posts Created"}</label>
                            {this.renderPosts(this.props.posts)}
                        </div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.userDetails.user, account: state.auth.data, posts: state.userDetails.posts, drafts: state.userDetails.drafts };
};

export default connect(mapStateToProps, actions)(Profile);