import React, { Component } from "react";
import Header from "./header";
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";
import History from "../history.js";
import Cookies from 'universal-cookie';

class App extends Component {
  componentWillMount() {
    const cookies = new Cookies();

    // Cookie expired.
    if (this.props.authenticated && !cookies.get('connect.sid')) {
      History.push('/signout');
    }

    if (
      this.props.authenticated &&
      (this.props.location.pathname === "/signin" ||
        this.props.location.pathname === "/signup")
    ) {
      History.push("/");
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-container">


          <Header />
          <div className="container">

            {this.props.location.pathname === "/signin" ||
              this.props.location.pathname === "/signup" ? (
                <div className=" signin-container container mt-md-0 mt-3">
                  {this.props.children}
                </div>
              ) : (
                <div className="mt-1">{this.props.children}</div>
              )}
          </div>
          <footer className="page-footer">
            <p className="footer-text pt-5 pb-4">Made with <span style={{ verticalAlign: 'sub', fontSize: '22px', fontFamily: "'Frank Ruhl Libre', serif" }}>❤</span> in India </p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(withRouter(App));
