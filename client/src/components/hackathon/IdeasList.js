import React, { Component } from "react"
import { Link } from "react-router-dom";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ideas from './ideas.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Collapse, Badge } from 'react-bootstrap';

class IdeasList extends Component {

  state = {
    ...ideas.map((idea) => ({ [`show${idea.language}`]: false })),
  }

  render() {
    return (<div className="p-3 d-flex justify-content-between" style={{ backgroundColor: 'white', border: '1px solid #e1e1e1', borderRadius: '3px' }}>
      <div className="col-10 col-md-11">
        <h4 className="">Trouble finding an idea?</h4>
        <h6 className="text-muted">Find inspiration in our curated list! (expand)</h6>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text">
            {ideas.map((idea) => (
              <div className="mt-2">
                {idea.list.map(i =>
                  <div className="idea-card d-flex justify-content-between mt-2 flex-wrap">
                    <li className="col-md-11 col-10">{i}</li>
                    <span className="col-md-1 col-2 ">
                      <Badge
                        className="post-link badge-light p-2  float-right"
                        style={{ backgroundColor: "#e9e9e9" }}
                      >
                        {idea.label}
                      </Badge>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Collapse>
      </div>
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
    </div>
    );
  }
}

export default IdeasList;