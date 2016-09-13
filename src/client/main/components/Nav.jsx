import React               from 'react';
import { Link, IndexLink } from 'react-router';

var NavbarHeader = React.createClass({
  render: function() {
    const { homeLink } = this.props;
    return (
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse" aria-expanded="false">
          <span className="sr-only">{"Toggle navigation"}</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
          </button>
          {homeLink}
        </div>
      );
  }
});

const _MenuItem = ({href,linkto,text} ) => {
  if( href ) {
    return <li><a href={href}>{text}</a></li>;
  }

  return <li><Link to={linkto}>{text}</Link></li>;
};

const MenuItem = ({href,linkto,menu,text}) => {
  if( menu ) {
    return (
      <li>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          {text}
          <span className="caret" />
        </a>
        <ul className="dropdown-menu">
          {menu.map( (m,i) => <_MenuItem key={i} {...m} />)}
        </ul>
      </li>
    );
  }

  return <_MenuItem href={href} linkto={linkto} text={text} />;
};

const MenuAnonymous = ({store}) => {
  const { content: { mainMenu } } = store.getState().service;

  return (
      <ul className="nav navbar-nav navbar-right">
        {mainMenu.map( (m,i) => <MenuItem key={i} {...m} />)}
      </ul> 
    );
};

class Nav extends React.Component {

  render() {

    const { siteTitle } = this.props;

    const { store } = this.context;

    var homeLink = <IndexLink to="/" className="navbar-brand">{siteTitle}</IndexLink>;

    return (
        <nav className="navbar top-nav-area">
          <div className="container-fluid">
            <NavbarHeader title={siteTitle} homeLink={homeLink}/>
            <div className="collapse navbar-collapse" id="nav-collapse">
              <MenuAnonymous store={store}/>
            </div>
          </div>
        </nav>
      );
  }
}

Nav.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

module.exports = Nav;