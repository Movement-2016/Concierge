import React    from 'react';
import { Link } from 'react-router';

import Plan        from './Plan.jsx';
import ContentPage from '../ContentPage.jsx';
import Totals      from './Totals.jsx';

import { ContextMixin } from '../ContextMixins';

const GroupsLinkButton = () => {
  return (
    <Link className="btn-floating groups-link" to="/groups" title="Go back to groups"><i className="material-icons">list</i></Link>
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
        <div className="summary-link-section">
          <p>Complete this plan so we can email a copy to you. You will also have the option to
              request a consultation with a donation advisor who can answer any of your questions.</p>
          <Link className="btn" to={url}>Complete Plan</Link>
        </div>
      );
  }
}


class Cart extends React.Component {

  render() {
    return (
      <ContentPage.Shell title="Plan Your Contribution" name="shopping-cart">
        <GroupsLinkButton />
        <div className="shopping-cart">
            <p>Use this worksheet to help plan how to most effectively make your donations to grassroots movement groups.</p> 
            <div className="donor-area container"> 
              <div className="row">
                <div className="col s12 m8">
                  <Plan />
                </div>
                <div className="col s12 m4">
                  <Totals />
                  <SummaryLink />
                </div>
              </div>
          </div>
        </div>
      </ContentPage.Shell>
    );
  }
}

module.exports = Cart;

