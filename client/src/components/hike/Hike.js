import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HikeItem from "../hikes/HikeItem";
import HikeCommentForm from './HikeCommentForm';
import HikeCommentFeed from './HikeCommentFeed';
import Spinner from '../common/Spinner';
import { getHike } from "../../actions/hikeActions";

class Hike extends Component {
  componentDidMount() {
    this.props.getHike(this.props.match.params.id);
  }

  render() {
    const { hike, loading } = this.props.hike;
    let hikeContent;

    if (hike === null || loading || Object.keys(hike).length === 0) {
      hikeContent = <Spinner />;
    } else {
      hikeContent = (
        <div>
          <HikeItem hike={hike} showActions={false} />
          <HikeCommentForm hikeId={hike._id} />
          <HikeCommentFeed hikeId={hike._id} hikeComments={hike.hikeComments} />
        </div>
      );
    }

    return (
      <div className="hike">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/hikefeed" className="btn btn-success mb-3">
                Vissza a túrákhoz
              </Link>
              {hikeContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Hike.propTypes = {
  getHike: PropTypes.func.isRequired,
  hike: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  hike: state.hike
});

export default connect(mapStateToProps, { getHike })(Hike);
