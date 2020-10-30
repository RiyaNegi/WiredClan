import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as postActions from "../actions/postActions";
import * as leaderboardActions from "../actions/leaderboardActions";
import * as authActions from "../actions/authActions";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import PostsList from "./Post/PostsList";
import Leaderboard from "./Post/Leaderboard";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import CommunityBox from "./communities/CommunityBox";

class JoinUs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loginNotify: false
    };
  }


  render() {

    return (
      <React.Fragment>
        <div className="mt-md-2 d-flex row justify-content-between">

          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScRAZO4vSNcTm4Xf54Q_uT_WAnpE63p8OoiA5b7L-etVjp-qg/viewform?embedded=true" width="640" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

          <div className="col-md-5 col-lg-4 mt-4">
            <div className="mt-4">


              <div className="col-12 mt-3 p-0">
                Want to chat with like minded folks?
                  <a className="com-links" href="https://discord.com/invite/md8yEcg" >
                  <div className="p-2 py-2 com-links btn" style={{ color: "white" }}> <img height="30px" className="pr-2"
                    src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png" />
                      Join our Discord</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    account: state.auth.data,
    page: state.posts.page,
    authenticated: state.auth.authenticated,
    search: state.posts.searchArray,
    topContributors: state.leaderboard.topContributors,
  };
};

export default connect(mapStateToProps, { ...actions, ...postActions, ...authActions, ...leaderboardActions })(
  JoinUs
);
