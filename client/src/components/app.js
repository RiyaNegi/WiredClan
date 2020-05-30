import React, { Component } from "react";
import Header from "./header";
import { connect } from "react-redux";
import * as actions from "../actions";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.authenticated ? <div className="container">{this.props.children}</div>
          : <div className="signin-container container">{this.props.children}</div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}


export default connect(mapStateToProps, actions)(App);