import React from 'react';

import Org from './Org.jsx';

function State(props) {

  const {
    slug: name,
    name: label,
    items,
    colorGroup,
    selected: selectedOrgs,
    store,
    filters,
    mobile
  } = props;

  return (
    <div className="state" id={name}>
      <div className={`state-title ${colorGroup}`}>
        <h4>
          <span className="state-name">{label}</span>
          <i className="material-icons color-icon">turned_in</i>
        </h4>
      </div>
      {items.map( o => {
        const orgProps = {
          selected: selectedOrgs.includes(o.ID),
          store,
          filters,
          mobile,
          ...o
        };
        return <Org key={o.ID} {...orgProps} />;
      })}
    </div>
  );
}

module.exports = State;
