import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addHikeComment} from "../../actions/hikeActions";

class HikeCommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            title: '',
            start: '',
            from: '',
            to: '',
            arrive: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const { user } = this.props.auth;
        const { hikeId } = this.props;

        const newHikeComment = {
            text: this.state.text,
            title: this.state.title,
            name: user.name,
            avatar: user.avatar
        };
        this.props.addHikeComment(hikeId, newHikeComment);
        this.setState({ text: '' });
        this.setState({ title: '' });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-success text-white">
                        Ha kérdésed van a túrával kapcsolatban, itt felteheted:
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="A kérdés helye"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Kérdezek!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

HikeCommentForm.propTypes = {
    addHike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    hikeId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addHikeComment })(HikeCommentForm);
