import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import logoOne from "./logoOne.png";
// import logoOld from "./logoOld.png";
// import logoTwo from "./logoTwo.png";
// import logoFour from "./logoFour.png";
// import logoThree from "./logoThree.png";
// import logoFive from "./logoFive.png";
// import logoSix from "./logoSix.png";
// import logoSeven from "./logos/logoSeven.png";
// import logoEight from "./logoEight.png";
import logoEightWhite from "./logos/logoEightWhite.png";
// import logoNine from "./logoNine.png";
// import logoEight2 from "./logoEight2.png";
// import logoTen from "./logoTen.png";
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
      <nav className="d-flex flex-row navbar navbar-expand-lg navbar-light">
        <div className="container">
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
            {/* <img src={logoOne} style={{ width: 150, height: 27 }} alt="userIcon" /> */}
            {/* <img src={logoOld} style={{ width: 150, height: 27 }} alt="userIcon" /> */}
            {/* <img src={logoTwo} style={{ width: 120, height: 27 }} alt="userIcon" /> */}
            {/* <img src={logoThree} style={{ width: 100 }} alt="userIcon" /> */}
            {/* <img src={logoFour} style={{ width: 120 }} alt="userIcon" /> */}
            {/* <img src={logoFive} style={{ width: 170 }} alt="userIcon" /> */}
            {/* <img src={logoSix} style={{ width: 170 }} alt="userIcon" /> */}
            {/* <img src={logoSeven} style={{ width: 200}} alt="userIcon" /> */}
            <img src={logoEightWhite} style={{ width: 150 }} alt="userIcon" />
            {/* <img src={logoTen} style={{ width: 200 }} alt="userIcon" /> */}
            {/* <img src={logoEight2} style={{ width: 200 }} alt="userIcon" /> */}

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
                <li className="nav-item pr-4">
                  <a
                    style={{
                      // backgroundColor: '#ceffff',
                      // boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.48)',
                      color: 'white'
                    }}
                    className="nav-link" href="/Hackathon">
                    <strong>Hackathon</strong>
                  </a>
                </li>
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle text-white
                    "
                    href="/"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
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
                    <a className="nav-link" href="/Hackathon">
                      Hackathon
                </a>
                  </li>
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

        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated, user: state.auth.data };
};

export default connect(mapStateToProps)(Header);
