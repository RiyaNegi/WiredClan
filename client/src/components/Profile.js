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
                                <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="post-tab"><label className="prof-post-header">{this.props.user.posts.length} Posts Created</label>
                                    {this.renderPosts()}</div>
                                <div class="tab-pane fade" id="drafts" role="tabpanel" aria-labelledby="draft-tab">...</div>
                            </div>
                        </React.Fragment>
                    ) :
                        <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="post-tab">
                            <label className="prof-post-header">{this.props.user.posts.length} Posts Created</label>
                            {this.renderPosts()}
                        </div>}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.userDetails.users, account: state.auth.data };
};

export default connect(mapStateToProps, actions)(Profile);