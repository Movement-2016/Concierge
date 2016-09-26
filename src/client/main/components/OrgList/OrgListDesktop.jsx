import React from 'react';
import { Link } from 'react-router';

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

  getVisibleColorGroups() {

    const {
      groupSections:colorGroups,
    } = this.state.service;

    const {
      orgs
    } = this.props;

    const sections = getVisibleColorGroups(colorGroups,orgs);
    const colors = Object.keys(sections);

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