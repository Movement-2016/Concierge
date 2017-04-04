import React from 'react';

import { ServiceContext } from '../ContextMixins';

import Filter      from './Filter.jsx';
import ScrollLinks from './ScrollLinks.jsx';
import StatePicker   from './StatePicker.jsx';

class Filters extends ServiceContext(React.Component) {

  render() {
    const {
      groupFilters:filters,
      stateList:terms,
      colorSectionsDict
    } = this.service;

    const {
      onShowElement,
      visibleSections,
      visibleStates,
      mobile
    } = this.props;

    const hasSections = visibleSections.length + visibleStates.length > 0;

    if( mobile || global.IS_SERVER_REQUEST ) {
      return <span />;
    }

    return (
      <div className="filter-area">
        {hasSections && <div className="groups-nav">
          <div className="groups-nav-title">Navigate</div>
          <div className="filter-group">
            <ScrollLinks links={colorSectionsDict} onShowElement={onShowElement} visible={visibleSections} />
            <StatePicker terms={terms} onShowElement={onShowElement} visible={visibleStates} />
          </div>
        </div>}
        <div className="filters">
          <div className="filters-title">Filter</div>
          {Object.keys(filters).map( f => <Filter key={f} {...this.props} {...filters[f]} /> )}
        </div>
      </div>
      );
  }
}

Filters.propTypes = {
  selected:       React.PropTypes.object.isRequired,
  onTermsChecked: React.PropTypes.func.isRequired,
  onShowElement:  React.PropTypes.func.isRequired,
};


module.exports = Filters;
