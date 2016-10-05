import React from 'react';
import { browserHistory } from 'react-router';

import { Shell } from '../ContentPage.jsx';
import PlanForm   from './PlanForm.jsx';

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
      <Shell title="Complete Your Plan" name="plan-summary-page">
        <p className="page-description">Almost done! Enter your info below to save your donation plan and send yourself a copy.</p>
        <PlanForm onSubmit={this.onSubmit} />
      </Shell>
    );
  }
}


module.exports = PlanProfilePage;
