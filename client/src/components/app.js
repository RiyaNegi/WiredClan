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
        <div class="container">
          <Header />
          {this.props.location.pathname === "/signin" ||
            this.props.location.pathname === "/signup" ? (
              <div className=" signin-container container">
                {this.props.children}
              </div>
            ) : (
              <div className="container p-0">{this.props.children}</div>
            )}
        </div>
        <footer class="page-footer">
          <hr />
          <div class="footer-copyright text-center py-2 text-muted">
            <p className="mr-5">Designed and made with ❤️ in India </p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(withRouter(App));
