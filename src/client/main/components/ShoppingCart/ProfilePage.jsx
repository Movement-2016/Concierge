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
      <Shell title="Plan Summary" name="plan-summary-page">
        <PlanForm onSubmit={this.onSubmit} />
      </Shell>
    );
  }
}


module.exports = PlanProfilePage;
