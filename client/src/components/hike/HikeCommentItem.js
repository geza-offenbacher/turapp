import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteHikeComment } from '../../actions/hikeActions';


class HikeCommentItem extends Component {
  onDeleteClick(hikeId, hikeCommentId) {
    this.props.deleteHikeComment(hikeId, hikeCommentId);
  }

  render() {
    const { hikeComment, hikeId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={hikeComment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{hikeComment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{hikeComment.text}</p>
            <p className="lead">{hikeComment.title}</p>
            <p className="lead">{hikeComment.start}</p>

            <p className="lead">{hikeComment.from}</p>
            <p className="lead">{hikeComment.to}</p>
            {hikeComment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, hikeId, hikeComment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

HikeCommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  hikeComment: PropTypes.object.isRequired,
  hikeId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteHikeComment })(HikeCommentItem);
