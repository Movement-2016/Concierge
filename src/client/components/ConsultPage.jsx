import React from 'react';
import {connect} from 'react-redux';
import { emailPlan } from '../services/email';

import { Shell } from './ContentPage.jsx';
import BackLink from './BackLink.jsx';
import ProfileForm from './Profile/Form.jsx';

class _ConsultPage extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      error: '',
      done: ''
    };
  }

  onSubmit = () => {
    const {
      user,
      plan
    } = this.props;

    const emailProps = {
      user,
      plan,
      forceConsult: true
    };

    emailPlan(emailProps)
      .then( done => this.setState({ done }) )
      .catch( error => this.setState({ error }) );
  }

  render() {
    const {
      done,
      error
    } = this.state;

    const successMsg = "Thanks! An advisor should be in touch with you shortly. If you don't hear from us soon, you can send an email to advisor@movementvote.org to follow up."

    return (
      <Shell title="Request a Consultation" name="custom-planning profile-page">
        <p className="page-description">{'Please make sure your information is correct and an advisor will be in touch soon!'}</p>
        <ProfileForm onSubmit={this.onSubmit} submitText="Request Consultation">
          <div>
            {done && <div className="submit-message submit-success">{successMsg}</div>}
            {error && <div className="submit-message submit-error">{error.toString()}</div>}
            <BackLink to="/plan" title="Donation Plan">Your Donation Plan</BackLink>
          </div>
        </ProfileForm>
      </Shell>
    );
  }
}

const mapStateToProps = s => ({user: s.user, plan: s.plan});
const ConsultPage = connect(mapStateToProps)(_ConsultPage);

module.exports = ConsultPage;
