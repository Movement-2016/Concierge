import React    from 'react';
import { Link } from 'react-router';

import TilesPage       from './TilesPage.jsx';
import { PageContext } from './ContextMixins.js';
import ContentPage from './ContentPage.jsx';

const PlanLinkBox = () => {
  return (
      <div className="plan-link-box hide-on-small-and-down">
        <p>Create your own custom donation plan by browsing all the groups we work with.</p>
        <Link className="btn btn-primary btn-sm" to="/groups">Create Custom Plan</Link>
      </div>
    );
};

class DonatePage extends PageContext(React.Component) {
  get page() {
    return 'donate';
  }

  render() {
    const { page } = this.state;

    return(
      <div>
        <PlanLinkBox />
        <ContentPage.Shell name="donate" title={page.title}>
          <TilesPage page={page} className="donate-page" />
        </ContentPage.Shell>
      </div>
      );
  }
}

module.exports = DonatePage;