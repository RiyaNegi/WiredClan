import React from 'react';
import * as postActions from "../../actions/postActions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



class PostLikes extends React.Component {

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
                console.log("m here")
                this.notify()
            }
            else if (this.props.account && !this.state.updated && !this.props.likedByCurrentUser) {
                this.props.createLike(this.props.postId);
                this.setState((prevState, props) => {
                    return {
                        likes: prevState.likes + 1,
                        updated: true
                    };
                });

            } else if (this.props.account && this.state.likes > 0) {
                this.props.deleteLike(this.props.postId);
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
                {this.props.likedByCurrentUser && (<p>liked</p>)}
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
    PostLikes
);
// {/* <button className="ignore-link upvote d-flex flex-column align-items-center h-100 like-button" onClick={this.handleLike(post.id)}>
//     <div className="d-flex flex-row py-4 pr-3">
//         <div className=" col-2 col-md-1 mt-2 p-0">
//             <FontAwesomeIcon
//                 className="ignore-link white-heart"
//                 icon={faHeartr}
//                 size="1x"
//                 color="gray"
//             />
//             {post.likesCount}
//             <FontAwesomeIcon
//                 icon={faHearts}
//                 className="ignore-link red-heart"
//                 size="1x"
//                 color="white"
//             />
//         </div>
//     </div>
// </button> */}
