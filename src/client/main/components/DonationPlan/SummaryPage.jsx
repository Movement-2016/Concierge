import React from 'react';

import { Shell } from '../ContentPage.jsx';
import Summary   from './Summary.jsx';

function PlanSummaryPage(props) {
  return (
    <Shell title="Plan Results" name="plan-summary-page" big={false}>
      <Summary mobile={props.mobile}/>
    </Shell>
  );
};

module.exports = PlanSummaryPage;
