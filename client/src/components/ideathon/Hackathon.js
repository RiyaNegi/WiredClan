import React, { Component } from "react"
import hackathon from "./ideathon.png"
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
    open: true,
    remaining: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    isExpired: false,
    targetDate: "Nov 1, 2020",
    targetTime: "11:00:00",
  }


  // used to set and clear interval
  timer;
  // used to calculate the distance between "current date and time" and the "target date and time"
  distance;

  componentDidMount() {
    this.setDate();
    this.counter();
  }

  setDate = () => {
    const { targetDate, targetTime } = this.state,
      // Get todays date and time
      now = new Date().getTime(),
      // Set the date we're counting down to
      countDownDate = new Date(targetDate + " " + targetTime).getTime();

    // Find the distance between now and the count down date
    this.distance = countDownDate - now;

    // target date and time is less than current date and time
    if (this.distance < 0) {
      clearInterval(this.timer);
      this.setState({ isExpired: true });
    } else {
      this.setState({
        remaining: {
          days: Math.floor(this.distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((this.distance % (1000 * 60)) / 1000)
        },
        isExpired: false
      });
    }
  };

  counter = () => {
    this.timer = setInterval(() => {
      this.setDate();
    }, 1000);
  };






  componentWillMount() {
    this.props.fetchTopContributors();
    this.props.fetchIdeathonDetails();
    this.props.fetchTags();
  }

  handleClose() {
    this.setState({ showParticipating: !this.state.showParticipating })
  }

  handleDeleteIdea(postId) {
    this.props.deleteHackathonPost(postId)
  }

  handleRegisterClick = () => {
    window.scrollTo(0, 250);
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
    const { isExpired } = this.state;

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
                      <span className="text-white"><h3>Embark 2020</h3></span>
                      <div className=" mt-2">
                        {/* <div style={{ fontSize: '17px' }}>🏆 1st Prize: Rs 2,000</div>
                        <div style={{ fontSize: '17px' }}>🥈 2nd Prize: Rs 1,000</div>
                        <div style={{ fontSize: '17px' }}>🥉 3rd Prize: Rs 500</div> */}


                        <hr style={{ backgroundColor: '#505050' }} />
                        <h5>Timeline</h5>
                        <div className="text-muted">
                          <ul>
                            <li>Ideathon will commence on 1st of November, 2020 at 11AM and will
conclude by 4PM 1st November, 2020.</li>
                            <li>After 4PM, the teams will be sent a Google Meet Link where they will
be giving their 5 minute presentation. </li>
                          </ul>
                        </div>

                        <h5>Brief & Rules</h5>

                        <div className="text-muted">
                          Ideathon is a Startup Ideation Hackathon where teams or individuals
                          can formulate a plan for and pitch their startup idea to our judges.
                          The contestants will be judged on multiple factors, including but not
                          limited to effective formulation of business plan, presentation skills,
                          communication ability, accuracy of market research and analysis, and
                          so on.<br />
                            The project submission will be followed by a 5 minute presentation in
front of our judges for every team.                           <ol>

                            <li>
                              The contestants/teams are allowed to submit a previously curated
                              business plan on or before the deadline of 4 pm.
                          </li>

                            <li>

                              All the participants are required to register on the WiredClan website
individually.   </li>

                            <li>
                              This is an Ideation Hackathon so don’t feel shy to be creative. All
                              participants are allowed to submit videos or any other content they
                              desire accompanied with the compulsory business plan and
PowerPoint Presentation.                          </li>

                            <li>
                              The resources and statistics if mentioned in the business plan must be
                              accurate to current markets and a detailed presentation should be
accompanied with the business plan</li>

                            <li>
                              Contestants can start uploading their submission from 1st November,
                              2020, 11AM up until 4PM. Any submissions after 4PM will not be
accepted. </li>

                            <li>
                              Prizes will be awarded on the sole decision of our judging panel.
                          </li>




                            {/* <li>
                              JUDGING ROUND:
                          
                            </li> */}

                            {/* <li> Can submit any pre-existing project or make a new project in given time.</li>
                            <li> Need to add a link to the source code or add code snippets of important parts of the code of the project to confirm authenticity (eg. Github repo, codepen, codesandbox, live code).</li>
                            <li> Publish the post after adding proper context about your project, by adding screenshots or demo videos of your implementation.</li>
                            <li> Just PPTs don't qualify as projects.</li>
                            <li>Join the whatsapp group for any queries or updates  👉  <a href=" https://chat.whatsapp.com/LfZrhXXcD9L6c4pfz50YCp" > WiredClan</a></li> */}

                          </ol>
                        </div>

                        <h5>Submission Format</h5>
                        <div className="text-muted">
                          Contestants are requested to submit the PowerPoint Presentation and
                          the Business Plan document in a .pdf file format on the Wired Clan
                          portal.<br /><br />
                              Come on Entrepreneurs! Start IDEATING!!<br />
                              MAY THE BEST START UP WIN!



                        </div>
                        <hr style={{ backgroundColor: '#505050' }} />
                        {isExpired && <div className="d-flex pb-3 justify-content-center">
                          <button
                            onClick={this.handleRegisterClick}
                            type="button"
                            class="new-post-button p-2 px-5 mt-3"
                          >START</button>
                        </div>}
                      </div>
                    </div>
                    {/* <div className="col-12 mt-3"
                    >
                      <IdeasList ideas={this.props.tags.map(tag => tag.ideas.map(idea => ({ ...idea, tagText: tag.text }))).flat()}></IdeasList>
                    </div> */}
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
                  {/* <Button className="ml-2" variant="success" onClick={this.handlePublish}>Publish</Button>{' '} */}
                </div>
              </div>
            </div>}

            {/* {this.props.hackathonPosts.length > 0 && <div className="col-12 mt-3 pl-0">
              <h4 className="text-muted mt-4">Top Posts</h4>
              <h6 className="text-muted mt-2">(Votes by only google verified users counted here)</h6>
              <PostsList className="mt-2" posts={this.props.hackathonPosts} />
            </div>} */}

          </div>

          <div className="col-12 col-md-4 p-0"
          >
            <div className="col-12 mt-3 pr-md-0">
              <Timer targetDate={this.state.targetDate} targetTime={this.state.targetTime} />
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