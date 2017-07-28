import React from 'react';
import Router from '../../services/router';

import FilterGroup from './FilterGroup.jsx';
import ScrollLinks from './ScrollLinks.jsx';
import StatePicker from './StatePicker.jsx';

import scrollToElement from '../../lib/scrollToElement';
import { clone } from '../../../shared/lib/general-utils';


function ClearAllButton(props) {
  return <a className={'clearall-button' + (props.visible ? ' visible' : '')} onClick={props.onClearAll}>Clear All</a>
}

class FilterSidebarDesktop extends React.Component {

  // helper function to scroll to a state or color section
  scrollToElement = (element) => {
    Router.service.setBrowserAddressBar('/groups#' + element);
    scrollToElement('#' + element);
  }

  onFilterChange = (category, term, addFilter) => {
    const {
      selectedFilters,
      handleFilterToggle
    } = this.props;

    const newFilters = clone(selectedFilters);

    if ( selectedFilters[category] ) {
      const index = selectedFilters[category].indexOf(term);
      addFilter
        ? (index === -1) && newFilters[category].push(term)
        : (index > -1) && newFilters[category].splice(index, 1);
    }

    handleFilterToggle( newFilters );
  }

  onClearAll = () => {
    const {
      selectedFilters,
      handleFilterToggle
    } = this.props;

    const cleared = {};
    for (var category in selectedFilters) {
      cleared[category] = [];
    }

    handleFilterToggle( cleared );
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.selectedFilters !== nextProps.selectedFilters) {
      return true;
    }
    return false;
  }

  render() {

    const {
      model: {
        groupFilters: filtersDict,
        colorSectionsDict,
        statesDict
      },
      visibleColorSections,
      visibleStates,
      selectedFilters
    } = this.props;

    const numFiltersSelected = Object.keys(selectedFilters).reduce(
      (accum, category) => accum + selectedFilters[category].length, 0
    );
    const showClearAllButton = numFiltersSelected > 0;

    const showOrgsNav = visibleColorSections.length + visibleStates.length > 0;

    return (
      <div className="filter-sidebar">
        {showOrgsNav && <div className="groups-nav">
          <div className="groups-nav-title">Navigate</div>
          <div className="filter-group">
            <ScrollLinks links={colorSectionsDict} scrollToElement={this.scrollToElement} visible={visibleColorSections} />
            <StatePicker terms={statesDict} scrollToElement={this.scrollToElement} visible={visibleStates} />
          </div>
        </div>}
        <div className="filters">
          <ClearAllButton visible={showClearAllButton} onClearAll={this.onClearAll} />
          <div className="filters-title">Filters</div>
          {Object.keys(filtersDict).map( f => {
            const filterGroupProps = {
                onFilterChange: this.onFilterChange,
                selectedFilters,
                name: f,
                label: filtersDict[f].label,
                terms: filtersDict[f].terms
            };
              return <FilterGroup key={f} {...filterGroupProps} />;
          }
          )}
        </div>
      </div>
      );
  }
}

FilterSidebarDesktop.propTypes = {
  model:                React.PropTypes.object.isRequired,
  selectedFilters:      React.PropTypes.object.isRequired,
  handleFilterToggle:   React.PropTypes.func.isRequired,
  visibleColorSections: React.PropTypes.array.isRequired,
  visibleStates:        React.PropTypes.array.isRequired,
};


module.exports = FilterSidebarDesktop;
