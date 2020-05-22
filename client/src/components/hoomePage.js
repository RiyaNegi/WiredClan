import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faComments,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <div className="post card card-body">
      <a
        href={"/profileDetails/"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="user">
          <div className="usericon">
            <FontAwesomeIcon icon={faUserCircle} size="3x" color="gray" />
          </div>
          <div className="date-div">
            <div className="username">RiyaNegi</div>
            <div className="post-date">20th May 2020</div>
          </div>
        </div>
      </a>
      <a
        href={"/postDetails/"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="card-title">This is the title of my project</div>
        <div className="comments-box">
          <div className="card-subtitle mb-2 text-muted">
            i made this in react- redux.
          </div>
          <div className="post-comments">
            <div>
              <FontAwesomeIcon
                icon={faComments}
                size="lg"
                className="comment"
              />
            </div>
            comments
            <div>
              <FontAwesomeIcon icon={faBookmark} size="lg" /> save
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
