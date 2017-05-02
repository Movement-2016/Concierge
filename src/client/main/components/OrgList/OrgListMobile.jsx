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
      statesDict: states
    } = storeState.service;

    return (
      <div className="mobile-group-area">
        <ul className="mobile-group state-list">
          {Object.keys(states).map( slug =>
            <li key={slug} >
              <Link to={'/state/' + slug}>
                {states[slug].name} <span className="count">{ `(${states[slug].count}) group${states[slug].count > 1 ? 's' : ''}`}</span>
                <i className="right material-icons">play_arrow</i>
                <div  style={{clear:'both'}} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    );

  }
}

module.exports = OrgsListMobile;
