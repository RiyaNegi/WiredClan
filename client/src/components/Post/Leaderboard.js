import React from "react";
import { Badge } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";
import "./leaderboard.css";

const Leaderboard = ({ className, style, topContributors, community }) => {
  return (
    <div
      className={`box-shadow leaderboard-box ${className} px-0 pt-3`}
      style={{ height: "fit-content", ...style }}
    >
      {community ? <span className="font-weight-bold text-muted" style={{ marginLeft: "15px" }}>
        Top {community} Contributors
      </span> : <span className="font-weight-bold text-muted" style={{ marginLeft: "15px" }}>
          Top Contributors
      </span>}
      <div className="d-flex flex-column mt-2">
        {!topContributors ? (
          <div className="col-6 mt-5">
            <BeatLoader

              size={40}
              color={"#65ffea"}
            />
          </div>
        ) : (
            topContributors.map((user) => (
              <div className="mt-1 font-weight-bold leaderboard-row"
                key={user.id}
              >
                <a
                  href={`/users/${user.id}`}
                  className="d-flex flex-row no-decoration py-2"
                >
                  <span className="col-9 d-flex flex-row pr-0">
                    <span className="d-flex align-self-center text-truncate">
                      {user.firstName} {user.lastName}
                    </span>
                    {user.badges && user.badges.length > 0 && (
                      <Badge
                        pill
                        variant="secondary"
                        className="d-flex align-self-center ml-1 "
                        style={{ fontSize: "11px" }}
                      >
                        {user.badges[0]}
                      </Badge>
                    )}
                  </span>
                  <span className="col-3 pl-0 font-weight-bold d-flex justify-content-end">
                    {user.likesCount} 🔥
                </span>
                </a>
              </div>
            ))
          )}
      </div>
    </div>
  );
};

export default Leaderboard;
