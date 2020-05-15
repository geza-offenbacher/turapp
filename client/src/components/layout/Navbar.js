import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';


class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            <i className="fas fa-comments"></i>
            {' '}Csevegő
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hikefeed">

            <i className="fas fa-map-signs"></i>
            {' '}Túrák
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-user"></i>
            {' '}Profil
          </Link>
        </li>
        <li className="nav-item">
          <a href="a"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="A kép megjelenítéséhez használd a Gravatar-os email címed"
            />{' '}
            Kijelentkezés
            {' '}
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Regisztráció
            {' '}
            <i className="fas fa-file-signature"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Bejelentkezés
            {' '}
            <i className="fas fa-sign-in-alt"></i>
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-hiking"></i> {' '}
            TúrApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  <i className="fas fa-users"></i>
                  {' '}
                  Tagjaink
                </Link>
              </li>

            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
