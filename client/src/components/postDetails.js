import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faComments } from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <div className=" post card">
      <div className="user">
        <div className="usericon">
          <FontAwesomeIcon icon={faUserCircle} size="3x" color="gray" />
        </div>
        <div className="date-div">
          <div className="username">RiyaNegi</div>
          <div className="post-date">20th May 2020</div>
        </div>
      </div>
      <div className="card-title">This is the title of my project</div>
      <div className="card-text">
        This is the description of my project. i made this is in react redux
        along with JWT token authorization
      </div>
      <div className="tech-stack">
        <div className="tech">Technology Stack :</div>
        <div className="tech-details">React, redux, nodeJS</div>
      </div>
    </div>
  );
};
