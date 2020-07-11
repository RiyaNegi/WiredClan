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

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLabelId: undefined,
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

    handleFormSubmit = (name) => {
        return (params) => {
            debugger;
            this.props.createHackathonPost(params["title"], false,
                this.state.selectedLabelId, this.props.hackathonId);
            // console.log("submitted:", this.state.selectedLabelId)
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
                placeholder="Submit idea here..."
                ref={(tag) => (this.textarea = tag)}
            />
        )
    }

    render() {
        const { handleSubmit, submitting, pristine } = this.props;
        return <div className="">
            <div className="d-flex p-1 justify-content-end">
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
            <label className="d-flex justify-content-center font-weight-bold"><h4>Submission Form</h4></label>
            <form className="p-3">
                <h4 className="text-muted">Title</h4>
                <fieldset >
                    <Field name="title" component={this.renderTitle}
                    />
                </fieldset>
                <h4 className="text-muted  mt-3">Area</h4>
                <div className="col-12 row p-0 m-0">
                    {ideas.map((i) => (
                        this.state.selectedLabelId === i.id ?
                            <div className="col-4">
                                <Field name="areaButton" component={() => <button key={i.id} className="card1 p-3 mt-3 w-100 card1-selected" href="#"
                                    value={i.name} id={i}
                                    onClick={this.handleClick(i.id)}
                                >
                                    <img src={i.imageUrl} height={i.height}></img>
                                    <div className="font-weight-bold">{i.label}</div>
                                </button>
                                }
                                />
                            </div>
                            : <div className="col-4">
                                <Field name="areaButton" component={() =>
                                    <button key={i.id} className="card1 p-3 mt-3 w-100" href="#"
                                        value={i.name} id={i}
                                        onClick={this.handleClick(i.id)}
                                    >
                                        <img src={i.imageUrl} height={i.height}></img>
                                        <div className="font-weight-bold">{i.label}</div>
                                    </button>
                                }
                                />
                            </div>
                    ))}
                </div>
                <div className='mt-3 d-flex justify-content-center'>
                    <button
                        className="sign-btn p-2"
                        action="submit"
                        name="save"
                        disabled={submitting || pristine}
                        onClick={handleSubmit(this.handleFormSubmit("save")).bind(this)}
                    >
                        Submit Idea
                </button>
                </div>
                <div className="mt-3 text-muted d-flex justify-content-center">Your idea won't be posted until you click "Publish" later on.</div>
            </form>
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
