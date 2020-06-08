import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as actions from "../actions";

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
    state = {
        title: "",
        editorState: EditorState.createEmpty()
    }

    onChange = (editorState) => this.setState({ editorState });

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.name === "submit") {
            var convertedData = convertToRaw(this.state.editorState.getCurrentContent())
            this.props.createPost(this.state.title, true, convertedData)
            this.setState({ editorState: EditorState.createEmpty() })
        }
        else {
            convertedData = convertToRaw(this.state.editorState.getCurrentContent())
            this.props.createPost(this.state.title, false, convertedData)
            this.setState({ editorState: EditorState.createEmpty() })
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="create-post-card">
                    <div className="create-post">
                        <label className="create-post-item" >CREATE A NEW POST</label>
                    </div>
                    <form >
                        <div className="create-title-div">
                            <input className="post-create-title" type="text" name="title" placeholder="Enter Post Title here.." value={this.title} onChange={this.handleChange}></input>
                        </div>
                        <Editor
                            editorState={this.state.editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onChange}
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
                        <div className="create-post-but-div">
                            <div className="create-post-submit">
                                <button
                                    className="btn btn-light site-button post-button"
                                    action="submit"
                                    name="submit"
                                    onClick={this.handleSubmit}>
                                    Submit Post
                            </button>
                            </div>
                            <div className="create-post-save">
                                <button
                                    className="btn btn-secondary site-button dept-button draft-button"
                                    action="submit"
                                    name="save"
                                    onClick={this.handleSubmit}>
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
    return { account: state.auth.data };
};

export default reduxForm({
    form: "CreatePost"
})(connect(mapStateToProps, actions)(CreatePost));