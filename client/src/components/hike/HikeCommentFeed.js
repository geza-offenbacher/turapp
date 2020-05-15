import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HikeCommentItem from './HikeCommentItem';

class HikeCommentFeed extends Component {
    render() {
        const { hikeComments, hikeId } = this.props;

        return hikeComments.map(hikeComment => (
            <HikeCommentItem key={hikeComment._id} hikeComment={hikeComment} hikeId={hikeId} />
        ));
    }
}

HikeCommentFeed.propTypes = {
    hikeComments: PropTypes.array.isRequired,
    hikeId: PropTypes.string.isRequired
};

export default HikeCommentFeed;
