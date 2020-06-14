import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Comments from "./comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faComments } from "@fortawesome/free-solid-svg-icons";
import Loader from 'react-loader-spinner'
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';


class PostDetails extends Component {
  componentWillMount() {
    this.props.fetchPostDetails(this.props.match.params.id);
  }
  convertDataFromJSONToHTML = (object) => {
    const html = object
    console.log(html, 'htmlllll')
    const cleanHtml = (html) => {
      // Clean spaces between tags
      var newText = html.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, "$1$3")

      // Clean empty paragraphs before the content
      // <p><br/><p> && <p></p>
      var slicer;
      while (newText.slice(0, 20) === '<p></p>' || newText.slice(0, 11) === '<p><br></p>') {
        if (newText.slice(0, 20) === '<p></p>') slicer = 7
        else slicer = 11
        newText = newText.substring(slicer, newText.length)
      }

      // Clean empty paragraphs after the content
      while (newText.slice(-7) === '<p></p>' || newText.slice(-11) === '<p><br></p>') {
        if (newText.slice(-7) === '<p></p>') slicer = 7
        else slicer = 11
        newText = newText.substring(0, newText.length - slicer)
      }
      // Return the clean Text
      return newText
    }

    return cleanHtml(html);
  }
  renderPostDetails() {
    let post = this.props.post;
    return (
      <div className="post-details" key={post.id}>
        <div className="user">
          <div className="usericon">
            <a
              href={`/Users/${post.userId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                src={post.user.imageUrl}
                style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                alt="userIcon"
              />
            </a>
          </div>
          <div className="date-div details">
            <a
              href={`/Users/${post.userId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="username username-main">{post.user.userName}</span>
            </a>
            <span className="post-date" style={{ marginTop: 9 }}>
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
        <div className="post-detail  post-detail-title">{post.title}</div>
        <div className="card-body">
          <div dangerouslySetInnerHTML={{ __html: this.convertDataFromJSONToHTML(post.description) }}></div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.post) {
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
      <div className="col-md-10">
        <ul>{this.renderPostDetails()}</ul>
        <Comments comments={this.props.comments} postId={this.props.post.id} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { post: state.postDetails.details, comments: state.postDetails.comments, edit: state.postDetails.edit };
};

export default connect(mapStateToProps, actions)(PostDetails);
