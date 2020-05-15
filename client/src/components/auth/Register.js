import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      checkbox: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheck(e) {
    this.setState({
      checkbox: !this.state.checkbox
    })};

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Regisztráció</h1>
              <p className="lead text-center">
                Hozzd létre a saját felhasználói fiókod a TurApp-on
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Név"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="E-mail cím"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Ez a weboldal Gravatar-t használ, ha profilképet szeretnél, használj Gravatar e-mailt!"
                />
                <TextFieldGroup
                  placeholder="Jelszó"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Jelszó megerősítése"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <div className="form-check mb-4">
                  <input
                      type="checkbox"
                      className="form-check-input"
                      name="current"
                      value={this.state.checkbox}
                      checked={this.state.checkbox}
                      onChange={this.onCheck}
                      id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    <Link to="/termsandconditions">Felhasználási feltételeket</Link> elolvastam és elfogadom.
                  </label>
                </div>
                <input disabled={!this.state.checkbox} type="submit" value="Regisztrálok" className="btn btn-success btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
