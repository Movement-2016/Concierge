import React from 'react';
import TagString from 'tag-string';
import { browserHistory } from 'react-router';
import Sticky from 'react-stickynode';

import OrgsPage from './OrgsPage.jsx';
import OrgsList from './OrgsList.jsx';
import FilterArea from '../Filters/FilterArea.jsx';
import PlanTray from '../DonationPlan/PlanTray.jsx';
import EasyDonateTiles from '../EasyDonateTiles.jsx';
import Loading from '../Loading.jsx';

import scrollToElement from '../../../lib/scrollToElement';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../../store/utils';

class OrgsPageDesktop extends OrgsPage {

  // helper function to scroll to a state or color section
  goToElement = (element) => {
    browserHistory.push('/groups#' + element);
    const SCROLL_DELAY = 100;
    scrollToElement('#' + element, SCROLL_DELAY);
  }

  render() {
    let {
      orgs,
      loading,
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

    const filterAreaProps = {
      scrollToElement:       this.goToElement,
      onFilterChange:        this.handleFilterToggle,
      selected:              visibility,
      visibleColorSections:  Object.keys(orgs),
      visibleStates:         getVisibleStates(orgs),
    };

    const title = 'Browse Groups';

    return (
      <main className="browse-page-desktop">
        <div className="container browse-groups-container">
          <h1 className="page-title">{title}</h1>
          <div className="browse-section">
            <div className="filter-area-wrapper">
              <Sticky top={104} bottomBoundary=".browse-groups-container">
                <FilterArea {...filterAreaProps} />
              </Sticky>
            </div>
            <OrgsList orgs={orgs} mobile={false} />
            <div className="plan-sidebar-wrapper">
              <Sticky top={104} bottomBoundary=".browse-groups-container">
                <div className="plan-sidebar">
                  <PlanTray />
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
