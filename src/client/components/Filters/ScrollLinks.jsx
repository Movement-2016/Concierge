import React from 'react';
import Link from '../../services/LinkToRoute';

const ScrollLink = ({ slug, name }) => <Link to={'#' + slug}>{name}</Link>;

const ScrollLinks = ({ visible, links }) => 
        visible.length
          ? <div className="scroll-links">{visible.map( k => <ScrollLink key={k} {...links[k]} /> )}</div>
          : <span />;

module.exports = ScrollLinks;
