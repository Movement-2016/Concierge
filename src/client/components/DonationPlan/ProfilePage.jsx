import React from 'react';
import Link from '../../services/LinkToRoute';

import { Shell } from '../ContentPage.jsx';
import BackLink from '../BackLink.jsx';
import ProfileForm from '../Profile/Form.jsx';

class PlanProfilePage extends React.Component {
  constructor() {
    super(...arguments);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    Link.navigateTo('/plan/summary');
  }

  render() {
    return (
      <Shell title="Complete Your Plan" name="custom-planning profile-page">
        <p className="page-description">Almost done! Enter your info below to save your donation plan, send yourself a copy, or request to speak with a donor advisor.</p>
        <ProfileForm submitText="Complete Plan" onSubmit={this.onSubmit}>
          <BackLink to="/plan" title="Edit Plan">Edit plan</BackLink>
        </ProfileForm>
      </Shell>
    );
  }
}


module.exports = PlanProfilePage;