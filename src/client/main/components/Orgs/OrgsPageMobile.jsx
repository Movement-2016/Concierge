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
      <Link className="navigate-button" to="/groups/mobile">
        <i className="material-icons">chevron_left</i>
        {'Navigate'}
      </Link>
      <a className="filter-button" onClick={props.onShowFilters}>
        <i className="material-icons">filter_list</i>
        {'Filter'}
      </a>
    </div>
  );
}


class OrgsPageMobile extends OrgsPage {

  constructor(props) {
    super(props);
    this.state = {
      showOrgs: true
    };
  }

  showOrgs = () => {
    this.setState({ showOrgs: true });
  }

  showFilters = () => {
    this.setState({ showOrgs: false });
  }

  render() {
    let {
      orgs,
      loading,
      showOrgs
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

    if (showOrgs) {
      return (
        <main className="orgs-page">
          <FilterBar onShowFilters={this.showFilters} />
          <OrgsList orgs={orgs} mobile={true} />
          <PlanTray mobile={true} />
        </main>
      );
    }

    return (
      <FilterPage
        selected={visibility}
        handleFilterToggle={this.handleFilterToggle}
        onClose={this.showOrgs}
      />
    );
  }
}

module.exports = OrgsPageMobile;
