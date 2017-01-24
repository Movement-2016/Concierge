import React from 'react';

const StatePicker = ({ visible, terms, onShowState }) => {
  if( !visible.length ) {
    return <span />;
  }
  const map = {};
  terms.forEach( t => map[t.slug] = t );
  return (
      <select className="browser-default" id="jump-state" onChange={e => onShowState(e.target.value)}>
        {visible.map( k => <option key={k} value={map[k].slug}>{map[k].name}</option>)}
      </select>
    );
};

module.exports = StatePicker;