import React from 'react';

const Groupings = ({ visible, terms, onShowGroup }) => {
  if( !visible.length ) {
    return <span />;
  }
  return (
      <select onChange={e => onShowGroup(e.target.value)}>
        {visible.map( k => <option key={k} value={terms[k].name}>{terms[k].label}</option>)}
      </select>
    );
};

module.exports = Groupings;