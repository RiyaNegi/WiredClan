import React from 'react';
import * as postActions from "../../actions/postActions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { faHeart as faHearts } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartr } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PostDetailLikes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.likesCount,
            updated: false,
            id: this.props.postId
        };

    }

    updateLikes = (id) => {
        return () => {
            if (!this.props.account) {
                this.notify()
            }
            else if (!this.state.updated && !this.props.likedByCurrentUser) {
                this.props.createPostLike(this.props.postId);
                this.setState((prevState, props) => {
                    return {
                        likes: prevState.likes + 1,
                        updated: true
                    };
                });

            } else if (this.state.likes > 0) {
                this.props.deletePostLike(this.props.postId);
                this.setState((prevState, props) => {
                    return {
                        likes: prevState.likes - 1,
                        updated: false
                    };
                });

            }
        }

    }


    notify = () =>
        toast.warning('❗ SIGN UP to like', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });

    render() {
        return (
            <div>
                {/* <button id={this.state.id} onClick={this.updateLikes(this.state.id)}>Like</button>
                <p>{this.state.likes}</p> */}

                <button className="pt-2 upvote d-flex flex-row align-items-center h-100 like-button" onClick={this.updateLikes(this.state.id)}>
                    <div className="d-flex flex-column">
                        <FontAwesomeIcon
                            className=" white-heart-post"
                            icon={faHeartr}
                            size="2x"
                            color={this.props.likedByCurrentUser ? "#cc2e36" : "gray"}
                        />

                        <FontAwesomeIcon
                            icon={faHearts}
                            className="red-heart-post"
                            size="2x"
                            color="white"
                        />
                    </div>
                    <span className="text-muted ml-2 mt-2 font-weight-bold"> {this.state.likes} likes</span>
                </button>

                <div><ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover
                /></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.auth.data
    };
};

export default connect(mapStateToProps, { ...postActions })(
    PostDetailLikes
);