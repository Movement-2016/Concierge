import React       from 'react';
import { connect } from 'react-redux';

import scrollToElement from '../lib/scrollToElement';
import Link            from '../services/LinkToRoute';

import Headroom from 'react-headroom';

const _MenuItem = ({ url,label }) => {
  var isExternal = global.IS_SERVER_REQUEST || url.includes('http');
  return isExternal
    ? <li className="menu-item"><a href={url}>{label}</a></li>
    : <li className="menu-item"><Link to={url}>{label}</Link></li>;
};

const SubMenu = ({url, children, label}) => {
  return (
    <li className="menu-parent">
      <Link to={url}>{label}<i className="material-icons">arrow_drop_down</i></Link>
      <ul className="menu-children">
        {children.map( (m,i) => <_MenuItem key={i} {...m} />)}
      </ul>
    </li>
    );
};

const MenuItem = ({url, children, label}) => {

  return children.length
      ? <SubMenu url={url} label={label} children={children} />
      : <_MenuItem url={url} label={label} />;
};

class Menu extends React.Component {

  render() {
    const {
      menu,
      className,
      id
    } = this.props;

    return (
        <ul className={className} id={id}>
          {id === 'mobile-menu' &&
            <div className="top-bar"><a className="close-button"><i className="material-icons">close</i></a></div>
          }

          {menu.map( (m,i) => <MenuItem key={i} {...m} />)}
        </ul>
      );
  }
}

class _CartWidget extends React.Component {
  render() {
    const {
      favorites = []
    } = this.props;
    const style = {
      float: 'left',
      marginLeft: 200
      };
    return <div style={style} id="CartWidget">{`${favorites.length} items in ` }<Link to="/plan">{'your cart'}</Link></div>;
  }
}

const mapStateToProps    = s => ({ favorites: s.groups.selected });

const CartWidget = global.IS_SERVER_REQUEST ? _CartWidget : connect(mapStateToProps)(_CartWidget);

class Nav extends React.Component {

  componentDidMount() {
    /* global $ */
    const MENU_DELAY = 100;
    window.setTimeout(slowTest, MENU_DELAY);
    function slowTest() {
      $('.button-collapse').sideNav({
        closeOnClick: true,
      });
      $('.nav-menu a[href*="/#"]').click( function(/*e*/) {
        // e.preventDefault();
        var hash = $(this).attr('href').substr(1);
        scrollToElement(hash);
      });
    }
  }

  render() {

    const {
      siteTitle,
      menu,
      mobile
    } = this.props;

    return (
      <div className="nav-wrapper">
        <Headroom disable={!mobile} disableInlineStyles>
          <div className="navbar-fixed">
            <nav className="main-nav">
              <Link to="/" className="brand-logo">{siteTitle}</Link>
              <CartWidget />
              <Menu className="header-menu nav-menu" menu={menu}/>
              <a data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
            </nav>
          </div>
        </Headroom>
        <Menu className="side-nav nav-menu" id="mobile-menu" menu={menu} />
      </div>
    );
  }
}


module.exports = Nav;
