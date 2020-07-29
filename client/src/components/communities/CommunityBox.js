import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
import slugify from "slugify";



class CommunityBox extends Component {

    componentWillMount() {
        this.props.fetchTags()
    }

    render() {
        if (!this.props.tags) {
            return (
                <div className="col-6 mt-5">
                    <BeatLoader

                        size={40}
                        color={"#65ffea"}
                    />
                </div>
            );
        }
        return <div className="faq-card p-3 mt-4">
            <label className="text-muted">Clans</label>
            <div className="p-2">
                {this.props.tags.map(i => <a href={`/community/${slugify(i.text)}`}>
                    <div className="row mt-2">
                        <img src={i.imageUrl} height="60px"></img>
                        <label className="align-self-center ml-4">{i.text}</label>
                    </div>
                </a>
                )}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        tags: state.postDetails.tags
    };
};


export default connect(mapStateToProps, { ...actions })(CommunityBox);
