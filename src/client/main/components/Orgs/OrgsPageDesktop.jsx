import React from 'react';

import Sticky from 'react-stickynode';

import OrgsPage from './OrgsPage.jsx';
import OrgsList from './OrgsList.jsx';
import PlanTray from './PlanTray.jsx';
import FilterArea from '../Filters/FilterArea.jsx';
import EasyDonateTiles from '../EasyDonateTiles.jsx';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../../store/utils';

class OrgsPageDesktop extends OrgsPage {

  render() {
    const {
      visibility,
      selectedGroups
    } = this.state;

    const props = this.props;

    const {
      model,
      store,
      model: {
        orgs,
        ezDonateTiles
      }
    } = props;

    const visibleOrgs = getVisibleOrgs( orgs, visibility );

    const filterAreaProps = {
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
            <div className="filter-area-wrapper">
              <Sticky top={104} bottomBoundary=".orgs-container">
                <FilterArea {...filterAreaProps} />
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

module.exports = OrgsPageDesktop;
