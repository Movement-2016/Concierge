import React     from 'react';
import { Link }  from 'react-router';

import Totals           from './Totals.jsx';
import EmailPlanButton  from './EmailPlanButton.jsx';
import Plan             from './Plan.jsx';
import RequestConsult   from './RequestConsultOption.jsx';
import SummaryUser      from './SummaryUser.jsx';

class SummaryListing extends Plan {

  get readonly() {
    return true;
  }
}

class Summary extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { 
      msg: '',
      error: '',
    };
    this.onDone = this.onDone.bind(this);
    this.onError = this.onError.bind(this);
  }

  onDone(msg) {
    this.setState({ msg });
  }

  onError(error) {
    this.setState({ error });
  }

  render() {

    return(
      <div className="plan-summary">
        <Totals />
        <SummaryListing />
        <div className="action-area">   
          <Link className="btn" to="/plan">Make Changes</Link>      
          <SummaryUser />
          <RequestConsult />
          <EmailPlanButton onError={this.onError} onDone={this.onDone}>Email me this plan</EmailPlanButton>
        </div>
      </div>
    );
  }
}

module.exports = Summary;


