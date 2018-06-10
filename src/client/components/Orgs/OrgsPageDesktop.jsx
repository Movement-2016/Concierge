import React       from 'react';
import { connect } from 'react-redux';
import Sticky      from 'react-stickynode';

import OrgsList             from './OrgsList.jsx';
import PlanTray             from './PlanTray.jsx';
import FilterSidebarDesktop from '../Filters/FilterSidebarDesktop.jsx';
import { ENABLE_PLANS }     from '../../../config';

const PAGE_TITLE = 'Browse Groups';

const _OrgsPageDesktop = ({
      numSelected
    }) =>
      <main className="orgs-page orgs-page-desktop">
        <div className="container orgs-container">
          <h1 className="page-title">{PAGE_TITLE}</h1>
          <div className="browse-section">
            <div className="filter-sidebar-wrapper">
              <Sticky top={104} bottomBoundary=".orgs-container">
                <FilterSidebarDesktop />
              </Sticky>
            </div>
            <OrgsList />
            <div className="plan-sidebar-wrapper">
              <Sticky top={104} bottomBoundary=".orgs-container">
                <div className="plan-sidebar">
                  {ENABLE_PLANS && <PlanTray numGroups={numSelected}/>}
                </div>
              </Sticky>
            </div>
          </div>
        </div>
        <div className="bottom-spacer" />
      </main>;

const mapStateToProps = ({
        groups: {
          selected: {
            length: numSelected
          }
        }
      }) => ({
          numSelected,
        });

const OrgsPageDesktop = connect( mapStateToProps )(_OrgsPageDesktop);

module.exports = OrgsPageDesktop;
