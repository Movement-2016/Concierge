import React from 'react';
import { browserHistory } from 'react-router';

import { ContextFromService } from '../ContextMixins';
import FilterGroup from './FilterGroup.jsx';
import ScrollLinks from './ScrollLinks.jsx';
import StatePicker from './StatePicker.jsx';

import scrollToElement from '../../../lib/scrollToElement';

class FilterArea extends ContextFromService(React.Component) {

  get servicePropNames() {
    return ['groupFilters', 'colorSectionsDict', 'statesDict'];
  }

  // helper function to scroll to a state or color section
  scrollToElement = (element) => {
    browserHistory.push('/groups#' + element);
    scrollToElement('#' + element);
  }

  onFilterChange = (category, term, addFilter) => {
    const {
      selectedFilters,
      handleFilterToggle
    } = this.props;

    if ( selectedFilters[category] ) {
      const index = selectedFilters[category].indexOf(term);
      addFilter
        ? (index === -1) && selectedFilters[category].push(term)
        : (index > -1) && selectedFilters[category].splice(index, 1);
    }

    handleFilterToggle( selectedFilters );
  }

  render() {
    const {
      groupFilters: filters,
      colorSectionsDict,
      statesDict,
      loading
    } = this.state;

    if (loading) {
      return <div />;
    }

    const {
      visibleColorSections,
      visibleStates,
      selectedFilters
    } = this.props;

    const showOrgsNav = visibleColorSections.length + visibleStates.length > 0;

    return (
      <div className="filter-area">
        {showOrgsNav && <div className="groups-nav">
          <div className="groups-nav-title">Navigate</div>
          <div className="filter-group">
            <ScrollLinks links={colorSectionsDict} scrollToElement={this.scrollToElement} visible={visibleColorSections} />
            <StatePicker terms={statesDict} scrollToElement={this.scrollToElement} visible={visibleStates} />
          </div>
        </div>}
        <div className="filters">
          <div className="filters-title">Filter</div>
          {Object.keys(filters).map( f => {
            const filterGroupProps = {
                onFilterChange: this.onFilterChange,
                selectedFilters,
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
  selectedFilters:      React.PropTypes.object.isRequired,
  handleFilterToggle:   React.PropTypes.func.isRequired,
};


module.exports = FilterArea;
