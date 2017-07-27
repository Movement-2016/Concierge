import React from 'react';
import { connect } from 'react-redux';
import { setVisibility } from '../../../shared/store/actions/groups';

import Link from '../../services/LinkToRoute';
import Headroom from 'react-headroom';

import OrgsPage from './OrgsPage.jsx';
import OrgsList from './OrgsList.jsx';
import FilterPageMobile from '../Filters/FilterPageMobile.jsx';
import PlanTray from './PlanTray.jsx';

import { trimOrgs, getVisibleOrgs } from '../../../shared/lib/group-utils';

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

class _OrgsPageMobile extends OrgsPage {

  constructor() {
    super(...arguments);
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

    const {
      showOrgsList
    } = this.state;

    const {
      model,
      store,
      pageSlug,
      model: {
        orgs,
        groupFilters
      },
      visibility,
      selectedGroups
    } = this.props;

    const visibleOrgs = getVisibleOrgs( trimOrgs(orgs, pageSlug), visibility );

    return (
      <main className="orgs-page orgs-page-mobile">
        <FilterBar onShowFilters={this.onShowFilters} />
        <OrgsList store={store} model={model} visibleOrgs={visibleOrgs} mobile />
        <PlanTray numGroups={selectedGroups.length}/>
        <FilterPageMobile
          showFilters={!showOrgsList}
          filtersDict={groupFilters}
          startingFilters={visibility}
          handleFilterToggle={this.handleFilterToggle}
          handleClose={this.onShowOrgsList}
        />
      </main>
    );
  }
}

const mapStateToProps = s => ({ visibility: s.groups.visibility, selectedGroups: s.groups.selected });
const mapDispatchToProps = { setVisibility };

const OrgsPageMobile = connect( mapStateToProps, mapDispatchToProps )(_OrgsPageMobile);

module.exports = OrgsPageMobile;
