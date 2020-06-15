import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faComments,
  faBookmark,
  faSearch,
  faSearchDollar
} from "@fortawesome/free-solid-svg-icons";
import Loader from 'react-loader-spinner'




class HomePage extends PureComponent {

  componentWillMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <div key={post.id} className="post">
          <a
            href={`/Users/${post.userId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="user">
              <div className="usericon">
                <img
                  src={post.user.imageUrl}
                  style={{ width: 28, height: 28, borderRadius: 28 / 2 }}
                  alt="usericon"
                />
              </div>
              <div className="date-div">
                <span className="username username-main">{post.user.userName}</span>
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
          <Link className="com-links" to={{ pathname: `/postDetails/${post.id}`, state: { edit: false, draft: false } }}
          >
            <div className="card-title">{post.title}</div>
            <div className="comments-box">
              <div className="post-comments">
                <div>
                  {post.commentsCount}{" "}
                  {post.commentsCount === 1 ? "Comment" : "Comments"}
                </div>
                {/* <div className="user-prof-det">
                  <label className="user-prof-details-name com-branch">
                    {this.props.user.department}
                  </label>
                </div> */}
              </div>
            </div>
          </Link>
        </div >
      );
    });
  }

  renderSearch() {
    return (
      <div className="search-box">
        {this.props.account ? (
          <Link className="com-links" to={`/CreatePost`} >
            <button type="button" className="btn btn-light site-button post-button">
              + New Post
          </button>
          </Link>
        )
          : (<button type="button" className="btn btn-light site-button post-button">
            <Link className="com-links" to="/signin"> + New Post</Link>
          </button>)
        }
        <span className="search-bar">
          <input type="text" className="search-input" />
          <span className="search-icon">
            <FontAwesomeIcon
              icon={faSearch}
              size="1x"
              style={{ fontSize: "1.5em" }}
              color="gray"
            />
          </span>
        </span>

        <button className=" dropdown btn btn-secondary dropdown-toggle site-button dept-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ALL
          </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item filter-text" href="#">Computer</a>
          <a className="dropdown-item filter-text " href="#">IT</a>
          <a className="dropdown-item filter-text" href="#">ENTC</a>
        </div>
      </div >

    );
  }

  render() {
    if (!this.props.posts) {
      return (
        <div className="loader">
          <Loader
            type="ThreeDots"
            color="#ffe31a"
            height={100}
            width={100}
          />
        </div >)
    }

    return (
      <div className="col-md-9">
        {this.renderSearch()}
        {this.renderPosts()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts.homePage, account: state.auth.data };
};

export default connect(mapStateToProps, actions)(HomePage);
