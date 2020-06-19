import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class pageNotFound extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faExclamationCircle} size="9x" color="gray" />
                </div>
                <div className="d-flex align-items-center justify-content-center font-weight-bold oops-text">
                    OOPS! Page not found
                </div>
                <div className="d-flex align-items-center justify-content-center  mt-5">
                    <Link to="/">
                        <button className=" btn btn-warning back-home-btn">
                            Back to HomePage
                </button>
                    </Link>
                </div>
            </React.Fragment >
        )
    }
}

export default pageNotFound