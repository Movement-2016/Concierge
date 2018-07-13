import React from 'react';
import Headroom from 'react-headroom';

import Login from './Profile/Login.jsx';
import Menu from './Menu.jsx';

import scrollToElement from '../lib/scrollToElement';
import Link from '../services/LinkToRoute';

import { FACEBOOK_URL, TWITTER_URL } from '../../config';

const SocialLinks = ({ id }) => (
  <div id={id} className="social-links">
    <a className="social-link facebook-link" href={FACEBOOK_URL} target="_blank">
      <img src="/images/facebook-icon.svg" />
    </a>
    <a className="social-link twitter-link" href={TWITTER_URL} target="_blank">
      <img src="/images/twitter-icon.svg" />
    </a>
  </div>
);

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
          <div className="navbar">
            <nav className="main-nav">
              <Link to="/" id="header-logo" className="brand-logo">
                {siteTitle}
              </Link>
              <a data-activates="side-nav" className="button-collapse">
                <i className="material-icons">{'menu'}</i>
              </a>
              {!mobile && (
                <div id="header-links">
                  <Menu id="header-menu" className="nav-menu" menu={menu} />
                  <SocialLinks id="header-social-links" />
                </div>
              )}
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
          <SocialLinks id="side-menu-social-links" />
        </nav>
        <Login.Popup />
      </div>
    );
  }
}

module.exports = HeaderNav;
