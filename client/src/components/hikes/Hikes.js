import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HikeForm from './HikeForm';
import HikeFeed from './HikeFeed';
import Spinner from "../common/Spinner";
import { getHikes } from '../../actions/hikeActions';

class Hikes extends Component {
  componentDidMount() {
    this.props.getHikes();
  }

  render() {
    const { hikes, loading } = this.props.hike;
    let hikeContent;

    if (hikes === null || loading) {
      hikeContent = <Spinner />;
    } else {
      hikeContent = <HikeFeed hikes={hikes} />;
    }

    return (
      <div className="hikefeed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <HikeForm />
              {hikeContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Hikes.propTypes = {
  getHikes: PropTypes.func.isRequired,
  hike: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  hike: state.hike
});

export default connect(mapStateToProps, { getHikes })(Hikes);
