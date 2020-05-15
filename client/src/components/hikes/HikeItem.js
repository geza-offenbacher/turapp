import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteHike, addHikeLike, removeHikeLike } from '../../actions/hikeActions';
import Moment from "react-moment";

class HikeItem extends Component {
  onDeleteClick(id) {
    this.props.deleteHike(id);
  }

  onHikeLikeClick(id) {
    this.props.addHikeLike(id);
  }

  onHikeUnlikeClick(id) {
    this.props.removeHikeLike(id);
  }

  findUserHikeLike(hikeLikes) {
    const { auth } = this.props;
    if (hikeLikes.filter(HikeLike => HikeLike.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { hike, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={hike.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{hike.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{hike.title}</p>
            <p >Túra leírása: {' '}{hike.text}</p>
            <p >Helyszín: {' '}{hike.start}</p>
            <p>Dátum: {' '}
              <Moment format="YYYY.MM.DD">{hike.from}</Moment>
              {hike.to === hike.from ? (
                  ' '
              ) : (
                  <a> - <Moment format="YYYY.MM.DD">{hike.to}</Moment> </a>
              )}
            </p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onHikeLikeClick.bind(this, hike._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >

                  <i
                    className={classnames('fas fa-hiking', {
                      'text-success': this.findUserHikeLike(hike.hikeLikes)
                    })}
                  /> Jelentkezem
                  <span className="badge badge-light">{hike.hikeLikes.length}</span>
                </button>
                <button
                  onClick={this.onHikeUnlikeClick.bind(this, hike._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary far fa-times-circle" />
                </button>
                <Link to={`/hike/${hike._id}`} className="btn btn-success mr-1">
                  A túrához
                </Link>
                {hike.user === auth.user.id ? (

                  <button
                    onClick={this.onDeleteClick.bind(this, hike._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>

                  )
                     : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

HikeItem.defaultProps = {
  showActions: true
};

HikeItem.propTypes = {
  deleteHike: PropTypes.func.isRequired,
  addHikeLike: PropTypes.func.isRequired,
  removeHikeLike: PropTypes.func.isRequired,
  hike: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteHike, addHikeLike, removeHikeLike })(
  HikeItem
);
