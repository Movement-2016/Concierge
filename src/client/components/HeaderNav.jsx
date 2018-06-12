import React from 'react';
import Headroom from 'react-headroom';

import Login from './Profile/Login.jsx';
import Menu from './Menu.jsx';

import scrollToElement from '../lib/scrollToElement';
import Link from '../services/LinkToRoute';

class HeaderNav extends React.Component {
  componentDidMount() {
    /* global $ */
    const MENU_DELAY = 100;
    window.setTimeout(slowTest, MENU_DELAY);
    function slowTest() {
      $('.button-collapse').sideNav({
        closeOnClick: true,
      });
      $('.nav-menu a[href*="/#"]').click(function(/*e*/) {
        // e.preventDefault();
        var hash = $(this)
          .attr('href')
          .substr(1);
        scrollToElement(hash);
      });
    }
  }

  render() {
    const { siteTitle, menu, mobile } = this.props;

    return (
      <div className="nav-wrapper">
        <Headroom disable={!mobile} disableInlineStyles>
          <div className="navbar-fixed">
            <nav className="main-nav">
              <Link to="/" id="header-logo" className="brand-logo">
                {siteTitle}
              </Link>
              <a data-activates="side-nav" className="button-collapse">
                <i className="material-icons">{'menu'}</i>
              </a>
              {!mobile && <Menu id="header-menu" className="nav-menu" menu={menu} />}
            </nav>
          </div>
        </Headroom>
        <nav id="side-nav" className="side-nav">
          <div className="top-bar">
            <Link to="/" id="side-logo" className="brand-logo">
              {siteTitle}
            </Link>
            <a className="close-button">
              <i className="material-icons">{'close'}</i>
            </a>
          </div>
          <Menu id="side-menu" className="nav-menu" menu={menu} />
        </nav>
        <Login.Popup />
      </div>
    );
  }
}

module.exports = HeaderNav;
