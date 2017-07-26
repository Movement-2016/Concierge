import React from 'react';

const ScrollLink = ({ slug, name, scrollToElement }) => {
  return <a href={'#' + slug} onClick={() => scrollToElement(slug)}>{name}</a>;
};

const ScrollLinks = ({ visible, links, scrollToElement }) => {
  if( !visible.length ) {
    return <span />;
  }
  return(
      <div className="scroll-links">
        {visible.map( k => <ScrollLink key={k} scrollToElement={scrollToElement} {...links[k]} /> )}
      </div>
    );
};

module.exports = ScrollLinks;
