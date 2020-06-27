import React from 'react';
import * as postActions from "../../actions/postActions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { faFire as faHearts } from "@fortawesome/free-solid-svg-icons";
import { faFire as faHeartr } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faHearts } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faHeartr } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class PostLikes extends React.Component {

  constructor(props) {
    super(props);
    console.log("NOW PROPS ARE: ", props);
    this.state = {
      likes: this.props.likesCount,
      updated: false,
      id: this.props.postId,
      loginNotify: false
    };

  }

  updateLikes = (id) => {
    return () => {
      if (!this.props.account && !this.state.loginNotify) {
        this.notify();
        this.setState({ loginNotify: true })
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
    toast.warning('❗ Sign in to like', {
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
      <div className="">
        <button className="px-3 pt-2 upvote d-flex flex-column align-items-center h-100 like-button"
          onClick={this.updateLikes(this.state.id)}>
          <FontAwesomeIcon
            className=" white-heart"
            icon={faHeartr}
            size="1x"
            color={this.props.likedByCurrentUser ? "#eb6c4c" : "gray"}
          />
          <span className="text-muted "> {this.state.likes}</span>
          <FontAwesomeIcon
            icon={faHearts}
            className="red-heart"
            size="1x"
            color="white"
          />
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
  PostLikes
);

