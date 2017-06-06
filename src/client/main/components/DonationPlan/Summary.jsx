import React     from 'react';
import { Link }  from 'react-router';

import Totals           from './Totals.jsx';
import EmailPlanButton  from './EmailPlanButton.jsx';
import Plan             from './Plan.jsx';
import RequestConsult   from './RequestConsult.jsx';
import SummaryUser      from './SummaryUser.jsx';

class SummaryListing extends Plan {
  get readonly() {
    return true;
  }
}

const EditPlan = () => {
  return (
    <Link className="back-link" to="/plan" title="Edit my plan"><i className="material-icons">chevron_left</i>Edit plan</Link>
  );
};

class Summary extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      msg: '',
      error: ''
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

    const { mobile } = this.props;

    return (
      <div>
        {mobile && <SummaryUser />}
        <div className="padded-form summary-form">
          <div className="row">
            <div className="col s12 l8">
              <SummaryListing />
            </div>
            <div className="col s12 l4">
              <div className="total-section">
                <Totals />
                {!mobile && <SummaryUser />}
                <div className="link-area">
                  <EmailPlanButton onError={this.onError} onDone={this.onDone}>Email me this plan</EmailPlanButton>
                  <RequestConsult />
                </div>
              </div>
            </div>
          </div>
          <EditPlan />
        </div>
      </div>
    );
  }
}

module.exports = Summary;
