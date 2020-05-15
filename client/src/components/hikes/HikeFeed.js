import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HikeItem from './HikeItem';

class HikeFeed extends Component {
  render() {
    const { hikes } = this.props;

    return hikes.map(hike => <HikeItem key={hike._id} hike={hike} />);
  }
}

HikeFeed.propTypes = {
  hikes: PropTypes.array.isRequired
};

export default HikeFeed;
