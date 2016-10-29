import React from 'react';

import { Shell } from '../ContentPage.jsx';
import ProfileForm from '../Profile/Form.jsx';
import { emailPlan } from '../../store/utils';

class ConsultPage extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor() {
    super(...arguments);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onDone = this.onDone.bind(this);
    this.state = {
      error: '',
      msg: ''
    };
  }

  onError(error) {
    this.setState({ error });
  }

  onDone(msg) {
    this.setState({ msg });
  }

  onSubmit(e) {
    e.preventDefault();
    const storeState = this.context.store.getState();
    const props = {
      onError: this.onError,
      onDone: this.onDone
    };
    emailPlan( { storeState, ...props, forceConsult: true } );
  }

  render() {
    return (
      <Shell title="Request a Consultation" name="custom-planning profile-page">
        <p className="page-description">Please make sure your information is correct and an advisor will be in touch soon!</p>
        <ProfileForm onSubmit={this.onSubmit} submitText="Request Consultation" />
      </Shell>
    );
  }
}


module.exports = ConsultPage;
