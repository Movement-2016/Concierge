import React            from 'react';
import Link             from '../../../ui/LinkToRoute';

import Plan             from './Plan.jsx';
import Totals           from './Totals.jsx';
import RequestConsult   from './RequestConsult.jsx';

// const BackToGroups = () => {
//   return (
//     <Link className="back-link" to="/groups" title="Continue Browsing Groups"><i className="material-icons">chevron_left</i>Back to browse groups</Link>
//     );
// };

const PageDescription = () => {
  return (
    <p className="page-description">Enter a planned donation for each group. Once you complete your donation plan, we will email you a copy with simple instructions on how to donate directly to your chosen groups.</p>
  );
};

class SummaryLink extends React.Component {

  render() {
    const { 
      user: {
        email, 
        phone 
      } 
    } = this.props.store.getState();

    const isUserKnown = email && phone;

    const url = isUserKnown ? '/plan/summary' : '/plan/profile';

    return (
      <Link className="complete-button btn waves-effect waves-light" to={url}>Complete Plan</Link>
    );
  }
}

class PlanPage extends React.Component {

  render() {
    const {
      store,
    } = this.props;

    return (
      <main className="content-page custom-planning cart-page">
        <div className="container small-container">
          <h1 className="page-title">My Donation Plan</h1>
          <PageDescription />
          <div className="padded-form donation-form">
            <div className="row">
              <div className="col s12 l8">
                <Plan {...this.props} />
              </div>
              <div className="col s12 l4">
                <div className="total-section">
                  <Totals store={store} />
                  <div className="link-area">
                    <SummaryLink store={store} />
                    <RequestConsult />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

module.exports = PlanPage;
