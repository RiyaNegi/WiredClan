import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../../actions";
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Loader from 'react-loader-spinner';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';


function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                console.log('Image upload error:', error);
                reject(error);
            });
        }
    );
}

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postEditorState: EditorState.createEmpty()
        };


    }

    onChangePost = (postEditorState) => this.setState({ postEditorState });

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    handleFormSubmit = (name) => {
        return (params) => {
            debugger;
            if (name === "submit") {
                let convertedData = draftToHtml(convertToRaw(this.state.postEditorState.getCurrentContent()));
                this.props.createPost(params['postTitle'], true, convertedData)
                this.setState({ postEditorState: EditorState.createEmpty() })
            }
            else if (name === "save") {
                let convertedData = draftToHtml(convertToRaw(this.state.postEditorState.getCurrentContent()));
                this.props.createPost(params['postTitle'], false, convertedData)
                this.setState({ postEditorState: EditorState.createEmpty() })
            }

        }
    }
    render() {
        const { handleSubmit } = this.props;
        if (!this.state.postEditorState) {
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
                    <label className="create-post-item" >CREATE A NEW POST</label>
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <div>
                            <fieldset className="create-title-div">
                                <Field className="post-create-title" type="text" name="postTitle"
                                    placeholder="Enter Post Title here.."
                                    component="input" />
                            </fieldset>
                            <Editor
                                editorState={this.state.postEditorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onChangePost}
                                wrapperStyle={{ border: "1px solid gray", marginBottom: "20px" }}
                                editorStyle={{ height: "300px", padding: "10px" }}
                                placeholder="Enter Post Contents here..."
                                toolbar={{
                                    options: ['inline', 'blockType', 'list', 'link', 'emoji', 'image', 'history'],
                                    image: {
                                        uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true }, defaultSize: {
                                            height: '300',
                                            width: '300',
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div className="create-post-but-div">
                            <div className="create-post-submit">
                                <button
                                    className="btn btn-light site-button post-button"
                                    action="submit"
                                    name="submit"
                                    onClick={handleSubmit(this.handleFormSubmit('submit'))} >
                                    Submit Post
                        </button>
                            </div>
                            <div className="create-post-save">
                                <button
                                    className="btn btn-secondary site-button dept-button draft-button"
                                    action="submit"
                                    name="save"
                                    onClick={handleSubmit(this.handleFormSubmit('save'))} >
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


const mapStateToProps = state => {
    return {
        account: state.auth.data
    };
};


const CreateFormPost = reduxForm({
    form: "createPost"
})(CreatePost)


export default (connect(mapStateToProps, actions))(CreateFormPost);