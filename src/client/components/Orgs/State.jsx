import React from 'react';

import Org from './Org.jsx';

const State = ({
    slug: name,
    name: label,
    items,
    colorGroup,
    selected: selectedOrgs,
    filters,
    mobile,
    toggleItem
  }) => 
    <div className="state" id={name}>
      <div className={`state-title ${colorGroup}`}>
        <h4>
          <span className="state-name">{label}</span>
          <i className="material-icons color-icon">{'turned_in'}</i>
        </h4>
      </div>
      {items.map( o => {
        const orgProps = {
          selected: selectedOrgs.includes(o.ID),
          filters,
          mobile,
          toggleItem,
          ...o
        };
        return <Org key={o.ID} {...orgProps} />;
      })}
    </div>
;

module.exports = State;
