import React            from 'react';
import { connect }      from 'react-redux';
import Link             from '../../services/LinkToRoute';

import BackLink         from '../BackLink.jsx';
import Plan             from './Plan.jsx';
import Totals           from './Totals.jsx';
import RequestConsult   from './RequestConsult.jsx';

const PageDescription = () => {
  return (
    <p className="page-description">{'Enter a planned donation for each group. Once you complete your donation plan, we will email you a copy with simple instructions on how to donate directly to your chosen groups.'}</p>
  );
};

class _SummaryLink extends React.Component {

  render() {
    const {
      email,
      phone
    } = this.props;

    const isUserKnown = email && phone;

    const url = isUserKnown ? '/plan/summary' : '/plan/profile';

    return (
      <Link className="complete-button btn waves-effect waves-light" to={url}>{'Complete Plan'}</Link>
    );
  }
}

const mapSummaryStateToProps = s => ({ email: s.profile.email, phone: s.profile.phone });

const SummaryLink = connect(mapSummaryStateToProps)(_SummaryLink);

class PlanPage extends React.Component {

  render() {

    return (
      <main className="content-page custom-planning cart-page">
        <div className="container small-container">
          <h1 className="page-title">{'Your Donation Plan'}</h1>
          <PageDescription />
          <div className="padded-form donation-form">
            <div className="row">
              <div className="col s12 l8">
                <Plan {...this.props} />
              </div>
              <div className="col s12 l4">
                <div className="total-section">
                  <Totals />
                  <div className="link-area">
                    <SummaryLink  />
                    <RequestConsult />
                  </div>
                </div>
              </div>
            </div>
            <BackLink to="/groups" title="Browse Groups">{'Browse Groups'}</BackLink>
          </div>
        </div>
      </main>
    );
  }
}

module.exports = PlanPage;
