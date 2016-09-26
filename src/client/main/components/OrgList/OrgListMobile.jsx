import React from 'react';

import { 
  Link,
  browserHistory
} from 'react-router';

import OrgsListDesktop from './OrgListDesktop.jsx';

import StateList from '../Filters/Groupings.jsx';

class OrgsListMobile extends OrgsListDesktop {

  constructor() {
    super(...arguments);
    this.onShowState = this.onShowState.bind(this);
  }

  componentDidMount() {
    /* globals $ */
    $('.mobile-group.collapsible'). collapsible();
  }

  onShowState(state) {
    browserHistory.push( '/state/' + state );
  }

  render() {

    const { colors, orgs, colorGroups } = this.getVisibleColorGroups();
  
    const allStates = this.context.store.getState().service.groupings.terms;

    return (
      <div>
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
        <StateList terms={allStates} visible={colorGroups} onShowGroup={this.onShowState} />
      </div>
    );
  
  }
}

module.exports = OrgsListMobile;