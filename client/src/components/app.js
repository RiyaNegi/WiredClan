import React, { Component } from "react";
import Header from "./header";
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div class="container">
        <Header />
        {this.props.location.pathname === "/signin" ||
        this.props.location.pathname === "/signup" ? (
          <div className=" signin-container container">
            {this.props.children}
          </div>
        ) : (
          <div className="container">{this.props.children}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(withRouter(App));
