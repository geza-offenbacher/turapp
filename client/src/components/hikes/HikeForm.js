import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addHike } from '../../actions/hikeActions';
import TextFieldGroup from "../common/TextFieldGroup";

class HikeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      title: '',
      start: '',
      arrive: '',
      from:'',
      to:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newHike = {
      text: this.state.text,
      title: this.state.title,
      start: this.state.start,
      arrive: this.state.arrive,
      from: this.state.from,
      to: this.state.to,
      oneday: false,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addHike(newHike);
    this.setState({ text: '' });
    this.setState({ title: '' });
    this.setState({ start: '' });
    this.setState({ arrive: '' });
    this.setState({ from: '' });
    this.setState({ to: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      oneday: !this.state.oneday,
      to:this.state.from
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="hike-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-success text-white">Írd ki a saját túrád:</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                    placeholder="Cím"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                />
              </div>
                <TextAreaFieldGroup
                  placeholder="Merre mennél?"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              <TextAreaFieldGroup
                  placeholder="Indulási helyszín"
                  name="start"
                  value={this.state.start}
                  onChange={this.onChange}
                  error={errors.start}
              />
              <TextAreaFieldGroup
                  placeholder="Érkezési helyszín"
                  name="arrive"
                  value={this.state.arrive}
                  onChange={this.onChange}
                  error={errors.arrive}
              />
              <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
              />
              <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
              />
              <div className="form-check mb-4">
                <input
                    type="checkbox"
                    className="form-check-input"
                    name="oneday"
                    value={this.state.oneday}
                    checked={this.state.oneday}
                    onChange={this.onCheck}
                    id="oneday"
                />
                <label htmlFor="current" className="form-check-label">
                  Egy napos túra
                </label>
              </div>

              <button type="submit" className="btn btn-dark">
                Kiírom a túrám
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

HikeForm.propTypes = {
  addHike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addHike })(HikeForm);
