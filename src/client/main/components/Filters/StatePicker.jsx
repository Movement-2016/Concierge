import React from 'react';

const StatePicker = ({ visible, terms, onShowState }) => {
  if( !visible.length ) {
    return <span />;
  }
  return (
      <select className="browser-default" id="jump-state" onChange={e => onShowState(e.target.value)}>
        {visible.map( k => <option key={k} value={terms[k].name}>{terms[k].label}</option>)}
      </select>
    );
};

module.exports = StatePicker;