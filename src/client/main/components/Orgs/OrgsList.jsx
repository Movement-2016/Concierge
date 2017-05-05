import React from 'react';

import {
  ServiceContext
} from '../ContextMixins';

import ColorGroup from './ColorGroup.jsx';

import scrollToElement from '../../../lib/scrollToElement';

const getVisibleColorSections = (allColorSections,orgs) => {
  const visible = {};
  Object.keys(orgs || {}).forEach( colorGroup => visible[colorGroup] = allColorSections[colorGroup] );
  return visible;
};

class OrgsList extends ServiceContext(React.Component) {

  componentDidMount() {
    if( location.hash ) {
      const state = location.hash.replace('#','');
      const groups = document.getElementById(state);
      groups && setTimeout( () => scrollToElement('#' + state), 200 );
    }
  }

  // shouldComponentUpdate() {
  //   return this.state.selected !== this._isSelected();
  // }

  stateFromStore(storeState) {
    const { service, groups } = storeState;
    this.setState({ service, groups });
  }

  getVisibleColorSections() {

    const {
      groups,
      service: {
        colorSections,
        groupFilters: filters,
        colorOrder,
        statesDict
      }
    } = this.state;

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

    const vcg = this.getVisibleColorSections();

    const {
      colors,
      orgs,
      colorGroups,
      groups: {
        selected
      },
      filters,
      statesDict
    } = vcg;

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
