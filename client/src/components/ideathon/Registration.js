import React, { Component } from "react"
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import * as hackathonActions from "../../actions/hackathonActions";
import * as actions from "../../actions";
import * as postActions from "../../actions/postActions";
import './hackathon.css';
import ideas from './ideas.json'

// import IdeasListTemp from "./IdeasListTemp";
import { ToastContainer, toast } from "react-toastify";


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLabelId: undefined,
            selectedIdeaCode: undefined,
        };
    }

    handleClick = (imgId) => {
        return (e) => {
            let id = imgId;
            if (this.state.selectedLabelId === id) {
                this.setState({ selectedLabelId: undefined })
                return
            }
            this.setState({ selectedLabelId: id })
        }
    };


    handleIdeaCodeClick = (imgId) => {
        return (e) => {
            let id = imgId;
            if (this.state.selectedIdeaCode === id) {
                this.setState({ selectedIdeaCode: undefined })
                return
            }
            this.setState({ selectedIdeaCode: id })
        }
    };

    notify = () =>
        toast.error('⚠️ Title and Category are required', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });


    handleFormSubmit = (name) => {
        return (params) => {
            if (!params["title"] || !this.state.selectedLabelId) {
                this.notify()
                return
            }
            this.props.createHackathonPost(params["title"], false,
                this.state.selectedLabelId, this.props.hackathonId, this.state.selectedIdeaCode);
        }
    }

    renderTitle = (titleProps) => {
        return (
            < TextareaAutosize
                onChange={(e) => {
                    titleProps.input.onChange(e.target.value);
                }}
                onBlur={titleProps.handleBlur}
                value={titleProps.input.value}
                className="post-comment"
                placeholder=""
                ref={(tag) => (this.textarea = tag)}
            />
        )
    }

    render() {
        const { handleSubmit, submitting, tags } = this.props;
        return <div className="">
            <div className="d-flex p-3 justify-content-end register-cancel">
                <button
                    className="post-item-buttons cancel-button"
                    onClick={this.props.onClose}
                >
                    <FontAwesomeIcon
                        icon={faTimes}
                        size="1x"
                        color="gray"
                    />{" "}
                </button>
            </div>
            <label className="d-flex justify-content-center register-title"><h4>My Project</h4></label>
            <div className="mt-1 text-muted d-flex justify-content-center">You can edit this later, if needed.</div>
            <div className="mt-1 text-muted d-flex justify-content-center">Your idea won't be posted until you click "Publish" later on.</div>

            <form className="p-3">
                <span className="text-muted" style={{ fontSize: 25 }}>Title</span>
                <fieldset >
                    <Field name="title" component={this.renderTitle}
                    />
                </fieldset>
                <h4 className="text-muted  mt-3">Category</h4>
                <div className="col-12 row p-0 m-0">
                    {
                        tags.filter((tag) => ['General', 'C/C++', 'Cloud', 'Java', 'Python'].includes(tag.text) === false).map(tag => (

                            <div className="col-12 col-md-4">
                                <Field name="areaButton" component={() => <button key={tag.id} className={`card1 p-3 mt-3 w-100 ${this.state.selectedLabelId === tag.id && 'card1-selected'}`} href="#"
                                    value={tag.text} id={tag.id}
                                    onClick={this.handleClick(tag.id)}
                                >
                                    <img src={tag.imageUrl} height={tag.uiData.height}></img>
                                    <div className="font-weight-bold" style={{ marginTop: `${80 - parseInt(tag.uiData.height, 10)}px` }}>{tag.text}</div>
                                </button>
                                }
                                />
                            </div>
                        ))
                    }

                </div>
                {false && <div>
                    <h4 className="text-muted mt-4">Problem Statement</h4>
                    <div className="col-12 row p-0 m-0">
                        {
                            ['Masterbridge', 'Winsoft', 'ScrapShut'].map(tag => (

                                <div className="col-12 col-md-4">
                                    <Field name="areaButton" component={() => <button key={tag} className={`card1 p-3 mt-3 w-100 ${this.state.selectedIdeaCode === tag && 'card1-selected'}`} href="#"
                                        value={tag.text} id={tag}
                                        onClick={this.handleIdeaCodeClick(tag)}
                                    >
                                        {/* <img src={tag.imageUrl} height={tag.uiData.height}></img> */}
                                        <div className="font-weight-bold" >{tag}</div>
                                    </button>
                                    }
                                    />
                                </div>
                            ))
                        }
                    </div>


                </div>}
                <div className='mt-5 d-flex justify-content-center'>
                    <button
                        className="post-comment-btn p-2 px-5"
                        action="submit"
                        name="save"
                        disabled={submitting}
                        onClick={handleSubmit(this.handleFormSubmit("save")).bind(this)}
                    >
                        Create
                </button>
                </div>
                <hr style={{ marginTop: '50px', backgroundColor: 'black' }}></hr>
            </form>
            <div><ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
            /></div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.auth.data,
        tags: state.postDetails.tags,
        isLoading: state.hackathon.isLoading
    };
};

const registerHackathon = reduxForm({
    form: "registerHackathon",
})(Registration);

export default connect(mapStateToProps, { ...actions, ...postActions, ...hackathonActions })(registerHackathon);
