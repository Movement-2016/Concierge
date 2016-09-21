import React from 'react';

const ScrollLink = ({ name, label }) => {
  return <li><a href={'#' + name + '-states'}>{label}</a></li>;
};

const ScrollLinks = ({ visible, links }) => {
  if( !visible.length ) {
    return <span />;
  }
  return(
      <ul>
        <li key="top"><a href="#header">Top</a></li>
        {visible.map( k => <ScrollLink key={k} {...links[k]} /> )}
      </ul>
    );
};

module.exports = ScrollLinks;