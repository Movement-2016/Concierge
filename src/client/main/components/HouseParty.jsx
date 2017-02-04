import React from 'react';
import Alert from '../../ui/Alert.jsx';
import ContentPage from './ContentPage.jsx';
import ProfileInput  from './Profile/Input.jsx';

class PartyForm extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      done: false,
      error: false,
      hostParty: false,
      learnMore: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    // this.onChecked = this.onChecked.bind(this);
  }

  // componentDidMount() {
  //   /* bug in jquery forces a primer for events */
  //   $('#hostParty').click( function() {} );
  //   $('#learnMore').click( function() {} );
  // }
  //
  // onChecked(e) {
  //   this.setState( { [e.target.name]: !e.target.value } );
  // }

  onSubmit(e) {

    e.preventDefault();
    this.setState( {done: false, error: false} );
    /* global $ */
    $.ajax({
            url: '/api/houseparty',
            type: 'post',
            dataType: 'json',
            data: $('.user-info').serialize(),
            success: (/*data*/) => this.setState({ done: true }),
            error: () => this.setState({ error: true })
        });
  }

  render() {
    const { done, error } = this.state;

      return (
        <ContentPage page="houseparty">
          <div className="houseparty-form padded-form">
            <h3>Your Information</h3>
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
                  <label htmlFor="hostParty">Yes! I would like to host a house party!</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" className="filled-in" name="learnMore" id="learnMore" />
                  <label htmlFor="learnMore">I am interested in hosting a house party, but would like to learn more.</label>
                </div>
              </div>
              <textarea name="message" placeholder="Anything else you'd like to tell us?" />
              <button id="contact-form-submit" className="waves-effect waves-light btn" type="submit"><i className="material-icons right">send</i>Submit</button>
            </form>
            {done && <div className="submit-message submit-success">Thank you! Your message has been sent successfuly.</div>}
            {error && <div className="submit-message submit-error">Error: We were unable to send your message at this time. Please try again later or email advisor@movementvote.org directly.</div>}
          </div>
        </ContentPage>
      );
  }
}

module.exports = PartyForm;
