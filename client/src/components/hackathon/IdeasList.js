import React, { Component } from "react"
import { Link } from "react-router-dom";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Collapse, Badge } from 'react-bootstrap';

class IdeasList extends Component {

  constructor(props) {
    super();
    this.state = {
      // ...this.props.ideas.map((idea) => ({ [`show${idea.language}`]: false })),
    }
  }


  render() {
    return (<div className="p-3 row">
      <div className="col-2 col-md-1 p-2">
        <button
          className="post-item-buttons collapse-button"
          onClick={() => this.setState({ open: !this.state.open })}
          aria-controls="example-collapse-text"
          aria-expanded={this.state.open}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            size="2x"
            color="gray"
          />
        </button>
      </div>
      <div className="col-10 col-md-11">
        <h5 className="">Trouble finding an idea?</h5>
        <h6 className="text-muted">Find inspiration in our curated list!</h6>
      </div>


      <Collapse className="col-12 p-0" in={this.state.open}>
        <div className="col-12 p-0" id="example-collapse-text">
          {this.props.ideas.map((idea) => (
            <div className="mt-2">

              <div className="idea-card mt-2">

                <span className="">
                  <Badge
                    className="post-link badge-light p-1"
                    style={{ backgroundColor: "#e9e9e9" }}
                  >
                    {idea.difficulty}
                  </Badge>
                  <Badge
                    className="post-link badge-light p-1 mx-2"
                    style={{ backgroundColor: "#e9e9e9" }}
                  >
                    {idea.tagText}
                  </Badge>

                </span>
                {idea.text}
              </div>
            </div>
          ))}
        </div>
      </Collapse>

    </div>
    );
  }
}

export default IdeasList;