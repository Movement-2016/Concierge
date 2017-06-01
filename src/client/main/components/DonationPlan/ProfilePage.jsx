import React from 'react';
import { browserHistory } from 'react-router';

import { Shell } from '../ContentPage.jsx';
import ProfileForm from '../Profile/Form.jsx';

class PlanProfilePage extends React.Component {
  constructor() {
    super(...arguments);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    browserHistory.push('/plan/summary');
  }

  render() {
    return (
      <Shell title="Complete Your Plan" name="custom-planning profile-page">
        <p className="page-description">Almost done! Enter your info below to save your donation plan, send yourself a copy, or request to speak with a donor advisor.</p>
        <ProfileForm onSubmit={this.onSubmit} />
      </Shell>
    );
  }
}


module.exports = PlanProfilePage;
