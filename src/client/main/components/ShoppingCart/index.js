import React    from 'react';
import { Link } from 'react-router';

import Plan        from './Plan.jsx';
import ContentPage from '../ContentPage.jsx';
import Totals      from './Totals.jsx';

import { ContextMixin } from '../ContextMixins';

const BackToGroups = () => {
  return (
    <Link className="back-to-groups" to="/groups" title="Continue Browsing Groups"><i className="material-icons">chevron_left</i>Continue browsing groups</Link>
    );
};

const PageDescription = () => {
  return (
    <p className="page-description">Enter a planned donation for each group. Once you complete your donation plan, we will email you a copy with simple instructions on how to donate directly to your chosen groups.</p> 
  );
};

class SummaryLink extends ContextMixin(React.Component) {

  stateFromStore(storeState) {
    const { user:{email,phone} } = storeState;
    this.setState({ isUserKnown: email && phone });
  }

  render() {
    const { isUserKnown } = this.state;

    const url = isUserKnown ? '/plan/summary' : '/plan/profile';

    return (
        <Link className="complete-button btn waves-effect waves-light" to={url}>Complete Plan</Link>
      );
  }
}

const ConsultLink = () => {

  const url = '/plan/consult';

  return (
    <p className="consult-link">
      <i className="material-icons">contact_phone</i> If you prefer, you can talk directly to one of our donation advisors. 
      <Link className="complete-button btn waves-effect waves-light" to={url}>Request Consult</Link>
    </p>
    );
};

class Cart extends React.Component {

  render() {
    return (
      <ContentPage.Shell title="Your Donation Plan" name="custom-planning cart-page" big="false">
        <PageDescription />
        <div className="plan-form donation-form"> 
          <div className="row">
            <div className="col s12 m8">
              <Plan />
            </div>
            <div className="col s12 m4 complete-col">
              <div className="complete-section">
                <Totals />
                <SummaryLink />
                <ConsultLink />
                <BackToGroups />
              </div>
            </div>
          </div>
        </div>
      </ContentPage.Shell>
    );
  }
}

module.exports = Cart;

