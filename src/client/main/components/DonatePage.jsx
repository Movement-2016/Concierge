import React    from 'react';
import { Link } from 'react-router';

import TilesPage       from './TilesPage.jsx';
import { PageContext } from './ContextMixins.js';

const PlanLinkBox = () => {
  return (
      <div className="plan-link-box">
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
    return(
        <TilesPage page={this.state.page} className="donatePage">
          <PlanLinkBox />
        </TilesPage>    
      );
  }
}

module.exports = DonatePage;