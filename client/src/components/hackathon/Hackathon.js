import React, { Component } from "react"
import Timer from "../Timer"
import hackathon from "../hackathon1.png"
import History from "../../history.js";
import { Link } from "react-router-dom";
import Leaderboard from "../Post/Leaderboard";
import PostsList from "../Post/PostsList";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import * as leaderboardActions from "../../actions/leaderboardActions";
import * as authActions from "../../actions/authActions";
import * as hackathonActions from "../../actions/hackathonActions";
import './hackathon.css';
import { Button, Collapse, Badge } from 'react-bootstrap';
import Registration from "./Registration"
import { ToastContainer, toast } from "react-toastify";
import FAQ from "./FAQ"
import IdeasList from "./IdeasList";
import PacmanLoader from "react-spinners/PacmanLoader";

class Hackathon extends Component {

  state = {
    showParticipating: false,
    open: false
  }

  componentWillMount() {
    this.props.fetchTopContributors();
    this.props.fetchHackathonDetails();
  }

  handleClose() {
    this.setState({ showParticipating: !this.state.showParticipating })
  }

  handleDeleteIdea(postId) {
    this.props.deleteHackathonPost(postId)
  }

  handleRegisterClick = () => {
    if (this.props.account) {
      this.setState({ showParticipating: !this.state.showParticipating })
      return
    }
    else {
      History.push({ pathname: '/signin', state: { loc: 'hackathon' } })
      return
    }
  }

  notify = () =>
    toast.error('⚠️ Description is required to publish post', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  handlePublish = () => {
    if (!this.props.postByCurrentUser.description) {
      this.notify()
      return
    }
    else {
      var teammates = this.props.postByCurrentUser.teammates && this.props.postByCurrentUser.teammates.map(i => i.id)
      this.props.updatePost(
        this.props.postByCurrentUser.id,
        this.props.postByCurrentUser.title,
        true,
        this.props.postByCurrentUser.description,
        this.props.postByCurrentUser.tagId,
        teammates,
        this.props.account.id,
        this.props.hackathonId
      );
      return
    }
  }

  render() {
    if (!this.props.hackathonPosts) {
      return (
        <div className="col-6 mt-5">
          <PacmanLoader
            size={40}
            color={"#FADA5E"}
          />
        </div>
      )
    }
    return (
      <div className="mt-4">
        <img className="col-12 p-0" src={hackathon} height="300px" alt="hackathon" />


        {this.state.showParticipating && <Registration hackathonId={this.props.hackathonId}
          onClose={this.handleClose.bind(this)} />}

        <div className="col-12 row p-0 m-0">
          <div className="col-12 col-md-8 p-0">

            {!this.props.postByCurrentUser && !this.state.showParticipating &&
              <React.Fragment>
                <div className="col-12 mt-3 post-box">
                  <div className='d-flex flex-column box-shadow p-4'>
                    <span><h4>Hackathon July 2020</h4></span>
                    <span className="text-muted"><h6> Can submit any pre-existing project or make a new project in given time.</h6>
                    </span>
                    <span className="d-flex">
                      <input className="d-flex align-self-center" type="checkbox" id="conduct" name="conduct" value="conduct" />
                      <span className="ml-1" for="conduct" > I agree to the terms & conditions of WiredClan.</span>
                    </span>
                    <div className="d-flex justify-content-center">
                      <button
                        onClick={this.handleRegisterClick}
                        type="button"
                        class="post-comment-btn py-2 col-4 mt-3"
                      >Register</button>
                    </div>
                  </div>
                  <div className="col-12 mt-3"
                  >
                    <IdeasList></IdeasList>
                  </div>
                </div>



              </React.Fragment>
            }

            {this.props.postByCurrentUser && <div className="col-12 mt-3">
              <div className="p-3" style={{ backgroundColor: '#f2fffe', border: '1px solid #e1e1e1', borderRadius: '3px' }}>
                <h4 className="text-muted">My post <span style={{ color: '#c0c0c0' }}> {this.props.postByCurrentUser.published ? '(Public)' : '(Private)'} </span></h4>
                <PostsList className="" user={this.props.postByCurrentUser.user}
                  account={this.props.account} hackathon={true}
                  draft={true} posts={[this.props.postByCurrentUser]} handleDeleteIdea={this.handleDeleteIdea.bind(this)} />
                <div className="d-flex justify-content-end">
                  <Link
                    className=" com-links edit-link"
                    to={{
                      pathname: `/posts/${this.props.postByCurrentUser.id}/edit`,
                      state: { edit: true },
                    }}
                  >
                    <Button variant="primary">Edit</Button>{' '}
                  </Link>
                  <Button className="ml-2" variant="success" onClick={this.handlePublish}>Publish</Button>{' '}
                </div>
              </div>
            </div>}

            {this.props.hackathonPosts.length > 0 && <div className="col-12 mt-3">
              <h4 className="text-muted">Vote for the submissions so far</h4>
              <PostsList className="" posts={this.props.hackathonPosts} />
            </div>}

          </div>

          <div className="col-12 col-md-4 p-0"
          >
            <div className="col-12 mt-3">
              <Leaderboard topContributors={this.props.topContributors} />
            </div>
            <div className="col-12 mt-3">
              <FAQ />
            </div>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
        />
      </div >
    )
  }

}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    account: state.auth.data,
    authenticated: state.auth.authenticated,
    topContributors: state.leaderboard.topContributors,
    hackathonPosts: state.hackathon.hackathonPosts,
    postByCurrentUser: state.hackathon.postByCurrentUser,
    isLoading: state.hackathon.isLoading,
    hackathonId: state.hackathon.hackathonId
  };
};

export default connect(mapStateToProps, { ...actions, ...postActions, ...authActions, ...leaderboardActions, ...hackathonActions })(
  Hackathon);