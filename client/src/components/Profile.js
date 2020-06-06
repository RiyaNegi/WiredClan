import React, { Component } from "react"
import * as actions from "../actions";
import { connect } from "react-redux";
import Croods from "./croods.png";
import Loader from 'react-loader-spinner'
class Profile extends Component {
    componentWillMount() {
        console.log("fetch user called:", this.props.match.params.id)
        this.props.fetchUser(this.props.match.params.id);
    }

    renderPosts() {
        return this.props.user.posts.map(post => {
            return (
                <div key={post.id} className="post prof-post-box">
                    <a
                        href={`/Users/${post.userId}`}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div className="user">
                            <div className="usericon">
                                <img
                                    src={this.props.user.imageUrl}
                                    style={{ width: 28, height: 28, borderRadius: 28 / 2 }}
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
                    <a
                        href={`/postDetails/${post.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div className="card-title prof-title">{post.title}</div>
                        <div className="comments-box">
                            <div className="post-comments">
                                <div>
                                    {post.commentsCount}{" "}
                                    {post.commentsCount === 1 ? "Comment" : "Comments"}
                                </div>
                                <div className="user-prof-det">
                                    <label className="user-prof-details-name com-branch">
                                        {this.props.user.department}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
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

        console.log("user data: ", this.props.user)
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
                    <label className="prof-post-header">{this.props.user.posts.length} Posts Created</label>
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.userDetails.users };
};

export default connect(mapStateToProps, actions)(Profile);