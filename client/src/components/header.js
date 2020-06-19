import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./logo.png";
class Header extends PureComponent {
  state = {
    active: false,
  };

  handleClick = this.handleClick.bind(this);

  handleClick() {
    console.log("state: ", this.state.active);
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="/">
          {/* <label
            style={{
              border: "2px solid black",
              fontSize: 20,
              // textDecoration: "underline",
              width: 20,
              textAlign: "center",
            }}
          >
            C
          </label>
          <label
            style={{
              border: "2px solid black",
              fontSize: 20,
              // textDecoration: "underline",
              backgroundColor: "black",
              color: "white",
              width: 20,
            }}
          >
            J
          </label> */}
          <img src={logo} style={{ width: 120, height: 17 }} alt="userIcon" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0"></ul>

          {this.props.authenticated ? (
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/">
                  XYZ
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  My Account
                </a>
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a class="dropdown-item" href={`users/${this.props.user.id}`}>
                    Profile
                  </a>
                  <a class="dropdown-item" href="/signout">
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          ) : (
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/">
                    Sign Up
                </a>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign In
                </Link>
                </li>
              </ul>
            )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated, user: state.auth.data };
};

export default connect(mapStateToProps)(Header);
