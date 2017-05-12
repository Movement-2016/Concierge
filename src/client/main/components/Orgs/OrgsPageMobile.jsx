import React from 'react';
import { Link, browserHistory } from 'react-router';

import OrgsPage from './OrgsPage.jsx';
import OrgsList from './OrgsList.jsx';
import FilterPage from '../Filters/FilterPage.jsx';

import PlanTray from '../DonationPlan/PlanTray.jsx';
import Loading from '../Loading.jsx';

import { getVisibleOrgs } from '../../store/utils';

import scrollToElement from '../../../lib/scrollToElement';

function FilterBar(props) {
  return (
    <div className="filter-bar">
      <div className="container">
        <Link className="navigate-button" to="/groups/mobile">
          <i className="material-icons">chevron_left</i>
          {'Navigate'}
        </Link>
        <a className="filter-button" onClick={props.onShowFilters}>
          <i className="material-icons">filter_list</i>
          {'Filter'}
        </a>
      </div>
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
      loading,
      showOrgsList
    } = this.state;


    const {
      groups: {
        visibility
      }
    } = this.storeState;


    if( loading ) {
      return <Loading />;
    }

    orgs = getVisibleOrgs( orgs, visibility );

    const title = 'Browse Groups';

    if (showOrgsList) {
      return (
        <main className="orgs-page">
          <FilterBar onShowFilters={this.onShowFilters} />
          <OrgsList orgs={orgs} mobile={true} />
          <PlanTray mobile={true} />
        </main>
      );
    }

    return (
      <FilterPage
        selected={visibility}
        handleFilterToggle={this.handleFilterToggle}
        onClose={this.onShowOrgsList}
      />
    );
  }
}

module.exports = OrgsPageMobile;
