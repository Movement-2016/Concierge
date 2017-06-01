import React from 'react';
import TagString from 'tag-string';
import Sticky from 'react-stickynode';

import OrgsPage from './OrgsPage.jsx';
import OrgsList from './OrgsList.jsx';
import PlanTray from './PlanTray.jsx';
import FilterArea from '../Filters/FilterArea.jsx';
import EasyDonateTiles from '../EasyDonateTiles.jsx';
import Loading from '../Loading.jsx';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../../store/utils';

class OrgsPageDesktop extends OrgsPage {

  render() {
    let {
      orgs,
      loading,
      visibility,
      selectedGroups
    } = this.state;

    if( loading ) {
      return <Loading />;
    }

    orgs = getVisibleOrgs( orgs, visibility );

    const filterAreaProps = {
      scrollToElement:       this.goToElement,
      handleFilterToggle:    this.handleFilterToggle,
      selectedFilters:       visibility,
      visibleColorSections:  Object.keys(orgs),
      visibleStates:         getVisibleStates(orgs),
    };

    const title = 'Browse Groups';

    return (
      <main className="orgs-page orgs-page-desktop">
        <div className="container orgs-container">
          <h1 className="page-title">{title}</h1>
          <div className="browse-section">
            <div className="filter-area-wrapper">
              <Sticky top={104} bottomBoundary=".orgs-container">
                <FilterArea {...filterAreaProps} />
              </Sticky>
            </div>
            <OrgsList orgs={orgs} mobile={false} />
            <div className="plan-sidebar-wrapper">
              <Sticky top={104} bottomBoundary=".orgs-container">
                <div className="plan-sidebar">
                  <PlanTray numGroups={selectedGroups.length}/>
                  <EasyDonateTiles />
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

module.exports = OrgsPageDesktop;
