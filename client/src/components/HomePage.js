import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as postActions from "../actions/postActions";
import * as leaderboardActions from "../actions/leaderboardActions";

import * as authActions from "../actions/authActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faComments,
  faBookmark,
  faSearch,
  faSearchDollar,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import PostsList from "./Post/PostsList";
import Leaderboard from "./Post/Leaderboard";
import { Button } from "react-bootstrap";

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchTopContributors();
  }

  onChange = (e) => {
    [e.target.name] = e.target.value;
  };
  handleSearch = (e) => {
    if (this.state.search) {
      this.setState({ search: e.target.value });
      this.props.fetchSearch(this.state.search);
      this.setState({ search: "" });
      this.props.fetchPosts();
      console.log("serach :", this.state.search);
    }
  };

  render() {
    if (!this.props.posts) {
      return (
        <div className="loader">
          <Loader type="ThreeDots" color="#ffe31a" height={100} width={100} />
        </div>
      );
    }

    return (
      <div className="mt-md-5 d-flex row justify-content-between">
        <PostsList className="col-md-7" posts={this.props.posts} />
        <div className="col-md-5 col-lg-4">
          <Leaderboard topContributors={this.props.topContributors} />
          <div className="mt-4">
            <Button variant="primary col-12 new-post-button p-0">
              <Link className="no-decoration" to={"/CreatePost"}>
                <div className="p-2 py-2 no-decoration create-post-but">📝 New Post</div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    account: state.auth.data,
    search: state.posts.searchArray,
    topContributors: state.leaderboard.topContributors,
  };
};

export default connect(mapStateToProps, { ...actions, ...postActions, ...authActions, ...leaderboardActions })(
  HomePage
);
