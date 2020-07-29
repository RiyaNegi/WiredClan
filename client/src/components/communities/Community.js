import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import * as leaderboardActions from "../../actions/leaderboardActions";
import * as authActions from "../../actions/authActions";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import PostsList from "../Post/PostsList";
import Leaderboard from "../Post/Leaderboard";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import './community.css';

class Community extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            loginNotify: false
        };
    }

    componentWillMount() {
        this.props.resetPosts();
        this.props.resetTopContributors();
        this.props.fetchTag(this.props.match.params.slug)
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
        }
    };

    notifypost = () => {
        if (!this.props.authenticated && !this.state.loginNotify) {
            toast.warning('❗ Sign in to create post', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            this.setState({ loginNotify: true })
        }
    };

    render() {
        if (!this.props.tag) {
            return (
                <div className="col-6 mt-5">
                    <BeatLoader
                        size={40}
                        color={"#65ffea"}
                    />
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className="box-shadow com-card row  p-4 mt-4">
                    <img src={`/${this.props.tag.imageUrl}`} height="100%"></img>
                    <span className="d-flex flex-column align-self-center ml-4">
                        <h3 className="" >{this.props.tag.text} {" "} Clan</h3>
                        <label className="font-weight-light">A community for all fellow {this.props.tag.text} developers</label>
                    </span>
                </div>
                <div className="mt-md-2 d-flex row justify-content-between">
                    <div className="col-md-7 mt-4">
                        <div className="d-flex flex-row align-items-center">
                            <div className="latest-text">What's New</div>
                            <div className=" latest-line" />
                        </div>
                        {this.props.posts && this.props.posts.length === 0 && <div className="mt-4">Nothing! Looks like you'll get to be the first one to post here.</div>}
                        <PostsList className="mt-2" posts={this.props.posts} />

                    </div>

                    <div className="col-md-5 col-lg-4 mt-4">
                        <Leaderboard topContributors={this.props.topContributors} />
                        <div className="mt-4">
                            <Button variant=" col-12 new-post-button p-0" onClick={this.notifypost}>
                                {this.props.account && this.props.authenticated ? (<Link className="com-links" to={"/CreatePost"} >
                                    <div className="p-2 py-2 com-links" style={{ color: "white" }}>📝 NEW POST</div>
                                </Link>)
                                    : <div className="p-2 py-2 com-links" style={{ color: "white" }}>📝 NEW POST</div>
                                }
                            </Button>
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
        authenticated: state.auth.authenticated,
        search: state.posts.searchArray,
        topContributors: state.leaderboard.topContributors,
        tag: state.posts.tag
    };
};

export default connect(mapStateToProps, { ...actions, ...postActions, ...authActions, ...leaderboardActions })(
    Community
);
