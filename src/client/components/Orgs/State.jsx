import React from 'react';

import Org from './Org.jsx';

const State = ({
    state: {
      slug,
      name,
      id,
      parent: {
        slug:colorSlug
      }
    },
    groups,
    selected,
    mobile,
    toggleItem
  }) => 
    <div className="state" id={slug}>
      <div className={`state-title ${colorSlug}`}>
        <h4>
          <span className="state-name">{name}</span>
          <i className="material-icons color-icon">{'turned_in'}</i>
        </h4>
      </div>
      {groups.filter( grp => grp.state.id === id ).map( org => <Org key={org.id} {...{org,toggleItem,selected:selected.includes(org.id),mobile}} />  )}
    </div>
;

module.exports = State;
