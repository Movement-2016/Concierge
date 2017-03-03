import React               from 'react';
import { Link, IndexLink } from 'react-router';
import scrollToElement from '../../lib/scrollToElement';

const _MenuItem = ( {url,label} ) => {
  var isExternal = global.IS_SERVER_REQUEST || !!url.match(/^http/);
  return isExternal
    ? <li className="top-level"><a href={url}>{label}</a></li>
    : <li><Link to={url}>{label}</Link></li>;
};

const MenuDropDown = ({url, children, label}) => {
  return (
    <li className="drop-down-btn" >
      <Link to={url}>{label}<i className="material-icons">arrow_drop_down</i></Link>
      <ul className="drop-down">
        {children.map( (m,i) => <_MenuItem key={i} {...m} />)}
      </ul>
    </li>
    );
};

const MenuItem = ({url, children, label}) => {

  return children.length
      ? <MenuDropDown url={url} label={label} children={children} />
      : <_MenuItem url={url} label={label} />;
};

class MenuAnonymous extends React.Component {

  render() {
    const {
      menu,
      className,
      id
    } = this.props;

    return (
        <ul className={className} id={id}>
          {menu.map( (m,i) => <MenuItem key={i} {...m} />)}
        </ul>
      );
  }
}

class Nav extends React.Component {

  componentDidMount() {
    /* global $ */
    const MENU_DELAY = 100;
    /* var timeoutID = */ window.setTimeout(slowTest, MENU_DELAY);
    function slowTest() {
      $('.button-collapse').sideNav({
        closeOnClick: true,
      });
      $('nav a[href*="#"]').click( function() {
        var hash = $(this).attr('href').match(/#.*/)[0];
        scrollToElement(hash);
      });
    }
  }

  render() {

    const {
      siteTitle,
      menu
    } = this.props;

    return (
      <div className="navbar-fixed">
        <nav id="main-nav">
          <IndexLink to="/" className="brand-logo">{siteTitle}</IndexLink>
          <MenuAnonymous className="right hide-on-med-and-down" menu={menu}/>
          <MenuAnonymous className="side-nav" id="mobile-menu" menu={menu} />
          <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
        </nav>
      </div>
      );
  }
}


module.exports = Nav;
