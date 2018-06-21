import React from 'react';
import ContentPage from './ContentPage.jsx';
import ProfileInput from './Profile/Input.jsx';
import AutoSave from './Profile/AutoSave.jsx';
import { houseParty } from '../services/email';

class PartyForm extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      done: '',
      error: '',
      hostParty: false,
      learnMore: false,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ done: '', error: '' });
    /* globals $ */
    const vobj = $('.user-info')
      .serializeArray()
      .reduce((obj, x) => ((obj[x.name] = x.value), obj), {});
    houseParty(vobj)
      .then(done => this.setState({ done }))
      .catch(error => this.setState({ error }));
  };

  render() {
    const { done, error } = this.state;

    return (
      <ContentPage pageName="houseparty">
        <div className="houseparty-form padded-form">
          <h3>{'Your Information'}</h3>
          <form className="user-info" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col s12 m6">
                <ProfileInput name="fname" placeholder="First Name *" required />
              </div>
              <div className="col s12 m6">
                <ProfileInput name="lname" placeholder="Last Name *" required />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <ProfileInput type="email" name="email" placeholder="Email *" required />
              </div>
              <div className="col s12 m6">
                <ProfileInput type="tel" name="phone" placeholder="Phone *" required />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <ProfileInput className="input-city" name="city" placeholder="City *" required />
                <ProfileInput className="input-state" name="state" placeholder="State *" required />
              </div>
              <div className="col s12 m6">
                <ProfileInput name="affiliation" placeholder="Business or Affiliation" />
              </div>
            </div>
            <div className="checkbox-group">
              <div className="checkbox">
                <input type="checkbox" className="filled-in" name="hostParty" id="hostParty" />
                <label htmlFor="hostParty">{'Yes! I would like to host a house party!'}</label>
              </div>
              <div className="checkbox">
                <input type="checkbox" className="filled-in" name="learnMore" id="learnMore" />
                <label htmlFor="learnMore">
                  {'I am interested in hosting a house party, but would like to learn more.'}
                </label>
              </div>
            </div>
            <textarea name="message" placeholder="Anything else you'd like to tell us?" />
            <button id="contact-form-submit" className="waves-effect waves-light btn" type="submit">
              {'Submit'}
            </button>
            <AutoSave />
          </form>
          {done && <div className="submit-message submit-success">{done}</div>}
          {error && <div className="submit-message submit-error">{error.toString()}</div>}
        </div>
      </ContentPage>
    );
  }
}

module.exports = PartyForm;
