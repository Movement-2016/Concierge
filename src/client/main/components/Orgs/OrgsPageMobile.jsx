import React from 'react';
import { Link, browserHistory } from 'react-router';
import Headroom from 'react-headroom';
import path from 'jspath';

import OrgsPage from './OrgsPage.jsx';
import OrgsList from './OrgsList.jsx';
import FilterPage from '../Filters/FilterPage.jsx';
import PlanTray from './PlanTray.jsx';

import { trimOrgs, getVisibleOrgs } from '../../store/utils';
import scrollToElement from '../../../lib/scrollToElement';

function FilterBar(props) {
  return (
    <div className="filter-bar-wrapper">
      <Headroom disableInlineStyles>
        <div className="filter-bar">
          <div className="container">
            <Link className="navigate-button" to="/groups">
              <i className="material-icons">chevron_left</i>
              {'Navigate'}
            </Link>
            <a className="filter-button" onClick={props.onShowFilters}>
              <i className="material-icons">filter_list</i>
              {'Filter'}
            </a>
          </div>
        </div>
      </Headroom>
    </div>
  );
}

class OrgsPageMobile extends OrgsPage {

  constructor(props) {
    super(props);
    this.state = {
      showOrgsList: true
    };
  }

  onShowOrgsList = () => {
    this.setState({ showOrgsList: true });
  }

  onShowFilters = () => {
    this.setState({ showOrgsList: false });
  }

  render() {
    let {
      orgs,
      showOrgsList,
      visibility,
      selectedGroups
    } = this.state;

    const { pageSlug } = this.props;

    pageSlug && ( orgs = trimOrgs(orgs, pageSlug) );
    orgs = getVisibleOrgs( orgs, visibility );

    //needs to take snapshot of selectedFilters after showFilters has been set to true
    return (
      <main className="orgs-page orgs-page-mobile">
        <FilterBar onShowFilters={this.onShowFilters} />
        <OrgsList orgs={orgs} mobile={true} />
        <PlanTray numGroups={selectedGroups.length}/>
        <FilterPage
          showFilters={!showOrgsList}
          startingFilters={visibility}
          handleFilterToggle={this.handleFilterToggle}
          handleClose={this.onShowOrgsList}
        />
      </main>
    );
  }
}

module.exports = OrgsPageMobile;
