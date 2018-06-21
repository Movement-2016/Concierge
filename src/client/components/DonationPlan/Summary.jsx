import React from 'react';

import BackLink from '../BackLink.jsx';
import Totals from './Totals.jsx';
import EmailPlanButton from './EmailPlanButton.jsx';
import AutoSavePlan from './AutoSavePlan.jsx';
import Plan from './Plan.jsx';
import RequestConsult from './RequestConsult.jsx';
import SummaryUser from './SummaryUser.jsx';

class Summary extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      msg: '',
      error: '',
    };
  }

  onDone = done => this.setState({ done });
  onError = error => this.setState({ error });

  render() {
    const { mobile } = this.props;

    const { done, error } = this.state;

    return (
      <div>
        {mobile && <SummaryUser />}
        <div className="padded-form summary-form">
          <div className="row">
            <div className="col s12 l8">
              <Plan readonly {...this.props} />
            </div>
            <div className="col s12 l4">
              <div className="total-section">
                <Totals />
                {!mobile && <SummaryUser />}
                <div className="link-area">
                  <EmailPlanButton onError={this.onError} onDone={this.onDone}>
                    {'Email me this plan'}
                  </EmailPlanButton>
                  <AutoSavePlan onError={this.onError} onDone={this.onDone} />
                  {done && <div className="submit-message submit-success">{done}</div>}
                  {error && <div className="submit-message submit-error">{error.toString()}</div>}
                  <RequestConsult />
                </div>
              </div>
            </div>
          </div>
          <BackLink to="/plan" title="Edit Plan">
            {'Edit plan'}
          </BackLink>
        </div>
      </div>
    );
  }
}

module.exports = Summary;
