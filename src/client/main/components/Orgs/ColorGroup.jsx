import React from 'react';

import State from './State.jsx';


function ColorGroup(props) {

  const {
    slug:       name,
    name:       label,
    statesDict,
    states,
    selected,
    store,
    filters,
    mobile
  } = props;

  return (
    <div className="color-group scrollspy" id={name}>
      <div className={`color-group-title ${name}-title`}>{label}</div>
      {Object.keys(states).map( s => {
        const stateProps = {
          items: states[s],
          colorGroup: name,
          selected,
          store,
          filters,
          mobile,
          ...statesDict[s]
        };
        return <State key={s} {...stateProps} />;
      })}
    </div>
  );
}

module.exports = ColorGroup;
