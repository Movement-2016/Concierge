import React from 'react';
import { connect } from 'react-redux';

import scrollToElement from '../../lib/scrollToElement';

const ScrollLink = ({ slug, name, onClick }) => <a onClick={onClick} href={'#' + slug}>{name}</a>;

const _ScrollLinks = ({ visible, onClick }) => 
        visible.length
          ? <div className="scroll-links">{visible.map( ({id,name,slug}) => <ScrollLink key={id} {...{onClick,name,slug}} /> )}</div>
          : <span />;

const mapStateToProps = ({
  router: {
    target: {
      model: {
        db
      }
    }
  },
  groups: { 
    filters, 
  }
}) => {

  return {
    visible: db.visibleColors(filters),
    onClick: (e) => {
      e.preventDefault();
      scrollToElement( e.target.getAttribute('href') );
    }
  };
};

const ScrollLinks = connect(mapStateToProps)(_ScrollLinks);

module.exports = ScrollLinks;
