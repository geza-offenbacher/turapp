import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      alliance: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: '',
      linkedin: '',
      youtube: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(',');
      profile.alliance = !isEmpty(profile.alliance) ? profile.alliance : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.tiktok = !isEmpty(profile.social.tiktok)
          ? profile.social.tiktok
          : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';

      this.setState({
        handle: profile.handle,
        alliance: profile.alliance,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        bio: profile.bio,
        facebook: profile.facebook,
        instagram: profile.instagram,
        twitter: profile.twitter,
        tiktok: profile.tiktok,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      alliance: this.state.alliance,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      twitter: this.state.twitter,
      tiktok: this.state.tiktok,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
              placeholder="https://www.facebook.com/???"
              name="facebook"
              icon="fab fa-facebook-square"
              value={this.state.facebook}
              onChange={this.onChange}
              error={errors.facebook}
          />
          <InputGroup
              placeholder="https://www.instagram.com/???"
              name="instagram"
              icon="fab fa-instagram"
              value={this.state.instagram}
              onChange={this.onChange}
              error={errors.instagram}
          />
          <InputGroup
              placeholder="https://twitter.com/???"
              name="twitter"
              icon="fab fa-twitter"
              value={this.state.twitter}
              onChange={this.onChange}
              error={errors.twitter}
          />
          <InputGroup
              placeholder="https://tiktok/???"
              name="tiktok"
              icon="fab fa-tumblr"
              value={this.state.tiktok}
              onChange={this.onChange}
              error={errors.tiktok}
          />
          <InputGroup
              placeholder="https://youtube/???"
              name="youtube"
              icon="fab fa-youtube"
              value={this.state.youtube}
              onChange={this.onChange}
              error={errors.youtube}
          />
          <InputGroup
              placeholder="https://linked.in/???"
              name="linkedin"
              icon="fab fa-linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
              error={errors.linkedin}
          />
        </div>
      );
    }

    const options = [
      { label: '* Kérlek válaszd ki, hogy mi a legmagasabb természetjárói minősítésed ', value: 0 },
      { label: 'Kiránduló', value: 'Kiránduló' },
      { label: 'Túrázó', value: 'Túrázó' },
      { label: 'Bronzjelvényes természetjáró', value: 'Bronzjelvényes természetjáró' },
      { label: 'Ezüstjelvényes természetjáró', value: 'Ezüstjelvényes természetjáró' },
      { label: 'Aranyjelvényes természetjáró', value: 'Aranyjelvényes természetjáró' },
      { label: 'Érdemes természetjáró', value: 'Érdemes természetjáró' },
      { label: 'Kiváló természetjáró', value: 'Kiváló természetjáró' },
      { label: 'Egyéb', value: 'Egyéb' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Vissza
              </Link>
              <h1 className="display-4 text-center">Profil módosítása</h1>
              <small className="d-block pb-3">* = kötelezően kitöltendő mezők</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                    placeholder="* Profil elérhetősége: https://turapp.com/<aTeEgyéniLinked>"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                    info="Teljesen egyedi, választhatsz bármit."
                />
                <SelectListGroup
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    options={options}
                    error={errors.status}
                    info="Kérlek válaszd ki, hogy mi a legmagasabb természetjárói minősítésed."
                />
                <TextFieldGroup
                    placeholder="Szövetség"
                    name="alliance"
                    value={this.state.alliance}
                    onChange={this.onChange}
                    error={errors.alliance}
                    info="Ha tagja vagy valamelyik természetjáró szövetségnek, itt megadhatod."
                />

                <TextFieldGroup
                    placeholder="Lakhely"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="Város vagy megye, ahol általában megfordulsz, de a pontos címed lehetőleg ne írd ki. (pl.: Eger/Heves) "
                />
                <TextFieldGroup
                  placeholder="pl. hegymászó, vadvizi evező, stb."
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Itt tüntetheted fel a képesítéseid."
                />

                <TextAreaFieldGroup
                    placeholder="Rövid leírás magadról"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Írj egy pár szót magadról, hogy jobban megismerhesünk."
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Online elérhetőségek
                  </button>
                  <span className="text-muted">,de nem kötelező megadnod</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Módosítom a profilom"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
