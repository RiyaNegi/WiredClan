import React, { Component } from "react"
import Timer from "./Timer"
import hackathon from "./hackathon2.png"
import Leaderboard from "./Post/Leaderboard";
import PostsList from "./Post/PostsList";

import { connect } from "react-redux";
import * as actions from "../actions";
import * as postActions from "../actions/postActions";
import * as leaderboardActions from "../actions/leaderboardActions";
import * as authActions from "../actions/authActions";



class Hackathon extends Component {

  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchTopContributors();
  }


  render() {
    return (
      <div className="mt-4">
        <div className="col-12 row p-0 m-0">
          <div className="col-8 p-0">
            <div className="box-shadow p-0 m-0">
              <img className="col-12 p-0" src={hackathon} height="235px" alt="hackathon" />
              <div className="p-3 my-3">
                <button type="button" class="btn btn-primary btn-lg btn-block">I'm participating!</button>

                <div className="mt-4">
                  <h4 className="text-muted">Having trouble getting started?</h4>
                  <h5 className="text-muted">Find ideas in our curated list! (expand)</h5>


                  <div className="col-12 row p-0 m-0">

                    <div className="col-4">
                      <div class="card hackathon-idea-card">
                        <img class="card-img-top ml-3 mt-1" style={{ opacity: '0.5', width: '90%' }} src="https://hrcdn.net/s3_pub/hr-assets/dashboard/JavaScript.svg" alt="Card image cap" />
                        <div class="card-body pt-0">
                          <button type="button" class="btn btn-light btn-block">JavaScript</button>
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div class="card hackathon-idea-card">
                        <img class="card-img-top ml-3 mt-1" style={{ opacity: '0.5', width: '90%' }} src="https://hrcdn.net/s3_pub/hr-assets/dashboard/Python.svg" alt="Card image cap" />
                        <div class="card-body pt-0">
                          <button type="button" class="btn btn-light btn-block">JavaScript</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div class="card hackathon-idea-card">
                        <img class="card-img-top ml-3 mt-1" style={{ opacity: '0.5', width: '90%' }} src="https://hrcdn.net/s3_pub/hr-assets/dashboard/JavaScript.svg" alt="Card image cap" />
                        <div class="card-body pt-0">
                          <button type="button" class="btn btn-light btn-block">JavaScript</button>
                        </div>
                      </div>
                    </div>


                  </div>


                </div>

              </div>
            </div>
          </div>
          <div className="col-4">
            <Leaderboard topContributors={this.props.topContributors} />
          </div>
        </div>
        <div className="col-8 p-0 mt-4">
          <h4 className="text-muted">Vote for the submissions so far</h4>
          <PostsList className="" posts={this.props.posts} />

        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    account: state.auth.data,
    authenticated: state.auth.authenticated,
    search: state.posts.searchArray,
    topContributors: state.leaderboard.topContributors,
  };
};

export default connect(mapStateToProps, { ...actions, ...postActions, ...authActions, ...leaderboardActions })(
  Hackathon);