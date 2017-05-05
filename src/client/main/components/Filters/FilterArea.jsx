import React from 'react';

import { ServiceContext } from '../ContextMixins';

import FilterGroup from './FilterGroup.jsx';
import ScrollLinks from './ScrollLinks.jsx';
import StatePicker from './StatePicker.jsx';

class FilterArea extends ServiceContext(React.Component) {

  render() {
    const {
      groupFilters: filters,
      statesDict,
      colorSectionsDict
    } = this.service;

    const {
      scrollToElement,
      visibleColorSections,
      visibleStates,
      onFilterChange,
      selected
    } = this.props;

    const showOrgsNav = visibleColorSections.length + visibleStates.length > 0;

    return (
      <div className="filter-area">
        {showOrgsNav && <div className="groups-nav">
          <div className="groups-nav-title">Navigate</div>
          <div className="filter-group">
            <ScrollLinks links={colorSectionsDict} scrollToElement={scrollToElement} visible={visibleColorSections} />
            <StatePicker terms={statesDict} scrollToElement={scrollToElement} visible={visibleStates} />
          </div>
        </div>}
        <div className="filters">
          <div className="filters-title">Filter</div>
          {Object.keys(filters).map( f => {
            const filterGroupProps = {
                onFilterChange,
                selected,
                name: f,
                label: filters[f].label,
                terms: filters[f].terms
            };
              return <FilterGroup key={f} {...filterGroupProps} />
          }
          )}
        </div>
      </div>
      );
  }
}

FilterArea.propTypes = {
  selected:         React.PropTypes.object.isRequired,
  onFilterChange:   React.PropTypes.func.isRequired,
  scrollToElement:  React.PropTypes.func.isRequired,
};


module.exports = FilterArea;
