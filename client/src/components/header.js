import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./logoOld.png";
class Header extends PureComponent {
  state = {
    active: false,
  };

  handleClick = this.handleClick.bind(this);

  handleClick() {
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    return (
      <nav className="d-flex flex-row navbar navbar-expand-lg navbar-light px-0">
        <a className="navbar-brand" href="/">
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
          <img src={logo} style={{ width: 130, height: 17 }} alt="userIcon" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>

          {this.props.authenticated ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href={`/users/${this.props.user.id}`}>
                  <img
                    src={this.props.user.imageUrl}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20 / 2,
                      marginRight: 5,
                    }}
                    alt="usericon"
                  />
                  {this.props.user.firstName} {this.props.user.lastName}
                </a>
              </li>
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
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
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a
                    className="dropdown-item"
                    href={`/users/${this.props.user.id}`}
                  >
                    Profile
                  </a>
                  <a className="dropdown-item" href="/signout">
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Sign Up
                </a>
                </li>
                <li className="nav-item">
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
