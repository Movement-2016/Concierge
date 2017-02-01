import React from 'react';
import Alert from '../../ui/Alert.jsx';
import ContentPage from './ContentPage.jsx';

class PartyForm extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      sent: false,
      error: '',
      hostParty: false,
      learnMore: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }

  componentDidMount() {
    /* bug in jquery forces a primer for events */
    $('#hostParty').click( function() {} );
    $('#learnMore').click( function() {} );
  }

  onChecked(e) {
    this.setState( { [e.target.name]: !e.target.value } );
  }

  onSubmit(e) {

    e.preventDefault();
    /* global $ */
    $.ajax({
            url: '/api/houseparty',
            type: 'post',
            dataType: 'json',
            data: $('.user-info').serialize(),
            success: (/*data*/) => this.setState({ sent: true, error: '' }),
            error: () => this.setState({ sent: false, error: 'wups, there was a problem'})
        });
  }

  render() {
    const { sent, error } = this.state;

    if( sent ) {
      return (
          <ContentPage.Shell name="hostaparty" title="Host A Party">
            <AfterSubmit />
          </ContentPage.Shell>
        );
    }

      return (
        <ContentPage.Shell name="hostaparty" title="Host A Party">
          <div className="houseparty-form padded-form">
            <h3>Your Information</h3>
            {error && <Alert msg={error} type={Alert.DANGER} />}
            <form className="user-info" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col s12 m6">
                  <input type="text" name="firstName" placeholder="First Name *" required />
                </div>
                <div className="col s12 m6">
                  <input type="text" name="lastName" placeholder="Last Name *" required />
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <input type="email" name="email" placeholder="Email *" required />
                </div>
                <div className="col s12 m6">
                  <input type="text" name="phone" placeholder="Phone *" required />
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <input type="text" className="input-city" name="city" placeholder="City *" required />
                  <input type="text" className="input-state" name="state" placeholder="State *" required />
                </div>
                <div className="col s12 m6">
                  <input type="text" name="affiliation" placeholder="Business or Affiliation" />
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
          </div>
        </ContentPage.Shell>
      );
  }
}

const AfterSubmit = () =>(
  <div id="success-modal" className="-modal">
    <div className="-modal-content">
      <h5>Thanks for your interest!</h5>
      <p>We'll be in touch soon to follow up.</p>
    </div>
  </div>
);

    // <!-- div className="-modal-footer">
    //   <a href="#!" className="modal-action modal-close waves-effect btn-flat">Close</a>
    // </div -->

PartyForm.AfterSubmit = AfterSubmit;

module.exports = PartyForm;
