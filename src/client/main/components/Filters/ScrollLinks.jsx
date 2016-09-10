import React from 'react';

const ScrollLink = ({ name, label }) => {
  return <a href={'#' + name}>{label}</a>;
};

const ScrollLinks = ({ visible, links }) => {
  if( !visible.length ) {
    return <span />;
  }
  const { name } = visible[0];
  return(
      <div className="filter-group">
        <ScrollLink name={name} label="Top" />
        {visible.map( k => <ScrollLink key={k} {...links[k]} /> )}
      </div>
    );
};

module.exports = ScrollLinks;