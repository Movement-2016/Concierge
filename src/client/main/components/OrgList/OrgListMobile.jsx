import React from 'react';

import { 
  Link,
} from 'react-router';

class OrgsListMobile extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  render() {

    const storeState = this.context.store.getState();
    const { 
      groupings:{ 
        terms:states 
      },
    } = storeState.service;

    return (
      <ul className="mobile-group state-list">
        {Object.keys(states).map( name => 
          <li key={name} >
            <Link to={'/state/' + name}>
              {states[name].label} <span className="count">{ `(${states[name].count}) group${states[name].count > 1 ? 's' : ''}`}</span>
              <i className="right material-icons">play_arrow</i>
              <div  style={{clear:'both'}} />
            </Link> 
          </li>
        )}
      </ul>
    );
  
  }
}

module.exports = OrgsListMobile;