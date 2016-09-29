import React from 'react';

import { ServiceContext } from '../ContextMixins';

import Filter      from './Filter.jsx';
import ScrollLinks from './ScrollLinks.jsx';
import StatePicker   from './StatePicker.jsx';

class Filters extends ServiceContext(React.Component) {

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    const { mobile } = this.props;
    /* globals $ */
    !mobile && $('.filter-col .collapsible'). collapsible();
  }

  render() {
    const { 
      filters, 
      groupings:{terms},
      groupSections 
    } = this.state.service;

    const { 
      onShowState,
      onShowSection,
      visibleSections,
      visibleStates,
      mobile
    } = this.props;

    const hasSections = visibleSections.length + visibleStates.length > 0;

    if( mobile ) {
      return <span />; 
    }
    
    return (
        <div className="filter-menu closed">
          <div className="filters-title">Filter By:</div>
          <ul className="filters collapsible" data-collapsible="accordion">
            {Object.keys(filters).map( f => <Filter key={f} {...this.props} {...filters[f]} /> )}
          </ul>
          {hasSections && <div className="groups-nav">
            <div className="groups-nav-title">Go To:</div>
            <ScrollLinks links={groupSections} onShowSection={onShowSection} visible={visibleSections} />
            <StatePicker terms={terms} onShowState={onShowState} visible={visibleStates} />
          </div>}
        </div>
      );
  }
}

Filters.propTypes = {
  selected:       React.PropTypes.object.isRequired,
  onTermsChecked: React.PropTypes.func.isRequired,
  onShowState:    React.PropTypes.func.isRequired,
  onShowSection:  React.PropTypes.func.isRequired
};


module.exports = Filters;