import React from 'react';
import { connect } from 'react-redux';

import ClearAllButton from './ClearAllButton.jsx';
import FilterGroup from './FilterGroup.jsx';
import ScrollLinks from './ScrollLinks.jsx';
import StatePicker from './StatePicker.jsx';

const _FilterSidebarDesktop = ({
      filterCategories,
      showOrgsNav,
    }) => 
      <div className="filter-sidebar">
        {showOrgsNav && <div className="groups-nav">
          <div className="groups-nav-title">{'Navigate'}</div>
          <div className="filter-group">
            <ScrollLinks />
            <StatePicker />
          </div>
        </div>}
        <div className="filters">
          <ClearAllButton />
          <div className="filters-title">{'Filters'}</div>
          {filterCategories.map( ({id,name,slug}) => <FilterGroup key={id} {...{slug,id,name}}  /> )}
        </div>
      </div>
;

const mapStateToProps = ({
  router: {
    target: {
      model: {
        db
      }
    }
  },
  groups: { 
    filters, 
  }
}) => ({
    filterCategories: db.tagCategories,
    showOrgsNav: db.visibleGroups(filters).length > 0
  });

const opts = { areStatesEqual: (s1,s2) => s1.groups.filters === s2.groups.filters };

const FilterSidebarDesktop = connect( mapStateToProps, null, null, opts )(_FilterSidebarDesktop);

module.exports = FilterSidebarDesktop;
