import React       from 'react';
import { connect } from 'react-redux';
import Sticky      from 'react-stickynode';

import OrgsList             from './OrgsList.jsx';
import PlanTray             from './PlanTray.jsx';
import FilterSidebarDesktop from '../Filters/FilterSidebarDesktop.jsx';
import EasyDonateTiles      from '../EasyDonateTiles.jsx';

const PAGE_TITLE = 'Browse Groups';

const _OrgsPageDesktop = ({
      ezDonateTiles,
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
                  <PlanTray numGroups={numSelected}/>
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
            model: {
              db
            }
          }
        },
        groups: { 
          selected: {
            length: numSelected
          }
        }
      }) => ({ 
          numSelected,
          ezDonateTiles: db.donateTiles
        });

const OrgsPageDesktop = connect( mapStateToProps )(_OrgsPageDesktop);

module.exports = OrgsPageDesktop;
