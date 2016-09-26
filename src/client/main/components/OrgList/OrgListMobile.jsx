import React from 'react';

import { 
  Link,
} from 'react-router';

import OrgsListDesktop from './OrgListDesktop.jsx';

class OrgsListMobile extends OrgsListDesktop {

  componentDidMount() {
    /* globals $ */
    $('.mobile-group.collapsible'). collapsible();
  }

  render() {

    const { colors, orgs, colorGroups } = this.getVisibleColorGroups();
  
    const allStates = this.context.store.getState().service.groupings.terms;

    return (
      <ul className="mobile-group collapsible">
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

module.exports = OrgsListMobile;