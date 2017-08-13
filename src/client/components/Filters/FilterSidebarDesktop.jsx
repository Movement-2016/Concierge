import React from 'react';
import { connect } from 'react-redux';

import FilterGroup from './FilterGroup.jsx';
import ScrollLinks from './ScrollLinks.jsx';
import StatePicker from './StatePicker.jsx';

import { 
  filterRequest, 
  filterClear
} from '../../../shared/store/actions/groups';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../../../shared/lib/group-utils';

const ClearAllButton = ({ visible, onClearAll }) => <a className={'clearall-button' + (visible ? ' visible' : '')} onClick={onClearAll}>{'Clear All'}</a>;

const _FilterSidebarDesktop = ({
      filtersDict,
      colorSectionsDict,
      statesDict,
      visibleColorSections,
      visibleStates,
      selectedFilters,
      showClearAllButton,
      showOrgsNav,

      filterRequest:onFilterChange,
      filterClear
    }) => 
      <div className="filter-sidebar">
        {showOrgsNav && <div className="groups-nav">
          <div className="groups-nav-title">{'Navigate'}</div>
          <div className="filter-group">
            <ScrollLinks links={colorSectionsDict} visible={visibleColorSections} />
            <StatePicker terms={statesDict}        visible={visibleStates} />
          </div>
        </div>}
        <div className="filters">
          <ClearAllButton visible={showClearAllButton} onClearAll={filterClear} />
          <div className="filters-title">{'Filters'}</div>
          {Object.keys(filtersDict).map( (name,key,arr,{ terms, label } = filtersDict[name]) => 
            <FilterGroup {...{ key, onFilterChange, selectedFilters, name, label, terms }} /> ) }
        </div>
      </div>
;

const mapStateToProps = ({
  router: {
    target: {
      model: {
        groupFilters: filtersDict,
        colorSectionsDict,
        statesDict,
        orgs
      },      
    }
  },
  groups: { 
    visibility, 
  }
}) => {

  const visibleOrgs = getVisibleOrgs( orgs, visibility );
  const numFiltersSelected = Object.keys(visibility).reduce((accum, category) => accum + visibility[category].length, 0);
  const visibleColorSections =  Object.keys(visibleOrgs);
  const visibleStates = getVisibleStates(visibleOrgs);

  return {
    filtersDict,
    colorSectionsDict,
    statesDict,
    selectedFilters: visibility,
    showClearAllButton: numFiltersSelected > 0,
    showOrgsNav: visibleColorSections.length + visibleStates.length > 0,
    visibleColorSections,
    visibleStates
  };
};

const mapDispatchToProps = { filterClear, filterRequest };

const FilterSidebarDesktop = connect( mapStateToProps, mapDispatchToProps )(_FilterSidebarDesktop);

module.exports = FilterSidebarDesktop;
