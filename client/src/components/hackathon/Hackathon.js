import React, { Component } from "react"
import hackathon from "../hackathon3.png"
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
import BeatLoader from "react-spinners/BeatLoader";
import Timer from "./Timer";

class Hackathon extends Component {

  state = {
    showParticipating: false,
    open: false
  }

  componentWillMount() {
    this.props.fetchTopContributors();
    this.props.fetchHackathonDetails();
    this.props.fetchTags();

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
      History.push({ pathname: '/signup', state: { loc: 'hackathon' } })
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
    if (!this.props.hackathonPosts || !this.props.tags) {
      return (
        <div className="col-6 mt-5">
          <BeatLoader
            size={40}
            color={"#65ffea"}
          />
        </div>
      )
    }
    return (
      <div className="mt-4">
        <img className="col-12 p-0" src={hackathon} alt="hackathon" />
        {this.state.showParticipating && <Registration tags={this.props.tags} hackathonId={this.props.hackathonId}
          onClose={this.handleClose.bind(this)} />}

        <div className="col-12 row p-0 m-0">
          <div className="col-12 col-md-8 p-0" style={{ zIndex: 1 }}>

            {!this.props.postByCurrentUser && !this.state.showParticipating &&
              <React.Fragment>
                <div className="col-12 mt-3 pl-md-0 pr-md-4">

                  <div className="hackathon-register-box pt-3">
                    <div className='d-flex flex-column box-shadow'>
                      <span className="text-white"><h3>Project Hackathon 2020</h3></span>
                      <div className=" mt-2">
                        <div style={{ fontSize: '17px' }}>🏆 1st Prize: Rs 2,000</div>
                        <div style={{ fontSize: '17px' }}>🥈 2nd Prize: Rs 1,000</div>
                        <div style={{ fontSize: '17px' }}>🥉 3rd Prize: Rs 500</div>
                        <hr style={{ backgroundColor: '#505050' }} />
                        <h5>Guidelines to publish post</h5>
                        <div className="text-muted">
                          <li> Can submit any pre-existing project or make a new project in given time.</li>
                          <li> Need to add a link to the source code or add code snippets of important parts of the code of the project to confirm authenticity (eg. Github repo, codepen, codesandbox, live code).</li>
                          <li> Publish the post after adding proper context about your project, by adding screenshots or demo videos of your implementation.</li>
                          <li> Just PPTs don't qualify as projects.</li>
                          <li>Join the whatsapp group for any queries or updates  👉  <a href=" https://chat.whatsapp.com/LfZrhXXcD9L6c4pfz50YCp" > WiredClan</a></li>
                        </div>
                        <hr style={{ backgroundColor: '#505050' }} />
                        <div className="d-flex justify-content-center">
                          {/* <button
                            onClick={this.handleRegisterClick}
                            type="button"
                            class="new-post-button p-2 px-5 mt-3"
                          >REGISTER</button> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-3"
                    >
                      <IdeasList ideas={this.props.tags.map(tag => tag.ideas.map(idea => ({ ...idea, tagText: tag.text }))).flat()}></IdeasList>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            }

            {this.props.postByCurrentUser && <div className="col-12 mt-3">
              <div className="p-3" style={{ backgroundColor: ' rgba(52, 52, 52, 0.63)', border: '', borderRadius: '3px' }}>
                <h4 className="" style={{ color: '#c0c0c0' }}>My post <span className="text-muted">
                  {this.props.postByCurrentUser.published ? '(Public)' : '(Private)'} </span></h4>
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

            {this.props.hackathonPosts.length > 0 && <div className="col-12 mt-3 pl-0">
              <h4 className="text-muted mt-4">Top Posts</h4>
              <h6 className="text-muted mt-2">(Votes by only google verified users counted here)</h6>
              <PostsList className="mt-2" posts={this.props.hackathonPosts} />
            </div>}

          </div>

          <div className="col-12 col-md-4 p-0"
          >
            <div className="col-12 mt-3 pr-md-0">
              <Timer targetDate="Aug 10, 2020" targetTime="23:00:00" />
            </div>
            <div className="col-12 mt-4 pr-md-0">
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
    account: state.auth.data,
    tags: state.postDetails.tags,
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