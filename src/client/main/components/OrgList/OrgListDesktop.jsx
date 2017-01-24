import React from 'react';

import { 
  ServiceContext
} from '../ContextMixins';

import ColorGroup from './ColorGroup.jsx';

import scrollToElement from '../../../lib/scrollToElement';

const getVisibleColorGroups = (allColorGroups,orgs) => {
  const visible = {};
  Object.keys(orgs).forEach( colorGroup => visible[colorGroup] = allColorGroups[colorGroup] );
  return visible;
};

class OrgsListDesktop extends ServiceContext(React.Component) {

  componentDidMount() {
    if( location.hash ) {
      const state = location.hash.replace('#','');
      const groups = document.getElementById(state);
      groups && setTimeout( () => scrollToElement('#' + state), 200 );
    }
  }

  // for debugging breakpoint
  stateFromStore(storeState) {
    const { service } = storeState;
    this.setState({ service });
  }

  getVisibleColorGroups() {

    const {
      groupSections,
      sectionOrder: colorOrder
    } = this.state.service;

    const {
      orgs
    } = this.props;

    const order = {};
    colorOrder.forEach( (c,i) => order[c] = i );

    const colorGroups = {};
    groupSections.forEach( color => colorGroups[color.slug] = color );
    
    const sections = getVisibleColorGroups(colorGroups,orgs);
    const colors = Object.keys(sections).sort( (a,b) => order[a] > order[b] );

    return { sections, colors, orgs, colorGroups };
  }

  render() {

    const { colors, orgs, colorGroups } = this.getVisibleColorGroups();

    return (
        <div className="group-area">
          {colors.map( color => <ColorGroup key={color} {...colorGroups[color]} states={orgs[color]} />)}
        </div>
      );
  }
}

module.exports = OrgsListDesktop;