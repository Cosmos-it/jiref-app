import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }


  handleClick() {
    console.log(this.state.toggleMenu);
    this.setState({ toggleMenu: !this.state.toggleMenu });

  }

  render() {
    let slideClass;
    this.state.toggleMenu ? slideClass = 'slideInLeft slide-menu' : slideClass = 'slideInRight';
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to="/feed" data-toggle="offcanvas" >
            Home{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles" data-toggle="offcanvas" >
            Connect{" "}
          </Link>
        </li>

        <li className="nav-item dropdown">
          <a
            href=""
            className="nav-link dropdown-toggle"
            id="dropdown01"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{
                width: "25px",
                marginRight: "5px"
              }}
              title="Must be a gravatar"
            />{" "}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdown01">
            <a className="dropdown-item" href="" data-toggle="offcanvas" >
              Another action
            </a>
            <a className="dropdown-item" href="/dashboard" data-toggle="offcanvas" >
              <i className="fas fa-bars"></i> {' '}Dashboard
            </a>
            <a className="dropdown-item"
              onClick={this.onLogoutClick.bind(this)}><i className="fas fa-sign-out-alt"></i>{' '}Logout
            </a>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      
      <ul className="nav justify-content-end">
      <li className="nav-item">
          <Link className="nav-link" data-toggle="offcanvas" to="/register">
            Sign Up{" "}
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" data-toggle="offcanvas" to="/login">
            Login{" "}
          </Link>{" "}
        </li>
      </ul>
    );
    const navbar = (

      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand mr-auto mr-lg-0" href="/">
            Jíref
          </a>
          <button className="navbar-toggler p-0 border-0"
            type="button"
            data-toggle="offcanvas" onClick={this.handleClick}>
            <span className="navbar-toggler-icon" />
          </button>

          <div className="navbar-collapse offcanvas-collapse"
            id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto" />
            <div className="my-2 my-lg-0">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </div>
      </nav>
    );

    const currentWorkingNav = (
      <nav className="navbar navbar-light bg-light justify-content-between" id="navbar">
      <div className="container">
        <Link className="logo" to={'/'} style={{ 'fontSize': '1.5rem', 'fontWeight': 'bold' }}><p>JIREF</p></Link>
          {/* {isAuthenticated ? authLinks : guestLinks}   */}
      </div>
      </nav>
    );

    return (<div>{currentWorkingNav}</div>)
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile
  }
)(Navbar);
