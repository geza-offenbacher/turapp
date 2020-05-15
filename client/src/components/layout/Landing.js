import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Cookie from "../common/Cookie";


class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <Cookie/>
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">TúrApp</h1>
                <p className="lead">
                  {' '}
                  Társ a természetjárásban
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  <i className="fas fa-file-signature"></i>
                  {' '}
                  Csatlakozz!
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  <i className="fas fa-sign-in-alt"></i> Jelentkezz be!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
