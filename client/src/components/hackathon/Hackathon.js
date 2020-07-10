import React, { Component } from "react"
import Timer from "../Timer"
import hackathon from "../hackathon11.jpg"
import Leaderboard from "../Post/Leaderboard";
import PostsList from "../Post/PostsList";
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import * as leaderboardActions from "../../actions/leaderboardActions";
import * as authActions from "../../actions/authActions";
import * as hackathonActions from "../../actions/hackathonActions";
import './hackathon.css';
import { Button, Collapse } from 'react-bootstrap';
import Registration from "./Registration"
import ideas from './ideas.json'
import PacmanLoader from "react-spinners/PacmanLoader";

class Hackathon extends Component {

  state = {
    showParticipating: false,
    ...ideas.map((idea) => ({ [`show${idea.language}`]: false })),
    open: false
  }

  componentWillMount() {
    this.props.fetchTopContributors();
    this.props.fetchHackathonDetails();
  }

  handleClose() {
    this.setState({ showParticipating: !this.state.showParticipating })
  }


  render() {
    // if (this.props.isLoading) {
    //   debugger
    //   return (
    //     <div className="col-6 mt-5">
    //       <PacmanLoader
    //         size={40}
    //         color={"#FADA5E"}
    //       />
    //     </div>
    //   )
    // }
    return (
      <div className="mt-4">
        <img className="col-12 p-0" src={hackathon} height="300px" alt="hackathon" />
        {!this.props.postByCurrentUser ? (
          <div className="col-12 row p-0 m-0">
            <div className="col-8 p-0">
              <div className="box-shadow p-0 m-0">
                {this.state.showParticipating ?
                  (<Registration hackathonId={this.props.hackathonId}
                    onClose={this.handleClose.bind(this)} />) :
                  (
                    <div className='d-flex flex-column p-4'>
                      <label> Note :</label>
                      <li>If participating as a team, only one member needs to register for th hackathon(can add teammates later).</li>
                      <li>You only need an awesome idea to register(can fill contents later).</li>
                      <li>Can submit any pre-existing project or make a new project in given time.</li>
                      <li>Plagiarized projects will be disqualified.</li>
                      <button
                        onClick={() => { this.setState({ showParticipating: !this.state.showParticipating }) }}
                        type="button"
                        class="btn btn-primary btn-lg btn-block col-8"
                      >Register</button>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-4">
              <Leaderboard topContributors={this.props.topContributors} />
            </div>
          </div >
        ) : <span className="mt-0 p-0"></span>}
        {!this.props.postByCurrentUser ? (
          <div className="col-8 mt-4 p-0">
            <div className="p-3" style={{ backgroundColor: 'white', border: '1px solid #e1e1e1', borderRadius: '3px' }}>
              <h4 className="">Trouble finding an idea?</h4>
              <h6 className="text-muted">Find inspiration in our curated list! (expand)</h6>
              <Button
                onClick={() => this.setState({ open: !this.state.open })}
                aria-controls="example-collapse-text"
                aria-expanded={this.state.open}
              >
                click
                </Button>
              <Collapse in={this.state.open}>
                <div id="example-collapse-text">
                  {ideas.map((idea) => (
                    <div>
                      <span className="text-muted mt-2" style={{}}><h5>{idea.label}</h5></span>
                      {idea.list.map(i => <div className="mt-3 idea-card">{i}</div>)}
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          </div>) : null}


        {this.props.postByCurrentUser ? (
          <div className="col-12 row p-0 m-0">
            <div className="col-8 mt-4 p-0">
              <div className="p-3" style={{ backgroundColor: '#f2fffe', border: '1px solid #e1e1e1', borderRadius: '3px' }}>
                <h4 className="text-muted">My post <span style={{ color: '#c0c0c0' }}>(private)</span></h4>
                <PostsList className="" user={this.props.postByCurrentUser.user}
                  account={this.props.account}
                  draft={true} posts={[this.props.postByCurrentUser]} />
                <div className="d-flex justify-content-end">
                  <Button variant="primary">Edit</Button>{' '}
                  <Button className="ml-2" variant="success">Publish</Button>{' '}
                </div>
              </div>
            </div>
            <div className="col-4 mt-4">
              <Leaderboard topContributors={this.props.topContributors} />
            </div>
          </div>
        ) : null}
        <div className="col-8 p-0 mt-4">
          <h4 className="text-muted">Vote for the submissions so far</h4>
          <PostsList className="" posts={this.props.hackathonPosts} />
        </div>
        < a target="_blank" href="https://icons8.com" > Icons8</a >
      </div >
    )
  }

}

const mapStateToProps = (state) => {
  debugger
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