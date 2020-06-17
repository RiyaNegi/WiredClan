import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends PureComponent {
  state = {
    active: false,
  };

  handleClick = this.handleClick.bind(this);

  handleClick() {
    console.log("state: ", this.state.active)
    this.setState({
      active: !this.state.active
    });
  }
  renderLinks() {
    if (this.props.authenticated) {
      console.log("header called", this.props.user.id)
      return (
        <li className="nav-item">
          <a className="nav-link" href={`/Users/${this.props.user.id}`}>
            <button className="navbar-userbox" onClick={this.handleClick}>
              <div className="nav-icon">
                <img
                  src={this.props.user.imageUrl}
                  style={{ width: 28, height: 28, borderRadius: 28 / 2 }}
                  alt="userIcon"
                />
              </div>
              <div className="nav-username nav-text">{this.props.user.userName}</div>
            </button>
          </a>
          <Link className="nav-link" to="/signout">
            <span className='nav-text'>Sign Out</span>
          </Link>
        </li>
      );
    } else {
      return [
        <span>
          <li className="nav-item" key="signin">
            <Link className="nav-link nav-links nav-text" to="/signin">
              Sign In
          </Link>
          </li>
          <li className="nav-item" key="signup">
            <Link className="nav-link nav-links nav-text" to="/signup">
              Sign Up
          </Link>
          </li>
        </span>
      ];
    }
  }

  render() {
    return (
      <span>
        <nav className="navbar navbar-toggleable-md navbar-light my-navbar">
          <Link to={{ pathname: "/HomePage", state: { search: "" } }} className="navbar-brand">
            CodeJimmy...
          </Link>
          <ul className="navbar-nav">{this.renderLinks()}</ul>
        </nav>
        {/* <div className="nav-profile-card">

        </div> */}
      </span>
    );
  }
}

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated, user: state.auth.data };
};

export default connect(mapStateToProps)(Header);
