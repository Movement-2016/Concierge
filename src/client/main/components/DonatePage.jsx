import React from 'react';
import { Link } from 'react-router';
import TilesPage from './TilesPage.jsx';

const PlanLinkBox = () => {
  return (
      <div className="plan-link-box">
        <p>Create your own custom donation plan by browsing all the groups we work with.</p>
        <Link className="btn btn-primary btn-sm" to="/custom">Create Custom Plan</Link>
      </div>
    );
};

const DonatePage = () => {
  return(
      <TilesPage page='donate' className="donatePage">
        <PlanLinkBox />
      </TilesPage>
    );
};

module.exports = DonatePage;