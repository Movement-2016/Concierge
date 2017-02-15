import React               from 'react';
import { Link, IndexLink } from 'react-router';
import scrollToElement from '../../lib/scrollToElement';

const _MenuItem = ({url,title} ) => {
  var text       = title;
  var isExternal = !!url.match(/^http/);
  var href       = isExternal && url;
  var linkto     = !isExternal && url;

  return href
    ? <li className="top-level"><a href={href}>{text}</a></li>
    : <li><Link to={linkto}>{text}</Link></li>;
};

const MenuDropDown = ({menu,title}) => {
  const text = title;
  const href1 = menu[0].url;
  return (
    <li className="drop-down-btn" >
      <a href={href1}>{text}<i className="material-icons">arrow_drop_down</i></a>
        <ul className="drop-down">
          {menu.map( (m,i) => <_MenuItem key={i} {...m} />)}
        </ul>
      </li>
    );
};

const MenuItem = ({url,children,title}) => {

  return children.length
      ? <MenuDropDown title={title} menu={children} />
      : <_MenuItem url={url} title={title} />;
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
        {this.dropdowns}
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
