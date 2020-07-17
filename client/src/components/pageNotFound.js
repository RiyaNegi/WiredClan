import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class pageNotFound extends Component {
    render() {
        return (
            <div className="col-12">
                <div className="d-flex align-items-center mt-5 justify-content-center">
                    <FontAwesomeIcon icon={faExclamationCircle} size="6x" color="black" />
                </div>
                <div className="d-flex align-items-center mt-3 justify-content-center oops-text">
                    OOPS! This page doesn't exist
                </div>
                <div className="d-flex align-items-center justify-content-center  mt-5">
                    <Link to="/home">
                        <button className="back-home-btn p-2">
                            Back to HomePage
                </button>
                    </Link>
                </div>
            </div >
        )
    }
}

export default pageNotFound