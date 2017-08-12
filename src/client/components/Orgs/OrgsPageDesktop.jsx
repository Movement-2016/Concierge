import React       from 'react';
import { connect } from 'react-redux';
import Sticky      from 'react-stickynode';

import { setVisibility } from '../../../shared/store/actions/groups';
import { equalIfSameRoute } from '../../../shared/store/actions/router';

import OrgsList             from './OrgsList.jsx';
import PlanTray             from './PlanTray.jsx';
import FilterSidebarDesktop from '../Filters/FilterSidebarDesktop.jsx';
import EasyDonateTiles      from '../EasyDonateTiles.jsx';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../../../shared/lib/group-utils';

const PAGE_TITLE = 'Browse Groups';


const _OrgsPageDesktop = ({
      ezDonateTiles,
      visibleOrgs,
      selectedGroups,
      FilterSidebarProps,
      setVisibility
    }) =>
      <main className="orgs-page orgs-page-desktop">
        <div className="container orgs-container">
          <h1 className="page-title">{PAGE_TITLE}</h1>
          <div className="browse-section">
            <div className="filter-sidebar-wrapper">
              <Sticky top={104} bottomBoundary=".orgs-container">
                <FilterSidebarDesktop {...FilterSidebarProps} handleFilterToggle={visibility => setVisibility( visibility )} />
              </Sticky>
            </div>
            <OrgsList visibleOrgs={visibleOrgs} />
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
      </main>;


const mapStateToProps = ({ 
          router: {
            target: {
              model, 
              model: {
                orgs, 
                ezDonateTiles
              }
            }
          },
          groups: { 
            visibility, 
            selected 
          }
        }) => {

  const visibleOrgs = getVisibleOrgs( orgs, visibility );

  return { 
    selectedGroups: selected,
    ezDonateTiles: ezDonateTiles,
    visibleOrgs,
    FilterSidebarProps: {
      model,
      selectedFilters:       visibility,
      visibleColorSections:  Object.keys(visibleOrgs),
      visibleStates:         getVisibleStates(visibleOrgs),
    }
  };
};

const mapDispatchToProps = { setVisibility };

const opts = { areStatesEqual: equalIfSameRoute };

const OrgsPageDesktop = connect( mapStateToProps, mapDispatchToProps, null, opts )(_OrgsPageDesktop);

module.exports = OrgsPageDesktop;
