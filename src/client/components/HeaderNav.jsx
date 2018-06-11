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
              <Link to="/" className="brand-logo">
                {siteTitle}
              </Link>
              <Menu className="header-menu nav-menu" menu={menu} />
              <a data-activates="mobile-menu" className="button-collapse">
                <i className="material-icons">{'menu'}</i>
              </a>
            </nav>
          </div>
        </Headroom>
        <Menu className="side-nav nav-menu" id="mobile-menu" menu={menu} />
        <Login.Popup />
      </div>
    );
  }
}

module.exports = HeaderNav;
