import React from 'react';

import State from './State.jsx';

const ColorGroup = ({
    color: {
      name,
      slug,
      id
    },
    states,
    groups,
    selected,
    mobile
  }) =>
    <div className="color-group scrollspy" id={slug}>
      <div className={`color-group-title ${slug}-title`}>{name}</div>
      {states.filter( state => state.parent === id ).map( state => <State key={state.id} {...{mobile,state,groups,selected}} />)}
    </div>;

module.exports = ColorGroup;
