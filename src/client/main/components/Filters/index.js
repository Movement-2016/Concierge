import React from 'react';

import { ServiceContext } from '../ContextMixins';

import Filter      from './Filter.jsx';
import ScrollLinks from './ScrollLinks.jsx';
import Groupings   from './Groupings.jsx';

class Filters extends ServiceContext(React.Component) {

  constructor() {
    super(...arguments);
  }

  render() {
    const { 
      filters, 
      groupings:{terms},
      groupSections 
    } = this.state.service;

    const { 
      onShowGroup,
      onShowSection,
      visibleSections,
      visibleGroups
    } = this.props;

    const hasSections = visibleSections.length + visibleGroups.length > 0;

    return (
        <div className="group-selector-area">
          <h4>Filter by</h4>
          {Object.keys(filters).map( f => <Filter key={f} {...this.props} {...filters[f]} /> )}
          {hasSections && <h4>Go to...</h4>}
          <ScrollLinks links={groupSections} onShowSection={onShowSection} visible={visibleSections} />
          <Groupings terms={terms} onShowGroup={onShowGroup} visible={visibleGroups} />
        </div>
      );
  }
}

Filters.propTypes = {
  selected:       React.PropTypes.object.isRequired,
  onTermsChecked: React.PropTypes.func.isRequired,
  onShowGroup:    React.PropTypes.func.isRequired,
  onShowSection:  React.PropTypes.func.isRequired
};


module.exports = Filters;