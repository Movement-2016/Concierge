import React from 'react';
import Loading from '../Loading.jsx';

import { ContextFromService } from '../ContextMixins';

import ColorGroup from './ColorGroup.jsx';

import scrollToElement from '../../../lib/scrollToElement';

const getVisibleColorSections = (allColorSections,orgs) => {
  const visible = {};
  Object.keys(orgs || {}).forEach( colorGroup => visible[colorGroup] = allColorSections[colorGroup] );
  return visible;
};

class OrgsList extends ContextFromService(React.Component) {

  get servicePropNames() {
    return [ 'groups'];
  }

  componentDidMount() {
    // Scrolls to correct state if hash is found in url
    if ( location.hash ) {
      const elementName = location.hash.replace('#','');
      const element = document.getElementById(elementName);
      element && scrollToElement('#' + elementName);
    }
  }

  getVisibleColorSections() {

    const {
      groups
    } = this.state;

    const {
      groupFilters: filters,
      statesDict,
      colorSections,
      colorOrder,      
    } = this.service;

    const { 
      orgs 
    } = this.props;

    const order = {};
    colorOrder.forEach( (c,i) => order[c] = i );

    const colorGroups = {};
    colorSections.forEach( color => colorGroups[color.slug] = color );

    const sections = getVisibleColorSections(colorGroups,orgs);

    const colors = Object.keys(sections).sort( (a,b) => order[a] > order[b] );

    return { groups, filters, statesDict, sections, colors, orgs, colorGroups };
  }

  render() {

    if (this.state.loading) {
      return <Loading />;
    }

    const {
      groups: {
        selected
      },
      colors,
      orgs,
      colorGroups,
      filters,
      statesDict
    } = this.getVisibleColorSections();

    return (
      <div className="group-area">
        {colors.map( color => <ColorGroup
                                key={color}
                                {...colorGroups[color]}
                                selected={selected}
                                states={orgs[color]}
                                filters={filters}
                                store={this.context.store}
                                statesDict={statesDict}
                                mobile={this.props.mobile}
                              />
        )}
      </div>
    );
  }
}

module.exports = OrgsList;
