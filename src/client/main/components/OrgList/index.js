import React from 'react';

import { 
  ServiceContext
} from '../ContextMixins';

import Section from './Section.jsx';

const getVisibleSections = (allSections,orgs) => {
  const visible = {};
  Object.keys(orgs).forEach( section => visible[section] = allSections[section] );
  return visible;
};

class OrgsList extends ServiceContext(React.Component) {

  componentDidMount() {
    if( location.hash ) {
      const state = location.hash.replace('#','');
      const groups = document.getElementById(state);
      groups && setTimeout( () => groups.scrollIntoView(), 200 );
    }
  }

  render() {
    const {
      groupSections,
    } = this.state.service;

    const {
      orgs
    } = this.props;

    const sections = getVisibleSections(groupSections,orgs);

    return (
        <div className="group-area">
          {Object.keys(sections).map( name => <Section key={name} {...groupSections[name]} groups={orgs[name]} />)}
        </div>
      );
  }
}

module.exports = OrgsList;