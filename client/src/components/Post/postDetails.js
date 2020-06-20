import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Comments from "../comments";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { faHeart as faHearts } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartr } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Badge } from "react-bootstrap";
import "./details.css";

class PostDetails extends Component {
  componentWillMount() {
    this.props.fetchPostDetails(this.props.match.params.id);
  }
  convertDataFromJSONToHTML = (object) => {
    const html = object;
    const cleanHtml = (html) => {
      // Clean spaces between tags
      var newText = html.replace(
        /(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g,
        "$1$3"
      );

      // Clean empty paragraphs before the content
      // <p><br/><p> && <p></p>
      var slicer;
      while (
        newText.slice(0, 20) === "<p></p>" ||
        newText.slice(0, 11) === "<p><br></p>"
      ) {
        if (newText.slice(0, 20) === "<p></p>") slicer = 7;
        else slicer = 11;
        newText = newText.substring(slicer, newText.length);
      }

      // Clean empty paragraphs after the content
      while (
        newText.slice(-7) === "<p></p>" ||
        newText.slice(-11) === "<p><br></p>"
      ) {
        if (newText.slice(-7) === "<p></p>") slicer = 7;
        else slicer = 11;
        newText = newText.substring(0, newText.length - slicer);
      }
      // Return the clean Text
      return newText;
    };

    return cleanHtml(html);
  };
  renderPostDetails() {
    let post = this.props.post;
    return (
      <div key={post.id}>
        <div>
          <div>
            <h3> {post.title} </h3>
          </div>
          <div>
            <a href={`/Users/${post.userId}`} className="no-decoration">
              <span className="text-muted"> Posted by </span>{" "}
              <span className="font-weight-bold">
                {" "}
                <img
                  src={post.user.imageUrl}
                  style={{ width: 20, height: 20, borderRadius: 20 / 2 }}
                  alt="userIcon"
                  className="mr-1"
                />
                {post.user.userName}
              </span>
            </a>
          </div>
        </div>
        <div className="mt-3 post-display">
          <div
            dangerouslySetInnerHTML={{
              __html: this.convertDataFromJSONToHTML(post.description),
            }}
          ></div>
        </div>
        <div className="mt-5 d-flex flex-row justify-content-between">
          <button
            type="button"
            class="btn btn-light post-tag-button text-l-gray align-self-center"
          >
            {this.props.post.tag.text}
          </button>

          <div>
            <Link className="upvote d-flex flex-row no-decoration">
              <div>
                <div className="d-flex flex-column align-items-center h-100">
                  <FontAwesomeIcon
                    className="white-heart"
                    icon={faHeartr}
                    size="2x"
                    color="gray"
                  />
                  <FontAwesomeIcon
                    icon={faHearts}
                    className="red-heart details-red-heart"
                    size="2x"
                    color="white"
                  />
                </div>
              </div>
              <div className="ml-2 mt-1 text-muted font-weight-bold">
                {this.props.comments.length} karma
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.post) {
      return (
        <div className="loader">
          <Loader type="ThreeDots" color="#ffe31a" height={100} width={100} />
        </div>
      );
    }
    return (
      <div className="col-md-8 mt-md-4 p-0">
        {this.renderPostDetails()}
        <Comments comments={this.props.comments} postId={this.props.post.id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.postDetails.details,
    comments: state.postDetails.comments,
    edit: state.postDetails.edit,
  };
};

export default connect(mapStateToProps, actions)(PostDetails);
