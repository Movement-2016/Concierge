import React from 'react';

const ScrollLink = ({ slug, name, onShowElement }) => {
  return <a href={'#' + slug} onClick={() => onShowElement(slug)}>{name}</a>;
};

const ScrollLinks = ({ visible, links, onShowElement }) => {
  if( !visible.length ) {
    return <span />;
  }
  return(
      <div className="scroll-links">
        {visible.map( k => <ScrollLink key={k} onShowElement={onShowElement} {...links[k]} /> )}
      </div>
    );
};

module.exports = ScrollLinks;
