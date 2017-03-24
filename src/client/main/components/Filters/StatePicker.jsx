import React from 'react';

const StatePicker = ({ visible, terms, onShowElement }) => {
  if( !visible.length ) {
    return <span />;
  }
  const map = {};
  terms.forEach( t => map[t.slug] = t );
  return (
      <select className="browser-default" id="jump-state" onChange={e => onShowElement(e.target.value)}>
        <option value="" selected>Select State...</option>
        {visible.map( k => <option key={k} value={map[k].slug}>{map[k].name}</option>)}
      </select>
    );
};

module.exports = StatePicker;
