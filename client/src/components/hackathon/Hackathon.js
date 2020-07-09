import React, { Component } from "react"
import Timer from "../Timer"
import hackathon from "./hackathon2.png"
import Leaderboard from "../Post/Leaderboard";
import PostsList from "../Post/PostsList";

import { connect } from "react-redux";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import * as leaderboardActions from "../../actions/leaderboardActions";
import * as authActions from "../../actions/authActions";
import './hackathon.css';
import { Button } from 'react-bootstrap';

import ideas from './ideas.json'

class Hackathon extends Component {

  state = {
    showParticipating: false,
    ...ideas.map((idea) => ({ [`show${idea.language}`]: false }))
  }

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
                <div className='d-flex justify-content-center'>
                  <button
                    onClick={() => { this.setState({ showParticipating: !this.state.showParticipating }) }}
                    type="button"
                    class="btn btn-primary btn-lg btn-block col-8"
                  >Sign me up!</button>
                </div>

                {this.state.showParticipating && <div>Fill this form bitch!</div>}

                <div className="mt-4">
                  <h4 className="text-muted">Title</h4>
                  <div style={{ backgroundColor: 'lightgray', height: '40px' }}>

                  </div>

                  <h4 className="text-muted  mt-3">Area</h4>

                  <div className="col-12 row p-0 m-0">
                    <div className="col-4">
                      <button class="card1 mt-3 w-100" href="#">
                        <i style={{ fontSize: '50px' }} class="devicon-python-plain colored"></i>
                        <div className="font-weight-bold">JavaScript</div>
                      </button>
                    </div>

                    <div className="col-4">
                      <button class="card1 mt-3 w-100" href="#">
                        <i style={{ fontSize: '50px' }} class="devicon-cplusplus-line colored"></i>
                        <div className="font-weight-bold">C++</div>
                      </button>
                    </div>

                    <div className="col-4">
                      <button class="card1 mt-3 w-100" href="#">
                        <i style={{ fontSize: '50px' }} class="devicon-android-plain colored"></i>
                        <div className="font-weight-bold">Mobile</div>
                      </button>
                    </div>

                    <div className="col-4">
                      <button class="card1 mt-3 w-100" href="#">
                        <i style={{ fontSize: '50px' }} class="devicon-python-plain colored"></i>
                        <div className="font-weight-bold">JavaScript</div>
                      </button>
                    </div>

                    <div className="col-4">
                      <button class="card1 mt-3 w-100" href="#">
                        <i style={{ fontSize: '50px' }} class="devicon-cplusplus-line colored"></i>
                        <div className="font-weight-bold">C++</div>
                      </button>
                    </div>

                    <div className="col-4">
                      <button class="card1 mt-3 w-100" href="#">
                        <i style={{ fontSize: '50px' }} class="devicon-android-plain colored"></i>
                        <div className="font-weight-bold">Mobile</div>
                      </button>
                    </div>





                  </div>

                  <div className='mt-3 d-flex justify-content-center'>
                    <button
                      onClick={() => { this.setState({ showParticipating: !this.state.showParticipating }) }}
                      type="button"
                      class="btn btn-primary btn-lg btn-block col-8"
                    >Register</button>
                  </div>
                  <div className="mt-3 text-muted">Your idea won't be posted until you click "Publish" later on.</div>

                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <Leaderboard topContributors={this.props.topContributors} />
          </div>
        </div >


        <div className="col-8 mt-4 p-0">
          <div className="p-3" style={{ backgroundColor: 'white', border: '1px solid #e1e1e1', borderRadius: '3px' }}>
            <h4 className="text-muted">Trouble finding an idea?</h4>
            <h5 className="text-muted">Find inspiration in our curated list! (expand)</h5>
            {this.props.posts && this.props.posts.map((post) => (
              <div className="mt-3 idea-card">
                {post.title}
              </div>
            ))}
          </div>
        </div>

        <div className="col-8 mt-4 p-0">
          <div className="p-3" style={{ backgroundColor: '#f2fffe', border: '1px solid #e1e1e1', borderRadius: '3px' }}>
            <h4 className="text-muted">My post <span style={{ color: '#c0c0c0' }}>(private)</span></h4>
            {this.props.posts && <PostsList className="" user={this.props.user}
              account={this.props.account}
              draft={true} posts={[this.props.posts[0]]} />}
            <div className="d-flex justify-content-end">
              <Button variant="primary">Edit</Button>{' '}
              <Button className="ml-2" variant="success">Publish</Button>{' '}
            </div>
          </div>
        </div>

        <div className="col-8 p-0 mt-4">
          <h4 className="text-muted">Vote for the submissions so far</h4>
          <PostsList className="" posts={this.props.posts} />
        </div>
      </div >
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