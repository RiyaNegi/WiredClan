import React from 'react';
import * as postActions from "../../actions/postActions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faFire as faHearts } from "@fortawesome/free-solid-svg-icons";
import { faFire as faHeartr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class PostLikes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likesCount,
      updated: this.props.likedByCurrentUser,
      id: this.props.postId,
      likeLoginNotify: false
    };
  }

  updateLikes = (e) => {
    if (!this.props.account && !this.state.likeLoginNotify) {
      this.notify();
      this.setState({ likeLoginNotify: true })
      return
    }
    else if (this.props.account && !this.state.updated && !this.state.updated) {
      this.props.createLike(this.props.postId);
      this.setState({
        likes: this.state.likes + 1,
        updated: true
      });
      return
    }
    else if (this.props.account && this.state.likes > 0) {
      this.props.deleteLike(this.props.postId);
      this.setState({
        likes: this.state.likes - 1,
        updated: false
      });
      return
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
          onClick={this.updateLikes}>
          <FontAwesomeIcon
            className=" white-heart"
            icon={faHeartr}
            size="1x"
            color={this.state.updated ? "#eb6c4c" : "gray"}
          />
          <span className="text-muted "> {this.state.likes}</span>
          <FontAwesomeIcon
            icon={faHearts}
            className="red-heart"
            size="1x"
            color="white"
          />
        </button>
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

