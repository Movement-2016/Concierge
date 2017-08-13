import React from 'react';
import { connect } from 'react-redux';

import FilterGroup from './FilterGroup.jsx';
import ScrollLinks from './ScrollLinks.jsx';
import StatePicker from './StatePicker.jsx';

import { setVisibility } from '../../../shared/store/actions/groups';

import { clone } from '../../../shared/lib/general-utils';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../../../shared/lib/group-utils';



const ClearAllButton = ({ visible, onClearAll }) => <a className={'clearall-button' + (visible ? ' visible' : '')} onClick={onClearAll}>{'Clear All'}</a>;


class _FilterSidebarDesktop extends React.Component {

  onFilterChange = (category, term, addFilter) => {
    const {
      selectedFilters,
      setVisibility
    } = this.props;

    const newFilters = clone(selectedFilters);

    if ( selectedFilters[category] ) {
      const index = selectedFilters[category].indexOf(term);
      addFilter
        ? (index === -1) && newFilters[category].push(term)
        : (index > -1) && newFilters[category].splice(index, 1);
    }

    setVisibility( newFilters );
  }

  onClearAll = () => {
    const {
      selectedFilters,
      setVisibility
    } = this.props;

    const cleared = {};
    for (var category in selectedFilters) {
      cleared[category] = [];
    }

    setVisibility( cleared );
  }

  render() {

    const {
      filtersDict,
      colorSectionsDict,
      statesDict,
      visibleColorSections,
      visibleStates,
      selectedFilters,
      showClearAllButton,
      showOrgsNav
    } = this.props;

    const fprops = f => ({ 
            onFilterChange: this.onFilterChange, 
            selectedFilters,
            name: f,
            label: filtersDict[f].label,
            terms: filtersDict[f].terms            
          });

    return (
      <div className="filter-sidebar">
        {showOrgsNav && <div className="groups-nav">
          <div className="groups-nav-title">{'Navigate'}</div>
          <div className="filter-group">
            <ScrollLinks links={colorSectionsDict} visible={visibleColorSections} />
            <StatePicker terms={statesDict}        visible={visibleStates} />
          </div>
        </div>}
        <div className="filters">
          <ClearAllButton visible={showClearAllButton} onClearAll={this.onClearAll} />
          <div className="filters-title">{'Filters'}</div>
          {Object.keys(filtersDict).map( f => <FilterGroup key={f} {...fprops(f)} /> )}
        </div>
      </div>
      );
  }
}

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

const mapDispatchToProps = { setVisibility };

const FilterSidebarDesktop = connect( mapStateToProps, mapDispatchToProps )(_FilterSidebarDesktop);

module.exports = FilterSidebarDesktop;
