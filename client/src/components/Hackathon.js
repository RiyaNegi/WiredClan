import React, { Component } from "react"
import Timer from "./Timer"
import { Link } from "react-router-dom";
import hackathon from "./hackathon11.jpg"
import { Modal, Button } from "react-bootstrap";
import Leaderboard from "./Post/Leaderboard";
import PostsList from "./Post/PostsList";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as postActions from "../actions/postActions";
import * as leaderboardActions from "../actions/leaderboardActions";
import * as authActions from "../actions/authActions";
import CreatePost from "./Post/CreatePost";



class Hackathon extends Component {
    state = {
        showModal: false,
    }

    componentWillMount() {
        this.props.fetchPosts();
        this.props.fetchTopContributors();
    }

    handleShowModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };


    render() {
        return (
            <div className="">
                <div className="d-flex col-12 row p-0 m-0 mt-4 pos-hack">
                    <img className="col-12 p-0 boxx-shadow" src={hackathon} alt="hackathon" />
                    <div className="col-8 p-0 mt-3">
                        <div className="box-shadow p-0 m-0">
                            <div className="p-3 my-3">
                                <button type="button" class="btn btn-primary btn-lg btn-block"
                                    onClick={this.handleShowModal}
                                >I'm participating!</button>
                                <Modal
                                    className="modal-background modal-hack"
                                    show={this.state.showModal}
                                    onHide={this.handleCloseModal}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Hackathon Rules</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="p-6">
                                        {/* <FieldArray name="members" component={renderMembers} /> */}
                                        <ul>
                                            <li>
                                                Can enter as a team or solo.
                                            </li>
                                            <li>
                                                Can submit any pre-existing project or make a new project in given time
                                            </li>
                                            <li>
                                                Can submit more than one project.
                                            </li>
                                            <CreatePost />
                                        </ul>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            variant="secondary"
                                            onClick={this.handleCloseModal}
                                        >
                                            Close
                  </Button>
                                    </Modal.Footer>
                                </Modal>
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
                    <div className="col-4 mt-3">
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