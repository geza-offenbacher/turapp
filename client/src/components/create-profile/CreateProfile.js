import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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

    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Profil létrehozása</h1>
              <p className="lead text-center">
                Itt megadhatod a legszükségesebb adatokat, hogy társakat találhass
              </p>
              <small className="d-block pb-3">* = kötelező mezők</small>
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
                  info="Itt a speciális jártasságokat tudod felsorolni, vesszővel elválasztva."
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
                  value="Létrehozom a profilom"
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
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
