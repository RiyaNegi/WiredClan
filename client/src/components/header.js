import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends PureComponent {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            <span className='nav-text'>Profile</span>
          </Link>
          <Link className="nav-link" to="/signout">
            <span className='nav-text'>Sign Out</span>
          </Link>
        </li>
      );
    } else {
      return [
        <li className="nav-item" key="signin">
          <Link className="nav-link nav-links" to="/signin">
            Sign In
          </Link>
        </li>,
        <li className="nav-item" key="signup">
          <Link className="nav-link nav-links" to="/signup">
            Sign Up
          </Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light my-navbar">
        <Link to="/" className="navbar-brand">
          CodeJimmy...
        </Link>

        <ul className="navbar-nav">{this.renderLinks()}</ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(Header);
