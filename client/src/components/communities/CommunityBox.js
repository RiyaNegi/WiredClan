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
        return <div className="com-box p-3 mt-4">
            <label className="text-muted font-weight-bold">Clans</label>
            <div className="">
                {this.props.tags.filter((tag) => tag.imageUrl).map(i => <a className="text-decoration-none" href={`/community/${slugify(i.text)}`}>
                    <div className="row mt-2 com-item p-2">
                        <img src={i.imageUrl} height="30px"></img>
                        <label className="align-self-center ml-2">{i.text}</label>
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
