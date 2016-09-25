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

  render() {

    const {
      groupSections:colorGroups,
    } = this.state.service;

    const {
      orgs
    } = this.props;

    const sections = getVisibleColorGroups(colorGroups,orgs);
    const colors = Object.keys(sections);
  
    return (
        <div className="group-area">
          {colors.map( color => <ColorGroup key={color} {...colorGroups[color]} states={orgs[color]} />)}
        </div>
      );
  }
}

class OrgsListMobile extends OrgsListDesktop {

  componentDidMount() {
    /* globals $ */
    $('.mobile-group-colorGroup.collapsible'). collapsible();
  }

  render() {

    const {
      groupSections:colorGroups,
    } = this.state.service;

    const {
      orgs
    } = this.props;

    const colors = Object.keys(colorGroups);
  
    const allStates = this.context.store.getState().service.groupings.terms;

    return (
      <ul className="mobile-group-colorGroup collapsible">
        {colors.map( color => {
          return (
            <li key={color} >
              <div className="collapsible-header"><span className="toggle"/>{colorGroups[color].label}</div>
              <ul className="collapsible-body state-list" style={{display:'none'}}>
                {Object.keys(orgs[color]).map( state => 
                  <li key={state}>
                    <Link to={'/state/' + state}>
                      {allStates[state].label}
                      <i className="right material-icons">play_arrow</i>
                      <div  style={{clear:'both'}} />
                    </Link> 
                  </li>)}
              </ul>
            </li> );
          }
        )}
      </ul>
    );
  
  }
}

class OrgsList extends React.Component {
  render() {
    const { mobile } = this.props;
    return mobile 
            ? <OrgsListMobile {...this.props} />
            : <OrgsListDesktop {...this.props} />;
  }
}
module.exports = OrgsList;