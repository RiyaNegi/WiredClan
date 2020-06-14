import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import Loader from 'react-loader-spinner';
import ControlledEditor from './post/controlledEditor';




class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };


    }
    componentWillMount() {
        if (this.props.match.params.id) {
            if (this.props.account.id) {
                this.props.fetchPostDetails(this.props.match.params.id, true);
            }
            else {
                this.props.fetchPostDetails(this.props.match.params.id, false);
            }
        }
    }

    onChange = (editorState) => {
        this.setState({ editorState });
    };

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    handleFormSubmit = (name) => {
        let postId = parseInt(this.props.match.params.id)
        return (params) => {
            debugger;
            if (name === "save") {
                this.props.updatePost(postId, params['title'], false, params['postEditor'])
                this.setState({ editorState: EditorState.createEmpty() })
            }
            else if (name === "publish") {
                this.props.updatePost(postId, params['title'], true, params['postEditor'])
                this.setState({ editorState: EditorState.createEmpty() })
            }

        }
    }
    render() {
        const { handleSubmit } = this.props;
        let edit = this.props.location.state.edit ? this.props.location.state.edit : false
        if (!this.state.editorState) {
            console.log("loaderrr");
            return (
                <div className="loader">
                    <Loader
                        type="ThreeDots"
                        color="#ffe31a"
                        height={100}
                        width={100}
                    />
                </div >
            )
        }
        return (
            <React.Fragment>
                <div className="create-post-card">
                    <div className="create-post">
                        <label className="create-post-item" >EDIT POST </label>
                    </div>
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <div>
                            <fieldset className="create-title-div">
                                <Field className="post-create-title" type="text" name="title"
                                    placeholder="Enter Post Title here.."
                                    component="input" />
                            </fieldset>
                            <Field name="postEditor" component={ControlledEditor} editorContent={this.props.editorContent} />
                        </div>
                        <div className="create-post-but-div">
                            <div className="create-post-submit">
                                <button
                                    className="btn btn-light site-button post-button"
                                    action="submit"
                                    name="publish"
                                    onClick={handleSubmit(this.handleFormSubmit('publish', edit))} >
                                    Publish Draft
                            </button>
                            </div>
                            <div className="create-post-save">
                                <button
                                    className="btn btn-secondary site-button dept-button draft-button"
                                    action="submit"
                                    name="save"
                                    onClick={handleSubmit(this.handleFormSubmit('save', edit))} >
                                    Save Draft
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const populatePostValues = (state, desc) => {
    if (state.postDetails.details) {
        var info = {};
        info = {
            ...info, ...{ title: state.postDetails.details.title },
            postEditor: desc
        }
        return info;
    }
    else
        return;

}

const mapStateToProps = state => {
    let desc = state.postDetails.description ?
        (state.postDetails.description)
        :
        convertToRaw(EditorState.createEmpty().getCurrentContent());
    return {
        account: state.auth.data,
        editorContent: desc,
        post: state.postDetails.details,
        description: state.postDetails.description,
        initialValues: populatePostValues(state, desc)
    };
};


const CreateFormPost = reduxForm({
    form: "createPost", enableReinitialize: true
})(CreatePost)


export default (connect(mapStateToProps, actions))(CreateFormPost);