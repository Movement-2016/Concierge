import React from 'react';
import { connect } from 'react-redux';

import { setVisibility } from '../../../shared/store/actions/groups';

import Sticky from 'react-stickynode';

import OrgsPage from './OrgsPage.jsx';
import OrgsList from './OrgsList.jsx';
import PlanTray from './PlanTray.jsx';
import FilterSidebarDesktop from '../Filters/FilterSidebarDesktop.jsx';
import EasyDonateTiles from '../EasyDonateTiles.jsx';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../../../shared/lib/group-utils';

class _OrgsPageDesktop extends OrgsPage {

  render() {

    const {
      model,
      store,
      model: {
        orgs,
        ezDonateTiles
      },
      visibility,
      selectedGroups
    } = this.props;

    const visibleOrgs = getVisibleOrgs( orgs, visibility );

    const FilterSidebarProps = {
      model,
      scrollToElement:       this.goToElement,
      handleFilterToggle:    this.handleFilterToggle,
      selectedFilters:       visibility,
      visibleColorSections:  Object.keys(visibleOrgs),
      visibleStates:         getVisibleStates(visibleOrgs),
    };

    const title = 'Browse Groups';

    return (
      <main className="orgs-page orgs-page-desktop">
        <div className="container orgs-container">
          <h1 className="page-title">{title}</h1>
          <div className="browse-section">
            <div className="filter-sidebar-wrapper">
              <Sticky top={104} bottomBoundary=".orgs-container">
                <FilterSidebarDesktop {...FilterSidebarProps} />
              </Sticky>
            </div>
            <OrgsList store={store} model={model} visibleOrgs={visibleOrgs} />
            <div className="plan-sidebar-wrapper">
              <Sticky top={104} bottomBoundary=".orgs-container">
                <div className="plan-sidebar">
                  <PlanTray numGroups={selectedGroups.length}/>
                  <EasyDonateTiles tiles={ezDonateTiles} />
                </div>
              </Sticky>
            </div>
          </div>
        </div>
        <div className="bottom-spacer" />
      </main>
    );
  }
}

const mapStateToProps = s => ({ visibility: s.groups.visibility, selectedGroups: s.groups.selected });
const mapDispatchToProps = { setVisibility };

const OrgsPageDesktop = connect( mapStateToProps, mapDispatchToProps )(_OrgsPageDesktop);

module.exports = OrgsPageDesktop;
