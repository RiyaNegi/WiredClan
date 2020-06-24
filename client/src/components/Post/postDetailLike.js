import React from 'react';
import * as postActions from "../../actions/postActions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


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
                <button id={this.state.id} className="ignore-link" onClick={this.updateLikes(this.state.id)}>Like</button>
                <p>{this.state.likes}</p>
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
