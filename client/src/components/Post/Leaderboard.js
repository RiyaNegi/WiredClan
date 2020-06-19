import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

import "./leaderboard.css";

const Leaderboard = ({ className, style }) => {
  return (
    <div
      className={`box-shadow leaderboard-box ${className}`}
      style={{ height: "fit-content", ...style }}
    >
      <span className="text-muted">🔥 Top Contributors</span>
      <div className="d-flex flex-column">
        <div className="mt-1 font-weight-bold leaderboard-row">
          <Link className="d-flex flex-row no-decoration py-2">
            <span className="col-8 d-flex flex-row pr-0">
              <span className="d-flex align-self-center">Raj N</span>
              <Badge
                pill
                variant="secondary"
                className="d-flex align-self-center ml-1"
              >
                Python Expert
              </Badge>
            </span>
            <span className="col-4 pl-0 font-weight-bold d-flex text-muted justify-content-end">
              32 karma
            </span>
          </Link>
        </div>
        <div className="mt-1 font-weight-bold leaderboard-row">
          <Link className="d-flex flex-row no-decoration py-2">
            <span className="col-8 d-flex flex-row pr-0">
              <span className="d-flex align-self-center">Riya Negi</span>
              <Badge
                pill
                variant="secondary"
                className="d-flex align-self-center ml-1"
              >
                Python Expert
              </Badge>
            </span>
            <span className="col-4 pl-0 font-weight-bold d-flex text-muted justify-content-end">
              32 karma
            </span>
          </Link>
        </div>
        <div className="mt-1 font-weight-bold leaderboard-row">
          <Link className="d-flex flex-row no-decoration py-2">
            <span className="col-8 d-flex flex-row pr-0">
              <span className="d-flex align-self-center">Raj N</span>
              <Badge
                pill
                variant="secondary"
                className="d-flex align-self-center ml-1"
              >
                Python Expert
              </Badge>
            </span>
            <span className="col-4 pl-0 font-weight-bold d-flex text-muted justify-content-end">
              32 karma
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
